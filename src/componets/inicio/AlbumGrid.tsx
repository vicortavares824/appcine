import Link from "next/link";
import Image from "next/image";
import MovieDetailsModal from "./MovieDetailsModal";

// Definição do tipo Movie (pode ser importada de um arquivo de tipos futuramente)
type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  release_date: string;
  vote_average: number;
  genres?: { id: number; name: string }[];
};

interface AlbumGridProps {
  movies: Movie[];
  allMoviesData: Movie[];
}

export default function AlbumGrid({ movies, allMoviesData }: AlbumGridProps) {
  // Pega o primeiro filme da lista COMPLETA de filmes para ser o destaque
  const numero = Math.floor(Math.random() * 10) + 1;
  const featuredMovie = allMoviesData.length > 0 ? allMoviesData[numero] : null;

  return (
    <div className="album py-5 bg-dark">
      <div className="container">
        {/* Bloco de Destaque */}
        {featuredMovie && (
          <div className="position-relative mb-5">
            <div
              className="bg-dark text-white text-center py-5 rounded shadow-lg border border-secondary"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path || featuredMovie.poster_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "400px",
                position: "relative",
              }}
              key={featuredMovie.id}
            >
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)",
                  zIndex: 1,
                }}
              ></div>
              <div className="container h-100 position-relative" style={{ zIndex: 2 }}>
                <div className="row h-100 align-items-center">
                  <div className="col-md-6 text-start">
                    <span className="badge bg-success mb-2">Destaque</span>
                    <h1 className="display-5 fw-bold ">{featuredMovie.title}</h1>
                    <p className="lead mb-4 text-truncate-3 text-truncate">
                      {featuredMovie.overview || "Nenhuma descrição disponível para este filme."}
                    </p>
                    <div className="d-flex gap-2">
                      <Link href={`/assistir/filme/${featuredMovie.id}`} className="btn btn-success btn-lg shadow">
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
                        Assistir
                      </Link>
                      <button
                        type="button"
                        className="btn btn-outline-light btn-lg shadow"
                        data-bs-toggle="modal"
                        data-bs-target={`#quickViewModal-movie-${featuredMovie.id}`}
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
              {/* O MovieDetailsModal para o destaque */}
              <MovieDetailsModal
                item={{ ...featuredMovie, genres: featuredMovie.genres ?? [] }}
                modalId={`quickViewModal-movie-${featuredMovie.id}`}
              />
            </div>
          </div>
        )}

        <h2 className="fw-bold mb-4">Filmes em Destaque</h2>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4 justify-content-center">
          {movies.map((movie) => (
            <AlbumCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Bloco "Explore por Gênero" */}
        <div className="bg-light py-5 mt-5 rounded shadow">
          <div className="container">
            <h2 className="fw-bold mb-4 text-dark">Explore por Gênero</h2>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">
              {[
                { name: 'Ação', icon: 'lightning' },
                { name: 'Comédia', icon: 'emoji-laughing' },
                { name: 'Drama', icon: 'mask' },
                { name: 'Terror', icon: 'exclamation-triangle' },
                { name: 'Ficção', icon: 'stars' },
                { name: 'Animação', icon: 'palette' }
              ].map(function (genre, index) {
                return (
                  <div key={index} className="col">
                    <div className="card h-100 text-center shadow-sm hover-overlay bg-secondary bg-opacity-10 border-0">
                      <div className="card-body">
                        <div className="rounded-circle bg-success bg-opacity-10 p-3 d-inline-flex mb-3">
                          {/* Ícone estático, você pode substituir por ícones correspondentes a cada gênero */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-film text-success"
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

// Componente AlbumCard: Exibe um único card de filme na grade
function AlbumCard({ movie }: { movie: Movie }) {
  const modalId = `quickViewModal-album-${movie.id}`;

  return (
    <div className="col">
      <div className="card h-100 bg-dark text-white border-0 shadow w-100 p-2">
        <div className="position-relative">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              className="card-img-top"
              alt={movie.title}
              width={300}
              height={260}
              objectFit="cover"
              unoptimized={false}
              priority={false}
            />
          ) : (
            <div style={{ width: 300, height: 450, backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              Sem Imagem
            </div>
          )}
          <div className="position-absolute top-0 end-0 p-2">
            <span className="badge bg-success">{movie.vote_average.toFixed(1)}</span>
          </div>
          <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-dark">
            <h5 className="card-title mb-0">{movie.title}</h5>
          </div>
        </div>
        <div className="card-body">
          <div className="d-grid gap-2">
            <Link href={`/assistir/filme/${movie.id}`} className="btn btn-sm btn-outline-light">Assistir</Link>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target={`#${modalId}`}
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
            <MovieDetailsModal
              item={{ ...movie, genres: movie.genres ?? [] }}
              modalId={modalId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
