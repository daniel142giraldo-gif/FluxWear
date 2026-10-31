import ImagenPerfil from '../../../../assets/images/ImagenPerfil1.png';
import ImagenPublicacion from '../../../../assets/images/Publicacion1.jpg';
import { Publicacion } from '../../../types/publicacion';

export const mockPublicaciones: Publicacion[] = [
  {
    id: '1',
    id_usuario: 'user-1',
    nombre_usuario: 'Elena Vance',
    foto_perfil: ImagenPerfil,
    verificado: true,
    foto_url: ImagenPublicacion,
    descripcion: 'Elegancia minimalista con un toque moderno.',
    hashtags: ['#Techwear', '#FutureFashion'],
    likes: 48,
    comentarios: 12,
    liked: false,
    creado_en: '2025-10-03T10:00:00Z'
  },
  {
    id: '2',
    id_usuario: 'user-2',
    nombre_usuario: 'Gratifa Fashion',
    foto_perfil: ImagenPerfil,
    verificado: true,
    foto_url: ImagenPublicacion,
    descripcion: 'Streetwear para la ciudad.',
    hashtags: ['#Streetwear'],
    likes: 102,
    comentarios: 8,
    liked: true,
    creado_en: '2025-10-03T09:00:00Z'
  }
];