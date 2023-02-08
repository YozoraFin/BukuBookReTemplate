/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function BlogDetail() {
    const [blog, setBlog] = useState({})
    const [loadingBlog, setLoadingBlog] = useState(true)
    const [nextz, setNext] = useState({})
    const [prevz, setPrevz] = useState({})
    const params = useParams()
    const navigate = useNavigate()

    const getBlog = () => {
        axios.get(`http://localhost/bukubook/api/articleapi/get/${params.id}`).then((res) => {
            setBlog(res.data.data)
            setNext(res.data.data?.Next)
            setPrevz(res.data.data?.Prev)
        }).catch((error) => {
            if(error.code === 'ERR_BAD_RESPONSE') {
                navigate('/not-found')
            } else {
                console.log(error)
            }
        }).finally(() => {
            setLoadingBlog(false)
        })
    }

    useEffect(() => {
        getBlog()
    },[params.id])

    let prev;
    if(prevz?.ID !== 0) {
        prev = loadingBlog ?
                (<Skeleton width={200} height={50} /> )
                :       
                (
                <Fragment>
					<div className="thumb">
						<Link to={`/blog/${prevz.ID}`}>
							<img className="img-fluid" src={prevz.Gambar} alt="" width={60} height={60} />
						</Link>
					</div>
					<div className="arrow">
						<Link to={`/blog/${prevz.ID}`}>
							<span className="lnr text-white lnr-arrow-left"></span>
						</Link>
					</div>
					<div className="detials">
						<p>Postingan Sebelumnya</p>
						<Link to={`/blog/${prevz.ID}`}>
							<h4>{prevz.Judul}</h4>
						</Link>
					</div>
                </Fragment>
        )
    }
    let next;
    if(nextz?.ID !== 0) {
        next = loadingBlog ?
                (<Skeleton width={200} height={50} /> )
                :
                (
                <Fragment>
					<div className="detials">
						<p>Postingan Selanjutnya</p>
						<Link to={`/blog/${nextz.ID}`}>
							<h4>{nextz.Judul}</h4>
						</Link>
					</div>
					<div className="arrow">
						<Link to={`/blog/${nextz.ID}`}>
							<span className="lnr text-white lnr-arrow-right"></span>
						</Link>
					</div>
					<div className="thumb">
						<Link to={`/blog/${nextz.ID}`}>
							<img className="img-fluid" src={nextz.Gambar} alt="" width={60} height={60} />
						</Link>
					</div>
                </Fragment>   
                )
    }
    
    return (
        <div className="col-lg-8 posts-list">
            <div className="single-post row">
                <div className="col-lg-12">
					<div className="feature-img">
							{loadingBlog ? <Skeleton width={730} height={550}/> : <img className="img-fluid" src={blog?.Gambar} alt=""/>} 
					</div>
                </div>
                <div className="col-lg-3  col-md-3">
					<div className="blog_info text-right">
						<div className="post_tag">
								{loadingBlog ? <Skeleton width={60} /> : <a href="?">{blog?.Kategori}</a>}
						</div>
						<ul className="blog_meta list">
							<li>
								{loadingBlog ? <Skeleton width={110}/> : 
									<Link to={`/blog?penulis=${blog?.Penulis}`}>{blog?.Penulis}
										<i className="lnr lnr-user"></i>
									</Link>
								}
							</li>
							<li>
								{loadingBlog ? <Skeleton width={108}/> : 
									<a href="?">{blog?.Tanggal}
											<i className="lnr lnr-calendar-full"></i>
									</a>
								}
							</li>
							<li>
								<a href="?">1.2M Views
									<i className="lnr lnr-eye"></i>
								</a>
							</li>
							<li>
								<a href="?">06 Comments
										<i className="lnr lnr-bubble"></i>
								</a>
							</li>
						</ul>
                	</div>
                </div>
                <div className="col-lg-9 col-md-9 blog_details">
					{loadingBlog ? <Skeleton width={200} height={30}/> : <h2>{blog?.Judul}</h2>}
					{loadingBlog ? <Skeleton count={10}/> : <p className="excert" dangerouslySetInnerHTML={{ __html:blog?.Isi }}></p>}
                </div>
            </div>
            <div className="navigation-area">
				<div className="row">
					<div className="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
						{prev}
					</div>
					<div className="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
						{next}
					</div>
				</div>
            </div>
            <div className="comments-area">
				<h4>05 Comments</h4>
				<div className="comment-list">
					<div className="single-comment justify-content-between d-flex">
						<div className="user justify-content-between d-flex">
							<div className="thumb">
								<img src="/img/blog/c1.jpg" alt=""/>
							</div>
							<div className="desc">
								<h5>
										<a href="?">Emilly Blunt</a>
								</h5>
								<p className="date">December 4, 2017 at 3:12 pm </p>
								<p className="comment">
										Never say goodbye till the end comes!
								</p>
							</div>
						</div>
						<div className="reply-btn">
							<a href="?" className="btn-reply text-uppercase">reply</a>
						</div>
					</div>
				</div>
				<div className="comment-list left-padding">
					<div className="single-comment justify-content-between d-flex">
						<div className="user justify-content-between d-flex">
							<div className="thumb">
								<img src="/img/blog/c2.jpg" alt=""/>
							</div>
							<div className="desc">
								<h5>
										<a href="?">Elsie Cunningham</a>
								</h5>
								<p className="date">December 4, 2017 at 3:12 pm </p>
								<p className="comment">
										Never say goodbye till the end comes!
								</p>
							</div>
						</div>
						<div className="reply-btn">
							<a href="?" className="btn-reply text-uppercase">reply</a>
						</div>
					</div>
				</div>
				<div className="comment-list left-padding">
					<div className="single-comment justify-content-between d-flex">
						<div className="user justify-content-between d-flex">
							<div className="thumb">
								<img src="/img/blog/c3.jpg" alt=""/>
							</div>
							<div className="desc">
								<h5>
										<a href="?">Annie Stephens</a>
								</h5>
								<p className="date">December 4, 2017 at 3:12 pm </p>
								<p className="comment">
										Never say goodbye till the end comes!
								</p>
							</div>
						</div>
						<div className="reply-btn">
								<a href="?" className="btn-reply text-uppercase">reply</a>
						</div>
					</div>
				</div>
				<div className="comment-list">
					<div className="single-comment justify-content-between d-flex">
						<div className="user justify-content-between d-flex">
							<div className="thumb">
								<img src="/img/blog/c4.jpg" alt=""/>
							</div>
							<div className="desc">
								<h5>
									<a href="?">Maria Luna</a>
								</h5>
								<p className="date">December 4, 2017 at 3:12 pm </p>
								<p className="comment">
										Never say goodbye till the end comes!
								</p>
							</div>
						</div>
						<div className="reply-btn">
							<a href="?" className="btn-reply text-uppercase">reply</a>
						</div>
					</div>
				</div>
				<div className="comment-list">
					<div className="single-comment justify-content-between d-flex">
						<div className="user justify-content-between d-flex">
							<div className="thumb">
								<img src="/img/blog/c5.jpg" alt=""/>
							</div>
							<div className="desc">
								<h5>
										<a href="?">Ina Hayes</a>
								</h5>
								<p className="date">December 4, 2017 at 3:12 pm </p>
								<p className="comment">
										Never say goodbye till the end comes!
								</p>
							</div>
						</div>
						<div className="reply-btn">
								<a href="?" className="btn-reply text-uppercase">reply</a>
						</div>
					</div>
				</div>
            </div>
            <div className="comment-form">
                    <h4>Leave a Reply</h4>
                    <form>
                            <div className="form-group form-inline">
                                    <div className="form-group col-lg-6 col-md-6 name">
                                            <input type="text" className="form-control" id="name" placeholder="Enter Name"/>
                                    </div>
                                    <div className="form-group col-lg-6 col-md-6 email">
                                            <input type="email" className="form-control" id="email" placeholder="Enter email address"/>
                                    </div>
                            </div>
                            <div className="form-group">
                                    <input type="text" className="form-control" id="subject" placeholder="Subject"/>
                            </div>
                            <div className="form-group">
                                    <textarea className="form-control mb-10" rows="5" name="message" placeholder="Messege"
                                            required=""></textarea>
                            </div>
                            <a href="?" className="button button-postComment button--active">Post Comment</a>
                    </form>
            </div>
        </div>
    )
}
