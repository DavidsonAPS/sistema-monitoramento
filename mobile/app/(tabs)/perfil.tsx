import { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

export default function Perfil() {

  const [usuario, setUsuario] =
    useState<any>(null)

  useEffect(() => {

    carregarUsuario()

  }, [])

  const carregarUsuario =
    async () => {

      const dados =
        await AsyncStorage.getItem(
          'usuario'
        )

      if (dados) {

        setUsuario(
          JSON.parse(dados)
        )

      }

    }

  const sair = async () => {

    Alert.alert(

      'Sair',

      'Deseja realmente sair?',

      [

        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {

          text: 'Sair',

          onPress: async () => {

            await AsyncStorage.removeItem(
              'usuario'
            )

            await AsyncStorage.removeItem(
              'token'
            )

            router.replace('/login')

          },

        },

      ]

    )

  }

  return (

    <View style={styles.container}>

      <Text style={styles.avatar}>
        👤
      </Text>

      <Text style={styles.nome}>
        {usuario?.nome || 'Usuário'}
      </Text>

      <Text style={styles.email}>
        {usuario?.email || ''}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={sair}
      >

        <Text style={styles.buttonText}>
          Sair
        </Text>

      </TouchableOpacity>

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    fontSize: 90,
  },

  nome: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },

  email: {
    color: '#94A3B8',
    marginTop: 8,
    fontSize: 16,
  },

  button: {
    marginTop: 40,
    backgroundColor: '#EF4444',
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 14,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

})