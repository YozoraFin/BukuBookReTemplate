/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import axios from "axios";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Select from 'react-select';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Katalog({statusCart, setStatusCart}) {
    const [bukuList, setBukuList] = useState([])
    const [genreList, setGenreList] = useState([])
    const [loadingBuku, setLoadingBuku] = useState(true)
    const [loadingGenre, setLoadingGenre] = useState(true)
    const [offsetz, setOffsetz] = useState(0)
    const [perPage, setPerPage] = useState(9)
    const [pageCount, setPageCount] = useState(0)
    const [totalData, setTotalData] = useState([])
    const [amax] = useState(200000)
    const [rfrom, setRfrom] = useState(0)
    const [rto, setRto] = useState('')
    const [cSort, setcSort] = useState('a')
    const [cGenre, setcGenre] = useState('a')
    const [cKeyword, setcKeyword] = useState('a')
    const [cMax, setcMax] = useState('a')
    const [cMin, setcMin] = useState('a')
    const [cOffset, setcOffset] = useState(0)
    const [cPerPage, setcPerPage] = useState(9)
    const [toggleHabis, setToggleHabis] = useState(false)
    const [currentKeyword, setCurrentKeyword] = useState('')
    const stokHabis = useRef(false)
    const SlideMax = useRef(1000)
    const SslideMax = useRef(1000)
    const SslideMin = useRef(0)
    const qSort = useRef('')
    const qGenre = useRef('')
    const qKeyword = useRef('')
    const qMin = useRef('')
    const qMax = useRef('')
    const stok = useRef({})
    const selectSort = useRef({value: 'default', label: 'Urutkan'})
    const param = useLocation().search
    const link = new URLSearchParams(param)
    const separator = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    const navigate = useNavigate()

    const handleChange = () => {

    }

    const changeKeyword = (e) => {
        setCurrentKeyword(e.target.value)
    }

    const handleScroll = () => {
        window.scrollTo(0, 400)
    }

    const handleAdd = (e) => {
        const MySwal = withReactContent(Swal)
        if(stok.current[e.target.id] === 0 || stok.current[e.target.id] === undefined) {
            MySwal.fire({
                icon: 'error',
                title: 'Buku Kosong',
                text: 'Buku yang ingin kamu tambahkan saat ini sedang kosong'
            })
        } else {
            var object = {
                BukuID: e.target.id,
                AksesToken: localStorage.getItem('accesstoken'),
                qty: 1
            }
            axios.post('http://localhost:5000/cart/add', object).then((res) => {
                if(res.data.status === 200) {
                    MySwal.fire({
                        title: 'Buku Berhasil Ditambahkan',
                        text: 'Kamu bisa melihat barangmu di keranjang',
                        icon: 'success'
                    }).then(() => {
                        setStatusCart(!statusCart)
                    })
                } else {
                    MySwal.fire({
                        title: 'Tidak bisa menambahkan buku',
                        text: res.data.message,
                        icon: 'error'
                    })
                }
            })
        }
    }

    const handleGenre = (e) => {
        if(e.target.id === link.get('genre')) {
            navigate(`/katalog?${qSort.current}${qKeyword.current}${qMax.current}${qMin.current}`)
            qGenre.current = ''
        } else {
            navigate(`/katalog?${qSort.current}${qKeyword.current}&genre=${e.target.id}${qMax.current}${qMin.current}`)
            qGenre.current = `&genre=${e.target.id}`
        }
    }
    
    const handleKeywordInput = (e) => {
        e.preventDefault()
        const keyword = `&keyword=${document.getElementById('keywordinput').value}`
        qKeyword.current = keyword
        navigate(`/katalog?${qSort.current}${keyword}${qGenre.current}${qMax.current}${qMin.current}`)
    }

    const handleRangeUp = (value) => {

        let maxs = value[1]
        let mins = value[0]
        if(maxs === amax.toString()) {
            maxs = ''
        } else {
            maxs = `&max=${maxs}`
        }

        if(mins === '0') {
            mins = ''
        } else {
            mins = `&min=${mins}`
        }
        navigate(`/katalog?${qSort.current}${qGenre.current}${qKeyword.current}${maxs}${mins}`)
        qMin.current = mins
        qMax.current = maxs
        
    }

    const handleSlide = (value) => {
        const from = separator(value[0])
        const to = separator(value[1])
        setRfrom(from)
        setRto(to)
    }
    
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffsetz(selectedPage * perPage);
        setLoadingBuku(false)
    }

    const handlePerPageChange = (e) => {
        setPerPage(e.value)
    }

    const handleSortChange = (e) => {
        if(e.value === 'default') {
            navigate(`/katalog?${qGenre.current}${qKeyword.current}${qMax.current}${qMin.current}`)
            qSort.current = ``
        } else if(e.value === 'asc') {
            navigate(`/katalog?&sort=asc${qGenre.current}${qKeyword.current}${qMax.current}${qMin.current}`)
            qSort.current = `sort=asc`
        } else if(e.value === 'desc') {
            navigate(`/katalog?&sort=desc${qGenre.current}${qKeyword.current}${qMax.current}${qMin.current}`)
            qSort.current = `sort=desc`
        } else if(e.value === 'Termahal') {
            navigate(`/katalog?&sort=Termahal${qGenre.current}${qKeyword.current}${qMax.current}${qMin.current}`)
            qSort.current = `sort=Termahal`
        } else if(e.value === 'Termurah') {
            navigate(`/katalog?&sort=Termurah${qGenre.current}${qKeyword.current}${qMax.current}${qMin.current}`)
            qSort.current = `sort=Termurah`
        }
        selectSort.current = {value: e.value, label: e.label}
    }

    const getData = () => {
        let sort
        let genre
        let keyword
        let min
        let max
        if(link.get('sort') === null) {
            sort = ''
        } else {
            sort = `sort=${link.get('sort')}`
            qSort.current = `sort=${link.get('sort')}`
        }

        if(link.get('genre') === null || link.get('genre') === '') {
            genre = ''
        } else {
            genre = `&genre=${link.get('genre')}`
            qGenre.current = `&genre=${link.get('genre')}`
        }

        if(link.get('keyword') === null || link.get('keyword') === '') {
            keyword = ''
        } else {
            keyword = `&keyword=${link.get('keyword')}`
            qKeyword.current = `&keyword=${link.get('keyword')}`
        }

        if(link.get('min') === null || link.get('min') === '') {
            min = ''
            setRfrom(0)
            SslideMin.current = 0
        } else {
            min = `&min=${link.get('min')}`
            qMin.current = `&min=${link.get('min')}`
            setRfrom(link.get('min'))
            SslideMin.current = link.get('min')
        }
        if(link.get('max') === null || link.get('max') === '') {
            max = ''
            setRto(amax)
        } else {
            max = `&max=${link.get('max')}`
            qMax.current = `&max=${link.get('max')}`
            setRto(link.get('max'))
            SslideMax.current = link.get('max')
        }

        const checkStok = (data) => {
            return data.Stok > 0
        }
        axios.get(`http://localhost:5000/buku?${sort}${genre}${keyword}${max}${min}`).then((res) => {
            SlideMax.current = res.data.max
            if(link.get('max') === null || link.get('max') === '') {
                SslideMax.current = SlideMax.current
            }
            res.data.data?.map((hasil) => {
                stok.current[hasil.ID] = hasil.Stok
            })
            if(rto === '') {
                setRto(res.data.max)
            }
            setTotalData(res.data.data)
            let data
            if(!stokHabis.current) {
                data = res.data.data.filter(checkStok)
            } else {
                data = res.data.data
            }

            const slice = data?.slice(offsetz, offsetz + perPage)
            const bukulist = slice?.map(bukud => 
                <div className={bukud.Stok === 0 ? 'col-6 col-lg-4 habis' : 'col-6 col-lg-4'} key={`bukulist${bukud.ID}`}>
                    <div className="card text-center card-product">
                        <div className="card-product__img">
                            {bukud.Sampul.length < 1
                            ?
                            (
                                <img className="card-img" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ENpnnhPgDE0BVDsiIAOhl8dbGVE_5vc11w&usqp=CAU' alt=""/>
                            )
                            :
                            bukud.Sampul.map((sampul, index) => {
                                if(index < 1) {
                                    return(<img className="card-img" src={sampul.SrcGambar} alt="" key={`gambarkatalog${index}`}/>)
                                }
                            })}
                            <ul className="card-product__imgOverlay">
                            <li><Link onClick={handleScroll} to={`/buku/${bukud.ID}`}><button><i className="ti-search"></i></button></Link></li>
                            <li><button onClick={handleAdd} id={bukud.ID}><i id={bukud.ID} className="ti-shopping-cart"></i></button></li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <p>{bukud.Penulis}</p>
                            <h4 className="card-product__title"><Link onClick={handleScroll} to={`/buku/${bukud.ID}`}>{bukud.Judul}</Link></h4>
                            <p className="card-product__price">Rp {separator(bukud.Harga)}</p>
                        </div>
                    </div>
                </div>
            )
            setBukuList(bukulist)
            setPageCount(Math.ceil(data?.length / perPage))
            axios.get('http://localhost:5000/genre').then(res => {
                setGenreList(res.data.data)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setLoadingGenre(false)
            })
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadingBuku(false);
        })
    }

    const handleReset = () => {
        qSort.current = ''
        qGenre.current = ''
        qKeyword.current = ''
        qMax.current = ''
        qMin.current = ''
        selectSort.current = {value: 'default', label: 'Urutkan'}
        setCurrentKeyword('')
    }

    const handleToggleHabis = () => {
        stokHabis.current = !stokHabis.current
        setToggleHabis(!toggleHabis)
        console.log(stokHabis.current)
        getData()
    }

    useEffect(() => {
        if(qSort.current !== cSort || qKeyword.current !== cKeyword || qMax.current !== cMax || qMin.current !== cMin || cOffset !== offsetz || cPerPage !== perPage || cGenre !== qGenre) {
            getData()
            setcSort(qSort.current)
            setcKeyword(qKeyword.current)
            setcMax(qMax.current)
            setcMin(qMin.current)
            setcOffset(offsetz)
            setcPerPage(perPage)
            setcGenre(qGenre.current)
        }
    },[offsetz, param, perPage, qSort, qKeyword, qMax, qMin, qGenre])

    const dBuk =    loadingBuku ? 
                    (
                        <Fragment>
                            <div className="col-6 col-lg-4 d-none d-lg-block" key={`bukuskeletonlist8`}>
                                <div className="card text-center card-product">
                                    <div className="card-product__img">
                                        <Skeleton className="card-img" height={380}/>
                                        <ul className="card-product__imgOverlay">
                                        <li><button><i className="ti-search"></i></button></li>
                                        <li><button><i className="ti-shopping-cart"></i></button></li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <p><Skeleton width={80}/></p>
                                        <h4 className="card-product__title"><Skeleton width={150}/></h4>
                                        <p className="card-product__price"><Skeleton width={100}/></p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-6 col-lg-4 d-lg-none" key={`bukuskeletonlist7`}>
                                <div className="card text-center card-product">
                                    <div className="card-product__img">
                                        <Skeleton className="card-img" height={240}/>
                                        <ul className="card-product__imgOverlay">
                                        <li><button><i className="ti-search"></i></button></li>
                                        <li><button><i className="ti-shopping-cart"></i></button></li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <p><Skeleton width={60}/></p>
                                        <h4 className="card-product__title"><Skeleton width={100}/></h4>
                                        <p className="card-product__price"><Skeleton width={100}/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4 d-none d-lg-block" key={`bukuskeletonlist6`}>
                                <div className="card text-center card-product">
                                    <div className="card-product__img">
                                        <Skeleton className="card-img" height={380}/>
                                        <ul className="card-product__imgOverlay">
                                        <li><button><i className="ti-search"></i></button></li>
                                        <li><button><i className="ti-shopping-cart"></i></button></li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <p><Skeleton width={80}/></p>
                                        <h4 className="card-product__title"><Skeleton width={150}/></h4>
                                        <p className="card-product__price"><Skeleton width={100}/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4 d-lg-none" key={`bukuskeletonlist5`}>
                                <div className="card text-center card-product">
                                    <div className="card-product__img">
                                        <Skeleton className="card-img" height={240}/>
                                        <ul className="card-product__imgOverlay">
                                        <li><button><i className="ti-search"></i></button></li>
                                        <li><button><i className="ti-shopping-cart"></i></button></li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <p><Skeleton width={60}/></p>
                                        <h4 className="card-product__title"><Skeleton width={100}/></h4>
                                        <p className="card-product__price"><Skeleton width={100}/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4 d-none d-lg-block" key={`bukuskeletonlist4`}>
                                <div className="card text-center card-product">
                                    <div className="card-product__img">
                                        <Skeleton className="card-img" height={380}/>
                                        <ul className="card-product__imgOverlay">
                                        <li><button><i className="ti-search"></i></button></li>
                                        <li><button><i className="ti-shopping-cart"></i></button></li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <p><Skeleton width={80}/></p>
                                        <h4 className="card-product__title"><Skeleton width={150}/></h4>
                                        <p className="card-product__price"><Skeleton width={100}/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4 d-lg-none" key={`bukuskeletonlist3`}>
                                <div className="card text-center card-product">
                                    <div className="card-product__img">
                                        <Skeleton className="card-img" height={240}/>
                                        <ul className="card-product__imgOverlay">
                                        <li><button><i className="ti-search"></i></button></li>
                                        <li><button><i className="ti-shopping-cart"></i></button></li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <p><Skeleton width={60}/></p>
                                        <h4 className="card-product__title"><Skeleton width={100}/></h4>
                                        <p className="card-product__price"><Skeleton width={100}/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4 d-none d-lg-block" key={`bukuskeletonlist2`}>
                                <div className="card text-center card-product">
                                    <div className="card-product__img">
                                        <Skeleton className="card-img" height={380}/>
                                        <ul className="card-product__imgOverlay">
                                        <li><button><i className="ti-search"></i></button></li>
                                        <li><button><i className="ti-shopping-cart"></i></button></li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <p><Skeleton width={80}/></p>
                                        <h4 className="card-product__title"><Skeleton width={150}/></h4>
                                        <p className="card-product__price"><Skeleton width={100}/></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4 d-lg-none" key={`bukuskeletonlist1`}>
                                <div className="card text-center card-product">
                                    <div className="card-product__img">
                                        <Skeleton className="card-img" height={240}/>
                                        <ul className="card-product__imgOverlay">
                                        <li><button><i className="ti-search"></i></button></li>
                                        <li><button><i className="ti-shopping-cart"></i></button></li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <p><Skeleton width={60}/></p>
                                        <h4 className="card-product__title"><Skeleton width={100}/></h4>
                                        <p className="card-product__price"><Skeleton width={100}/></p>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )
                    :
                    bukuList

    const dGenre =  loadingGenre ? 
                    (
                        <Skeleton count={10} className='mb-3' />
                    )
                    :
                    genreList?.map((genre, index) => {
                        const isCheked = genre.Genre === link.get('genre')
                        return(
                            <li className="filter-list" key={`genre${index}`}><input onClick={handleGenre} onChange={handleChange} className="pixel-radio" id={genre.Genre} checked={isCheked}  type="radio" name="brand"/><label id={genre.Genre} htmlFor={genre.Genre}>{genre.Genre}<span> ({genre.Total})</span></label></li>
                        )
                    })
    const dGenreR =  loadingGenre ? 
                    (
                        <Skeleton count={10} className='mb-3' />
                    )
                    :
                    genreList?.map((genre, index) => {
                        const isCheked = genre.Genre === link.get('genre')
                        return(
                            <li className="filter-list" key={`rgenre${index}`}><input onClick={handleGenre} onChange={handleChange} className="pixel-radio" checked={isCheked}  type="radio" name="brand" id={genre.Genre} /><label id={genre.Genre} htmlFor={genre.Genre}>{genre.Genre}<span> ({'genre.Jumlah'})</span></label></li>
                        )
                    })
    let filter
    let fSort
    let fGenre
    let fKeyword
    let fMin
    let fMax
        if(link.get('sort') === null) {
            fSort = ''
        } else {
            fSort = 'Sort:'+link.get('sort')
        }
        if(link.get('genre') === null) {
            fGenre = ''
        } else {
            fGenre = 'Genre:'+link.get('genre')
        }
        if(link.get('keyword') === null) {
            fKeyword = ''
        } else {
            fKeyword = 'Keyword:'+link.get('keyword')
        }
        if(link.get('min') === null) {
            fMin = ''
        } else {
            fMin = 'Min:'+link.get('min')
        }
        if(link.get('max') === null) {
            fMax = ''
        } else {
            fMax = 'Max:'+link.get('max')
        }
        if(fSort === '' && fGenre === '' && fKeyword === '' && fMax === '' && fMin === '') {
            filter = ''
        } else {
            filter = <h6><Link onClick={handleReset} to={'/katalog'}>X</Link> {fSort} {fGenre} {fKeyword} {fMin} {fMax}</h6>
        }
    const optionsSort = [
        {value: 'asc', label: 'A-Z'},
        {value: 'desc', label: 'Z-A'},
        {value: 'Termurah', label: 'Termurah'},
        {value: 'Termahal', label: 'Termahal'}
    ]

    const optionsPage = [
        {value: 9, label: '9'},
        {value: 12, label: '12'},
        {value: 15, label: '15'},
    ]

    const Harga = SlideMax.current

    return (
        <Fragment>
            <section className="blog-banner-area" id="category">
                <div className="container h-100">
                    <div className="blog-banner">
                        <div className="text-center">
                            <h1>Katalog Buku</h1>
                            <nav aria-label="breadcrumb" className="banner-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Beranda</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Katalog</li>
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
                            <div className="head" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Genre</div>
                            <div className="collapse" id="collapseExample">
                                <ul className="main-categories">
                                <li className="common-filter">
                                    <form action="#">
                                        <ul>
                                            {dGenreR}
                                        </ul>
                                    </form>
                                </li>
                                </ul>
                            </div>
                        </div>
                        <div className="sidebar-categories d-none d-xl-block">
                            <div className="head">Genre</div>
                            <ul className="main-categories">
                                <li className="common-filter">
                                    <form action="#">
                                        <ul>
                                            {dGenre}
                                        </ul>
                                    </form>
                                </li>
                            </ul>
                        </div>
                        <div className="sidebar-filter">
                            <div className="top-filter-head">Filter</div>
                                <div className="common-filter">
                                <div className="head">Buku Habis</div>
                                    <input type="radio" onChange={handleChange} onClick={handleToggleHabis} checked={toggleHabis} className="pixel-radio ml-3" id="togglehabis" /><label htmlFor="togglehabis">Tampilkan</label>
                                <div className="head">Harga</div>
                                <div className="price-range-area">
                                    <Nouislider
                                        range={{ min: 0, max: Harga }} 
                                        start={[SslideMin.current, SslideMax.current]} 
                                        step={5000}
                                        connect
                                        behaviour='tap' 
                                        onSlide={handleSlide}
                                        onEnd={handleRangeUp}
                                        onSet={handleRangeUp}
                                        format={{ to: (v) => parseFloat(v).toFixed(0), from: (v) => parseFloat(v).toFixed(0) }} 
                                    />
                                    <div className="value-wrapper d-flex">
                                        <span>Rp {separator(rfrom)}</span>
                                        <div id="lower-value"></div>
                                        <div className="to">-</div>
                                        <span>Rp {separator(rto)}</span>
                                        <div id="upper-value"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-7">
                    <div className="filter-bar d-flex flex-wrap align-items-center">
                        <div className="sorting">
                            <Select
                                value={selectSort.current}
                                defaultValue={{value: 'default', label: 'Urutkan'}}
                                options={optionsSort}
                                onChange={handleSortChange}
                                isClearable={true}
                            />
                        </div>
                        <div className="sorting mr-auto">
                            <Select
                                defaultValue={{value: 'default', label: 'Per Halaman'}}
                                options={optionsPage}
                                onChange={handlePerPageChange}
                                isClearable={true}
                            />
                        </div>
                        <div>
                        <form onSubmit={handleKeywordInput}>
                            <div className="input-group filter-bar-search">
                                <input value={currentKeyword} onChange={changeKeyword} type="text" placeholder="Cari" id="keywordinput"/>
                                <div className="input-group-append">
                                <button type="submit"><i className="ti-search"></i></button>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    <section className="lattest-product-area pb-40 category-list text-center">
                        {filter}
                        <div className="row">
                            {dBuk}
                            <nav className="blog-pagination justify-content-center d-flex col-12">
                                {totalData?.length > perPage ? <ReactPaginate
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
                    </section>
                    </div>
                </div>
                </div>
            </section>
        </Fragment>
    )
}