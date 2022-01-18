import '../css/header.css';

export default function Header(props) {

    return (
      <header className="header">
        <button className="header-button" onClick={props.toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
        { props.headerMode === 'search' ? <input autoFocus className="header-search" type="text" placeholder="Hledejte mezi 140 otázkami" defaultValue={props.searchedString} onInput={props.handleChange}/> : <span style={{margin:"auto"}}><img src="/images/drill.svg" height="35" alt="Drill" />PerFEKTní drill</span> }
      </header>
    )
}