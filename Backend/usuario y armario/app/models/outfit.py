from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP,text 
from app.database import Base

class Outfit(Base):
    __tablename__ = "outfits"

    id_outfit = Column(
            Integer,
            primary_key=True,
            autoincrement=True
    )

    id_usuario = Column(
            Integer,
            ForeignKey("usuarios.id_usuario"),
            nullable=False
    )

    id_estilos = Column(
            Integer,
            ForeignKey("estilos.id_estilos"),
            nullable=True
    )

    nombre = Column(String(80), nullable=False)
    ocasion = Column(String(50), nullable=True)
    descripcion = Column(String(255), nullable=True)

    fecha = Column(
        TIMESTAMP,
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )

class OutfitPrenda(Base):
        __tablename__ = "outfit_prendas"

        id_outfit = Column(
            Integer,
            ForeignKey("outfits.id_outfit"),
            primary_key=True
        )

        id_prenda = Column(
            Integer,
            ForeignKey("prendas.id_prenda"),
            primary_key=True
        )



