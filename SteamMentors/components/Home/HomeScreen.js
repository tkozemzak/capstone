import React from 'react'
import {bindActionCreators} from 'redux'
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  Animated,
  Platform,
  Easing,
  TouchableOpacity,
  TextInput,
  ImageBackground
} from 'react-native'
import { connect } from "react-redux"
import { guestLogin } from '../../redux/actions/userActions'
import { LinearGradient, Constants } from 'expo'
import { ListItem, Icon } from 'react-native-elements'
import {userSignup, userLogin} from '../../redux/actions/userActions'


class HomeScreen extends React.Component {

  state = {
    login: {
      email: '',
      password: ''
  },
    register: {
      email: '',
      password: '',
      steam_url: ''
  },
    spinning: true,
    screen: "home"
  }

  handleSignup = () => {
    this.props.userSignup(this.state.register, this.props.history)
  }

  handleLogin = () => {
    this.props.userLogin(this.state.login, this.props.history)
  }


  handleGuestLogin = () => {
  this.props.guestLogin()
  }

  spinValue = new Animated.Value(0);


    spin = () => {
      this.spinValue.setValue(0);
        this.animation();
    };

    animation = () => {
      this.spinValue.setValue(0);

      Animated.timing(this.spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
      }).start(() => {
        if (this.state.spinning) {
          this.animation();
        }
      });
    };

    componentDidMount(){
      this.spin()
    }

  render(){

    let {history} = this.props

    const spin = this.spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        });

    return (
        <ImageBackground
        source={require('../../assets/images/gradient.jpeg')}
        style={{height: '100%'}}>

            <View style={styles.container}>
            <View style={{alignSelf: "center"}} >
                    <Animated.View
                      style={{
                        transform: [{ rotate: spin }],
                        position: 'relative',
                        height: 68,
                        width: 68,
                      }}>
                      <Image
                      style={styles.image}
                      source={require('../../assets/images/spinnerLogo.png')}
                    />
                    </Animated.View>
              </View>
              <View style={styles.textContainer}>

              <Text style={styles.text}>Steam Mentors</Text>

            </View>

            </View>
            {this.state.screen === "home" ? <View style={{marginTop: 150}}>
              <View style={styles.button}>
                <Button color="#58ab7f" title="Login" onPress={() => this.setState({screen: "login"})}/>
              </View>
              <View style={styles.button}>
                <Button color="#58ab7f" title="Register" onPress={() => this.setState({screen: "register"})}/>
              </View>
              <View style={styles.button}>
                <Button color="#58ab7f" title="Continue As Guest" onPress={() => this.handleGuestLogin()}/>
              </View>
            </View>

            : this.state.screen === "login" ?

            <View style={{height:"100%", display: "flex", flexDirection: "column"}}>
              <View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    selectionColor="#58ab7f"
                    underlineColorAndroid="#58ab7f"
                    onChangeText={(text) => this.setState({ login: { ...this.state.login, email: text}})}
                  />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholder="Password"
                    selectionColor="#58ab7f"
                    underlineColorAndroid="#58ab7f"
                    onChangeText={(text) => this.setState({ login: { ...this.state.login, password: text}})}
                  />
              </View>
              <View style={{marginTop: 61.5}}>
                <View style={styles.button}>
                  <Button color="#58ab7f" title="Back" onPress={() => this.setState({screen: "home"})}/>
                </View>
                <View style={styles.button}>
                  <Button color="#58ab7f" title="Login" onPress={() => this.handleLogin(this.state)}/>
                </View>
              </View>
            </View>
            :
            <View style={{height:"100%", display: "flex", flexDirection: "column"}}>

            <View>
            <TextInput
                style={styles.textInput}
                placeholder="Email"
                selectionColor="#58ab7f"
                underlineColorAndroid="#58ab7f"
                onChangeText={(text) => this.setState({ register: { ...this.state.register, email: text}})}
              />
            <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder="Password"
                selectionColor="#58ab7f"
                underlineColorAndroid="#58ab7f"
                onChangeText={(text) => this.setState({ register: { ...this.state.register, password: text}})}
              />

            <TextInput
                style={styles.textInput}
                placeholder="Steam Profile URL"
                selectionColor="#58ab7f"
                underlineColorAndroid="#58ab7f"
                onChangeText={(text) => this.setState({ register: { ...this.state.register, steam_url: text}})}
              />
              <View style={{marginTop: -8.5}}>
                <View style={styles.button}>
                  <Button color="#58ab7f" title="Back" onPress={() => this.setState({screen: "home"})}/>
                </View>
                <View style={styles.button}>
                  <Button color="#58ab7f" title="Register" onPress={() => this.handleSignup(this.state)}/>
                </View>
              </View>
            </View>
            </View>
          }
          </ImageBackground>
    )
  }
  }

  const styles = StyleSheet.create(
{
  container: {
    alignSelf: "center",
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20
  },
  button: {
    width: "70%",
    alignSelf: "center",
    marginTop: 15
  },
  textInput: {
    height: 70,
    color: "white",
    paddingLeft: 15

  },
  buttonContainer: {
    height:"40%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: "70%"
  },
  textContainer: {
    marginTop: 30,
    width: "90%"
  },
  text: {
    fontSize: 34,
    color: "#3098C8",
    alignSelf: "center"
  },
  image: {
    alignSelf: "center",
    marginLeft: 20,
    marginRight: 20
  }
});
const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  currentUserGames: state.profile.currentUserGames
})
    const mapDispatchToProps = dispatch => bindActionCreators({
      guestLogin,
      userSignup,
      userLogin
    }, dispatch)

    export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
