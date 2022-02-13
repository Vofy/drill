import './css/App.css';
import React, { useState, useEffect } from 'react';
import useLocalStorage from "use-local-storage";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './components/header'
import { SideBar } from './components/sidebar';

import Exam from './components/exam';
import Home from './components/home';

function App() {
  const [menuOpened, setMenuOpened] = useState(false);
  const [searchedString, setSearchedString] = useState("");

  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [mode, setMode] = useLocalStorage('mode', 'search');
  const [showIncorrectAnswers, setShowIncorrectAnswers] = useLocalStorage('show_incorrect_ansvers', false);
  

  const content = React.createRef();

  const handleChange = (e) => {
    const delayDebounceFn = setTimeout(() => setSearchedString(e.target.value), 500)
    return () => clearTimeout(delayDebounceFn);
  }

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  }
  
  const toggleMenu = (e) => {
    setMenuOpened(menuOpened ? false : true);
  }
  
  const closeMenu = (e) => {
    setMenuOpened(false);
  }

  useEffect(() => {
    closeMenu();
  }, [useLocation()]);

  useEffect(() => {
    setSearchedString("");
  }, [mode]);

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
      <SideBar opened={menuOpened}
        modes={modes} mode={mode} setMode={setMode}
        showIncorrectAnswers={showIncorrectAnswers} setShowIncorrectAnswers={setShowIncorrectAnswers}
        theme={theme} colorThemes={colorThemes} themeChange={handleThemeChange} />

      <Header toggleMenu={toggleMenu} mode={mode} searchedString={searchedString} handleChange={handleChange} />

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
