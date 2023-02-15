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

	const handleScrollKatalog = () => {
		window.scrollTo(0, 400)
	}

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
						<div className="sm-head">
							<span className="fa fa-location-arrow"></span>
							Lokasi
						</div>
						<div><Skeleton width={100} height={10}/></div>

						<div className="sm-head">
							<span className="fa fa-phone"></span>
							Nomor Telephone
						</div>
						<div>
							<Skeleton width={120} height={10} />
						</div>

						<div className="sm-head">
							<span className="fa fa-envelope"></span>
							Email
						</div>
						<div>
							<Skeleton width={120} height={10} />
						</div>
					</div>
				)
				:
				(
					<div className="ml-40">
						<div className="sm-head">
							<span className="fa fa-location-arrow"></span>
							Lokasi
						</div>
						<div>{info?.Alamat}</div>

						<div className="sm-head">
							<span className="fa fa-phone"></span>
							Nomor Telephone
						</div>
						<div>
							{info?.NoTelp}
						</div>

						<div className="sm-head">
							<span className="fa fa-envelope"></span>
							Email
						</div>
						<div>
							{info?.Email}
						</div>
					</div>
				)
	
	const msc = loadingsocial ?
				(
					<div><Skeleton width={80} count={5} height={10} className='mb-2'/></div>
				)
				:
				social?.map((dasocial, index) => {
					if(index < 5) {
						return(
							<div className="sm-head mb-2" key={`social${index}`}>
								<a href={dasocial.Link}><p><span dangerouslySetInnerHTML={{ __html:dasocial.Icon }}></span>  {dasocial.Nama}</p></a>
							</div>
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
								<li><Link to={'/katalog'} onClick={handleScrollKatalog}>Katalog</Link></li>
								<li><Link to={'/blog'} onClick={handleScrollBlog}>Blog</Link></li>
								<li><Link to={'/kontak'} onClick={handleScrollContact}>Hubungi</Link></li>
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
					<div className="col-lg-12 footer-text text-center">
Copyright &copy;{new Date().getFullYear()} All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noreferrer">Colorlib</a>
                    </div>
				</div>
			</div>
		</div>
	</footer>
    )
}
