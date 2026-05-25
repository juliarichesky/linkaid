import { useMemo, useState } from "react";
import {
  Search,
  ArrowLeft,
  Clock,
  User,
  FileText,
  ChevronRight,
  Stethoscope,
  RotateCcw,
  MessageCircle,
  Camera,
  Mail,
  MoreHorizontal,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTickets, type Ticket } from "@/contexts/TicketsContext";
import { cn } from "@/lib/classnames";
import { CANAL_LABELS, PRIORIDADE_LABELS } from "@/lib/linkaidMappings";
import { ticketDisplayProtocol } from "@/lib/ticketDisplay";
import { toast } from "sonner";

interface HistoryTicket {
  id: string;
  protocol: string;
  sender: string;
  cpf: string;
  subject: string;
  date: string;
  openedAt: string;
  updatedAt: string;
  channel: string;
  dentist: string;
  status: string;
  priority: string;
  classification: string;
  description: string;
  responsible: string;
  phone: string;
  email: string;
  location: string;
  procedureDescription?: string;
  medications?: string;
  surgeryHistory?: string;
  timeline: { date: string; action: string; user: string }[];
  relatedTickets: {
    id: string;
    protocol: string;
    subject: string;
    date: string;
    status: string;
  }[];
}

const ITEMS_PER_PAGE = 10;
const FILTER_SELECT_CLASS = "w-56";
const FINAL_STATUSES = new Set([
  "Resolvido",
  "Arquivado",
  "Cancelado",
  "Fechado",
]);
const selectFilterValue = (value: string) =>
  value === "all" ? undefined : value;

const channelIcon: Record<string, React.ElementType> = {
  [CANAL_LABELS.WHATSAPP]: MessageCircle,
  [CANAL_LABELS.INSTAGRAM]: Camera,
  [CANAL_LABELS.EMAIL]: Mail,
  [CANAL_LABELS.OUTROS]: MoreHorizontal,
};

const channelColors: Record<string, string> = {
  [CANAL_LABELS.WHATSAPP]: "text-green-500",
  [CANAL_LABELS.INSTAGRAM]: "text-pink-500",
  [CANAL_LABELS.EMAIL]: "text-blue-500",
  [CANAL_LABELS.OUTROS]: "text-muted-foreground",
};

const priorityClasses: Record<string, string> = {
  [PRIORIDADE_LABELS.CRITICA]:
    "bg-status-critical text-status-critical-foreground",
  [PRIORIDADE_LABELS.ALTA]: "bg-status-high text-status-high-foreground",
  [PRIORIDADE_LABELS.MEDIA]: "bg-status-medium text-status-medium-foreground",
  [PRIORIDADE_LABELS.BAIXA]: "bg-status-low text-status-low-foreground",
};

const prioritySortValue: Record<string, number> = {
  [PRIORIDADE_LABELS.BAIXA]: 1,
  [PRIORIDADE_LABELS.MEDIA]: 2,
  [PRIORIDADE_LABELS.ALTA]: 3,
  [PRIORIDADE_LABELS.CRITICA]: 4,
};

type SortKey =
  | "id"
  | "channel"
  | "sender"
  | "subject"
  | "classification"
  | "priority"
  | "status"
  | "date";
type SortDirection = "asc" | "desc";
type SortConfig = {
  key: SortKey;
  direction: SortDirection;
} | null;

type ChannelFilterOptionValue = "whatsapp" | "instagram" | "email" | "outros";
type ChannelFilterValue = "all" | ChannelFilterOptionValue;

type ChannelFilterOption = {
  value: ChannelFilterOptionValue;
  label: string;
  channels: string[];
};

const CHANNEL_FILTER_OPTIONS: ChannelFilterOption[] = [
  {
    value: "whatsapp",
    label: "WhatsApp",
    channels: [CANAL_LABELS.WHATSAPP],
  },
  {
    value: "instagram",
    label: "Instagram",
    channels: [CANAL_LABELS.INSTAGRAM],
  },
  {
    value: "email",
    label: "Email",
    channels: [CANAL_LABELS.EMAIL, "Email"],
  },
  {
    value: "outros",
    label: "Outros",
    channels: [CANAL_LABELS.OUTROS],
  },
];

const normalizeForFilter = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const ticketChannelLabel = (channel: string) => {
  const normalizedChannel = normalizeForFilter(channel);
  if (
    normalizedChannel.includes("whatsapp") ||
    normalizedChannel.includes("twilio") ||
    normalizedChannel.includes("watson")
  ) {
    return CANAL_LABELS.WHATSAPP;
  }
  if (normalizedChannel === "email") {
    return CANAL_LABELS.EMAIL;
  }
  if (
    ["outro", "outros", "manual", "telefone", "cadastro manual"].includes(
      normalizedChannel,
    )
  ) {
    return CANAL_LABELS.OUTROS;
  }
  return channel;
};

