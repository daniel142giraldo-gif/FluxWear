from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

class MensajeCrear(BaseModel):
    id_emisor: int
    id_receptor: int
    texto: str = Field(min_length=1)

class MensajeRespuesta(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id_mensaje: int
    id_emisor: int
    id_receptor: int
    texto: str
    leido: bool
    fecha: datetime