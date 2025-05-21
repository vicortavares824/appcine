'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'next/navigation';
import { FaPlayCircle } from 'react-icons/fa';
import React, { useRef, useEffect } from 'react';
import Link from "next/link";

export default function VideoPlayer() {
  const params = useParams();
  const tipo = params?.tipo;
  const allParams = params?.params || [];
  const playerRef = useRef<HTMLDivElement>(null);

  let imdb = '';
  let temporada = '';
  let episodio = '';
  if (tipo === 'serie') {
    [imdb, temporada, episodio] = allParams;
  } else {
    [imdb] = allParams;
  }

  useEffect(() => {
    if (!playerRef.current || !imdb) return;
    // Personalização: imagem de fundo verde claro
    const imageUrl =' #28a74588' // imagem sólida verde
    let src = '';
    if (tipo === 'filme') {
      src = `https://superflixapi.fyi/${tipo}/${imdb}?image=${imageUrl}`;
    } else {
      src = `https://superflixapi.fyi/${tipo}/${imdb}/${temporada}/${episodio}?#color:${imageUrl}`;
    }
    playerRef.current.innerHTML = `<iframe src="${src}" allowfullscreen style="width:100%;height:100%;min-height:400px;border:0;"></iframe>`;
  }, [tipo, imdb, temporada, episodio]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <nav className="navbar navbar-expand-lg shadow-sm ">
          <div className="container-fluid">
            <div className="collapse navbar-collapse justify-content-center" id="navbarNavApp">
              <ul className="navbar-nav">
                <li className="nav-item ms-lg-3 m-2">
                  <Link href={`/${tipo}`} className="btn btn-outline-danger rounded-pill me-2">Voltar</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="col-lg-8 col-md-10">
          <div className="text-center mb-4">
            <FaPlayCircle size={70} color="#28a745" style={{ filter: 'drop-shadow(0 2px 8px #28a74588)' }} />
            <h2 className="fw-bold mt-3">Assistir {tipo === 'serie' ? 'Série' : 'Filme'}</h2>
          </div>
          <div className="ratio ratio-16x9 rounded shadow-lg overflow-hidden border border-success">
            <div ref={playerRef} id="SuperFlixAPIContainerVideo" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
