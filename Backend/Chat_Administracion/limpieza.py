from datetime import datetime
from sqlalchemy.orm import Session

from Chat_Administracion.modelos import (
    Mensaje,
    MensajeUsuario,
    HistorialEdicionesMensajes
)

def limpiar_mensajes_expirados(db: Session):

    ahora = datetime.now()

    mensajes_globales = db.query(Mensaje).filter(
        Mensaje.eliminado_para_todos.is_(True),
        Mensaje.fecha_limite_recuperacion.isnot(None),
        Mensaje.fecha_limite_recuperacion <= ahora
    ).all()

    mensajes_personales = db.query(Mensaje).join(
        MensajeUsuario,
        MensajeUsuario.id_mensaje == Mensaje.id_mensaje
    ).filter(
        MensajeUsuario.id_usuario == Mensaje.id_emisor,
        MensajeUsuario.oculto.is_(True),
        MensajeUsuario.restaurable.is_(True),
        MensajeUsuario.fecha_limite_recuperacion.isnot(None),
        MensajeUsuario.fecha_limite_recuperacion <= ahora
    ).all()

    ids_mensajes = {
        mensaje.id_mensaje
        for mensaje in mensajes_globales + mensajes_personales
    }

    print("Mensajes encontrados para eliminar:", ids_mensajes)

    if ids_mensajes:

        db.query(HistorialEdicionesMensajes).filter(
            HistorialEdicionesMensajes.id_mensaje.in_(ids_mensajes)
        ).delete(synchronize_session=False)

        db.query(MensajeUsuario).filter(
            MensajeUsuario.id_mensaje.in_(ids_mensajes)
        ).delete(synchronize_session=False)

        db.query(Mensaje).filter(
            Mensaje.id_mensaje.in_(ids_mensajes)
        ).delete(synchronize_session=False)

    print("Eliminación ejecutada. Confirmando cambios...")

    db.commit()

    return {
        "mensaje": "Limpieza de mensajes completada",
        "total_eliminados": len(ids_mensajes)
    }