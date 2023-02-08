import React from 'react'
import HomeBlog from './HomeBlog'
import HomeSlider from './HomeSlider'
import ProductSlide from './ProductSlide'

export default function Main() {
    return (
        <main className='site-main pb-3'>
            <HomeSlider/>
            <ProductSlide/>
            <HomeBlog/>
        </main> 
    )
}
