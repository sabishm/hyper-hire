import React, { useContext, useEffect, useRef, useState } from 'react';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableHighlight } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Checkbox from 'expo-checkbox';
import { Formik, FormikErrors, FormikValues } from 'formik';
import { router } from 'expo-router';
import { AppContext } from '@/constants/AppContext';
import { Feather, Ionicons } from '@expo/vector-icons';

type FormData = {
    competition: number;
    email: string;
    password: string;
    confirmPassword: string;
    first_name: string;
    last_name: string;
    agree: boolean;
};

const SpecialCharacters = '~!@#$%^&*()_-+=?';


const SignupScreen = () => {


    const insets = useSafeAreaInsets();

    const [agree, setAgree] = useState(false);
    const context = useContext(AppContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    if (!context) {
        throw new Error('AppContext must be used within an AppProvider');
    }

    const { selectedCompetion, setSelectedCompetion } = context;

    return (
        <View style={{ paddingTop: insets.top, height: '100%', width: '100%', position: 'absolute', backgroundColor: 'white' }}>
            {/* App Bar */}
            <View style={{ height: 56, width: '100%', paddingHorizontal: 16, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    router.back();
                }}>
                    <Image source={require('../../assets/icons/ButtonBack.png')} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 32, marginLeft: 16 }}>Create Account</Text>
            </View>

            <Formik
                initialValues={{ competition: -1, email: '', password: '', confirmPassword: '', first_name: '', last_name: '', agree: false }}
                validateOnBlur={false}
                validateOnMount={false}

                onSubmit={values => {
                    router.push("onboard_success");
                }}
                validate={(values: FormikValues) => {
                    var haveError = false;
                    let errors: FormikErrors<FormikValues> = {};

                    if (selectedCompetion == '') {
                        haveError = true;
                        errors.competition = "You must pick a competition to register!"
                    }

                    if (values.email == "") {
                        haveError = true;
                        errors.email = "Emaill address is required!"
                    } else {
                        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                        if (emailRegex.test(values.email)) {
                            errors.email = "";
                        } else {
                            haveError = true;
                            errors.email = "Invalid email address format"
                        }
                    }

                    // Validate password
                    if (!values.password) {
                        haveError = true;
                        errors.password = "Password is required!";
                    } else if (values.password.length < 8) {
                        haveError = true;
                        errors.password = "Password must be at least 8 characters";
                    } else if (
                        !/[A-Z]/.test(values.password) ||
                        !/[a-z]/.test(values.password) ||
                        !/[0-9]/.test(values.password) ||
                        ![...SpecialCharacters].some(char => values.password.includes(char))
                    ) {
                        haveError = true;
                        errors.password = `Password must include at least 3 of: uppercase, lowercase, number, special characters ${SpecialCharacters}`;
                    }

                    if (values.password != "") {
                        if (!values.confirmPassword) {
                            haveError = true;
                            errors.confirmPassword = "Confirm Password is required!";
                        } else if (values.password != values.confirmPassword) {
                            haveError = true;
                            errors.confirmPassword = "New password and Confirm password do not match.";
                        }
                    }

                    if (!values.first_name) {
                        haveError = true;
                        errors.first_name = "First name is required!";
                    }

                    if (!values.last_name) {
                        haveError = true;
                        errors.last_name = "Last name is required!";
                    }

                    if (!agree) {
                        haveError = true;
                        errors.agree = "You must agree the terms and conditions for complete the signup!";
                    }

                    if(haveError) {
                        return errors;
                    } 
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={{ padding: 16 }}>

                        <TouchableOpacity onPress={() => {

                            router.push('competition_selector');
                        }}>
                            <View style={{ height: 52, width: '100%', backgroundColor: '#F9FAFB', alignItems: 'center', borderRadius: 12, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 18, paddingLeft: 8, color: "#667085" }}>{selectedCompetion != "" ? selectedCompetion : "Competition to sign up *"}</Text>
                                <Image style={{ paddingRight: 8 }} source={require('../../assets/icons/Icons.png')} />
                            </View>
                        </TouchableOpacity>
                        {errors.competition && <Text style={styles.errorText}>{errors.competition}</Text>}


                        <View style={{ height: 16 }} />

                        {/* Email Input */}

                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            autoCapitalize="none"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur}
                            value={values.email}
                            keyboardType="email-address"
                        />

                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}


                        <View style={{ height: 16 }} />

                        <View>
                            <View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#fff',
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                }}>
                                    <TextInput
                                        style={{ ...styles.input }}
                                        secureTextEntry={!showPassword}
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        placeholder="Password"
                                        onBlur={handleBlur}
                                    />
                                    <View style={{ paddingRight: 8, position: 'absolute', right: 0, bottom: 0, top: 0, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }} >
                                        <TouchableOpacity onPress={() => {
                                            setShowPassword(!showPassword);
                                        }}>
                                            {showPassword ? <Feather name='eye-off' size={24} /> : <Feather name='eye' size={24} />}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={{ height: 2, backgroundColor: "#F2F4F7" }}></View>

                            <View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#fff',
                                    borderBottomLeftRadius: 12,
                                    borderBottomRightRadius: 12,
                                }}>
                                    <TextInput
                                        style={{ ...styles.input }}
                                        onChangeText={handleChange('confirmPassword')}
                                        secureTextEntry={!showCPassword}
                                        value={values.confirmPassword}
                                        placeholder="Confirm Password"
                                        onBlur={handleBlur}
                                    />
                                    <View style={{ paddingRight: 8, position: 'absolute', right: 0, bottom: 0, top: 0, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }} >
                                        <TouchableOpacity onPress={() => {
                                            setShowCPassword(!showCPassword);
                                        }}>
                                            {showCPassword ? <Feather name='eye-off' size={24} /> : <Feather name='eye' size={24} />}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}


                        <View style={{ height: 16 }} />


                        <TextInput
                            style={{ ...styles.input, borderRadius: 12 }}
                            placeholder="First Name in English *"
                            onChangeText={handleChange('first_name')}
                            onBlur={handleBlur}
                            value={values.first_name}
                        />


                        {errors.first_name && <Text style={styles.errorText}>{errors.first_name}</Text>}

                        <View style={{ height: 16 }} />

                        <TextInput
                            style={{ ...styles.input, borderRadius: 12 }}
                            placeholder="Last Name in English *"
                            onChangeText={handleChange('last_name')}
                            onBlur={handleBlur}
                            value={values.last_name}
                        />

                        {errors.last_name && <Text style={styles.errorText}>{errors.last_name}</Text>}
                        <View style={{ height: 16 }} />

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox value={agree} onValueChange={(value) => {
                                setAgree(value);
                            }} />
                            <View style={{ width: 8 }} />
                            <Text style={styles.text}>
                                By signing up, I agree to Cloit's{' '}
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={styles.link}>Terms & Conditions</Text>
                                </TouchableOpacity>{' '}
                                and{' '}
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={styles.link}>Privacy Policy</Text>
                                </TouchableOpacity>
                            </Text>
                        </View>
                        {errors.agree && <Text style={styles.errorText}>{errors.agree}</Text>}


                        <View style={{ height: 16 }} />

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                            <TouchableHighlight
                                style={{
                                    height: 52,
                                    maxWidth: 300, borderRadius: 52
                                }}
                                onPress={() => {
                                    handleSubmit()
                                }}
                                activeOpacity={0.7} // Controls the opacity when pressed
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
                                    <Text style={{ color: "white", marginLeft: 16 }}>Sign Up</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                    </View>
                )
                }
            </Formik >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 52, paddingHorizontal: 8, width: "100%", borderColor: 'gray', backgroundColor: '#F9FAFB', fontSize: 18

    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
    link: {
        color: '#007BFF', // Adjust link color as needed
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    dropdownButtonStyle: {
        width: '100%',
        height: 52,
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        color: "grey"
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});
export default SignupScreen;
