import React from 'react'
import { TbUserOff } from 'react-icons/tb'

export default function Guest() {
    return (
        <section className="blog-banner-area" id="blog">
            <div className="container h-100">
                <div className="blog-banner">
                    <div className="text-center">
                        <h1><TbUserOff size={100}/></h1>
                        <h1>403</h1>
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <h5>Halaman Tidak Dapat di Akses</h5>
                            <p>Cobalah untuk login agar bisa mengakses halaman yang diinginkan</p>
                        </nav>  
                    </div>
                </div>
            </div>
        </section>
    )
}
