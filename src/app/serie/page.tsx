'use client'

import { useEffect, useState } from "react";
import Navbar from "@/componets/navbar";
import AlbumGridSeries from "@/componets/inicioSeries/AlbumGridSeries";
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
      <AlbumGridSeries movies={seriesPage} allMoviesData={seriesPage} />
      {loading ? (
        <div className="text-center py-5">Carregando séries...</div>
      ) : error ? (
        <div className="text-center py-5 text-success">Erro: {error}</div>
      ) : seriesPage.length === 0 ? (
        <div className="text-center py-5 text-white">Nenhuma série encontrada.</div>
      ) : (
        <>
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