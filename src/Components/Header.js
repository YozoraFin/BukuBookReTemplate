/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Header({statusCart, setStatusCart, panggilan, setPanggilan}) {
    const [loginStatus, setLoginStatus] = useState(false)
    const [UserData, setUserData] = useState('')
    const locat = useLocation();
    const navigate = useNavigate();

    const handleScroll = () => {
        window.scrollTo(0, 0)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/katalog?keyword=${document.getElementById('searchq').value}`)
    }

    const check = () =>  {
        var object = {
            AksesToken: localStorage.getItem('accesstoken')
        }
        axios.post('http://localhost:5000/customer/get', object).then((response) => {
            if(response.data.status === 400 || response.data.status === 403 || response.data.status === 404) {
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
        var object = {
            AksesToken: localStorage.getItem('accesstoken')
        }
        axios.post('http://localhost:5000/customer/getnotif', object).then((res) => {
            setUserData(res.data.data)
            setPanggilan(res.data.data?.NamaPanggilan)
        })
    }

    useEffect(() => {
        if(localStorage.getItem('LoginStatus') === null) {
            localStorage.setItem('LoginStatus', 'false')
        }
        check()
    },[loginStatus, locat, statusCart])

    return (
        <Fragment>
            <header className="header_area bg-light">
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
                            <div className="collapse navbar-collapse offset logprofilewrap" id="navbarSupportedContent">
                                <ul className="nav navbar-nav menu_nav ml-auto mr-auto mb-3">
                                    <li className="nav-item"><Link onClick={handleScroll} to={'/'} className={locat.pathname === '/' ? 'nav-link navvlink active' : 'nav-link navvlink'} id='homelink'>Beranda</Link></li>
                                    <li className="nav-item submenu dropdown">
                                        <Link to="/katalog" onClick={handleScroll} className={locat.pathname === '/katalog' ? "nav-link dropdown-toggle active" : "nav-link dropdown-toggle"}>Katalog</Link>
                                    </li>
                                    <li className="nav-item submenu dropdown">
                                        <Link to={'blog'} onClick={handleScroll} className={locat.pathname.indexOf('/blog') > -1 ? 'nav-link dropdown-toggle navvlink active' : 'nav-link dropdown-toggle navvlink'} id='bloglink'>blog</Link>
                                    </li>
                                    <li className="nav-item"><Link onClick={handleScroll} to={'kontak'} className={locat.pathname.indexOf('/kontak') > -1 ? 'nav-link navvlink active' : 'nav-link'}>Hubungi</Link></li>
                                    {loginStatus ? <li className="nav-item my-3 d-xl-none"><Link onClick={handleScroll} to={'/profil'}>{panggilan}</Link></li> : <li className="nav-item"><Link className="nav-item d-xl-none my-3" to={'/login'}>Login</Link></li>}
                                </ul>
                                <ul className="nav-shop my-3 pb-3">
                                    <li className="nav-item dropdown">
                                        <button className="nav-link" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="ti-search"></i></button>
                                        <div className="dropdown-menu mb-3 px-3" aria-labelledby="dropdownMenuButton">
                                            <form onSubmit={handleSearch}>
                                                <input type="text" className='form-control' id='searchq'/>
                                            </form>
                                        </div>
                                    </li>
                                    {loginStatus ? <li className="nav-item"><button><Link onClick={handleScroll} to={'/keranjang'}><i className="ti-shopping-cart"></i><span className={UserData?.jumlah < 1 ? 'nav-shop__circle d-none' : 'nav-shop__circle'}>{UserData?.jumlah}</span></Link></button> </li> : ''}
                                    {loginStatus ? <li className="nav-item"><Link onClick={handleScroll} to={'/profil'} className='d-none d-xl-block'>{UserData?.NamaPanggilan}</Link></li> : <li className="nav-item"><Link className="button button-header d-none d-xl-block" to={'/login'}>Login</Link></li>}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </Fragment>
    )
}
