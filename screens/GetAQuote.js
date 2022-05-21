import * as React from 'react';
import { Text, View, TextField, TextInput, Platform, StyleSheet, TouchableOpacity, } from 'react-native';

function CompanyName({ navigation, nextStep, prevStep, accountConfigurationData, setAccountConfigurationData }) {
    const [companyName, setCompanyName] = React.useState(1);

    return (<View style={styles.background}>
        <View style={styles.container}>
            <TextInput
                style={styles.ti}
                placeholder="Company Name"
                placeholderTextColor="#666666"
                autoCorrect={false}
                onChangeText={(text) => setCompanyName(text)}
            ></TextInput>
            <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 15 }}>
                <TouchableOpacity onPress={prevStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Previous</Text></TouchableOpacity>
                <TouchableOpacity onPress={nextStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
            </View>
        </View>
    </View>);
}
function City({ navigation, nextStep, prevStep, accountConfigurationData, setAccountConfigurationData }) {
    const [city, setCity] = React.useState(1);

    return (<View style={styles.background}>
        <View style={styles.container}>
            <TextInput
                style={styles.ti}
                placeholder="City"
                placeholderTextColor="#666666"
                autoCorrect={false}
                onChangeText={(text) => setCity(text)}
            ></TextInput>
            <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 15 }}>
                <TouchableOpacity onPress={prevStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Previous</Text></TouchableOpacity>
                <TouchableOpacity onPress={nextStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
            </View>
        </View>
    </View>);
}
function Address({ navigation, nextStep, prevStep, accountConfigurationData, setAccountConfigurationData }) {
    const [address, setAddress] = React.useState(1);

    return (<View style={styles.background}>
        <View style={styles.container}>
            <TextInput
                style={styles.ti}
                placeholder="Address"
                placeholderTextColor="#666666"
                autoCorrect={false}
                onChangeText={(text) => setAddress(text)}
            ></TextInput>
            <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 15 }}>
                <TouchableOpacity onPress={prevStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Previous</Text></TouchableOpacity>
                <TouchableOpacity onPress={nextStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
            </View></View>
    </View>);
}
function NTN({ navigation, nextStep, prevStep, accountConfigurationData, setAccountConfigurationData }) {
    const [ntn, setNTN] = React.useState(1);

    return (<View style={styles.background}>
        <View style={styles.container}>
            <TextInput
                style={styles.ti}
                placeholder="NTN"
                placeholderTextColor="#666666"
                autoCorrect={false}
                onChangeText={(text) => setNTN(text)}
            ></TextInput>
            <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 15 }}>
                <TouchableOpacity onPress={prevStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Previous</Text></TouchableOpacity>
                <TouchableOpacity onPress={nextStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
            </View> </View>
    </View>);
}

export default function AccountConfigurationScreen({ navigation }) {
    const [step, setStep] = React.useState(0);

    // Company Name, Company Address, City, NTN 

    const [accountConfigurationData, setAccountConfigurationData] = React.useState({
        companyName: "LTL", step1: step, city: '', Address: '', NTN: '',
    });

    const clear = () => {
        setAccountConfigurationData({
            companyName: '', city: '', Address: '', NTN: '',
        });
    }

    const postData = () => {
    }

    const prevStep = () => {
        const { step1 } = accountConfigurationData;
        setAccountConfigurationData({ ...accountConfigurationData, step1: step1 - 1 });
    }

    const nextStep = () => {
        const { step1 } = accountConfigurationData;
        setAccountConfigurationData({ ...accountConfigurationData, step1: step1 + 1 });
    }
    const { step1 } = accountConfigurationData;
    switch (step1) {
        case 0:
            return (
                <CompanyName
                    nextStep={nextStep}
                    accountConfigurationData={accountConfigurationData}
                    setAccountConfigurationData={setAccountConfigurationData} />
            )
        case 1:
            return (
                <City
                    nextStep={nextStep}
                    prevStep={prevStep}
                    accountConfigurationData={accountConfigurationData}
                    setAccountConfigurationData={setAccountConfigurationData} />
            )
        case 2:
            return (
                <Address
                    nextStep={nextStep}
                    prevStep={prevStep}
                    accountConfigurationData={accountConfigurationData}
                    setAccountConfigurationData={setAccountConfigurationData} />

            )
        case 3:
            return (
                <NTN
                    nextStep={nextStep}
                    prevStep={prevStep}
                    accountConfigurationData={accountConfigurationData}
                    setAccountConfigurationData={setAccountConfigurationData} />
            )
        default:
    }
}

const styles = StyleSheet.create({
    ti: {
        borderColor: '#005761', borderWidth: 1, padding: 3, marginLeft: 10, width: '90%', borderRadius: 4, elevation: 24, marginTop: 10
    }, buttonStyle: {
        backgroundColor: '#068E94', padding: 10, width: 100, borderRadius: 10, margin: 10,
    }, buttonText: {
        alignSelf: 'center', color: '#005761',
    }, container: { 
        backgroundColor: '#E0EFF6', borderRadius: 10, padding: 10, margin: 10 },
    background: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00ABB2',
    }
});