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
      
    <main >
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
    
   
        
    
    <div className="album py-5 bg-dark ">
      <div className="container">
        
      <div className="position-relative mb-5 ">
        {movies.slice(5,6).map((movie) => (
        <div
          className="bg-dark text-white text-center py-5 rounded shadow-lg border border-secondary"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "400px",
            position: "relative",
          }}
          key={movie.id}
        >
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)",
              zIndex: 1,
            }}
          ></div>
          <div className="container h-100 position-relative" style={{zIndex:2}}>
            <div className="row h-100 align-items-center">
              <div className="col-md-6 text-start">
                <span className="badge bg-danger mb-2">Destaque</span>
                <h1 className="display-4 fw-bold mb-3">Filmes Exclusivos</h1>
                <p className="lead mb-4">
                  Explore nossa coleção de filmes premiados, blockbusters e clássicos do cinema. Novos títulos
                  adicionados toda semana.
                </p>
                <div className="d-flex gap-2">
                  <Link href={`/assistir/filme/${movie.id}`} className="btn btn-danger btn-lg shadow">
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
                    Assistir Trailer
                  </Link>
                  <button className="btn btn-outline-light btn-lg shadow">Ver Detalhes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
       <h2 className="fw-bold mb-4">Filmes em Destaque</h2>
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4 justify-content-center">
      {movies.slice(0,10).map((movie) => (
        <AlbumCard key={movie.id} movie={movie} />
      ))}
    </div>
    <h2 className="fw-bold mb-4">Lançamentos</h2>
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4 justify-content-center mt-4">
      
      {movies.slice(10,23).map((movie) => (
        <AlbumCard2 key={movie.id} movie={movie} />
      ))}
    </div>
    <div className="bg-light py-5 mt-5 rounded shadow">
      <div className="container">
        <h2 className="fw-bold mb-4 text-dark">Explore por Gênero</h2>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">
          { [
            { name: 'Ação', icon: 'lightning' },
            { name: 'Comédia', icon: 'emoji-laughing' },
            { name: 'Drama', icon: 'mask' },
            { name: 'Terror', icon: 'exclamation-triangle' },
            { name: 'Ficção', icon: 'stars' },
            { name: 'Animação', icon: 'palette' }
          ].map(function(genre, index) {
            return (
              <div key={index} className="col">
                <div className="card h-100 text-center shadow-sm hover-overlay bg-secondary bg-opacity-10 border-0">
                  <div className="card-body">
                    <div className="rounded-circle bg-danger bg-opacity-10 p-3 d-inline-flex mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="bi bi-film text-danger"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
                      </svg>
                    </div>
                    <h5 className="card-title text-dark">{genre.name}</h5>
                    <Link href="#" className="stretched-link"></Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
      </div>
    </div>
    
  );
}

// Componente AlbumCard - Replicando a estrutura do card do Bootstrap





function AlbumCard({ movie }: { movie: Movie }) {
  // Garantir que o JavaScript do Bootstrap seja carregado
  

  return (
    <>
      <div className="container py-5 rounded">
       
        <div className="row  g-4 w-100">
          
            <div className="col">
              <div className="card h-100 bg-dark text-white border-0 shadow w-100">
                <div className="position-relative">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                  width={300}
                  height={300}
                />
                  <div className="position-absolute top-0 end-0 p-2">
                    <span className="badge bg-danger">{movie.vote_average}</span>
                  </div>
                  <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-dark">
                    <h5 className="card-title mb-0">{movie.title}</h5>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-grid">
                <Link href={`/assistir/filme/${movie.id}`} className="btn btn-sm btn-outline-light">Assistir</Link>
              </div>
                
                </div>
              </div>
            </div>
        
        </div>
      </div>
    </>
  )
}
function AlbumCard2({ movie }: { movie: Movie }) {
  

  return (
    <>
      <div className="bg-dark py-5 rounded">
        <div className="container-fluid">
          
          <div className="row  g-4">
          
              <div  className="col ">
                <div className="card h-100 border-0 shadow">
                  <div className="position-relative">
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    className="card-img-top"
                    alt={movie.title}
                    width={300}
                    height={300}
                  />
                    <div className="position-absolute top-0 start-0 p-2">
                      <span className="badge bg-success">NOVO</span>
                    </div>
                    <div className="position-absolute top-0 end-0 p-2">
                      <span className="badge bg-danger">{movie.vote_average}</span>
                    </div>
                  </div>
                  <div className="card-body bg-light text-dark">
                    <h5 className="card-title mb-0 text-truncate">{movie.title}</h5>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small>{movie.release_date}</small>
                    </div>
                    <div className="d-grid">
                <Link href={`/assistir/filme/${movie.id}`} className="btn btn-sm btn-outline-dark">Assistir</Link>
              </div>
                  </div>
                </div>
              </div>
          
          </div>
        </div>
      </div>
    </>
  )
}



