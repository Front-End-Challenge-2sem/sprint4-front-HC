import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

export default function Contato() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({ 
    title: '', 
    message: '', 
    type: 'info' as 'success' | 'error' | 'warning' | 'info' 
  });

  interface ContactFormData {
    nome: string;
    email: string;
    telefone: string;
    assunto: string;
    mensagem: string;
  }

  // Configuração do useForm com validações
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isValid, isDirty }, 
    reset,
    watch,
    trigger
  } = useForm<ContactFormData>({
    mode: 'onChange',
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      assunto: '',
      mensagem: ''
    }
  });

    // Regras de validação
  const validationRules = {
    nome: {
      required: 'Nome é obrigatório',
      minLength: {
        value: 2,
        message: 'Nome deve ter pelo menos 2 caracteres'
      },
      maxLength: {
        value: 100,
        message: 'Nome deve ter no máximo 100 caracteres'
      },
      pattern: {
        value: /^[A-Za-zÀ-ÿ\s']+$/,
        message: 'Nome deve conter apenas letras e espaços'
      }
    },
    email: {
      required: 'Email é obrigatório',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Por favor, insira um email válido'
      },
      maxLength: {
        value: 100,
        message: 'Email deve ter no máximo 100 caracteres'
      }
    },
    telefone: {
      pattern: {
        value: /^[\d\s\-()]+$/,
        message: 'Telefone deve conter apenas números, espaços, hífens e parênteses'
      },
      // CORREÇÃO: Limitado a 11 dígitos (formato: (11) 99999-9999 = 15 caracteres)
      maxLength: {
        value: 15,
        message: 'Telefone deve ter no máximo 11 dígitos'
      },
      validate: (value: string) => {
        if (!value) return true; // Opcional
        
        const digitsOnly = value.replace(/\D/g, '');
        
        // Verifica se tem exatamente 11 dígitos
        if (digitsOnly.length !== 11) {
          return 'Telefone deve ter exatamente 11 dígitos';
        }
        
        // Verifica se o DDD é válido (começa com dígitos 1-9)
        const ddd = digitsOnly.substring(0, 2);
        if (!/^[1-9][0-9]$/.test(ddd)) {
          return 'DDD inválido';
        }
        
        return true;
      }
    },
    assunto: {
      required: 'Assunto é obrigatório',
      validate: (value: string) => 
        value !== '' || 'Por favor, selecione um assunto'
    },
    mensagem: {
      required: 'Mensagem é obrigatória',
      minLength: {
        value: 10,
        message: 'Mensagem deve ter pelo menos 10 caracteres'
      },
      maxLength: {
        value: 1000,
        message: 'Mensagem deve ter no máximo 1000 caracteres'
      },
      validate: (value: string) => {
        const trimmedValue = value.trim();
        return trimmedValue.length >= 10 || 'Mensagem deve ter pelo menos 10 caracteres (sem espaços em branco)';
      }
    }
  };

// Função para formatar telefone em tempo real e limitar a 11 dígitos
  const formatPhone = (value: string) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '');
    
    // CORREÇÃO: Limita a 11 dígitos
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplica a formatação apenas se tiver dígitos
    if (limitedNumbers.length === 0) return '';
    
    if (limitedNumbers.length <= 2) {
      return `(${limitedNumbers}`;
    } else if (limitedNumbers.length <= 6) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else if (limitedNumbers.length <= 10) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7, 11)}`;
    }
  };

  // Função para lidar com a mudança do telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    e.target.value = formatted;
    
    // Dispara a validação após a formatação
    setTimeout(() => trigger('telefone'), 100);
  };

  const showMessage = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setModalMessage({ title, message, type });
    setShowModal(true);
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simula o envio do formulário (substitua por sua API)
      console.log("Dados do formulário validados:", data);
      
      // Simula um delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showMessage(
        "Mensagem Enviada!", 
        "Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.", 
        'success'
      );
      
      reset();
    } catch {
      showMessage(
        "Erro no Envio", 
        "Houve um erro ao enviar sua mensagem. Por favor, tente novamente.", 
        'error'
      );
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return(
    <div>
        <div className="voltar">
        <button className="botao-voltar contato-voltar" onClick={handleBackClick}>
          <svg
            className="icone-voltar"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width={20}
            height={20}
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

      <form className="form-contato" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-grupo">
          <label htmlFor="nome">Nome Completo*</label>
          <input
            id="nome"
            type="text"
            {...register("nome", { required: "Por favor, insira seu nome" })}
          />
          {errors.nome && <span className="mensagem-erro">{errors.nome.message}</span>}
        </div>

        
        <div className="form-grupo">
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Por favor, insira seu email",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Por favor, insira um email válido",
              },
            })}
          />
          {errors.email && <span className="mensagem-erro">{errors.email.message}</span>}
        </div>

        
        <div className="form-grupo">
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            type="tel"
            {...register("telefone")}
          />
        </div>

        
        <div className="form-grupo">
          <label htmlFor="assunto">Assunto*</label>
          <select
            id="assunto"
            {...register("assunto", { required: "Por favor, selecione um assunto" })}
          >
            <option value="">Selecione...</option>
            <option value="duvida">Dúvida</option>
            <option value="sugestao">Sugestão</option>
            <option value="reclamacao">Reclamação</option>
            <option value="outro">Outro</option>
          </select>
          {errors.assunto && <span className="mensagem-erro">{errors.assunto.message}</span>}
        </div>

        
        <div className="form-grupo">
          <label htmlFor="mensagem">Mensagem*</label>
          <textarea
            id="mensagem"
            rows={5}
            {...register("mensagem", { required: "Por favor, insira sua mensagem" })}
          />
          {errors.mensagem && <span className="mensagem-erro">{errors.mensagem.message}</span>}
        </div>

        
        <button type="submit" className="botao">
          Enviar Mensagem
        </button>
      </form>
    </div>
  )
