var database = require("../database/config");

function listar() {
    var instrucaoSql = `SELECT 
    u.nome,  
    p.conteudo AS postagem_conteudo, 
    p.data AS postagem_data, 
    COUNT(DISTINCT cp.id_comentarios_postagem) AS quantidade_comentarios,  
    COUNT(c.id_curtidas) AS quantidade_curtidas
    FROM usuario u
    JOIN postagem p ON p.fkusuario = u.id_usuario
    JOIN comentarios_postagem cp ON cp.fkpostagem = p.id_postagem
    JOIN curtidas c ON c.fkpostagem = p.id_postagem
    GROUP BY p.id_postagem, u.nome, p.conteudo, p.data
    ORDER BY p.data
    LIMIT 5;`;

    return database.executar(instrucaoSql);
}

module.exports = {
    listar
}