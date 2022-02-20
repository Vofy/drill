import './css/App.css';
import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from 'recoil';
import { modeState, searchedStringState, themeState } from './globalState'

import Header from './components/layout/header'
import SideBar from './components/layout/sidebar';
import Quiz from './components/quiz/quiz';
import Search from './components/search/search';
import Home from './components/home';


function App() {
  const location = useLocation();

  const [theme, setTheme] = useRecoilState(themeState);
  const mode = useRecoilValue(modeState);
  const [searchedString, setSearchedString] = useRecoilState(searchedStringState);
  
  const content = React.createRef();

  return (
    <div className="App" data-theme={theme}>
      <SideBar/>
      <Header/>

      <div className="content" ref={content}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path={location.pathname}>
            {((mode === 'search') && <Search searchedString={searchedString} contentRef={content} dataset={'/datasets' + location.pathname + '.json'} />) ||
            ((mode === 'quiz') && <Quiz dataset={'/datasets' + location.pathname + '.json'} />)
          } 
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
