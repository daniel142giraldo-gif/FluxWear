from datetime import datetime
from sqlalchemy import (
    Integer,
    Boolean,
    TIMESTAMP,
    ForeignKey,
    text
)
from sqlalchemy.orm import Mapped, mapped_column
from database.base import Base

class MensajeUsuario(Base):
    __tablename__ = "mensajes_usuarios"

    id_mensaje: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("mensajes.id_mensaje", ondelete="CASCADE"),
        primary_key=True
    )

    id_usuario: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("usuarios.id_usuario", ondelete="CASCADE"),
        primary_key=True
    )

    oculto: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        server_default=text("0")
    )

    fecha_eliminacion: Mapped[datetime | None] = mapped_column(
        TIMESTAMP,
        nullable=True
    )

    fecha_limite_recuperacion: Mapped[datetime | None] = mapped_column(
        TIMESTAMP,
        nullable=True
    )

    restaurable: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        server_default=("0")
    )