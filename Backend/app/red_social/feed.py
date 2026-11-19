
# Importar la funcion para conectar con MySQL
from app.database import obtener_conexion


# CONSULTAR EL FEED GENERAL
def listar_feed_general():

    # Conectar con la base de datos
    conexion = obtener_conexion()

    if conexion is None:
        return {
            "mensaje": "No se pudo conectar con la base de datos"
        }

    # Crear el cursor
    cursor = conexion.cursor(dictionary=True)

    # Consultar las publicaciones con sus autores e interacciones
    sql = """
        SELECT
            r.id_publicacion,
            r.id_usuario,
            u.nombre,
            u.nombre_usuario,
            u.foto_perfil,
            u.verificado,
            r.id_outfit,
            o.nombre AS nombre_outfit,
            r.id_estilos,
            e.nombre AS estilo,
            r.texto,
            r.anclada,
            r.fecha,
            r.fecha_edicion,
            r.total_likes,
            r.total_comentarios,
            r.total_favoritos,
            r.total_compartidos
        FROM v_publicaciones_resumen r
        JOIN usuarios u ON u.id_usuario = r.id_usuario
        LEFT JOIN estilos e ON e.id_estilos = r.id_estilos
        LEFT JOIN outfits o ON o.id_outfit = r.id_outfit
        ORDER BY r.fecha DESC
    """

    cursor.execute(sql)

    publicaciones = cursor.fetchall()

    # Consultar los archivos multimedia de cada publicacion
    for publicacion in publicaciones:

        sql_multimedia = """
            SELECT id_multimedia, tipo, ruta, orden
            FROM multimedia
            WHERE id_publicacion = %s
            ORDER BY orden ASC
        """

        cursor.execute(
            sql_multimedia,
            (publicacion["id_publicacion"],)
        )

        publicacion["multimedia"] = cursor.fetchall()

    # Cerrar la conexion
    cursor.close()
    conexion.close()

    return publicaciones


# CONSULTAR EL FEED DE LOS USUARIOS QUE SIGUE
def listar_feed_seguidos(id_usuario):

    # Conectar con la base de datos
    conexion = obtener_conexion()

    if conexion is None:
        return {
            "mensaje": "No se pudo conectar con la base de datos"
        }

    # Crear el cursor
    cursor = conexion.cursor(dictionary=True)

    # Verificar que exista el usuario
    sql_usuario = """
        SELECT id_usuario
        FROM usuarios
        WHERE id_usuario = %s
    """

    cursor.execute(sql_usuario, (id_usuario,))

    usuario = cursor.fetchone()

    if usuario is None:
        cursor.close()
        conexion.close()

        return {
            "mensaje": "El usuario no existe"
        }

    # Consultar publicaciones de las personas que sigue
    sql = """
        SELECT
            r.id_publicacion,
            r.id_usuario,
            u.nombre,
            u.nombre_usuario,
            u.foto_perfil,
            u.verificado,
            r.id_outfit,
            o.nombre AS nombre_outfit,
            r.id_estilos,
            e.nombre AS estilo,
            r.texto,
            r.anclada,
            r.fecha,
            r.fecha_edicion,
            r.total_likes,
            r.total_comentarios,
            r.total_favoritos,
            r.total_compartidos
        FROM v_publicaciones_resumen r
        JOIN usuarios u ON u.id_usuario = r.id_usuario
        LEFT JOIN estilos e ON e.id_estilos = r.id_estilos
        LEFT JOIN outfits o ON o.id_outfit = r.id_outfit
        JOIN seguidores s ON s.id_seguido = r.id_usuario
        WHERE s.id_seguidor = %s
        ORDER BY r.fecha DESC
    """

    cursor.execute(sql, (id_usuario,))

    publicaciones = cursor.fetchall()

    # Consultar los archivos multimedia de cada publicacion
    for publicacion in publicaciones:

        sql_multimedia = """
            SELECT id_multimedia, tipo, ruta, orden
            FROM multimedia
            WHERE id_publicacion = %s
            ORDER BY orden ASC
        """

        cursor.execute(
            sql_multimedia,
            (publicacion["id_publicacion"],)
        )

        publicacion["multimedia"] = cursor.fetchall()

    # Cerrar la conexion
    cursor.close()
    conexion.close()

    return publicaciones
