import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { MathJaxContext } from 'better-react-mathjax';
import { MantineProvider } from '@mantine/core';

const mathJaxConfig = {
  dynamic: true
};

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <MathJaxContext>
        <BrowserRouter>
        <MantineProvider
          theme={{
            // Override any other properties from default theme
            fontFamily: 'Open Sans, sans serif',
            spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
          }}>
            <App />
          </MantineProvider>
        </BrowserRouter>
      </MathJaxContext>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
