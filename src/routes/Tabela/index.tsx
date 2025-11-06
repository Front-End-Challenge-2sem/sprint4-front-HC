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

// Funções de validação
const validationRules = {
  nome: {
    required: "Nome é obrigatório",
    pattern: {
      value: /^[A-Za-zÀ-ÿ\s.]+$/,
      message: "Nome não pode conter números ou caracteres especiais",
    },
  },
  cpf: {
    required: "CPF é obrigatório",
    pattern: {
      value: /^\d+$/,
      message: "CPF deve conter apenas números",
    },
    minLength: {
      value: 11,
      message: "CPF deve ter exatamente 11 dígitos",
    },
    maxLength: {
      value: 11,
      message: "CPF deve ter exatamente 11 dígitos",
    },
  },
  telefone: {
    required: "Telefone é obrigatório",
    pattern: {
      value: /^\d+$/,
      message: "Telefone deve conter apenas números",
    },
    maxLength: {
      value: 11,
      message: "Telefone deve ter no máximo 11 dígitos",
    },
  },
  email: {
    required: "Email é obrigatório",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email deve ser válido",
    },
  },
  tipo_medico: {
    required: "Tipo médico é obrigatório",
    pattern: {
      value: /^[A-Za-zÀ-ÿ\s.]+$/,
      message: "Tipo médico não pode conter números ou caracteres especiais",
    },
  },
  required: (field: string) => ({
    required: `${field} é obrigatório`,
  }),
};

const formatadores = {
  apenasNumeros: (valor: string) => valor.replace(/\D/g, ""),
  apenasLetras: (valor: string) => valor.replace(/[^A-Za-zÀ-ÿ\s.]/g, ""),
};

// Componente de Loading com Temporizador
interface LoadingWithTimerProps {
  message?: string;
}

