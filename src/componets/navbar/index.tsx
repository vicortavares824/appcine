export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold fs-4" href="#">Filmes & Séries</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#filmes">Filmes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#series">Séries</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}