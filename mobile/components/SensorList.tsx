import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
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
  onEdit: (sensor: Sensor) => void
  onDelete: (id: number) => void
}

export function SensorList({
  sensores,
  loading,
  onEdit,
  onDelete,
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

  const getGradient = (sensor: string) => {

    switch (sensor) {

      case 'Bateria':
        return {
          bg: '#111827',
          border: '#1F2937',
        }

      case 'Internet':
        return {
          bg: '#0F172A',
          border: '#1E293B',
        }

      default:
        return {
          bg: '#111827',
          border: '#1F2937',
        }

    }

  }

  const getStatusColor = (status: string) => {

    if (
      status
        .toLowerCase()
        .includes('carregando')
    ) {

      return '#22C55E'

    }

    if (
      status
        .toLowerCase()
        .includes('conectado')
    ) {

      return '#3B82F6'

    }

    return '#EF4444'

  }

  return (

    <FlatList

      data={sensores}

      keyExtractor={(item) =>
        item.id.toString()
      }

      showsVerticalScrollIndicator={false}

      contentContainerStyle={{
        padding: 18,
        paddingBottom: 140,
      }}

      renderItem={({ item }) => {

        const theme =
          getGradient(
            item.sensor
          )

        return (

          <View
            style={[

              styles.card,

              {
                backgroundColor:
                  theme.bg,

                borderColor:
                  theme.border,
              },

            ]}
          >

            {/* HEADER */}

            <View style={styles.topRow}>

              <View>

                <Text style={styles.deviceName}>
                  {item.dispositivo}
                </Text>

                <Text style={styles.sensorName}>
                  {item.sensor}
                </Text>

              </View>

              <View
                style={[

                  styles.statusDot,

                  {
                    backgroundColor:
                      getStatusColor(
                        item.status
                      ),
                  },

                ]}
              />
            </View>

            {/* MEIO */}

            <View style={styles.middle}>

              <View style={styles.iconBox}>

                <Text style={styles.icon}>
                  {getIcone(
                    item.sensor
                  )}
                </Text>

              </View>

              <View>

                <Text style={styles.label}>
                  VALOR ATUAL
                </Text>

                <Text style={styles.value}>
                  {item.valor}
                </Text>

              </View>

            </View>

            {/* STATUS */}

            <View style={styles.statusContainer}>

              <Text style={styles.statusLabel}>
                STATUS
              </Text>

              <Text style={styles.statusText}>
                {item.status}
              </Text>

            </View>

            {/* BOTÕES */}

            <View style={styles.buttons}>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  onEdit(item)
                }
              >

                <Text style={styles.buttonText}>
                  Editar
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  onDelete(item.id)
                }
              >

                <Text style={styles.buttonText}>
                  Excluir
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        )

      }}

    />

  )

}

const styles = StyleSheet.create({

  card: {

    borderRadius: 30,

    padding: 22,

    marginBottom: 20,

    borderWidth: 1,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.25,

    shadowRadius: 20,

    elevation: 8,

  },

  topRow: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 24,

  },

  deviceName: {

    color: '#fff',

    fontSize: 28,

    fontWeight: '800',

    letterSpacing: -1,

  },

  sensorName: {

    color: '#94A3B8',

    marginTop: 4,

    fontSize: 15,

    fontWeight: '600',

  },

  statusDot: {

    width: 18,

    height: 18,

    borderRadius: 20,

  },

  middle: {

    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 25,

  },

  iconBox: {

    width: 85,

    height: 85,

    borderRadius: 25,

    backgroundColor: 'rgba(255,255,255,0.08)',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 18,

  },

  icon: {

    fontSize: 42,

  },

  label: {

    color: '#64748B',

    fontSize: 13,

    fontWeight: '700',

    marginBottom: 6,

  },

  value: {

    color: '#fff',

    fontSize: 38,

    fontWeight: '900',

    letterSpacing: -2,

  },

  statusContainer: {

    backgroundColor: 'rgba(255,255,255,0.06)',

    borderRadius: 22,

    padding: 18,

    marginBottom: 22,

  },

  statusLabel: {

    color: '#64748B',

    fontSize: 12,

    fontWeight: '700',

    marginBottom: 6,

  },

  statusText: {

    color: '#fff',

    fontSize: 18,

    fontWeight: '700',

  },

  buttons: {

    flexDirection: 'row',

    gap: 12,

  },

  editButton: {

    flex: 1,

    backgroundColor: '#4F46E5',

    paddingVertical: 16,

    borderRadius: 18,

    alignItems: 'center',

  },

  deleteButton: {

    flex: 1,

    backgroundColor: '#EF4444',

    paddingVertical: 16,

    borderRadius: 18,

    alignItems: 'center',

  },

  buttonText: {

    color: '#fff',

    fontWeight: '800',

    fontSize: 16,

  },

})