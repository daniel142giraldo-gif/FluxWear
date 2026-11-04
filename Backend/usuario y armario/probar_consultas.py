from sqlalchemy import inspect

from app.database import engine

inspector = inspect(engine)

tablas = [
    "ususarios",
    "categorias_prenda",
    "estilos",
    "temporadas",
    "prendas",
    "prenda_temporadas",
    "usuario_estilos",
    "outfits"
]

print("\nVERIFICANDO TABLAS DE FLUX WEAR\n")

for tabla in tablas:
    if inspector.has_table(tabla):
        print(f"[OK] Tabla encontrada:{tabla}")
    else:
        print(f"[ERROR] No se encontro:{tabla}")

print("\nVERIFICACION FINALIZADA")