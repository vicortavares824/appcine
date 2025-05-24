'use client'

import { useEffect, useState } from "react";
import Navbar from "@/componets/navbar";
import AlbumGrid from "@/componets/inicio/AlbumGrid";
import filmesJson from '../../../filmes.json';
import Footer from "@/componets/footer";


// Definição do tipo Movie
type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path?: string | null; // Adicionado para permitir o uso em destaque
  release_date: string;
  vote_average: number;
  genres?: { id: number; name: string }[]; // Adicionado para ser compatível com MovieDetailsModal
};

// Função para transformar { "page 1": [...], "page 2": [...] } em array de páginas
function getPageArray(json: Record<string, unknown>): Movie[][] {
  const pageArrays: Movie[][] = [];
  Object.keys(json)
    .filter((key) => key.toLowerCase().startsWith('page'))
    .sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ''));
      const numB = parseInt(b.replace(/\D/g, ''));
      return numA - numB;
    })
    .forEach((key) => {
      const arr = json[key];
      if (Array.isArray(arr)) pageArrays.push(arr as Movie[]);
    });
  return pageArrays;
}

const pages = getPageArray(filmesJson as Record<string, unknown>);

// ==============================================================================
// Componente principal: Filmes
// ==============================================================================
export default function Filmes() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      const currentPage = pages && pages[page - 1] ? pages[page - 1] : [];
      setMovies(currentPage);
      setTotalPages(pages.length);
    } catch {
      setError('Erro ao carregar os filmes do arquivo local.');
      setMovies([]);
      setTotalPages(1);
    }
    setLoading(false);
  }, [page]);

  return (
    <main className="bg-dark text-white min-vh-100">
      <Navbar />
      {loading ? (
        <div className="text-center py-5">Carregando filmes...</div>
      ) : error ? (
        <div className="text-center py-5 text-success">Erro: {error}</div>
      ) : pages.length === 0 ? (
        <div className="text-center py-5 text-white">Nenhum filme encontrado.</div>
      ) : (
        <>
          <AlbumGrid movies={movies} allMoviesData={movies} />
          <div className="d-flex justify-content-center my-4 gap-2">
            <button
              className="btn btn-outline-success"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg>
            </button>
            <span className="align-self-center">Página {page} de {totalPages}</span>
            <button
              className="btn btn-outline-success"
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
      <Footer/>
    </main>
  );
}