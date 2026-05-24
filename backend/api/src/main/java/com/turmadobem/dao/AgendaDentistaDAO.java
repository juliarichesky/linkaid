package com.turmadobem.dao;

import com.turmadobem.model.AgendaDentista;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.TypedQuery;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class AgendaDentistaDAO implements PanacheRepository<AgendaDentista> {
    public List<AgendaDentista> pesquisar(Long idDentista, String statusAgenda) {
        StringBuilder jpql = new StringBuilder("1 = 1");
        Map<String, Object> params = new HashMap<>();

        if (idDentista != null) {
            jpql.append(" and dentista.idDentista = :idDentista");
            params.put("idDentista", idDentista);
        }
        if (statusAgenda != null && !statusAgenda.isBlank()) {
            jpql.append(" and upper(statusAgenda) = :statusAgenda");
            params.put("statusAgenda", statusAgenda.trim().toUpperCase());
        }

        return find(jpql.toString(), Sort.ascending("dataHoraInicio"), params).list();
    }

    public boolean existeConflito(Long idDentista, LocalDateTime inicio, LocalDateTime fim, Long idIgnorado) {
        StringBuilder jpql = new StringBuilder("""
                select count(a)
                from AgendaDentista a
                where a.dentista.idDentista = :idDentista
                  and a.statusAgenda <> :statusCancelado
                  and a.dataHoraInicio < :fim
                  and a.dataHoraFim > :inicio
                """);
        if (idIgnorado != null) {
            jpql.append(" and a.idAgendaDentista <> :idIgnorado");
        }

        TypedQuery<Long> query = getEntityManager().createQuery(jpql.toString(), Long.class);
        query.setParameter("idDentista", idDentista);
        query.setParameter("statusCancelado", "CANCELADO");
        query.setParameter("inicio", inicio);
        query.setParameter("fim", fim);
        if (idIgnorado != null) {
            query.setParameter("idIgnorado", idIgnorado);
        }
        return query.getSingleResult() > 0;
    }
}
