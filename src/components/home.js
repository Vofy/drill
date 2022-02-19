export default function Home(props) {

    return (
        <div style={{display: "grid", justifyItems: "center", minHeight: "calc(100vh - 63px", alignContent: "center"}}>
            <h1 className="text-uppercase" style={{textAlign: "center"}}>
                <span className="backdrop-item">Vítejte</span>
                <span className="backdrop-item">na</span>
                <span className="backdrop-item">perFEKTním</span>
                <span className="backdrop-item">drillu</span>
            </h1>
            <img src="/images/meme.jpg" height="500" />
        </div>
    )
}