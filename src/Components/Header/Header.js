import React from 'react'
import './Header.css'

class Header extends React.Component {
    render() {
        return(
            <header className="navbar">
                TODO List
                <div className='credentials'>
                    {localStorage.getItem('mailUser')}
                </div>
            </header>
        )
    }
}

export default Header