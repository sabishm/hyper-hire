import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Formik, FormikErrors, FormikValues } from 'formik';
import { router } from 'expo-router';
import { Icon } from 'react-native-vector-icons/Icon';




const CompetitionSelector = () => {


    const insets = useSafeAreaInsets();


    return (
        <View style={{ paddingTop: insets.top, height: '100%', width: '100%', position: 'absolute', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', padding: 16 }}>

            <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, width: '100%' }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../../assets/icons/icon-title.png')} />
                    <Image source={require('../../assets/icons/close.png')} />
                </View>
                <Text style={{ fontSize: 32, color: "black", fontWeight: 'bold', paddingVertical: 16,paddingTop:32 }}>Welcome to Soo</Text>
                <Text style={{fontSize:18}}>Great to have you with us!</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 32 }}>
                    <TouchableNativeFeedback
                        style={{
                            height: 52,
                            maxWidth: 300, borderRadius: 52
                        }}
                        onPress={() => {

                        }}

                    >
                        <View style={{
                            height: 52,
                            width: 300,
                            display: 'flex',
                            backgroundColor: '#253BFF',
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            borderRadius: 52
                        }}>
                            <Text style={{ color: "white", marginLeft: 16 }}>Got It</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </View >
    );
}

export default CompetitionSelector;
