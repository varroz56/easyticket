import React from 'react'
import Footer from '../containers/Footer'
import Nav from '../containers/Nav'


const Layout = props => {
    return (
        <div>
            <Nav />
            <div className="pushdown-content"></div>
            {props.children}
            <Footer />
        </div>
    )
}



export default Layout;