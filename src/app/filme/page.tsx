'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/componets/navbar";
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
   <Navbar/>
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
    <div className="col-3">
      <div className="card h-100 text-white border-0 shadow  hover-overlay w-100">
        <div className="position-relative">
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            className="card-img-top"
            alt={movie.title}
            width={300}
            height={300}
          />
          <div className="position-absolute top-0 end-0 p-2">
            <span className="badge bg-success">{movie.vote_average}</span>
          </div>
          <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-to-t from-dark to-transparent">
            <h5 className="card-title mb-0 text-light">{movie.title}</h5>
          </div>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="card-title mb-0 text-truncate text-dark">{movie.title}</h5>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
          </div>
          
          <div className="d-flex gap-1 mb-2">
            <span className="badge bg-secondary">Filme</span>
          </div>
          <div className="d-grid">
             <Link href={`/assistir/filme/${movie.id}`} className="btn btn-sm btn-outline-dark">Assistir</Link>
          </div>
        </div>
      </div>
    </div>
  );
}



