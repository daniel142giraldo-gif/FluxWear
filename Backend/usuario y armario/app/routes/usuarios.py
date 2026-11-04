from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pwdlib import PasswordHash

from app.database import get_db
from app.models.usuario import Usuario
from app.schemas.usuario import UsuarioCreate, UsuarioResponse


router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)

password_hash = PasswordHash.recommended()


@router.post(
    "/registro",
    response_model=UsuarioResponse,
    status_code=status.HTTP_201_CREATED
)
def registrar_usuario(
    datos: UsuarioCreate,
    db: Session = Depends(get_db)
):
    # Comprobar si el correo ya está registrado
    usuario_existente = db.query(Usuario).filter(
        (Usuario.correo == datos.correo) |
        (Usuario.nombre_usuario == datos.nombre_usuario) |
        (Usuario.telefono == datos.telefono)
    ).first()

    if usuario_existente:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="El correo, nombre de usuario o teléfono ya está registrado"
        )

    # Proteger la contraseña
    password_seguro = password_hash.hash(datos.password)

    # Crear el nuevo usuario
    nuevo_usuario = Usuario(
        nombre=datos.nombre,
        nombre_usuario=datos.nombre_usuario,
        correo=datos.correo,
        password=password_seguro,
        telefono=datos.telefono,
        fecha_nacimiento=datos.fecha_nacimiento,
        peso=datos.peso,
        estatura=datos.estatura
    )

    # Guardar en MariaDB
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return nuevo_usuario