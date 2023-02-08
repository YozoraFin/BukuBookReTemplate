/* eslint-disable array-callback-return */
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

export default function HomeBlog() {
    const [blog, setBlog] = useState([]);
    const [loadingBlog, setLoadingBlog] = useState(true);

    const getBlog = () => {
        axios.get('http://localhost/bukubook/api/articleapi/get').then((res) => {
            setBlog(res.data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadingBlog(false);
        })
    }

    useEffect(() => {
      getBlog()
    }, [])
    
    const dBlog =   loadingBlog ?
                    (
                        <Fragment>
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0" key={`homeblogldng1`}>
                                <div className="card card-blog">
                                    <div className="card-blog__img">
                                        <Skeleton className="card-img rounded-0" height={200}/>
                                    </div>
                                    <div className="card-body">
                                        <ul className="card-blog__info">
                                        <li><a href="?">By John</a></li>
                                        <li><a href="?"><i className="ti-comments-smiley"></i> 999 Comments</a></li>
                                        </ul>
                                        <h4 className="card-blog__title"><a href="single-blog.html"><Skeleton width={200}/></a></h4>
                                        <p><Skeleton count={4} /></p>
                                        <a className="card-blog__link" href="?">Baca Selengkapnya <i className="ti-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0" key={`homeblogldng2`}>
                                <div className="card card-blog">
                                    <div className="card-blog__img">
                                        <Skeleton className="card-img rounded-0" height={240}/>
                                    </div>
                                    <div className="card-body">
                                        <ul className="card-blog__info">
                                        <li><a href="?">By John</a></li>
                                        <li><a href="?"><i className="ti-comments-smiley"></i> 999 Comments</a></li>
                                        </ul>
                                        <h4 className="card-blog__title"><a href="single-blog.html"><Skeleton width={200}/></a></h4>
                                        <p><Skeleton count={4} /></p>
                                        <a className="card-blog__link" href="?">Baca Selengkapnya <i className="ti-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0" key={`homeblogldng3`}>
                                <div className="card card-blog">
                                    <div className="card-blog__img">
                                        <Skeleton className="card-img rounded-0" height={200}/>
                                    </div>
                                    <div className="card-body">
                                        <ul className="card-blog__info">
                                        <li><a href="?">By John</a></li>
                                        <li><a href="?"><i className="ti-comments-smiley"></i> 999 Comments</a></li>
                                        </ul>
                                        <h4 className="card-blog__title"><a href="single-blog.html"><Skeleton width={200}/></a></h4>
                                        <p><Skeleton count={4} /></p>
                                        <a className="card-blog__link" href="?">Baca Selengkapnya <i className="ti-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )
                    :
                    blog?.map((blogd, index) => {
                        if(index < 3) {
                            return(
                                <div className={index > 0 ? 'col-md-6 col-lg-4 mb-4 mb-lg-0 d-none d-md-block' : 'col-md-6 col-lg-4 mb-4 mb-lg-0'} key={`homeblog${index}`}>
                                    <div className="card card-blog">
                                        <div className="card-blog__img">
                                            <img className="card-img rounded-0" src={blogd.Gambar} alt="" width={350} height={240}/>
                                        </div>
                                        <div className="card-body">
                                            <ul className="card-blog__info">
                                            <li><Link to={`/blog/?penulis=${blogd.Penulis}`}>By {blogd.Penulis}</Link></li>
                                            <li><Link to={`/blog/${blogd.ID}`}><i className="ti-comments-smiley"></i> 2 Comments</Link></li>
                                            </ul>
                                            <h4 className="card-blog__title"><Link to={`/blog/${blogd.ID}`}>{blogd.Judul}</Link></h4>
                                            <p>{blogd.Teaser}</p>
                                            <Link to={`/blog/${blogd.ID}`}>Baca Selengkapnya <i className="ti-arrow-right"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })

    return (
        <section className="blog">
            <div className="container">
                <div className="section-intro pb-60px">
                    <p>Artikel terkait</p>
                    <h2>Artikel <span className="section-intro__style">Terbaru</span></h2>
                </div>

                <div className="row">
                    {dBlog}
                </div>
            </div>
        </section>
    )
}
