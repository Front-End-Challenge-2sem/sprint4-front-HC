import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TipoIntegrantes } from "../../types/tipoIntegrantes";
import { listaIntegrantes } from "../../data/listaIntegrantes";

export default function Integrantes() {
  const navigate = useNavigate();
  const [members] = useState<TipoIntegrantes[]>(listaIntegrantes);

  const handleBackClick = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <main className="equipe">
      <div className="container">

        <div className="voltar">
          <button onClick={handleBackClick} className="botao-voltar integrantes-voltar">

            <svg
              className="icone-voltar"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar
          </button>
        </div>

        
        <h1>Nossa Equipe</h1>
        <p className="subtitulo">
          Conheça os profissionais por trás deste projeto inovador de saúde
          digital acessível
        </p>

       
        <div className="membros">
          {members.map((member) => (
            <div key={member.id} className="membro">
              <img
                src={member.photo}
                alt={`Foto de ${member.name}`}
                className="foto-membro"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%2320A0D8' fill-opacity='0.3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%2320A0D8'%3EImagem%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%2320A0D8'%3ENão%20Disponível%3C/text%3E%3C/svg%3E";
                }}
              />
              <h2>{member.name}</h2>
              <p className="detalhes">RM: {member.rm}</p>
              <p className="detalhes">Turma: {member.turma}</p>

              
              <div className="redes-sociais">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <i className="icone-github" />
                  <img src="assets/img/github-logo.png" alt="" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="icone-linkedin" />
                  <img src="assets/img/linkedin-logo.png" alt="" />
                </a>
              </div>
            </div>
          ))}
        </div>

        
        <div className="sobre-projeto">
          <h2>Sobre o Projeto</h2>
          <div className="sobre-grid">
            <div>
              <h3>Objetivo</h3>
              <p>
                Desenvolvemos esta plataforma para facilitar o acesso à saúde
                digital para pessoas que têm dificuldade com tecnologia,
                oferecendo uma interface intuitiva e recursos de acessibilidade.
              </p>
            </div>

            <div>
              <h3>Tecnologias Utilizadas</h3>
              <ul>
                <li>React com TypeScript</li>
                <li>Vite para build e desenvolvimento</li>
                <li>Tailwind CSS para estilização</li>
                <li>React Hook Form para validação</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
