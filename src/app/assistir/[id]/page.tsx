'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'next/navigation';
import { FaPlayCircle } from 'react-icons/fa';
import React from 'react';
import Link from "next/link";
export default function VideoPlayer() {
  const params = useParams();
  const id = params?.id;
  const videoUrl = 'https://vidlink.pro/movie/' + id+'?primaryColor=63b8bc&secondaryColor=0f57c2&iconColor=eefdec&icons=default&player=default&title=true&poster=true&autoplay=false&nextbutton=false';

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <nav className="navbar navbar-expand-lg   shadow-sm ">
        <div className="container-fluid">
          <div className="collapse navbar-collapse justify-content-center" id="navbarNavApp">
            <ul className="navbar-nav  "> 
              <li className="nav-item ms-lg-3 m-2">
              <Link href="/filmes" className=" btn btn-outline-danger rounded-pill me-2">Voltar</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        <div className="col-lg-8 col-md-10">
          <div className="text-center mb-4">
            <FaPlayCircle size={70} color="#28a745" style={{ filter: 'drop-shadow(0 2px 8px #28a74588)' }} />
            <h2 className="fw-bold mt-3">Assistir Filme</h2>
          </div>
          <div className="ratio ratio-16x9 rounded shadow-lg overflow-hidden border border-success">
            <iframe
              src={videoUrl}
              title="Player de Filme"
              allowFullScreen
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

