import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"
import store from './store/index.js'
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <GoogleOAuthProvider clientId ="836764775589-17arug9qv0nq5dga5npdjoc71gjcpqcn.apps.googleusercontent.com">
        <App />
        </GoogleOAuthProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
)
