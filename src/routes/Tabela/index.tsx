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

type FormData = Partial<Usuario> & Partial<Medico> & Partial<Cadastro>;

// Serviço da API
const apiService = {
  // Usuários
  async getUsuarios(): Promise<Usuario[]> {
    const response = await fetch(`${API_URL}/usuario`);
    if (!response.ok) throw new Error("Erro ao buscar usuários");
    return response.json();
  },

  async createUsuario(usuario: Omit<Usuario, "id_usuario">): Promise<Usuario> {
    const response = await fetch(`${API_URL}/usuario`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    if (!response.ok)
      throw new Error(
        "Erro ao criar usuário, verifique se o CPF ja está cadastrado!"
      );
    return response.json();
  },

  async updateUsuario(id: number, usuario: Usuario): Promise<Usuario> {
    const response = await fetch(`${API_URL}/usuario/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    if (!response.ok)
      throw new Error(
        "Erro ao atualizar usuário, verifique se o CPF ja está cadastrado!"
      );
    return response.json();
  },

  async deleteUsuario(id: number): Promise<boolean> {
    const response = await fetch(`${API_URL}/usuario/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  },

  // Médicos
  async getMedicos(): Promise<Medico[]> {
    const response = await fetch(`${API_URL}/medico`);
    if (!response.ok) throw new Error("Erro ao buscar médicos");
    return response.json();
  },

  async createMedico(medico: Omit<Medico, "id_medico">): Promise<Medico> {
    const response = await fetch(`${API_URL}/medico`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(medico),
    });
    if (!response.ok)
      throw new Error("Erro ao criar médico, verifique se o CPF é válido!");
    return response.json();
  },

  async updateMedico(id: number, medico: Medico): Promise<Medico> {
    const response = await fetch(`${API_URL}/medico/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(medico),
    });
    if (!response.ok)
      throw new Error("Erro ao atualizar médico, verifique se o CPF é válido!");
    return response.json();
  },

  async deleteMedico(id: number): Promise<boolean> {
    const response = await fetch(`${API_URL}/medico/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  },

  // Cadastros
  async getCadastros(): Promise<Cadastro[]> {
    const response = await fetch(`${API_URL}/cadastro`);
    if (!response.ok) throw new Error("Erro ao buscar cadastros");
    return response.json();
  },

  async updateCadastro(
    cpf: string,
    cadastro: Omit<Cadastro, "cpf_cadastro">
  ): Promise<Cadastro> {
    const response = await fetch(`${API_URL}/cadastro/${cpf}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cadastro),
    });
    if (!response.ok) throw new Error("Erro ao atualizar cadastro");
    return response.json();
  },

  async deleteCadastro(cpf: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/cadastro/${cpf}`, {
      method: "DELETE",
    });
    return response.ok;
  },
};

export default Tabelas;