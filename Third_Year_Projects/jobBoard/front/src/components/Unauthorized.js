import React from 'react'

const Unauthorized = () => {
    return (
        <div className='ErrorPage'>
            <div id="InfoBanner" >
                <span className="reversed reversedRight">
                    <span>
                        &#9888;
                    </span>
                </span>
                <span className="reversed reversedLeft">
                    WARNIIING !!!
                </span>
            </div>
            <img src='/images/Gif1.gif' alt='You shall not PASS !!!' style={{ width: "100%", height:"100%" }}></img>
        </div>
    )
}

export default Unauthorized