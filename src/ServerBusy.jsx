import React from 'react'
import ImgServerBusy from './ServerBusy.svg'

function ServerBusy() {
  return (
  <div className="container d-flex align-items-center justify-content-center" >
    <div className="text-center">
      <img src={ImgServerBusy} alt="Server Busy Image" className="server"/>
      <div className="mt-3 server-busy"><strong>Server Busy</strong></div>
      <p className="mb-4">
          Our system is currently under high load, resulting in delays.<br/>
          We apologize for the inconvenience. Please try again later.
      </p>
      <a href="/" className="btn btn-primary-login">Back to Home Page</a>
      </div>
  </div>
  )
}

export default ServerBusy