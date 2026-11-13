
# Importar la funcion para conectar con MySQL
from app.database import obtener_conexion


# CONSULTAR LOS COMENTARIOS DE UNA PUBLICACION
def listar_comentarios(id_publicacion):

    # Conectar con la base de datos
    conexion = obtener_conexion()

    if conexion is None:
        return {
            "mensaje": "No se pudo conectar con la base de datos"
        }

    # Crear el cursor
    cursor = conexion.cursor(dictionary=True)

    # Consultar los comentarios y los datos del usuario
    consulta = """
        SELECT
            c.id_comentario,
            c.id_publicacion,
            c.id_usuario,
            u.nombre_usuario,
            u.foto_perfil,
            c.texto,
            c.fecha
        FROM comentarios c
        INNER JOIN usuarios u
            ON c.id_usuario = u.id_usuario
        WHERE c.id_publicacion = %s
        ORDER BY c.fecha ASC
    """

    cursor.execute(consulta, (id_publicacion,))

    comentarios = cursor.fetchall()

    cursor.close()
    conexion.close()

    return comentarios


# CREAR UN COMENTARIO
def crear_comentario(id_publicacion, id_usuario, texto):

    # Comprobar que el comentario tenga contenido
    if texto is None or texto.strip() == "":
        return {
            "mensaje": "El comentario no puede estar vacio"
        }

    # Conectar con la base de datos
    conexion = obtener_conexion()

    if conexion is None:
        return {
            "mensaje": "No se pudo conectar con la base de datos"
        }

    # Crear el cursor
    cursor = conexion.cursor()

    # Guardar el comentario
    consulta = """
        INSERT INTO comentarios (
            id_publicacion,
            id_usuario,
            texto
        )
        VALUES (%s, %s, %s)
    """

    cursor.execute(
        consulta,
        (id_publicacion, id_usuario, texto)
    )

    # Obtener el identificador del comentario
    id_comentario = cursor.lastrowid

    # Guardar los cambios
    conexion.commit()

    cursor.close()
    conexion.close()

    return {
        "mensaje": "Comentario creado correctamente",
        "id_comentario": id_comentario
    }


# EDITAR UN COMENTARIO
def actualizar_comentario(id_comentario, id_usuario, texto):

    if texto is None or texto.strip() == "":
        return {
            "mensaje": "El comentario no puede estar vacio"
        }

    # Conectar con la base de datos
    conexion = obtener_conexion()

    if conexion is None:
        return {
            "mensaje": "No se pudo conectar con la base de datos"
        }

    # Crear el cursor
    cursor = conexion.cursor(dictionary=True)

    # Consultar el propietario del comentario
    consulta = """
        SELECT id_usuario
        FROM comentarios
        WHERE id_comentario = %s
    """

    cursor.execute(consulta, (id_comentario,))
    comentario = cursor.fetchone()

    if comentario is None:
        cursor.close()
        conexion.close()

        return {
            "mensaje": "El comentario no existe"
        }

    # Comprobar que el usuario sea el propietario
    if comentario["id_usuario"] != id_usuario:
        cursor.close()
        conexion.close()

        return {
            "mensaje": "No tienes permiso para editar este comentario"
        }

    # Actualizar el comentario
    consulta = """
        UPDATE comentarios
        SET texto = %s
        WHERE id_comentario = %s
    """

    cursor.execute(consulta, (texto, id_comentario))

    conexion.commit()

    cursor.close()
    conexion.close()

    return {
        "mensaje": "Comentario actualizado correctamente",
        "id_comentario": id_comentario
    }


# ELIMINAR UN COMENTARIO
def eliminar_comentario(id_comentario, id_usuario):

    # Conectar con la base de datos
    conexion = obtener_conexion()

    if conexion is None:
        return {
            "mensaje": "No se pudo conectar con la base de datos"
        }

    # Crear el cursor
    cursor = conexion.cursor(dictionary=True)

    # Consultar el propietario del comentario
    consulta = """
        SELECT id_usuario
        FROM comentarios
        WHERE id_comentario = %s
    """

    cursor.execute(consulta, (id_comentario,))
    comentario = cursor.fetchone()

    if comentario is None:
        cursor.close()
        conexion.close()

        return {
            "mensaje": "El comentario no existe"
        }

    # Comprobar que el usuario sea el propietario
    if comentario["id_usuario"] != id_usuario:
        cursor.close()
        conexion.close()

        return {
            "mensaje": "No tienes permiso para eliminar este comentario"
        }

    # Eliminar el comentario
    consulta = """
        DELETE FROM comentarios
        WHERE id_comentario = %s
    """

    cursor.execute(consulta, (id_comentario,))

    conexion.commit()

    cursor.close()
    conexion.close()

    return {
        "mensaje": "Comentario eliminado correctamente",
        "id_comentario": id_comentario
    }


