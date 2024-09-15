import React from 'react'
import { BsBookshelf } from "react-icons/bs";

export default function Empty() {
    return (
        <section className="blog-banner-area" id="blog">
            <div className="container h-100">
                <div className="blog-banner">
                    <div className="text-center">
                        <h1><BsBookshelf size={100}/></h1>
                        <h1>404</h1>
                        <nav aria-label="breadcrumb" className="banner-breadcrumb">
                            <h5>Halaman Tidak Dapat di Temukan</h5>
                            <p>Kemungkinan halaman yang kamu cari sudah dihapus atau belum dibuat</p>
                        </nav>  
                    </div>
                </div>
            </div>
        </section>
    )
}
