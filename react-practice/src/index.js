import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ContainerApp from "./App";

//ContainerApp используется для адекватного теста (для App необходим Provider и BrowserRouter,
// но они находятся снаружи, поэтому в тесте они не воспринимаются и выдается ошибка)

    ReactDOM.render(<ContainerApp />,document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();