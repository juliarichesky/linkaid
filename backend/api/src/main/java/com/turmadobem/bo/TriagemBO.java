package com.turmadobem.bo;

import com.turmadobem.dao.TriagemDAO;
import com.turmadobem.dto.LinkAidDtos;
import com.turmadobem.exception.BusinessException;
import com.turmadobem.exception.NotFoundException;
import com.turmadobem.model.Contato;
import com.turmadobem.model.Dentista;
import com.turmadobem.model.Ticket;
import com.turmadobem.model.Triagem;
import com.turmadobem.model.Usuario;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class TriagemBO {
    private static final Set<String> STATUS_VALIDOS = Set.of("PENDENTE", "AGENDADA", "REALIZADA", "CANCELADA");

    @Inject
    TriagemDAO triagemDAO;

    @Inject
    TicketBO ticketBO;

    @Inject
    DentistaBO dentistaBO;

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<LinkAidDtos.TriagemResponse> listar(String statusTriagem, Long idTicket,
                                                    Long idUsuarioResponsavel, Long idDentista) {
        return triagemDAO.pesquisar(statusTriagem, idTicket, idUsuarioResponsavel, idDentista).stream()
                .map(ApiMapper::triagem)
                .toList();
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public LinkAidDtos.TriagemResponse buscar(Long id) {
        return ApiMapper.triagem(buscarEntidade(id));
    }

    @Transactional
    public LinkAidDtos.TriagemResponse criar(LinkAidDtos.TriagemRequest request) {
        Ticket ticket = ticketBO.buscarEntidade(request.idTicket());
        Contato contato = ticket.getContato();
        if (contato == null) {
            throw new BusinessException("Ticket sem contato vinculado para triagem.");
        }

        Triagem triagem = new Triagem();
        triagem.setTicket(ticket);
        triagem.setContato(contato);
        triagem.setUsuarioResponsavel(ticketBO.buscarUsuarioAtivo(request.idUsuarioResponsavel()));
        triagem.setDentista(buscarDentistaOpcional(request.idDentista()));
        triagem.setDataHoraTriagem(request.dataHoraTriagem());
        triagem.setStatusTriagem(normalizarStatus(request.statusTriagem()));
        triagem.setDescricaoTriagem(normalizarTexto(request.descricaoTriagem()));

        validarTriagem(triagem);
        sincronizarTicket(ticket, triagem);
        triagemDAO.persist(triagem);
        return ApiMapper.triagem(triagem);
    }

    @Transactional
    public LinkAidDtos.TriagemResponse atualizar(Long id, LinkAidDtos.TriagemUpdateRequest request) {
        Triagem triagem = buscarEntidade(id);
        if (request.idUsuarioResponsavel() != null) {
            triagem.setUsuarioResponsavel(ticketBO.buscarUsuarioAtivo(request.idUsuarioResponsavel()));
        }
        if (request.idDentista() != null) {
            triagem.setDentista(buscarDentistaOpcional(request.idDentista()));
        }
        if (request.dataHoraTriagem() != null) {
            triagem.setDataHoraTriagem(request.dataHoraTriagem());
        }
        if (request.statusTriagem() != null) {
            triagem.setStatusTriagem(normalizarStatus(request.statusTriagem()));
        }
        if (request.descricaoTriagem() != null) {
            triagem.setDescricaoTriagem(normalizarTexto(request.descricaoTriagem()));
        }

        validarTriagem(triagem);
        sincronizarTicket(triagem.getTicket(), triagem);
        return ApiMapper.triagem(triagem);
    }

    @Transactional
    public LinkAidDtos.TriagemResponse atualizarStatus(Long id, String statusTriagem) {
        Triagem triagem = buscarEntidade(id);
        triagem.setStatusTriagem(normalizarStatus(statusTriagem));
        validarTriagem(triagem);
        sincronizarTicket(triagem.getTicket(), triagem);
        return ApiMapper.triagem(triagem);
    }

    @Transactional
    public void remover(Long id) {
        Triagem triagem = buscarEntidade(id);
        triagemDAO.delete(triagem);
    }

    Triagem buscarEntidade(Long id) {
        Triagem triagem = triagemDAO.findById(id);
        if (triagem == null) {
            throw new NotFoundException("Triagem nao encontrada.");
        }
        return triagem;
    }

    private Dentista buscarDentistaOpcional(Long idDentista) {
        return idDentista == null ? null : dentistaBO.buscarDentistaAtivo(idDentista);
    }

    private void validarTriagem(Triagem triagem) {
        if (triagem.getUsuarioResponsavel() == null) {
            throw new BusinessException("Usuario responsavel pela triagem e obrigatorio.");
        }
        if ("AGENDADA".equals(triagem.getStatusTriagem()) && triagem.getDataHoraTriagem() == null) {
            throw new BusinessException("Triagem agendada precisa ter data e hora.");
        }
        if ("REALIZADA".equals(triagem.getStatusTriagem()) && normalizarTexto(triagem.getDescricaoTriagem()) == null) {
            throw new BusinessException("Triagem realizada precisa ter descricao do resultado.");
        }
    }

    private void sincronizarTicket(Ticket ticket, Triagem triagem) {
        if (ticket == null) {
            return;
        }
        Usuario usuario = triagem.getUsuarioResponsavel();
        Dentista dentista = triagem.getDentista();
        if (usuario != null) {
            ticket.setUsuarioResponsavel(usuario);
        }
        if (dentista != null) {
            ticket.setDentistaResponsavel(dentista);
        }
        ticket.setDataAtualizacao(LocalDateTime.now());
    }

    private String normalizarStatus(String status) {
        String valor = status == null || status.isBlank() ? "PENDENTE" : status.trim().toUpperCase();
        if (!STATUS_VALIDOS.contains(valor)) {
            throw new BusinessException("Status da triagem deve ser PENDENTE, AGENDADA, REALIZADA ou CANCELADA.");
        }
        return valor;
    }

    private String normalizarTexto(String valor) {
        return valor == null || valor.isBlank() ? null : valor.trim();
    }
}
