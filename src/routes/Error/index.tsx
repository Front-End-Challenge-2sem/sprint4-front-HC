import { Link } from "react-router-dom";

export default function Error() {
  return (
    <section className="hero-section flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="container">
        {/* Código do erro */}
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold drop-shadow-lg">
          404
        </h1>

        {/* Mensagem principal */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-6">
          Oops! Página não encontrada.
        </h2>

        {/* Submensagem */}
        <p className="hero-subtitle text-white/90 mt-4">
          Parece que você tentou acessar uma página que não existe. <br />
          Verifique o endereço ou volte para a página inicial.
        </p>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
          <Link to="/" className="botao">
            Voltar para a Home
          </Link>

          <Link to="/contato" className="botao botao-secundario">
            Falar com o Suporte
          </Link>
        </div>
      </div>
    </section>
  );
}
