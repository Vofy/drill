import './App.css';
import Fuse from 'fuse.js';
import Result from './components/result.js';
import React, { useState, useEffect } from 'react';
import useLocalStorage from "use-local-storage";

function App() {
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
    setTheme(theme === 'light' ? 'dark' : 'light');
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
    initFuse();
  }, []);

  return (
    <div className="App" data-theme={theme}>
      <header className="header">
        <button className="header-menu-button">
          <i className="fas fa-bars"></i>
        </button>
        <input autoFocus className="search" type="text" placeholder="Hledejte mezi 140 otázkami" defaultValue={searchedString} onInput={handleChange}/>
        <button className="header-menu-button" onClick={handleThemeChange}><i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i></button>
      </header>
      <div className="content" ref={content}>
        { result && result.map((res, index) => <Result key={index} res={res}/>) }
      </div>
    </div>
  );
}

export default App;
