import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
}

export default function Cabecalho() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (savedUserData && isLoggedIn === "true") {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

    const handleLogout = () => {
    // Limpar dados de login
    localStorage.removeItem('isLoggedIn');
    setUserData(null);
    setIsMenuOpen(false);
    // Recarregar a página para atualizar o estado
    window.location.reload();
  };

  const menuItems = [
    { path: "/", label: "Início" },
    { path: "/guia", label: "Passo a passo" },
    { path: "/faq", label: "Dúvidas" },
    { path: "/contato", label: "Ajuda" },
    { path: "/integrantes", label: "Integrantes" },
    { path: "/login", label: "Login" },
    { path: "/cadastro", label: "Cadastro" },
  ];
  return (
    <header className="cabecalho">
      <div className="container">
        <a href="/" className="logo">
          <img
            src="/assets/img/logo_parceria_hc_jag_ajustada.png"
            alt="Logo Saúde Digital Acessível"
          />
        </a>

        <button
          className="menu-toggle md:hidden"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          ☰
        </button>

        <nav className={`menu-principal ${isMenuOpen ? "ativo" : ""}`}>
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={item.label === "Login" ? "login-btn" : ""}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
