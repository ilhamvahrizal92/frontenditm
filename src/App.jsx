import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginUser, reset } from './authSlice'
import Login from './Login.svg'
import Logo from './Log.svg'
import Azure from './Azure.svg'
import IconEye from './IconEye.svg'

//import viteLogo from '/vite.svg'

// <img src={viteLogo} classNameName="logo" alt="Vite logo" />
//  <img src={reactLogo} classsNameName="logo react" alt="React logo" />

function App() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
   if (user && isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ userName, password }));
  };

  return (
       <section className="container-fluid w-100 h-100">
        <div className="row w-100 h-100">
            <div className="col w-100 h-100">
                    <img src={Login} className="img-fluid w-100 h-100"/>
            </div>
            <div className="col w-100 h-100">
              <div className = "form">
              <div className="logo">
                  <img src={Logo} className="img"/>
              </div> 
              <div className="wellcome">
                <h1> <strong>Welcome Back !</strong></h1>
                <p>Enter to get unlimited access to data and information</p>
              </div>
              <div>
                <form onSubmit={Auth} >
                {isError && <p className="has-text-centered">{message}</p>}
                <div className="mb-3">
                  <label  className="form-label">Username</label>
                  <input type="username" 
                  className="form-control"  
                  placeholder="Enter username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group flex-nowrap">
                    <input type="password" 
                    className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter password"/>
                    <span className="input-group-text">
                      <img src={IconEye} alt="..."/>
                    </span>
                  </div>
                </div>
                 <div className="mb-3">
                  <label className="form-label">Domain</label>
                  <div className="input-group flex-nowrap">
                    <select className="form-select form-select-border-radius" defaultValue={'DEFAULT'} >
                      <option value="DEFAULT" disabled>banpuindo.co.id</option>
                    </select>
                  </div>
                </div> 
                <div className="d-grid gap-2">
                  <button className="btn btn-primary-login" type="submit">{isLoading ? "Loading..." : "Login"}</button>
                  <button className="btn btn-primary-default" type="button">
                    <span>
                      <img src={Azure} alt="..."/>
                      Default
                    </span>
                  </button>
                </div>
                </form>
              </div>
            </div>
            </div>
            </div>
</section>
   
  )
}

export default App
