/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { isEmpty } from 'lodash'
import React, { Fragment, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function BlogDetail() {
	const [commentForm, setCommentForm] = useState('')
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

	const handleComment = (e) => {
		e.preventDefault()
		var formData = new FormData(e.target)
		const MySwal = withReactContent(Swal)
		formData.append('AksesToken', localStorage.getItem('accesstoken'))
		formData.append('BlogID', params.id)
		axios.post('http://localhost/bukubook/api/komentarapi/send', formData).then((res) => {
			if(res.data.status === 200) {
				MySwal.fire({
					title: 'Sukses',
					text: 'Komentar berhasil dikirim',
					icon: 'success'
				}).then(() => {
					getBlog()
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

	const setForm = () => {
		let form
		if(localStorage.getItem('LoginStatus') === 'false'){
			form = (<div className="comment-form">
				<h3>Login untuk mulai berkomentar</h3>
				<a href="?" className="button button-postComment button--active" data-toggle="modal" data-target="#exampleModalCenter">Login</a>
			</div>)
		} else {
			form = (<div className="comment-form">
				<h4>Tinggalkan Komentar</h4>
				<form onSubmit={handleComment}>
					<div className="form-group">
						<textarea required className="form-control mb-10" rows="5" name="Komentar" placeholder="Komentar..."></textarea>
					</div>
					<button type='submit' className='button button-postComment button--active'>Kirim</button>
				</form>
			</div>)
		}

		setCommentForm(form)
			
	}

    useEffect(() => {
		if(isEmpty(blog)) {
			getBlog()
		}
		setForm()
    },[params.id, localStorage.getItem('LoginStatus')])

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

	let comment = 	loadingBlog ?
					(
						''
					)
					:
					blog?.Komentar.map((komen, index) => {
						let profile
						if(komen.UserProfile === null) {
							profile = (<img src="/img/blog/blank-profile-picture-973460_1280.webp" alt="" width={100} height={100}/>)
						} else {
							profile = (<img src={komen.UserProfile} alt="" width={100} height={100}/>)
						}
		
						return(
							<div className="comment-list" key={`komentar${index}id${blog?.ID}`}>
								<div className="single-comment justify-content-between d-flex">
									<div className="user justify-content-between d-flex">
										<div className="thumb">
											{profile}
										</div>
										<div className="desc">
											<h5>
												<p>{komen.UserNama}</p>
											</h5>
											<p className="date">{komen.Tanggal}</p>
											<p className="comment">
												{komen.Komentar}
											</p>
										</div>
									</div>
								</div>
							</div>
						)
					})

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
				{loadingBlog ? <h4><Skeleton width={120}/></h4> : <h4>{blog?.JumlahKomen} Komentar</h4>}
				{comment}
            </div>
			{commentForm}
        </div>
    )
}
