import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { MathJaxContext } from 'better-react-mathjax';

const mathJaxConfig = {
  dynamic: true
};

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <MathJaxContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MathJaxContext>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
