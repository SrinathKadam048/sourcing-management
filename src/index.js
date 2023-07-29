import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles.css';
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);