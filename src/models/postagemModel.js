var database = require("../database/config");

function listar() {
    var instrucaoSql = `SELECT
    p.id_postagem as postagem,
    u.foto_perfil as foto,
    u.nome AS nome,
    DATE_FORMAT(p.data,'%d-%b-%Y') as data,
    p.titulo AS titulo,
    p.conteudo AS conteudo,
    p.categoria AS categoria,
    t.nome AS tags,
    COUNT(DISTINCT c.id_curtidas) AS curtidas,
    COUNT(DISTINCT cp.id_comentarios_postagem) AS comentarios
    FROM postagem p
    JOIN usuario u ON p.fkusuario = u.id_usuario
    LEFT JOIN tags_post tp ON tp.fkpostagem = p.id_postagem
    LEFT JOIN tags t ON t.id_tags = tp.fktags 
    LEFT JOIN curtidas c ON c.fkpostagem = p.id_postagem
    LEFT JOIN comentarios_postagem cp ON cp.fkpostagem = p.id_postagem
    GROUP BY p.id_postagem, p.data, p.titulo, p.conteudo, p.categoria, u.nome ,t.nome
    ORDER BY p.data DESC
    LIMIT 10;`;

    return database.executar(instrucaoSql);
}

function listarPostUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");

    var instrucaoSql = `SELECT 
    p.id_postagem as postagem,
    u.foto_perfil as foto,
    u.nome AS nome,
    DATE_FORMAT(p.data,'%d-%b-%Y') as data,
    p.titulo AS titulo,
    p.conteudo AS conteudo,
    p.categoria AS categoria,
    t.nome AS tags,
    COUNT(DISTINCT c.id_curtidas) AS curtidas,
    COUNT(DISTINCT cp.id_comentarios_postagem) AS comentarios
    FROM postagem p
    JOIN usuario u ON p.fkusuario = u.id_usuario
    LEFT JOIN tags_post tp ON tp.fkpostagem = p.id_postagem
    LEFT JOIN tags t ON t.id_tags = tp.fktags 
    LEFT JOIN curtidas c ON c.fkpostagem = p.id_postagem
    LEFT JOIN comentarios_postagem cp ON cp.fkpostagem = p.id_postagem
    WHERE u.id_usuario = ${idUsuario}
    GROUP BY p.id_postagem, u.nome, p.data, p.titulo, p.conteudo, p.categoria, t.nome
    ORDER BY p.data DESC
    LIMIT 10;
`;

    return database.executar(instrucaoSql);
}

function listarComentarios(idPostagem) {
        var instrucaoSql2 = `SELECT u.id_usuario, p.fkUsuario, u.nome, u.foto_perfil as foto, cp.conteudo, DATE_FORMAT(cp.data,'%d-%b-%Y') as data 
        FROM comentarios_postagem cp JOIN usuario u
        ON cp.fkUsuario = u.id_usuario
        JOIN postagem p
        ON cp.fkPostagem = p.id_postagem WHERE p.id_postagem = ${idPostagem} ORDER BY cp.data DESC;`;

    return database.executar(instrucaoSql2);
}

function listarCategorias() {
    var instrucaoSql2 = `SELECT categoria, COUNT(categoria) FROM postagem GROUP BY categoria ORDER BY COUNT(categoria) DESC LIMIT 5;`;

    return database.executar(instrucaoSql2);
}

function listarTags() {
    var instrucaoSql2 = `SELECT nome, COUNT(nome) FROM tags GROUP BY nome ORDER BY COUNT(nome) DESC LIMIT 5;`;

    return database.executar(instrucaoSql2);
}

function cadastrarPost(categoria, tags, titulo, conteudo, id_usuario) {

    database.executar(`
        INSERT INTO postagem (conteudo, data, titulo, categoria, fkusuario) 
        VALUES ('${conteudo}', NOW(), '${titulo}', '${categoria}', ${id_usuario});
    `);


    database.executar(`
        INSERT INTO tags (nome)
        VALUES ('${tags}');
    `);


    database.executar(`
        INSERT INTO tags_post (fkpostagem, fkusuario, fktags)
        VALUES (
            (SELECT id_postagem FROM postagem ORDER BY id_postagem DESC LIMIT 1),
            ${id_usuario},
            (SELECT id_tags FROM tags ORDER BY id_tags DESC LIMIT 1)
        );
    `);
}

function criarComentario(conteudo, id_usuario, idpostagem) {
    var instrucaoSql2 = `INSERT INTO comentarios_postagem (conteudo, data, fkusuario, fkpostagem) VALUES ('${conteudo}', NOW() ,${id_usuario}, ${idpostagem})`;

    return database.executar(instrucaoSql2);
}

function curtir(id_usuario, idpostagem) {
    var instrucaoSql2 = `INSERT INTO curtidas (fkusuario, fkpostagem) VALUES (${id_usuario}, ${idpostagem})`;

    return database.executar(instrucaoSql2);
}

function cadastrarFoto(foto, id_usuario) {
    var instrucaoSql2 = `UPDATE usuario SET foto_perfil = '${foto}' WHERE id_usuario = ${id_usuario}`;

    return database.executar(instrucaoSql2);
}


module.exports = {
    listar,
    cadastrarPost,
    listarCategorias,
    listarTags,
    listarPostUsuario,
    listarComentarios,
    criarComentario,
    curtir,
    cadastrarFoto
}