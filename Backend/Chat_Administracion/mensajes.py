from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, or_, and_
from datetime import datetime, timedelta

from database.connection import get_db
from Chat_Administracion.modelos import (
    Mensaje, 
    Usuario,
    MensajeUsuario,
    HistorialEdicionesMensajes
)
from Chat_Administracion.schemas.mensaje import (
    MensajeCrear,
    MensajeEditar,
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

    consulta = db.query(Mensaje).outerjoin(
        MensajeUsuario,
        and_(
            MensajeUsuario.id_mensaje == Mensaje.id_mensaje,
            MensajeUsuario.id_usuario == id_usuario
        )
    ).filter(
        filtro,
        or_(
            MensajeUsuario.id_mensaje.is_(None),
            MensajeUsuario.oculto.is_(False)
        )
    )

    total = consulta.count()

    offset = (pagina - 1) * por_pagina

    mensajes = consulta.order_by(
        Mensaje.fecha.desc(),
        Mensaje.id_mensaje.desc()
    ).offset(
        offset
    ).limit(
        por_pagina
    ).all()

    mensajes.reverse()

    mensajes_respuesta = []

    for mensaje in mensajes:
        datos = MensajeRespuesta.model_validate(
            mensaje
        ).model_dump()

        if mensaje.eliminado_para_todos:
            datos["texto"] = "Este mensaje fue eliminado"

            mensajes_respuesta.append(datos)

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

    if mensaje.fecha_leido is None:
        mensaje.fecha_leido = func.now()

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
    mensajes = db.query(Mensaje).outerjoin(
        MensajeUsuario,
        and_(
            MensajeUsuario.id_mensaje == Mensaje.id_mensaje,
            MensajeUsuario.id_usuario == id_usuario
        )
    ).filter(
        or_(
            (Mensaje.id_emisor == id_usuario) |
            (Mensaje.id_receptor == id_usuario)
        ),
        or_(
            MensajeUsuario.id_mensaje.is_(None),
            MensajeUsuario.oculto.is_(False)
        )
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
    ).outerjoin(
        MensajeUsuario,
        and_(
            MensajeUsuario.id_mensaje == Mensaje.id_mensaje,
            MensajeUsuario.id_usuario == id_usuario
        )
    ).filter(
        Mensaje.id_receptor == id_usuario,
        Mensaje.leido.is_(False),
        Mensaje.eliminado_para_todos.is_(False),
        or_(
            MensajeUsuario.id_mensaje.is_(None),
            MensajeUsuario.oculto.is_(False)
        )
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

        if mensaje.eliminado_para_todos:
            ultimo_mensaje = "Este mensaje fue eliminado"
        else:
            ultimo_mensaje = mensaje.texto

        conversaciones.append({
            "id_usuario": otro_usuario.id_usuario,
            "nombre": otro_usuario.nombre,
            "nombre_usuario": otro_usuario.nombre_usuario,
            "foto_perfil": otro_usuario.foto_perfil,
            "ultimo_mensaje": ultimo_mensaje,
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

@router.delete("/{id_mensaje}/para-mi/{id_usuario}")
def eliminar_mensaje_para_mi(
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

    if id_usuario not in [mensaje.id_emisor, mensaje.id_receptor]:
        raise HTTPException(
            status_code=403,
            detail="No tienes permiso para eliminar este mensaje"
        )

    registro = db.query(MensajeUsuario).filter(
        MensajeUsuario.id_mensaje == id_mensaje,
        MensajeUsuario.id_usuario == id_usuario
    ).first()

    ahora = datetime.now()
    fecha_limite = ahora + timedelta(days=60)

    if registro:
        registro.oculto = True
        registro.fecha_eliminacion = ahora
        registro.fecha_limite_recuperacion = fecha_limite
        registro.restaurable = (id_usuario == mensaje.id_emisor)

    else:
        registro = MensajeUsuario(
            id_mensaje=id_mensaje,
            id_usuario=id_usuario,
            oculto=True,
            fecha_eliminacion=ahora,
            fecha_limite_recuperacion=fecha_limite,
            restaurable=(id_usuario == mensaje.id_emisor)
        )

        db.add(registro)

    db.commit()

    return {
        "mensaje": "Mensaje eliminado de tu conversacion",
        "id_mensaje": id_mensaje,
        "id_usuario": id_usuario,
        "fecha_limite_recuperacion": fecha_limite
    }

@router.patch("/{id_mensaje}/restaurar-para-mi/{id_usuario}")
def restaurar_mensajes_para_mi(
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

    if id_usuario not in [mensaje.id_emisor, mensaje.id_receptor]:
        raise HTTPException(
            status_code=403,
            detail="No tienes permiso para restaurar este mensaje"
        )

    registro = db.query(MensajeUsuario).filter(
        MensajeUsuario.id_mensaje == id_mensaje,
        MensajeUsuario.id_usuario == id_usuario
    ).first()

    if not registro or not registro.oculto:
        raise HTTPException(
            status_code=404,
            detail="No tienes un mensaje eliminado para restaurar"
        )

    if id_usuario != mensaje.id_emisor or not registro.restaurable:
        raise HTTPException(
            status_code=403,
            detail="No puedes restaurar este mensaje"
        )

    ahora = datetime.now()

    if (
        registro.fecha_limite_recuperacion is None
        or ahora > registro.fecha_limite_recuperacion
    ):
        raise HTTPException(
            status_code=410,
            detail="El plazo de recuperación de 60 dias ha expirado"
        )

    registro.oculto = False
    registro.fecha_eliminacion = None
    registro.fecha_limite_recuperacion = None
    registro.restaurable = False

    db.commit()

    return {
        "mensaje": "Mensaje restaurado correctamente",
        "id_mensaje": id_mensaje,
        "id_usuario": id_usuario
    }

@router.delete("/{id_mensaje}/para-todos/{id_usuario}")
def eliminar_mensaje_para_todos(
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

    if id_usuario != mensaje.id_emisor:
        raise HTTPException(
            status_code=403,
            detail="Solo el emisor puede eliminar el mensaje para todos"
        )

    if mensaje.eliminado_para_todos:
        raise HTTPException(
            status_code=409,
            detail="Este mensaje ya fue eliminado para todos"
        )

    ahora = datetime.now()
    fecha_limite = ahora + timedelta(days=60)

    mensaje.eliminado_para_todos = True
    mensaje.fecha_eliminacion_global = ahora
    mensaje.fecha_limite_recuperacion = fecha_limite

    db.commit()
    db.refresh(mensaje)

    return {
        "mensaje": "Mensaje elimindo para todos correctamente",
        "id_mensaje": id_mensaje,
        "id_usuario": id_usuario,
        "fecha_eliminacion_global": mensaje.fecha_eliminacion_global,
        "fecha_limite_recuperacion": mensaje.fecha_limite_recuperacion
    }

@router.patch("/{id_mensaje}/restaurar-para-todos/{id_usuario}")
def restaurar_mensaje_para_todos(
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

    if id_usuario != mensaje.id_emisor:
        raise HTTPException(
            status_code=403,
            detail="Solo el emisor puede restaurar el mensaje"
        )

    if not mensaje.eliminado_para_todos:
        raise HTTPException(
            status_code=409,
            detail="El mensaje no está eliminado para todos"
        )

    ahora = datetime.now()

    if ( 
        mensaje.fecha_limite_recuperacion is None
        or ahora > mensaje.fecha_limite_recuperacion
    ):
        raise HTTPException(
            status_code=410,
            detail="El plazo maximo de recuperación de 60 días ha expirado"
        )

    mensaje.eliminado_para_todos = False
    mensaje.fecha_eliminacion_global = None
    mensaje.fecha_limite_recuperacion = None

    db.commit()
    db.refresh(mensaje)

    return {
        "mensaje": "Mensaje restaurado para todos correctamente",
        "id_mensaje": id_mensaje,
        "id_emisor": id_usuario,
    }

@router.patch("/{id_mensaje}/editar/{id_usuario}")
def editar_mensaje(
    id_mensaje: int,
    id_usuario: int,
    datos: MensajeEditar,
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

    if mensaje.id_emisor != id_usuario:
        raise HTTPException(
            status_code=403,
            detail="Solo el emisor puede editar el mensaje"
        )

    if mensaje.eliminado_para_todos:
        raise HTTPException(
            status_code=400,
            detail="No puedes esditar un mensaje eliminado para todos"
        )

    ahora = datetime.now()

    if ahora > mensaje.fecha + timedelta(hours=1):
        raise HTTPException(
            status_code=400,
            detail="El tiempo permitido para editar este mensaje ha expirado"
        )

    historial = db.query(HistorialEdicionesMensajes).filter(
        HistorialEdicionesMensajes.id_mensaje == id_mensaje
    ).order_by(
        HistorialEdicionesMensajes.fecha_edicion.asc()
    ).all()

    registro = HistorialEdicionesMensajes(
        id_mensaje=id_mensaje,
        texto_anterior=mensaje.texto
    )

    db.add(registro)

    if len(historial) >= 3:
        db.delete(historial[0])

    mensaje.texto = datos.texto.strip()
    mensaje.fecha_edicion = ahora

    db.commit()
    db.refresh(mensaje)

    return {
        "mensaje": "Mensaje editado correctamente",
        "datos": MensajeRespuesta.model_validate(mensaje)
    }

@router.get("/{id_mensaje}/historial-ediciones/{id_usuario}")
def obtener_historial_ediciones(
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

    if id_usuario not in [mensaje.id_emisor, mensaje.id_receptor]:
        raise HTTPException(
            status_code=403,
            detail="No tienes permiso para consultar este historial"
        )

    historial = db.query(HistorialEdicionesMensajes).filter(
        HistorialEdicionesMensajes.id_mensaje == id_mensaje
    ).order_by(
        HistorialEdicionesMensajes.fecha_edicion.desc(),
        HistorialEdicionesMensajes.id_historial.desc()
    ).all()

    return { 
        "id_mensaje": id_mensaje,
        "total_ediciones": len(historial),
        "historial": [
            {
                "id_historial": registro.id_historial,
                "texto_anterior": registro.texto_anterior,
                "fecha_edicion": registro.fecha_edicion
            }
            for registro in historial
        ]
    }