import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useLocation } from "react-router";
import { debounce } from 'debounce';
import { menuOpenedState, modeState, searchedStringState } from "../../globalState";
import '../../css/header.css';

export default function Header(props) {
  const location = useLocation();

  const mode = useRecoilValue(modeState);
  const setSearchedString = useSetRecoilState(searchedStringState);
  const [menuOpened, setMenuOpened] = useRecoilState(menuOpenedState);
  
  const toggleMenu = (e) => {
    setMenuOpened(menuOpened ? false : true);
  }

  const handleChange = useCallback(debounce(e => {
    setSearchedString(e.target.value)
  }, 1000), []);

  const components = {
    title: 
      <span style={{margin:"auto"}}>
        <img src="/images/drill.svg" height="35" alt="Drill" />
        PerFEKTní drill
      </span>,
    search: 
      <input autoFocus 
        className="header-search"
        type="text"
        placeholder="Hledejte mezi otázkami"
        defaultValue={props.searchedString}
        onInput={handleChange}/>
  };

  return (
    <header className="header">
      <button className="header-button" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </button> 
      { 
        (location.pathname === '/' && components.title) ||
        (mode === 'quiz' && components.title) || 
        (mode === 'search' && components.search)
      }
      </header>
  )
}
