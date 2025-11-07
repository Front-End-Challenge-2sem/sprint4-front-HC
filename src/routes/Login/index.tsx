import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { TipoLogin } from "../../types/tipoLogin";

// Componente Modal de Mensagem
interface MessageModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ 
  isOpen, 
  title, 
  message, 
  type, 
  onClose 
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return 'ℹ️';
    }
  };

    const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-blue-800';
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 hover:bg-green-600';
      case 'error':
        return 'bg-red-500 hover:bg-red-600';
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'info':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-lg shadow-xl w-full max-w-md border-2 ${getBackgroundColor()}`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{getIcon()}</span>
            <h2 className={`text-xl font-bold ${getTextColor()}`}>{title}</h2>
          </div>
          <p className={`${getTextColor()} mb-6`}>{message}</p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={`${getButtonColor()} text-white py-2 px-6 rounded-lg font-semibold transition-colors`}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm<TipoLogin>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [cadastroData, setCadastroData] = useState<{cpf?: string, telefone?: string}>({});
  
  // Estados para os modals
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({ 
    title: '', 
    message: '', 
    type: 'info' as 'success' | 'error' | 'warning' | 'info' 
  });

  // Verificar se veio do cadastro com sucesso
  useEffect(() => {
    if (location.state?.cadastroSucesso) {
      setShowSuccessMessage(true);
      setCadastroData({
        cpf: location.state.cpf,
        telefone: location.state.telefone
      });
      
      // Preencher automaticamente os campos
      if (location.state.cpf) {
        setValue('cpf', location.state.cpf);
      }
      if (location.state.telefone) {
        setValue('telefone', location.state.telefone);
      }

      // Limpar mensagem após 5 segundos
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [location.state, setValue]);

  const showMessage = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setModalMessage({ title, message, type });
    setShowModal(true);
  };


  return(
  <div className="pagina-login">
        
        <div className="voltar">
          <button onClick={handleBackClick} className="botao-voltar">
            <svg className="icone-voltar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </button>
        </div>

      <div className="login-container">
        <div className="logo-login">
          <img 
            src="/assets/img/logo_parceria_hc_jag_ajustada.png" 
            alt="Logo Saúde Digital Acessível"
          />
        </div>
        <h2 className="titulo-login">Acesse sua conta</h2>
        <p className="subtitulo-login">
          Ou <Link to="/cadastro">crie uma nova conta</Link>
        </p>
      </div>

      <div className="login-form-container">
        <div className="login-card">
          {errors.root && (
            <div className="mensagem-erro">{errors.root.message}</div>
          )}

          <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
            <div className="campo-form">
              <label htmlFor="cpf">CPF *</label>
              <input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                {...register('cpf', {
                  required: 'CPF é obrigatório',
                  pattern: {
                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                    message: 'CPF deve estar no formato 000.000.000-00'
                  },
                  minLength: {
                    value: 14,
                    message: 'CPF deve ter 11 dígitos'
                  }
                })}
                onChange={handleCPFChange}
              />
              {errors.cpf && <p className="mensagem-erro">{errors.cpf.message}</p>}
            </div>

            <div className="campo-form">
              <label htmlFor="telefone">Telefone *</label>
              <input
                id="telefone"
                type="tel"
                placeholder="(00) 00000-0000"
                {...register('telefone', {
                  required: 'Telefone é obrigatório',
                  pattern: {
                    value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
                    message: 'Telefone deve estar no formato (00) 00000-0000'
                  }
                })}
                onChange={handlePhoneChange}
              />
              {errors.telefone && <p className="mensagem-erro">{errors.telefone.message}</p>}
            </div>

            <div className="opcoes-login">
              <div className="lembrar-me">
                <input id="remember-me" name="remember-me" type="checkbox" />
                <label htmlFor="remember-me">Lembrar-me</label>
              </div>
              <div className="esqueceu-senha">
                <a href="#">Esqueceu sua senha?</a>
              </div>
            </div>

            <div>
              <button type="submit" className="botao">Entrar</button>
            </div>
          </form>

          <div className="cadastro-container">
            <p>Ainda não tem conta?</p>
            <Link to="/cadastro" className="botao-cadastre-se">Cadastre-se</Link>
          </div>

          <div className="acessibilidade-info">
            <h3>Precisa de ajuda para acessar?</h3>
            <p>Ligue para nossa central: <strong>(11) 2661-8500</strong></p>
          </div>
        </div>
      </div>

      <div className="dicas-seguranca">
        <h3>Dicas de segurança</h3>
        <ul>
          <li>Mantenha suas informações de login em segredo</li>
          <li>Use uma conexão segura (HTTPS)</li>
          <li>Desconecte-se após o uso</li>
        </ul>
      </div>

        </div>
  );
}