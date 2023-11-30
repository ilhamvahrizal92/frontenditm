import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.js';
import axios from 'axios';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Dashboard from './dashboard.jsx'
import ServerBusy from './ServerBusy.jsx';
//import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.css';

axios.defaults.withCredentials =  true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store= {store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/serverbusy" element={<ServerBusy />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
