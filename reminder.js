import React from "react";
import {
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  AsyncStorage,
  StyleSheet
} from "react-native";
import Card from "./card";

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require("./res/logo_head.png")}
        style={{ marginLeft: 22, marginTop: 20, width: 60, height: 60 }}
      />
    );
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      morning: false,
      afternoon: false,
      night: false,
      numberOfDays: 1,
      reminders: []
    };
  }

  static navigationOptions = {
    headerTitle: <LogoTitle />
  };

  componentDidMount = () => {
    this.getData();
  };

  getData() {
    AsyncStorage.getAllKeys((err, keys) => {
      console.log("keys " + keys);
      AsyncStorage.multiGet(keys).then(data => {
        this.setState({ reminders: data });
      });
    });
  }

  addNewReminder(event) {
    event.preventDefault();
    this.props.navigation.navigate("AddReminder", {
      getData: this.getData.bind(this)
    });
    this.getData();
  }

  render() {
    let reminderData = this.state.reminders;
    return (
      <View style={styles.app__root}>
        <View style={styles.app__header}>
          <LogoTitle />
          <View
            style={{
              marginTop: 35,
              marginLeft: 10
            }}
          >
            <Text
              style={{
                fontSize: 40,
                color: "#16CB93",
                paddingBottom: 15
              }}
            >
              REMINDERS
            </Text>
          </View>
        </View>

        <ScrollView style={styles.app__body}>
          {reminderData.map((result, i, store) => {
            key = store[i][0];
            value = JSON.parse(store[i][1]);
            return (
              <Card
                key={key}
                id={key}
                name={value.name}
                morning={value.morning}
                afternoon={value.afternoon}
                night={value.evening}
                numberOfDays={parseInt(value.numberOfDays)}
                getData={this.getData.bind(this)}
              />
            );
          })}
        </ScrollView>
        <TouchableOpacity
          onPress={this.addNewReminder.bind(this)}
          style={{
            borderWidth: 8,
            borderColor: "rgba(255, 255, 255, .9)",
            // borderColor: "#Fff",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            position: "absolute",
            bottom: 10,
            right: 10,
            height: 80,
            backgroundColor: "#rgba(22, 203, 147, .9)",
            borderRadius: 100
          }}
        >
          <Text
            style={{
              fontSize: 60,
              color: "#fff",
              fontWeight: "bold",
              marginBottom: 5
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app__root: {
    flex: 1,
    backgroundColor: "#fff"
  },
  app__header: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 80
  },

  app__body: {
    flex: 4,
    marginTop: 10,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  app__button: {
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    borderRadius: 100,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

module.exports = HomeScreen;
