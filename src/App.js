import './css/App.css';
import React, { useState, useEffect } from 'react';
import useLocalStorage from "use-local-storage";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './components/header'
import { SideBar } from './components/sidebar';
import {  useRecoilState } from 'recoil';
import { menuOpenedState, modeState, searchedStringState, themeState, showIncorrectAnswersState } from './globalState'

import Exam from './components/exam';
import Home from './components/home';


function App() {
  const [theme, setTheme] = useRecoilState(themeState);
  const [mode, setMode] = useRecoilState(modeState);

  const [menuOpened, setMenuOpened] = useRecoilState(menuOpenedState);
  const [searchedString, setSearchedString] = useRecoilState(searchedStringState);

  const [showIncorrectAnswers, setShowIncorrectAnswers] = useRecoilState(showIncorrectAnswersState);
  
  const content = React.createRef();

  const colorThemes = [
    {name: "Moodle (light)", value: ""},
    {name: "Nord (dark)", value: "nord-dark"},
    {name: "Mocha (dark)", value: "mocha-dark"}
  ];
  
  const modes = [
    {name: "Hledání", value: "query"},
    {name: "Drill", value: "quiz"}
  ];

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
      <SideBar modes={modes} colorThemes={colorThemes} />
      <Header/>

      <div className="content" ref={content}>
        <Routes>
          <Route path="/" exact element={<Home setMode={setMode} />} />
          {datasets.map((dataset, index) => 
            <Route key={index} path={dataset.path} element={
              <Exam searchedString={searchedString}
                setMode={setMode}
                contentRef={content}
                dataset={'/datasets' + dataset.path + '.json'} />}
            />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
