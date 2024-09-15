/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useLocation } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import _ from 'lodash';

export default function ProductSlide({switchCart}) {
    const [trend, setTrend] = useState([]);
    const [loadingTrend, setloadingTrend] = useState(true);
    const [best, setBest] = useState([]);
    const [loadingBest, setloadingBest] = useState(true);
    const [rerender, setRerender] = useState(false);
    const [kupon, setKupon] = useState([])
    const [hKupon, setHKupon] = useState({})
    const [loadingKupon, setLoadingKupon] = useState(true)
    const [filteredKupon, setFilteredKupon] = useState([])
    const [tab, setTab] = useState(false)
    const param = useLocation();
    const separator = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    const tapPrivate = (e) => {
        e.preventDefault()
        document.getElementById('global')?.classList.remove('active')
        document.getElementById('private')?.classList.add('active')
        setFilteredKupon(kupon.filter(kup => kup.Akses))
        setTab(true)
    }

    const tapGlobal = (e) => {
        e.preventDefault()
        document.getElementById('global')?.classList.add('active')
        document.getElementById('private')?.classList.remove('active')
        setFilteredKupon(kupon.filter(kup => !kup.Akses))
        setTab(false)
    }

    const handleChevron = (id) => {
        const element = document.getElementById(id)
        if(element.classList.contains('fa-chevron-up')) {
            element.classList.remove('fa-chevron-up')
            element.classList.add('fa-chevron-down')
        } else {
            element.classList.remove('fa-chevron-down')
            const eleclass = document.getElementsByClassName('fa-chevron-up')
            for (let index = 0; index < eleclass.length; index++) {
                const elements = eleclass[index];
                elements.classList.remove('fa-chevron-up')
                elements.classList.add('fa-chevron-down')
            }
            element.classList.add('fa-chevron-up')
        }
    }
    
    const handleKeyword = (e) => {
        let kuponTemp
        if(tab) {
            kuponTemp = kupon.filter(kup => kup.Akses)
        } else {
            kuponTemp = kupon.filter(kup => !kup.Akses)
        }
        let filter = kuponTemp.filter((kup) => {
            return kup.Judul.toLowerCase().indexOf(e.target.value) > -1 || kup.Kode.toLowerCase().indexOf(e.target.value) > -1
        })
        setFilteredKupon(filter)
    }

    const handleScroll = () => {
        window.scrollTo(0, 400)
    }

    const handleAdd = (e) => {
        const MySwal = withReactContent(Swal)
        var object = {
            AksesToken: localStorage.getItem('accesstoken'),
            BukuID: Number(e.target.id),
            qty: 1
        }
        axios.post('http://localhost:5000/cart/add', object).then((res) => {
            if(res.data.status === 200) {
                switchCart()
                MySwal.fire({
                    title: 'Buku Berhasil Ditambahkan',
                    text: 'Kamu bisa melihat barangmu di keranjang',
                    icon: 'success'
                })
            } else {
                MySwal.fire({
                    title: 'Tidak bisa menambahkan',
                    text: res.data.message,
                    icon: 'error'
                })
            }
        })
    }

    const getKupon = () => {
        axios.post('http://localhost:5000/kupon/get', {AksesToken: localStorage.getItem('accesstoken')}).then((res) => {
            setKupon(res.data?.data)
            setFilteredKupon(res.data?.data.filter(kup => !kup.Akses))
            setHKupon(res.data?.hData)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadingKupon(false)
        })
    }

    const getTrend = () => {
        axios.get(`http://localhost:5000/buku/rekomended`).then((res) => {
            setTrend(res.data?.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setloadingTrend(false)
        })
    }

    const getBest = () => {
        axios.get(`http://localhost:5000/buku/best`).then((res) => {
            setBest(res.data?.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setloadingBest(false)
        })
    }

    useEffect(() => {
        if(best?.length < 1) {
            getBest()
            setRerender(!rerender);
        }
        if(trend?.length < 1) {
            getTrend()
            setRerender(!rerender);
        }
    },[best, trend, param, rerender])

    useEffect(() => {
        getKupon()
    },[])

    const trendingResponsive = loadingTrend ?
    (
        <Fragment>
            <div className="card text-center card-product" key={`trendldngrspnsv`}>
                <div className="card-product__img">
                <Skeleton width={255} height={360}/>
                <ul className="card-product__imgOverlay">
                    <li key={`srctrendldng`}><button><i className="ti-search"></i></button></li>
                    <li key={`spntrendldng`}><button><i className="ti-shopping-cart"></i></button></li>
                </ul>
                </div>
                <div className="card-body">
                <p><Skeleton width={100}/></p>
                <h4 className="card-product__title"><a href="single-product.html"><Skeleton width={120} /></a></h4>
                <p className="card-product__price"><Skeleton width={110} /></p>
                </div>
            </div>
        </Fragment>
    )
    :
    trend?.map((datrend, index) => {
        if(index < 8) {
            return(
                <div className={datrend?.Stok === 0 ? 'card text-center card-product habis' : 'card text-center card-product'} key={`trendresponsive${index}`}>
                    <div className="card-product__img">
                        {datrend?.Sampul.length < 1
                        ?
                        (
                            <img className="productslideresp" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ENpnnhPgDE0BVDsiIAOhl8dbGVE_5vc11w&usqp=CAU' alt=""/>
                        )
                        :
                        datrend?.Sampul.map((sampul, index) => {
                            if(index < 1) {
                                return(
                                    <img key={`sampul${index}`} className='productslideresp' src={sampul?.SrcGambar} alt="" width={255} height={360} />
                                )
                            }
                        })}
                        <ul className="card-product__imgOverlay">
                            <li key={`srctrend${index}`}><Link onClick={handleScroll} to={`/buku/${datrend?.id}`}><button><i className="ti-search"></i></button></Link></li>
                            <li key={`spntrend${index}`}><button id={datrend.ID} onClick={handleAdd}><i id={datrend?.id} className="ti-shopping-cart"></i></button></li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <p>{datrend?.Penulis}</p>
                        <h4 className="card-product__title"><Link to={`/buku/${datrend?.id}`}>{datrend?.Judul}</Link></h4>
                        <p className="card-product__price">Rp {separator(datrend?.Harga)}</p>
                    </div>
                </div>
            )
        }
    })

    const trending =    loadingTrend ?
                        (
                            <Fragment>
                                <div className="card text-center card-product" key={`trendldngrspnsv`}>
                                    <div className="card-product__img">
                                    <Skeleton width={255} height={360}/>
                                    <ul className="card-product__imgOverlay">
                                        <li key={`srctrendldng`}><button><i className="ti-search"></i></button></li>
                                        <li key={`spntrendldng`}><button><i className="ti-shopping-cart"></i></button></li>
                                    </ul>
                                    </div>
                                    <div className="card-body">
                                    <p><Skeleton width={100}/></p>
                                    <h4 className="card-product__title"><a href="single-product.html"><Skeleton width={120} /></a></h4>
                                    <p className="card-product__price"><Skeleton width={110} /></p>
                                    </div>
                                </div>
                            </Fragment>
                        )
                        :
                        trend?.map((datrend, index) => {
                            if(index < 8) {
                                return(
                                    <div className={datrend?.Stok === 0 ? 'card text-center card-product habis' : 'card text-center card-product'} key={`trend${index}`}>
                                        <div className="card-product__img">
                                        {datrend?.Sampul.length < 1
                                        ?
                                        (
                                            <img className="img-fluid" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ENpnnhPgDE0BVDsiIAOhl8dbGVE_5vc11w&usqp=CAU' alt=""/>
                                        )
                                        :
                                        datrend?.Sampul.map((sampul, index) => {
                                            if(index < 1) {
                                                return(
                                                    <img key={`sampul${index}`} className="img-fluid" src={sampul?.SrcGambar} alt="" width={255} height={360} />
                                                )
                                            }
                                        })}
                                        <ul className="card-product__imgOverlay">
                                            <li key={`srctrend${index}`}><Link onClick={handleScroll} to={`/buku/${datrend?.id}`}><button><i className="ti-search"></i></button></Link></li>
                                            <li key={`spntrend${index}`}><button id={datrend?.id} onClick={handleAdd}><i id={datrend?.id} className="ti-shopping-cart"></i></button></li>
                                        </ul>
                                        </div>
                                        <div className="card-body">
                                        <p>{datrend.Penulis}</p>
                                        <h4 className="card-product__title"><Link to={`/buku/${datrend?.id}`}>{datrend?.Judul}</Link></h4>
                                        <p className="card-product__price">Rp {separator(datrend?.Harga)}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })

    const thebestResponsive = loadingBest ?
    (
        <Fragment>
            <div className="card text-center card-product" key={`bestldng`}>
                <div className="card-product__img">
                <Skeleton width={255} height={360}/>
                <ul className="card-product__imgOverlay">
                    <li key={`srctrendldng`}><button><i className="ti-search"></i></button></li>
                    <li key={`spntrendldng`}><button><i className="ti-shopping-cart"></i></button></li>
                </ul>
                </div>
                <div className="card-body">
                <p><Skeleton width={100}/></p>
                <h4 className="card-product__title"><a href="single-product.html"><Skeleton width={120} /></a></h4>
                <p className="card-product__price"><Skeleton width={110} /></p>
                </div>
            </div>
        </Fragment>
    )
    :
    best?.map((dabest, index) => {
        if(index < 8) {
            return(
                <div className={dabest?.Stok === 0 ? 'card text-center card-product habis' : 'card text-center card-product'} key={`bestresponsive${index}`}>
                    <div className="card-product__img">
                    {dabest?.Sampul.length < 1
                    ?
                    (
                        <img className="productslideresp" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ENpnnhPgDE0BVDsiIAOhl8dbGVE_5vc11w&usqp=CAU' alt=""/>
                    )
                    :
                    dabest?.Sampul.map((sampul, index) => {
                        if(index < 1) {
                            return(
                                <img key={`sampul${index}`} className="productslideresp" src={sampul?.SrcGambar} alt="" width={255} height={360}/>
                            )
                        }
                    })}
                    <ul className="card-product__imgOverlay">
                        <li key={`srctrend${index}`}><Link onClick={handleScroll} to={`/buku/${dabest?.id}`}><button><i className="ti-search"></i></button></Link></li>
                        <li key={`spntrend${index}`}><button id={dabest?.id} onClick={handleAdd}><i id={dabest?.id} className="ti-shopping-cart"></i></button></li>
                    </ul>
                    </div>
                    <div className="card-body">
                    <p>{dabest?.Penulis}</p>
                    <h4 className="card-product__title"><Link to={`/buku/${dabest?.id}`}>{dabest?.Judul}</Link></h4>
                    <p className="card-product__price">Rp {separator(dabest?.Harga)}</p>
                    </div>
                </div>
            )
        }
    })

    const thebest =     loadingBest ?
                        (
                            <Fragment>
                                <div className="card text-center card-product" key={`bestldng`}>
                                    <div className="card-product__img">
                                    <Skeleton width={255} height={360}/>
                                    <ul className="card-product__imgOverlay">
                                        <li key={`srctrendldng`}><button><i className="ti-search"></i></button></li>
                                        <li key={`spntrendldng`}><button><i className="ti-shopping-cart"></i></button></li>
                                    </ul>
                                    </div>
                                    <div className="card-body">
                                    <p><Skeleton width={100}/></p>
                                    <h4 className="card-product__title"><a href="single-product.html"><Skeleton width={120} /></a></h4>
                                    <p className="card-product__price"><Skeleton width={110} /></p>
                                    </div>
                                </div>
                            </Fragment>
                        )
                        :
                        best?.map((dabest, index) => {
                            if(index < 8) {
                                return(
                                    <div className={dabest?.Stok === 0 ? 'card text-center card-product habis' : 'card text-center card-product'} key={`bestser${index}`}>
                                        <div className="card-product__img">
                                        {dabest?.Sampul.length < 1
                                        ?
                                        (
                                            <img className="img-fluid" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ENpnnhPgDE0BVDsiIAOhl8dbGVE_5vc11w&usqp=CAU' alt=""/>
                                        )
                                        :
                                        dabest?.Sampul.map((sampul, index) => {
                                            if(index < 1) {
                                                return(
                                                    <img key={`sampul${index}`} className="img-fluid" src={sampul?.SrcGambar} alt="" width={255} height={360}/>
                                                )
                                            }
                                        })}
                                        <ul className="card-product__imgOverlay">
                                            <li key={`srctrend${index}`}><Link onClick={handleScroll} to={`/buku/${dabest?.id}`}><button><i className="ti-search"></i></button></Link></li>
                                            <li key={`spntrend${index}`}><button id={dabest?.id} onClick={handleAdd}><i id={dabest?.id} className="ti-shopping-cart"></i></button></li>
                                        </ul>
                                        </div>
                                        <div className="card-body">
                                        <p>{dabest.Penulis}</p>
                                        <h4 className="card-product__title"><Link to={`/buku/${dabest?.id}`}>{dabest?.Judul}</Link></h4>
                                        <p className="card-product__price">Rp {separator(dabest?.Harga)}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })

    const dataKupon = loadingKupon ?
                        ''
                    : filteredKupon.length > 0
                    ? filteredKupon?.map((kup, index) => {
                            return(
                                <div className="accordion-card mb-4" key={`accordion${index}`}>
                                    <div className="accordion-header" id={`headingKupon${index}`}>
                                        <h5 className="mb-0">
                                            <a onClick={() => {handleChevron(`chevronicon${index}`)}} className="accordion-button w-100" type='button' data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseOne">
                                                <div className="row">
                                                    <div className="col-10">
                                                        {kup.Judul}
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        <i id={`chevronicon${index}`} className="fa-solid fa-chevron-down mr-2"></i>
                                                    </div>
                                                </div>
                                            </a>
                                        </h5>
                                    </div>
                                    <div id={`collapse${index}`} className="collapse" aria-labelledby={`headingKupon${index}`} data-parent="#accordion">
                                        <div className="card-body">
                                            <h4 className='active'><b><i>{kup.Kode}</i></b></h4>
                                            <h6>{kup.Tipe ? `${kup.Potongan}%` : `Rp ${separator(kup.Potongan)}`}</h6>
                                            <p className='m-0'>{kup.Teaser}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    :   <div><p className="accordion-button w-100">Kupon tidak ditemukan...</p></div>

    return (
        <Fragment>
            <section className="section-margin calc-60px">
                <div className="container">
                    <div className="section-intro pb-60px">
                        <p>Buku yang paling populer</p>
                        <h2>Buku <span className="section-intro__style">Populer</span></h2>
                    </div>
                    <OwlCarousel 
                    id="bestSellerCarousel"
                    className='owl-carousel owl-theme d-none d-xl-block' 
                    loop={false} 
                    margin={30} 
                    nav={true} 
                    navText={["<i class='ti-arrow-left'></i>","<i class='ti-arrow-right'></i>"]} 
                    dots={false} 
                    responsive={{
                        0:{
                        items:1
                        },
                        600:{
                        items: 2
                        },
                        900:{
                        items:3
                        },
                        1130:{
                        items:4
                        }
                    }}>
                        {trending}
                    </OwlCarousel>
                    <OwlCarousel 
                    id="bestSellerCarousel"
                    className='owl-carousel owl-theme d-xl-none' 
                    loop={false} 
                    margin={30} 
                    nav={true} 
                    navText={["<i class='ti-arrow-left'></i>","<i class='ti-arrow-right'></i>"]} 
                    dots={false}
                    items={'2'} 
                    responsive={{
                        0:{
                        items:1
                        },
                        600:{
                        items: 2
                        },
                        900:{
                        items:3
                        },
                        1130:{
                        items:4
                        }
                    }}>
                        {trendingResponsive}
                    </OwlCarousel>
                </div>
            </section>
            {loadingKupon ? '' :
                <section className="" id="parallax-1" data-anchor-target="#parallax-1" data-300-top="background-position: 20px 30px" data-top-bottom="background-position: 0 20px" type="button" data-toggle="modal" data-target="#exampleModalCenter">
                    <img src={hKupon.SrcGambar} alt="" className='coupon-image'/>
                </section>
            }
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title active" id="exampleModalLongTitle">Kode Kupon</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row pb-3">
                                <div className="col-6">
                                    <center>
                                        <a onClick={tapGlobal} href="none" className='inactive active' id='global'>Kode Kupon</a>
                                    </center>
                                </div>
                                <div className="col-6">
                                    <center>
                                        <a onClick={tapPrivate} href="none" className='inactive' id='private'>Kupon Saya</a>
                                    </center>
                                </div>
                            </div>
                            <form action="" onSubmit={e => e.preventDefault()}>
                                <input onChange={_.debounce(handleKeyword, 200)} type="text" className='form-control mb-4' placeholder='Masukkan kata kunci...' />
                            </form>
                            <div id="accordion" style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
                                {dataKupon}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="section-margin calc-60px">
                <div className="container">
                    <div className="section-intro pb-60px">
                        <p>Buku dengan penjualan terbanyak</p>
                        <h2>Buku <span className="section-intro__style">Terlaris</span></h2>
                    </div>
                    <OwlCarousel 
                    id="bestSellerCarousel"
                    className='owl-carousel owl-theme d-none d-xl-block' 
                    loop={false} 
                    margin={30} 
                    nav={true} 
                    navText={["<i class='ti-arrow-left'></i>","<i class='ti-arrow-right'></i>"]} 
                    dots={false} 
                    responsive={{
                        0:{
                        items:1
                        },
                        600:{
                        items: 2
                        },
                        900:{
                        items:3
                        },
                        1130:{
                        items:4
                        }
                    }}>
                        {thebest}
                    </OwlCarousel>
                    <OwlCarousel 
                    id="bestSellerCarousel"
                    className='owl-carousel owl-theme d-xl-none' 
                    loop={false} 
                    margin={30} 
                    nav={true} 
                    navText={["<i class='ti-arrow-left'></i>","<i class='ti-arrow-right'></i>"]} 
                    dots={false} 
                    responsive={{
                        0:{
                        items:1
                        },
                        600:{
                        items: 2
                        },
                        900:{
                        items:3
                        },
                        1130:{
                        items:4
                        }
                    }}>
                        {thebestResponsive}
                    </OwlCarousel>
                </div>
            </section>
        </Fragment>
    )
}
