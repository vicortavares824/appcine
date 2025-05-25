'use client'
import Inicio from '@/componets/inicio';
import Series from '@/componets/inicioSeries';
import Footer from '@/componets/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head"
import Navbar from '@/componets/navbar';
import filmesJson from '../../filmes.json'; // ajuste o caminho se necessário
import seriesJson from '../../series.json'; // ajuste o caminho se necessário
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Definição do tipo para filme/série
type MediaItem = {
  id?: number;
  title?: string;
  titulo?: string;
  overview?: string;
  poster_path?: string | null; // Aceita null
  vote_average?: number;
};

export default function Home() {
  const [buscaInput, setBuscaInput] = useState("");
  const [busca, setBusca] = useState("");

  // Junta todos os filmes e séries, mapeando para garantir o tipo correto
  const filmes: MediaItem[] = Array.isArray(filmesJson)
    ? (filmesJson as MediaItem[])
    : (Object.values(filmesJson).flat() as MediaItem[]);
  const series: MediaItem[] = Array.isArray(seriesJson)
    ? (seriesJson as MediaItem[])
    : (Object.values(seriesJson).flat() as MediaItem[]);

  // Busca por título
  const buscaAtiva = busca.trim().length > 0;
  const filmesPorTitulo = filmes.filter((item: MediaItem) =>
    (item.title || item.titulo || "").toLowerCase().includes(busca.toLowerCase())
  );
  const seriesPorTitulo = series.filter((item: MediaItem) =>
    (item.title || item.titulo || "").toLowerCase().includes(busca.toLowerCase())
  );

  // Se não encontrou pelo título, busca pelo overview
  const filmesFiltrados = filmesPorTitulo.length > 0
    ? filmesPorTitulo
    : filmes.filter((item: MediaItem) =>
        (item.overview || "").toLowerCase().includes(busca.toLowerCase())
      );

  const seriesFiltradas = seriesPorTitulo.length > 0
    ? seriesPorTitulo
    : series.filter((item: MediaItem) =>
        (item.overview || "").toLowerCase().includes(busca.toLowerCase())
      );

  // Função para acionar a busca ao pressionar Enter
  function handleBuscaInput(ev: React.ChangeEvent<HTMLInputElement>) {
    setBuscaInput(ev.target.value);
  }
  function handleBuscaKeyDown(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (ev.key === "Enter") {
      setBusca(buscaInput);
    }
  }
  function handleBuscaClick() {
    setBusca(buscaInput);
  }

  return (
    <>
      <Head>
        <title>CineStream - Filmes e Séries</title>
        <meta name="description" content="Sua plataforma de streaming para filmes e séries" />
      </Head>
      <Navbar
        onBuscaInput={handleBuscaInput}
        onBuscaKeyDown={handleBuscaKeyDown}
        buscaInput={buscaInput}
        onBuscaClick={handleBuscaClick}
      />
      {buscaAtiva ? (
        <div className="container py-5">
          <h2 className="mb-4">Resultados da busca</h2>
          {filmesFiltrados.length === 0 && seriesFiltradas.length === 0 ? (
            <p>Nenhum resultado encontrado.</p>
          ) : (
            <>
              {filmesFiltrados.length > 0 && (
                <>
                  <h4>Filmes</h4>
                  <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
                    {filmesFiltrados.map((movie: MediaItem, idx: number) => (
                      <div
                        className="col-sm-1 col-md-4 col-lg-3"
                        key={`filme-${movie.id ?? "noid"}-${idx}`}
                      >
                        <div className="card bg-dark text-white border-0 shadow">
                          <div className="position-relative">
                            <Image
                              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                              className="card-img-top"
                              alt={movie.title || movie.titulo || ""}
                              width={300}
                              height={260}
                            />
                            <div className="position-absolute top-0 end-0 p-2">
                              <span className="badge bg-success">{movie.vote_average}</span>
                            </div>
                            <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-to-t from-dark to-transparent">
                              <h5 className="card-title mb-0 text-light">{movie.title || movie.titulo}</h5>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="d-flex gap-1 mb-2">
                              <span className="badge bg-secondary">Filme</span>
                            </div>
                            <div className="d-grid">
                              <Link href={`/assistir/filme/${movie.id}`} className="btn btn-sm btn-outline-light">Assistir</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {seriesFiltradas.length > 0 && (
                <>
                  <h4>Séries</h4>
                  <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
                    {seriesFiltradas.map((serie: MediaItem, idx: number) => (
                      <div
                        className="col-sm-1 col-md-4 col-lg-3"
                        key={`serie-${serie.id ?? "noid"}-${idx}`}
                      >
                        <div className="card bg-dark text-white border-0 shadow">
                          <div className="position-relative">
                            <Image
                              src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`}
                              className="card-img-top"
                              alt={serie.title || serie.titulo || ""}
                              width={300}
                              height={260}
                            />
                            <div className="position-absolute top-0 end-0 p-2">
                              <span className="badge bg-success">{serie.vote_average}</span>
                            </div>
                            <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-to-t from-dark to-transparent">
                              <h5 className="card-title mb-0 text-light">{serie.title || serie.titulo}</h5>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="d-flex gap-1 mb-2">
                              <span className="badge bg-secondary">Série</span>
                            </div>
                            <div className="d-grid">
                              <Link href={`/assistir/serie/${serie.id}`} className="btn btn-sm btn-outline-light">Assistir</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <div className="container py-5">
            <h1 className="text-center mb-2">Bem-vindo ao CineStream</h1>
            <p className="text-center ">Sua plataforma de streaming para filmes e séries</p>
          </div>
          <Inicio />
          <Series/>
          <Footer/>
        </>
      )}
    </>
  );
}
