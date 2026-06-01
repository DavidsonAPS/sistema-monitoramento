import { useEffect, useState } from 'react'
import {
  View,
 Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'

export function SensorForm({
  sensor,
  onSubmit,
}: any) {

  const [dispositivo, setDispositivo] =
    useState('')

  const [tipoSensor, setTipoSensor] =
    useState('')

  const [status, setStatus] =
    useState('')

  const [valor, setValor] =
    useState('')

  useEffect(() => {

    if (sensor) {

      setDispositivo(sensor.dispositivo)

      setTipoSensor(sensor.sensor)

      setStatus(sensor.status)

      setValor(String(sensor.valor))

    }

  }, [sensor])

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.label}>
        Dispositivo
      </Text>

      <TextInput
        style={styles.input}
        value={dispositivo}
        onChangeText={setDispositivo}
        placeholder="Ex: Galaxy S23"
      />

      <Text style={styles.label}>
        Sensor
      </Text>

      <TextInput
        style={styles.input}
        value={tipoSensor}
        onChangeText={setTipoSensor}
        placeholder="Ex: Bateria"
      />

      <Text style={styles.label}>
        Status
      </Text>

      <TextInput
        style={styles.input}
        value={status}
        onChangeText={setStatus}
        placeholder="Ex: Conectado"
      />

      <Text style={styles.label}>
        Valor
      </Text>

      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        placeholder="Ex: 85%"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          onSubmit({
            dispositivo,
            sensor: tipoSensor,
            status,
            valor,
          })
        }
      >

        <Text style={styles.buttonText}>
          Salvar
        </Text>

      </TouchableOpacity>

    </ScrollView>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },

  label: {
    color: '#FFF',
    marginBottom: 8,
    marginTop: 15,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#1E293B',
    color: '#FFF',
    padding: 15,
    borderRadius: 12,
  },

  button: {
    backgroundColor: '#3B82F6',
    padding: 18,
    borderRadius: 12,
    marginTop: 25,
  },

  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

})