const matchesChannelOption = (channel: string, option: ChannelFilterOption) => {
  const normalizedChannel = normalizeForFilter(ticketChannelLabel(channel));
  return option.channels.some(
    (candidate) =>
      normalizeForFilter(ticketChannelLabel(candidate)) === normalizedChannel,
  );
};

const parseSortableDate = (value: string) => {
  const normalized = normalizeForFilter(value);
  if (!normalized) return 0;
  if (normalized.includes("agora")) return Number.MAX_SAFE_INTEGER;

  const brDate = value.match(
    /^(\d{2})\/(\d{2})\/(\d{4})(?:,?\s+(\d{2}):(\d{2}))?/,
  );
  if (brDate) {
    const [, day, month, year, hour = "0", minute = "0"] = brDate;
    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
    ).getTime();
  }

  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

const sortValueForHistoryTicket = (ticket: HistoryTicket, key: SortKey) => {
  switch (key) {
    case "id":
      return ticket.protocol;
    case "channel":
      return ticketChannelLabel(ticket.channel);
    case "sender":
      return ticket.sender;
    case "subject":
      return ticket.subject;
    case "classification":
      return ticket.classification;
    case "priority":
      return prioritySortValue[ticket.priority] ?? 0;
    case "status":
      return ticket.status;
    case "date":
      return parseSortableDate(ticket.openedAt || ticket.date);
    default:
      return "";
  }
};

const compareSortValues = (left: string | number, right: string | number) => {
  if (typeof left === "number" && typeof right === "number") {
    return left - right;
  }

  return String(left).localeCompare(String(right), "pt-BR", {
    numeric: true,
    sensitivity: "base",
  });
};

const displayDateOnly = (value: string) =>
  value.split(",")[0]?.trim() || value.split(" ")[0] || value;

const ticketTimeline = (ticket: Ticket) => {
  const timeline = [
    {
      date: ticket.openedAt,
      action: "Ticket criado",
      user: "Sistema",
    },
  ];

  if (ticket.updated && ticket.updated !== ticket.openedAt) {
    timeline.push({
      date: ticket.updated,
      action: FINAL_STATUSES.has(ticket.status)
        ? "Status final registrado"
        : "Ticket atualizado",
      user: ticket.responsible || "Sistema",
    });
  }

  return timeline;
};

const ticketToHistoryTicket = (
  ticket: Ticket,
  allTickets: Ticket[],
): HistoryTicket => ({
  id: ticket.id,
  protocol: ticketDisplayProtocol(ticket),
  sender: ticket.sender,
  cpf: ticket.cpf,
  subject: ticket.subject,
  date: displayDateOnly(ticket.openedAt),
  openedAt: ticket.openedAt,
  updatedAt: ticket.updated,
  channel: ticket.channel,
  dentist: ticket.dentistResponsible || "-",
  status: ticket.status,
  priority: ticket.priority,
  classification: ticket.classification,
  description: ticket.description || ticket.subject,
  responsible: ticket.responsible,
  phone: ticket.phone,
  email: ticket.email,
  location: ticket.location,
  procedureDescription: ticket.procedureDescription,
  medications: ticket.medications,
  surgeryHistory: ticket.surgeryHistory,
  timeline: ticketTimeline(ticket),
  relatedTickets: allTickets
    .filter(
      (candidate) =>
        candidate.id !== ticket.id &&
        candidate.cpf &&
        candidate.cpf !== "-" &&
        candidate.cpf === ticket.cpf,
    )
    .map((candidate) => ({
      id: candidate.id,
      protocol: ticketDisplayProtocol(candidate),
      subject: candidate.subject,
      date: displayDateOnly(candidate.openedAt),
      status: candidate.status,
    })),
});

type SortableHeaderProps = {
  label: string;
  column: SortKey;
  widthClass: string;
  sortConfig: SortConfig;
  onSort: (column: SortKey) => void;
};

const SortableHeader = ({
  label,
  column,
  widthClass,
  sortConfig,
  onSort,
}: SortableHeaderProps) => {
  const isActive = sortConfig?.key === column;
  const Icon = isActive
    ? sortConfig.direction === "asc"
      ? ArrowUp
      : ArrowDown
    : ArrowUpDown;
  const ariaSort = isActive
    ? sortConfig.direction === "asc"
      ? "ascending"
      : "descending"
    : "none";

  return (
    <TableHead
      className={cn(widthClass, "p-0 text-center")}
      aria-sort={ariaSort}
    >
      <button
        type="button"
        className="inline-flex h-10 w-full items-center justify-center gap-1.5 px-2 text-center text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => onSort(column)}
      >
        <span className="truncate">{label}</span>
        <Icon
          className={cn("h-3.5 w-3.5 shrink-0", isActive && "text-foreground")}
        />
      </button>
    </TableHead>
  );
};

