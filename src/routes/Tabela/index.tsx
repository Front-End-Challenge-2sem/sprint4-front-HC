import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const API_URL = import.meta.env.VITE_API_URL as string;

// Tipos
interface Usuario {
  id_usuario: number;
  nome: string;
  idade: number;
  data_nascimento: string;
  telefone: string;
  chatbot_id_conversa: number;
  cadastro_cpf_cadastro: string;
  agenda_id_agenda: number;
  medico_id_medico: number;
}

interface Medico {
  id_medico: number;
  nome: string;
  cpf: string;
  tipo_medico: string;
}

interface Cadastro {
  cpf_cadastro: string;
  email: string;
  status: string;
  senha: string;
}

type EntityType = "usuario" | "medico" | "cadastro";

export default Tabelas;