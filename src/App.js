import { Route, Routes } from 'react-router-dom'
import Blog from './Components/Blog'
import BlogDetail from './Components/BlogDetail'
import BlogList from './Components/BlogList'
import Contact from './Components/Contact'
import DashBoard from './Components/DashBoard'
import DetailBuku from './Components/DetailBuku'
import Empty from './Components/Empty'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Katalog from './Components/Katalog'
import Login from './Components/Login'
import Main from './Components/Main'
import Profile from './Components/Profile'
import Register from './Components/Register'

export default function App() {
    return (
        <div>
            <Header/>
                <Routes>
                    <Route exact index element={<Main/>} />
                    <Route exact path='/katalog' element={<Katalog/>} />
                    <Route exact path='/blog' element={<Blog/>}>
                        <Route exact index element={<BlogList/>} />
                        <Route exact path='/blog/:id' element={<BlogDetail/>}/>
                    </Route>
                    <Route exact path='/profil' element={<Profile/>}>
                        <Route exact index element={<DashBoard/>}/> 
                    </Route>
                    <Route exact path='/contact' element={<Contact/>}/>
                    <Route exact path='/buku/:id' element={<DetailBuku/>} />
                    <Route exact path='/login' element={<Login/>} />
                    <Route exact path='/register' element={<Register/>} /> 
                    <Route exact path='/*' element={<Empty/>}/>
                </Routes>
            <Footer/>
        </div>
    )
      
}
