import type { TipoFaq } from "../types/tipoFaq";

export const listaFaq:TipoFaq[] = [
    {
      id: 1,
      pergunta: "Como posso agendar uma consulta pelo aplicativo?",
      resposta:
        "Nosso aplicativo possui um sistema simplificado de agendamento. Basta acessar a seção 'Agendar Consulta', selecionar a especialidade desejada, escolher uma data e horário disponíveis e confirmar. Você receberá um lembrete por SMS no dia anterior.",
    },
    {
      id: 2,
      pergunta: "O aplicativo funciona em celulares mais antigos?",
      resposta:
        "Sim! Desenvolvemos uma versão leve do aplicativo que funciona mesmo em modelos mais antigos de smartphones. Caso tenha dificuldades, também oferecemos uma versão web que pode ser acessada pelo navegador do celular.",
    },
    {
      id: 3,
      pergunta: "E se eu não souber usar o aplicativo?",
      resposta:
        "Temos um serviço de suporte especializado que pode te auxiliar por telefone ou vídeo chamada. Além disso, oferecemos tutoriais em vídeo com instruções passo a passo para cada funcionalidade.",
    },
    {
      id: 4,
      pergunta: "Como faço para cancelar uma consulta?",
      resposta:
        "Na seção 'Minhas Consultas', selecione a consulta que deseja cancelar e clique no botão 'Cancelar'. Você também pode ligar para nossa central de atendimento para solicitar o cancelamento.",
    },
    {
      id: 5,
      pergunta: "O aplicativo é gratuito?",
      resposta:
        "Sim, o aplicativo é totalmente gratuito para os pacientes. Algumas clínicas parceiras podem cobrar pelas consultas, mas o uso da plataforma em si não tem custo.",
    },
  ];