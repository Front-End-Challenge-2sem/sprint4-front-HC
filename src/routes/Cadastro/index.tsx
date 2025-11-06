import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { TipoCadastro } from "../../types/tipoCadastro";

export default function Cadastro() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch, setError } = useForm<TipoCadastro>();
  const termosAceitos = watch('termos');

  const onSubmit = (data: TipoCadastro) => {
    console.log('Dados de cadastro:', data);

    if (data.email.includes('exemplo')) {
      setError('email', { type: 'manual', message: 'Este email já está em uso' });
      return;
    }

    alert('Cadastro realizado com sucesso! Verifique seu email para confirmar a conta.');
    navigate('/login');
  };

  const handleBackClick = () => navigate(-1);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0,3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0,3)}.${numbers.slice(3,6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0,3)}.${numbers.slice(3,6)}.${numbers.slice(6,9)}-${numbers.slice(9,11)}`;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 6) return `(${numbers.slice(0,2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0,2)}) ${numbers.slice(2,6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0,2)}) ${numbers.slice(2,7)}-${numbers.slice(7,11)}`;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => e.target.value = formatCPF(e.target.value);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => e.target.value = formatPhone(e.target.value);

  return (
    <div className="cadastro-container">

      
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
          <img src="/assets/img/logo_parceria_hc_jag_ajustada.png" alt="Logo Saúde Digital Acessível" />
        </div>
        <h2 className="titulo-login">Crie sua conta</h2>
        <p className="subtitulo-login">
          Ou <Link to="/login">faça login em uma conta existente</Link>
        </p>
      </div>

      
      <div className="login-form-container">
        <div className="login-card">
          <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="campo-form">
              <label htmlFor="nome">Nome Completo *</label>
              <input
                id="nome"
                type="text"
                placeholder="Digite seu nome completo"
                {...register('nome', {
                  required: 'Nome completo é obrigatório',
                  minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' },
                  pattern: { value: /^[a-zA-ZÀ-ÿ\s]+$/, message: 'Nome deve conter apenas letras' }
                })}
              />
              {errors.nome && <p className="mensagem-erro">{errors.nome.message}</p>}
            </div>

            <div className="campo-form">
              <label htmlFor="cpf">CPF *</label>
              <input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                {...register('cpf', {
                  required: 'CPF é obrigatório',
                  pattern: { value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, message: 'CPF deve estar no formato 000.000.000-00' },
                  validate: {
                    validCPF: (value) => {
                      const cpf = value.replace(/\D/g, '');
                      if (cpf.length !== 11) return 'CPF deve ter 11 dígitos';
                      if (/^(\d)\1{10}$/.test(cpf)) return 'CPF inválido';
                      return true;
                    }
                  }
                })}
                onChange={handleCPFChange}
              />
              {errors.cpf && <p className="mensagem-erro">{errors.cpf.message}</p>}
            </div>

            <div className="campo-form">
              <label htmlFor="email">E-mail *</label>
              <input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                {...register('email', {
                  required: 'E-mail é obrigatório',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail deve estar em um formato válido' }
                })}
              />
              {errors.email && <p className="mensagem-erro">{errors.email.message}</p>}
            </div>

            <div className="campo-form">
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                type="tel"
                placeholder="(00) 00000-0000"
                {...register('telefone', {
                  pattern: { value: /^\(\d{2}\) \d{4,5}-\d{4}$/, message: 'Telefone deve estar no formato (00) 00000-0000' }
                })}
                onChange={handlePhoneChange}
              />
              {errors.telefone && <p className="mensagem-erro">{errors.telefone.message}</p>}
            </div>

            <div className="campo-form">
              <label htmlFor="dataNascimento">Data de Nascimento *</label>
              <input
                id="dataNascimento"
                type="date"
                {...register('dataNascimento', {
                  required: 'Data de nascimento é obrigatória',
                  validate: (value) => {
                    const birthDate = new Date(value);
                    const today = new Date();
                    const age = today.getFullYear() - birthDate.getFullYear();
                    if (age < 18) return 'Você deve ter pelo menos 18 anos';
                    if (age > 120) return 'Data de nascimento inválida';
                    return true;
                  }
                })}
              />
              {errors.dataNascimento && <p className="mensagem-erro">{errors.dataNascimento.message}</p>}
            </div>

            <div className="campo-form">
              <label>
                <input
                  type="checkbox"
                  {...register('termos', { required: 'Você deve aceitar os termos de uso' })}
                />{' '}
                Eu concordo com os <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>
              </label>
              {errors.termos && <p className="mensagem-erro">{errors.termos.message}</p>}
            </div>

            <button type="submit" disabled={!termosAceitos} className="botao">
              Cadastrar
            </button>
          </form>

          <div className="cadastro-container">
            <p>Já tem uma conta?</p>
            <Link to="/login" className="btn-login">Fazer Login</Link>
          </div>

          <div className="dicas-seguranca">
            <h3>Proteção de Dados</h3>
            <p>Seus dados estão protegidos pela LGPD. Utilizamos criptografia para garantir a segurança das suas informações pessoais.</p>
          </div>

          <div className="acessibilidade-info">
            <h3>Suporte disponível</h3>
            <p>Precisa de ajuda? Ligue para nossa central: <strong>(11) 2661-8500</strong></p>
          </div>

        </div>
      </div>
    </div>
  );
}
