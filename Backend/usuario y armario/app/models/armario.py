from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DECIMAL,
    TIMESTAMP,
    ForeignKey,
    text
)

from app.database import Base

class CategoriaPrenda(Base):
    __tablename__ = "categorias_prenda"

    id_categoria = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    nombre = Column(String(40), nullable=False, unique=True)

class Estilo(Base):
    __tablename__ = "estilos"

    id_estilos = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    nombre = Column(String(40), nullable=False, unique=True)

class Temporada(Base):
    __tablename__ = "temporadas"

    id_temporada = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )    
            
    nombre = Column(String(40), nullable=False, unique=True)

class Prenda(Base):
    __tablename__ = "prendas"

    id_prenda = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )    
            
    id_usuario = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        nullable=False
    )    
            
    id_categoria = Column(
        Integer,
        ForeignKey("categorias_prenda.id_categoria"),
        nullable=False
    )    
            
    nombre = Column(String(80), nullable=False)
    color = Column(String(30), nullable=True)
    marca = Column(String(50), nullable=True)
    talla = Column(String(10), nullable=True)
    imagen = Column(String(255), nullable=True)

    fecha = Column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    ) 

class PrendaTemporada(Base):
    __tablename__ = "prenda_temporadas"

    id_prenda = Column(
        Integer,
        ForeignKey("prendas.id_prenda"),
        primary_key=True
    )    
            
    id_temporada = Column(
        Integer,
        ForeignKey("temporadas.id_temporadas"),
        primary_key=True
    )    
            
class UsuarioEstilos(Base):
    __tablename__ = "usuario_estilos"

    id_usuario = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        primary_key=True
    )    
            
    id_estilos = Column(
        Integer,
        ForeignKey("usuarios.id_estilos"),
        primary_key=True
    )    
            
