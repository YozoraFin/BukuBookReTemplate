import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


export default function DashBoard() {
    const [userData, setUserData] = useState({})
    const [loadingData, setLoadingData] = useState(true)
    const [editNamaLengkap, setEditNamaLengkap] = useState('')
    const [editNamaPanggilan, setEditNamaPanggilan] = useState('')
    const [editAlamat, setEditAlamat] = useState('')
    const [editNoTelp, setEditNoTelp] = useState('')
    const [image, setImage] = useState({})
    const [crop, setCrop] = useState({
        unit: 'px',
        width: 50,
        height: 50
    })
    const [results, setResults] = useState(null)
    const [srcImg, setSrcImg] = useState(null)
    

    const handleEdit = (e) => {
        e.preventDefault()
        var formData = new FormData(e.target)
        const MySwal = withReactContent(Swal)
        formData.append('AksesToken', localStorage.getItem('accesstoken'))
        formData.append('Profile', results.replace(/^data:image\/(png|jpg);base64,/,""))
        axios.post('http://localhost/bukubook/api/customer/update', formData).then((res) => {
            if(res.data.status === 200) {
                MySwal.fire({
                    title: 'Berhasil memperbarui biodata',
                    icon: 'success'
                }).then(() => {
                    getData()
                })
            } else {
                MySwal.fire({
                    title: res.data.status,
                    text: res.data.message,
                    icon: 'error'
                })
            }
        })
    }

    const gambarInput = async(event) => {
        setSrcImg(URL.createObjectURL(event.target.files[0]))
    }

    const getCroppedImg = () => {
        try {
            const canvas = document.createElement("canvas")
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");
            const pixelRatio = window.devicePixelRatio;
            canvas.width = crop.width * pixelRatio;
            canvas.height = crop.height * pixelRatio;
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            const base64Image = canvas.toDataURL("image/jpeg", 1);
            setResults(base64Image)
        } catch(e) {
            console.log(e)
        }
    }

    const loaded = () => {
        setImage(document.getElementById('aow'))
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

    const handleNoTelephone = (e) => {
        setEditNoTelp(e.target.value)
    }

    const getData = () => {
        var formData = new FormData()
        formData.append('AksesToken', localStorage.getItem('accesstoken'))
        axios.post('http://localhost/bukubook/api/customer/get', formData).then((res) => {
            setUserData(res.data.data)
            setEditNamaLengkap(res.data.data.NamaLengkap)
            setEditNamaPanggilan(res.data.data.NamaPanggilan)
            setEditAlamat(res.data.data.Alamat)
            setEditNoTelp(res.data.data.NoTelephone)
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
                    {userData?.profile === null ? <img src="/img/blog/blank-profile-picture-973460_1280.webp" alt="" /> : <img src={userData?.profile} alt="" />}
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        {loadingData ? <h4><Skeleton width={200} className='nama'/></h4> : <h4 className='nama'>{userData?.NamaLengkap}</h4>}
                        {loadingData ? <Skeleton width={250} /> : <p>{userData?.Alamat}</p>}
                    </div>
                </div>
                <div className="col-12 p-0">
                    <div className="register_form_inner">
                        <form className="row login_form" action="#/" id="register_form" onSubmit={handleEdit}>
                            <div className="col-md-12 form-group">
                                <button className="button button-postComment" type="button" onClick={handlePhotoClick}>Ganti Foto</button>
                                <input accept='image/*' onChange={gambarInput} type="file" name='Profilez' className="d-none" id="photoprofile"/>
                                <br />
                                {srcImg && (
                                    <div>
                                        <ReactCrop
                                            style={{ maxWidth: '50%' }}
                                            crop={crop}
                                            onChange={c => setCrop(c)}
                                            aspect={1}
                                            onComplete={getCroppedImg}
                                        >
                                            <img src={srcImg} alt="" onLoad={loaded} id='aow'/>
                                        </ReactCrop>
                                    </div>
                                )}
                                <div>
                                    <img width={250} height={250} src={results} alt="cropped" id='cropped' />
                                </div>
                            </div>
                            <div className="col-md-12 form-group">
                                <input type="text" className="form-control" id="namel" name="NamaLengkap" placeholder="Nama Lengkap" required onChange={handleNamaLengkap} value={editNamaLengkap}/>
                            </div>
                            <div className="col-md-12 form-group">
                                <input type="text" className="form-control" id="namep" name="NamaPanggilan" placeholder="Nama Panggilan" required onChange={handleNamaPanggilan} value={editNamaPanggilan}/>
                            </div>
                            <div className="col-md-12 form-group">
                                <input type="text" className="form-control" id="ntlp" name="NoTelephone" placeholder="No HP" required onChange={handleNoTelephone} value={editNoTelp}/>
                            </div>
                            <div className="col-md-12 form-group">
                                <input type="text" className="form-control" id="alamat" name="AlamatRumah" placeholder="Alamat" required onChange={handleAlamat} value={editAlamat}/>
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
