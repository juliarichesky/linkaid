import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useTickets, type Ticket } from "@/contexts/TicketsContext";
import { CANAL_LABELS } from "@/lib/linkaidMappings";

type Period = "weekly" | "monthly" | "yearly";

const periodLabels: Record<Period, string> = {
  weekly: "Semanal",
  monthly: "Mensal",
  yearly: "Anual",
};

const chartColors = [
  "hsl(214, 80%, 52%)",
  "hsl(142, 71%, 45%)",
  "hsl(40, 96%, 53%)",
  "hsl(0, 72%, 51%)",
  "hsl(280, 60%, 55%)",
  "hsl(188, 78%, 41%)",
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
  return channel || "Sem canal";
};

const parseTicketDate = (value: string) => {
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
    );
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const isDateInPeriod = (date: Date, period: Period) => {
  const today = new Date();
  if (period === "weekly") {
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    return date >= sevenDaysAgo && date <= today;
  }
  if (period === "monthly") {
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth()
    );
  }
  return date.getFullYear() === today.getFullYear();
};

const isTicketInPeriod = (ticket: Ticket, period: Period) => {
  const openedAt = parseTicketDate(ticket.openedAt);
  return openedAt ? isDateInPeriod(openedAt, period) : false;
};

const countBy = <T,>(items: T[], getKey: (item: T) => string) => {
  const counts = new Map<string, number>();
  items.forEach((item) => {
    const key = getKey(item);
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return counts;
};

const escapeCsv = (value: string | number) => {
  const text = String(value).replace(/"/g, '""');
  return `"${text}"`;
};

export default function Reports() {
  const [period, setPeriod] = useState<Period>("monthly");
  const { tickets, contacts, dentists, loading, error } = useTickets();

  const periodTickets = useMemo(
    () => tickets.filter((ticket) => isTicketInPeriod(ticket, period)),
    [tickets, period],
  );

  const periodContacts = useMemo(
    () =>
      contacts.filter((contact) => {
        if (!contact.registrationDate) return false;
        const createdAt = parseTicketDate(contact.registrationDate);
        return createdAt ? isDateInPeriod(createdAt, period) : false;
      }),
    [contacts, period],
  );

  const channelData = useMemo(() => {
    const counts = countBy(periodTickets, (ticket) =>
      ticketChannelLabel(ticket.channel),
    );
    return Array.from(counts.entries())
      .sort((left, right) => right[1] - left[1])
      .map(([channel, count]) => ({ channel, count }));
  }, [periodTickets]);

  const classificationData = useMemo(() => {
    const counts = countBy(
      periodTickets,
      (ticket) => ticket.classification || "Sem classificação",
    );
    return Array.from(counts.entries())
      .sort((left, right) => right[1] - left[1])
      .map(([name, value], index) => ({
        name,
        value,
        color: chartColors[index % chartColors.length],
      }));
  }, [periodTickets]);

  const kpis = useMemo(
    () => [
      { label: "Tickets no período", value: String(periodTickets.length) },
      { label: "Contatos cadastrados", value: String(periodContacts.length) },
      {
        label: "Dentistas ativos",
        value: String(dentists.filter((dentist) => dentist.status === "Ativo").length),
      },
      {
        label: "Em atendimento",
        value: String(
          periodTickets.filter((ticket) =>
            ["Aberto", "Aguardando", "Em atendimento"].includes(ticket.status),
          ).length,
        ),
      },
    ],
    [dentists, periodContacts.length, periodTickets],
  );

  const hasChannelData = channelData.some((item) => item.count > 0);
  const hasClassificationData = classificationData.some(
    (item) => item.value > 0,
  );

  const handleExport = () => {
    const rows: (string | number)[][] = [
      ["Relatórios", periodLabels[period]],
      ...kpis.map((item) => [item.label, item.value]),
      [],
      ["Volume por canal"],
      ["Canal", "Quantidade"],
      ...channelData.map((item) => [item.channel, item.count]),
      [],
      ["Distribuição por classificação"],
      ["Classificação", "Quantidade"],
      ...classificationData.map((item) => [item.name, item.value]),
    ];

    const csv = rows.map((row) => row.map(escapeCsv).join(";")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `relatorios-${period}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold">Relatórios</h1>
          <p className="text-sm text-muted-foreground">
            Análise e métricas de atendimento - período{" "}
            {periodLabels[period].toLowerCase()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={loading || !!error}
          >
            <Download className="w-4 h-4 mr-2" /> Exportar
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <p className="text-xl font-display font-bold mt-1">
                {loading ? "--" : kpi.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Volume por Canal - {periodLabels[period]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={channelData}>
                <XAxis
                  dataKey="channel"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--card))",
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="hsl(214, 80%, 52%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            {!loading && !hasChannelData && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Nenhum ticket cadastrado neste período.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Distribuição por Classificação - {periodLabels[period]}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {hasClassificationData ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={classificationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {classificationData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 mt-2">
                  {classificationData.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: item.color }}
                      />
                      <span className="text-[11px] text-muted-foreground">
                        {item.name} ({item.value})
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground text-center">
                {loading
                  ? "Carregando classificações..."
                  : "Nenhum ticket cadastrado neste período."}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
