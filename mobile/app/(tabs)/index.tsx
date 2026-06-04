import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import { useSensores } from '../../hooks/useSensores'
import { SensorList } from '../../components/SensorList'

export default function HomeScreen() {

  const {
    sensores,
    loading,
    error,
  } = useSensores()

  const sensoresOnline =
    sensores.filter(sensor =>
      sensor.status
        ?.toLowerCase()
        .includes('conect')
    ).length

  const disponibilidade =
    sensores.length > 0
      ? Math.round(
          (sensoresOnline /
            sensores.length) *
            100
        )
      : 0

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
          Monitoramento IoT em tempo real
        </Text>

        <View style={styles.statsContainer}>

          <View style={styles.statCard}>

            <Text style={styles.statValue}>
              {sensores.length}
            </Text>

            <Text style={styles.statLabel}>
              Sensores
            </Text>

          </View>

          <View style={styles.statCard}>

            <Text style={styles.statValue}>
              {sensoresOnline}
            </Text>

            <Text style={styles.statLabel}>
              Online
            </Text>

          </View>

          <View style={styles.statCard}>

            <Text style={styles.statValue}>
              {disponibilidade}%
            </Text>

            <Text style={styles.statLabel}>
              Disponibilidade
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
      />

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

    gap: 10,

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

    fontSize: 22,

    fontWeight: 'bold',

  },

  statLabel: {

    color: '#94A3B8',

    marginTop: 4,

    fontSize: 12,

  },

  error: {

    color: '#EF4444',

    marginTop: 12,

  },

})