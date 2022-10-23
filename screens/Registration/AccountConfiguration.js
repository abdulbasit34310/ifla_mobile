import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
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
  AntDesign,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Octicons,
  Feather,
} from 'react-native-vector-icons';
import { AuthContext } from "../../components/context";
import axios from "axios";

import { REST_API_LOCAL } from "@env";

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

function Name({ nextStep, data, setData }) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.action}>
          <FontAwesome name="building-o" color="#005761" size={22} />
          <TextInput
            style={styles.ti}
            placeholder="Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) =>
              setData({ ...data, name: text })
            }></TextInput>
        </View>

        <View style={{ alignSelf: 'flex-end' }}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              if (data.name) {
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
            keyboardType="phone-pad"
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

function CNIC({ nextStep, data, setData }) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.action}>
          <AntDesign name="idcard" color="#005761" size={22} />
          <TextInput
            style={styles.ti}
            placeholder="CNIC"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) =>
              setData({ ...data, cnic: text })
            }></TextInput>
        </View>

        <View style={{ alignSelf: 'flex-end' }}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              if (data.cnic) {
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

function NTN({ nextStep, data, setData }) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.action}>
          <Entypo name="address" color="#005761" size={22} />
          <TextInput
            style={styles.ti}
            placeholder="NTN"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) =>
              setData({ ...data, ntn: text })
            }></TextInput>
        </View>

        <View style={{ alignSelf: 'flex-end' }}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              if (data.ntn) {
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
function Industry({ nextStep, data, setData, postData }) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.action}>
          <FontAwesome name="industry" color="#005761" size={22} />
          <TextInput
            style={styles.ti}
            placeholder="Industry"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) =>
              setData({ ...data, industry: text })
            }></TextInput>
        </View>

        <View style={{ alignSelf: 'flex-end' }}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              if (data.industry) {
                nextStep();
                postData();
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
                Welcome
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Success = ({ navigation, nextStep, backStep, setData, data }) => {
  return (
    <View><Text> Nice</Text></View>
  )
};

export default function AccountConfiguration({ navigation, route }) {
  const { signIn } = React.useContext(AuthContext);

  var item = route.params.item;

  const itemData = {
    email: item.email,
    password: item.password,
  }

  console.log("Item Data which came from Sign Up Screen");
  console.log(itemData);

  const postData = async () => {

    var obj = {
      name: data.name,
      phoneNo: data.phoneNo,
      cnic: data.cnic,
      ntn: data.ntn,
      industry: data.industry,
    }


    const response2 = await axios.post(`${REST_API_LOCAL}/users/login`, itemData)
      .catch((error) => {
        if (error.response) {
          console.log(error.response2.data);
          console.log(error.response2.status);
          Alert.alert("Invalid User!", "Email or password is incorrect.", [
            { text: "OK" },
          ]);
          return;
        }
      });

    const recievedData2 = await response2.data;

    const token = recievedData2.token;
    const email = recievedData2.user.email;
    const foundUser = { userToken: token, email: email };

    const headers = { Authorization: `Bearer ${token}` };
    const response3 = await axios.get(`${REST_API_LOCAL}/users/getUser`, {
      withCredentials: true,
      headers: headers,
    });
    const recievedData3 = await response3.data;

    const companyId = recievedData3.company._id;

    const response = await axios.patch(`${REST_API_LOCAL}/users/config/${companyId}`, obj, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` }
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      }
    });
    console.log(response.data);
    signIn(foundUser);
  };


  const [step, setStep] = React.useState(0);

  const [data, setData] = React.useState({
    name: '',
    step1: step,
    phoneNo: '',
    cnic: '',
    ntn: '',
    industry: '',
    checkPhoneNoChange: false,
    validPhoneNo: true,
  });

  const clear = () => {
    setData({
      name: '',
      phoneNo: '',
      cnic: '',
      ntn: '',
      industry: '',
    });
  };

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
      return <Name nextStep={nextStep} data={data} setData={setData} />;
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
        <CNIC
          nextStep={nextStep}
          backStep={backStep}
          data={data}
          setData={setData}
        />
      );
    case 3:
      return (
        <NTN
          nextStep={nextStep}
          backStep={backStep}
          data={data}
          setData={setData}
        />
      );
    case 4:
      return (
        <Industry
          nextStep={nextStep}
          backStep={backStep}
          data={data}
          setData={setData}
          postData={postData}
        />
      );
    case 5:
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
