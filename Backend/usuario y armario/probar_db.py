from sqlalchemy import text
from app.database import engine

try:
    with engine.connect() as conexion:
        resultado = conexion.execute(
            text("SELECT DATABASE(), VERSION()")
        )

        base, version = resultado.fetchone()

        print("Conexion exitosa")
        print("Base de datos:", base)
        print("Servidor:", version)

except Exception as error:
    print("No se pudo conectar a la base de datos.")
    print("Tipo de error:", type(error).__name__)
    print("Detalle:", error)
