from fastapi import FastAPI
from app.routes import usuarios

app = FastAPI(
    title = "Flux Wear API",
    description ="Backend de la aplicacion Flux Wear",
    version = "1.0.0"
)
app.include_router(usuarios.router)

@app.get("/")
def inicio():
    return{
        "mensaje":"Bienvenido al backend de Flux Wear",
        "estado":"funcionando"
    }