from fastapi import APIRouter

router = APIRouter(
    prefix="/mensajes",
    tags=["Mensajes"]
)

@router.get("/")
def obtener_mensajes():
    return {
        "mensaje": "Modulo de mensajes de FluxWear funcionando"
    }