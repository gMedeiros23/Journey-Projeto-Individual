var database = require("../database/config");

function listar() {
    var instrucaoSql = `SELECT 
    p.id_postagem,
    u.nome AS nome,
    p.data AS data,
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
    LIMIT 3;`;

    return database.executar(instrucaoSql);
}


async function cadastrarPost(categoria, tags, titulo, conteudo, id_usuario) {
   
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


module.exports = {
    listar,
    cadastrarPost
}