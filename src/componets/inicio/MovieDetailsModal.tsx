import Image from "next/image";
import Link from "next/link";

type Genre = { id: number; name: string };
export type MovieOrSerie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genres: Genre[];
  // campos opcionais para série
  name?: string;
  first_air_date?: string;
};

interface Props {
  item: MovieOrSerie;
  modalId?: string;
}

export default function MovieDetailsModal({ item, modalId = "quickViewModal" }: Props) {
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex={-1}
      aria-labelledby="quickViewModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="quickViewModalLabel">
              {item.title || item.name}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4 mb-3 mb-md-0">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  className="card-img-top"
                  alt={item.title || item.name || "Poster"}
                  width={400}
                  height={350}
                />
              </div>
              <div className="col-md-8">
                <div className="d-flex align-items-center mb-2">
                  <span className="text-muted me-3">{item.release_date || item.first_air_date}</span>
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
                    <span className="fw-bold me-1">{item.vote_average}</span>
                    <span className="text-muted">/10</span>
                  </div>
                </div>
                <div className="mb-3">
                  {item.genres && item.genres.map((genre) => (
                    <span key={genre.id} className="badge bg-secondary me-1">{genre.name}</span>
                  ))}
                </div>
                <p>{item.overview || 'Sem descrição.'}</p>
                {/* Campos fictícios removidos, pois são mock. Adicione aqui se necessário. */}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex w-100 justify-content-between">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                Fechar
              </button>
              <div>
                <Link href={`/assistir/filme/${item.id}`} className="btn btn-outline-success me-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-play-fill me-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                  </svg>
                  Assistir
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#trailerModal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-play-fill me-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                  </svg>
                  Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
