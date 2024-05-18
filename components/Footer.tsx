export default function Footer(){
    return (
        <footer className="text-center relative h-1" style={{bottom: "38px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" preserveAspectRatio="none" viewBox="0 0 1680 40" className="relative w-full z-1" ><path d="M0 40h1680V30S1340 0 840 0 0 30 0 30z" fill="#d6e2e2"></path></svg>
            <div className="container p-3 min-w-full relative text-gray-400" style={{bottom: "20px"}}>
                <div className="text-center p-4 " >
                    © 2024 con 🧡 por 
                    <a className="text-gray-400" href="https://esfmx.com/" target="_blank" >  ESFMX</a>
                </div>
            </div>
        </footer>
    )
}