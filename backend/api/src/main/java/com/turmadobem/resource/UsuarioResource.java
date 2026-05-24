package com.turmadobem.resource;

import com.turmadobem.bo.UsuarioBO;
import com.turmadobem.dto.LinkAidDtos;
import com.turmadobem.security.AuthenticatedAccess;
import com.turmadobem.security.RoleRequired;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
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

@Path("/usuarios")
@AuthenticatedAccess
@RoleRequired({"ADMIN", "COLABORADOR"})
@SecurityRequirement(name = "bearerAuth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UsuarioResource {
    @Inject
    UsuarioBO usuarioBO;

    @GET
    public List<LinkAidDtos.UsuarioResponse> listar(@QueryParam("ativos") @DefaultValue("true") boolean ativos) {
        return usuarioBO.listar(ativos);
    }

    @GET
    @Path("/{id}")
    public LinkAidDtos.UsuarioResponse buscar(@PathParam("id") Long id) {
        return usuarioBO.buscar(id);
    }

    @POST
    @RoleRequired({"ADMIN"})
    public Response criar(@Valid LinkAidDtos.UsuarioCreateRequest request) {
        return Response.status(Response.Status.CREATED)
                .entity(usuarioBO.criar(request))
                .build();
    }

    @PUT
    @Path("/{id}")
    @RoleRequired({"ADMIN"})
    public LinkAidDtos.UsuarioResponse atualizar(@PathParam("id") Long id,
                                                 @Valid LinkAidDtos.UsuarioUpdateRequest request) {
        return usuarioBO.atualizar(id, request);
    }

    @DELETE
    @Path("/{id}")
    @RoleRequired({"ADMIN"})
    public Response desativar(@PathParam("id") Long id) {
        usuarioBO.desativar(id);
        return Response.noContent().build();
    }
}
