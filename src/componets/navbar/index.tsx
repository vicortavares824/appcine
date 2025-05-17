import Link from "next/link";

export default function Navbar() {
    return (
  <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
  <div className="container-fluid">
    <p className="navbar-brand fw-bold fs-4">Filmes & Séries</p>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavApp" aria-controls="navbarNavApp" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavApp">
      <ul className="navbar-nav ms-auto"> 
        <li className="nav-item ms-lg-3">
         <Link href="/login" className=" btn btn-outline-dark rounded-pill me-2">Login</Link>
        </li>
      </ul>
    </div>
  </div>
  
</nav>

    )
}