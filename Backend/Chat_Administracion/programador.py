from apscheduler.schedulers.background import BackgroundScheduler

from database.connection import SessionLocal
from Chat_Administracion.limpieza import limpiar_mensajes_expirados

def ejecutar_limpieza():

    db = SessionLocal()

    try: 
        resultado = limpiar_mensajes_expirados(db)

        if resultado["total_eliminados"] > 0:
            print(
                f"[MANTENIMIENTO] Se eliminaron"
                f"{resultado['total_eliminados']} mensajes vencidos"
            )
        else:
            print(
                "[MANTENIMIENTO] No hay mensajes vencidos para eliminar"
            )

    except Exception as e:
        db.rollback()
        print("[ERROR DE LIMPIEZA]", e)

    finally:
        db.close()

scheduler = BackgroundScheduler()

def iniciar_programador():
    if not scheduler.running:

        ejecutar_limpieza()

        scheduler.add_job(
            ejecutar_limpieza,
            trigger="interval",
            hours=24,
            id="limpieza_mensajes",
            replace_existing=True,
            max_instances=1
        )

        scheduler.start()

        print("[PROGRAMADOR] Limpieza automática configurada cada 24 horas")

def detener_programador():

    if scheduler.running:
        scheduler.shutdown()
        print("[PROGRAMADOR] Tareas automáticas detenidas")