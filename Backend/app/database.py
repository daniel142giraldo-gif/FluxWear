
# Importar la librería para conectar con MySQL
import mysql.connector

# Función para conectar con la base de datos
def obtener_conexion():

    try:
        conexion = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="Flux_Wear"
        )

        return conexion

    except mysql.connector.Error as error:
        print("Error al conectar con MySQL:", error)
        return None
