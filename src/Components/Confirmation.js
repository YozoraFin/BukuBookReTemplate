/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Confirmation() {
    const [orderDetail, setOrderDetail] = useState({})
    const [loadingOrderDetail, setLoadingOrderDetail] = useState(true)
    const param = useParams()
    const navigate = useNavigate()
    const separator = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    const getData = () => {
        const MySwal = withReactContent(Swal)
        var formData = new FormData()
        formData.append('AksesToken', localStorage.getItem('accesstoken'))
        formData.append('id', param.id)
        axios.post('http://localhost/bukubook/api/orderapi/getdetail', formData).then((res) => {
            if(res.data.status === 200) {
                setOrderDetail(res.data.data)
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: res.data.status,
                    text: res.data.message
                }).then(() => {
                    navigate('/tamu')
                })
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadingOrderDetail(false)
        })
    }

    useEffect(() => {
        getData()
    },[])

    const Detail =  loadingOrderDetail ?
                    (
                        <tr>
                            <td>
                                <p><Skeleton width={200} baseColor={'#777777'}/></p>
                            </td>
                            <td>
                                <h5><Skeleton width={30} baseColor={'#777777'}/></h5>
                            </td>
                            <td>
                                <p><Skeleton width={140} baseColor={'#777777'}/></p>
                            </td>
                        </tr>
                    )
                    :
                    orderDetail?.Detail?.map((detail, index) => {
                        return(
                            <tr key={`detailorder${index}`}>
                                <td>
                                    <p>{detail.Judul}</p>
                                </td>
                                <td>
                                    <h5>x {detail.Jumlah}</h5>
                                </td>
                                <td>
                                    <p>Rp {separator(detail.Subtotal)}</p>
                                </td>
                            </tr>
                        )
                    })

    return (
        <Fragment>
            <section className="blog-banner-area" id="category">
                <div className="container h-100">
                    <div className="blog-banner">
                        <div className="text-center">
                            <h1>Detail Pesanan</h1>
                            <nav aria-label="breadcrumb" className="banner-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={'/'}>Beranda</Link></li>
                                    <li className="breadcrumb-item"><Link to={'/profil/riwayat'}>Riwayat</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Konfirmasi Pesanan</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section className="order_details section-margin--small">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-6 col-xl-4 mb-4 mb-xl-0">
                            <div className="confirmation-card">
                                <h3 className="billing-title">Informasi Order</h3>
                                <table className="order-rable">
                                    <tr>
                                        <td>Invoice</td>
                                        <td>: {loadingOrderDetail ? (<Skeleton width={120} />) : orderDetail?.Invoice}</td>
                                    </tr>
                                    <tr>
                                        <td>Tanggal</td>
                                        <td>: {loadingOrderDetail ? (<Skeleton width={80} />) : orderDetail?.Tanggal}</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>: {loadingOrderDetail ? (<Skeleton width={120} />) : orderDetail?.Total}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-4 mb-4 mb-xl-0">
                            <div className="confirmation-card">
                                <h3 className="billing-title">Informasi Pembeli</h3>
                                <table className="order-rable">
                                    <tr className='align-top'>
                                        <td>Nama</td>
                                        <td>: {loadingOrderDetail ? (<Skeleton width={150}/>) : orderDetail?.Nama}</td>
                                    </tr>
                                    <tr>
                                        <td>Telp</td>
                                        <td>: {loadingOrderDetail ? (<Skeleton width={110}/>) : orderDetail?.NoTelp}</td>
                                    </tr>
                                    <tr className='align-top'>
                                        <td>Email</td>
                                        <td>: {loadingOrderDetail ? (<Skeleton width={130}/>) : orderDetail?.Email}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-4 mb-4 mb-xl-0">
                            <div className="confirmation-card">
                                <h3 className="billing-title">Alamat Tujuan</h3>
                                <table className="order-rable">
                                    <tr className='align-top'>
                                        <td>Provinsi</td>
                                        <td>: {loadingOrderDetail ? (<Skeleton width={120} />) : orderDetail?.Provinsi}</td>
                                    </tr>
                                    <tr className='align-top'>
                                        <td>Kota</td>
                                        <td>: {loadingOrderDetail ? (<Skeleton width={100} />) : orderDetail?.Kota}</td>
                                    </tr>
                                    <tr className='align-top'>
                                        <td>Jalan</td>
                                        <td>: {loadingOrderDetail ? (<Skeleton width={150} />) : orderDetail?.Alamat}</td>
                                    </tr>
                                    <tr className='align-top'>
                                        <td>Kodepos</td>
                                        <td>: {loadingOrderDetail ? (<Skeleton width={80} />) : orderDetail?.Kodepos}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="order_details_table">
                        <h2>Detail Pesanan</h2>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Judul Buku</th>
                                        <th scope="col">Jumlah</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Detail}
                                    <tr>
                                        <td>
                                            <h4>Subtotal</h4>
                                        </td>
                                        <td>
                                            <h5></h5>
                                        </td>
                                        <td>
                                            <p>{loadingOrderDetail ? (<Skeleton width={140} baseColor='#777777'/>) : orderDetail?.Subtotal}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Ongkir</h4>
                                        </td>
                                        <td>
                                            <h5></h5>
                                        </td>
                                        <td>
                                            <p>{loadingOrderDetail ? (<Skeleton width={140} baseColor='#777777' />) : orderDetail?.Ongkir}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Total</h4>
                                        </td>
                                        <td>
                                            <h5></h5>
                                        </td>
                                        <td>
                                            <h4>{loadingOrderDetail ? (<Skeleton width={140} baseColor='#777777' />) : orderDetail?.Total}</h4>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
