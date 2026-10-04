import uuid from 'react-native-uuid';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from '../../../lib/storage/mmkv-adapter';
import { RegistroForm, Usuario } from '../../../types/usuario';

type SocialStore = {
  usuarios: Usuario[];
  usuarioActual: Usuario | null;
  registrar: (form: RegistroForm) => { ok: boolean; error?: string };
  login: (correo: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

export const useSocialStore = create<SocialStore>()(
  persist(
    (set, get) => ({
      usuarios: [],
      usuarioActual: null,

      registrar: (form) => {
        if (form.password !== form.confirmarPassword) {
          return { ok: false, error: 'Las contraseñas no coinciden' };
        }
        if (get().usuarios.some(u => u.correo === form.correo)) {
          return { ok: false, error: 'Correo ya registrado' };
        }

        const nuevo: Usuario = {
          id_usuario: uuid.v4() as string,
          nombre: form.nombre,
          nombre_usuario: form.nombre_usuario,
          correo: form.correo,
          telefono: form.telefono,
          edad: form.edad,
          peso: form.peso,
          estatura: form.estatura,
          password_hash: form.password,
          foto_perfil: 'https://i.pravatar.cc/300?u=' + form.correo,
          verificado: false,
          bio: 'Nuevo en FluxWear',
          creado_en: new Date().toISOString(),
        };

        set(state => ({
          usuarios: [...state.usuarios, nuevo],
          usuarioActual: nuevo,
        }));
        return { ok: true };
      },

      login: (correo, password) => {
        const user = get().usuarios.find(u => u.correo === correo && u.password_hash === password);
        if (!user) return { ok: false, error: 'Credenciales incorrectas' };
        set({ usuarioActual: user });
        return { ok: true };
      },

      logout: () => set({ usuarioActual: null }),
    }),
    {
      name: 'fluxwear-social-store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);