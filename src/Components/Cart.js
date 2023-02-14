import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { immediateToast } from "izitoast-react";
import "izitoast-react/dist/iziToast.css";
import { BsFillTrashFill } from "react-icons/bs";

export default function Cart({dcart, setCart}) {
    const [cartData, setCartData] = useState([])
    const qeteye = useRef([])
    const setok = useRef([])
    const [qty, setQty] = useState({})
    const [stok, setStok] = useState({})
    const [loadingCart, setLoadingCart] = useState(true)
    const separator = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    const timer = useRef(null)
    const Total = useRef(0)
    const navigate = useNavigate()
    const [errorsetok, seterrorsetok] = useState({})

    const handleScroll = () => {
        window.scrollTo(0, 400)
    }

    const getCart = () => {
        var formData = new FormData()
        formData.append('AksesToken', localStorage.getItem('accesstoken'));
        axios.post('http://localhost/bukubook/api/cartapi/get', formData).then((res) => {
            res.data.data?.map((hasil, index) => {
                setStok(stoks => ({
                    ...stoks,
                    [index]: hasil.Stok
                }))
                setQty(qtys => ({
                    ...qtys,
                    [index]: hasil.Jumlah
                }))
                seterrorsetok(esetoks => ({
                    ...esetoks,
                    [index]: ''
                }))
                if(hasil.Stok === 0) {
                    seterrorsetok(esetoks => ({
                        ...esetoks,
                        [index]: 'Stok Habis'
                    }))
                } else if(hasil.Stok < hasil.Jumlah) {
                    seterrorsetok(esetoks => ({
                        ...esetoks,
                        [index]: 'Jumlah melebihi stok'
                    }))
                }
                qeteye.current[index] = hasil.Jumlah
                setok.current[index] = hasil.Stok
            })
            setCartData(res.data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadingCart(false)
        })
    }

    const handleAdd = async(qtys, id) => {
        const BukuID = document.getElementById(`BukuIndex${id}`).value
        const Qty = qtys
        var formData = new FormData()
        formData.append('AksesToken', localStorage.getItem('accesstoken'))
        formData.append('id', BukuID)
        formData.append('qty', Qty)
        axios.post('http://localhost/bukubook/api/cartapi/update', formData)
    }

    const handleChange = (e) => {
        let qtysd
        if(e.target.value === '') {
            setQty(qtys => ({
                ...qtys,
                [e.target.id]: ''
            }))
            qeteye.current[e.target.id] = ''
            qtysd = 1
        } else if(e.target.value < 1) {
            setQty(qtys => ({
                ...qtys,
                [e.target.id]: 1
            }))
            qeteye.current[e.target.id] = 1
            qtysd = 1
        } else if(e.target.value > stok[e.target.id]) {
            setQty(qtys => ({
                ...qtys,
                [e.target.id]: stok[e.target.id]
            }))
            qeteye.current[e.target.id] = setok.current[e.target.id]
            qtysd = stok[e.target.id]
        } else {
            setQty(qtys => ({
                ...qtys,
                [e.target.id]: Number(e.target.value)
            }))
            qeteye.current[e.target.id] = Number(e.target.value)
            qtysd = Number(e.target.value)
        }
        clearTimeout(timer.current)
        timer.current = setTimeout(function() {
            handleAdd(qtysd, e.target.id)
        }, 1000)
    }

    const handleUp = (e) => {
        let sqty
        if((qty[e.target.id]+1) > stok[e.target.id]) {
            immediateToast("error", {
                message: "Stok tidak cukup",
                timeout: 1000
            });
            setQty(qtys => ({
                ...qtys,
                [e.target.id]: stok[e.target.id]
            }))
            qeteye.current[e.target.id] = setok.current[e.target.id]
            
            sqty = stok[e.target.id]
        } else {
            setQty(qtys => ({
                ...qtys,
                [e.target.id]: qty[e.target.id]+1
            }))
            qeteye.current[e.target.id] = qeteye.current[e.target.id]+1
            sqty = qty[e.target.id]+1
        }
        clearTimeout(timer.current)
        timer.current = setTimeout(function() {
            handleAdd(sqty, e.target.id)
        }, 1000)
    }

    const handleRemoveByID = (id) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            icon: 'question',
            title: 'Apakah anda yakin?',
            text: 'Anda perlu kembali ke katalog untuk mengembalikannya lagi',
            showCancelButton: true,
            cancelButtonColor: '#ff0000',
            cancelButtonText: 'Tidak',
            confirmButtonText: 'Ya',
            confirmButtonColor: '#384aeb'
        }).then((res) => {
            if(res.isConfirmed) {
                let formData = new FormData()
                formData.append('AksesToken', localStorage.getItem('accesstoken'))
                formData.append('id', id)
                axios.post('http://localhost/bukubook/api/cartapi/remove', formData).then(() => {
                    MySwal.fire({
                        title: 'Berhasil dihapus',
                        icon: 'success'
                    }).then(() => {
                        setCart(dcart - 1)
                        getCart()
                        if(errorsetok[id + 1] === undefined) {
                            seterrorsetok(setoks => ({
                                ...setoks,
                                [id]: ''
                            }))
                        } else {
                            seterrorsetok(setoks => ({
                                ...setoks,
                                [id]: errorsetok[id + 1],
                                [id + 1]: ''
                            }))
                        }
                        getTotal()
                    })
                })
            }
        })
    }

    const handleDown = (e) => {
        let qtysd
        const MySwal = withReactContent(Swal)
        if((qty[e.target.id]-1) < 1) {
            MySwal.fire({
                title: 'Apakah Anda yakin?',
                text: 'Setelah menekan "ya" barang akan dihapus dari keranjangmu dan kamu harus pergi ke katalog untuk mengembalikannya',
                showCancelButton: true,
                cancelButtonText:'Tidak',
                confirmButtonText:'Ya',
                icon: 'question'
            }).then((sewal) => {
                if(sewal.isConfirmed) {
                    let formData = new FormData()
                    formData.append('AksesToken', localStorage.getItem('accesstoken'))
                    formData.append('id', document.getElementById(`BukuIndex${e.target.id}`).value)
                    axios.post('http://localhost/bukubook/api/cartapi/remove', formData).then(() => {
                    MySwal.fire({
                        title: 'Berhasil dihapus',
                        icon: 'success'
                    }).then(() => {
                        setCart(dcart - 1)
                        getCart()
                        if(errorsetok[e.target.id + 1] === undefined) {
                            seterrorsetok(setoks => ({
                                ...setoks,
                                [e.target.id]: ''
                            }))
                        } else {
                            seterrorsetok(setoks => ({
                                ...setoks,
                                [e.target.id]: errorsetok[e.target.id + 1],
                                [e.target.id + 1]: ''
                            }))
                        }
                        getTotal()
                    })
                })
                }
            })
        } else {
            setQty(qtys => ({
                ...qtys,
                [e.target.id]: qty[e.target.id]-1
            }))
            qeteye.current[e.target.id] = qeteye.current[e.target.id] - 1
            qtysd = qty[e.target.id]-1
        }
        clearTimeout(timer.current)
        timer.current = setTimeout(function() {
            handleAdd(qtysd, e.target.id)
        }, 1000)
    }
    const handleCheckOutCart = (e) => {
        e.preventDefault()
        const MySwal = withReactContent(Swal)
        let total = 0
        let next = true
        for (let index = 0; index < Object.keys(qty).length; index++) {
            total = total + qty[index]
        }
        for (let index = 0; index < Object.keys(errorsetok).length; index++) {
            if(errorsetok[index] === 'Stok Habis' || errorsetok[index] === 'Jumlah melebihi stok') {
                next = false
            }
            
        }
        if(next) {
            if(total > 50) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Barang terlalu banyak',
                    text: 'Pastikan barang yang akan dibeli tidak lebih dari 50 buku'
                })
            } else {
                navigate('/checkout')
                window.scrollTo(0   , 400)   
            }
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Tidak bisa melanjutkan pesanan',
                text: 'Kemungkinan barang yang anda coba beli sudah habis atau anda memesan melebihi stok'
            })
        }
    }

    useEffect(() => {
        if(loadingCart) {
            getCart()
        }
        getTotal()
    }, [Total])

    const cart =    loadingCart ?
                    ''
                    :
                    cartData?.map((data, index) => {
                        return(
                            <tr key={`cartime${index}`}>
                                <td>
                                    <div class="media">
                                        <div class="d-flex">
                                            {data.SampulBuku.map((sampul, index) => {
                                                if(index < 1) {
                                                    return(<img key={`sampulbuku${index}`} src={sampul.Sampul} alt="" className='gambarcart' width={90}/>)
                                                }
                                            })}
                                        </div>
                                        <div class="media-body">
                                            <h6 className='text-danger'>{errorsetok[index]}</h6>
                                            <p>{data.NamaBuku}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>Rp {separator(data.Harga)}</h5>
                                </td>
                                <td>
                                    <div class="product_count">
                                        <input type="hidden" id={`BukuIndex${index}`} value={data.BukuID} />
                                        <input required onChange={handleChange} type="number" name="qty" id={index} maxlength="12" value={qty[index]} title="Quantity:"
                                            class={`input-text qty qtyd`}/>
                                        <button onClick={handleUp} id={index}
                                            class="increase items-count" type="button"><i id={index} class="lnr lnr-chevron-up"></i></button>
                                        <button onClick={handleDown} id={index}
                                            class="reduced items-count" type="button"><i id={index} class="lnr lnr-chevron-down"></i></button>
                                        <button onClick={() => handleRemoveByID(data.BukuID)} className='text-danger'><BsFillTrashFill/></button>
                                    </div>
                                </td>
                                <td>
                                    <h5>Rp {separator(data.Harga*qty[index])}</h5>
                                </td>
                            </tr>
                        )
                    })
    const getTotal = () => {
        let qtyz = document.getElementsByClassName('qtyd')
        Total.current = 0
        for(var key in qeteye.current) {
            if(cartData[key]?.Harga !== undefined) {
                const qity = qeteye.current[key]
                const harga = Number(cartData[key]?.Harga)
                Total.current = Total.current + qity*harga
            }
        }
        
        return Total.current
    }

    return (
        <Fragment>
            <section class="blog-banner-area" id="category">
                <div class="container h-100">
                    <div class="blog-banner">
                        <div class="text-center">
                            <h1>Keranjang</h1>
                            <nav aria-label="breadcrumb" class="banner-breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><Link to={'/'}>Beranda</Link></li>
                                    <li class="breadcrumb-item active" aria-current="page">Keranjang</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section class="cart_area">
                <div class="container">
                    <div class="cart_inner">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart}
                                    <tr class="bottom_button">
                                        <td>
                                            
                                        </td>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            <h5>Subtotal</h5>
                                        </td>
                                        <td>
                                            <h5>Rp {separator(getTotal())}</h5>
                                        </td>
                                    </tr>
                                    <tr class="shipping_area">
                                        <td class="d-none d-md-block">

                                        </td>
                                        <td>

                                        </td>
                                    </tr>
                                    <tr class="out_button_area">
                                        <td class="d-none-l">

                                        </td>
                                        <td class="">

                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            <div class="checkout_btn_inner d-flex align-items-center">
                                                <Link onClick={handleScroll} class="gray_btn" to={'/katalog'}>Lanjut Belanja</Link>
                                                <Link class="primary-btn ml-2" to={'/checkout'} onClick={handleCheckOutCart}>Checkout Sekarang</Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
