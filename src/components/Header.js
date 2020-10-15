import React from 'react'
import '../index.css'
import image from '../images/covid.jpg'

const Header = () => {
    return (
        <header>
            <h2>C<img src={image} className='header-img' alt=""/>VID-19 Radar</h2>
        </header>
    )
}

export default Header
