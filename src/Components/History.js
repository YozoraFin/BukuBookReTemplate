import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import Skeleton from 'react-loading-skeleton'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'

export default function History() {
    const [orderList, setOrderList] = useState([])
    const [loadingOrderList, setLoadingOrderList] = useState(true)
    const [offset, setOffset] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [pageCount, setPageCount] = useState(0)
    const [totalData, setTotalData] = useState(0)
    const [orderListResponsive, setOrderListResponsive] = useState([])
    const separator = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    const handlePageClick = (e) => {
        const selected = e.selected;
        setOffset(selected * perPage);
        setLoadingOrderList(false)
    }

    const getData = () => {
        var object = {
            AksesToken: localStorage.getItem('accesstoken')
        }
        axios.post('http://localhost:5000/order',object).then((res) => {
            const data = res.data.data
            const slice = data?.slice(offset, offset + perPage)
            const historyResponsive = slice?.map((order, index) => {
                return (
                    <tr key={`responsivehistory${index}`}>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td rowSpan={3} className='align-top p-0 pr-3'>
                                            {index + 1 + offset}
                                        </td>
                                        <td className='p-0'>
                                            {order.Invoice}
                                        </td>
                                        <td rowSpan={2} className='pl-5 p-0'>
                                            <Link onClick={handleScroll} to={`/detail/${order.ID}`}><button onClick={handleScroll} className='button button-paypal'>Detail</button></Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='p-0'>{order.Tanggal}</td>
                                    </tr>
                                    <tr>
                                        <td className='p-0 active'>Rp {separator(order.Total)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                )
            })
            const historyList = slice?.map((order, index) => {
                return (<tr key={`historyorder${index}`}>
                    <td>
                        <div className="media">
                            <div className="media-body">
                                <p>{index+1+offset}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <h5>{order.Invoice}</h5>
                    </td>
                    <td>
                        <div className="product_count">
                            {order.Tanggal}
                        </div>
                    </td>
                    <td>
                        <h5>Rp {separator(order.Total)}</h5>
                    </td>
                    <td>
                        <Link onClick={handleScroll} to={`/detail/${order.ID}`}><button onClick={handleScroll} className='button button-paypal'>Detail</button></Link>
                    </td>
                </tr>)
            })
            setTotalData(res.data.data.length)
            setOrderList(historyList)
            setOrderListResponsive(historyResponsive)
            setPageCount(Math.ceil(data?.length/perPage))
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadingOrderList(false)
        })
    }
    
    const handleScroll = () => {
        window.scrollTo(0, 400)
    }

    useEffect(() => {
        getData()
    },[offset])

    const ListResponsive = loadingOrderList ?
                            (
                            <tr key={`responsivehistoryloading`}>
                                <td>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td rowSpan={3} className='align-top p-0 pr-3'>
                                                    1
                                                </td>
                                                <td className='p-0'>
                                                    <Skeleton width={100}/>
                                                </td>
                                                <td rowSpan={2} className='pl-5 p-0'>
                                                    <Skeleton height={30} width={80}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='p-0'><Skeleton width={80}/></td>
                                            </tr>
                                            <tr>
                                                <td className='p-0'><Skeleton width={90}/></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            )
                            :
                            orderListResponsive


    const List =    loadingOrderList ?
                    (
                        <tr>
                            <td>
                                <div className="media">
                                    <div className="media-body">
                                        <p>1</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h5><Skeleton width={123}/></h5>
                            </td>
                            <td>
                                <div className="product_count">
                                    <Skeleton width={83}/>
                                </div>
                            </td>
                            <td>
                                <h5><Skeleton width={120}/></h5>
                            </td>
                            <td>
                                <Skeleton width={150} height={40} borderRadius='30px'/>
                            </td>
                        </tr>
                    )
                    :
                    orderList

    return (
        <div className="cart_inner">
            <div className="table-responsive d-none d-xl-block">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Invoice</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {List}
                    </tbody>
                </table>
            </div>
            <table className="table table-mobile d-xl-none">
                <tbody>
                    {ListResponsive}
                </tbody>
            </table>
            <nav className="blog-pagination justify-content-center d-flex col-12">
                {totalData > perPage ? <ReactPaginate
                    previousLabel={<GrLinkPrevious/>}
                    nextLabel={<GrLinkNext/>}
                    onPageChange={handlePageClick}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={5}
                    pageRangeDisplayed={5}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link grmt'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link grmt'}
                    activeClassName={"active"}
                    onClick={handleScroll}
                    /> : ''}
            </nav>
        </div>
    )
}
