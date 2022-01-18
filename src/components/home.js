export default function Home() {
    return (
        <div style={{display: "grid", justifyItems: "center", minHeight: "calc(100vh - 63px", alignContent: "center"}}>
            <h1 class="text-uppercase" style={{textAlign: "center"}}>
                <span class="backdrop-item">Vítejte</span>
                <span class="backdrop-item">na</span>
                <span class="backdrop-item">perFEKTním</span>
                <span class="backdrop-item">drillu</span>
            </h1>
            <img src="/images/meme.jpg" height="500" />
        </div>
    )
}