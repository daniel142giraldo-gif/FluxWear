import { DarkTheme, DefaultTheme, Slot, ThemeProvider } from 'expo-router';

import { useColorScheme } from 'react-native';

import { UsuariosProvider } from "@/context/UsuarioContext";




export default function Layout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <UsuariosProvider>
        <Slot />
      </UsuariosProvider>
    </ThemeProvider>
  );
}
