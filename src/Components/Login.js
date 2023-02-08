import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const [errorLogin, setErrorLogin] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        var formData = new FormData(e.target);
        axios.post('http://localhost/bukubook/api/customer/login', formData).then((response) => {
            if(response.data.status === 401) {
                setErrorLogin('Password yang dimasukkan salah')
            } else if(response.data.status === 503) {
                setErrorLogin(response.data.message)
            } else if(response.data.status === 404) {
                setErrorLogin(response.data.message)
            } else {
                localStorage.setItem('accesstoken', response.data.accesstoken)
                navigate('/')
                window.location.reload()
            }
        })
    }
    
    return (
        <Fragment>
            <section class="blog-banner-area" id="category">
                <div class="container h-100">
                    <div class="blog-banner">
                        <div class="text-center">
                            <h1>Login / Register</h1>
                            <nav aria-label="breadcrumb" class="banner-breadcrumb">
                                <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to={'/'}>Beranda</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Login/Register</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section class="login_box_area section-margin">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="login_box_img">
                                <div class="hover">
                                    <h4>Baru Berkunjung?</h4>
                                    <p>Daftarkan akunmu disini dan mulau petualanganmu</p>
                                    <Link class="button button-account" to={'/register'}>Buat Akun</Link>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="login_form_inner">
                                <h3>Log in to enter</h3>
                                <form class="row login_form" action="#/" id="contactForm" onSubmit={handleLogin}>
                                    <div class="col-md-12 form-group">
                                        <input type="text" class="form-control" id="name" name="Email" placeholder="Email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Username'"/>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <input type="password" class="form-control" id="name" name="Password" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'"/>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <button type="submit" value="submit" class="button button-login w-100">Log In</button>
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
