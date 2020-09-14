import React from 'react'
import './style.css'

function StaticBackground() {
    return (
        <div className="static-background">
            <img 
                className="background-image"
                src='./site-images/pexels-warren-blake-1477430-blurred.png'
                alt='garden background image'
            />
        </div>
    )
}

export default StaticBackground