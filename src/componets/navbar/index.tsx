export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
  <div className="container-fluid">
    <a className="navbar-brand fw-bold fs-4" href="#">Filmes & Séries</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavApp" aria-controls="navbarNavApp" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavApp">
      <ul className="navbar-nav ms-auto">
        
        <li className="nav-item">
          <a className="nav-link" href="#filmes">Filmes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#series">Séries</a>
        </li>
        
        <li className="nav-item ms-lg-3">
          <a className=" btn btn-outline-dark rounded-pill me-2" href="#login">Login</a>
        </li>
        <li className="nav-item ms-lg-3">
          <a className="btn btn-outline-success rounded-pill" href="#signup">Cadastrar</a>
        </li>
      </ul>
    </div>
  </div>
  
</nav>

    )
}