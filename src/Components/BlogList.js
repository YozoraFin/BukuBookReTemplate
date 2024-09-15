/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import Skeleton from 'react-loading-skeleton';
import ReactPaginate from 'react-paginate';
import { Link, useLocation } from 'react-router-dom';

export default function BlogList() {
    const [blog, setBlog] = useState([])
    const [loadingBlog, setLoadingBlog] = useState(true)
    const [offsetz, setoffsetz] = useState(0)
    const [perPage] = useState(5)
    const [pageCount, setPageCount] = useState(0)
    const [totalData, setTotalData] = useState([])
    const param = useLocation().search
    const link = new URLSearchParams(param)

    const handleScroll = () => {
        window.scrollTo(0, 420)
    }

    const getBlog = () => {
        if(link.get('kategori') !== null) {
            axios.get('http://localhost:5000/artikel?kategori='+link.get('kategori')).then((res) => {
                const data = res.data.data
                setTotalData(res.data.data)
                const slice = data?.slice(offsetz, offsetz + perPage);
                const bloglist = slice.map(blogd => 
                        <article className="row blog_item" key={`blist${blogd?.id}`}>
                            <div className="col-md-3">
                                <div className="blog_info text-right">
                                    <div className="post_tag">
                                        <Link onClick={handleScroll} to={`/blog?kategori=${blogd?.Kategori?.Kategori}`}>{blogd?.Kategori?.Kategori}</Link>
                                    </div>
                                    <ul className="blog_meta list">
                                        <li>
                                            <Link onClick={handleScroll} to={`/blog?penulis=${blogd?.Penulis}`}>{blogd?.Penulis}
                                                <i className="lnr lnr-user"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={handleScroll} to={`/blog/${blogd?.id}`}>{blogd?.Tanggal}
                                                <i className="lnr lnr-calendar-full"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={handleScroll} to={`/blog/${blogd?.id}`}>{0} Komentar
                                                <i className="lnr lnr-bubble"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="blog_post">
                                    {blogd?.SrcGambar === '' ?
                                    <img className="card-img rounded-0" src={'https://img.freepik.com/free-photo/blank-notepad-notebook-with-white-pages_144627-32583.jpg?w=996&t=st=1677736516~exp=1677737116~hmac=03e820e5c49fff992af42c9076bf636d54d95029902fc79b8b746859bc08cf36'} alt=""/>
                                        :
                                    <img src={blogd?.SrcGambar} alt=""/>
                                    }
                                    <div className="blog_details">
                                        <Link onClick={handleScroll} to={`/blog/${blogd?.id}`}>
                                            <h2>{blogd?.Judul}</h2>
                                        </Link>
                                        <p>{blogd?.Teaser}</p>
                                        <Link onClick={handleScroll} className="button button-blog" to={`/blog/${blogd?.id}`}>Selengkapnya</Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    )
                    setBlog(bloglist)
                    setPageCount(Math.ceil(data.length / perPage))
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setLoadingBlog(false);
            })
        } else if(link.get('penulis') !== null) {
            axios.get('http://localhost:5000/artikel?penulis='+link.get('penulis')).then((res) => {
                const data = res.data.data
                setTotalData(res.data.data)
                const slice = data?.slice(offsetz, offsetz + perPage);
                const bloglist = slice.map(blogd => 
                    
                        <article className="row blog_item" key={`blist${blogd?.id}`}>
                            <div className="col-md-3">
                                <div className="blog_info text-right">
                                    <div className="post_tag">
                                        <Link onClick={handleScroll} to={`/blog?kategori=${blogd?.Kategori?.Kategori}`}>{blogd?.Kategori?.Kategori}</Link>
                                    </div>
                                    <ul className="blog_meta list">
                                        <li>
                                            <Link onClick={handleScroll} to={`/blog?penulis=${blogd?.Penulis}`}>{blogd?.Penulis}
                                                <i className="lnr lnr-user"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={handleScroll} to={`/blog/${blogd?.id}`}>{blogd?.Tanggal}
                                                <i className="lnr lnr-calendar-full"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={handleScroll} to={`/blog/${blogd?.id}`}>{blogd?.JumlahKomen} Komentar
                                                <i className="lnr lnr-bubble"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="blog_post">
                                    {blogd?.SrcGambar === '' ?
                                    <img className="card-img rounded-0" src={'https://img.freepik.com/free-photo/blank-notepad-notebook-with-white-pages_144627-32583.jpg?w=996&t=st=1677736516~exp=1677737116~hmac=03e820e5c49fff992af42c9076bf636d54d95029902fc79b8b746859bc08cf36'} alt=""/>
                                        :
                                    <img src={blogd?.SrcGambar} alt=""/>
                                    }
                                    <div className="blog_details">
                                        <Link onClick={handleScroll} to={`/blog/${blogd?.id}`}>
                                            <h2>{blogd?.Judul}</h2>
                                        </Link>
                                        <p>{blogd?.Teaser}</p>
                                        <Link onClick={handleScroll} className="button button-blog" to={`/blog/${blogd?.id}`}>Selengkapnya</Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    )
                    setBlog(bloglist)
                    setPageCount(Math.ceil(data.length / perPage))
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setLoadingBlog(false);
            })
        } else {
            axios.get('http://localhost:5000/artikel').then((res) => {
                const data = res.data.data
                setTotalData(res.data.data)
                const slice = data?.slice(offsetz, offsetz + perPage);
                const bloglist = slice?.map(blogd =>
                    <article className="row blog_item" key={`blist${blogd?.id}`}>
                        <div className="col-md-3">
                            <div className="blog_info text-right">
                                <div className="post_tag">
                                    <Link onClick={handleScroll} to={`/blog?kategori=${blogd?.Kategori?.Kategori}`}>{blogd?.Kategori?.Kategori}</Link>
                                </div>
                                <ul className="blog_meta list">
                                    <li>
                                        <Link onClick={handleScroll} to={`/blog?penulis=${blogd?.Penulis}`}>{blogd?.Penulis}
                                            <i className="lnr lnr-user"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={handleScroll} to={`/blog/${blogd?.id}`}>{blogd?.Tanggal}
                                            <i className="lnr lnr-calendar-full"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={handleScroll} to={`/blog/${blogd?.id}`}>{blogd?.JumlahKomen} Komentar
                                            <i className="lnr lnr-bubble"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="blog_post">
                                {blogd?.SrcGambar === '' ?
                                    <img className="card-img rounded-0" src={'https://img.freepik.com/free-photo/blank-notepad-notebook-with-white-pages_144627-32583.jpg?w=996&t=st=1677736516~exp=1677737116~hmac=03e820e5c49fff992af42c9076bf636d54d95029902fc79b8b746859bc08cf36'} alt=""/>
                                    :
                                    <img src={blogd?.SrcGambar} alt=""/>
                                }
                                <div className="blog_details">
                                    <Link onClick={handleScroll} to={`/blog/${blogd?.id}`}>
                                        <h2>{blogd?.Judul}</h2>
                                    </Link>
                                    <p>{blogd?.Teaser}</p>
                                    <Link onClick={handleScroll} className="button button-blog" to={`/blog/${blogd?.id}`}>Selengkapnya</Link>
                                </div>
                            </div>
                        </div>
                    </article>
                )
                setBlog(bloglist)
                setPageCount(Math.ceil(data?.length / perPage))
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setLoadingBlog(false);
            })
        }

    }

    const handlePageClick = (e) => {
        window.scrollTo(0, 420)
        const selectedPage = e.selected;
        setoffsetz(selectedPage * perPage);
    }

    useEffect(() => {
      getBlog()
    }, [param, offsetz])

    const dBlog =   loadingBlog ?
                    (
                        <article className="row blog_item" key={`blistldng`}>
                            <div className="col-md-3">
                                <div className="blog_info text-right">
                                    <div className="post_tag">
                                        <Link onClick={handleScroll} to={`?`}><Skeleton width={70} /></Link>
                                    </div>
                                    <ul className="blog_meta list">
                                        <li>
                                            <Link onClick={handleScroll} to={`?`}><Skeleton width={120} />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={handleScroll} to={`?`}><Skeleton width={120} />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={handleScroll} to={`?`}><Skeleton width={120} />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="blog_post">
                                    <Skeleton width={540} height={360} />
                                    <div className="blog_details">
                                        <Link onClick={handleScroll} to={`?`}>
                                            <h2><Skeleton width={150} /></h2>
                                        </Link>
                                        <p><Skeleton count={3} /></p>
                                        <Link onClick={handleScroll} className="button button-blog" to={`?`}>Selengkapnya</Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    )
                    :
                    blog

    return (
        <div className="col-lg-8">
                    <div className="blog_left_sidebar">
                        {dBlog}
                        <div className="row">
                            <div className="col-md-3">
                                
                            </div>
                            <div className="col-md-9">
                                <nav className="blog-pagination justify-content-center d-flex">
                                    {totalData?.length > perPage ? <ReactPaginate
                                        previousLabel={<GrLinkPrevious/>}
                                        nextLabel={<GrLinkNext/>}
                                        breakLabel={"..."}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={5}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName={"pagination"}
                                        pageClassName={"page-item"}
                                        pageLinkClassName={"page-link"}
                                        nextClassName={'page-item'}
                                        nextLinkClassName={'page-link grmt'}
                                        previousClassName={'page-item'}
                                        previousLinkClassName={'page-link grmt'}
                                        activeClassName={"active"}/> : ''}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
    )
}
