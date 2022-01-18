import { Link } from "react-router-dom";



export function SideBar(props) {

    return (
        <nav className={"sidebar" + (props.opened ? ' opened' : '')}>
            <ul>
                <li>
                    <Link to="/">Domů</Link>
                    <ul>
                        <li>
                            <a>BPC</a>
                            <ul>
                                <li>
                                    <a>MPE</a>
                                    <ul>
                                        <li>
                                            <Link to="/exams/bpc/mpe/zkouska">Zkouška</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            <select className="header-menu-select" onChange={props.themeChange} value={props.theme}>
                {props.colorThemes.map((colorTheme, index) => <option key={index} value={colorTheme.value}>{colorTheme.name}</option>)}
            </select>
        </nav>
    )
}