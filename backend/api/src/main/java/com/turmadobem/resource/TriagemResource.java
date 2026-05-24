package com.turmadobem.resource;

import com.turmadobem.bo.TriagemBO;
import com.turmadobem.dto.LinkAidDtos;
import com.turmadobem.security.AuthenticatedAccess;
import com.turmadobem.security.RoleRequired;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement;

import java.util.List;

@Path("/triagens")
@AuthenticatedAccess
@RoleRequired({"ADMIN", "COLABORADOR"})
@SecurityRequirement(name = "bearerAuth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TriagemResource {
    @Inject
    TriagemBO triagemBO;

    @GET
    public List<LinkAidDtos.TriagemResponse> listar(@QueryParam("status") String statusTriagem,
                                                    @QueryParam("ticketId") Long idTicket,
                                                    @QueryParam("usuarioResponsavelId") Long idUsuarioResponsavel,
                                                    @QueryParam("dentistaId") Long idDentista) {
        return triagemBO.listar(statusTriagem, idTicket, idUsuarioResponsavel, idDentista);
    }

    @GET
    @Path("/{id}")
    public LinkAidDtos.TriagemResponse buscar(@PathParam("id") Long id) {
        return triagemBO.buscar(id);
    }

    @POST
    public Response criar(@Valid LinkAidDtos.TriagemRequest request) {
        return Response.status(Response.Status.CREATED)
                .entity(triagemBO.criar(request))
                .build();
    }

    @PUT
    @Path("/{id}")
    public LinkAidDtos.TriagemResponse atualizar(@PathParam("id") Long id,
                                                 @Valid LinkAidDtos.TriagemUpdateRequest request) {
        return triagemBO.atualizar(id, request);
    }

    @PUT
    @Path("/{id}/status")
    public LinkAidDtos.TriagemResponse atualizarStatus(@PathParam("id") Long id,
                                                       @Valid LinkAidDtos.TriagemStatusRequest request) {
        return triagemBO.atualizarStatus(id, request.statusTriagem());
    }

    @DELETE
    @Path("/{id}")
    public Response remover(@PathParam("id") Long id) {
        triagemBO.remover(id);
        return Response.noContent().build();
    }
}
