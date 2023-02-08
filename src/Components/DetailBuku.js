import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link, useParams } from 'react-router-dom'
import { SwiperSlide, Swiper } from 'swiper/react'

export default function DetailBuku() {
    const [DataBuku, setDataBuku] = useState([])
    const [loadingDataBuku, setLoadingDataBuku] = useState(true)
    const param = useParams()
    
    const getData = () => {
        axios.get(`http://localhost/bukubook/api/bukuapi/get/${param.id}`).then((res) => {
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
    let CheckSB = DataBuku[0]?.SampulBuku
    if(loadingDataBuku) {
        SampulBuku = <Skeleton width={300} height={400} />
    } else {
        if(CheckSB.length === 1) {
            SampulBuku = (<img key={`sampultunggal`} className='sampuldetail' src={DataBuku[0]?.SampulBuku[0].Sampul} alt=""/>)
        } else {
            SampulBuku = DataBuku[0]?.SampulBuku?.map((sampuls, index) => {
                return(<SwiperSlide>
                    <img key={`sampuldetail${index}`} className='sampuldetail' src={sampuls.Sampul} alt=""/>
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
                            {loadingDataBuku ? <Skeleton width={150} height={40}/> : <h1>{DataBuku[0]?.Judul}</h1>}
                            <nav aria-label="breadcrumb" className="banner-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={'/'}>Beranda</Link></li>
                                    <li className="breadcrumb-item"><Link to={'/katalog'}>Katalog</Link></li>
                                    {loadingDataBuku ? <li className="breadcrumb-item active" aria-current="page"><Skeleton width={50}/></li> : <li className="breadcrumb-item active" aria-current="page">{DataBuku[0]?.Judul}</li>}
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
                                {loadingDataBuku ? <h3><Skeleton width={100} /></h3>: <h3>{DataBuku[0]?.Judul}</h3>}
                                {loadingDataBuku ? <h2><Skeleton width={120}/></h2> : <h2>{DataBuku[0]?.Harga}</h2>}
                                <ul className="list">
                                    <li><a className="active" href="?"><span>Genre</span> : {loadingDataBuku ? <Skeleton width={70}/> : DataBuku[0]?.Genre}</a></li>
                                    <li><a href="?"><span>Stok</span> : {loadingDataBuku ? <Skeleton width={50}/> : DataBuku[0]?.Stok}</a></li>
                                </ul>
                                <div className="pcount my-2">
                                    <label htmlFor="qty">Quantity:</label>
                                    <button className="" type="button"><i className="ti-angle-left"></i></button>
                                    <input type="text" name="qty" id="sst" size="2" maxlength="12" value="1" title="Quantity:" className="input-text qty"/>
                                    <button className="" type="button"><i className="ti-angle-right"></i></button>
                                </div>
                                <a className="button primary-btn" href="?">Add to Cart</a>               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="product_description_area">
                <div className="container">
                    {loadingDataBuku ? <div className="tab-content"><Skeleton count={10}/></div> : <div className="tab-content" dangerouslySetInnerHTML={{ __html: DataBuku[0]?.Sinopsis }}></div>}
                </div>
            </section>
        </Fragment>
    )
}
