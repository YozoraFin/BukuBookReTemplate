import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Checkout() {
    const [cartData, setCartData] = useState({})
    const [ongkir, setOngkir] = useState([])
    const [loadingCart, setLoadingCart] = useState(true)
    const [provinsi, setProvinsi] = useState([])
    const [loadingProvinsi, setLoadingProvinsi] = useState(true)
    const [kota, setKota] = useState([])
    const [loadingKota, setLoadingKota] = useState(true)
    const [kotas, setKotas] = useState(false)
    const [kurirs, setKurirs] = useState(false)
    const [provinsis, setProvinsis] = useState(false)
    const [hargaOngkir, setHargaOngkir] = useState(0)
    const [hargaAkhir, setHargaAkhir] = useState(0)
    const [errorTnc, setErrorTnc] = useState('')
    const SKurir = useRef('')
    const SProvinsi = useRef('')
    const SKota = useRef('')
    const LKurir = useRef('')
    const LProvinsi = useRef('')
    const LKota = useRef('')

    const navigate = useNavigate()
    const separator = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    const check = () => {
        var formData = new FormData()
        formData.append('AksesToken', localStorage.getItem('accesstoken'));
        axios.post('http://localhost/bukubook/api/customer/get', formData).then((res) => {
            if(res.data.status === 400) {
                navigate('/tamu')
            } else {
                getData()
            }
        })
    }

    const getData = () => {
        axios.get('http://localhost/bukubook/api/rajaongkirapi/getprovince').then((res) => {
            if(res.data.status === 200) {
                setProvinsi(res.data.data)
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadingProvinsi(false)
        })
        var formData = new FormData()
        formData.append('AksesToken', localStorage.getItem('accesstoken'))
        axios.post('http://localhost/bukubook/api/cartapi/get', formData).then((ress) => {
            setCartData(ress.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadingCart(false)
        })
    }

    const handleProvSelect = (e) => {
        if(e.value !== 'default' && e.value !== 'loading') {
            setProvinsis(!provinsis)
            LProvinsi.current = e.label
            SProvinsi.current = e.value
            var formData = new FormData()
            formData.append('ProvinsiID', e.value)
            axios.post('http://localhost/bukubook/api/rajaongkirapi/getcity', formData).then((res) => {
                setKota(res.data.data)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setLoadingKota(false)
            })
        }
    }

    const handleKotaSelect = (e) => {
        if(e.value !== 'default' && e.value !== 'loading') {
            setKotas(!kotas)
            SKota.current = e.value
            LKota.current = e.label
        }
    }

    const handleKurirSelect = (e) => {
        if(e.value !== 'default') {
            setKurirs(!kurirs)
            SKurir.current = e.value
        }
    }

    const handleTotal = () => {
        if(SKurir.current !== '' && SKota.current !== '' && SProvinsi.current !== '') {
            var formData = new FormData()
            formData.append('Asal', 444)
            formData.append('Tujuan', SKota.current)
            formData.append('Kurir', SKurir.current)
            formData.append('Berat', Number(cartData?.jumlah)*500)
            axios.post('http://localhost/bukubook/api/rajaongkirapi/getongkir', formData).then((res) => {
                setOngkir(res.data.data.map((ong, index) => {
                    return(<li key={`layanankurir${index}`}><input onClick={handleLayanan} className='pixel-radios' value={ong.harga} type="radio" name='layanankurir' id={ong.deskripsi}/><label className='labellkurir' htmlFor={ong.service}>Rp {separator(ong.harga)} {ong.deskripsi} ({ong.service}) estimasi(hari): {ong.estimasi}</label></li>)
                }))
            })
        }
    }

    const handleLayanan = (e) => {
        setHargaOngkir(Number(e.target.value))
        LKurir.current = e.target.id
        setHargaAkhir(Number(e.target.value) + Number(cartData?.subtotal))
    }

    const handleCheckout = (e) => {
        e.preventDefault()
        const MySwal = withReactContent(Swal)
        if(LKurir.current === '' || LKota.current === '' || LProvinsi.current === '') {
            MySwal.fire({
                title: 'Tolong isi detail alamat',
                icon: 'warning'
            })
        } else {
            if(document.getElementById('tnc').checked) {
                setErrorTnc('')
                MySwal.fire({
                    title: 'Apakah anda yakin?',
                    text: 'Setelah menekan "Ya" anda harus membayar sebesar Rp'+separator(hargaAkhir),
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonAriaLabel: 'Tidak',
                    cancelButtonColor: '#FF0000',
                    confirmButtonColor: '#384AEB'
                }).then((res) => {
                    if(res.isConfirmed) {
                        let data = {};
                        for (let index = 0; index < cartData?.data?.length; index++) {
                            data = {
                                ...data,
                                [index]: {
                                    id: cartData?.data[index].BukuID,
                                    qty: cartData?.data[index].Jumlah,
                                    subtotal: cartData?.data[index].IntSubtotal
                                }
                            }
                        }
                        var formData = new FormData(e.target)
                        formData.append('AksesToken', localStorage.getItem('accesstoken'));
                        formData.append('Kurir', LKurir.current)
                        formData.append('Provinsi', LProvinsi.current)
                        formData.append('Kota', LKota.current)
                        formData.append('Total', hargaAkhir)
                        formData.append('Data', JSON.stringify(data))
                        formData.append('Ongkir', hargaOngkir)
                        axios.post('http://localhost/bukubook/api/checkoutapi/checkout', formData).then((res) => {
                            if(res.data.status === 200) {
                                MySwal.fire({
                                    title: 'Berhasil melakukan checkout',
                                    text: 'Anda bisa melihat detail pesanan dari email atau riwayat belanja di bagian profil',
                                    icon: 'success'
                                }).then(() => {
                                    let formDelete = new FormData();
                                    formDelete.append('AksesToken', localStorage.getItem('accesstoken'))
                                    axios.post('http://localhost/bukubook/api/cartapi/removeall', formDelete).then(() => {
                                        navigate('/detail')
                                    })
                                })
                            } else {
                                MySwal.fire({
                                    title: res.data.status,
                                    text: res.data.message,
                                    icon: 'error'
                                })
                            }
                        })
                    }
                })
            } else {
                setErrorTnc('Wajib diisi')
            }
        }
    }

    useEffect(() => {
        if(provinsi.length < 1) {
            check()
        }
        handleTotal()
    },[kotas, kurirs, provinsis])

    const provoptions = loadingProvinsi ? 
                        (
                            [{value: 'loading', label: 'memuat provinsi...'}]
                        )
                        :
                        provinsi?.map((prov) => {
                            return {
                                value: prov.id,
                                label: prov.provinsi
                            }
                        })

    const kotaoptions = loadingKota ? 
                        (
                            [{value: 'loading', label: 'pilih provinsi terlebih dahulu'}]
                        )
                        :
                        kota?.map((kota) => {
                            return {
                                value: kota.id,
                                label: kota.kota
                            }
                        })

    const kuriroptions = [
        {value: 'jne', label: 'JNE'},
        {value: 'pos', label: 'POS Indonesia'},
        {value: 'tiki', label: 'TIKI'}
    ]

    return (
        <Fragment>
            <section class="blog-banner-area" id="category">
                <div class="container h-100">
                    <div class="blog-banner">
                        <div class="text-center">
                            <h1>Checkout</h1>
                            <nav aria-label="breadcrumb" class="banner-breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><Link to={'/'}>Beranda</Link></li>
                                    <li class="breadcrumb-item active" aria-current="page">Checkout</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section class="checkout_area section-margin--small">
                <div class="container">
                    <div class="billing_details">
                        <div class="row">
                            <div class="col-lg-8">
                                <h3>Billing Details</h3>
                                <form onSubmit={handleCheckout} class="row contact_form" id='formcheckout'>
                                    <div class="col-md-12 form-group p_star">
                                        <input required type="text" class="form-control" id="first" name="Nama" placeholder='Nama Lengkap'/>
                                    </div>
                                    <div class="col-md-6 form-group p_star">
                                        <input required type="number" class="form-control" id="number" name="NoTelp" placeholder='Nomor HP' />
                                    </div>
                                    <div class="col-md-6 form-group p_star">
                                        <input required type="email" class="form-control" id="email" name="Email" placeholder='Email'/>
                                    </div>
                                    <div class="col-md-12 form-group p_star">
                                        <Select
                                            defaultValue={{ value: 'default', label: 'Provinsi' }}
                                            className='country_select'
                                            options={provoptions}
                                            onChange={handleProvSelect}
                                        />
                                    </div>
                                    <div class="col-md-12 form-group p_star">
                                        <Select
                                            defaultValue={{ value: 'default', label: 'Kota' }}
                                            className='country_select'
                                            options={kotaoptions}
                                            onChange={handleKotaSelect}
                                        />
                                    </div>
                                    <div class="col-md-12 form-group p_star">
                                        <input required type="text" class="form-control" id="add1" name="Alamat" placeholder='Alamat'/>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <input required type="text" class="form-control" id="zip" name="Kodepos" placeholder="Kode Pos"/>
                                    </div>
                                    <div class="col-md-12 form-group p_star">
                                        <Select
                                            defaultValue={{ value: 'default', label: 'Kurir' }}
                                            className='country_select'
                                            options={kuriroptions}
                                            onChange={handleKurirSelect}
                                        />
                                    </div>
                                    <div class={ongkir < 1 ? 'col-md-12 form-group p_star sidebar-categories d-none' : 'col-md-12 form-group p_star sidebar-categories'}>
                                        <ul>
                                            {ongkir}
                                        </ul>
                                    </div>
                                    <div class="col-md-12 form-group mb-3">
                                        <div class="creat_account">
                                            <h3>Catatan</h3>
                                        </div>
                                        <textarea class="form-control" name="Catatan" id="message" rows="1" placeholder="Catatan"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div class="col-lg-4">
                                <div class="order_box">
                                    <h2>Your Order</h2>
                                    <ul class="list">
                                        <li><a href="?"><h4>Product <span>Total</span></h4></a></li>
                                        { loadingCart ?
                                            (
                                            <li key={`ccartskeleton`}>
                                                <div className="row cartlist">
                                                    <Link className='col-6 awo' to={`?`}><Skeleton/></Link> 
                                                    <span class="col-2"><Skeleton/></span> 
                                                    <span class="col-4"><Skeleton/></span>
                                                </div>
                                            </li>
                                            )
                                            :
                                            cartData?.data?.map((buku, index) => {
                                                return( <li key={`ccart${index}`}>
                                                            <div className="row cartlist">
                                                                <Link className='col-5 awo' to={`/buku/${buku.BukuID}`}>{buku.NamaBuku}</Link> 
                                                                <span class="col-2">x {buku.Jumlah}</span> 
                                                                <span class="col-5" align='right'>{buku.Subtotal}</span>
                                                            </div>
                                                        </li>)
                                            })}
                                    </ul>
                                    <ul class="list list_2">
                                        <li><a href="?">Subtotal <span>Rp {separator(Number(cartData?.subtotal))}</span></a></li>
                                        <li><a href="?">Ongkir <span>Rp {separator(hargaOngkir)}</span></a></li>
                                        <li><a href="?">Harga Akhir <span>Rp {hargaAkhir === 0 ? separator(Number(cartData?.subtotal)) : separator(hargaAkhir)}</span></a></li>
                                    </ul>
                                    <div class="creat_account">
                                        <input type="checkbox" id="tnc" name="selector"/>
                                        <label htmlFor="tnc">Saya telah membaca dan menyetujui T&C</label>
                                        <p className='text-danger'>{errorTnc}</p>
                                    </div>
                                    <div class="text-center">
                                        <button form='formcheckout' class="button button-paypal">Bayar!</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
