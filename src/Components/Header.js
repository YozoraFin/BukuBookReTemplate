import { Link, useLocation } from 'react-router-dom'

export default function Header() {
    const locat = useLocation();
    return (
        <header className="header_area">
            <div className="main_menu">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container">
                        <Link className="navbar-brand logo_h" to={'/'}><i className="fa fa-book text-primary" aria-hidden="true"></i> BukuBook</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul className="nav navbar-nav menu_nav ml-auto mr-auto">
                            <li className="nav-item"><Link to={'/'} className={locat.pathname === '/' ? 'nav-link navvlink active' : 'nav-link navvlink'} id='homelink'>Beranda</Link></li>
                            <li className="nav-item submenu dropdown">
                                <Link to="/katalog" className="nav-link dropdown-toggle">Katalog</Link>
                            </li>
                            <li className="nav-item submenu dropdown">
                                <Link to={'blog'} className={locat.pathname.indexOf('/blog') > -1 ? 'nav-link dropdown-toggle navvlink active' : 'nav-link dropdown-toggle navvlink'} id='bloglink'>blog</Link>
                            </li>
                            <li className="nav-item"><Link to={'contact'} className={locat.pathname.indexOf('/contact') > -1 ? 'nav-link navvlink active' : 'nav-link'}>Hubungi</Link></li>
                            </ul>

                            <ul className="nav-shop">
                            <li className="nav-item"><button><i className="ti-search"></i></button></li>
                            <li className="nav-item"><button><i className="ti-shopping-cart"></i><span className="nav-shop__circle">3</span></button> </li>
                            <li className="nav-item"><a className="button button-header" href="#a">Beli Sekarang</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}
