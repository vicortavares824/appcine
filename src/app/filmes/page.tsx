'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
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
  useEffect(() => {
    getMovies();
  }, []);
  const getMovies = () => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: '60b55db2a598d09f914411a36840d1cb',
        language: 'pt-BR',
      }
    })
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes:", error);
      })
  }
  return (
      
    <main>
      <nav className="navbar navbar-expand-lg  bg-white shadow-sm ">
        <div className="container-fluid">
          <div className="collapse navbar-collapse justify-content-center" id="navbarNavApp">
            <ul className="navbar-nav  "> 
              <li className="nav-item ms-lg-3 m-2">
              <Link href="/filmes" className=" btn btn-outline-dark rounded-pill me-2">Filmes</Link>
              <Link href="/Series" className=" btn btn-outline-dark rounded-pill me-2">Series</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <AlbumGrid movies={movies} />
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
      <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className="card-img-top p-3" alt={movie.title}style={{ height: '350px', objectFit: 'cover' }}/>
      <div className="card-body d-flex flex-column" style={{ height: '250px' }}>
        <p className="card-title text-center">Titulo: {movie.title}</p>
        <p className="card-text">Nota: {movie.vote_average}</p>
        <p className="card-text text-truncate"><small className="text-muted">Descrição:</small> {movie.overview ? movie.overview : 'Sem descrição.'}</p>
        <p className="card-text"><small className="text-muted">Ano de Lançamento: {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</small></p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link href={`/assistir/${movie.id}`} className="btn btn-sm btn-outline-dark">Assistir</Link>
          </div>
        </div>
      </div>
    </div>
  );
}



