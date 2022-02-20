import { Link } from "react-router-dom";
import '../../css/sidebar.css';
import Accordion from '../accordion';
import { useRecoilState } from "recoil";
import { menuOpenedState, themeState, modeState, showIncorrectAnswersState } from "../../globalState";
import { useLocation } from "react-router";
import { useEffect } from "react";

export default function SideBar() {
    const location = useLocation();

    const [showIncorrectAnswers, setShowIncorrectAnswers] = useRecoilState(showIncorrectAnswersState);
    const [menuOpened, setMenuOpened] = useRecoilState(menuOpenedState);
    const [theme, setTheme] = useRecoilState(themeState);
    const [mode, setMode] = useRecoilState(modeState);

    const toggleShowIncorrectAnswers = () => {
        setShowIncorrectAnswers(showIncorrectAnswers ? false : true);
    }

    useEffect(() => {
        setMenuOpened(false);
    }, [location, showIncorrectAnswers, theme, mode])

    const colorThemes = [
        {name: "Moodle (light)", value: ""},
        {name: "Nord (dark)", value: "nord-dark"},
        {name: "Mocha (dark)", value: "mocha-dark"}
    ];
      
    const modes = [
        {name: "Hledání", value: "search"},
        {name: "Drill", value: "quiz"}
    ];

    return (
        <nav className={"sidebar" + (menuOpened ? ' opened' : '')}>
            <Link to="/">Domů</Link>
            <Accordion name="BPC">
                <Accordion name="MPE">
                    <Accordion name="LC">
                        <Link to="/bpc/mpe/lc/8">Úloha 8</Link>
                        <Link to="/bpc/mpe/lc/9">Úloha 9</Link>
                        <Link to="/bpc/mpe/lc/10">Úloha 10</Link>
                    </Accordion>
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
                    {modes.map((mode, index) => <option key={index} value={mode.value}>{mode.name}</option>)}
                </select>
                <select className="sidebar-select" onChange={(e) => setTheme(e.target.value)} defaultValue={theme}>
                    {colorThemes.map((colorTheme, index) => <option key={index} value={colorTheme.value}>{colorTheme.name}</option>)}
                </select>
            </div>
        </nav>
    )
}