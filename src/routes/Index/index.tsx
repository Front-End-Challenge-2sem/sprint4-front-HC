import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {

  const navigate = useNavigate();
  const [absenteism, setAbsenteism] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setAbsenteism(prev => {
        if (prev <= 10) {
          clearInterval(interval);
          return 10;
        }
        return prev - 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
     <main>
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">Saúde na Tecnologia para Todos</h1>
          <p className="hero-subtitle">
            Ajudamos pessoas que têm dificuldade com celulares a marcar consultas e usar a saúde na internet
          </p>
          <button 
            onClick={() => navigate('/guia')}
            className="hero-button"
          >
            Veja nosso Passo a Passo
          </button>
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefits-container">
          <h2 className="benefits-title">Como podemos ajudar</h2>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <img 
                src="/assets/img/interface-imagem.jpg" 
                alt="Ícone acessibilidade" 
                className="benefit-icon"
              />
              <h3 className="benefit-title">Tela Fácil</h3>
              <p>Botões grandes e letras fáceis de ler</p>
            </div>
            
            <div className="benefit-card">
              <img 
                src="/assets/img/video-imagem.jpg" 
                alt="Ícone vídeo" 
                className="benefit-icon"
              />
              <h3 className="benefit-title">Vídeos explicativos</h3>
              <p>Aprenda vendo, como se alguém estivesse te ensinando</p>
            </div>
            
            <div className="benefit-card">
              <img 
                src="/assets/img/bot-imagem.jpg" 
                alt="Ícone suporte" 
                className="benefit-icon"
              />
              <h3 className="benefit-title">Ajuda por Telefone</h3>
              <p>Fale com uma pessoa/robô que te explica com paciência</p>
            </div>
          </div>
        </div>
      </section>

      <section className="statistics-section">
        <div className="statistics-container">
          <h2 className="statistics-title">Nosso Impacto</h2>
          
          <div className="statistics-grid">
            <div className="statistic-item">
              <span className="statistic-value">{absenteism}%</span>
              <span className="statistic-label">Menos faltas em consultas</span>
            </div>
            
            <div className="statistic-item">
              <span className="statistic-value">85%</span>
              <span className="statistic-label">Pessoas satisfeitas</span>
            </div>
            
            <div className="statistic-item">
              <span className="statistic-value">1.2k</span>
              <span className="statistic-label">Pessoas ajudadas</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}