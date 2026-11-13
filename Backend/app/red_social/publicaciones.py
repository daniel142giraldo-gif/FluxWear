# Importar la función para conectar con MySQL
from app.database import obtener_conexion
from app.red_social.multimedia import listar_multimedia
import os


# LISTAR LAS PUBLICACIONES CON INFORMACION DEL USUARIO Y ESTILO
def listar_publicaciones():

    # Conectar con la base de datos
    conexion = obtener_conexion()

    # Comprobar si existe la conexión
    if conexion is None:
        return {
            "mensaje": "No se pudo conectar con la base de datos"
        }

    # Crear el cursor para realizar consultas
    cursor = conexion.cursor(dictionary=True)

    # Consulta para obtener las publicaciones
    consulta = """
        SELECT
            p.id_publicacion,
            p.id_usuario,
            u.nombre_usuario,
            u.foto_perfil,
            p.id_estilos,
            e.nombre AS estilo,
            p.texto,
            p.anclada,
            p.fecha,
            p.fecha_edicion

        FROM publicaciones p

        INNER JOIN usuarios u
            ON p.id_usuario = u.id_usuario

        LEFT JOIN estilos e
            ON p.id_estilos = e.id_estilos

        ORDER BY p.anclada DESC, p.fecha DESC
    """

    # Ejecutar la consulta
    cursor.execute(consulta)

    # Obtener todas las publicaciones
    publicaciones = cursor.fetchall()

    # Cerrar el cursor
    cursor.close()

    # Cerrar la conexión
    conexion.close()

    # Agregar fotografías y videos a cada publicación
    for publicacion in publicaciones:

        publicacion["multimedia"] = listar_multimedia(
            publicacion["id_publicacion"]
        )

    # Devolver las publicaciones
    return publicaciones



# CREAR UNA NUEVA PUBLICACION
def crear_publicacion(id_usuario, id_estilos, texto):

    # Conectar con la base de datos
    conexion = obtener_conexion()

    # Comprobar si existe la conexión
    if conexion is None:
        return {
            "mensaje": "No se pudo conectar con la base de datos"
        }

    # Crear el cursor
    cursor = conexion.cursor()

    # Consulta para guardar la publicación
    consulta = """
        INSERT INTO publicaciones (
            id_usuario,
            id_estilos,
            texto
        )
        VALUES (%s, %s, %s)
    """

    # Ejecutar la consulta
    cursor.execute(consulta, (id_usuario, id_estilos, texto))

    # Guardar los cambios en MySQL
    conexion.commit()

    # Obtener el ID de la publicación creada
    id_publicacion = cursor.lastrowid

    # Cerrar el cursor y la conexión
    cursor.close()
    conexion.close()

    # Devolver el resultado
    return {
        "mensaje": "Publicacion creada correctamente",
        "id_publicacion": id_publicacion
    }


# EDITAR UNA PUBLICACION
def actualizar_publicacion(id_publicacion, id_usuario, id_estilos, texto):

    # Comprobar que el texto no este vacio
    if texto is None or texto.strip() == "":
        return {
            "mensaje": "El texto de la publicacion no puede estar vacio"
        }

    # Conectar con la base de datos
    conexion = obtener_conexion()

    if conexion is None:
        return {
            "mensaje": "No se pudo conectar con la base de datos"
        }

    # Crear el cursor
    cursor = conexion.cursor(dictionary=True)

    # Consultar quien es el propietario de la publicacion
    consulta = """
        SELECT id_usuario
        FROM publicaciones
        WHERE id_publicacion = %s
    """

    cursor.execute(consulta, (id_publicacion,))
    publicacion = cursor.fetchone()

    # Comprobar que la publicacion exista
    if publicacion is None:
        cursor.close()
        conexion.close()

        return {
            "mensaje": "La publicacion no existe"
        }

    # Comprobar que el usuario sea el propietario
    if publicacion["id_usuario"] != id_usuario:
        cursor.close()
        conexion.close()

        return {
            "mensaje": "No tienes permiso para editar esta publicacion"
        }

    # Actualizar el texto y el estilo
    consulta = """
        UPDATE publicaciones
        SET id_estilos = %s,
            texto = %s,
            fecha_edicion = NOW()
        WHERE id_publicacion = %s
    """

    cursor.execute(
        consulta,
        (id_estilos, texto, id_publicacion)
    )

    # Guardar los cambios
    conexion.commit()

    cursor.close()
    conexion.close()

    return {
        "mensaje": "Publicacion actualizada correctamente",
        "id_publicacion": id_publicacion
    }


# ELIMINAR UNA PUBLICACION
def eliminar_publicacion(id_publicacion, id_usuario):

    # Conectar con la base de datos
    conexion = obtener_conexion()

    if conexion is None:
        return {
            "mensaje": "No se pudo conectar con la base de datos"
        }

    # Crear el cursor
    cursor = conexion.cursor(dictionary=True)

    # Consultar el propietario de la publicacion
    consulta = """
        SELECT id_usuario
        FROM publicaciones
        WHERE id_publicacion = %s
    """

    cursor.execute(consulta, (id_publicacion,))
    publicacion = cursor.fetchone()

    # Comprobar que la publicacion exista
    if publicacion is None:
        cursor.close()
        conexion.close()

        return {
            "mensaje": "La publicacion no existe"
        }

    # Comprobar que el usuario sea el propietario
    if publicacion["id_usuario"] != id_usuario:
        cursor.close()
        conexion.close()

        return {
            "mensaje": "No tienes permiso para eliminar esta publicacion"
        }

    # Consultar las rutas de sus archivos multimedia
    consulta = """
        SELECT ruta
        FROM multimedia
        WHERE id_publicacion = %s
    """

    cursor.execute(consulta, (id_publicacion,))
    archivos = cursor.fetchall()

    # Eliminar la publicacion de MySQL
    consulta = """
        DELETE FROM publicaciones
        WHERE id_publicacion = %s
    """

    cursor.execute(consulta, (id_publicacion,))

    # Confirmar la eliminacion
    conexion.commit()

    cursor.close()
    conexion.close()

    # Eliminar los archivos multimedia del servidor
    carpeta_uploads = os.path.abspath("uploads")
    archivos_eliminados = 0

    for archivo in archivos:

        ruta_archivo = os.path.abspath(archivo["ruta"])

        # Comprobar que el archivo este dentro de uploads
        if os.path.commonpath([carpeta_uploads, ruta_archivo]) == carpeta_uploads:

            if os.path.isfile(ruta_archivo):
                os.remove(ruta_archivo)
                archivos_eliminados += 1

    return {
        "mensaje": "Publicacion eliminada correctamente",
        "id_publicacion": id_publicacion,
        "archivos_multimedia_eliminados": archivos_eliminados
    }