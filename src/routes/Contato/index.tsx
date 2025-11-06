import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Contato() {
  const navigate = useNavigate();

  interface ContactFormData {
    nome: string;
    email: string;
    telefone: string;
    assunto: string;
    mensagem: string;
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log("Dados do formulário:", data);
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    reset();
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
}