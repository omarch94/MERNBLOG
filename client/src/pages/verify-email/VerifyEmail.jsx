import React from 'react'
import "./verify-email.css"
import { Link } from 'react-router-dom'
const VerifyEmail = () => {
    const isEmailVerified=false
  return (
   <section className='verify-email'>
        {
            isEmailVerified ?
             <> 
            <i className="bi bi-patch-check verify-email-icon"></i>
            <h1 className="verify-email-title">
                your email has been successfuly verified
            </h1>
            <Link to="/login" className='verify-email-link'> Go to Login page</Link>
            </> : 
            <>
            <h1 className="verify-email-not-found">
                Email not found
            </h1>
            </>
         }
   </section>
  )
}

export default VerifyEmail
