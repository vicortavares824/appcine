'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

export default function Inicio() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies(1);
  }, []);

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
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes:", error);
      });
  };

  return (
    <>
      <div className="position-relative">
        {/* ...hero section fixa, se quiser pode remover daqui... */}
      </div>

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
        {movies.length > 0 && <MovieCardplayer movie={movies[9]} />}
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
          {movies.slice(10).map((movie) => (
           
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="col">
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
              background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)",
            }}
          ></div>
          <div className="container h-100 position-relative">
            <div className="row h-100 align-items-center">
              <div className="col-md-6 text-start">
                <span className="badge bg-success mb-2">Mais Escolhido</span>
                <h1 className="display-4 fw-bold mb-3">{movie.title}</h1>
                <p className="lead mb-4">
                {movie.overview ? movie.overview : 'Sem descrição.'}
                </p>
                <div className="d-flex gap-2">
                  <Link href={`/assistir/filme/${movie.id}`}className="btn btn-success btn-lg">
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
                  <button className="btn btn-outline-light btn-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-info-circle me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                    Mais Informações
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}