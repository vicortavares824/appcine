'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'next/navigation';
import { FaPlayCircle } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import Link from "next/link";

export default function VideoPlayer() {
  const params = useParams();
  const tipo = params?.tipo;
  const allParams = params?.params || [];

  let imdb = '';
  let temporada = '';
  let episodio = '';
  if (tipo === 'serie') {
    [imdb, temporada, episodio] = allParams;
  } else {
    [imdb] = allParams;
  }

  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    if (!imdb) return;
    const imageUrl = encodeURIComponent('https://singlecolorimage.com/get/28a745/600x338');
    let src = '';
    if (tipo === 'filme') {
      src = `https://superflixapi.nexus/${tipo}/${imdb}?image=${imageUrl}`;
    } else {
      src = `https://superflixapi.nexus/${tipo}/${imdb}/${temporada}/${episodio}?image=${imageUrl}`;
    }
    setIframeSrc(src);
  }, [tipo, imdb, temporada, episodio]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <nav className="navbar navbar-expand-lg shadow-sm w-100">
          <div className="container-fluid">
            <div className="d-flex justify-content-center w-100">
              <Link href={`/${tipo}`} className="btn btn-outline-danger rounded-pill me-2">Voltar</Link>
            </div>
          </div>
        </nav>
        <div className="col-lg-8 col-md-10">
          <div className="text-center mb-4">
            <FaPlayCircle size={70} color="#28a745" style={{ filter: 'drop-shadow(0 2px 8px #28a74588)' }} />
            <h2 className="fw-bold mt-3">Assistir {tipo === 'serie' ? 'Série' : 'Filme'}</h2>
          </div>
          <div className="ratio ratio-16x9 rounded shadow-lg overflow-hidden border border-success w-100" style={{ alignItems: 'flex-start', display: 'flex' }}>
            {iframeSrc && (
              <iframe
                src={iframeSrc}
                allowFullScreen
                style={{
                  top: -10,
                  left: 0,
                  width: '100%', 
                }}
                title="Player SuperFlixAPI"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
