import './css/App.css';
import Fuse from 'fuse.js';
import Home from './components/home.js';
import { SideBar } from './components/sidebar';
import React, { useState, useEffect } from 'react';
import useLocalStorage from "use-local-storage";
import { Routes, Route, useLocation } from "react-router-dom";
import Exam from './components/exam';

function App() {
  const [menuOpened,setMenuOpened] = useState(false);
  const [headerMode,setHeaderMode] = useState("");

  const [fuse,setFuse] = useState("");
  const [allQuestions,setAllQuestions] = useState([]);

  const [searchedString, setSearchedString] = useState("");
  const [result,setResult] = useState("");

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const content = React.createRef();

  const fetchAllDatasets = async () => {
    const urls = [
      '/datasets/bpc/mpe/zkouska.json',
      /*'/datasets/bpc/mpe/laboratorni-cviceni/uloha8.json',
      '/datasets/bpc/mpe/laboratorni-cviceni/uloha9.json',
      '/datasets/bpc/mpe/laboratorni-cviceni/uloha10.json'*/
    ];

    return Promise.all(urls.map(url => fetch(url)))
    .then(responses => Promise.all(responses.map(dataset => dataset.json())))
  };

  const initFuse = () => {
    fetchAllDatasets()

    .then((datasets) => {
      var allques = [];
      datasets.forEach(dataset => dataset.questions.forEach(question => allques.push(question)));
      setAllQuestions(allques);

      setFuse(new Fuse(allques, {
        isCaseSensitive: false,
        includeScore: true,
        minMatchCharLength: 0,
        shouldSort: true,
        findAllMatches: true,
        ignoreLocation: true,
        keys: [{ name: 'question', weight: 2 }, 'answers.correct']
      }));
    })

    .catch(function(err) {
      console.log(`Error: ${err}`)
    });
  }

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
    const Search = async () => {
      if (fuse && allQuestions) {
        if (searchedString === "") {
          let mappedArray = [];
          allQuestions.forEach(question => mappedArray.push({ item: question }));
          setResult(mappedArray);
        } else {
          setResult(fuse.search(searchedString));
        }

        content.current.scrollTo(0, 0);
      }
    };

    Search();
  }, [fuse, searchedString]);

  useEffect(() => {
    closeMenu();
    setHeaderMode("");
  }, [useLocation()]);

  useEffect(() => {
    setSearchedString("");
  }, [headerMode]);

  useEffect(() => {
    initFuse();
  }, []);

  const colorThemes = [
    {name: "Moodle (light)", value: ""},
    {name: "Nord (dark)", value: "nord-dark"},
    {name: "Mocha (dark)", value: "mocha-dark"}
  ];

  return (
    <div className="App" data-theme={theme}>
      <SideBar opened={menuOpened} colorThemes={colorThemes} theme={theme} themeChange={handleThemeChange} />
      <header className="header">
        <button className="header-menu-button" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
        { headerMode === 'search' ? <input autoFocus className="header-menu-search" type="text" placeholder="Hledejte mezi 140 otázkami" defaultValue={searchedString} onInput={handleChange}/> : <span style={{margin:"auto"}}><img src="/images/drill.svg" height="35" alt="Drill" />PerFEKTní drill</span> }
      </header>
      <div className="content">
        <Routes>
            <Route path="/" exact element={<Home />}/>
            <Route path="/exams/bpc/mpe/zkouska" element={<Exam result={result} content={content} setHeaderMode={setHeaderMode} />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
