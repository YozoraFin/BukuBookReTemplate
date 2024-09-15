import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const [errorLogin, setErrorLogin] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        let nutelp = `${document.getElementById('TelpLogin').value}`
        e.preventDefault()
        const object = {
            NoTelp: nutelp,
            Password: document.getElementById('PasswordLogin').value
        }
        axios.post('http://localhost:5000/customer/login', object).then((response) => {
            if(response.data.status === 401) {
                setErrorLogin('Password yang dimasukkan salah')
            } else if(response.data.status === 503) {
                setErrorLogin(response.data.message)
            } else if(response.data.status === 404) {
                setErrorLogin(response.data.message)
            } else {
                localStorage.setItem('accesstoken', response.data.accesstoken)
                navigate('/profil')
            }
        })
    }
    
    return (
        <Fragment>
            <section className="blog-banner-area" id="category">
                <div className="container h-100">
                    <div className="blog-banner">
                        <div className="text-center">
                            <h1>Login / Register</h1>
                            <nav aria-label="breadcrumb" className="banner-breadcrumb">
                                <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={'/'}>Beranda</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Login/Register</li>
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
                                    <h4>Baru Berkunjung?</h4>
                                    <p className='px-3'>Daftarkan akunmu disini dan mulai petualanganmu</p>
                                    <Link className="button button-account" to={'/register'}>Buat Akun</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login_form_inner">
                                <h3>Login</h3>
                                <form className="row login_form" action="#/" id="contactForm" onSubmit={handleLogin}>
                                    <div className="col-md-12 form-group">
                                        <input type="text" className="form-control" id="TelpLogin" name="Telp" placeholder="Nomor WhatsApp" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Username'"/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input type="password" className="form-control" id="PasswordLogin" name="Password" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'"/>
                                        <p className='text-danger'>{errorLogin}</p>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <button type="submit" value="submit" className="button button-login w-100">Log In</button>
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
