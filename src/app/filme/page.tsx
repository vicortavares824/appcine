'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/componets/navbar";
// Verifique o caminho correto para MovieDetailsModal
import MovieDetailsModal from "../../componets/inicio/MovieDetailsModal";

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

// ==============================================================================
// Componente principal: Filmes
// ==============================================================================
export default function Filmes() {
  const [allMoviesData, setAllMoviesData] = useState<Movie[]>([]); // Armazena todos os filmes carregados do JSON
  const [movies, setMovies] = useState<Movie[]>([]); // Filmes para a página atual (paginados)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [error, setError] = useState<string | null>(null); // Estado para controle de erros

  const pageSize = 2000; // Quantidade de filmes por página

  // --- useEffect 1: Carrega TODOS os filmes do JSON local UMA ÚNICA VEZ ---
  useEffect(() => {
    async function fetchAllMovies() {
      try {
        setLoading(true); // Inicia o estado de carregamento
        setError(null);   // Limpa qualquer erro anterior

        const res = await fetch('https://api-movie-sigma.vercel.app/api/filmes?keyid=60b55db2a598d09f914411a36840d1cb'); // Faz a requisição ao arquivo JSON local

        if (!res.ok) {
          throw new Error(`Erro ao carregar filmes: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        // Mapeia e filtra os dados para garantir que são do tipo Movie e possuem título
        const moviesArr: Movie[] = Array.isArray(data)
          ? data
              .filter((item: Record<string, unknown>) => typeof item.title === 'string' && !!item.title)
              .map((item: Record<string, unknown>) => ({
                id: item.id as number,
                title: (item.title as string) || 'Filme sem título',
                overview: (item.overview as string) || '',
                poster_path: item.poster_path ? String(item.poster_path) : null,
                backdrop_path: item.backdrop_path ? String(item.backdrop_path) : null,
                release_date: (item.release_date as string) || '',
                vote_average: typeof item.vote_average === 'number' ? item.vote_average : 0,
                genres: Array.isArray(item.genres) ? item.genres : [],
              }))
          : [];

        // Ordena todos os filmes carregados por ano de lançamento (mais recente primeiro)
        const sorted = [...moviesArr].sort((a, b) => {
          const yearA = a.release_date ? parseInt(a.release_date.slice(0, 4)) : 0;
          const yearB = b.release_date ? parseInt(b.release_date.slice(0, 4)) : 0;
          return yearB - yearA;
        });

        setAllMoviesData(sorted); // Armazena todos os filmes ordenados
        setTotalPages(Math.ceil(sorted.length / pageSize)); // Calcula o total de páginas
        setPage(1); // Garante que a página inicial seja 1 ao carregar novos dados
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Erro desconhecido');
        console.error("Erro ao buscar filmes do JSON:", error);
        setError(error.message || 'Ocorreu um erro ao carregar os filmes.');
        setAllMoviesData([]); // Limpa os dados em caso de erro
        setMovies([]); // Limpa os filmes da página atual
        setTotalPages(1); // Reseta o total de páginas
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    }

    fetchAllMovies();
  }, []); // Array de dependências vazio: este useEffect roda apenas uma vez na montagem

  // --- useEffect 2: Aplica a paginação aos filmes já carregados ---
  useEffect(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setMovies(allMoviesData.slice(start, end)); // Fatia os filmes do array completo para a página atual
  }, [page, allMoviesData, pageSize]); // Roda quando 'page', 'allMoviesData' ou 'pageSize' mudam

  return (
    <main className="bg-dark text-white min-vh-100">
      <Navbar />

      {loading ? (
        <div className="text-center py-5">Carregando filmes...</div>
      ) : error ? (
        <div className="text-center py-5 text-success">Erro: {error}</div>
      ) : allMoviesData.length === 0 ? (
        <div className="text-center py-5 text-white">Nenhum filme encontrado.</div>
      ) : (
        <>
          {/* Passa `movies` (paginados) e `allMoviesData` (completo) para AlbumGrid */}
          <AlbumGrid movies={movies} allMoviesData={allMoviesData} />

          {/* Botões de Paginação */}
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
            <span className="align-self-center">Página {page} de {totalPages}</span>
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

// ==============================================================================
// Componente AlbumGrid: Exibe o filme em destaque e a grade de filmes
// ==============================================================================
function AlbumGrid({ movies, allMoviesData }: { movies: Movie[]; allMoviesData: Movie[] }) {
  // Pega o primeiro filme da lista COMPLETA de filmes para ser o destaque
  const featuredMovie = allMoviesData.length > 0 ? allMoviesData[0] : null;

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
                    <h1 className="display-4 fw-bold mb-3">{featuredMovie.title}</h1>
                    <p className="lead mb-4 text-truncate-3">
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

        <h2 className="fw-bold mb-4">Filmes em Destaque</h2> {/* Título para a grade de filmes */}
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
                          {/* Ícone estático, você pode substituí-lo por ícones correspondentes a cada gênero */}
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

// ==============================================================================
// Componente AlbumCard: Exibe um único card de filme na grade
// ==============================================================================
function AlbumCard({ movie }: { movie: Movie }) {
  const modalId = `quickViewModal-album-${movie.id}`; // ID único para o modal de cada card

  return (
    <div className="col  "> {/* Usa 'col' para se alinhar ao grid do Bootstrap */}
      <div className="card h-100 bg-dark text-white border-0 shadow w-100">
        <div className="position-relative">
          {/* Renderiza a imagem do pôster ou um placeholder se não houver */}
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              className="card-img-top"
              alt={movie.title}
              width={300} // Largura obrigatória para otimização do Next.js Image
              height={450} // Altura ajustada para proporção de pôster
              objectFit="cover" // Garante que a imagem cubra o espaço sem distorcer
              unoptimized={false} // Mantém a otimização da imagem do Next.js
              priority={false} // Ajuste de prioridade se necessário
            />
          ) : (
            <div style={{ width: 300, height: 450, backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              Sem Imagem
            </div>
          )}
          <div className="position-absolute top-0 end-0 p-2">
            <span className="badge bg-success">{movie.vote_average.toFixed(1)}</span> {/* Exibe a nota formatada */}
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
            {/* O MovieDetailsModal para o card individual */}
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