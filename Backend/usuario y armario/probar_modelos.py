from app.models.usuario import Usuario

from app.models.armario import(
    CategoriaPrenda,
    Estilo,
    Temporada,
    Prenda,
    PrendaTemporada,
    UsuarioEstilos
) 

from app.models.outfit import(
    Outfit,
    OutfitPrenda
)
print("\nMODELOS CARGADOS CORRECTAMENTE\n")

modelos = [
    Usuario,
    CategoriaPrenda,
    Estilo,
    Temporada,
    Prenda,
    PrendaTemporada,
    UsuarioEstilos,
    Outfit,
    OutfitPrenda
]

for modelo in modelos:
    print("Tabla:", modelo.__tablename__)

print("\nTotal de tablas:", len(modelos))

