import Inicio from '@/componets/inicio';
import Series from '@/componets/inicioSeries';
import Footer from '@/componets/footer';
import 'bootstrap/dist/css/bootstrap.min.css';


import Head from "next/head"
import Navbar from '@/componets/navbar';

export default function Home() {
  // Garantir que o JavaScript do Bootstrap seja carregado


  return (
    <>
      <Head>
        <title>CineStream - Filmes e Séries</title>
        <meta name="description" content="Sua plataforma de streaming para filmes e séries" />
      </Head>

    
    <Navbar/>

     <Inicio />
    <Series/>
     <Footer/>
     
    </>
  

   
  );
}
