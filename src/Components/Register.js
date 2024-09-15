import axios from 'axios'
import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Register() {
    const [errorRegister, setErrorRegister] = useState('')
    const [errorConfirm, setErrorConfirm] = useState('')
    const [notelp, setNotelp] = useState('')
    const [errorTelp, setErrorTelp] = useState('')
    const [verified, setVerified] = useState(false)
    const [sent, setSent] = useState(false)
    const navigate = useNavigate()

    const handleOtp = () => {
        let nutelp = `${notelp}`
        nutelp = nutelp.replace(/\s/g, '')
        if(nutelp.startsWith('0')) {
            nutelp = nutelp.substring(1)
        } else if(nutelp.startsWith('+62')) {
            nutelp = nutelp.substring(3)
        } else if(nutelp.startsWith('62')) {
            nutelp = nutelp.substring(2)
        }
        if(sent) {
            //ini kalo mau verifikasi
            const object = {
                NoTelp: nutelp,
                OTP: document.getElementById('OTP').value
            }
            axios.post('http://localhost:5000/customer/verification', object).then((res) => {
                if(res.data.status === 200) {
                    setVerified(true)
                    setErrorTelp('')
                } else if(res.data.status === 403) {
                    setSent(false)
                    setErrorTelp(res.data.message)
                } else {
                    setErrorTelp(res.data.message)
                }  
            })
            
        } else {
            //ini kalo belum nerima otp
            const object = {
                NoTelp: nutelp
            }
            axios.post('http://localhost:5000/customer/getotp', object).then((res) => {
                if(res.data.status === 200) {
                    setSent(true)
                    setErrorTelp('')
                } else {
                    setErrorTelp(res.data.message)
                }
            })
        }
    }

    const handleChangeNumber = (e) => {
        setNotelp(e.target.value)
        setSent(false)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        let nutelp = `${notelp}`
        nutelp = nutelp.replace(/\s/g, '')
        nutelp = nutelp.replace(/-/g, '')
        if(nutelp.startsWith('0')) {
            nutelp = nutelp.substring(1)
        } else if(nutelp.startsWith('+62')) {
            nutelp = nutelp.substring(3)
        } else if(nutelp.startsWith('62')) {
            nutelp = nutelp.substring(2)
        }

        let password = document.getElementById('rpass').value
        let confirm = document.getElementById('rcpass').value
        const MySwal = withReactContent(Swal);
        if(password.length < 8) {
            setErrorRegister('Password harus memiliki 8 karakter atau lebih')
        } else {
            setErrorRegister('')
            if(password !== confirm) {
                setErrorConfirm('Konfirmasi password tidak sesuai')
            } else {
                setErrorConfirm('')
                const object = {
                    NamaPanggilan: document.getElementById('namep').value,
                    NamaLengkap: document.getElementById('namel').value,
                    Email: document.getElementById('email').value,
                    NoTelp: nutelp,
                    Alamat: document.getElementById('alamat').value,
                    Password: password
                }
                axios.post('http://localhost:5000/customer/register', object).then((response) => {
                    if(response.data.status === 200) {
                        MySwal.fire(response.data.message, 'Terima kasih telah bergabung', 'success').then(() => {
                            navigate('/login')
                        })
                    } else if(response.data.status === 400) {
                        MySwal.fire(response.data.message, '', 'error')
                    } else{
                        MySwal.fire(response.data.message, '', 'error')
                    }
                })
    
            }
        }
    }

    return (
        <Fragment>
            <section className="blog-banner-area" id="category">
                <div className="container h-100">
                    <div className="blog-banner">
                        <div className="text-center">
                            <h1>Register</h1>
                            <nav aria-label="breadcrumb" className="banner-breadcrumb">
                                <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={'/'}>Beranda</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Register</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section className="login_box_area section-margin">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login_box_img">
                                <div className="hover">
                                    <h4>Sudah mempunyai akun?</h4>
                                    <p className='px-3'>Lanjutkan petualanganmu dengan masuk sekarang</p>
                                    <Link className="button button-account" to={'/login'}>Login</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login_form_inner register_form_inner">
                                <h3>Register</h3>
                                <form className="row login_form" action="#/" id="register_form" onSubmit={handleRegister}>
                                    <div className="col-md-12 form-group">
                                        <input required type="text" className="form-control" id="namel" name="NamaLengkap" placeholder="Nama Lengkap"/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input required type="text" className="form-control" id="namep" name="NamaPanggilan" placeholder="Nama Panggilan"/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input required type="password" className="form-control" id="rpass" name="Password" placeholder="Password"  />
                                    </div>
                                    <p className='col-md-12 text-danger'>
                                        {errorConfirm}
                                        {errorRegister}
                                    </p>
                                    <div className="col-md-12 form-group">
                                        <input required type="password" className="form-control" id="rcpass" name="CPassword" placeholder="Konfirmasi Password"  />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input required type="text" className="form-control" id="email" name="Email" placeholder="Email"/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input required type="text" className="form-control" id="ntlp" name="NoTelp" value={notelp} onChange={handleChangeNumber} placeholder="Nomor WhatsApp (8xxx)"/>
                                        <p className="text-danger text-left">{errorTelp}</p>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <input type="text" id='OTP' className='form-control' placeholder='OTP'/>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <button onClick={handleOtp} type='button' id='otp' className="button button-contactForm w-100">{sent ? 'Verifikasi' : 'Kirim OTP'}</button>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input required type="text" className="form-control" id="alamat" name="AlamatRumah" placeholder="Alamat"/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <button type={verified ? 'submit' : 'button'} value="submit" className={verified ? 'button button-register w-100' : 'button button-register w-100 button-inactive'}>Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
