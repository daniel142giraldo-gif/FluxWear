from datetime import date
from decimal import Decimal

from pydantic import BaseModel, Field


class UsuarioCreate(BaseModel):
    nombre: str = Field(min_length=1, max_length=50)
    nombre_usuario: str = Field(min_length=1, max_length=50)
    correo: str = Field(min_length=1, max_length=100)
    password: str = Field(min_length=8, max_length=255)
    telefono: str = Field(min_length=1, max_length=20)

    fecha_nacimiento: date
    peso: Decimal = Field(gt=0, le=200)
    estatura: Decimal = Field(gt=0, le=2.60)


class UsuarioResponse(BaseModel):
    id_usuario: int
    nombre: str
    nombre_usuario: str
    correo: str
    telefono: str

    model_config = {
        "from_attributes": True
    }