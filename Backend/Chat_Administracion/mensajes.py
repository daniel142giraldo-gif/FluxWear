from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from database.connection import get_db
from Chat_Administracion.modelos import Mensaje, Usuario
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

@router.patch("/{id_mensaje}/leido/{id_usuario}")
def marcar_mensaje_leido(
    id_mensaje: int,
    id_usuario: int,
    db: Session = Depends(get_db)
):
    mensaje = db.query(Mensaje).filter(
        Mensaje.id_mensaje == id_mensaje
    ).first()

    if not mensaje:
        raise HTTPException(
            status_code=404,
            detail="Mensaje no encontrado"
        )

    if mensaje.id_receptor != id_usuario:
        raise HTTPException(
            status_code=403,
            detail="No tienes permiso para marcar este mensaje como leído"
        )

    mensaje.leido = True

    db.commit()
    db.refresh(mensaje)

    return {
        "mensaje": "Mensaje marcado como leído",
        "id_mensaje": mensaje.id_mensaje,
        "leido": mensaje.leido
    }

@router.get("/no-leidos/{id_usuario}", response_model=list[MensajeRespuesta])
def obtener_mensajes_no_leidos(
    id_usuario: int,
    db: Session = Depends(get_db)
):
    mensajes = db.query(Mensaje).filter(
        Mensaje.id_receptor == id_usuario,
        Mensaje.leido.is_(False)
    ).order_by(Mensaje.fecha.asc()).all()

    return mensajes

@router.get("/num_no_leidos/{id_usuario}/cantidad")
def contar_mensajes_no_leidos(
    id_usuario: int,
    db: Session = Depends(get_db)
):
    cantidad = db.query(Mensaje).filter(
        Mensaje.id_receptor == id_usuario,
        Mensaje.leido == False
    ).count()

    return {
        "id_usuario": id_usuario,
        "mensajes_no_leidos": cantidad
    }

@router.get("/conversaciones/{id_usuario}")
def obtener_conversaciones(
    id_usuario: int,
    db: Session = Depends(get_db)
):
    # 1. Verificar que el usuario exista
    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    # 2. Buscar mensajes enviados y recibidos
    mensajes = db.query(Mensaje).filter(
        (Mensaje.id_emisor == id_usuario) |
        (Mensaje.id_receptor == id_usuario)
    ).order_by(
        Mensaje.fecha.desc(),
        Mensaje.id_mensaje.desc()
    ).all()

    # 3. Identificar el último mensaje de cada conversación
    ultimos_mensajes = {}

    for mensaje in mensajes:

        if mensaje.id_emisor == id_usuario:
            id_otro_usuario = mensaje.id_receptor
        else:
            id_otro_usuario = mensaje.id_emisor

        if id_otro_usuario not in ultimos_mensajes:
            ultimos_mensajes[id_otro_usuario] = mensaje

    # 4. Contar los mensajes no leídos por cada usuario
    mensajes_no_leidos = db.query(
        Mensaje.id_emisor,
        func.count(Mensaje.id_mensaje).label("cantidad")
    ).filter(
        Mensaje.id_receptor == id_usuario,
        Mensaje.leido.is_(False)
    ).group_by(
        Mensaje.id_emisor
    ).all()

    conteo_no_leidos = {
        id_emisor: cantidad
        for id_emisor, cantidad in mensajes_no_leidos
    }

    # 5. Obtener los datos de los otros usuarios
    ids_usuarios = list(ultimos_mensajes.keys())

    usuarios = db.query(Usuario).filter(
        Usuario.id_usuario.in_(ids_usuarios)
    ).all()

    usuarios_dict = {
        usuario.id_usuario: usuario
        for usuario in usuarios
    }

    # 6. Construir la lista de conversaciones
    conversaciones = []

    for id_otro_usuario, mensaje in ultimos_mensajes.items():

        otro_usuario = usuarios_dict.get(id_otro_usuario)

        if not otro_usuario:
            continue

        conversaciones.append({
            "id_usuario": otro_usuario.id_usuario,
            "nombre": otro_usuario.nombre,
            "nombre_usuario": otro_usuario.nombre_usuario,
            "foto_perfil": otro_usuario.foto_perfil,
            "ultimo_mensaje": mensaje.texto,
            "fecha": mensaje.fecha,
            "id_mensaje": mensaje.id_mensaje,
            "leido": mensaje.leido,
            "mensajes_no_leidos": conteo_no_leidos.get(
                id_otro_usuario, 0
            )
        })

    return conversaciones
