/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SwiperSlide, Swiper } from 'swiper/react'

export default function DetailBuku({cart, setCart}) {
    const [DataBuku, setDataBuku] = useState([])
    const [loadingDataBuku, setLoadingDataBuku] = useState(true)
    const [qty, setQty] = useState(1)
    const param = useParams()
    const separator = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    
    const handleUp = () => {
        let qtys = qty
        if(qtys === '') {
            qtys = 0
        }
        if(qtys >= DataBuku?.Stok) {
            setQty(DataBuku?.Stok)
        } else {
            setQty(qtys + 1)
        }
    }

    const handleDown = () => {
        let qtys = qty
        if(qtys === '') {
            qtys = 2
        }
        if(DataBuku?.Stok === 0) {
            setQty(0)
        } else if(qtys === 1) {
            setQty(1)
        } else {
            setQty(qtys - 1)
        }
    }

    const handleChange = (e) => {
        if(e.target.value === '') {
            setQty('')
        } else if(e.target.value < 1) {
            setQty(1)
        } else if(e.target.value > DataBuku?.Stok) {
            setQty(DataBuku?.Stok)
        } else {
            setQty(Number(e.target.value))
        }
    }

    const handleAdd = () => {
        const MySwal = withReactContent(Swal)
        if(qty === '' || qty === 0) {
            MySwal.fire({
                title: 'Tolong isi jumlah buku',
                icon: 'error',
                text: 'Tidak bisa memasukkan kedalam keranjang jika jumlah buku kosong'
            })
        } else {
            const object = {
                AksesToken: localStorage.getItem('accesstoken'),
                BukuID: param.id,
                qty: qty
            }
            axios.post('http://localhost:5000/cart/add', object).then((res) => {
                if(res.data.status === 200) {
                    MySwal.fire({
                        title: 'Berhasil menambahkan',
                        text: 'Kamu bisa mengecek barangmu di keranjang',
                        icon: 'success'
                    }).then(() => {
                        setCart(cart + 1)
                    })
                } else {
                    MySwal.fire({
                        title: 'Tidak bisa melanjutkan',
                        text: res.data.message,
                        icon: 'error'
                    })
                }
            })
        }
    }

    const getData = () => {
        axios.get(`http://localhost:5000/buku/${param.id}`).then((res) => {
            setDataBuku(res.data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadingDataBuku(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    let SampulBuku
    let CheckSB = DataBuku?.Sampul
    if(loadingDataBuku) {
        SampulBuku = <Skeleton width={300} height={400} />
    } else {
        if(CheckSB.length === 1) {
            SampulBuku = (<img key={`sampultunggal`} className='sampuldetail' src={DataBuku?.Sampul[0].SrcGambar} alt=""/>)
        } else {
            SampulBuku = DataBuku?.Sampul?.map((sampuls, index) => {
                return(<SwiperSlide>
                    <img key={`sampuldetail${index}`} className='sampuldetail' src={sampuls.SrcGambar} alt=""/>
                </SwiperSlide>)
            })
        }
    }

    return (
        <Fragment>
            <section className="blog-banner-area" id="blog">
                <div className="container h-100">
                    <div className="blog-banner">
                        <div className="text-center">
                            {loadingDataBuku ? <Skeleton width={150} height={40}/> : <h1>{DataBuku?.Judul}</h1>}
                            <nav aria-label="breadcrumb" className="banner-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={'/'}>Beranda</Link></li>
                                    <li className="breadcrumb-item"><Link to={'/katalog'}>Katalog</Link></li>
                                    {loadingDataBuku ? <li className="breadcrumb-item active" aria-current="page"><Skeleton width={50}/></li> : <li className="breadcrumb-item active" aria-current="page">{DataBuku?.Judul}</li>}
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <div className="product_image_area">
                <div className="container">
                    <div className="row s_product_inner">
                        <div className="col-lg-6 text-center">
                            <Swiper>
                                {SampulBuku}
                            </Swiper>
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <div className="s_product_text">
                                {loadingDataBuku ? <h3><Skeleton width={100} /></h3>: <h3>{DataBuku?.Judul}</h3>}
                                {loadingDataBuku ? <h2><Skeleton width={120}/></h2> : <h2>Rp {separator(DataBuku?.Harga)}</h2>}
                                <ul className="list">
                                    <li><a className="active" href="?"><span>Genre</span> : {loadingDataBuku ? <Skeleton width={70}/> : DataBuku?.Genre.Genre}</a></li>
                                    <li><a href="?"><span>Stok</span> : {loadingDataBuku ? <Skeleton width={50}/> : DataBuku?.Stok}</a></li>
                                </ul>
                                <div className="pcount my-2">
                                    <label htmlFor="qty">Quantity:</label>
                                    <button className="" type="button" onClick={handleDown}><i className="ti-angle-left"></i></button>
                                    <input onChange={handleChange} type="number" name="qty" id="sst" size="2" value={qty} title="Quantity:" className="input-text qty"/>
                                    <button className="" type="button" onClick={handleUp}><i className="ti-angle-right"></i></button>
                                </div>
                                <button onClick={handleAdd} className="button primary-btn">Add to Cart</button>               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="product_description_area">
                <div className="container">
                    {loadingDataBuku ? <div className="tab-content"><Skeleton count={10}/></div> : <div className="tab-content sinopsis" dangerouslySetInnerHTML={{ __html: DataBuku?.Sinopsis }}></div>}
                </div>
            </section>
        </Fragment>
    )
}
