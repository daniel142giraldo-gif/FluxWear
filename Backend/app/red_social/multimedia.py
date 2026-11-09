#herramientas para identificar y para trabajar con carpetas
import os
import uuid
# Importar la función para conectar con MySQL
from app.database import obtener_conexion



# CONSULTAR MULTIMEDIA DE UNA PUBLICACION
def listar_multimedia(id_publicacion):

    # Conectar con la base de datos
    conexion = obtener_conexion()

    # Comprobar si existe la conexión
    if conexion is None:
        return {
            "mensaje": "No se pudo conectar con la base de datos"
        }

    # Crear el cursor para realizar consultas
    cursor = conexion.cursor(dictionary=True)

    # Consulta para obtener las fotografías y videos
    consulta = """
        SELECT
            id_multimedia,
            id_publicacion,
            tipo,
            ruta,
            orden
        FROM multimedia
        WHERE id_publicacion = %s
        ORDER BY orden ASC
    """

    # Ejecutar la consulta con el ID de la publicación
    cursor.execute(consulta, (id_publicacion,))

    # Obtener los archivos encontrados
    archivos = cursor.fetchall()

    # Cerrar el cursor
    cursor.close()

    # Cerrar la conexión
    conexion.close()

    # Devolver los archivos encontrados
    return archivos


def guardar_multimedia(id_publicacion, archivos, tipo):

    # Comprobar que todos los archivos tengan un formato permitido
    for archivo in archivos:

        if not validar_archivo(archivo, tipo):
            return {
                "mensaje": "Uno o varios archivos tienen un formato no permitido"
            }

    # Conectar con la base de datos
    conexion = obtener_conexion()

    if conexion is None:
        return {
            "mensaje": "No se pudo conectar con la base de datos"
        }

    # Crear la carpeta donde se guardaran los archivos
    carpeta = "uploads/publicaciones"
    os.makedirs(carpeta, exist_ok=True)

    # Crear el cursor para realizar consultas
    cursor = conexion.cursor()

    # Consultar el ultimo orden utilizado en la publicacion
    consulta_orden = """
        SELECT COALESCE(MAX(orden), 0) + 1
        FROM multimedia
        WHERE id_publicacion = %s
    """

    cursor.execute(consulta_orden, (id_publicacion,))
    orden = cursor.fetchone()[0]

    # Lista para guardar las rutas de los archivos
    archivos_guardados = []

    # Recorrer todos los archivos recibidos
    for archivo in archivos:

        # Obtener la extension del archivo
        extension = os.path.splitext(archivo.filename)[1].lower()

        # Crear un nombre unico
        nombre_archivo = str(uuid.uuid4()) + extension

        # Construir la ruta del archivo
        ruta = os.path.join(carpeta, nombre_archivo)

        # Guardar el archivo en la carpeta
        with open(ruta, "wb") as archivo_guardado:
            archivo_guardado.write(archivo.file.read())

        # Registrar el archivo en MySQL
        consulta = """
            INSERT INTO multimedia (id_publicacion, tipo, ruta, orden)
            VALUES (%s, %s, %s, %s)
        """

        cursor.execute(
            consulta,
            (id_publicacion, tipo, ruta, orden)
        )

        # Guardar la ruta en la lista
        archivos_guardados.append(ruta)

        # Aumentar el orden para el siguiente archivo
        orden += 1

    # Confirmar los registros en MySQL
    conexion.commit()

    # Cerrar el cursor y la conexion
    cursor.close()
    conexion.close()

    return {
        "mensaje": "Archivos guardados correctamente",
        "archivos": archivos_guardados
    }


def validar_archivo(archivo, tipo):

    # Obtener la extension del archivo
    extension = os.path.splitext(archivo.filename)[1].lower()

    # Leer los primeros 12 bytes del archivo
    contenido = archivo.file.read(12)

    # Volver al inicio del archivo
    archivo.file.seek(0)

    # Validar fotografias
    if tipo == "foto":

        if extension in [".jpg", ".jpeg"]:
            return contenido.startswith(b"\xff\xd8\xff")

        elif extension == ".png":
            return contenido.startswith(b"\x89PNG\r\n\x1a\n")

        elif extension == ".webp":
            return (
                contenido.startswith(b"RIFF")
                and contenido[8:12] == b"WEBP"
            )

    # Validar videos
    elif tipo == "video":

        if extension in [".mp4", ".mov"]:
            return contenido[4:8] == b"ftyp"

        elif extension == ".webm":
            return contenido.startswith(b"\x1a\x45\xdf\xa3")

    return False
