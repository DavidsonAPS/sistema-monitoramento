import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

interface Sensor {
  id: number
  dispositivo: string
  sensor: string
  status: string
  valor: any
}

interface Props {
  sensores: Sensor[]
  loading: boolean
}

export function SensorList({
  sensores,
  loading,
}: Props) {

  if (loading) {

    return (

      <ActivityIndicator
        size="large"
        color="#4F46E5"
        style={{
          marginTop: 40,
        }}
      />

    )

  }

  const getIcone = (sensor: string) => {

    switch (sensor) {

      case 'Bateria':
        return '🔋'

      case 'Internet':
        return '🌐'

      case 'GPS':
        return '📍'

      default:
        return '📡'

    }

  }

  const dispositivos = sensores.reduce(
    (acc: any, sensor) => {

      if (!acc[sensor.dispositivo]) {

        acc[sensor.dispositivo] = []

      }

      acc[sensor.dispositivo].push(sensor)

      return acc

    },
    {}
  )

  const listaDispositivos =
    Object.entries(dispositivos)

  return (

    <FlatList

      data={listaDispositivos}

      keyExtractor={([nome]) => nome}

      showsVerticalScrollIndicator={false}

      contentContainerStyle={{
        padding: 18,
        paddingBottom: 80,
      }}

      renderItem={({ item }) => {

        const [dispositivo, sensoresDoDispositivo] =
          item as [string, Sensor[]]

        return (

          <View style={styles.card}>

            <View style={styles.header}>

              <Text style={styles.deviceName}>
                📱 {dispositivo}
              </Text>

              <View style={styles.onlineDot} />

            </View>

            {sensoresDoDispositivo.map(sensor => (

              <View
                key={sensor.id}
                style={styles.sensorItem}
              >

                <View
                  style={styles.sensorHeader}
                >

                  <Text
                    style={styles.sensorTitle}
                  >
                    {getIcone(sensor.sensor)}
                    {' '}
                    {sensor.sensor}
                  </Text>

                  <Text
                    style={styles.sensorValue}
                  >
                    {sensor.valor}
                  </Text>

                </View>

                <Text
                  style={styles.sensorStatus}
                >
                  {sensor.status}
                </Text>

              </View>

            ))}

          </View>

        )

      }}

    />

  )

}

const styles = StyleSheet.create({

  card: {

    backgroundColor: '#111827',

    borderColor: '#1F2937',

    borderWidth: 1,

    borderRadius: 28,

    padding: 22,

    marginBottom: 20,

  },

  header: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 20,

  },

  deviceName: {

    color: '#FFF',

    fontSize: 24,

    fontWeight: '800',

  },

  onlineDot: {

    width: 14,

    height: 14,

    borderRadius: 20,

    backgroundColor: '#22C55E',

  },

  sensorItem: {

    backgroundColor:
      'rgba(255,255,255,0.05)',

    borderRadius: 16,

    padding: 15,

    marginBottom: 12,

  },

  sensorHeader: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

  },

  sensorTitle: {

    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: '700',

  },

  sensorValue: {

    color: '#3B82F6',

    fontSize: 18,

    fontWeight: '800',

  },

  sensorStatus: {

    color: '#94A3B8',

    marginTop: 6,

    fontSize: 13,

  },

})