from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import (
    Integer,
    String,
    Date,
    DECIMAL,
    Boolean,
    TIMESTAMP,
    text
)

from sqlalchemy.orm import Mapped, mapped_column

from database.base import Base


class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    nombre: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    nombre_usuario: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        unique=True
    )

    correo: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True
    )

    password: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    telefono: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        unique=True
    )

    fecha_nacimiento: Mapped[date] = mapped_column(
        Date,
        nullable=False
    )

    peso: Mapped[Decimal] = mapped_column(
        DECIMAL(5, 2),
        nullable=False
    )

    estatura: Mapped[Decimal] = mapped_column(
        DECIMAL(3, 2),
        nullable=False
    )

    verificado: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        server_default=text("0")
    )

    foto_perfil: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    biografia: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    fecha_registro: Mapped[datetime] = mapped_column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )
