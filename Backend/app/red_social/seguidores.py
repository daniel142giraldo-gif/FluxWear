
# Importar la funcion para conectar con MySQL
from app.database import obtener_conexion


# SEGUIR A UN USUARIO
def seguir_usuario(id_seguidor, id_seguido):

    conexion = obtener_conexion()

    if conexion is None:
        return {"mensaje": "No se pudo conectar con la base de datos"}

    cursor = conexion.cursor(dictionary=True)

    # Evitar que un usuario se siga a si mismo
    if id_seguidor == id_seguido:
        cursor.close()
        conexion.close()
        return {"mensaje": "No puedes seguirte a ti mismo"}

    # Comprobar si el usuario ya sigue a esa persona
    cursor.execute("""
        SELECT * FROM seguidores
        WHERE id_seguidor = %s AND id_seguido = %s
    """, (id_seguidor, id_seguido))

    seguimiento = cursor.fetchone()

    if seguimiento:
        cursor.close()
        conexion.close()
        return {"mensaje": "Ya sigues a este usuario"}

    # Registrar el seguimiento
    cursor.execute("""
        INSERT INTO seguidores (id_seguidor, id_seguido)
        VALUES (%s, %s)
    """, (id_seguidor, id_seguido))

    conexion.commit()

    cursor.close()
    conexion.close()

    return {"mensaje": "Ahora sigues a este usuario"}


# DEJAR DE SEGUIR A UN USUARIO
def dejar_de_seguir(id_seguidor, id_seguido):

    conexion = obtener_conexion()

    if conexion is None:
        return {"mensaje": "No se pudo conectar con la base de datos"}

    cursor = conexion.cursor()

    cursor.execute("""
        DELETE FROM seguidores
        WHERE id_seguidor = %s AND id_seguido = %s
    """, (id_seguidor, id_seguido))

    eliminados = cursor.rowcount

    conexion.commit()

    cursor.close()
    conexion.close()

    if eliminados == 0:
        return {"mensaje": "No sigues a este usuario"}

    return {"mensaje": "Has dejado de seguir a este usuario"}


# CONSULTAR LOS SEGUIDORES DE UN USUARIO
def listar_seguidores(id_usuario):

    conexion = obtener_conexion()

    if conexion is None:
        return {"mensaje": "No se pudo conectar con la base de datos"}

    cursor = conexion.cursor(dictionary=True)

    cursor.execute("""
        SELECT u.id_usuario, u.nombre, u.nombre_usuario,
               u.foto_perfil, u.verificado
        FROM seguidores s
        JOIN usuarios u ON u.id_usuario = s.id_seguidor
        WHERE s.id_seguido = %s
        ORDER BY s.fecha DESC
    """, (id_usuario,))

    seguidores = cursor.fetchall()

    cursor.close()
    conexion.close()

    return seguidores


# CONSULTAR A QUIEN SIGUE UN USUARIO
def listar_seguidos(id_usuario):

    conexion = obtener_conexion()

    if conexion is None:
        return {"mensaje": "No se pudo conectar con la base de datos"}

    cursor = conexion.cursor(dictionary=True)

    cursor.execute("""
        SELECT u.id_usuario, u.nombre, u.nombre_usuario,
               u.foto_perfil, u.verificado
        FROM seguidores s
        JOIN usuarios u ON u.id_usuario = s.id_seguido
        WHERE s.id_seguidor = %s
        ORDER BY s.fecha DESC
    """, (id_usuario,))

    seguidos = cursor.fetchall()

    cursor.close()
    conexion.close()

    return seguidos


# COMPROBAR SI UN USUARIO SIGUE A OTRO
def comprobar_seguimiento(id_seguidor, id_seguido):

    conexion = obtener_conexion()

    if conexion is None:
        return {"mensaje": "No se pudo conectar con la base de datos"}

    cursor = conexion.cursor(dictionary=True)

    cursor.execute("""
        SELECT * FROM seguidores
        WHERE id_seguidor = %s AND id_seguido = %s
    """, (id_seguidor, id_seguido))

    seguimiento = cursor.fetchone()

    cursor.close()
    conexion.close()

    return {
        "lo_sigue": seguimiento is not None
    }