const LoadingWithTimer: React.FC<LoadingWithTimerProps> = ({
  message = "Carregando...",
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(120);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progressPercentage = ((120 - timeLeft) / 120) * 100;

  return (
    <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-lg font-semibold text-gray-700 mb-2">{message}</p>
      <div className="mb-4">
        <div className="text-2xl font-bold text-blue-600 mb-2">
          {formatTime(timeLeft)}
        </div>
        <p className="text-sm text-gray-500">Tempo estimado: 2 minutos</p>
      </div>
      <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="text-sm text-gray-600">
        {timeLeft > 100 && "Iniciando conexão com o servidor..."}
        {timeLeft <= 100 && timeLeft > 60 && "Processando dados..."}
        {timeLeft <= 60 && timeLeft > 30 && "Finalizando carregamento..."}
        {timeLeft <= 30 && "Quase pronto..."}
      </div>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg max-w-md mx-auto">
        <p className="text-xs text-blue-700">
          Esta operação pode levar até 2 minutos.
        </p>
      </div>
    </div>
  );
};

// Componente Modal de Confirmação
interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "success" | "error" | "warning" | "info";
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  type = "warning",
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "⚠️";
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500 hover:bg-green-600";
      case "error":
        return "bg-red-500 hover:bg-red-600";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "info":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-yellow-500 hover:bg-yellow-600";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{getIcon()}</span>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          </div>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className={`${getButtonColor()} text-white py-2 px-6 rounded-lg font-semibold transition-colors`}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Modal de Mensagem
interface MessageModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  title,
  message,
  type,
  onClose,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "ℹ️";
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "warning":
        return "text-yellow-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-blue-800";
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500 hover:bg-green-600";
      case "error":
        return "bg-red-500 hover:bg-red-600";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "info":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-md border-2 ${getBackgroundColor()}`}
      >
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

// Componente Modal de Formulário
interface ModalFormProps {
  type: EntityType;
  item: Usuario | Medico | Cadastro | null;
  onSave: (data: FormData) => void;
  onClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({
  type,
  item,
  onSave,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    mode: "onChange",
  });

  useEffect(() => {
    if (item) {
      Object.entries(item).forEach(([key, value]) => {
        setValue(key as keyof FormData, value as never);
      });
    } else {
      reset();
      switch (type) {
        case "usuario":
          setValue("nome", "");
          setValue("idade", 0);
          setValue("data_nascimento", "");
          setValue("telefone", "");
          setValue("chatbot_id_conversa", 0);
          setValue("cadastro_cpf_cadastro", "");
          setValue("agenda_id_agenda", 0);
          setValue("medico_id_medico", 0);
          break;
        case "medico":
          setValue("nome", "");
          setValue("cpf", "");
          setValue("tipo_medico", "");
          break;
        case "cadastro":
          setValue("cpf_cadastro", "");
          setValue("email", "");
          setValue("status", "ativo");
          setValue("senha", "");
          break;
      }
    }
  }, [item, type, setValue, reset]);

  const handleInputChange = (
    field: keyof FormData,
    value: string,
    tipo: "numeros" | "letras" = "numeros"
  ) => {
    let valorFormatado = value;

    if (tipo === "numeros") {
      valorFormatado = formatadores.apenasNumeros(value);
    } else if (tipo === "letras") {
      valorFormatado = formatadores.apenasLetras(value);
    }

    setValue(field, valorFormatado as never);
  };

  const onSubmit = (data: FormData) => {
    onSave(data);
  };

  const getTitle = () => {
    const action = item ? "Editar" : "Adicionar";
    const entity =
      type === "usuario"
        ? "Usuário"
        : type === "medico"
        ? "Médico"
        : "Cadastro";
    return `${action} ${entity}`;
  };

  const renderUsuarioForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome *
        </label>
        <input
          type="text"
          {...register("nome", validationRules.nome)}
          onChange={(e) => handleInputChange("nome", e.target.value, "letras")}
          className={`w-full p-2 border rounded-lg ${
            errors.nome ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.nome && (
          <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Idade *
        </label>
        <input
          type="number"
          {...register("idade", validationRules.required("Idade"))}
          className={`w-full p-2 border rounded-lg ${
            errors.idade ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.idade && (
          <p className="text-red-500 text-xs mt-1">{errors.idade.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Data Nascimento *
        </label>
        <input
          type="date"
          {...register(
            "data_nascimento",
            validationRules.required("Data de nascimento")
          )}
          className={`w-full p-2 border rounded-lg ${
            errors.data_nascimento ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.data_nascimento && (
          <p className="text-red-500 text-xs mt-1">
            {errors.data_nascimento.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefone *
        </label>
        <input
          type="text"
          placeholder="Ex: 11912345678"
          {...register("telefone", validationRules.telefone)}
          onChange={(e) =>
            handleInputChange("telefone", e.target.value, "numeros")
          }
          className={`w-full p-2 border rounded-lg ${
            errors.telefone ? "border-red-500" : "border-gray-300"
          }`}
          maxLength={11}
        />
        {errors.telefone && (
          <p className="text-red-500 text-xs mt-1">{errors.telefone.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Chatbot ID *
        </label>
        <input
          type="number"
          {...register(
            "chatbot_id_conversa",
            validationRules.required("Chatbot ID")
          )}
          className={`w-full p-2 border rounded-lg ${
            errors.chatbot_id_conversa ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.chatbot_id_conversa && (
          <p className="text-red-500 text-xs mt-1">
            {errors.chatbot_id_conversa.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          CPF Cadastro *
        </label>
        <input
          type="text"
          placeholder="Ex: 12312312312"
          {...register("cadastro_cpf_cadastro", validationRules.cpf)}
          onChange={(e) =>
            handleInputChange(
              "cadastro_cpf_cadastro",
              e.target.value,
              "numeros"
            )
          }
          className={`w-full p-2 border rounded-lg ${
            errors.cadastro_cpf_cadastro ? "border-red-500" : "border-gray-300"
          }`}
          maxLength={11}
        />
        {errors.cadastro_cpf_cadastro && (
          <p className="text-red-500 text-xs mt-1">
            {errors.cadastro_cpf_cadastro.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Agenda ID *
        </label>
        <input
          type="number"
          {...register(
            "agenda_id_agenda",
            validationRules.required("Agenda ID")
          )}
          className={`w-full p-2 border rounded-lg ${
            errors.agenda_id_agenda ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.agenda_id_agenda && (
          <p className="text-red-500 text-xs mt-1">
            {errors.agenda_id_agenda.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Médico ID *
        </label>
        <input
          type="number"
          {...register(
            "medico_id_medico",
            validationRules.required("Médico ID")
          )}
          className={`w-full p-2 border rounded-lg ${
            errors.medico_id_medico ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.medico_id_medico && (
          <p className="text-red-500 text-xs mt-1">
            {errors.medico_id_medico.message}
          </p>
        )}
      </div>
    </div>
  );

export default Tabelas;