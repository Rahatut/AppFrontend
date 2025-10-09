import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StyledText as Text } from '../../components/StyledText'
import { StyledCardButton as CardButton } from '../../components/StyledCardButton'

export default function TransportOptions() {
  const router = useRouter();
  const { address = 'Destination', transport = 'Uber' } = useLocalSearchParams();

  const options = [
    { name: 'UberX', price: 'BDT 616.64', badge: 'Faster' },
    { name: 'Premier', price: 'BDT 699.51', badge: 'Good deal' },
    { name: 'Premier Reserve', price: 'BDT 839.30', badge: 'Top drivers' },
    { name: 'Go Rentals', price: 'BDT 713.30', badge: 'Multiple stops' },
  ];

  return (
    <ScrollView>
      <Text style={styles.title}>Your destination</Text>

      <CardButton>
        <View style={{width: '100%'}}>
          <Text style={{fontSize: 14}}>To</Text>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{address}</Text>
        </View>
      </CardButton>

      <CardButton>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{transport}</Text>
            <Text style={{marginLeft: 10}}>UberX</Text>
          </View>
          <Text>BDT 616.64</Text>
        </View>
      </CardButton>

      <CardButton>
        <View style={{width: '100%'}}>
          <Text style={{fontWeight: 'bold', fontSize: 24, marginBottom: 10}}>Uber</Text>
          {options.map((opt, idx) => (
            <View key={idx} style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14}}>
              <View>
                <Text style={{fontWeight: 'bold'}}>{opt.name}</Text>
                <Text style={{color: '#666', fontSize: 12}}>{opt.badge}</Text>
              </View>
              <Text>{opt.price}</Text>
            </View>
          ))}
        </View>
      </CardButton>

      <TouchableOpacity style={styles.primaryCta} onPress={() => router.push({ pathname: '/ridePreferences', params: { address, transport } })}>
        <Text style={styles.primaryCtaText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 10,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 15,
  },
  primaryCta: {
    marginTop: 10,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
  },
  primaryCtaText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
})




