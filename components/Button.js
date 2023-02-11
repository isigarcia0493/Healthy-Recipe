import { StyleSheet, View, Pressable, Text } from "react-native";

export default function Button({ label, onPress }){
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 150,
        height: 40,
        padding: 3,
        backgroundColor: 'grey',
      },
      button: {        
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonLabel: {
        color: '#fff',
        fontSize: 25,
      },
});