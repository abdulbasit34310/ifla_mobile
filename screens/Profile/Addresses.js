import {
  StyleSheet,
  Text,
  Touchable,
  Modal,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";
import AddAddress from "../../components/Profile/AddAddress";

const Addresses = ({ navigation, route }) => {
  const addresses = route.params.item.addresses;
  console.log(addresses);
  const [isVisible, setVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setVisible(!isVisible);
        }}
      >
        <AddAddress
          isVisible={isVisible}
          setIsVisible={setVisible}
          isCompany={false}
        />
      </Modal>
      <View style={styles.addIconContainer}>
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
        >
          <FontAwesomeIcon
            name="plus"
            color="#005761"
            size={30}
          ></FontAwesomeIcon>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        {addresses.map((address, index) => (
          <View style={styles.addressContainer} id={index}>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#E0EFF6",
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <FontAwesomeIcon
                  name="trash"
                  size={20}
                  color="#005761"
                ></FontAwesomeIcon>
              </TouchableOpacity>
            </View>
            <View style={{ margin: 5, marginRight: 10 }}>
              {/* <FontAwesomeIcon
                name="map-marker-alt"
                size={25}
                color="#005761"
              ></FontAwesomeIcon> */}
            </View>
            <View>
              <Text style={{ fontSize: 16, color: "grey" }}>
                Builidng: {address.building},
              </Text>
              <Text style={{ fontSize: 16, color: "grey" }}>
                {address.street},
              </Text>
              <Text style={{ fontSize: 16, color: "grey" }}>
                {address.city}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  addIconContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: 20,
  },
  addressContainer: {
    height: 100,
    marginTop: 5,
    // borderBottomColor: "grey",
    // borderBottomWidth: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    borderRadius: 25,
  },
});
