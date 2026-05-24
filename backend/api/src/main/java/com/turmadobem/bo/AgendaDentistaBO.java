package com.turmadobem.bo;

import com.turmadobem.dao.AgendaDentistaDAO;
import com.turmadobem.dto.LinkAidDtos;
import com.turmadobem.exception.BusinessException;
import com.turmadobem.exception.NotFoundException;
import com.turmadobem.model.AgendaDentista;
import com.turmadobem.model.Dentista;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class AgendaDentistaBO {
    private static final Set<String> STATUS_VALIDOS = Set.of("DISPONIVEL", "RESERVADO", "CANCELADO");

    @Inject
    AgendaDentistaDAO agendaDentistaDAO;

    @Inject
    DentistaBO dentistaBO;

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<LinkAidDtos.AgendaDentistaResponse> listar(Long idDentista, String statusAgenda) {
        return agendaDentistaDAO.pesquisar(idDentista, statusAgenda).stream()
                .map(ApiMapper::agendaDentista)
                .toList();
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public LinkAidDtos.AgendaDentistaResponse buscar(Long id) {
        return ApiMapper.agendaDentista(buscarEntidade(id));
    }

    @Transactional
    public LinkAidDtos.AgendaDentistaResponse criar(LinkAidDtos.AgendaDentistaRequest request) {
        AgendaDentista agenda = new AgendaDentista();
        agenda.setDentista(dentistaBO.buscarDentistaAtivo(request.idDentista()));
        agenda.setDataHoraInicio(request.dataHoraInicio());
        agenda.setDataHoraFim(request.dataHoraFim());
        agenda.setStatusAgenda(normalizarStatus(request.statusAgenda()));
        agenda.setObservacao(normalizarObservacao(request.observacao()));

        validarAgenda(agenda);
        agendaDentistaDAO.persist(agenda);
        return ApiMapper.agendaDentista(agenda);
    }

    @Transactional
    public LinkAidDtos.AgendaDentistaResponse atualizar(Long id, LinkAidDtos.AgendaDentistaUpdateRequest request) {
        AgendaDentista agenda = buscarEntidade(id);
        if (request.idDentista() != null) {
            agenda.setDentista(dentistaBO.buscarDentistaAtivo(request.idDentista()));
        }
        if (request.dataHoraInicio() != null) {
            agenda.setDataHoraInicio(request.dataHoraInicio());
        }
        if (request.dataHoraFim() != null) {
            agenda.setDataHoraFim(request.dataHoraFim());
        }
        if (request.statusAgenda() != null) {
            agenda.setStatusAgenda(normalizarStatus(request.statusAgenda()));
        }
        if (request.observacao() != null) {
            agenda.setObservacao(normalizarObservacao(request.observacao()));
        }

        validarAgenda(agenda);
        return ApiMapper.agendaDentista(agenda);
    }

    @Transactional
    public LinkAidDtos.AgendaDentistaResponse atualizarStatus(Long id, String statusAgenda) {
        AgendaDentista agenda = buscarEntidade(id);
        agenda.setStatusAgenda(normalizarStatus(statusAgenda));
        validarAgenda(agenda);
        return ApiMapper.agendaDentista(agenda);
    }

    @Transactional
    public void remover(Long id) {
        AgendaDentista agenda = buscarEntidade(id);
        agendaDentistaDAO.delete(agenda);
    }

    AgendaDentista buscarEntidade(Long id) {
        AgendaDentista agenda = agendaDentistaDAO.findById(id);
        if (agenda == null) {
            throw new NotFoundException("Agenda do dentista nao encontrada.");
        }
        return agenda;
    }

    private void validarAgenda(AgendaDentista agenda) {
        validarPeriodo(agenda.getDataHoraInicio(), agenda.getDataHoraFim());
        Dentista dentista = agenda.getDentista();
        if (dentista == null || dentista.getIdDentista() == null) {
            throw new BusinessException("Dentista da agenda e obrigatorio.");
        }
        if ("CANCELADO".equals(agenda.getStatusAgenda())) {
            return;
        }
        boolean conflito = agendaDentistaDAO.existeConflito(
                dentista.getIdDentista(),
                agenda.getDataHoraInicio(),
                agenda.getDataHoraFim(),
                agenda.getIdAgendaDentista()
        );
        if (conflito) {
            throw new BusinessException("Ja existe agenda ativa para este dentista no periodo informado.");
        }
    }

    private void validarPeriodo(LocalDateTime inicio, LocalDateTime fim) {
        if (inicio == null || fim == null) {
            throw new BusinessException("Inicio e fim da agenda sao obrigatorios.");
        }
        if (!fim.isAfter(inicio)) {
            throw new BusinessException("Fim da agenda deve ser posterior ao inicio.");
        }
    }

    private String normalizarStatus(String status) {
        String valor = status == null || status.isBlank() ? "DISPONIVEL" : status.trim().toUpperCase();
        if (!STATUS_VALIDOS.contains(valor)) {
            throw new BusinessException("Status da agenda deve ser DISPONIVEL, RESERVADO ou CANCELADO.");
        }
        return valor;
    }

    private String normalizarObservacao(String observacao) {
        String texto = observacao == null || observacao.isBlank() ? null : observacao.trim();
        if (texto != null && texto.length() > 300) {
            throw new BusinessException("Observacao da agenda deve ter ate 300 caracteres.");
        }
        return texto;
    }
}
