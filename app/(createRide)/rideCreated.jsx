import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { StyledText as Text } from '../../components/StyledText'
import { StyledCardButton as CardButton } from '../../components/StyledCardButton'

export default function RideCreated() {
  const { address = 'Destination', transport = 'UberX' } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your ride is created!</Text>

      <CardButton>
        <View style={{width: '100%'}}>
          <Text style={{fontSize: 14}}>📍 {address}</Text>
          <Text style={{marginTop: 4}}>{transport}   BDT 616.64</Text>
          <Text style={{color: '#666', marginTop: 6}}>Preferences</Text>
        </View>
      </CardButton>

      <View style={styles.mapWrapper} />

      <Text style={{marginTop: 20}}>Other Users can now see your ride.</Text>
      <Text>Check ride join requests in ride notifications option.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 10, backgroundColor: '#f7f7f7' },
  title: { fontWeight: 'bold', fontSize: 22, marginTop: 15 },
  mapWrapper: { width: '100%', aspectRatio: 1, borderRadius: 500, overflow: 'hidden', borderWidth: 1, borderColor: '#000000', backgroundColor: '#e6e6e6', marginTop: 10 },
})





