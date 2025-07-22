import FontAwesome from "react-native-vector-icons/FontAwesome"; 
import { View, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { useState } from "react";


// A revoir avant de la tester
export default function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);
  const { style, ...otherProps } = props; 
  return (
    <View style={[style, styles.container]}>
      <TextInput
        {...otherProps} 
        style={[style, styles.input]}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.icon}
      >
        <FontAwesome
          name={showPassword ? "eye-slash" : "eye"}
          size={20}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  input: {
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  icon: {
    padding: 10,
  },
});
