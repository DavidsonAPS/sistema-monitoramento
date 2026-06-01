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

        <Text style={styles.welcome}>
          Olá 👋
        </Text>

        <Text style={styles.title}>
          SmartMonitor
        </Text>

        <Text style={styles.subtitle}>
          Plataforma de Monitoramento IoT
        </Text>

        <View style={styles.statsContainer}>

          <View style={styles.statCard}>

            <Text style={styles.statValue}>
              {sensores.length}
            </Text>

            <Text style={styles.statLabel}>
              Dispositivos
            </Text>

          </View>

          <View style={styles.statCard}>

            <Text style={styles.statValue}>
              {
                sensores.filter(
                  sensor =>
                    sensor.status
                      ?.toLowerCase()
                      .includes('conect')
                ).length
              }
            </Text>

            <Text style={styles.statLabel}>
              Online
            </Text>

          </View>

        </View>

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
        }
      >

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

        }}
      >

        <View style={styles.modalHeader}>

          <TouchableOpacity
            onPress={() => {

              setModalVisivel(false)

              setSensorSelecionado(null)

            }}
          >

            <Text style={styles.closeBtn}>
              ✕
            </Text>

          </TouchableOpacity>

          <Text style={styles.modalTitle}>

            {sensorSelecionado
              ? 'Editar Dispositivo'
              : 'Novo Dispositivo'}

          </Text>

          <View
            style={{
              width: 40,
            }}
          />

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

    backgroundColor: '#0F172A',

  },

  header: {

    paddingTop: 60,

    paddingHorizontal: 20,

    paddingBottom: 25,

    backgroundColor: '#0F172A',

  },

  welcome: {

    color: '#94A3B8',

    fontSize: 16,

  },

  title: {

    color: '#FFFFFF',

    fontSize: 34,

    fontWeight: '900',

    marginTop: 4,

  },

  subtitle: {

    color: '#CBD5E1',

    marginTop: 4,

    fontSize: 15,

  },

  statsContainer: {

    flexDirection: 'row',

    gap: 12,

    marginTop: 20,

  },

  statCard: {

    flex: 1,

    backgroundColor: '#1E293B',

    padding: 18,

    borderRadius: 18,

  },

  statValue: {

    color: '#FFFFFF',

    fontSize: 26,

    fontWeight: 'bold',

  },

  statLabel: {

    color: '#94A3B8',

    marginTop: 4,

  },

  error: {

    color: '#EF4444',

    marginTop: 12,

  },

  fab: {

    position: 'absolute',

    bottom: 25,

    right: 20,

    width: 70,

    height: 70,

    borderRadius: 35,

    backgroundColor: '#3B82F6',

    justifyContent: 'center',

    alignItems: 'center',

    shadowColor: '#000',

    shadowOpacity: 0.3,

    shadowRadius: 10,

    elevation: 10,

  },

  fabText: {

    color: '#FFFFFF',

    fontSize: 34,

    fontWeight: 'bold',

  },

  modalHeader: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    backgroundColor: '#0F172A',

    paddingTop: 60,

    paddingBottom: 20,

    paddingHorizontal: 20,

  },

  modalTitle: {

    color: '#FFFFFF',

    fontSize: 20,

    fontWeight: 'bold',

  },

  closeBtn: {

    color: '#FFFFFF',

    fontSize: 28,

    fontWeight: 'bold',

  },

})