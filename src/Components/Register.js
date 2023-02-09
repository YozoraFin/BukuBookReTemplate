import axios from 'axios'
import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Register() {
    const [errorRegister, setErrorRegister] = useState('')
    const [errorConfirm, setErrorConfirm] = useState('')
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        let password = document.getElementById('rpass').value
        let confirm = document.getElementById('rcpass').value
        const MySwal = withReactContent(Swal);
        if(password.length < 8) {
            setErrorRegister('Password harus memiliki 8 karakter atau lebih')
        } else {
            setErrorRegister('')
            if(password !== confirm) {
                setErrorConfirm('Konfirmasi password tidak sesuai')
                console.log(password)
                console.log(confirm)
            } else {
                setErrorConfirm('')
                var formData = new FormData(e.target);
                axios.post('http://localhost/bukubook/api/customer/register', formData).then((response) => {
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
            <section class="blog-banner-area" id="category">
                <div class="container h-100">
                    <div class="blog-banner">
                        <div class="text-center">
                            <h1>Register</h1>
                            <nav aria-label="breadcrumb" class="banner-breadcrumb">
                                <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to={'/'}>Beranda</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Register</li>
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
                                    <h4>Sudah mempunyai akun?</h4>
                                    <p>Lanjutkan petualanganmu dengan masuk sekarang</p>
                                    <Link class="button button-account" to={'/login'}>Login</Link>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="login_form_inner register_form_inner">
                                <h3>Register</h3>
                                <form class="row login_form" action="#/" id="register_form" onSubmit={handleRegister}>
                                    <div class="col-md-12 form-group">
                                        <input type="text" class="form-control" id="namel" name="NamaLengkap" placeholder="Nama Lengkap"/>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <input type="text" class="form-control" id="namep" name="NamaPanggilan" placeholder="Nama Panggilan"/>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <input type="password" class="form-control" id="rpass" name="Password" placeholder="Password"  />
                                    </div>
                                    <p className='col-md-12'>
                                        {errorConfirm}
                                        {errorRegister}
                                    </p>
                                    <div class="col-md-12 form-group">
                                        <input type="password" class="form-control" id="rcpass" name="CPassword" placeholder="Konfirmasi Password"  />
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <input type="text" class="form-control" id="email" name="Email" placeholder="Email"/>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <input type="text" class="form-control" id="ntlp" name="NoTelephone" placeholder="No HP"/>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <input type="text" class="form-control" id="alamat" name="AlamatRumah" placeholder="Alamat"/>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <button type="submit" value="submit" class="button button-register w-100">Register</button>
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
