import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  linkAidApi,
  type ApiContatoResponse,
  type ApiContatoRequest,
  type ApiDentistaResponse,
  type ApiTicketRequest,
  type ApiTicketResponse,
  type ApiTicketUpdateRequest,
  type ApiUsuarioResponse,
} from "@/lib/linkaidApi";
import {
  canalCodigo,
  canalLabel,
  classificacaoCodigo,
  classificacaoLabel,
  dentistaStatusCodigo,
  dentistaStatusLabel,
  perfilLabel,
  prioridadeCodigo,
  PRIORIDADE_LABELS,
  prioridadeLabel,
  type PrioridadeLabel,
  editableContactTypeLabel,
  statusTicketCodigo,
  statusTicketLabel,
  tipoContatoCodigo,
  tipoContatoRegistroLabel,
} from "@/lib/linkaidMappings";

export type Priority = PrioridadeLabel;

export interface Ticket {
  id: string;
  protocol?: string;
  idContato?: number;
  channel: string;
  sender: string;
  subject: string;
  description?: string;
  aiSummary?: string;
  aiConfidence?: number;
  classification: string;
  priority: Priority;
  status: string;
  responsible: string;
  dentistResponsible?: string;
  updated: string;
  openedAt: string;
  phone: string;
  email: string;
  location: string;
  type: string;
  cpf: string;
  procedureDescription?: string;
  medications?: string;
  surgeryHistory?: string;
  messagesLoaded?: boolean;
  chatMessages?: { from: string; text: string; time: string }[];
}

export interface TeamMember {
  id?: number;
  name: string;
  role: string;
}

export interface Dentist {
  id: number;
  name: string;
  specialty: string;
  status: string;
  totalSlots: number;
  openSlots: number;
  phone: string;
  email: string;
  crm: string;
  location: string;
  uf: string;
  country: string;
  schedule: { day: string; time: string }[];
  registrationDate?: string;
}

export interface Contact {
  id?: number;
  name: string;
  phone: string;
  email: string;
  cpf: string;
  location: string;
  type: string;
  observation?: string;
  registrationDate?: string;
}

