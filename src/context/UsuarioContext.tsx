import { createContext, useState } from "react";

export const UsuarioContext = createContext<any>(null);

export function UsuarioProvider({ children }: { children: React.ReactNode }) {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  return (
    <UsuarioContext.Provider
      value={{
        nombre,
        setNombre,
        correo,
        setCorreo,
        contraseña,
        setContraseña,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}