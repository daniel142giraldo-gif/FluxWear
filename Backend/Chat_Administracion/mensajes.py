from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, or_

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
    pagina: int = Query(default=1, ge=1),
    por_pagina: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db)
):

    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuario que realiza la busqueda no encontrado"
        )

    otro = db.query(Usuario).filter(
        Usuario.id_usuario == otro_usuario
    ).first()

    if not otro:
        raise HTTPException(
            status_code=404,
            detail="Usuario de la conversacion no encontrado"
        )

    filtro = (
        (
            (Mensaje.id_emisor == id_usuario) &
            (Mensaje.id_receptor == otro_usuario)
        ) |
        (
            (Mensaje.id_emisor == otro_usuario) &
            (Mensaje.id_receptor == id_usuario)
        )

    )

    total = db.query(Mensaje).filter(filtro).count()

    offset = (pagina - 1) * por_pagina

    mensajes = db.query(Mensaje).filter(
        filtro
    ).order_by(
        Mensaje.fecha.desc(),
        Mensaje.id_mensaje.desc()
    ).offset(
        offset
    ).limit(
        por_pagina
    ).all()

    mensajes.reverse()

    total_paginas = (total + por_pagina - 1) // por_pagina

    return {
        "id_usuario": id_usuario,
        "otro_usuario": otro_usuario,
        "pagina": pagina,
        "por_pagina": por_pagina,
        "total_mensajes": total,
        "total_paginas": total_paginas,
        "hay_mas": pagina < total_paginas,
        "mensajes": mensajes
    }

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

    emisor = db.query(Usuario).filter(
        Usuario.id_usuario == datos.id_emisor
    ).first()
    
    if not emisor:
        raise HTTPException(
            status_code=404,
            detail="Usuario emisor no encontrado"
        )

    nuevo_mensaje = Mensaje(
        id_emisor=datos.id_emisor,
        id_receptor=datos.id_receptor,
        texto=datos.texto
    )

    receptor = db.query(Usuario).filter(
        Usuario.id_usuario == datos.id_receptor
    ).first()

    if not receptor:
        raise HTTPException(
            status_code=404,
            detail="Usuario receptor no encontrado"
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
        Mensaje.leido.is_(False)
    ).count()

    return {
        "id_usuario": id_usuario,
        "mensajes_no_leidos": cantidad
    }

@router.get("/conversaciones/{id_usuario}")
def obtener_conversaciones(
    id_usuario: int,
    pagina: int = Query(default=1, ge=1),
    por_pagina: int = Query(default=10, ge=1, le=100),
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

    # 7. Calcular la paginación
    total = len(conversaciones)

    total_paginas = (total + por_pagina - 1) // por_pagina

    offset = (pagina - 1) * por_pagina

    conversaciones_paginadas = conversaciones[
        offset:offset + por_pagina
    ]

    # 8. Devolver las conversaciones y sus datos de paginación
    return {
        "pagina": pagina,
        "por_pagina": por_pagina,
        "total_conversaciones": total,
        "total_paginas": total_paginas,
        "hay_mas": pagina < total_paginas,
        "conversaciones": conversaciones_paginadas
    }

@router.get("/buscar-usuarios/{id_usuario}")
def buscar_usuarios(
    id_usuario: int,
    q: str,
    db: Session = Depends(get_db)
):

    busqueda = q.strip()

    print("Base de datos:", db.bind.url.database)
    print("Texto recibido:", repr(busqueda))
    
    todos = db.query(Usuario).all()
    
    for u in todos:
        print(u.id_usuario, u.nombre, u.nombre_usuario)

    if not busqueda: 
        raise HTTPException(
            status_code=400,
            detail="Debes escribir un nombre o nombre de usuario"
        )

    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuario que realiza la búsqueda no encontrado"
        )

    usuarios = db.query(Usuario).filter(
        Usuario.id_usuario != id_usuario,
        or_(
            func.lower(Usuario.nombre).like(f"%{busqueda.lower()}%"),
            func.lower(Usuario.nombre_usuario).like(f"%{busqueda.lower()}%")
        )
    ).order_by(
        Usuario.nombre.asc()
    ).limit(20).all()

    return [
        {
            "id_usuario": u.id_usuario,
            "nombre": u.nombre,
            "nombre_usuario": u.nombre_usuario,
            "foto_perfil": u.foto_perfil,

        }
        for u in usuarios
    ]

@router.get("/buscar_mensajes/{id_usuario}/{otro_usuario}", response_model=list[MensajeRespuesta])
def buscar_mensajes(
    id_usuario: int,
    otro_usuario: int,
    q: str,
    db: Session = Depends(get_db)
):

    busqueda = q.strip()

    if not busqueda:
        raise HTTPException(
            status_code=400,
            detail="Debes escribir una palabra o frase para buscar"
        )

    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuario que realiza la busqueda no encontrado"
        )

    otro = db.query(Usuario).filter(
        Usuario.id_usuario == otro_usuario
    ).first()

    if not otro:
        raise HTTPException(
            status_code=404,
            detail="Usuario de la conversacion no encontrado"
        )

    mensajes = db.query(Mensaje).filter(
        (
            (Mensaje.id_emisor == id_usuario) &
            (Mensaje.id_receptor == otro_usuario)
        ) |
        (
            (Mensaje.id_emisor == otro_usuario) &
            (Mensaje.id_receptor == id_usuario)
        ),

        func.lower(Mensaje.texto).like(
            f"%{busqueda.lower()}%"
        )

    ).order_by(
        Mensaje.fecha.desc(),
        Mensaje.id_mensaje.desc()
    ).all()

    return mensajes