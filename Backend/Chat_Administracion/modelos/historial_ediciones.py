from datetime import datetime

from sqlalchemy import (
    Integer,
    Text,
    TIMESTAMP,
    ForeignKey,
    Index,
    text
)

from sqlalchemy.orm import Mapped, mapped_column

from database.base import Base
class HistorialEdicionesMensajes(Base):
    __tablename__ = "historial_ediciones_mensajes"

    __table_args__ = (
        Index(
            "idx_historial_mensaje",
            "id_mensaje",
            "fecha_edicion"
        ),
    )

    id_historial: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    id_mensaje: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("mensajes.id_mensaje", ondelete="CASCADE"),
        nullable=False
    )

    texto_anterior: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )


    fecha_edicion: Mapped[datetime] = mapped_column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )