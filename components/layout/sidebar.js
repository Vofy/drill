import Accordion from 'components/accordion';
import { useRecoilState } from "recoil";
import { menuOpenedState, themeState, modeState, showIncorrectAnswersState } from "state/state";
import React, { useEffect } from "react";
import Link from 'next/link';

export default function SideBar() {
    const [showIncorrectAnswers, setShowIncorrectAnswers] = useRecoilState(showIncorrectAnswersState);
    const [menuOpened, setMenuOpened] = useRecoilState(menuOpenedState);
    const [theme, setTheme] = useRecoilState(themeState);
    const [mode, setMode] = useRecoilState(modeState);

    const toggleShowIncorrectAnswers = () => {
        setShowIncorrectAnswers(showIncorrectAnswers ? false : true);
    }

    useEffect(() => {
        setMenuOpened(false);
    }, [showIncorrectAnswers, theme, mode])

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
        <div className={"sidebar" + (menuOpened ? ' opened' : '')}>
            <Link href="/">Domů</Link>
            <Accordion name="BPC">
                <Accordion name="ESO">
                    <Link href="/bpc/eso/zkouska">Zkouška</Link>
                </Accordion>
                <Accordion name="MPE">
                    <Accordion name="LC">
                        <Link href="/bpc/mpe/lc/8">Úloha 8</Link>
                        <Link href="/bpc/mpe/lc/9">Úloha 9</Link>
                        <Link href="/bpc/mpe/lc/10">Úloha 10</Link>
                    </Accordion>
                    <Link href="/bpc/mpe/zkouska">Zkouška</Link>
                </Accordion>
                <Accordion name="FY2">
                    <Accordion name="LC">
                        <Link href="/bpc/fy2/lc/24">24</Link>
                        <Link href="/bpc/fy2/lc/26">26</Link>
                        <Link href="/bpc/fy2/lc/28">28</Link>
                        <Link href="/bpc/fy2/lc/42a45">42 a 45</Link>
                        <Link href="/bpc/fy2/lc/46">46</Link>
                    </Accordion>
                </Accordion>
                <Accordion name="EL1">
                    <Accordion name="CPP">
                        <Link href="/bpc/el1/cpp/194">NV 194/2022 Sb.</Link>
                        <Link href="/bpc/el1/cpp/lc">LC</Link>
                    </Accordion>
                </Accordion>
                <Accordion name="EL2">
                    <Accordion name="CPP">
                        <Link href="/bpc/el2/cpp/lc">LC</Link>
                    </Accordion>
                </Accordion>
                <Accordion name="MVE">
                    <Accordion name="LC">
                        <Link href="/bpc/mve/lc/1">1</Link>
                        <Link href="/bpc/mve/lc/2">2</Link>
                        <Link href="/bpc/mve/lc/3">3</Link>
                        <Link href="/bpc/mve/lc/4">4</Link>
                        <Link href="/bpc/mve/lc/5">5</Link>
                        <Link href="/bpc/mve/lc/6">?</Link>
                    </Accordion>
                </Accordion>
                <Accordion name="EMV1">
                    <Accordion name="Testy">
                        <Link href="/bpc/emv1/testy/1">1</Link>
                        <Link href="/bpc/emv1/testy/2">2</Link>
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
        </div>
    )
}