#aqui todo lo de like y compartidos y favoritos


#DAR LIKE A UNA PUBLICACION

def dar_like(id_publicacion, id_usuario):

    conexion = obtener_conexion()

    if conexion is None:
        return {"mensaje": "No se pudo conectar con la base de datos"}

    cursor = conexion.cursor()

    # Comprobar si el usuario ya dio like
    consulta = """
        SELECT id_usuario
        FROM likes
        WHERE id_usuario = %s AND id_publicacion = %s
    """

    cursor.execute(consulta, (id_usuario, id_publicacion))
    resultado = cursor.fetchone()

    if resultado is not None:
        cursor.close()
        conexion.close()
        return {"mensaje": "Ya has dado like a esta publicacion"}

    # Guardar el like
    consulta = """
        INSERT INTO likes (id_usuario, id_publicacion)
        VALUES (%s, %s)
    """

    cursor.execute(consulta, (id_usuario, id_publicacion))

    conexion.commit()
    cursor.close()
    conexion.close()

    return {"mensaje": "Like agregado correctamente"}


#QUITAR LIKE A UNA PUBLICACION

def quitar_like(id_publicacion, id_usuario):

    conexion = obtener_conexion()

    if conexion is None:
        return {"mensaje": "No se pudo conectar con la base de datos"}

    cursor = conexion.cursor()

    consulta = """
        DELETE FROM likes
        WHERE id_usuario = %s AND id_publicacion = %s
    """

    cursor.execute(consulta, (id_usuario, id_publicacion))

    eliminado = cursor.rowcount

    conexion.commit()
    cursor.close()
    conexion.close()

    if eliminado == 0:
        return {"mensaje": "No habias dado like a esta publicacion"}

    return {"mensaje": "Like eliminado correctamente"}


#AGREGAR PUBLICACION A FAVORITOS

def agregar_favorito(id_publicacion, id_usuario):

    conexion = obtener_conexion()

    if conexion is None:
        return {"mensaje": "No se pudo conectar con la base de datos"}

    cursor = conexion.cursor()

    # Comprobar si ya esta en favoritos
    consulta = """
        SELECT id_usuario
        FROM favoritos
        WHERE id_usuario = %s AND id_publicacion = %s
    """

    cursor.execute(consulta, (id_usuario, id_publicacion))
    resultado = cursor.fetchone()

    if resultado is not None:
        cursor.close()
        conexion.close()
        return {"mensaje": "Esta publicacion ya esta en tus favoritos"}

    # Guardar en favoritos
    consulta = """
        INSERT INTO favoritos (id_usuario, id_publicacion)
        VALUES (%s, %s)
    """

    cursor.execute(consulta, (id_usuario, id_publicacion))

    conexion.commit()
    cursor.close()
    conexion.close()

    return {"mensaje": "Publicacion agregada a favoritos"}


#QUITAR DE FAVORITOS

def quitar_favorito(id_publicacion, id_usuario):

    conexion = obtener_conexion()

    if conexion is None:
        return {"mensaje": "No se pudo conectar con la base de datos"}

    cursor = conexion.cursor()

    consulta = """
        DELETE FROM favoritos
        WHERE id_usuario = %s AND id_publicacion = %s
    """

    cursor.execute(consulta, (id_usuario, id_publicacion))

    eliminado = cursor.rowcount

    conexion.commit()
    cursor.close()
    conexion.close()

    if eliminado == 0:
        return {"mensaje": "Esta publicacion no estaba en tus favoritos"}

    return {"mensaje": "Publicacion eliminada de favoritos"}


#COMPARTIR PUBLICACION

def compartir_publicacion(id_publicacion, id_usuario):

    conexion = obtener_conexion()

    if conexion is None:
        return {"mensaje": "No se pudo conectar con la base de datos"}

    cursor = conexion.cursor()

    # Registrar el compartido
    consulta = """
        INSERT INTO compartidos (id_usuario, id_publicacion)
        VALUES (%s, %s)
    """

    cursor.execute(consulta, (id_usuario, id_publicacion))

    # Obtener el identificador del compartido
    id_compartido = cursor.lastrowid

    conexion.commit()
    cursor.close()
    conexion.close()

    return {
        "mensaje": "Publicacion compartida correctamente",
        "id_compartido": id_compartido
    }
