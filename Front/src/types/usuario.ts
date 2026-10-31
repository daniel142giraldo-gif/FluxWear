export type RegistroForm = {
  nombre: string;
  nombre_usuario: string;
  correo: string;
  telefono: string;
  edad: number;
  peso: number;
  estatura: number;
  password: string;
  confirmarPassword: string;
};

export type Usuario = {
  id_usuario: string;
  nombre: string;
  nombre_usuario: string;
  correo: string;
  telefono: string;
  edad: number;
  peso: number;
  estatura: number;
  password_hash: string;
  foto_perfil: string;
  verificado: boolean;
  bio: string;
  creado_en: string;
  
  modelo_3d_id?: string;
};

export type UsuarioPublico = Pick<Usuario, 
'id_usuario' 
| 'nombre' 
| 'nombre_usuario' 
| 'foto_perfil' 
| 'verificado'>;