export default function History() {
  const { tickets: globalTickets, loading, updateTicket } = useTickets();
  const [search, setSearch] = useState("");
  const [channelFilter, setChannelFilter] = useState<ChannelFilterValue>("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const historyTickets = useMemo(
    () =>
      globalTickets
        .filter((ticket) => FINAL_STATUSES.has(ticket.status))
        .map((ticket) => ticketToHistoryTicket(ticket, globalTickets)),
    [globalTickets],
  );

  const selected = useMemo(
    () =>
      selectedId
        ? historyTickets.find((ticket) => ticket.id === selectedId) || null
        : null,
    [historyTickets, selectedId],
  );

  const defaultSorted = useMemo(
    () =>
      [...historyTickets].sort(
        (a, b) => parseSortableDate(b.openedAt) - parseSortableDate(a.openedAt),
      ),
    [historyTickets],
  );

  const filtered = defaultSorted.filter((ticket) => {
    const selectedChannel = CHANNEL_FILTER_OPTIONS.find(
      (option) => option.value === channelFilter,
    );
    const matchSearch =
      ticket.sender.toLowerCase().includes(search.toLowerCase()) ||
      ticket.protocol.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase());
    const matchChannel =
      channelFilter === "all" ||
      Boolean(
        selectedChannel &&
          matchesChannelOption(ticket.channel, selectedChannel),
      );
    return matchSearch && matchChannel;
  });

  const sorted = useMemo(() => {
    if (!sortConfig) return filtered;

    return [...filtered].sort((left, right) => {
      const result = compareSortValues(
        sortValueForHistoryTicket(left, sortConfig.key),
        sortValueForHistoryTicket(right, sortConfig.key),
      );
      return sortConfig.direction === "asc" ? result : -result;
    });
  }, [filtered, sortConfig]);

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleSort = (column: SortKey) => {
    setSortConfig((current) => ({
      key: column,
      direction:
        current?.key === column && current.direction === "asc" ? "desc" : "asc",
    }));
    setPage(1);
  };

  const handleRevert = async (ticketId: string) => {
    try {
      await updateTicket(ticketId, { status: "Aberto" });
      toast.success("Ticket revertido para status Aberto");
      setSelectedId(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao reverter ticket",
      );
    }
  };

  if (selected) {
    return (
      <div className="p-6 space-y-5 animate-fade-in">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setSelectedId(null)}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar para Histórico
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRevert(selected.id)}
          >
            <RotateCcw className="w-4 h-4 mr-1" /> Reverter para Ativo
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-xl font-display font-bold">
            {selected.protocol}
          </h1>
          <Badge variant="secondary">{selected.status}</Badge>
          <Badge variant="outline">{selected.priority}</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4" /> Dados do Remetente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {selected.sender
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold">{selected.sender}</p>
                  <p className="text-xs text-muted-foreground">
                    {selected.classification}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">CPF/CNPJ</p>
                  <p className="font-medium">{selected.cpf}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Telefone</p>
                  <p className="font-medium">{selected.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">E-mail</p>
                  <p className="font-medium">{selected.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Localização</p>
                  <p className="font-medium">{selected.location}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Canal</p>
                  <p className="font-medium">{selected.channel}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Abertura</p>
                  <p className="font-medium">{selected.openedAt}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Última atualização
                  </p>
                  <p className="font-medium">{selected.updatedAt}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Responsável</p>
                  <p className="font-medium">{selected.responsible}</p>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">Assunto</p>
                <p className="text-sm font-medium">{selected.subject}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Descrição</p>
                <p className="text-sm">{selected.description}</p>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-5">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" /> Histórico Clínico
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Descrição do Procedimento
                  </Label>
                  <p className="text-sm mt-1">
                    {selected.procedureDescription || (
                      <span className="text-muted-foreground italic">
                        Não informado
                      </span>
                    )}
                  </p>
                </div>
                <Separator />
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Medicamentos Prescritos
                  </Label>
                  <p className="text-sm mt-1">
                    {selected.medications || (
                      <span className="text-muted-foreground italic">
                        Não informado
                      </span>
                    )}
                  </p>
                </div>
                <Separator />
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Histórico de Cirurgias / Intervenções
                  </Label>
                  <p className="text-sm mt-1">
                    {selected.surgeryHistory || (
                      <span className="text-muted-foreground italic">
                        Não informado
                      </span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Linha do Tempo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />
                  <div className="space-y-4">
                    {selected.timeline.map((item, index) => (
                      <div
                        key={`${item.date}-${index}`}
                        className="flex items-start gap-3 relative"
                      >
                        <div
                          className={`w-4 h-4 rounded-full shrink-0 z-10 ${
                            index === selected.timeline.length - 1
                              ? "bg-success"
                              : "bg-primary"
                          } flex items-center justify-center`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-background" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{item.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.date} · {item.user}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Visão 360° do Paciente -
                  Todos os Atendimentos ({selected.relatedTickets.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selected.relatedTickets.length > 0 ? (
                  <div className="space-y-2">
                    {selected.relatedTickets.map((related) => {
                      const fullTicket = historyTickets.find(
                        (historyTicket) => historyTicket.id === related.id,
                      );
                      return (
                        <button
                          key={related.id}
                          className="w-full flex items-center justify-between px-3 py-2.5 bg-muted/50 hover:bg-accent rounded-md transition-colors text-left"
                          onClick={() =>
                            fullTicket && setSelectedId(fullTicket.id)
                          }
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-mono text-xs text-muted-foreground">
                              {related.protocol}
                            </span>
                            <span className="text-sm truncate">
                              {related.subject}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs text-muted-foreground">
                              {related.date}
                            </span>
                            <Badge variant="secondary" className="text-[10px]">
                              {related.status}
                            </Badge>
                            <ChevronRight className="w-3 h-3 text-muted-foreground" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum atendimento anterior vinculado
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold">Histórico</h1>
        <p className="text-sm text-muted-foreground">
          Tickets finalizados e arquivados
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, ID ou assunto..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
        <Select
          value={selectFilterValue(channelFilter)}
          onValueChange={(value) => {
            setChannelFilter(value as ChannelFilterValue);
            setPage(1);
          }}
        >
          <SelectTrigger className={FILTER_SELECT_CLASS}>
            <SelectValue placeholder="Canal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {CHANNEL_FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {channelFilter !== "all" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setChannelFilter("all");
              setPage(1);
            }}
          >
            Limpar filtros
          </Button>
        )}
      </div>

      <div className="border border-border rounded-lg shadow-sm max-h-[calc(100vh-18rem)] overflow-auto [&>div]:overflow-visible">
        <Table className="min-w-[1200px] table-fixed">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <SortableHeader
                label="ID"
                column="id"
                widthClass="w-[160px]"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <SortableHeader
                label="Canal"
                column="channel"
                widthClass="w-[84px]"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <SortableHeader
                label="Remetente"
                column="sender"
                widthClass="w-[180px]"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <SortableHeader
                label="Assunto"
                column="subject"
                widthClass="w-[240px]"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <SortableHeader
                label="Classificação"
                column="classification"
                widthClass="w-[132px]"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <SortableHeader
                label="Prioridade"
                column="priority"
                widthClass="w-[112px]"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <SortableHeader
                label="Status"
                column="status"
                widthClass="w-[152px]"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <SortableHeader
                label="Data"
                column="date"
                widthClass="w-[140px]"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <TableHead className="w-12 text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((ticket) => {
              const channelLabel = ticketChannelLabel(ticket.channel);
              const ChIcon = channelIcon[channelLabel] || MoreHorizontal;
              const chColor =
                channelColors[channelLabel] || "text-muted-foreground";
              return (
                <TableRow
                  key={ticket.id}
                  className="cursor-pointer hover:bg-accent/60 transition-colors"
                  onClick={() => setSelectedId(ticket.id)}
                >
                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    {ticket.protocol}
                  </TableCell>
                  <TableCell
                    className="text-center"
                    title={channelLabel}
                    aria-label={channelLabel}
                  >
                    <ChIcon className={cn("mx-auto w-4 h-4", chColor)} />
                  </TableCell>
                  <TableCell
                    className="font-medium text-xs truncate"
                    title={ticket.sender}
                  >
                    {ticket.sender}
                  </TableCell>
                  <TableCell className="text-xs">
                    <span
                      className="block max-w-[208px] truncate"
                      title={ticket.subject}
                    >
                      {ticket.subject}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="text-xs min-w-[80px] flex items-center justify-center text-center"
                    >
                      {ticket.classification}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center justify-center text-xs font-medium px-2.5 py-0.5 rounded-full min-w-[72px]",
                        priorityClasses[ticket.priority] ||
                          "bg-muted text-muted-foreground",
                      )}
                    >
                      {ticket.priority}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs truncate" title={ticket.status}>
                    {ticket.status}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {ticket.date}
                  </TableCell>
                  <TableCell>
                    <button
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRevert(ticket.id);
                      }}
                      title="Reverter para ativo"
                      aria-label="Reverter para ativo"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
            {paginated.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-8 text-muted-foreground"
                >
                  {loading
                    ? "Carregando histórico..."
                    : "Nenhum resultado encontrado"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setPage(Math.max(1, page - 1));
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={page === index + 1}
                  onClick={(event) => {
                    event.preventDefault();
                    setPage(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setPage(Math.min(totalPages, page + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
