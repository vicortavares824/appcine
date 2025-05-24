export default function Select() {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Em Alta</h2>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a className="nav-link active bg-success" href="#">Todos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">Filmes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">Séries</a>
            </li>
          </ul>
        </div>
  );
}