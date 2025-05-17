'use client'
import axios from "axios";
import  { useEffect, useState } from "react";

export default function View() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovies();
  }, []);
  const getMovies =  () => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: '60b55db2a598d09f914411a36840d1cb',
        language: 'pt-BR',
      }
    })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes:", error);
    })
  }
    return (
      <main>
      <AlbumGrid  />
      </main>
  );
}
function AlbumGrid() {
  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 d-flex justify-content-center">
              <AlbumCard/>
              <AlbumCard/>
              <AlbumCard/>
              <AlbumCard/>
              <AlbumCard/>
        </div>
      </div>
    </div>
  );
}

// Componente AlbumCard - Replicando a estrutura do card do Bootstrap
function AlbumCard() {
  return (
     <div className="card shadow-sm m-2">
      <img src="#" className="bd-placeholder-img card-img-top"/>
      <div className="card-body">
        <p className="card-text">
          <h5 className="card-title">Título do Filme ou Série</h5>
          <p className="card-text">Descrição breve do filme ou série. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p className="card-text"><small className="text-muted">Ano de Lançamento: 2023</small></p>
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-outline-dark">Assistir</button>
          </div>
        </div>
      </div>
    </div>
  );
}



