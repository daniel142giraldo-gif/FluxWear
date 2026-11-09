from datetime import datetime

from sqlalchemy import (
    Integer,
    String,
    DateTime,
    TIMESTAMP,
    ForeignKey,
    Enum,
    text
)

from sqlalchemy.orm import Mapped, mapped_column

from database.base import Base

class Verificacion(Base):
    __tablename__="verificaciones"

    id_verificacion: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    id_usuario: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("usuarios.id_usuario", ondelete="CASCADE"),
        nullable=False
    )

    red_social: Mapped[str] = mapped_column(
        Enum(
            "instagram",
            "tiktok",
            "youtube",
            "facebook",
            "x",
            "otra",
            name="red_social"
        ),
        nullable=False
    )

    enlace_perfil: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    seguidores_externos: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    estado: Mapped[str] = mapped_column(
        Enum(
            "pendiente",
            "aprobada",
            "rechazada",
            name="estado_verificacion"
        ),
        nullable=False,
        server_default=text("'pendiente'")
    )

    motivo_rechazo: Mapped[str | None] = mapped_column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )

    fecha_respuesta: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True
    )