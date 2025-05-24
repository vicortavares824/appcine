'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MovieDetailsModal from "../inicio/MovieDetailsModal";
import seriesJson from '../../../series.json';

type Serie = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
};

// Função para transformar { "page 1": [...], "page 2": [...] } em array de páginas
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

function getMostRecentPage(pages: Serie[][]): Serie[] {
  let mostRecentPage: Serie[] = [];
  let mostRecentDate = 0;
  pages.forEach((page) => {
    // Busca a maior data de cada página
    const maxDate = page.reduce((max, item) => {
      const d = new Date(item.first_air_date).getTime();
      return d > max ? d : max;
    }, 0);
    if (maxDate > mostRecentDate) {
      mostRecentDate = maxDate;
      mostRecentPage = page;
    }
  });
  return mostRecentPage;
}

export default function Series() {
  const [seriesList, setSeriesList] = useState<Serie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      const mostRecent = getMostRecentPage(pages);
      setSeriesList(mostRecent);
    } catch {
      setError('Erro ao carregar as séries do arquivo local.');
      setSeriesList([]);
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      

      <div className="bg-light py-5">
        <div className="container">
          <h2 className="fw-bold mb-4 text-dark">Categorias</h2>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">
            {["Ação", "Comédia", "Drama", "Terror", "Ficção", "Animação"].map((category, index) => (
              <div key={index} className="col">
                <div className="card h-100 text-center shadow-sm hover-overlay">
                  <div className="card-body">
                    <div className="rounded-circle bg-success bg-opacity-10 p-3 d-inline-flex mb-3">
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
                    <h5 className="card-title">{category}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Séries Populares</h2>
          <Link href={"/serie"} className="btn btn-link text-success text-decoration-none">
            Ver Todas
          </Link>
        </div>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 justify-content-between g-4">
          {seriesList.slice(0, 8).map((movie) => (
            <SeriesCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}

function SeriesCard({ movie }: { movie: Serie }) {
  return (
    <div className="col-sm-1 col-md-4 col-lg-3">
      <div className="card h-100 bg-dark text-white border-0 shadow w-100 ">
        <div className="position-relative">
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path ? movie.poster_path : movie.backdrop_path}`}
            className="card-img-top p-3"
            alt={movie.name ? movie.name : "Poster da série"}
            width={200}
            height={260}
            priority
          />
          <div className="position-absolute top-0 end-0 m-3">
            <span className="badge bg-success">SÉRIE</span>
          </div>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="card-title mb-0 text-truncate">{movie.name}</h5>
            <div className="d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-star-fill text-warning me-1"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
              <span>{movie.vote_average}</span>
            </div>
          </div>
          <div className="d-flex gap-1 mb-2"></div>
          <div className="d-flex justify-content-between align-items-center">
            <Link href={`/assistir/serie/${movie.id}/1/1`} className="btn btn-sm btn-outline-light">Assistir</Link>
            <button data-bs-toggle="modal"
        data-bs-target={`#quickViewModal-serie-${movie.id}`}
        className="btn btn-sm btn-link text-success p-0">Ver Detalhes</button>
          </div>
        </div>
      </div>
        <MovieDetailsModal
          item={{
            ...movie,
            title: movie.name,
            release_date: movie.first_air_date,
            genres: [], // Adapte conforme necessário se você tiver gêneros
          }}
          modalId={`quickViewModal-serie-${movie.id}`}
        />
    </div>
    
  );
}
