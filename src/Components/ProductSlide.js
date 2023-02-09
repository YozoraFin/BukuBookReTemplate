/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useReducer, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useLocation } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export default function ProductSlide() {
    const [trend, setTrend] = useState([]);
    const [loadingTrend, setloadingTrend] = useState(true);
    const [best, setBest] = useState([]);
    const [loadingBest, setloadingBest] = useState(true);
    const [rerender, setRerender] = useState(false);
    const param = useLocation();

    const handleScroll = () => {
        window.scrollTo(0, 400)
    }

    const handleAdd = (e) => {
        const MySwal = withReactContent(Swal)
        var formData = new FormData()
        formData.append('AksesToken', localStorage.getItem('accesstoken'))
        formData.append('id', e.target.id)
        formData.append('qty', 1)
        axios.post('http://localhost/bukubook/api/cartapi/add', formData).then((res) => {
            if(res.data.status === 200) {
                MySwal.fire({
                    title: 'Buku Berhasil Ditambahkan',
                    text: 'Kamu bisa melihat barangmu di keranjang',
                    icon: 'success'
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

    const getTrend = () => {
        axios.get(`http://localhost/bukubook/api/bukuapi/trend`).then((res) => {
            setTrend(res.data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setloadingTrend(false)
        })
    }

    const getBest = () => {
        axios.get(`http://localhost/bukubook/api/bukuapi/best`).then((res) => {
            setBest(res.data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setloadingBest(false)
        })
    }

    useEffect(() => {
        if(best?.length < 1 || trend?.length < 1) {
            getBest()
            getTrend()
            setRerender(!rerender);
        }
    },[best, trend, param, rerender])

    const trending =    loadingTrend ?
                        (
                            <Fragment>
                                <div className="card text-center card-product" key={`trendldng`}>
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
                                    <div className="card text-center card-product" key={`trend${index}`}>
                                        <div className="card-product__img">
                                        {datrend.SampulBuku.map((sampul, index) => {
                                            if(index < 1) {
                                                return(
                                                    <img key={`sampul${index}`} className="img-fluid" src={sampul.Sampul} alt="" width={255} height={360} />
                                                )
                                            }
                                        })}
                                        <ul className="card-product__imgOverlay">
                                            <li key={`srctrend${index}`}><Link onClick={handleScroll} to={`/buku/${datrend.ID}`}><button><i className="ti-search"></i></button></Link></li>
                                            <li key={`spntrend${index}`}><button id={datrend.ID} onClick={handleAdd}><i id={datrend.ID} className="ti-shopping-cart"></i></button></li>
                                        </ul>
                                        </div>
                                        <div className="card-body">
                                        <p>{datrend.Penulis}</p>
                                        <h4 className="card-product__title"><Link to={`/buku/${datrend.ID}`}>{datrend.Judul}</Link></h4>
                                        <p className="card-product__price">{datrend.Harga}</p>
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
                                    <div className="card text-center card-product" key={`best${index}`}>
                                        <div className="card-product__img">
                                        {dabest.SampulBuku.map((sampul, index) => {
                                            if(index < 1) {
                                                return(
                                                    <img key={`sampul${index}`} className="img-fluid" src={sampul.Sampul} alt="" width={255} height={360}/>
                                                )
                                            }
                                        })}
                                        <ul className="card-product__imgOverlay">
                                            <li key={`srctrend${index}`}><Link onClick={handleScroll} to={`/buku/${dabest.ID}`}><button><i className="ti-search"></i></button></Link></li>
                                            <li key={`spntrend${index}`}><button id={dabest.ID} onClick={handleAdd}><i id={dabest.ID} className="ti-shopping-cart"></i></button></li>
                                        </ul>
                                        </div>
                                        <div className="card-body">
                                        <p>{dabest.Penulis}</p>
                                        <h4 className="card-product__title"><Link to={`/buku/${dabest.ID}`}>{dabest.Judul}</Link></h4>
                                        <p className="card-product__price">{dabest.Harga}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })

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
                    className='owl-carousel owl-theme' 
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
                </div>
            </section>
            <section className="section-margin calc-60px">
                <div className="container">
                    <div className="section-intro pb-60px">
                        <p>Buku dengan penjualan terbanyak</p>
                        <h2>Buku <span className="section-intro__style">Terlaris</span></h2>
                    </div>
                    <OwlCarousel 
                    id="bestSellerCarousel"
                    className='owl-carousel owl-theme' 
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
                </div>
            </section>
        </Fragment>
    )
}
