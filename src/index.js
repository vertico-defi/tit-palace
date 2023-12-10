import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as fcl from '@onflow/fcl';
import './lib/fcl/config';
import {config} from '@onflow/fcl';
import dotenv from 'dotenv';


dotenv.config();

/*
if (window.location.protocol !== 'https:') {
  window.location.href = `https:${window.location.href.substring(window.location.protocol.length)}`;
} 
*/

config({
  "accessNode.api": "https://access-mainnet-beta.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/authn"
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
