import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native'

import { useSensores } from '../../hooks/useSensores'
import { SensorList } from '../../components/SensorList'
import { SensorForm } from '../../components/SensorForm'

export default function HomeScreen() {

  const {
    sensores,
    loading,
    error,
    criar,
    atualizar,
    deletar,
  } = useSensores()

  const [sensorSelecionado, setSensorSelecionado] =
    useState<any>(null)

  const [modalVisivel, setModalVisivel] =
    useState(false)

  const handleCriar = async (dados: any) => {

    try {

      await criar(dados)

      setModalVisivel(false)

      setSensorSelecionado(null)

    } catch (err) {

      console.error(
        'Erro ao criar:',
        err
      )

    }

  }

  const handleAtualizar = async (
    dados: any
  ) => {

    try {

      if (sensorSelecionado !== null) {

        await atualizar(
          sensorSelecionado.id,
          dados
        )

        setModalVisivel(false)

        setSensorSelecionado(null)

      }

    } catch (err) {

      console.error(
        'Erro ao atualizar:',
        err
      )

    }

  }

  const handleDeletar = async (
    id: number
  ) => {

    try {

      await deletar(id)

    } catch (err) {

      console.error(
        'Erro ao deletar:',
        err
      )

    }

  }

  const abrirFormulario = (
    sensor: any = null
  ) => {

    setSensorSelecionado(sensor)

    setModalVisivel(true)

  }

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.title}>

          📊 Monitoramento de Sensores

        </Text>

        {error && (

          <Text style={styles.error}>

            {error}

          </Text>

        )}

      </View>

      <SensorList
        sensores={sensores}
        loading={loading}
        onEdit={abrirFormulario}
        onDelete={handleDeletar}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          abrirFormulario()
        }>

        <Text style={styles.fabText}>

          +

        </Text>

      </TouchableOpacity>

      <Modal
        visible={modalVisivel}
        animationType="slide"
        onRequestClose={() => {

          setModalVisivel(false)

          setSensorSelecionado(null)

        }}>

        <View style={styles.modalHeader}>

          <TouchableOpacity
            onPress={() => {

              setModalVisivel(false)

              setSensorSelecionado(null)

            }}>

            <Text style={styles.closeBtn}>

              ✕

            </Text>

          </TouchableOpacity>

          <Text style={styles.modalTitle}>

            {sensorSelecionado
              ? 'Editar Sensor'
              : 'Novo Sensor'}

          </Text>

          <View style={{ width: 40 }} />

        </View>

        <SensorForm
          sensor={sensorSelecionado}
          loading={loading}
          onSubmit={
            sensorSelecionado
              ? handleAtualizar
              : handleCriar
          }
        />

      </Modal>

    </View>

  )

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: '#f5f5f5',

  },

  header: {

    backgroundColor: '#007AFF',

    paddingVertical: 20,

    paddingHorizontal: 15,

    paddingTop: 40,

  },

  title: {

    fontSize: 24,

    fontWeight: 'bold',

    color: '#fff',

    marginBottom: 5,

  },

  error: {

    color: '#FF3B30',

    fontSize: 14,

    marginTop: 5,

  },

  fab: {

    position: 'absolute',

    bottom: 20,

    right: 20,

    width: 60,

    height: 60,

    borderRadius: 30,

    backgroundColor: '#34C759',

    justifyContent: 'center',

    alignItems: 'center',

    shadowColor: '#000',

    shadowOffset: {

      width: 0,
      height: 2,

    },

    shadowOpacity: 0.3,

    shadowRadius: 4,

    elevation: 5,

  },

  fabText: {

    color: '#fff',

    fontSize: 30,

    fontWeight: 'bold',

  },

  modalHeader: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    paddingHorizontal: 15,

    paddingVertical: 15,

    backgroundColor: '#007AFF',

    paddingTop: 50,

  },

  modalTitle: {

    fontSize: 18,

    fontWeight: 'bold',

    color: '#fff',

  },

  closeBtn: {

    fontSize: 28,

    color: '#fff',

    fontWeight: 'bold',

  },

})