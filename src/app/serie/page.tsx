'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/componets/navbar";
import MovieDetailsModal from "../../componets/inicio/MovieDetailsModal";
// Corrige importação para garantir compatibilidade com Next.js/Turbopack
import seriesJson from '../../../series.json';

// Garante que a estrutura é a esperada
function getPageArray(json: Record<string, unknown>): Serie[][] {
  const pageArrays: Serie[][] = [];
  Object.keys(json)
    .filter((key) => key.toLowerCase().startsWith('page'))
    .sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ''));
      const numB = parseInt(b.replace(/\D/g, ''));
      return numA - numB;
    })
    .forEach((key) => {
      const arr = json[key];
      if (Array.isArray(arr)) pageArrays.push(arr as Serie[]);
    });
  return pageArrays;
}

const pages = getPageArray(seriesJson as Record<string, unknown>);

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

export default function Series() {
  const [seriesPage, setSeriesPage] = useState<Serie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      const currentPage = pages && pages[page - 1] ? pages[page - 1] : [];
      setSeriesPage(currentPage);
    } catch {
      setError('Erro ao carregar as séries do arquivo local.');
      setSeriesPage([]);
    }
    setLoading(false);
  }, [page]);

  const totalPages = Array.isArray(pages) ? pages.length : 1;

  return (
    <main>
      <Navbar />
      {loading ? (
        <div className="text-center py-5">Carregando séries...</div>
      ) : error ? (
        <div className="text-center py-5 text-success">Erro: {error}</div>
      ) : seriesPage.length === 0 ? (
        <div className="text-center py-5 text-white">Nenhuma série encontrada.</div>
      ) : (
        <>
          <div className="row row-cols-3 row-cols-md-4 g-3 mx-5 my-4">
            {seriesPage.map((serie) => (
              <SerieCard key={serie.id} serie={serie} />
            ))}
          </div>
          <div className="d-flex justify-content-center my-4 gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg>
            </button>
            <span className="align-self-center text-white">Página {page} de {totalPages}</span>
            <button
              className="btn btn-outline-primary"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg>
            </button>
          </div>
        </>
      )}
    </main>
  );
}

function SerieCard({ serie }: { serie: Serie }) {
  const [selectedSeason, setSelectedSeason] = useState<number>(serie.seasons?.[0]?.season_number || 1);
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const modalId = `quickViewModal-serie-${serie.id}`;
  const episodes = serie.seasons?.find(s => s.season_number === selectedSeason)?.episode_count || 1;

  return (
    <div className="col">
      <div className="card h-100 bg-dark text-white border-0 shadow w-100">
        <div className="position-relative">
          {serie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`}
              className="card-img-top"
              alt={serie.name || "Série sem nome"}
              width={300}
              height={450}
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
                  <option key={season.season_number} value={season.season_number}>{season.name || `Temporada ${season.season_number}`}</option>
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