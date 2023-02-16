import React, { useState } from 'react'
import HomeBlog from './HomeBlog'
import HomeSlider from './HomeSlider'
import ProductSlide from './ProductSlide'

export default function Main({cart, setCart, statusCart, setStatusCart}) {

    return (
        <main className='site-main pb-3'>
            <HomeSlider/>
            <ProductSlide cart={cart} setCart={setCart}  statusCart={statusCart} setStatusCart={setStatusCart}/>
            <HomeBlog/>
        </main> 
    )
}
