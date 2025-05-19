'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Serie = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
};

type Season = {
  season_number: number;
  name: string;
  episode_count: number;
};

type Episode = {
  episode_number: number;
  name: string;
};

export default function Filmes() {
  const [series, setSeries] = useState<Serie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getseries(page);
  }, [page]);

  const getseries = (page: number) => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/tv",
      params: {
        api_key: '60b55db2a598d09f914411a36840d1cb',
        language: 'pt-BR',
        page: page
      }
    })
      .then((response) => {
        setSeries(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes:", error);
      });
  };
  return (
    <main>
      <nav className="navbar navbar-expand-lg  bg-white shadow-sm ">
        <div className="container-fluid">
          <div className="collapse navbar-collapse justify-content-center" id="navbarNavApp">
            <ul className="navbar-nav  "> 
              <li className="nav-item ms-lg-3 m-2">
              <Link href="/filme" className=" btn btn-outline-dark rounded-pill me-2">Filmes</Link>
              <Link href="/serie" className=" btn btn-outline-dark rounded-pill me-2">Series</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <AlbumGrid series={series} />
        <div className="d-flex justify-content-center my-4 gap-2">
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg>
        </button>
        <span className="align-self-center">Página {page} de {totalPages}</span>
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg>
        </button>
      </div>
    </main>
  );
}

function AlbumGrid({ series }: { series: Serie[] }) {
  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 d-flex justify-content-center">
           {series.map((movie) => (
            <AlbumCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AlbumCard({ movie }: { movie: Serie }) {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/tv/${movie.id}`, {
      params: {
        api_key: '60b55db2a598d09f914411a36840d1cb',
        language: 'pt-BR',
      }
    }).then(res => {
      setSeasons(res.data.seasons);
    });
  }, [movie.id]);

  useEffect(() => {
    if (selectedSeason !== null) {
      axios.get(`https://api.themoviedb.org/3/tv/${movie.id}/season/${selectedSeason}`, {
        params: {
          api_key: '60b55db2a598d09f914411a36840d1cb',
          language: 'pt-BR',
        }
      }).then(res => {
        setEpisodes(res.data.episodes);
      });
    }
  }, [selectedSeason, movie.id]);
     const id = `${movie.id}/${selectedSeason}/${selectedEpisode}`
  return (
    <div className="card m-2 shadow-sm h-100 d-flex flex-column" style={{ width: '16rem', minHeight: '40rem' }}>
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path ? movie.poster_path : movie.backdrop_path}`}
        className="card-img-top p-3"
        alt={movie.name}
        width={300}
        height={350}
        style={{ height: '350px', objectFit: 'cover' }}
        priority
      />
      <div className="card-body d-flex flex-column" style={{ height: '250px' }}>
        <p className="card-title text-center">Titulo: {movie.name}</p>
        <p className="card-text">Nota: {movie.vote_average}</p>
        <p className="card-text text-truncate"><small className="text-muted">Descrição:</small> {movie.overview ? movie.overview : 'Sem descrição.'}</p>
        <p className="card-text"><small className="text-muted">Ano de Lançamento: {movie.first_air_date ? movie.first_air_date.slice(0, 4) : 'N/A'}</small></p>
        {seasons.length > 0 || episodes.length > 0 ? (
          <div className="d-flex gap-2 my-2">
            {seasons.length > 0 && (
              <select className="form-select" style={{ minWidth: 20 }} value={selectedSeason ?? ''} onChange={e => { setSelectedSeason(Number(e.target.value)); setSelectedEpisode(null); }}>
                <option value="">Temp:</option>
                {seasons.map(season => (
                  <option key={season.season_number} value={season.season_number}>{season.season_number}</option>
                ))}
              </select>
            )}
            {episodes.length > 0 && (
              <select className="form-select" style={{ minWidth: 20 }} value={selectedEpisode ?? ''} onChange={e => setSelectedEpisode(Number(e.target.value))}>
                <option value="">Epi:</option>
                {episodes.map(ep => (
                  <option key={ep.episode_number} value={ep.episode_number}>{ep.episode_number}</option>
                ))}
              </select>
            )}
          </div>
        ) : null}
 

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link
              href={selectedSeason && selectedEpisode ? `/assistir/serie/${id}` : '#'}
              className="btn btn-sm btn-outline-dark"
              aria-disabled={!selectedSeason || !selectedEpisode}
              tabIndex={!selectedSeason || !selectedEpisode ? -1 : 0}
            >
              Assistir
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}



