import Link from "next/link";
import Image from "next/image";
import MovieDetailsModal from "../inicio/MovieDetailsModal";
import { useState } from "react";

// Definição do tipo Serie (pode ser importada de um arquivo de tipos futuramente)
type Serie = {
  id: number;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  genres?: { id: number; name: string }[];
  seasons?: { season_number: number; name: string; episode_count: number }[];
};

interface AlbumGridSeriesProps {
  movies: Serie[];
  allMoviesData: Serie[];
}

export default function AlbumGridSeries({ movies, allMoviesData }: AlbumGridSeriesProps) {
  // Pega o primeiro item da lista para destaque (pode ser randomizado se quiser)
  const numero = Math.floor(Math.random() * allMoviesData.length);
  const featuredSerie = allMoviesData.length > 0 ? allMoviesData[numero] : null;

  return (
    <div className="album py-5 bg-dark">
      <div className="container">
        {/* Bloco de Destaque */}
        {featuredSerie && (
          <div className="position-relative mb-5">
            <div
              className="bg-dark text-white text-center py-5 rounded shadow-lg border border-secondary"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${featuredSerie.backdrop_path || featuredSerie.poster_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "400px",
                position: "relative",
              }}
              key={featuredSerie.id}
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
                    <h1 className="display-5 fw-bold ">{featuredSerie.name}</h1>
                    <p className="lead mb-4 text-truncate-3 text-truncate">
                      {featuredSerie.overview || "Nenhuma descrição disponível para esta série."}
                    </p>
                    <div className="d-flex gap-2">
                      <Link href={`/assistir/serie/${featuredSerie.id}/1/1`} className="btn btn-success btn-lg shadow">
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
                        data-bs-target={`#quickViewModal-serie-${featuredSerie.id}`}
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
                item={{
                  id: featuredSerie.id,
                  title: featuredSerie.name || "Série sem nome",
                  overview: featuredSerie.overview,
                  poster_path: featuredSerie.poster_path,
                  release_date: featuredSerie.first_air_date,
                  vote_average: featuredSerie.vote_average,
                  genres: featuredSerie.genres ?? [],
                }}
                modalId={`quickViewModal-serie-${featuredSerie.id}`}
              />
            </div>
          </div>
        )}

        <h2 className="fw-bold mb-4">Séries em Destaque</h2>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4 justify-content-center">
          {movies.map((serie) => (
            <SerieCard key={serie.id} serie={serie} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SerieCard({ serie }: { serie: Serie }) {
  const [selectedSeason, setSelectedSeason] = useState<number>(serie.seasons?.[0]?.season_number || 1);
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const modalId = `quickViewModal-serie-${serie.id}`;
  const episodes = serie.seasons?.find(s => s.season_number === selectedSeason)?.episode_count || 1;

  return (
    <div className="col">
      <div className="card h-100 bg-dark text-white border-0 shadow w-100 p-2">
        <div className="position-relative">
          {serie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`}
              className="card-img-top"
              alt={serie.name || "Série sem nome"}
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
            <span className="badge bg-success">{serie.vote_average.toFixed(1)}</span>
          </div>
          <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-dark">
            <h5 className="card-title mb-0">{serie.name}</h5>
          </div>
        </div>
        <div className="card-body">
          <div className="mb-2">
            <label className="form-label text-light">Temporada</label>
            <select className="form-select mb-2 bg-secondary text-white border-0" value={selectedSeason} onChange={e => { setSelectedSeason(Number(e.target.value)); setSelectedEpisode(1); }}>
              {serie.seasons && serie.seasons.length > 0 ? (
                serie.seasons.map(season => (
                  <option key={season.season_number} value={season.season_number}>{season.name || ` ${season.season_number}`}</option>
                ))
              ) : (
                <option value="1" disabled>Nenhuma temporada</option>
              )}
            </select>
            <label className="form-label text-light">Episódio</label>
            <select className="form-select bg-secondary text-white border-0" value={selectedEpisode} onChange={e => setSelectedEpisode(Number(e.target.value))}>
              {Array.from({ length: episodes }, (_, i) => i + 1).map(ep => (
                <option key={ep} value={ep}>Episódio {ep}</option>
              ))}
            </select>
          </div>
          <div className="d-grid gap-2">
            <Link href={`/assistir/serie/${serie.id}/${selectedSeason}/${selectedEpisode}`} className="btn btn-sm btn-outline-light">Assistir</Link>
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
            <MovieDetailsModal item={{
              id: serie.id,
              title: serie.name || "Série sem nome",
              overview: serie.overview,
              poster_path: serie.poster_path,
              release_date: serie.first_air_date,
              vote_average: serie.vote_average,
              genres: serie.genres ?? [],
            }} modalId={modalId} />
          </div>
        </div>
      </div>
    </div>
  );
}
