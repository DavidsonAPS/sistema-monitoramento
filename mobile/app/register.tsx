import { useState } from 'react'
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

export default function Register() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const cadastrar = async () => {

    if (!nome || !email || !senha) {

      Alert.alert(
        'Campos obrigatórios',
        'Preencha todos os campos.'
      )

      return
    }

    try {

      await axios.post(
        'http://192.168.0.191:3000/register',
        {
          nome,
          email,
          senha,
        }
      )

      Alert.alert(
        'Conta criada!',
        'Agora faça login.'
      )

      router.replace('/login')

    } catch (error: any) {

      Alert.alert(
        'Erro',
        error?.response?.data?.erro ||
        'Não foi possível criar a conta.'
      )

    }

  }

  return (

    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.logo}>
          🚀
        </Text>

        <Text style={styles.title}>
          Criar Conta
        </Text>

        <Text style={styles.subtitle}>
          Cadastre-se para acessar
          {'\n'}
          o SmartMonitor
        </Text>

        <TextInput
          placeholder="👤 Nome completo"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          placeholder="📧 Seu email"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="🔒 Crie uma senha"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={cadastrar}
        >

          <Text style={styles.buttonText}>
            Criar Conta
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.replace('/login')
          }
        >

          <Text style={styles.link}>
            Já possui conta? Entrar
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
    backgroundColor: '#10B981',
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