import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'

export default function Perfil() {

  const [usuario, setUsuario] =
    useState<any>(null)

  useEffect(() => {

    carregarUsuario()

  }, [])

  const carregarUsuario =
    async () => {

      try {

        const dados =
          await AsyncStorage.getItem(
            'usuario'
          )

        if (dados) {

          setUsuario(
            JSON.parse(dados)
          )

        }

      } catch (error) {

        console.log(error)

      }

    }

  const sair = async () => {

    await AsyncStorage.removeItem(
      'usuario'
    )

    await AsyncStorage.removeItem(
      'token'
    )

    router.replace('/login')

  }

  return (

    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.avatar}>
          👤
        </Text>

        <Text style={styles.nome}>
          {usuario?.nome || 'Usuário'}
        </Text>

        <Text style={styles.email}>
          {usuario?.email || ''}
        </Text>

        <Text style={styles.id}>
          ID: {usuario?.id || '-'}
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

    </View>

  )

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: '#0F172A',

    justifyContent: 'center',

    alignItems: 'center',

    padding: 20,

  },

  card: {

    width: '100%',

    backgroundColor: '#1E293B',

    borderRadius: 25,

    padding: 30,

    alignItems: 'center',

  },

  avatar: {

    fontSize: 90,

  },

  nome: {

    color: '#FFF',

    fontSize: 26,

    fontWeight: 'bold',

    marginTop: 15,

  },

  email: {

    color: '#94A3B8',

    marginTop: 10,

    fontSize: 15,

  },

  id: {

    color: '#64748B',

    marginTop: 8,

    fontSize: 13,

  },

  button: {

    marginTop: 30,

    backgroundColor: '#EF4444',

    paddingHorizontal: 35,

    paddingVertical: 15,

    borderRadius: 15,

  },

  buttonText: {

    color: '#FFF',

    fontWeight: 'bold',

    fontSize: 16,

  },

})