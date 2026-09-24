import { createContext, useContext, useState, type ReactNode } from "react";

type Usuario = {
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

type UsuariosContextType = {
  usuarios: Usuario[];
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
};

const UsuariosContext = createContext<UsuariosContextType | null>(null);

export function UsuariosProvider({ children }: { children: ReactNode }) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  return (
    <UsuariosContext.Provider value={{ usuarios, setUsuarios }}>
      {children}
    </UsuariosContext.Provider>
  );
}

export function useUsuarios() {
  const context = useContext(UsuariosContext);

  if (!context) {
    throw new Error("useUsuarios debe utilizarse dentro de UsuariosProvider");
  }

  return context;
}