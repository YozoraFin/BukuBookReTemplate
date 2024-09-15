import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function DashBoard({panggilan, setPanggilan}) {
    const [userData, setUserData] = useState({})
    const [loadingData, setLoadingData] = useState(true)
    const [editNamaLengkap, setEditNamaLengkap] = useState('')
    const [editNamaPanggilan, setEditNamaPanggilan] = useState('')
    const [editAlamat, setEditAlamat] = useState('')
    const [editNoTelp, setEditNoTelp] = useState('')
    const [gambar, setGambar] = useState('')
    const [srcGambar, setSrcGambar] = useState(null)

    const handleEdit = (e) => {
        e.preventDefault()
        var formData = new FormData(e.target)
        const MySwal = withReactContent(Swal)
        formData.append('AksesToken', localStorage.getItem('accesstoken'))
        axios.post('http://localhost:5000/customer/edit', formData).then((res) => {
            if(res.data.status === 200) {
                MySwal.fire({
                    title: 'Berhasil memperbarui biodata',
                    icon: 'success'
                }).then(() => {
                    getData()
                    setPanggilan(document.getElementById('namep').value)
                })
            } else {
                MySwal.fire({
                    title: 'Tidak bisa melanjutkan pembaruan',
                    text: res.data.message,
                    icon: 'error'
                })
            }
        })
    }

    const gambarInput = (event) => {
        setGambar(document.getElementById('photoprofile').value.split(/(\\|\/)/g).pop())
        setSrcGambar(URL.createObjectURL(event.target.files[0]))
    }

    const handlePhotoClick = () => {
        document.getElementById('photoprofile').click()
    }

    const handleNamaLengkap = (e) => {
        setEditNamaLengkap(e.target.value)
    }
    
    const handleNamaPanggilan = (e) => {
        setEditNamaPanggilan(e.target.value)
    }

    const handleAlamat = (e) => {
        setEditAlamat(e.target.value)
    }

    const handleNoTelephone = () => {
    }

    const getData = () => {
        var object = {
            AksesToken: localStorage.getItem('accesstoken')
        }
        axios.post('http://localhost:5000/customer/get', object).then((res) => {
            setUserData(res.data.data)
            setEditNamaLengkap(res.data.data?.NamaLengkap)
            setEditNamaPanggilan(res.data.data?.NamaPanggilan)
            setEditAlamat(res.data.data?.Alamat)
            setEditNoTelp(res.data.data?.NoTelp)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadingData(false)
        })
    }

    useEffect(() => {
        getData()
    },[])

    return (
        <div className='profilecontent'>
            <div className="dashwrap">
                <div className="backgroundtop">
                    <img src="/img/9121556_18973.jpg" alt="" />
                </div>
                <div className="imagecustomer">
                    {userData?.Profil === null || userData?.Profil === '' ? <img src="/img/blog/blank-profile-picture-973460_1280.webp" alt="" /> : <img src={userData?.Profil} alt="" className='profileshow'/>}
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        {loadingData ? <h4><Skeleton width={200} className='nama'/></h4> : <h4 className='nama'>{userData?.NamaLengkap}</h4>}
                        {loadingData ? <Skeleton width={250} /> : <p>{userData?.Email}</p>}
                    </div>
                </div>
                <div className="col-12 p-0">
                    <div className="register_form_inner">
                        <form className="row login_form" action="#/" id="register_form" onSubmit={handleEdit}>
                            <div className="col-md-12 form-group">
                                {srcGambar && <img width={166} height={166} src={srcGambar} alt="" className='profileedit' />}
                                <br />
                                {gambar}
                                <br />
                                <button className="button button-postComment" type="button" onClick={handlePhotoClick}>Ganti Foto</button>
                                <input onChange={gambarInput} type="file" name='Profil' className="d-none" id="photoprofile"/>
                            </div>
                            <div className="col-md-12 form-group">
                                <input type="text" className="form-control" id="namel" name="NamaLengkap" placeholder="Nama Lengkap" required onChange={handleNamaLengkap} value={editNamaLengkap}/>
                            </div>
                            <div className="col-md-12 form-group">
                                <input type="text" className="form-control" id="namep" name="NamaPanggilan" placeholder="Nama Panggilan" required onChange={handleNamaPanggilan} value={editNamaPanggilan}/>
                            </div>
                            <div className="col-md-12 form-group">
                                <input readOnly type="text" className="form-control" id="ntlp" name="NoTelp" placeholder="No HP" required onChange={handleNoTelephone} value={editNoTelp}/>
                            </div>
                            <div className="col-md-12 form-group">
                                <input type="text" className="form-control" id="alamat" name="Alamat" placeholder="Alamat" required onChange={handleAlamat} value={editAlamat}/>
                            </div>
                            <div className="col-md-12 form-group text-right">
                                <button type="submit" value="submit" className="button button-postComment">Selesai</button>
                            </div>
                        </form>
                    </div>       
                </div>
                
            </div>
        </div>
    )
}
