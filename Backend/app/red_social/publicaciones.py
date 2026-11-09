# Importar la función para conectar con MySQL
from app.database import obtener_conexion
from app.red_social.multimedia import listar_multimedia


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
