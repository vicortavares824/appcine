'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MovieDetailsModal from "./MovieDetailsModal";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
};

export default function Inicio() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch('https://api-movie-sigma.vercel.app/api/filmes?keyid=60b55db2a598d09f914411a36840d1cb');
        const data = await res.json();
        const moviesArr: Movie[] = Array.isArray(data)
          ? data
              .filter((item) => typeof item.title === 'string' && !!item.title)
              .map((item) => ({
                id: item.id,
                title: item.title || 'Filme sem título',
                overview: item.overview || '',
                poster_path: item.poster_path ?? null,
                release_date: item.release_date || '',
                vote_average: item.vote_average ?? 0,
                genres: item.genres ?? [],
              }))
          : [];
        const sorted = [...moviesArr].sort((a, b) => {
          const yearA = a.release_date ? parseInt(a.release_date.slice(0, 4)) : 0;
          const yearB = b.release_date ? parseInt(b.release_date.slice(0, 4)) : 0;
          return yearB - yearA;
        });
        setMovies(sorted.slice(0, 20));
      } catch {
        setMovies([]);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
    

      <div className="container py-5">
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
        {movies.length > 0 && <MovieCardplayer movie={movies[0]} />}
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
          {movies.slice(1, 20).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 bg-dark text-white border-0 shadow">
        <div className="position-relative">
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            className="card-img-top"
            alt={movie.title}
            width={300}
            height={280}
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
            
          </div>
          <div className="d-flex gap-1 mb-2">
            <span className="badge bg-secondary">Filme</span>
          </div>
          <div className="d-grid">
            <Link href={`/assistir/filme/${movie.id}`} className="btn btn-sm btn-outline-light">Assistir</Link>
          </div>
        </div>
      </div>
       
    </div>
    
  );
}

function MovieCardplayer({ movie }: { movie: Movie }) {
  return (
    <div className="position-relative">
      <div
        className="bg-dark text-white text-center py-5"
        style={{
          backgroundImage: "url(https://image.tmdb.org/t/p/original/" + movie.poster_path + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "600px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)",
          }}
        ></div>
        <div className="container h-100 position-relative">
          <div className="row h-100 align-items-center">
            <div className="col-md-6 text-start">
              <span className="badge bg-success mb-2">Mais Escolhido</span>
              <h1 className="display-4 fw-bold mb-3">{movie.title}</h1>
              <p className="lead mb-4">
                {movie.overview ? movie.overview : "Sem descrição."}
              </p>
              <div className="d-flex gap-2">
                <Link href={`/assistir/filme/${movie.id}`} className="btn btn-success btn-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-play-fill me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                  </svg>
                  Assistir Agora
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-light btn-lg"
                  data-bs-toggle="modal"
                  data-bs-target="#quickViewModal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-info-circle-fill me-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                  </svg>
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MovieDetailsModal item={movie} modalId="quickViewModal" />
    </div>
  );
}