interface TicketsContextType {
  tickets: Ticket[];
  contacts: Contact[];
  teamMembers: TeamMember[];
  dentists: Dentist[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  loadTicket: (id: string) => Promise<Ticket | void>;
  updateTicket: (id: string, updates: Partial<Ticket>) => Promise<void>;
  updateContact: (
    contact: Contact,
    previousContact?: Contact,
  ) => Promise<Contact | void>;
  addTicket: (ticket: Ticket) => Promise<Ticket | void>;
  archiveTicket: (id: string) => Promise<void>;
  releasePhoneForTesting: (id: string) => Promise<Ticket | void>;
  addChatMessage: (
    id: string,
    message: { from: string; text: string; time: string },
  ) => Promise<void>;
  addDentist: (dentist: Dentist) => Promise<Dentist | void>;
  updateDentist: (id: number, updates: Partial<Dentist>) => Promise<void>;
}

const isRemoteId = (id: string | number) => /^\d+$/.test(String(id));

const onlyDigits = (value?: string) => value?.replace(/\D/g, "") || undefined;

const splitLocation = (location?: string) => {
  const [city, uf] = (location || "").split(",").map((part) => part.trim());
  return { city: city || undefined, uf: uf || undefined };
};

const formatDateTime = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatTime = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const messageSenderFromApi = (tipoRemetente: string) => {
  const tipo = tipoRemetente.toUpperCase();
  if (tipo === "CONTATO") return "client";
  if (tipo === "IA") return "ai";
  return "agent";
};

const legacyAiReply = (ticket: ApiTicketResponse) => {
  const base =
    "Recebemos sua mensagem e abrimos uma triagem no LinkAid. Nossa equipe vai analisar e continuar o atendimento.";
  return ticket.protocolo
    ? `${base}\n\nProtocolo LinkAid: ${ticket.protocolo}`
    : base;
};

const apiMessageText = (
  ticket: ApiTicketResponse,
  mensagem: { tipoRemetente: string; mensagem: string },
) => {
  const isLegacyAiSummary =
    mensagem.tipoRemetente.toUpperCase() === "IA" &&
    ticket.resumoIa?.trim() &&
    mensagem.mensagem.trim() === ticket.resumoIa.trim();

  return isLegacyAiSummary ? legacyAiReply(ticket) : mensagem.mensagem;
};

const apiTicketToTicket = (
  ticket: ApiTicketResponse,
  messagesLoaded = true,
): Ticket => {
  const contato = ticket.contato;
  const cidadeUf = [contato?.cidade, contato?.uf].filter(Boolean).join(", ");
  return {
    id: String(ticket.idTicket),
    protocol: ticket.protocolo,
    idContato: contato?.idContato,
    channel: canalLabel(ticket.canalCodigo) || ticket.canalNome || "",
    sender: contato?.nome || "Contato sem nome",
    subject: ticket.assunto,
    description: ticket.descricao,
    aiSummary: ticket.resumoIa,
    aiConfidence: ticket.confiancaIa,
    classification:
      classificacaoLabel(ticket.classificacaoCodigo) ||
      ticket.classificacaoNome ||
      "Geral",
    priority: (prioridadeLabel(ticket.prioridadeCodigo) ||
      PRIORIDADE_LABELS.MEDIA) as Priority,
    status:
      statusTicketLabel(ticket.statusCodigo) || ticket.statusNome || "Novo",
    responsible: ticket.responsavel?.nome || "Sem responsável",
    dentistResponsible: ticket.dentistaResponsavel?.nome,
    updated: formatDateTime(ticket.dataAtualizacao) || "agora",
    openedAt: formatDateTime(ticket.dataAbertura),
    phone: contato?.telefone || "",
    email: contato?.email || "",
    location: cidadeUf,
    type:
      tipoContatoRegistroLabel(
        contato?.tipoContatoCodigo,
        contato?.tipoContatoNome,
      ) || "Solicitante",
    cpf: contato?.documento || "-",
    messagesLoaded,
    chatMessages: messagesLoaded
      ? (ticket.mensagens ?? []).map((mensagem) => ({
          from: messageSenderFromApi(mensagem.tipoRemetente),
          text: apiMessageText(ticket, mensagem),
          time: formatTime(mensagem.dataMensagem),
        }))
      : undefined,
  };
};

const apiContatoToContact = (contato: ApiContatoResponse): Contact => ({
  id: contato.idContato,
  name: contato.nome,
  phone: contato.telefone || "",
  email: contato.email || "",
  cpf: contato.documento || "-",
  location: [contato.cidade, contato.uf].filter(Boolean).join(", "),
  type:
    tipoContatoRegistroLabel(
      contato.tipoContatoCodigo,
      contato.tipoContatoNome,
    ) || "Solicitante",
  observation: contato.observacao || "",
  registrationDate: contato.dataCadastro || "",
});

const apiDentistaToDentist = (dentista: ApiDentistaResponse): Dentist => ({
  id: dentista.idDentista,
  name: dentista.nome,
  specialty: dentista.especialidade,
  status: dentistaStatusLabel(dentista.status) || dentista.status,
  totalSlots: 0,
  openSlots: 0,
  phone: dentista.telefone || "",
  email: dentista.email || "",
  crm: dentista.cro,
  location: dentista.cidade || "",
  uf: dentista.uf || "",
  country: "Brasil",
  schedule: [],
  registrationDate: dentista.dataCadastro || "",
});

const apiUsuarioToTeamMember = (usuario: ApiUsuarioResponse): TeamMember => ({
  id: usuario.idUsuario,
  name: usuario.nome,
  role: perfilLabel(usuario.perfil) || usuario.perfil,
});

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

export function TicketsProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!token) {
      setTickets([]);
      setContacts([]);
      setDentists([]);
      setTeamMembers([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const [apiTickets, apiDentists, apiUsuarios, apiContatos] =
        await Promise.all([
          linkAidApi.listarTickets(token),
          linkAidApi.listarDentistas(token),
          linkAidApi.listarUsuarios(token),
          linkAidApi.listarContatos(token),
        ]);

      const listedTickets = apiTickets.map((ticket) =>
        apiTicketToTicket(ticket, false),
      );
      setTickets((previousTickets) =>
        listedTickets.map((ticket) => {
          const previous = previousTickets.find(
            (item) => item.id === ticket.id,
          );
          if (!previous?.messagesLoaded) return ticket;

          return {
            ...ticket,
            messagesLoaded: true,
            chatMessages: previous.chatMessages,
          };
        }),
      );
      setDentists(apiDentists.map(apiDentistaToDentist));
      setTeamMembers(apiUsuarios.map(apiUsuarioToTeamMember));
      setContacts(apiContatos.map(apiContatoToContact));
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Falha ao carregar dados da API.",
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useLayoutEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    setTickets([]);
    setContacts([]);
    setDentists([]);
    setTeamMembers([]);
  }, [token]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const upsertTicket = useCallback((ticket: Ticket) => {
    setTickets((prev) => {
      const exists = prev.some((item) => item.id === ticket.id);
      return exists
        ? prev.map((item) => (item.id === ticket.id ? ticket : item))
        : [ticket, ...prev];
    });
  }, []);

  const loadTicket = useCallback(
    async (id: string) => {
      if (!token || !isRemoteId(id)) return;

      try {
        const apiTicket = await linkAidApi.buscarTicket(token, id);
        const mapped = apiTicketToTicket(apiTicket, true);
        upsertTicket(mapped);
        return mapped;
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Falha ao carregar ticket.",
        );
        throw loadError;
      }
    },
    [token, upsertTicket],
  );

  const buildTicketRequest = (ticket: Ticket): ApiTicketRequest => {
    const { city, uf } = splitLocation(ticket.location);
    const responsavel = teamMembers.find(
      (member) => member.name === ticket.responsible,
    );
    const dentista = dentists.find(
      (item) => item.name === ticket.dentistResponsible,
    );

    return {
      idContato: ticket.idContato,
      nomeContato: ticket.sender,
      documentoContato: onlyDigits(ticket.cpf),
      emailContato: ticket.email || undefined,
      telefoneContato: onlyDigits(ticket.phone),
      tipoContatoCodigo: tipoContatoCodigo(ticket.type) || "SOLICITANTE",
      cidadeContato: city,
      ufContato: uf,
      canalCodigo: canalCodigo(ticket.channel) || "OUTROS",
      prioridadeCodigo: prioridadeCodigo(ticket.priority) || "MEDIA",
      classificacaoCodigo:
        classificacaoCodigo(ticket.classification) || "GERAL",
      idUsuarioResponsavel: responsavel?.id,
      idDentistaResponsavel: dentista?.id,
      assunto: ticket.subject,
      descricao: ticket.description || ticket.subject,
    };
  };

  const buildTicketUpdateRequest = (
    updates: Partial<Ticket>,
  ): ApiTicketUpdateRequest => {
    const body: ApiTicketUpdateRequest = {};
    if (updates.channel) body.canalCodigo = canalCodigo(updates.channel);
    if (updates.status) body.statusCodigo = statusTicketCodigo(updates.status);
    if (updates.priority)
      body.prioridadeCodigo = prioridadeCodigo(updates.priority);
    if (updates.classification)
      body.classificacaoCodigo = classificacaoCodigo(updates.classification);
    if (updates.responsible) {
      body.idUsuarioResponsavel = teamMembers.find(
        (member) => member.name === updates.responsible,
      )?.id;
    }
    if (updates.dentistResponsible) {
      body.idDentistaResponsavel = dentists.find(
        (dentist) => dentist.name === updates.dentistResponsible,
      )?.id;
    }
    if (updates.subject) body.assunto = updates.subject;
    if (updates.description) body.descricao = updates.description;
    return Object.fromEntries(
      Object.entries(body).filter(([, value]) => value !== undefined),
    );
  };

  const buildDentistaRequest = (dentist: Dentist) => ({
    nome: dentist.name,
    cro: dentist.crm,
    especialidade: dentist.specialty,
    email: dentist.email || undefined,
    telefone: onlyDigits(dentist.phone),
    cidade: dentist.location || undefined,
    uf: dentist.uf || undefined,
    status: dentistaStatusCodigo(dentist.status) || "A",
  });

  const buildContactRequest = (contact: Contact): ApiContatoRequest => {
    const { city, uf } = splitLocation(contact.location);
    const contactType = editableContactTypeLabel(contact.type);
    return {
      nome: contact.name,
      documento: onlyDigits(contact.cpf),
      email: contact.email || undefined,
      telefone: onlyDigits(contact.phone),
      tipoContatoCodigo: tipoContatoCodigo(contactType) || "SOLICITANTE",
      cidade: city,
      uf,
      observacao: contact.observation || undefined,
    };
  };

  const sameContactIdentity = (contact: Contact, reference?: Contact) => {
    if (!reference) return false;
    if (contact.id && reference.id && contact.id === reference.id) return true;
    if (
      contact.cpf &&
      contact.cpf !== "-" &&
      reference.cpf &&
      reference.cpf !== "-"
    ) {
      return onlyDigits(contact.cpf) === onlyDigits(reference.cpf);
    }
    return contact.name === reference.name;
  };

  const ticketBelongsToContact = (
    ticket: Ticket,
    contact: Contact,
    previousContact?: Contact,
  ) => {
    if (contact.id && ticket.idContato === contact.id) return true;
    if (previousContact?.id && ticket.idContato === previousContact.id)
      return true;

    const ticketDocument = onlyDigits(ticket.cpf);
    const currentDocument = onlyDigits(contact.cpf);
    const previousDocument = onlyDigits(previousContact?.cpf);
    if (ticketDocument && ticketDocument !== onlyDigits("-")) {
      return (
        ticketDocument === currentDocument ||
        ticketDocument === previousDocument
      );
    }

    return (
      ticket.sender === previousContact?.name || ticket.sender === contact.name
    );
  };

  const applyContactLocally = (contact: Contact, previousContact?: Contact) => {
    setContacts((prev) => {
      const exists = prev.some((item) =>
        sameContactIdentity(item, previousContact || contact),
      );
      if (!exists) return [...prev, contact];

      return prev.map((item) =>
        sameContactIdentity(item, previousContact || contact)
          ? { ...item, ...contact }
          : item,
      );
    });
    setTickets((prev) =>
      prev.map((ticket) =>
        ticketBelongsToContact(ticket, contact, previousContact)
          ? {
              ...ticket,
              idContato: contact.id ?? ticket.idContato,
              sender: contact.name,
              type: contact.type,
              location: contact.location,
              phone: contact.phone,
              email: contact.email,
              cpf: contact.cpf,
            }
          : ticket,
      ),
    );
  };

  const updateTicket = async (id: string, updates: Partial<Ticket>) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const updated = { ...t, ...updates };
        if (updates.status === "Resolvido" || updates.status === "Arquivado") {
          updated.updated = "agora";
        }
        return updated;
      }),
    );

    if (!token || !isRemoteId(id)) return;

    const body = buildTicketUpdateRequest(updates);
    if (Object.keys(body).length === 0) return;

    try {
      const updated = await linkAidApi.atualizarTicket(token, id, body);
      const mapped = apiTicketToTicket(updated);
      upsertTicket(mapped);
      if (mapped.idContato) {
        setContacts((prev) =>
          prev.map((contact) =>
            contact.id === mapped.idContato
              ? { ...contact, name: mapped.sender }
              : contact,
          ),
        );
      }
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Falha ao atualizar ticket.",
      );
      throw updateError;
    }
  };

  const updateContact = async (contact: Contact, previousContact?: Contact) => {
    if (token && contact.id) {
      try {
        const saved = await linkAidApi.atualizarContato(
          token,
          contact.id,
          buildContactRequest(contact),
        );
        const mapped = apiContatoToContact(saved);
        applyContactLocally(mapped, previousContact || contact);
        return mapped;
      } catch (contactError) {
        setError(
          contactError instanceof Error
            ? contactError.message
            : "Falha ao atualizar contato.",
        );
        throw contactError;
      }
    }

    applyContactLocally(contact, previousContact);
    return contact;
  };

  const addTicket = async (ticket: Ticket) => {
    if (token) {
      try {
        const created = await linkAidApi.criarTicket(
          token,
          buildTicketRequest(ticket),
        );
        const mapped = apiTicketToTicket(created);
        upsertTicket(mapped);
        return mapped;
      } catch (createError) {
        setError(
          createError instanceof Error
            ? createError.message
            : "Falha ao criar ticket.",
        );
        throw createError;
      }
    }

    throw new Error("Sessão expirada. Faça login novamente para criar ticket.");
  };

  const archiveTicket = async (id: string) => {
    if (token && isRemoteId(id)) {
      try {
        const updated = await linkAidApi.arquivarTicket(token, id);
        upsertTicket(apiTicketToTicket(updated));
        return;
      } catch (archiveError) {
        setError(
          archiveError instanceof Error
            ? archiveError.message
            : "Falha ao arquivar ticket.",
        );
        throw archiveError;
      }
    }

    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "Resolvido", updated: "agora" } : t,
      ),
    );
  };

  const releasePhoneForTesting = async (id: string) => {
    if (token && isRemoteId(id)) {
      try {
        const updated = await linkAidApi.liberarTelefoneTeste(token, id);
        const mapped = apiTicketToTicket(updated);
        upsertTicket(mapped);
        setContacts((prev) =>
          prev.map((contact) =>
            contact.id === mapped.idContato
              ? { ...contact, phone: mapped.phone }
              : contact,
          ),
        );
        return mapped;
      } catch (releaseError) {
        setError(
          releaseError instanceof Error
            ? releaseError.message
            : "Falha ao liberar telefone para teste.",
        );
        throw releaseError;
      }
    }

    throw new Error(
      "Sessão expirada. Faça login novamente para liberar o telefone.",
    );
  };

  const addChatMessage = async (
    id: string,
    message: { from: string; text: string; time: string },
  ) => {
    if (token && isRemoteId(id)) {
      try {
        const tipoRemetente =
          message.from === "client"
            ? "CONTATO"
            : message.from === "ai"
              ? "IA"
              : "ATENDENTE";
        const created = await linkAidApi.adicionarMensagem(
          token,
          id,
          message.text,
          tipoRemetente,
        );
        message = {
          from: messageSenderFromApi(created.tipoRemetente),
          text: created.mensagem,
          time: formatTime(created.dataMensagem),
        };
      } catch (messageError) {
        setError(
          messageError instanceof Error
            ? messageError.message
            : "Falha ao adicionar mensagem.",
        );
        throw messageError;
      }
    }

    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              messagesLoaded: true,
              chatMessages: [...(t.chatMessages || []), message],
            }
          : t,
      ),
    );
  };

  const addDentist = async (dentist: Dentist) => {
    if (token) {
      try {
        const created = await linkAidApi.criarDentista(
          token,
          buildDentistaRequest(dentist),
        );
        const mapped = apiDentistaToDentist(created);
        setDentists((prev) => [...prev, mapped]);
        return mapped;
      } catch (dentistError) {
        setError(
          dentistError instanceof Error
            ? dentistError.message
            : "Falha ao cadastrar dentista.",
        );
        throw dentistError;
      }
    }

    throw new Error(
      "Sessão expirada. Faça login novamente para cadastrar dentista.",
    );
  };

  const updateDentist = async (id: number, updates: Partial<Dentist>) => {
    const current = dentists.find((dentist) => dentist.id === id);
    const updated = current ? { ...current, ...updates } : undefined;
    setDentists((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    );

    if (!token || !updated) return;

    try {
      const saved = await linkAidApi.atualizarDentista(
        token,
        id,
        buildDentistaRequest(updated),
      );
      setDentists((prev) =>
        prev.map((dentist) =>
          dentist.id === id ? apiDentistaToDentist(saved) : dentist,
        ),
      );
    } catch (dentistError) {
      setError(
        dentistError instanceof Error
          ? dentistError.message
          : "Falha ao atualizar dentista.",
      );
      throw dentistError;
    }
  };

  return (
    <TicketsContext.Provider
      value={{
        tickets,
        contacts,
        teamMembers,
        dentists,
        loading,
        error,
        refresh,
        loadTicket,
        updateTicket,
        updateContact,
        addTicket,
        archiveTicket,
        releasePhoneForTesting,
        addChatMessage,
        addDentist,
        updateDentist,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
}

export function useTickets() {
  const ctx = useContext(TicketsContext);
  if (!ctx) throw new Error("useTickets must be used within TicketsProvider");
  return ctx;
}
