import Link from "next/link";

export default function Login() {

    return (
        <div className="container mt-5 w-50">
            <h2 className="text-center">Login</h2>
            <form className="row g-3 m-5">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Digite seu email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="password" placeholder="Digite sua senha" />
                </div>
                <Link  href="/filme" className="btn btn-primary">Entrar</Link>
            </form>
        </div>
    );

}