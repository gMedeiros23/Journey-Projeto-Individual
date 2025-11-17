var database = require("../database/config");

function listar() {
    var instrucaoSql = `SELECT 
    u.nome,  
    p.conteudo AS postagem_conteudo, 
    p.data AS postagem_data, 
    cp.conteudo AS comentario_conteudo, 
    cp.data AS comentario_data, 
    COUNT(c.id_curtidas) AS quantidade_curtidas
FROM usuario u
JOIN postagem p ON p.fkusuario = u.id_usuario
LEFT JOIN comentarios_postagem cp ON cp.fkpostagem = p.id_postagem
LEFT JOIN curtidas c ON c.fkpostagem = p.id_postagem
GROUP BY p.id_postagem, cp.id_comentarios_postagem, cp.conteudo, cp.data, u.nome, p.conteudo, p.data
ORDER BY p.data
LIMIT 10;`;

    return database.executar(instrucaoSql);
}

module.exports = {
    listar
}