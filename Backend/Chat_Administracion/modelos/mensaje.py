from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import (
    Integer,
    CheckConstraint,
    Index,
    Boolean,
    TIMESTAMP,
    ForeignKey,
    Text,
    text
)

from sqlalchemy.orm import Mapped, mapped_column

from database.base import Base


class Mensaje(Base):
    __tablename__ = "mensajes"

    __table_args__ = (
        CheckConstraint(
            "id_emisor <> id_receptor",
            name="check_emisor_receptor"
        ),
        Index(
            "idx_conversacion",
            "id_emisor",
            "id_receptor",
            "fecha"
        ),
        Index(
            "idx_no_leidos",
            "id_receptor",
            "leido"
        )
    )

    id_mensaje: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    id_emisor: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("usuarios.id_usuario", ondelete="CASCADE"),
        nullable=False
    )

    id_receptor: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("usuarios.id_usuario", ondelete="CASCADE"),
        nullable=False
    )

    texto: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    leido: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        server_default=text("0")
    )

    fecha: Mapped[datetime] = mapped_column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP"),
        nullable=False
    )