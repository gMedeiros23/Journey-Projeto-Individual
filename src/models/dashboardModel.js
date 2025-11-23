var database = require("../database/config");


function score(idUsuario) {
    var instrucaoSql = `SELECT
                        COUNT(DISTINCT c.id_curtidas) AS totalcurtidas,
                        COUNT(DISTINCT cp.id_comentarios_postagem) AS totalcomentarios
                        FROM usuario u
                        LEFT JOIN postagem p
                        ON p.fkusuario = u.id_usuario
                        LEFT JOIN curtidas c
                        ON c.fkpostagem = p.id_postagem
                        LEFT JOIN comentarios_postagem cp
                        ON cp.fkpostagem = p.id_postagem
                        WHERE u.id_usuario = ${idUsuario} AND p.data >= NOW() - 2592000`;

    return database.executar(instrucaoSql);
}

function engajamento(idUsuario) {
    var instrucaoSql = `SELECT DATE_FORMAT(p.data, '%d/%m') as data,
                        COUNT(DISTINCT p.id_postagem) as totalpostagem,
                        COUNT(DISTINCT c.id_curtidas) as totalcurtidas,
                        COUNT(DISTINCT cp.id_comentarios_postagem) as totalcomentarios
                        FROM usuario u
                        LEFT JOIN postagem p ON p.fkusuario = u.id_usuario
                        LEFT JOIN comentarios_postagem cp ON cp.fkpostagem = p.id_postagem
                        LEFT JOIN curtidas c ON c.fkpostagem = p.id_postagem
                        WHERE u.id_usuario = ${idUsuario}
                        GROUP BY DATE_FORMAT(p.data, '%d/%m')`;

    return database.executar(instrucaoSql);
}

module.exports = {
    score,
    engajamento
};