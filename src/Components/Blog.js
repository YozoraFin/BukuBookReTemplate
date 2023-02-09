/* eslint-disable array-callback-return */
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Blog() {
    const [kategori, setKategori] = useState([])
    const [loadingKategori, setLoadingKategori] = useState(true)
    const [blog, setBlog] = useState([])
    const [loadingBlog, setLoadingBlog] = useState(true)
    const param = useLocation().search
    const link = new URLSearchParams(param)

    const handleScroll = () => {
        window.scrollTo(0, 400)
    }

    const getBlog = () => {
        axios.get('http://localhost/bukubook/api/articleapi/get').then((res) => {
            setBlog(res.data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadingBlog(false);
        })
    }

    const getKategori = () => {
        axios.get('http://localhost/bukubook/api/articleapi/kategori').then((res) => {
            setKategori(res.data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadingKategori(false)
        })
    }

    useEffect(() => {
        getBlog()
        getKategori()
    },[])

    const dKategori =   loadingKategori ?
                        (
                            <Fragment>
                                <li key={`kategorildng1`}>
                                    <a href="?" className="d-flex justify-content-between">
                                        <p><Skeleton width={80} /></p>
                                        <p><Skeleton width={20} /></p>
                                    </a>
                                </li>
                                <li key={`kategorildng2`}>
                                    <a href="?" className="d-flex justify-content-between">
                                        <p><Skeleton width={80} /></p>
                                        <p><Skeleton width={20} /></p>
                                    </a>
                                </li>
                                <li key={`kategorildng3`}>
                                    <a href="?" className="d-flex justify-content-between">
                                        <p><Skeleton width={80} /></p>
                                        <p><Skeleton width={20} /></p>
                                    </a>
                                </li>
                            </Fragment>
                        )
                        :
                        kategori?.map((kategorid, index) => {
                            return(
                                <li key={`kategori${index}`}>
                                    <Link onClick={handleScroll} to={`/blog?kategori=${kategorid.Kategori}`} className="d-flex justify-content-between">
                                        <p>{kategorid.Kategori}</p>
                                        <p>{kategorid.Jumlah}</p>
                                    </Link>
                                </li>
                            )
                        })
                
    const dBlog =   loadingBlog ?
                    (
                        <Fragment>
                            <div className="media post_item" key={'lbsideldng1'}>
                                <Skeleton width={100} height={60} />
                                <div className="media-body">
                                    <a href="?">
                                        <h3><Skeleton width={120} /></h3>
                                    </a>
                                    <p><Skeleton width={80} /></p>
                                </div>
                            </div>
                            <div className="media post_item" key={'lbsideldng2'}>
                                <Skeleton width={100} height={60} />
                                <div className="media-body">
                                    <a href="?">
                                        <h3><Skeleton width={120} /></h3>
                                    </a>
                                    <p><Skeleton width={80} /></p>
                                </div>
                            </div>
                            <div className="media post_item" key={'lbsideldng3'}>
                                <Skeleton width={100} height={60} />
                                <div className="media-body">
                                    <a href="?">
                                        <h3><Skeleton width={120} /></h3>
                                    </a>
                                    <p><Skeleton width={80} /></p>
                                </div>
                            </div>
                            <div className="media post_item" key={'lbsideldng4'}>
                                <Skeleton width={100} height={60} />
                                <div className="media-body">
                                    <a href="?">
                                        <h3><Skeleton width={120} /></h3>
                                    </a>
                                    <p><Skeleton width={80} /></p>
                                </div>
                            </div>
                        </Fragment>
                    )
                    :
                    blog?.map((blogd, index) => {
                        if(index < 4) {
                            return(
                                <div className="media post_item" key={`lbside${index}`}>
                                    <img src={blogd.Gambar} alt="post" width={120} height={60}/>
                                    <div className="media-body">
                                        <Link onClick={handleScroll} to={`/blog/${blogd.ID}`}>
                                            <h3>{blogd.Judul}</h3>
                                        </Link>
                                        <p>{blogd.Tanggal}</p>
                                    </div>
                                </div>
                            )
                        }
                    })

    return (
        <Fragment>
            <section className="blog-banner-area" id="blog">
                <div className="container h-100">
                <div className="blog-banner">
                    <div className="text-center">
                    <h1>Artikel</h1>
                    <nav aria-label="breadcrumb" className="banner-breadcrumb">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link onClick={handleScroll} to={'/'}>Beranda</Link></li>
                        {link.get('kategori') === null && link.get('penulis') === null ? <li className="breadcrumb-item active" aria-current="page">Blog</li> : <li className="breadcrumb-item" aria-current="page"><Link onClick={handleScroll} to={'/blog'}>Blog</Link></li>}
                        {link.get('kategori') !== null ? <li className="breadcrumb-item active" aria-current="page">{link.get('kategori')}</li> : ''}
                        {link.get('penulis' !== null ? <li className="breadcrumb-item active" aria-current="page">Blog</li> : '')}
                        </ol>
                    </nav>  
                    </div>
                </div>
                </div>
            </section>
            <section className="blog_area single-post-area py-80px section-margin--small">
                <div className="container">
                    <div className="row">
                        <Outlet/>
                        <div className="col-lg-4">
                            <div className="blog_right_sidebar">
                                <aside className="single_sidebar_widget popular_post_widget">
                                    <h3 className="widget_title">Artikel Terbaru</h3>
                                    {dBlog}
                                    <div className="br"></div>
                                </aside>
                                <aside className="single_sidebar_widget post_category_widget">
                                    <h4 className="widget_title">Kategori</h4>
                                    <ul className="list cat-list">
                                        {dKategori}
                                    </ul>
                                    <div className="br"></div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Fragment>
    )
}
