import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

import { historicoAPI } from '../../lib/api'

interface HistoricoItem {

  id: number

  dispositivo: string

  sensor: string

  valor: string

  status: string

  criado_em: string

}

export default function Historico() {

  const [historico, setHistorico] =
    useState<HistoricoItem[]>([])

  const [loading, setLoading] =
    useState(true)

  const carregarHistorico =
    async () => {

      try {

        const usuario =
          await AsyncStorage.getItem(
            'usuario'
          )

        if (!usuario)
          return

        const dados =
          JSON.parse(usuario)

        const response =
          await historicoAPI
            .listarPorUsuario(
              dados.id
            )

        setHistorico(
          response.data
        )

      } catch (error) {

        console.log(
          'Erro histórico:',
          error
        )

      } finally {

        setLoading(false)

      }

    }

  useEffect(() => {

  carregarHistorico()

}, [])

  const formatarData = (
    data: string
  ) => {

    return new Date(data)
      .toLocaleString(
        'pt-BR'
      )

  }

  if (loading) {

    return (

      <View style={styles.loading}>

        <ActivityIndicator
          size="large"
          color="#3B82F6"
        />

      </View>

    )

  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        📈 Histórico
      </Text>

      <FlatList

        data={historico}

        keyExtractor={(item) =>
          item.id.toString()
        }

        contentContainerStyle={{
          padding: 16,
        }}

        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.sensor}>
              {item.sensor}
            </Text>

            <Text style={styles.valor}>
              {item.valor}
            </Text>

            <Text style={styles.status}>
              {item.status}
            </Text>

            <Text style={styles.dispositivo}>
              {item.dispositivo}
            </Text>

            <Text style={styles.data}>
              {formatarData(
                item.criado_em
              )}
            </Text>

          </View>

        )}

      />

    </View>

  )

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: '#0F172A',

    paddingTop: 60,

  },

  loading: {

    flex: 1,

    backgroundColor: '#0F172A',

    justifyContent: 'center',

    alignItems: 'center',

  },

  title: {

    color: '#FFF',

    fontSize: 28,

    fontWeight: 'bold',

    paddingHorizontal: 20,

    marginBottom: 15,

  },

  card: {

    backgroundColor: '#1E293B',

    borderRadius: 20,

    padding: 16,

    marginBottom: 12,

  },

  sensor: {

    color: '#FFF',

    fontSize: 18,

    fontWeight: 'bold',

  },

  valor: {

    color: '#3B82F6',

    fontSize: 24,

    fontWeight: 'bold',

    marginTop: 4,

  },

  status: {

    color: '#CBD5E1',

    marginTop: 4,

  },

  dispositivo: {

    color: '#94A3B8',

    marginTop: 8,

    fontSize: 13,

  },

  data: {

    color: '#64748B',

    marginTop: 6,

    fontSize: 12,

  },

})