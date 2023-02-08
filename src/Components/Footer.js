/* eslint-disable array-callback-return */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

export default function Footer() {
	const [info, setInfo] = useState({});
	const [loadinginfo, setLoadinginfo] = useState(true);
	const [social, setSocial] = useState([]);
	const [loadingsocial, setLoadingsocial] = useState(true);

	const handleScrollBlog = () => {
		window.scrollTo(0, 400)
	}

	const handleScrollHome = () => {
		window.scrollTo(0, 0)
	}

	const handleScrollContact = () => {
		window.scrollTo(0, 550)
	}

	const getInfo = () => {
		axios.get(`http://localhost/bukubook/api/infoapi/get`).then((res) => {
            setInfo(res.data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadinginfo(false)
        })
	}

	const getSocial = () => {
		axios.get(`http://localhost/bukubook/api/sosialapi/get`).then(res => {
            setSocial(res.data.data)
        }).catch((error) => {
			console.log(error)
        }).finally(() => {
            setLoadingsocial(false)
        });
	}

	useEffect(() => {
		getInfo()
		getSocial()
	},[])

	const abt = loadinginfo ?
				(
					<div className="single-footer-widget tp_widgets">
						<h4 className="footer_title large_title">Tentang</h4>
						<Skeleton count={4} width={200} height={10}/>
						<Skeleton width={180} height={10}/>
						<br />
						<Skeleton count={6} width={200} height={10}/>
						<Skeleton width={180} height={10}/>
					</div>
				)
				:
				(
					<div className="single-footer-widget tp_widgets">
						<h4 className="footer_title large_title">Tentang</h4>
						<div dangerouslySetInnerHTML={{ __html: info?.Tentang }}></div>
					</div>
				)
	
	const ctc = loadinginfo ?
				(
					<div className="ml-40">
						<p className="sm-head">
							<span className="fa fa-location-arrow"></span>
							Lokasi
						</p>
						<p><Skeleton width={100} height={10}/></p>

						<p className="sm-head">
							<span className="fa fa-phone"></span>
							Nomor Telephone
						</p>
						<p>
							<Skeleton width={120} height={10} />
						</p>

						<p className="sm-head">
							<span className="fa fa-envelope"></span>
							Email
						</p>
						<p>
							<Skeleton width={120} height={10} />
						</p>
					</div>
				)
				:
				(
					<div className="ml-40">
						<p className="sm-head">
							<span className="fa fa-location-arrow"></span>
							Lokasi
						</p>
						<p>{info?.Alamat}</p>

						<p className="sm-head">
							<span className="fa fa-phone"></span>
							Nomor Telephone
						</p>
						<p>
							{info?.NoTelp}
						</p>

						<p className="sm-head">
							<span className="fa fa-envelope"></span>
							Email
						</p>
						<p>
							{info?.Email}
						</p>
					</div>
				)
	
	const msc = loadingsocial ?
				(
					<p><Skeleton width={80} count={5} height={10} className='mb-2'/></p>
				)
				:
				social?.map((dasocial, index) => {
					if(index < 5) {
						return(
							<p className="sm-head mb-2" key={`social${index}`}>
								<a href={dasocial.Link}><p><span dangerouslySetInnerHTML={{ __html:dasocial.Icon }}></span>  {dasocial.Nama}</p></a>
							</p>
						)
					}
				})

    return (
        <footer className="footer">
		<div className="footer-area">
			<div className="container">
				<div className="row section_gap">
					<div className="col-lg-3 col-md-6 col-sm-6">
						{abt}
					</div>
					<div className="offset-lg-1 col-lg-2 col-md-6 col-sm-6">
						<div className="single-footer-widget tp_widgets">
							<h4 className="footer_title">Navigasi</h4>
							<ul className="list">
								<li><Link to={'/'} onClick={handleScrollHome}>Beranda</Link></li>
								<li><a href="?">Katalog</a></li>
								<li><Link to={'/blog'} onClick={handleScrollBlog}>Blog</Link></li>
								<li><Link to={'/contact'} onClick={handleScrollContact}>Hubungi</Link></li>
							</ul>
						</div>
					</div>
					<div className="col-lg-2 col-md-6 col-sm-6">
						<h4 className="footer_title">Ikuti Kami</h4>
						<div className="ml-40 single-footer-widget tp_widgets">
							{msc}
						</div>
					</div>
					<div className="offset-lg-1 col-lg-3 col-md-6 col-sm-6">
						<div className="single-footer-widget tp_widgets">
							<h4 className="footer_title">Hubungi Kami</h4>
							{ctc}
						</div>
					</div>
				</div>
			</div>
		</div>

		<div className="footer-bottom">
			<div className="container">
				<div className="row d-flex">
					<p className="col-lg-12 footer-text text-center">
Copyright &copy;{new Date().getFullYear()} All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noreferrer">Colorlib</a>
                    </p>
				</div>
			</div>
		</div>
	</footer>
    )
}
