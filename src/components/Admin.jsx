import React from 'react'
import Navbar from './Navbar'

const Admin = () => {
    return (
        <>
            <Navbar />
            <div>Admin</div>
            <p>sessionStorage.setItem('authToken', token);</p>
        </>

    )
}

export default Admin