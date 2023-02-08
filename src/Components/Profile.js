import React, { Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Profile() {
  return (
    <Fragment>
        <section className="blog-banner-area" id="category">
            <div className="container h-100">
                <div className="blog-banner">
                    <div className="text-center">
                        <h1>Profile</h1>
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Beranda</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Profile</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
        <section className="section-margin--small mb-5">
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-5">
                    <div className="sidebar-categories d-xl-none">
                            <div className="head" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Profil</div>
                            <div className="collapse" id="collapseExample">
                                <ul className="main-categories">
                                <li className="common-filter">
                                    <form action="#">
                                        <ul>
                                            <li className="filter-list"><Link className='text-dark' to={'/profile'}>Dasbor</Link></li>
                                            <li className="filter-list"><Link className='text-dark' to={'?'}>Riwayat</Link></li>
                                            <li className="filter-list"><Link className='text-dark' to={'?'}>Keluar</Link></li>
                                        </ul>
                                    </form>
                                </li>
                                </ul>
                            </div>
                        </div>
                        <div className="sidebar-categories d-none d-xl-block">
                            <div className="head">Profil</div>
                            <ul className="main-categories">
                                <li className="common-filter">
                                    <form action="#">
                                        <ul>
                                            <li className="filter-list"><Link className='text-dark' to={'?'}>Dasbor</Link></li>
                                            <li className="filter-list"><Link className='text-dark' to={'?'}>Riwayat</Link></li>
                                            <li className="filter-list"><Link className='text-dark' to={'?'}>Keluar</Link></li>
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
