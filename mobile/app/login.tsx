import { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'

import axios from 'axios'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  useEffect(() => {

    verificarLogin()

  }, [])

  const verificarLogin = async () => {

    try {

      const usuario =
        await AsyncStorage.getItem(
          'usuario'
        )

      if (usuario) {

        router.replace('/(tabs)')

      }

    } catch (error) {

      console.log(
        'Erro ao verificar login:',
        error
      )

    }

  }

  const fazerLogin = async () => {

    try {

      const response = await axios.post(
        'http://192.168.0.191:3000/login',
        {
          email,
          senha,
        }
      )

      await AsyncStorage.setItem(
        'usuario',
        JSON.stringify(
          response.data.usuario
        )
      )

      await AsyncStorage.setItem(
        'token',
        response.data.token
      )

      Alert.alert(
        'Sucesso',
        `Bem-vindo ${response.data.usuario.nome}`
      )

      router.replace('/(tabs)')

    } catch {

      Alert.alert(
        'Erro',
        'Email ou senha inválidos'
      )

    }

  }

  return (

    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.logo}>
          📡
        </Text>

        <Text style={styles.title}>
          SmartMonitor
        </Text>

        <Text style={styles.subtitle}>
          Plataforma Inteligente de
          {'\n'}
          Monitoramento IoT
        </Text>

        <TextInput
          placeholder="📧 Digite seu email"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="🔒 Digite sua senha"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={fazerLogin}
        >

          <Text style={styles.buttonText}>
            Entrar
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push('/register')
          }
        >

          <Text style={styles.link}>
            Não possui conta? Criar conta
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
    padding: 20,
  },

  card: {
    backgroundColor: '#1E293B',
    borderRadius: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },

  logo: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },

  input: {
    backgroundColor: '#334155',
    color: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#3B82F6',
    padding: 18,
    borderRadius: 15,
    marginTop: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },

  link: {
    color: '#60A5FA',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
  },

})