
# Importar FastAPI
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from typing import List
# Importar la conexión con la base de datos
from app.database import obtener_conexion
# Importar las funciones de publicaciones
from app.red_social.publicaciones import listar_publicaciones, crear_publicacion
# Importar las funciones de publicaciones
from app.red_social.multimedia import listar_multimedia, guardar_multimedia


# Crear la aplicación
app = FastAPI(
    title="Flux Wear AI",
    description="Backend de Flux Wear AI",
    version="1.0"
)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


# RUTA PRINCIPAL
@app.get("/")
def inicio():
    return {
        "mensaje": "Bienvenido al backend de Flux Wear AI"
    }


# COMPROBAR EL ESTADO DEL BACKEND
@app.get("/api/estado")
def estado():
    return {
        "backend": "Activo",
        "base_de_datos": "Conectada",
        "red_social": "En desarrollo"
    }


# CONSULTAR PUBLICACIONES
@app.get("/publicaciones")
def consultar_publicaciones():

    # Llamar a la función que consulta MySQL
    publicaciones = listar_publicaciones()

    # Devolver las publicaciones encontradas
    return publicaciones

# CREAR UNA PUBLICACION
@app.post("/publicaciones")
def registrar_publicacion(id_usuario: int, id_estilos: int, texto: str):

    # Llamar a la función para guardar la publicación
    resultado = crear_publicacion(id_usuario, id_estilos, texto)

    # Devolver el resultado
    return resultado


# CONSULTAR MULTIMEDIA DE UNA PUBLICACION
@app.get("/multimedia/{id_publicacion}")
def consultar_multimedia(id_publicacion):

    archivos = listar_multimedia(id_publicacion)

    return archivos

@app.post("/multimedia/{id_publicacion}")
def subir_multimedia(
    id_publicacion: int,
    tipo: str = Form(...),
    archivos: List[UploadFile] = File(...)
):
    resultado = guardar_multimedia(id_publicacion, archivos, tipo)
    return resultado
