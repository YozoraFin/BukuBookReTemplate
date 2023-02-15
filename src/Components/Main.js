import React, { useState } from 'react'
import HomeBlog from './HomeBlog'
import HomeSlider from './HomeSlider'
import ProductSlide from './ProductSlide'

export default function Main({cart, setCart}) {

    return (
        <main className='site-main pb-3'>
            <HomeSlider/>
            <ProductSlide cart={cart} setCart={setCart}/>
            <HomeBlog/>
        </main> 
    )
}
