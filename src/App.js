import './css/App.css';
import React, { useState, useEffect } from 'react';
import useLocalStorage from "use-local-storage";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './components/header'
import { SideBar } from './components/sidebar';
import Exam from './components/exam';
import Home from './components/home';

function App() {
  const [menuOpened,setMenuOpened] = useState(false);
  const [headerMode,setHeaderMode] = useState("");

  const [searchedString, setSearchedString] = useState("");

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

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
  
  const closeMenu = () => {
    setMenuOpened(false);
  }

  useEffect(() => {
    closeMenu();
    setHeaderMode("");
  }, [useLocation()]);

  useEffect(() => {
    setSearchedString("");
  }, [headerMode]);

  const colorThemes = [
    {name: "Moodle (light)", value: ""},
    {name: "Nord (dark)", value: "nord-dark"},
    {name: "Mocha (dark)", value: "mocha-dark"}
  ];

  return (
    <div className="App" data-theme={theme}>
      <SideBar opened={menuOpened} colorThemes={colorThemes} theme={theme} themeChange={handleThemeChange} />
      <Header toggleMenu={toggleMenu} headerMode={headerMode} searchedString={searchedString} handleChange={handleChange} />
      <div className="content" ref={content}>
        <Routes>
            <Route path="/" exact element={<Home />}/>
            <Route path="/exams/bpc/mpe/zkouska" element={<Exam searchedString={searchedString} setHeaderMode={setHeaderMode} contentRef={content} datasets={['/datasets/bpc/mpe/zkouska.json']} />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
