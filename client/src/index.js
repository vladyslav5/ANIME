import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



import {Provider} from "react-redux"
import {createStore} from "./store";

const store = createStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>
);
