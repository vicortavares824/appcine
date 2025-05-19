'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

export default function Filmes() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getMovies(page);
  }, [page]);

  const getMovies = (page: number) => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: '60b55db2a598d09f914411a36840d1cb',
        language: 'pt-BR',
        page: page
      }
    })
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes:", error);
      });
  };
  return (
      
    <main>
      <nav className="navbar navbar-expand-lg  bg-white shadow-sm ">
        <div className="container-fluid">
          <div className="collapse navbar-collapse justify-content-center" id="navbarNavApp">
            <ul className="navbar-nav  "> 
              <li className="nav-item ms-lg-3 m-2">
              <Link href="/filme" className=" btn btn-outline-dark rounded-pill me-2">Filmes</Link>
              <Link href="/serie" className=" btn btn-outline-dark rounded-pill me-2">Series</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <AlbumGrid movies={movies} />
        <div className="d-flex justify-content-center my-4 gap-2">
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg>
        </button>
        <span className="align-self-center">Página {page} de {totalPages}</span>
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg>
        </button>
      </div>
    </main>
  );
}

function AlbumGrid({ movies }: { movies: Movie[] }) {
  return (
    
   
        
    
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 d-flex justify-content-center">
           {movies.map((movie) => (
            <AlbumCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
    
  );
}

// Componente AlbumCard - Replicando a estrutura do card do Bootstrap
function AlbumCard({ movie }: { movie: Movie }) {
  return (
    <div className="card m-2 shadow-sm h-100 d-flex flex-column" style={{ width: '16rem', minHeight: '32rem' }}>
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        className="card-img-top p-3"
        alt={movie.title}
        width={300}
        height={350}
        style={{ height: '350px', objectFit: 'cover' }}
        priority
      />
      <div className="card-body d-flex flex-column" style={{ height: '250px' }}>
        <p className="card-title text-center">Titulo: {movie.title}</p>
        <p className="card-text">Nota: {movie.vote_average}</p>
        <p className="card-text text-truncate"><small className="text-muted">Descrição:</small> {movie.overview ? movie.overview : 'Sem descrição.'}</p>
        <p className="card-text"><small className="text-muted">Ano de Lançamento: {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</small></p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link href={`/assistir/filme/${movie.id}`} className="btn btn-sm btn-outline-dark">Assistir</Link>
          </div>
        </div>
      </div>
    </div>
  );
}



