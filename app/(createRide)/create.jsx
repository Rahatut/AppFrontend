import React, { useRef, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps' // REMOVE PROVIDER_GOOGLE
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { StyledText as Text } from '../../components/StyledText'
import { StyledCardButton as CardButton } from '../../components/StyledCardButton'

const INITIAL_REGION = {
  latitude: 23.8103,
  longitude: 90.4125,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function CreateRide() {
  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const onPlaceSelected = (data, details) => {
    if (!details?.geometry?.location) return;
    const { lat, lng } = details.geometry.location;
    const region = { latitude: lat, longitude: lng, latitudeDelta: 0.01, longitudeDelta: 0.01 };
    setSelectedPlace({
      name: details.name || data.description,
      address: details.formatted_address || data.description,
      latitude: lat,
      longitude: lng,
    });
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search your destination</Text>

      
<GooglePlacesAutocomplete
  placeholder="Where would you like to go?"
  onPress={onPlaceSelected}
  fetchDetails
  query={{
    key: 'AIzaSyDGHhGjKrKCnYujl1YkRilpbUk2P1IMzCM', 
    language: 'en',
  }}
  onFail={error => alert('Google Places error: ' + error)}
  styles={{
    textInput: styles.searchInput,
    listView: styles.autocompleteList,
  }}
/>


      // ...existing code...
      <View style={styles.mapWrapper}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={INITIAL_REGION}
        >
          {selectedPlace && (
            <Marker
              coordinate={{
                latitude: selectedPlace.latitude,
                longitude: selectedPlace.longitude,
              }}
              title={selectedPlace.name}
              description={selectedPlace.address}
            />
          )}
        </MapView>
      </View>
// ...existing code...

      {selectedPlace && (
        <View style={{ width: '100%' }}>
          <Text style={styles.subtitle}>Your preferred transport</Text>

          <CardButton>
            <View style={styles.transportRow}>
              <Text style={styles.transportIcon}>🚗</Text>
              <Text style={styles.transportText}>Car</Text>
            </View>
          </CardButton>
          <CardButton>
            <View style={styles.transportRow}>
              <Text style={styles.transportIcon}>🛺</Text>
              <Text style={styles.transportText}>CNG</Text>
            </View>
          </CardButton>
          <CardButton>
            <View style={styles.transportRow}>
              <Text style={styles.transportIcon}>🚌</Text>
              <Text style={styles.transportText}>Bus</Text>
            </View>
          </CardButton>

          <TouchableOpacity style={styles.primaryCta}>
            <Text style={styles.primaryCtaText}>Create Ride</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
  subtitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 6,
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#000000',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  autocompleteList: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  mapWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 500,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#e6e6e6',
    marginTop: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  transportRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transportIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  transportText: {
    fontSize: 16,
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


