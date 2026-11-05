from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text

from Chat_Administracion import mensajes
from database.connection import get_db

app = FastAPI(
    title="FluxWear API",
    description="Backend de la red social FluxWear",
    version="1.0.0"
)

# Registrar módulos
app.include_router(mensajes.router)


@app.get("/")
def inicio():
    return {
        "mensaje": "Bienvenido al backend de FluxWear"
    }


@app.get("/db-check")
def comprobar_conexion(db: Session = Depends(get_db)):

    try:
        resultado = db.execute(
            text("SELECT DATABASE()")
        ).scalar()

        return {
            "conexion": "exitosa",
            "base_datos": resultado
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Error de conexión: {str(error)}"
        )