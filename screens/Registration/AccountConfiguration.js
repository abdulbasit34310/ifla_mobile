import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo, } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  Modal,
  ToastAndroid,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  Octicons,
  Feather,
} from 'react-native-vector-icons';

const Theme = {
  Buttons: '#068E94',
  PrimaryForeground: '#068E94',
  SecondaryForeground: '#00ABB2',
  PrimaryBackground: '#005761',
  SecondaryBackground: '#E0EFF6',
  PrimaryText: '#005761',
  BLACK: '#00000',
  WHITE: '#FFFFFF',
};

const fillToast = () => {
  ToastAndroid.showWithGravity(
    'Please Add Details First',
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};

function CompanyName({ nextStep, data, setData }) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.action}>
          <FontAwesome name="building-o" color="#005761" size={22} />
          <TextInput
            style={styles.ti}
            placeholder="Company Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) =>
              setData({ ...data, companyName: text })
            }></TextInput>
        </View>

        <View style={{ alignSelf: 'flex-end' }}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              if (data.companyName) {
                nextStep();
              } else {
                fillToast();
              }
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="navigate-next" size={22} color={'white'} />
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: 'white',
                  },
                ]}>
                Next
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function PhoneNo({ navigation, nextStep, backStep, data, setData }) {
  const phoneNoChange = (val) => {
    const reg =
      /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    if (reg.test(String(val))) {
      setData({
        ...data,
        phoneNo: val,
        checkPhoneNoChange: true,
        validPhoneNo: true,
      });
    } else {
      setData({
        ...data,
        phoneNo: val,
        checkPhoneNoChange: true,
        validPhoneNo: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.action}>
          <MaterialIcons name="phone-enabled" color="#005761" size={23} />
          <TextInput
            style={styles.ti}
            autoCorrect={false}
            placeholder="Phone Number"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            onChangeText={(text) =>
              setData({ ...data, phoneNo: text })
            }></TextInput>
        </View>

        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              backStep();
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="arrow-back-ios" color="white" size={15} />
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: 'white',
                  },
                ]}>
                Back
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              if (data.phoneNo) {
                nextStep();
              } else {
                fillToast();
              }
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="navigate-next" size={22} color={'white'} />
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: 'white',
                  },
                ]}>
                Next
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Success = ({ navigation, nextStep, backStep, setData, data }) => {
  return <div>Account Configuration Done Succsfully</div>;
};

export default function AccountConfiguration({ navigation }) {
  const [step, setStep] = React.useState(0);

  const [data, setData] = React.useState({
    companyName: '',
    step1: step,
    phoneNo: '',
    checkPhoneNoChange: false,
    validPhoneNo: true,
  });

  const clear = () => {
    setData({
      companyName: '',
      phoneNo: '',
    });
  };

  const postData = () => {};

  const backStep = () => {
    const { step1 } = data;
    setData({
      ...data,
      step1: step1 - 1,
    });
  };

  const nextStep = () => {
    const { step1 } = data;
    setData({
      ...data,
      step1: step1 + 1,
    });
  };

  const { step1 } = data;

  switch (step1) {
    case 0:
      return <CompanyName nextStep={nextStep} data={data} setData={setData} />;
    case 1:
      return (
        <PhoneNo
          nextStep={nextStep}
          backStep={backStep}
          data={data}
          setData={setData}
        />
      );
    case 2:
      return (
        <Success
          nextStep={nextStep}
          backStep={backStep}
          data={data}
          setData={setData}
        />
      );
    default:
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.SecondaryBackground,
    flex: 1,
    paddingVertical: 35,
    paddingHorizontal: 20,
  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
    paddingBottom: 5,
  },
  cardContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 14,
    elevation: 3,
    justifyContent: 'center',
    display: 'flex',
  },
  customButton: {
    backgroundColor: Theme.PrimaryForeground,
    padding: 10,
    width: 100,
    borderRadius: 14,
    alignSelf: 'flex-end',
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },

  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 14,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  ti: {
    color: '#05375a',
    marginLeft: 12,
    borderRadius: 14,
    fontSize: 15,
  },
});