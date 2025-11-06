import type { TipoGuia } from "../types/tipoGuia";

export const listaGuia:TipoGuia[] = [
        {
      id: 1,
      number: "01",
      title: "Acesse o aplicativo",
      description: "Toque no ícone do aplicativo na tela do seu celular para abri-lo. A tela inicial mostrará as principais opções.",
      image: "/assets/img/guia1.jpg",
      imageAlt: "Passo 1 - Tela inicial do aplicativo"
    },
    {
      id: 2,
      number: "02",
      title: "Agende sua consulta",
      description: "Toque no botão 'Agendar Consulta'. Selecione a especialidade médica desejada e escolha uma data e horário disponíveis.",
      image: "/assets/img/guia2.jpg",
      imageAlt: "Passo 2 - Agendamento de consulta",
      reverse: true
    },
    {
      id: 3,
      number: "03",
      title: "Confirme o agendamento",
      description: "Revise os detalhes da consulta e toque em 'Confirmar'. Você receberá um comprovante na tela e por SMS.",
      image: "/assets/img/guia3.jpg",
      imageAlt: "Passo 3 - Confirmação de agendamento"
    },
    {
      id: 4,
      number: "04",
      title: "Acesse sua consulta",
      description: "No dia e hora marcados, toque em 'Minhas Consultas' e depois em 'Iniciar Consulta' para começar seu atendimento com o médico.",
      image: "/assets/img/guia4.jpg",
      imageAlt: "Passo 4 - Acesso à consulta",
      reverse: true
    }
]