import { Link } from "react-router-dom";
import './../css/sidebar.css';
import Accordion from './accordion';
import { useRecoilState, useRecoilValue } from "recoil";
import { menuOpenedState, themeState, modeState, showIncorrectAnswersState } from "../globalState";

export function SideBar(props) {
    const menuOpened = useRecoilValue(menuOpenedState);

    const [showIncorrectAnswers, setShowIncorrectAnswers] = useRecoilState(showIncorrectAnswersState);
    const [theme, setTheme] = useRecoilState(themeState);
    const [mode, setMode] = useRecoilState(modeState);

    const toggleShowIncorrectAnswers = () => {
        setShowIncorrectAnswers(showIncorrectAnswers ? false : true);
    }

    return (
        <nav className={"sidebar" + (menuOpened ? ' opened' : '')}>
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
                    <input type="checkbox" id="showIncorrectAnswers" name="showIncorrectAnswers" 
                        onChange={toggleShowIncorrectAnswers} checked={showIncorrectAnswers}/>
                    <label htmlFor="showIncorrectAnswers">Nesprávné odpovědi</label>
                </div>
                <select className="sidebar-select" onChange={(e) => setMode(e.target.value)} defaultValue={mode}>
                    {props.modes.map((mode, index) => <option key={index} value={mode.value}>{mode.name}</option>)}
                </select>
                <select className="sidebar-select" onChange={(e) => setTheme(e.target.value)} defaultValue={theme}>
                    {props.colorThemes.map((colorTheme, index) => <option key={index} value={colorTheme.value}>{colorTheme.name}</option>)}
                </select>
            </div>
        </nav>
    )
}