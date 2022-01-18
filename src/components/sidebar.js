import { Link } from "react-router-dom";
import './../css/sidebar.css';
import Accordion from './accordion';

export function SideBar(props) {

    return (
        <nav className={"sidebar" + (props.opened ? ' opened' : '')}>
            <Link to="/">Domů</Link>
            <Accordion name="BPC">
                <Accordion name="MPE">
                    <Link to="/exams/bpc/mpe/zkouska">Zkouška</Link>
                </Accordion>
            </Accordion>
            <select className="sidebar-theme-select" onChange={props.themeChange} value={props.theme}>
                {props.colorThemes.map((colorTheme, index) => <option key={index} value={colorTheme.value}>{colorTheme.name}</option>)}
            </select>
        </nav>
    )
}