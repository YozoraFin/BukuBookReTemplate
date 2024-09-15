import HomeBlog from './HomeBlog'
import HomeSlider from './HomeSlider'
import ProductSlide from './ProductSlide'

export default function Main({statusCart, setStatusCart}) {
    const switchCart = () => {
        setStatusCart(!statusCart)
    }

    return (
        <main className='site-main pb-3'>
            <HomeSlider/>
            <ProductSlide switchCart={switchCart}/>
            <HomeBlog/>
        </main> 
    )
}
