import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import Prices from "./components/Prices/Prices";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Header/>

              <Prices first={1} second={2}/>
          </div>
      </BrowserRouter>
  );
}

export default App;
