import React, { useState, useEffect, Fragment } from 'react'
import { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/effect-fade";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function HomeSlider() {
    const [hero, setHero] = useState([]);
    const [heroLoading, setHeroLoading] = useState(true);

    const setHeroData = () => {
        axios.get(`http://localhost/bukubook/api/eventapi/get`).then((res) => {
            setHero(res.data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setHeroLoading(false)
        })
    }

    useEffect(() => {
        setHeroData();
    }, [])
    const heroData =    heroLoading ?
                        (
                            <Fragment>
                                <SwiperSlide key={'headslideldng'}>
                                    <div className="row align-items-center pt-60px">
                                        <div className="col-5 d-none d-sm-block">
                                            <div className="hero-banner__img">
                                            <img className="img-fluid" src="https://i1.sndcdn.com/artworks-000596804468-kex36w-t500x500.jpg" alt=""/>
                                            </div>
                                        </div>
                                        <div className="col-sm-7 col-lg-6 offset-lg-1 pl-4 pl-md-5 pl-lg-0">
                                            <div className="hero-banner__content">
                                            <h4>Membaca itu menyenangkan</h4>
                                            <h1>Jelajahi lebih jauh</h1>
                                            <p>Mari tingkatkan minat literasi bersama</p>
                                            <Link className="button button-hero" to={'/katalog'}>Jelajahi sekarang</Link>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide key={'headslide1'}>
                                    <div className="row align-items-center pt-60px">
                                        <div className="col-5 d-none d-sm-block">
                                            <div className="hero-banner__img">
                                            <img className="img-fluid" src="https://i1.sndcdn.com/artworks-000596804468-kex36w-t500x500.jpg" alt=""/>
                                            </div>
                                        </div>
                                        <div className="col-sm-7 col-lg-6 offset-lg-1 pl-4 pl-md-5 pl-lg-0">
                                            <div className="hero-banner__content">
                                            <h4>Membaca itu menyenangkan</h4>
                                            <h1>Jelajahi lebih jauh</h1>
                                            <p>Mari tingkatkan minat literasi bersama</p>
                                            <Link className="button button-hero" to={'/katalog'}>Jelajahi sekarang</Link>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Fragment>
                        )
                        :
                        hero?.map((data, index) => {
                            return(
                                <SwiperSlide key={'headslide'+index}>
                                    <div className="row align-items-center pt-60px">
                                        <div className="col-5 d-none d-sm-block">
                                            <div className="hero-banner__img">
                                            <img className="img-fluid" src={data.Banner} alt=""/>
                                            </div>
                                        </div>
                                        <div className="col-sm-7 col-lg-6 offset-lg-1 pl-4 pl-md-5 pl-lg-0">
                                            <div className="hero-banner__content">
                                            <h4>BukuBook</h4>
                                            <h1>{data.Judul}</h1>
                                            <p dangerouslySetInnerHTML={{ __html:data.Deskripsi }}></p>
                                            <Link className="button button-hero" to={'/katalog'}>Jelajahi sekarang</Link>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })

    return (
        <section className="hero-banner">
            <div className="container">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    loop={true}
                    effect={"fade"}
                    spaceBetween={0}
                    autoplay={{ delay: 5000 }}
                    slidesPerView={1}
                    className='swiper'
                    fadeEffect={{crossFade: true}}
                >
                    {heroData}
                </Swiper>
            </div>
        </section>
    )
}
