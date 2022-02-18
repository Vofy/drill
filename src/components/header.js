import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { menuOpenedState, modeState, searchedStringState } from "../globalState";

import '../css/header.css';

export default function Header(props) {
  const [menuOpened, setMenuOpened] = useRecoilState(menuOpenedState);
  const mode = useRecoilValue(modeState);
  const setSearchedString = useSetRecoilState(searchedStringState);
  
  const toggleMenu = (e) => {
    setMenuOpened(menuOpened ? false : true);
  }

  const handleChange = (e) => {
    const delayDebounceFn = setTimeout(() => setSearchedString(e.target.value), 500)
    return () => clearTimeout(delayDebounceFn);
  }

  return (
    <header className="header">
      <button className="header-button" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </button>
      { mode === 'search' ? <input autoFocus className="header-search" type="text" placeholder="Hledejte mezi 140 otázkami" defaultValue={props.searchedString} onInput={handleChange}/> : <span style={{margin:"auto"}}><img src="/images/drill.svg" height="35" alt="Drill" />PerFEKTní drill</span> }
    </header>
  )
}