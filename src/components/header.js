export default function Header() {
    return (
        <header className="header">
        <input type="text" value={value} onChange={handleChange} placeholder="Začněte psát otázku"
          style={{
            height: "100%", 
            width: "100%", 
            backgroundColor: "transparent", 
            color: "white", 
            border: "none", 
            padding: "10px",
            fontSize: "1rem"}}></input>
      </header>
    )
}