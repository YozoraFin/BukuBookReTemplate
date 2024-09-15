/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { Fragment, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Profile() {
    let parazm = useLocation()
    const navigate = useNavigate()

    const handleLogOut = () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Kamu Yakin?',
            text: 'Setelah Keluar kamu akan diarahkan kembali ke beranda',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Tidak',
            confirmButtonText: 'Ya'
        }).then((res) => {
            if(res.isConfirmed) {
                localStorage.setItem('accesstoken', '')
                navigate('/')
            } else {
                navigate('/profil')
            }
        })
    }

    const checkt = () => {
        var formData = new FormData()
        formData.append('AksesToken', localStorage.getItem('accesstoken'));
        formData.append('apikey', process.env.REACT_APP_APIKEY)
        axios.post('http://localhost/bukubook/api/customer/get', formData).then((res) => {
            if(res.data.status === 400) {
                navigate('/tamu')
            }
        })
    }

    const updateLink = () => {
        let data = document.getElementsByClassName('btnprofile');
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            element.classList.remove('real-active')
        }
        
        if(parazm.hash === '#keluar') {
            document.getElementById('keluarp').classList.add('real-active')
        } else if(parazm.pathname === '/profil') {
            document.getElementById('dasborp').classList.add('real-active')
        } else if(parazm.pathname === '/profil/riwayat') {
            document.getElementById('riwayatp').classList.add('real-active')
        }
    }

    useEffect(() => {
        updateLink()
        checkt()
    },[parazm])

    return (
        <Fragment>
            <section className="blog-banner-area" id="category">
                <div className="container h-100">
                    <div className="blog-banner">
                        <div className="text-center">
                            <h1>Profil</h1>
                            <nav aria-label="breadcrumb" className="banner-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Beranda</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Profil</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-margin--small mb-5 profilecontent">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-5 mb-5">
                            <div className="sidebar-categories">
                                <div className="head">Profil</div>
                                <ul className="main-categories">
                                    <li className="common-filter">
                                        <form action="#">
                                            <ul>
                                                <li className="filter-list"><Link className='btnprofile' id='dasborp' to={'/profil'}>Dasbor</Link></li>
                                                <li className="filter-list"><Link className='btnprofile' id='riwayatp' to={'/profil/riwayat'}>Riwayat</Link></li>
                                                <li className="filter-list"><Link onClick={handleLogOut} className='btnprofile' id='keluarp' to={'#keluar'}>Keluar</Link></li>
                                            </ul>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-7">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
