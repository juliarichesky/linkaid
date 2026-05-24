package com.turmadobem.bo;

import com.turmadobem.dao.PerfilDAO;
import com.turmadobem.dao.UsuarioDAO;
import com.turmadobem.dto.LinkAidDtos;
import com.turmadobem.exception.BusinessException;
import com.turmadobem.exception.NotFoundException;
import com.turmadobem.model.Perfil;
import com.turmadobem.model.Usuario;
import com.turmadobem.security.PasswordService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class UsuarioBO {
    private static final Set<String> STATUS_VALIDOS = Set.of("A", "I");

    @Inject
    UsuarioDAO usuarioDAO;

    @Inject
    PerfilDAO perfilDAO;

    @Inject
    PasswordService passwordService;

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<LinkAidDtos.UsuarioResponse> listar(boolean apenasAtivos) {
        return usuarioDAO.listarOrdenado(apenasAtivos).stream()
                .map(ApiMapper::usuario)
                .toList();
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public LinkAidDtos.UsuarioResponse buscar(Long id) {
        return ApiMapper.usuario(buscarEntidade(id));
    }

    @Transactional
    public LinkAidDtos.UsuarioResponse criar(LinkAidDtos.UsuarioCreateRequest request) {
        Usuario usuario = new Usuario();
        preencherNovo(usuario, request);
        usuario.setDataCriacao(LocalDateTime.now());
        usuarioDAO.persist(usuario);
        return ApiMapper.usuario(usuario);
    }

    @Transactional
    public LinkAidDtos.UsuarioResponse atualizar(Long id, LinkAidDtos.UsuarioUpdateRequest request) {
        Usuario usuario = buscarEntidade(id);
        preencherAtualizacao(usuario, request);
        return ApiMapper.usuario(usuario);
    }

    @Transactional
    public void desativar(Long id) {
        Usuario usuario = buscarEntidade(id);
        validarNaoRemoveUltimoAdminAtivo(usuario);
        usuario.setStatus("I");
    }

    Usuario buscarEntidade(Long id) {
        Usuario usuario = usuarioDAO.findById(id);
        if (usuario == null) {
            throw new NotFoundException("Usuario nao encontrado.");
        }
        return usuario;
    }

    private void preencherNovo(Usuario usuario, LinkAidDtos.UsuarioCreateRequest request) {
        usuario.setNome(normalizarObrigatorio(request.nome(), "Nome do usuario e obrigatorio."));
        usuario.setEmail(normalizarEmailObrigatorio(request.email()));
        validarEmailUnico(usuario);
        usuario.setSenha(senhaObrigatoria(request.senhaInformada()));
        usuario.setPerfil(buscarPerfil(request.perfilCodigo()));
        usuario.setStatus(normalizarStatus(request.status()));
    }

    private void preencherAtualizacao(Usuario usuario, LinkAidDtos.UsuarioUpdateRequest request) {
        if (request.nome() != null) {
            usuario.setNome(normalizarObrigatorio(request.nome(), "Nome do usuario e obrigatorio."));
        }
        if (request.email() != null) {
            usuario.setEmail(normalizarEmailObrigatorio(request.email()));
            validarEmailUnico(usuario);
        }
        String senha = request.senhaInformada();
        if (senha != null && !senha.isBlank()) {
            usuario.setSenha(passwordService.hash(senha));
        }
        if (request.perfilCodigo() != null) {
            Perfil novoPerfil = buscarPerfil(request.perfilCodigo());
            if (perfilMudandoDeAdmin(usuario, novoPerfil)) {
                validarNaoRemoveUltimoAdminAtivo(usuario);
            }
            usuario.setPerfil(novoPerfil);
        }
        if (request.status() != null) {
            String novoStatus = normalizarStatus(request.status());
            if ("I".equals(novoStatus)) {
                validarNaoRemoveUltimoAdminAtivo(usuario);
            }
            usuario.setStatus(novoStatus);
        }
    }

    private void validarEmailUnico(Usuario usuario) {
        Usuario existente = usuarioDAO.buscarPorEmail(usuario.getEmail());
        if (existente != null && !existente.getIdUsuario().equals(usuario.getIdUsuario())) {
            throw new BusinessException("Ja existe usuario cadastrado com este e-mail.");
        }
    }

    private Perfil buscarPerfil(String codigo) {
        Perfil perfil = perfilDAO.buscarPorCodigo(codigo);
        if (perfil == null) {
            throw new BusinessException("Perfil de usuario invalido.");
        }
        return perfil;
    }

    private void validarNaoRemoveUltimoAdminAtivo(Usuario usuario) {
        String perfilCodigo = usuario.getPerfil() == null ? null : usuario.getPerfil().getCodigo();
        if (!"ADMIN".equals(perfilCodigo) || !"A".equals(usuario.getStatus())) {
            return;
        }
        long outrosAdminsAtivos = usuarioDAO.count("status = ?1 and perfil.codigo = ?2 and idUsuario <> ?3",
                "A", "ADMIN", usuario.getIdUsuario());
        if (outrosAdminsAtivos == 0) {
            throw new BusinessException("Nao e possivel desativar ou remover o ultimo administrador ativo.");
        }
    }

    private boolean perfilMudandoDeAdmin(Usuario usuario, Perfil novoPerfil) {
        String perfilAtual = usuario.getPerfil() == null ? null : usuario.getPerfil().getCodigo();
        String perfilNovo = novoPerfil == null ? null : novoPerfil.getCodigo();
        return "ADMIN".equals(perfilAtual) && !"ADMIN".equals(perfilNovo);
    }

    private String senhaObrigatoria(String senha) {
        String texto = normalizarObrigatorio(senha, "Senha do usuario e obrigatoria.");
        return passwordService.hash(texto);
    }

    private String normalizarStatus(String status) {
        String valor = status == null || status.isBlank() ? "A" : status.trim().toUpperCase();
        if (!STATUS_VALIDOS.contains(valor)) {
            throw new BusinessException("Status do usuario deve ser A ou I.");
        }
        return valor;
    }

    private String normalizarEmailObrigatorio(String email) {
        return normalizarObrigatorio(email, "E-mail do usuario e obrigatorio.").toLowerCase();
    }

    private String normalizarObrigatorio(String valor, String mensagem) {
        String texto = normalizarTexto(valor);
        if (texto == null) {
            throw new BusinessException(mensagem);
        }
        return texto;
    }

    private String normalizarTexto(String valor) {
        return valor == null || valor.isBlank() ? null : valor.trim();
    }
}
