import { Link } from "react-router-dom";
import './../css/sidebar.css';
import Accordion from './accordion';

export function SideBar(props) {

    return (
        <nav className={"sidebar" + (props.opened ? ' opened' : '')}>
            <Link to="/">Domů</Link>
            <Accordion name="BPC">
                <Accordion name="MPE">
                    <Link to="/bpc/mpe/zkouska">Zkouška</Link>
                </Accordion>
                <Accordion name="FY2">
                    <Accordion name="LC">
                        <Link to="/bpc/fy2/lc/24">24</Link>
                    </Accordion>
                </Accordion>
            </Accordion>
            <div className="sidebar-bottom">
                <div>
                    <input type="checkbox" id="showIncorrectAnswers" name="showIncorrectAnswers" value={true}/>
                    <label for="showIncorrectAnswers">Nesprávné odpovědi</label>
                </div>
                <select className="sidebar-select" onChange={props.modeChange} value={props.theme}>
                    {props.modes.map((mode, index) => <option key={index} value={mode.value}>{mode.name}</option>)}
                </select>
                <select className="sidebar-select" onChange={props.themeChange} value={props.theme}>
                    {props.colorThemes.map((colorTheme, index) => <option key={index} value={colorTheme.value}>{colorTheme.name}</option>)}
                </select>
            </div>
        </nav>
    )
}