import { useNavigate } from "react-router-dom";


export default function Rodape() {
    const navigate = useNavigate();
    
    const handleNavigation = (path: string) => {
      navigate(path);
    };
    
    return(
        <footer className="rodape">
        <div className="rodape-container">
          <div className="rodape-secao">
            <h3>Saúde Digital Acessível</h3>
            <p>Facilitando o acesso à saúde digital para todos</p>
          </div>
          
          <div className="rodape-secao">
            <h3>Links Úteis</h3>
            <ul className="rodape-links">
              <li>
                <a 
                  href="/" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/');
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/guia" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/guia');
                  }}
                >
                  Guia de Uso
                </a>
              </li>
              <li>
                <a 
                  href="/faq" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/faq');
                  }}
                >
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>
          
          <div className="rodape-secao">
            <h3>Contato</h3>
            <address>
              <p>Email: imrea@hc.fm.usp.br</p>
              <p>Telefone: (11) 2661-8500</p>
            </address>
          </div>
        </div>
        
        <div className="rodape-bottom">
          <p>&copy; 2025 Saúde Digital Acessível. Todos os direitos reservados.</p>
        </div>
      </footer>
    );
}