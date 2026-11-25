from database.connection import SessionLocal
from Chat_Administracion.limpieza import limpiar_mensajes_expirados
from sqlalchemy import text

db = SessionLocal()

try:
    print(
        "Base de datos utilizada:",
        db.execute(text("SELECT DATABASE()")).scalar()
    )

    resultado = limpiar_mensajes_expirados(db)
    print(resultado)

except Exception as e:
    db.rollback()
    print("Error durante la limpieza:", e)

finally:
    db.close()