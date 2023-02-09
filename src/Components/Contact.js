import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Contact() {
    const [Info, setInfo] = useState({})
    const [loadinginfo, setLoadinginfo] = useState(true)
    const [verified, setVerified] = useState(false)

    const getInfo = () => {
		axios.get(`http://localhost/bukubook/api/infoapi/get`).then((res) => {
            setInfo(res.data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadinginfo(false)
        })
	}

    const handleSubmit = (e) => {
        e.preventDefault()
        let MySwal = withReactContent(Swal)
        if(verified) {
            MySwal.fire({
                title: 'Apakah Anda Yakin?',
                text: 'Setelah mengirimkan pesan anda tidak dapat menggantinya',
                icon: 'question',
                showDenyButton: true,
                confirmButtonColor: '#384aeb'
            }).then((res) => {
                let formData = new FormData(e.target)
                if(res.isConfirmed) {
                    axios.post('http://localhost/bukubook/api/emailapi/sendcontact', formData).then((res) => {
                        if(res.data.status === 200) {
                            MySwal.fire({
                                title: 'Pesan Berhasil Dikirim',
                                text: 'Tunggu ya, butuh beberapa hari biar pesanmu dibaca',
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
            })            
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Robot?',
                text: 'Tolong isi ReCaptcha terlebih dahulu'
            })
        }

    }

    const handleVerify = (value) => {
        console.log(value)
        setVerified(true)
    }

    useEffect(() => {
        getInfo()
    },[])

    return (
        <Fragment>
            <section className="blog-banner-area" id="contact">
                <div className="container h-100">
                    <div className="blog-banner">
                        <div className="text-center">
                            <h1>Hubungi Kami</h1>
                            <nav aria-label="breadcrumb" className="banner-breadcrumb">
                                <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={'/'}>Beranda</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Hubungi Kami</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-margin--small">
                <div className="container">
                    <div className="d-none d-sm-block mb-5 pb-4">
                        {loadinginfo ? <Skeleton height={420} /> : <div id="map" className='w-100' dangerouslySetInnerHTML={{ __html:Info?.Map }}></div>}
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
                            <div className="media contact-info">
                                <span className="contact-info__icon"><i className="ti-home"></i></span>
                                <div className="media-body">
                                    {loadinginfo ? <Skeleton width={150}/> : <h3>{Info?.Alamat}</h3>}
                                    <p>Senin Hingga Jumat</p>
                                </div>
                            </div>
                            <div className="media contact-info">
                                <span className="contact-info__icon"><i className="ti-headphone"></i></span>
                                <div className="media-body">
                                {loadinginfo ? <Skeleton width={120}/> : <h3>{Info?.NoTelp}</h3>}
                                <p>08:00 - 17:00</p>
                            </div>
                        </div>
                            <div className="media contact-info">
                                <span className="contact-info__icon"><i className="ti-email"></i></span>
                                <div className="media-body">
                                    {loadinginfo ? <Skeleton width={140}/> : <h3>{Info?.Email}</h3>}
                                    <p>Siap menerima kapan saja!</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <form onSubmit={handleSubmit} className="form-contact contact_form" id="contactForm">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <div className="form-group">
                                            <input className="form-control" name="Nama" id="name" type="text" placeholder="Nama"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="Email" id="email" type="email" placeholder="Email"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="Subject" id="subject" type="text" placeholder="Subject"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="form-group">
                                            <textarea className="form-control different-control w-100" name="Pesan" id="message" cols="30" rows="5" placeholder="Tuliskan Pesan Anda di Sini"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group text-center text-md-right mt-3">
                                    <div className="row">
                                        <div className="col-12 col-lg-6 mb-3">
                                            <ReCAPTCHA
                                                sitekey={process.env.REACT_APP_SITEKEY}
                                                onChange={handleVerify}
                                            />
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <button type="submit" className="button button--active button-contactForm">Send Message</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
