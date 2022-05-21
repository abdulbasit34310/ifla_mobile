import * as React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Platform,
} from 'react-native';

function CompanyName({ navigation, nextStep, prevStep, accountConfigurationData, setAccountConfigurationData }) {
    const [companyName, setCompanyName] = React.useState(1);

    return (<View>
        <TextInput
            style={styles.ti}
            placeholder="CompanyName"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => setCompanyName(text)}
        ></TextInput>
    </View>);
}
function City({ navigation, nextStep, prevStep, accountConfigurationData, setAccountConfigurationData }) {
    const [city, setCity] = React.useState(1);

    return (<View>
        <TextInput
            style={styles.ti}
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => setCity(text)}
        ></TextInput>
    </View>);
}
function Address({ navigation, nextStep, prevStep, accountConfigurationData, setAccountConfigurationData }) {
    const [address, setAddress] = React.useState(1);

    return (<View>
        <TextInput
            style={styles.ti}
            placeholder="Address"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => setAddress(text)}
        ></TextInput>
    </View>);
}
function NTN({ navigation, nextStep, prevStep, accountConfigurationData, setAccountConfigurationData }) {
    const [ntn, setNTN] = React.useState(1);

    return (<View>
        <TextInput
            style={styles.ti}
            placeholder="NTN"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => setNTN(text)}
        ></TextInput>
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
        case 4:
            return (
                <Success
                    nextStep={nextStep}
                    prevStep={prevStep}
                    accountConfigurationData={accountConfigurationData}
                    setAccountConfigurationData={setAccountConfigurationData} />
            )
        default:
    }
};


const styles = StyleSheet.create({
    textInput: {
        borderColor: '#005761',
        borderWidth: 1,
        padding: 3,
        marginLeft: 10,
        width: '90%',
        borderRadius: 4,
    },
    buttonStyle: {
        backgroundColor: '#068E94',
        padding: 10,
        width: 100,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonText: {
        alignSelf: 'center', color: 'white'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    centeredView: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        width: "100%",
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }, countryLabel: {
        width: "100%",
        padding: 10,
        borderColor: '#005761',
        borderWidth: 1,
        marginBottom: 1,
        borderRadius: 10,

    }, ti: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#068E94',
    },
});