package com.turmadobem.resource;

import com.turmadobem.bo.AgendaDentistaBO;
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

@Path("/agenda-dentistas")
@AuthenticatedAccess
@RoleRequired({"ADMIN", "COLABORADOR"})
@SecurityRequirement(name = "bearerAuth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AgendaDentistaResource {
    @Inject
    AgendaDentistaBO agendaDentistaBO;

    @GET
    public List<LinkAidDtos.AgendaDentistaResponse> listar(@QueryParam("dentistaId") Long idDentista,
                                                           @QueryParam("status") String statusAgenda) {
        return agendaDentistaBO.listar(idDentista, statusAgenda);
    }

    @GET
    @Path("/{id}")
    public LinkAidDtos.AgendaDentistaResponse buscar(@PathParam("id") Long id) {
        return agendaDentistaBO.buscar(id);
    }

    @POST
    public Response criar(@Valid LinkAidDtos.AgendaDentistaRequest request) {
        return Response.status(Response.Status.CREATED)
                .entity(agendaDentistaBO.criar(request))
                .build();
    }

    @PUT
    @Path("/{id}")
    public LinkAidDtos.AgendaDentistaResponse atualizar(@PathParam("id") Long id,
                                                        @Valid LinkAidDtos.AgendaDentistaUpdateRequest request) {
        return agendaDentistaBO.atualizar(id, request);
    }

    @PUT
    @Path("/{id}/status")
    public LinkAidDtos.AgendaDentistaResponse atualizarStatus(@PathParam("id") Long id,
                                                              @Valid LinkAidDtos.AgendaDentistaStatusRequest request) {
        return agendaDentistaBO.atualizarStatus(id, request.statusAgenda());
    }

    @DELETE
    @Path("/{id}")
    public Response remover(@PathParam("id") Long id) {
        agendaDentistaBO.remover(id);
        return Response.noContent().build();
    }
}
