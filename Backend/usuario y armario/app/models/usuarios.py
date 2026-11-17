from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DECIMAL,
    Boolean,
    TIMESTAMP,
    Enum,
    text
)

from app.database import Base


class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    nombre = Column(String(50), nullable=False)
    nombre_usuario = Column(String(50), nullable=False, unique=True)
    correo = Column(String(100), nullable=False, unique=True)
    password = Column(String(255), nullable=False)

    telefono = Column(String(20), nullable=True, unique=True)
    fecha_nacimiento = Column(Date, nullable=True)
    peso = Column(DECIMAL(5, 2), nullable=True)
    estatura = Column(DECIMAL(3, 2), nullable=True)

    verificado = Column(
        Boolean,
        nullable=False,
        server_default=text("0")
    )

    foto_perfil = Column(String(255), nullable=True)
    biografia = Column(String(255), nullable=True)

    fecha_registro = Column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )

    rol = Column(
        Enum("usuario", "admin", name="rol_usuario_enum"),
        nullable=False,
        server_default=text("'usuario'")
    )
