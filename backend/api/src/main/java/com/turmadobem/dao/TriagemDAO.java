package com.turmadobem.dao;

import com.turmadobem.model.Triagem;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class TriagemDAO implements PanacheRepository<Triagem> {
    public List<Triagem> pesquisar(String statusTriagem, Long idTicket, Long idUsuarioResponsavel, Long idDentista) {
        StringBuilder jpql = new StringBuilder("1 = 1");
        Map<String, Object> params = new HashMap<>();

        if (statusTriagem != null && !statusTriagem.isBlank()) {
            jpql.append(" and upper(statusTriagem) = :statusTriagem");
            params.put("statusTriagem", statusTriagem.trim().toUpperCase());
        }
        if (idTicket != null) {
            jpql.append(" and ticket.idTicket = :idTicket");
            params.put("idTicket", idTicket);
        }
        if (idUsuarioResponsavel != null) {
            jpql.append(" and usuarioResponsavel.idUsuario = :idUsuarioResponsavel");
            params.put("idUsuarioResponsavel", idUsuarioResponsavel);
        }
        if (idDentista != null) {
            jpql.append(" and dentista.idDentista = :idDentista");
            params.put("idDentista", idDentista);
        }

        return find(jpql.toString(), Sort.descending("dataHoraTriagem"), params).list();
    }
}
