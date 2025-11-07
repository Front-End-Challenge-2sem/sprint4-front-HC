import { useEffect, useState } from "react";
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
    { path: '/tabela', label: 'Tabelas' },
    { path: "/login", label: "Login" },
    { path: "/cadastro", label: "Cadastro" },
  ];
  return (
        <header className="bg-white shadow-md border-b border-gray-200 relative">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/" 
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <img 
            src="/assets/img/logo_parceria_hc_jag_ajustada.png" 
            alt="Logo Saúde Digital Acessível" 
            className="h-12 w-auto"
          />
        </a>

        {/* Saudação do usuário logado - Desktop */}
        {userData && (
          <div className="hidden md:flex items-center space-x-4 mr-4">
            <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-full border border-blue-200 text-sm font-medium">
              Olá, <strong className="text-blue-900">{userData.nome.split(' ')[0]}</strong>!
            </div>
          </div>
        )}

        {/* Menu Toggle Mobile */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Menu Principal - Desktop */}
        <nav className="hidden md:flex items-center space-x-1">
          <ul className="flex items-center space-x-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <a 
                  href={item.path} 
                  onClick={(e) => {
                    e.preventDefault();
                    if (userData && item.label === 'Login') {
                      handleLogout();
                    } else {
                      navigate(item.path);
                    }
                  }}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${userData && item.label === 'Login' 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : item.label === 'Login' 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : item.label === 'Cadastro'
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  {userData && item.label === 'Login' ? 'Sair' : item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

            {/* Menu Mobile - Agora como parte do fluxo normal, não absoluto */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          {/* Saudação do usuário logado - Mobile */}
          {userData && (
            <div className="px-4 py-3 border-b border-gray-100 bg-blue-50">
              <div className="text-blue-800 text-sm font-medium">
                Olá, <strong className="text-blue-900">{userData.nome.split(' ')[0]}</strong>!
              </div>
            </div>
          )}
          
          <nav className="py-2">
            <ul className="space-y-0">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <a 
                    href={item.path} 
                    onClick={(e) => {
                      e.preventDefault();
                      if (userData && item.label === 'Login') {
                        handleLogout();
                      } else {
                        navigate(item.path);
                        setIsMenuOpen(false);
                      }
                    }}
                    className={`
                      block px-4 py-3 text-base font-medium transition-colors border-b border-gray-100
                      ${userData && item.label === 'Login' 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : item.label === 'Login' 
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : item.label === 'Cadastro'
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    {userData && item.label === 'Login' ? 'Sair' : item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
