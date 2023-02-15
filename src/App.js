import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Blog from './Components/Blog'
import BlogDetail from './Components/BlogDetail'
import BlogList from './Components/BlogList'
import Cart from './Components/Cart'
import Checkout from './Components/Checkout'
import Confirmation from './Components/Confirmation'
import Contact from './Components/Contact'
import DashBoard from './Components/DashBoard'
import DetailBuku from './Components/DetailBuku'
import Empty from './Components/Empty'
import Footer from './Components/Footer'
import Guest from './Components/Guest'
import Header from './Components/Header'
import History from './Components/History'
import Katalog from './Components/Katalog'
import Login from './Components/Login'
import Main from './Components/Main'
import Profile from './Components/Profile'
import Register from './Components/Register'

export default function App() {
    const [cart, setCart] = useState(0)

    return (
        <div>
            <Header cart={cart} setCart={setCart} />
                <Routes>
                    <Route exact path='/katalog' element={<Katalog cart={cart} setCart={setCart} />} />
                    <Route exact path='/blog' element={<Blog/>}>
                        <Route exact index element={<BlogList/>} />
                        <Route exact path='/blog/:id' element={<BlogDetail/>}/>
                    </Route>
                    <Route exact path='/profil' element={<Profile/>}>
                        <Route exact index element={<DashBoard/>}/>
                        <Route exact path='/profil/riwayat' element={<History/>} />  
                    </Route>
                    <Route exact path='/kontak' element={<Contact/>}/>
                    <Route exact path='/buku/:id' element={<DetailBuku cart={cart} setCart={setCart} />} />
                    <Route exact path='/login' element={<Login/>} />
                    <Route exact path='/register' element={<Register/>} /> 
                    <Route exact path='/tamu' element={<Guest/>} />
                    <Route exact path='/keranjang' element={<Cart dcart={cart} setCart={setCart} />} />
                    <Route exact path='/checkout' element={<Checkout/>}/>
                    <Route exact path='/detail/:id' element={<Confirmation/>} />
                    <Route exact index element={<Main cart={cart} setCart={setCart}/>} />
                    <Route exact path='/*' element={<Empty/>}/>
                </Routes>
            <Footer/>
        </div>
    )
      
}
