import { useMemo, useState } from "react";
import {
  X,
  Send,
  Hash,
  ArrowLeft,
  Users,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/classnames";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTickets, type TeamMember } from "@/contexts/TicketsContext";
import { useAuth } from "@/contexts/AuthContext";

interface TeamPanelProps {
  open: boolean;
  onClose: () => void;
}

type ChatTarget =
  | { type: "person"; name: string }
  | { type: "group"; name: string }
  | null;
type SidebarTab = "channels" | "dms";
type TeamMessage = { from: "me"; text: string; time: string };

const initialsFromName = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const targetKey = (target: ChatTarget) =>
  target ? `${target.type}:${target.name}` : "";

const teamMemberKey = (member: TeamMember) =>
  member.id ? `id:${member.id}` : `name:${member.name}`;

export function TeamPanel({ open, onClose }: TeamPanelProps) {
  const { teamMembers: dbTeamMembers, loading, error } = useTickets();
  const { user } = useAuth();
  const [chatTarget, setChatTarget] = useState<ChatTarget>(null);
  const [message, setMessage] = useState("");
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>("channels");
  const [messagesByTarget, setMessagesByTarget] = useState<
    Record<string, TeamMessage[]>
  >({});

  const teamMembers = useMemo(() => {
    const members = [...dbTeamMembers];
    if (user && !members.some((member) => member.name === user.name)) {
      members.unshift({ name: user.name, role: user.roleLabel });
    }
    return members.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }, [dbTeamMembers, user]);

  const groups = useMemo(() => {
    const roles = teamMembers
      .map((member) => member.role)
      .filter((role): role is string => Boolean(role?.trim()));
    return Array.from(new Set(roles)).sort((a, b) =>
      a.localeCompare(b, "pt-BR"),
    );
  }, [teamMembers]);

  if (!open) return null;

  const currentMessages = messagesByTarget[targetKey(chatTarget)] || [];
  const chatTargetSubtitle =
    chatTarget?.type === "person"
      ? teamMembers.find((member) => member.name === chatTarget.name)?.role
      : `${teamMembers.filter((member) => member.role === chatTarget?.name).length} membros`;

  const handleSend = () => {
    if (!message.trim() || !chatTarget) return;
    const now = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const key = targetKey(chatTarget);
    setMessagesByTarget((current) => ({
      ...current,
      [key]: [
        ...(current[key] || []),
        { from: "me", text: message.trim(), time: now },
      ],
    }));
    setMessage("");
  };

  if (chatTarget) {
    return (
      <aside className="w-80 border-l border-border bg-card h-screen sticky top-0 flex flex-col animate-slide-in-right">
        <div className="flex items-center gap-2 px-4 h-14 border-b border-border bg-muted/30">
          <button
            onClick={() => setChatTarget(null)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {chatTarget.type === "group" ? (
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                <Hash className="w-4 h-4 text-primary" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                {initialsFromName(chatTarget.name)}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">
                {chatTarget.type === "group"
                  ? `# ${chatTarget.name}`
                  : chatTarget.name}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {chatTargetSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Fechar equipe"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin">
          {currentMessages.map((item, index) => (
            <div key={index} className="flex justify-end">
              <div className="max-w-[80%] space-y-0.5">
                <div className="px-3 py-2 rounded-xl rounded-tr-sm text-xs leading-relaxed bg-primary text-primary-foreground">
                  {item.text}
                </div>
                <p className="text-[9px] px-1 text-right text-muted-foreground">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
          {currentMessages.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-8">
              Nenhuma mensagem registrada.
            </p>
          )}
        </div>

        <div className="border-t border-border p-2 bg-muted/20">
          <div className="flex gap-1.5">
            <Input
              placeholder="Escreva uma mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="h-9 text-xs bg-background"
            />
            <Button
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={handleSend}
              disabled={!message.trim()}
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 border-l border-border bg-card h-screen sticky top-0 flex flex-col animate-slide-in-right">
      <div className="flex items-center justify-between px-4 h-14 border-b border-border">
        <h3 className="font-display font-semibold text-sm">Equipe</h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Fechar equipe"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex border-b border-border">
        <button
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors",
            sidebarTab === "channels"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setSidebarTab("channels")}
        >
          <Hash className="w-3.5 h-3.5" /> Perfis
        </button>
        <button
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors",
            sidebarTab === "dms"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setSidebarTab("dms")}
        >
          <MessageSquare className="w-3.5 h-3.5" /> Membros
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-4">
        {error && (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        )}

        {sidebarTab === "channels" ? (
          <>
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                Perfis ({groups.length})
              </p>
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
            </div>

            <div className="space-y-0.5">
              {groups.map((role) => {
                const memberCount = teamMembers.filter(
                  (member) => member.role === role,
                ).length;
                return (
                  <button
                    key={role}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors flex items-center justify-between gap-2"
                    onClick={() => setChatTarget({ type: "group", name: role })}
                  >
                    <span className="inline-flex items-center gap-2 min-w-0">
                      <Hash className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="truncate">{role}</span>
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {memberCount}
                    </span>
                  </button>
                );
              })}
              {groups.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-8">
                  {loading
                    ? "Carregando equipe..."
                    : "Nenhum perfil cadastrado."}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                Membros ({teamMembers.length})
              </p>
              <div className="space-y-0.5">
                {teamMembers.map((member) => (
                  <button
                    key={teamMemberKey(member)}
                    className="flex items-center gap-2.5 w-full px-2 py-2 rounded-md hover:bg-accent transition-colors"
                    onClick={() =>
                      setChatTarget({ type: "person", name: member.name })
                    }
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary shrink-0">
                      {initialsFromName(member.name)}
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-xs font-medium leading-none truncate">
                        {member.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {teamMembers.length === 0 && (
              <>
                <Separator />
                <p className="text-xs text-muted-foreground text-center py-6">
                  {loading
                    ? "Carregando membros..."
                    : "Nenhum membro cadastrado."}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
