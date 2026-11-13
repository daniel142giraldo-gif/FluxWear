
# Importar FastAPI
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from typing import List
# Importar la conexión con la base de datos
from app.database import obtener_conexion
# Importar las funciones de publicaciones
from app.red_social.publicaciones import (
    listar_publicaciones,
    crear_publicacion,
    actualizar_publicacion,
    eliminar_publicacion
)
# Importar las funciones de interacciones
from app.red_social.interacciones import (
    listar_comentarios,
    crear_comentario,
    actualizar_comentario,
    eliminar_comentario
)

from app.red_social.interacciones import (
    listar_comentarios,
    crear_comentario,
    actualizar_comentario,
    eliminar_comentario,
    dar_like,
    quitar_like,
    agregar_favorito,
    quitar_favorito,
    compartir_publicacion
)


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




#aqui todo lo de publicaciones

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



# ELIMINAR UNA PUBLICACION
@app.delete("/publicaciones/{id_publicacion}")
def borrar_publicacion(id_publicacion: int, id_usuario: int):

    resultado = eliminar_publicacion(
        id_publicacion,
        id_usuario
    )

    return resultado

# EDITAR UNA PUBLICACION
@app.put("/publicaciones/{id_publicacion}")
def modificar_publicacion(
    id_publicacion: int,
    id_usuario: int,
    texto: str,
    id_estilos: int | None = None
):

    resultado = actualizar_publicacion(
        id_publicacion,
        id_usuario,
        id_estilos,
        texto
    )

    return resultado




#aqui todo lo de multimedia

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





#aqui todo lo de comentarios

# CONSULTAR COMENTARIOS
@app.get("/comentarios/{id_publicacion}")
def consultar_comentarios(id_publicacion: int):

    resultado = listar_comentarios(id_publicacion)

    return resultado


# CREAR COMENTARIO
@app.post("/comentarios/{id_publicacion}")
def registrar_comentario(
    id_publicacion: int,
    id_usuario: int,
    texto: str
):

    resultado = crear_comentario(
        id_publicacion,
        id_usuario,
        texto
    )

    return resultado


# EDITAR COMENTARIO
@app.put("/comentarios/{id_comentario}")
def modificar_comentario(
    id_comentario: int,
    id_usuario: int,
    texto: str
):

    resultado = actualizar_comentario(
        id_comentario,
        id_usuario,
        texto
    )

    return resultado


# ELIMINAR COMENTARIO
@app.delete("/comentarios/{id_comentario}")
def borrar_comentario(
    id_comentario: int,
    id_usuario: int
):

    resultado = eliminar_comentario(
        id_comentario,
        id_usuario
    )

    return resultado

# aqui todo lo de like y compartidos y favoritos


#LIKES
@app.post("/publicaciones/{id_publicacion}/like")
def registrar_like(id_publicacion: int, id_usuario: int):

    resultado = dar_like(id_publicacion, id_usuario)

    return resultado


@app.delete("/publicaciones/{id_publicacion}/like")
def eliminar_like(id_publicacion: int, id_usuario: int):

    resultado = quitar_like(id_publicacion, id_usuario)

    return resultado


# FAVORITOS

@app.post("/publicaciones/{id_publicacion}/favorito")
def registrar_favorito(id_publicacion: int, id_usuario: int):

    resultado = agregar_favorito(id_publicacion, id_usuario)

    return resultado


@app.delete("/publicaciones/{id_publicacion}/favorito")
def eliminar_favorito(id_publicacion: int, id_usuario: int):

    resultado = quitar_favorito(id_publicacion, id_usuario)

    return resultado


# COMPARTIDOS

@app.post("/publicaciones/{id_publicacion}/compartir")
def registrar_compartido(id_publicacion: int, id_usuario: int):

    resultado = compartir_publicacion(id_publicacion, id_usuario)

    return resultado
