import { Tabs } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // quita la barra blanca de arriba
        tabBarActiveTintColor: '#00D1FF', // tu azul FluxWear para el activo
        tabBarInactiveTintColor: '#6b7280', // gris para los inactivos
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: { 
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: '#0a0a0a',
          borderRadius: 30,
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          shadowColor: '#00D1FF',
          shadowOffset: { width: 0, height: 4},
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 10,
        }, // ponla negra
        tabBarItemStyle: {
            paddingVertical: 2,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '300',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{
        title: 'Inicio',
          tabBarIcon: ({ color, focused}) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} 
              size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen 
      name="explorar" 
      options={{
        title: 'Explorar',
          tabBarIcon: ({ color, focused}) => (
            <Ionicons name={focused ? 'compass' : 'compass-outline'} 
              size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen 
      name="ia" 
      options={{
        title: 'IA',
          tabBarIcon: ({ color, focused}) => (
            <Ionicons name={focused ? 'sparkles' : 'sparkles-outline'} 
              size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen 
      name="comunidad" 
      options={{
        title: 'Comunidad',
          tabBarIcon: ({ color, focused}) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} 
              size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen 
        name="perfil" 
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused}) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} 
              size={28} color={color} />
          )
        }}
      />
    </Tabs>
  );
}