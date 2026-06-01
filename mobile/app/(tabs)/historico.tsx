import { View, Text, StyleSheet } from 'react-native'

export default function Historico() {

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        📈 Histórico
      </Text>

      <Text style={styles.text}>
        Em breve gráficos e histórico dos sensores.
      </Text>

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  text: {
    color: '#94A3B8',
    marginTop: 10,
  },

})