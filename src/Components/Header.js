/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Header() {
    const [errorRegister, setErrorRegister] = useState('')
    const [errorConfirm, setErrorConfirm] = useState('')
    const [errorLogin, setErrorLogin] = useState('')
    const [loginStatus, setLoginStatus] = useState(false)
    const [userName, setUserName] = useState('')
    const locat = useLocation();
    const navigate = useNavigate();

    const handleScroll = () => {
        window.scrollTo(0, 0)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/katalog?keyword=${document.getElementById('searchq').value}`)
    }

    const handlePrevent = (e) => {
        e.preventDefault()
    }

    const handleRegister = (e) => {
        e.preventDefault()
        let password = document.getElementById('pass').value
        let confirm = document.getElementById('cpass').value
        const MySwal = withReactContent(Swal);
        if(password.length < 8) {
            setErrorRegister('Password harus memiliki 8 karakter atau lebih')
        } else {
            setErrorRegister('')
            if(password !== confirm) {
                setErrorConfirm('Konfirmasi password tidak sesuai')
            } else {
                setErrorConfirm('')
                var formData = new FormData(e.target);
                axios.post('http://localhost/bukubook/api/customer/register', formData).then((response) => {
                    if(response.data.status === 200) {
                        MySwal.fire(response.data.message, 'Terima kasih telah bergabung', 'success')
                    } else if(response.data.status === 400) {
                        MySwal.fire(response.data.message, '', 'error')
                    } else{
                        MySwal.fire(response.data.message, 'Mohon coba lagi setelah beberapa saat', 'error')
                    }
                })
    
            }
        }
    }

    const check = () =>  {
        var formData = new FormData();
        formData.append('AksesToken', localStorage.getItem('accesstoken'))
        axios.post('http://localhost/bukubook/api/customer/get', formData).then((response) => {
            if(response.data.status === 400 || response.data.status === 403) {
                setLoginStatus(false)
                localStorage.setItem('accesstoken', '')
                localStorage.setItem('LoginStatus', 'false')
            } else {
                setLoginStatus(true)
                getData()
                localStorage.setItem('LoginStatus', 'true')
            }
        })
    }

    

    const getData = () => {
        var formData = new FormData()
        formData.append('AksesToken', localStorage.getItem('accesstoken'))
        axios.post('http://localhost/bukubook/api/customer/get', formData).then((res) => {
            setUserName(res.data.data)
        })
    }

    useEffect(() => {
        if(localStorage.getItem('LoginStatus') === null) {
            localStorage.setItem('LoginStatus', 'false')
        }
        check()
    },[loginStatus])

    return (
        <Fragment>
            <header className="header_area">
                <div className="main_menu">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container">
                            <Link className="navbar-brand logo_h" onClick={handleScroll} to={'/'}><i className="fa fa-book text-primary" aria-hidden="true"></i> BukuBook</Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                                <ul className="nav navbar-nav menu_nav ml-auto mr-auto">
                                <li className="nav-item"><Link onClick={handleScroll} to={'/'} className={locat.pathname === '/' ? 'nav-link navvlink active' : 'nav-link navvlink'} id='homelink'>Beranda</Link></li>
                                <li className="nav-item submenu dropdown">
                                    <Link to="/katalog" onClick={handleScroll} className="nav-link dropdown-toggle">Katalog</Link>
                                </li>
                                <li className="nav-item submenu dropdown">
                                    <Link to={'blog'} onClick={handleScroll} className={locat.pathname.indexOf('/blog') > -1 ? 'nav-link dropdown-toggle navvlink active' : 'nav-link dropdown-toggle navvlink'} id='bloglink'>blog</Link>
                                </li>
                                <li className="nav-item"><Link onClick={handleScroll} to={'contact'} className={locat.pathname.indexOf('/contact') > -1 ? 'nav-link navvlink active' : 'nav-link'}>Hubungi</Link></li>
                                </ul>

                                <ul className="nav-shop">
                                <li className="nav-item dropdown">
                                    <button class="nav-link" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="ti-search"></i></button>
                                    <div class="dropdown-menu px-3" aria-labelledby="dropdownMenuButton">
                                        <form onSubmit={handleSearch}>
                                            <input type="text" className='form-control' id='searchq'/>
                                        </form>
                                    </div>
                                </li>
                                    {loginStatus ? <li className="nav-item"><button><i className="ti-shopping-cart"></i><span className="nav-shop__circle">3</span></button> </li> : ''}
                                    {loginStatus ? <li className="nav-item"><Link onClick={handleScroll} to={'/profil'}>{userName?.NamaPanggilan}</Link></li> : <li className="nav-item"><Link className="button button-header" to={'/login'}>Login</Link></li>}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            <div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Daftar</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div className="login">
                            <form className="login-container form-check" onSubmit={handleRegister}>
                                <p>
                                    <input type="input" placeholder="Nama Lengkap" className='form-control' name='NamaLengkap' required />
                                </p>
                                <p>
                                    <input type="input" placeholder="Nama Panggilan" className='form-control' name='NamaPanggilan' required/>
                                </p>
                                <p>
                                    <input type="password" placeholder="Password" className='form-control' name='Password' id='pass' required/>
                                </p>
                                <p>
                                    <input type="password" placeholder="Konfirmasi Password" className='form-control' name='CPassword' id='cpass' required/>
                                    {errorRegister}
                                    {errorConfirm}
                                </p>
                                <p>
                                    <input type="email" placeholder="Email" className='form-control' name='Email' required/>
                                </p>
                                <p>
                                    <input type="input" placeholder="No. Telp" className='form-control' name='NoTelephone' required/>
                                </p>
                                <p>
                                    <input type="input" placeholder="Alamat Rumah" className='form-control' name='AlamatRumah' required/>
                                </p>
                                <p className='text-right'>
                                    <button type="submit" className="btn btn-primary">Daftar</button>
                                </p>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <h6>Sudah punya akun? <a href='?' data-toggle="modal" data-dismiss="modal" aria-label="Close" data-target="#exampleModalCenter" role={'button'} onClick={handlePrevent}>masuk</a></h6>
                    </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
