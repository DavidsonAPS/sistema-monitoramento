import { Tabs } from 'expo-router'

export default function TabLayout() {

  return (

    <Tabs

      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F172A',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#64748B',
      }}

    >

      <Tabs.Screen

        name="index"

        options={{
          title: 'Dashboard',
        }}

      />

      <Tabs.Screen

        name="perfil"

        options={{
          title: 'Perfil',
        }}

      />

    </Tabs>

  )

}