CREATE DATABASE journey;

USE journey;

CREATE TABLE usuario(
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(200),
email VARCHAR(200) UNIQUE,
senha VARCHAR(200),
foto_perfil VARCHAR(200)
);

CREATE TABLE postagem(
id_postagem INT AUTO_INCREMENT,
conteudo VARCHAR(700),
data DATETIME,
titulo VARCHAR(100),
categoria VARCHAR(100),
fkusuario INT,
PRIMARY KEY(id_postagem, fkusuario),
FOREIGN KEY(fkusuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE comentarios_postagem(
id_comentarios_postagem INT AUTO_INCREMENT,
fkpostagem INT,
fkusuario INT,
conteudo VARCHAR(300),
data DATETIME,
PRIMARY KEY(id_comentarios_postagem, fkpostagem, fkusuario),
FOREIGN KEY(fkpostagem) REFERENCES postagem(id_postagem),
FOREIGN KEY(fkusuario) REFERENCES usuario(id_usuario)
) AUTO_INCREMENT = 1000;

CREATE TABLE curtidas(
id_curtidas INT AUTO_INCREMENT,
fkpostagem INT,
fkusuario INT,
PRIMARY KEY(id_curtidas, fkpostagem, fkusuario),
FOREIGN KEY(fkpostagem) REFERENCES postagem(id_postagem),
FOREIGN KEY(fkusuario) REFERENCES usuario(id_usuario),
CONSTRAINT unq_usuario_post UNIQUE (fkUsuario, fkPostagem)
) AUTO_INCREMENT = 1000;

CREATE TABLE tags(
id_tags INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100)
);

CREATE TABLE tags_post(
	fkpostagem INT,
    fkusuario INT,
    fktags INT,
    PRIMARY KEY(fkpostagem, fkusuario, fktags),
    FOREIGN KEY(fkpostagem) REFERENCES postagem(id_postagem),
	FOREIGN KEY(fkusuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY(fktags) REFERENCES tags(id_tags)
);