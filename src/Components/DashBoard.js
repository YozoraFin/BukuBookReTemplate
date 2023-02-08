import React from 'react'

export default function DashBoard() {
    return (
        <div>
            <div className="dashwrap">
                <div className="backgroundtop">
                    <img src="/img/9121556_18973.jpg" alt="" />
                </div>
                <div className="imagecustomer">
                    <img src="/img/blog/blank-profile-picture-973460_1280.webp" alt="" />
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h4 className='nama'>Nama</h4>
                        <p>Alamat</p>
                    </div>
                    <div className="col-6">
                        <button className='button edit'>edit</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
