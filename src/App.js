import './css/App.css';
import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './components/header'
import { SideBar } from './components/sidebar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modeState, searchedStringState, themeState } from './globalState'

import Quiz from './components/quiz/quiz';
import Search from './components/search';
import Home from './components/home';


function App() {
  const [theme, setTheme] = useRecoilState(themeState);
  const state = useRecoilValue(modeState);
  const [searchedString, setSearchedString] = useRecoilState(searchedStringState);
  
  const content = React.createRef();

  const datasets = [
    {
      name: 'Zkouška',
      path: '/bpc/mpe/zkouska'
    },
    {
      name: '24 Fotoelektrický jev a Planckova konstanta ',
      path: '/bpc/fy2/lc/24'
    },
  ];

  return (
    <div className="App" data-theme={theme}>
      <SideBar/>
      <Header/>

      <div className="content" ref={content}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          {datasets.map((dataset, index) => 
            <Route key={index} path={dataset.path} element={
              ((state === 'search') && <Search searchedString={searchedString} contentRef={content} dataset={'/datasets' + dataset.path + '.json'} />) ||
              ((state === 'quiz') && <Quiz dataset={'/datasets' + dataset.path + '.json'} />)
            } />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
