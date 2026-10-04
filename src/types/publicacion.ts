export type Publicacion = {
    id: string;
    id_usuario: string;
    nombre_usuario: string;
    foto_perfil: any;
    verificado: boolean;
    foto_url: any;
    descripcion: string;
    hashtags: string[];
    likes: number;
    comentarios: number;
    liked: boolean;
    creado_en: string;
};