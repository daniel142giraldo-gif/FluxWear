from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.connection import get_db
from Chat_Administracion.modelos import Mensaje
from Chat_Administracion.schemas.mensaje import (
    MensajeCrear,
    MensajeRespuesta
)

router = APIRouter(
    prefix="/mensajes",
    tags=["Mensajes"]
)

@router.get("/conversacion/{id_usuario}/{otro_usuario}")
def obtener_conversacion(
    id_usuario: int,
    otro_usuario: int,
    db: Session = Depends(get_db)
):
    mensajes = db.query(Mensaje).filter( 
        (
            (Mensaje.id_emisor == id_usuario) &
            (Mensaje.id_receptor == otro_usuario)
        ) |
        (
            (Mensaje.id_emisor == otro_usuario) &
            (Mensaje.id_receptor == id_usuario)
        )
    ).order_by(Mensaje.fecha.asc()).all()

    return mensajes

@router.post("/", response_model=MensajeRespuesta)
def enviar_mensaje(
    datos: MensajeCrear,
    db: Session = Depends(get_db)
):
    if datos.id_emisor == datos.id_receptor:
        raise HTTPException(
            status_code=400,
            detail="No puedes enviarte mensajes a ti mismo"
        )

    nuevo_mensaje = Mensaje(
        id_emisor=datos.id_emisor,
        id_receptor=datos.id_receptor,
        texto=datos.texto
    )

    db.add(nuevo_mensaje)
    db.commit()
    db.refresh(nuevo_mensaje)

    return nuevo_mensaje