import React from 'react'
import brandLogo from '../assets/BrandLogo/Group 1@2x.png'

const Header1 = () => {
    return (
        <header>
            <div className='psudo-nav'>

            </div>
            <nav id="nav">
                <div id="logo">
                    <img src={brandLogo} alt="Apeejay Stya University" />
                </div>
            </nav>
        </header>
    )
}

export default Header1
