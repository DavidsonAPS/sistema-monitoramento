import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native'
import { Sensor } from '../hooks/useSensores'

interface SensorFormProps {
  sensor?: Sensor | null
  onSubmit: (dados: Omit<Sensor, 'id'>) => void
  loading: boolean
}

export function SensorForm({ sensor, onSubmit, loading }: SensorFormProps) {
  const [nome, setNome] = useState('')
  const [localizacao, setLocalizacao] = useState('')
  const [status, setStatus] = useState('ativo')
  const [temperatura, setTemperatura] = useState('')

  useEffect(() => {
    if (sensor) {
      setNome(sensor.nome)
      setLocalizacao(sensor.localizacao)
      setStatus(sensor.status)
      setTemperatura(sensor.temperatura.toString())
    } else {
      setNome('')
      setLocalizacao('')
      setStatus('ativo')
      setTemperatura('')
    }
  }, [sensor])

  const handleSubmit = () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Nome é obrigatório')
      return
    }
    if (!localizacao.trim()) {
      Alert.alert('Erro', 'Localização é obrigatória')
      return
    }
    if (!temperatura.trim() || isNaN(parseFloat(temperatura))) {
      Alert.alert('Erro', 'Temperatura deve ser um número válido')
      return
    }

    onSubmit({
      nome: nome.trim(),
      localizacao: localizacao.trim(),
      status,
      temperatura: parseFloat(temperatura),
    })
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome do Sensor</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Sensor Temperatura 01"
        value={nome}
        onChangeText={setNome}
        editable={!loading}
      />

      <Text style={styles.label}>Localização</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Sala de Servidores"
        value={localizacao}
        onChangeText={setLocalizacao}
        editable={!loading}
      />

      <Text style={styles.label}>Temperatura (°C)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 25.5"
        value={temperatura}
        onChangeText={setTemperatura}
        keyboardType="decimal-pad"
        editable={!loading}
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[
            styles.statusBtn,
            status === 'ativo' && styles.statusBtnActive,
          ]}
          onPress={() => setStatus('ativo')}
          disabled={loading}
        >
          <Text
            style={[
              styles.statusText,
              status === 'ativo' && styles.statusTextActive,
            ]}
          >
            Ativo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusBtn,
            status === 'inativo' && styles.statusBtnActive,
          ]}
          onPress={() => setStatus('inativo')}
          disabled={loading}
        >
          <Text
            style={[
              styles.statusText,
              status === 'inativo' && styles.statusTextActive,
            ]}
          >
            Inativo
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.btnSubmit, loading && styles.btnSubmitDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.btnText}>
          {loading ? 'Salvando...' : sensor ? 'Atualizar' : 'Criar'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statusBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  statusBtnActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  statusTextActive: {
    color: '#fff',
  },
  btnSubmit: {
    backgroundColor: '#34C759',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  btnSubmitDisabled: {
    backgroundColor: '#ccc',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
