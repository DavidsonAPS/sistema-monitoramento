import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'

import { sensoresAPI } from '../lib/api'

import * as Battery from 'expo-battery'
import * as Device from 'expo-device'
import * as Network from 'expo-network'

export interface Sensor {

  id: number

  dispositivo: string

  sensor: string

  status: string

  valor: any

}

export function useSensores() {

  const [sensores, setSensores] =
    useState<Sensor[]>([])

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)

  // =========================
  // LISTAR
  // =========================

  const listar = async () => {

    try {

      const usuario =
        await AsyncStorage.getItem(
          'usuario'
        )

      if (!usuario)
        return []

      const dados =
        JSON.parse(usuario)

      const response =
        await sensoresAPI
          .listarPorUsuario(
            dados.id
          )

      setSensores(
        response.data
      )

      return response.data

    } catch (err: any) {

      setError(

        err.message ||

        'Erro ao listar sensores'

      )

      return []

    }

  }

  // =========================
  // SALVAR SENSOR
  // =========================

  const salvarSensor = async (

    dispositivo: string,

    sensor: string,

    status: string,

    valor: any

  ) => {

    try {

      const usuario =
        await AsyncStorage.getItem(
          'usuario'
        )

      if (!usuario)
        return

      const usuarioLogado =
        JSON.parse(usuario)

      const response =
        await sensoresAPI
          .listarPorUsuario(
            usuarioLogado.id
          )

      const sensoresExistentes =
        response.data

      const existente =
        sensoresExistentes.find(
          (item: Sensor) =>

            item.dispositivo ===
              dispositivo &&

            item.sensor ===
              sensor
        )

      const dados = {

        dispositivo,

        sensor,

        status,

        valor,

        usuario_id:
          usuarioLogado.id,

      }

      if (existente?.id) {

        await sensoresAPI.atualizar(
          existente.id,
          dados
        )

      } else {

        await sensoresAPI.criar(
          dados
        )

      }

    } catch (err) {

      console.log(
        'Erro salvar sensor:',
        err
      )

    }

  }

  // =========================
  // IOT REAL
  // =========================

  const atualizarIoT =
    async () => {

      try {

        const modelo =
          Device.modelName ||
          'Smartphone'

        // =========================
        // BATERIA
        // =========================

        const batteryLevel =
          await Battery.getBatteryLevelAsync()

        const porcentagem =
          Math.round(
            batteryLevel * 100
          )

        const batteryState =
          await Battery.getBatteryStateAsync()

        let statusBateria =
          '❌ Cabo desconectado'

        if (

          batteryState ===
          Battery.BatteryState.CHARGING

        ) {

          statusBateria =
            '🔌 Cabo conectado'

        }

        else if (

          batteryState ===
          Battery.BatteryState.FULL

        ) {

          statusBateria =
            '⚡ Bateria cheia'

        }

        await salvarSensor(

          modelo,

          'Bateria',

          statusBateria,

          `${porcentagem}%`

        )

        // =========================
        // INTERNET
        // =========================

        const network =
          await Network.getNetworkStateAsync()

        let internet =
          'Offline'

        if (
          network.isConnected
        ) {

          internet =
            network.type ||
            'Online'

        }

        await salvarSensor(

          modelo,

          'Internet',

          '🌐 Conectado',

          internet

        )

        // =========================
        // REFRESH
        // =========================

        await listar()

        console.log(
          'IoT atualizado!'
        )

      } catch (err) {

        console.log(
          'Erro IoT:',
          err
        )

      }

    }

  // =========================
  // CRUD
  // =========================

  const criar = async (
    dados: Omit<Sensor, 'id'>
  ) => {

    await sensoresAPI.criar(
      dados
    )

    await listar()

  }

  const atualizar = async (
    id: number,
    dados: Partial<Sensor>
  ) => {

    await sensoresAPI.atualizar(
      id,
      dados
    )

    await listar()

  }

  const deletar = async (
    id: number
  ) => {

    await sensoresAPI.deletar(
      id
    )

    await listar()

  }

  // =========================
  // INICIAR
  // =========================

  useEffect(() => {

    listar()

    atualizarIoT()

    const intervalo =
      setInterval(() => {

        atualizarIoT()

      }, 5000)

    return () =>
      clearInterval(
        intervalo
      )

  }, [])

  return {

    sensores,

    loading,

    error,

    listar,

    criar,

    atualizar,

    deletar,

  }

}