import React, { useContext } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Formik, FormikErrors, FormikValues } from 'formik';
import { router } from 'expo-router';
import { Icon } from 'react-native-vector-icons/Icon';
import { AppContext } from '@/constants/AppContext';




const CompetitionSelector = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('AppContext must be used within an AppProvider');
    }

    const { selectedCompetion, setSelectedCompetion } = context;


    const insets = useSafeAreaInsets();

    const data = [
        {
            title: "20th Asian Game - Achi Nagoya 2026 (Winter)",
            dateFrom: "2024-06-28",
            dateEnd: "2024-06-30",
            place: "Pyeongchang, Gangwon-do, Korea"
        },
        {
            title: "20th Asian Game - Achi Nagoya 2026 (Winter)",
            dateFrom: "2024-06-28",
            dateEnd: "2024-06-30",
            place: "Pyeongchang, Gangwon-do, Korea"
        },
        {
            title: "20th Asian Game - Achi Nagoya 2026 (Winter)",
            dateFrom: "2024-06-28",
            dateEnd: "2024-06-30",
            place: "Pyeongchang, Gangwon-do, Korea"
        },
        {
            title: "20th Asian Game - Achi Nagoya 2026 (Winter)",
            dateFrom: "2024-06-28",
            dateEnd: "2024-06-30",
            place: "Pyeongchang, Gangwon-do, Korea"
        },
        {
            title: "20th Asian Game - Achi Nagoya 2026 (Winter)",
            dateFrom: "2024-06-28",
            dateEnd: "2024-06-30",
            place: "Pyeongchang, Gangwon-do, Korea"
        },
        {
            title: "20th Asian Game - Achi Nagoya 2026 (Winter)",
            dateFrom: "2024-06-28",
            dateEnd: "2024-06-30",
            place: "Pyeongchang, Gangwon-do, Korea"
        },
        {
            title: "20th Asian Game - Achi Nagoya 2026 (Winter)",
            dateFrom: "2024-06-28",
            dateEnd: "2024-06-30",
            place: "Pyeongchang, Gangwon-do, Korea"
        },
        {
            title: "20th Asian Game - Achi Nagoya 2026 (Winter)",
            dateFrom: "2024-06-28",
            dateEnd: "2024-06-30",
            place: "Pyeongchang, Gangwon-do, Korea"
        },
        {
            title: "20th Asian Game - Achi Nagoya 2026 (Winter)",
            dateFrom: "2024-06-28",
            dateEnd: "2024-06-30",
            place: "Pyeongchang, Gangwon-do, Korea"
        },
        {
            title: "20th Asian Game - Achi Nagoya 2026 (Winter)",
            dateFrom: "2024-06-28",
            dateEnd: "2024-06-30",
            place: "Pyeongchang, Gangwon-do, Korea"
        },
        {
            title: "20th Asian Game - Achi Nagoya 2026 (Winter)",
            dateFrom: "2024-06-28",
            dateEnd: "2024-06-30",
            place: "Pyeongchang, Gangwon-do, Korea"
        },
    ]


    return (
        <View style={{ paddingTop: insets.top, height: '100%', width: '100%', position: 'absolute', backgroundColor: 'white' }}>
            {/* App Bar */}
            <View style={{ height: 56, marginTop: 16, width: '100%', paddingHorizontal: 16, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    router.back();
                }}>
                    <Image source={require('../../assets/icons/competition_left.png')} />
                </TouchableOpacity>
                <View style={{ width: 8 }} />
                <View style={styles.searchSection}>
                    <TextInput placeholder='Search' style={{ ...styles.input, paddingRight: 34 }} />
                    <View style={{ paddingRight: 8, position: 'absolute', right: 0, bottom: 0, top: 0, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }} >
                        <Image source={require('../../assets/icons/search.png')} />
                    </View>
                </View>
            </View>

            <ScrollView>
                <View style={{ paddingHorizontal: 16 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 32, marginTop: 16 }}>Competition</Text>
                    <Text>An account is needed per one host. If you already have an account for the host of competition you want to sign up, you can login and  register.</Text>
                    {
                        data.map((elm) => {
                            return (
                                <View style={{ marginVertical: 8 }}>
                                    <TouchableNativeFeedback onPress={() => {
                                        setSelectedCompetion(elm.title)
                                        router.back();
                                    }}>
                                        <View style={{ backgroundColor: '#253BFF', padding: 32, borderRadius: 16, position: 'relative', width: '100%' }}>
                                            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                                                <Image style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    source={require('../../assets/icons/competition_bg.png')} />
                                            </View>
                                            <View>
                                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 22 }}>{elm.title}</Text>
                                                <Text style={{ color: 'white', fontSize: 18, marginTop: 8 }}>{elm.dateFrom + " ~ " + elm.dateEnd}</Text>
                                                <Text style={{ color: "#B8BFFF" }}>{elm.place}</Text>
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'relative',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        position: 'absolute',
        height: 52, paddingHorizontal: 8, width: "100%", borderColor: 'gray', backgroundColor: '#F9FAFB', fontSize: 18, borderRadius: 12

    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
});
export default CompetitionSelector;
