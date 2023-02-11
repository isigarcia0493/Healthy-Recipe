import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageViewer from './components/ImageViewer';
import * as SplashScreen from 'expo-splash-screen';
import Button from './components/Button';
import { Colors } from 'react-native/Libraries/NewAppScreen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const mainImage = require('./assets/bruschetta.png');

function HomeScreen({ navigation }){
  let [userInput, setUserInput] = useState('');
  let tomatoes = 4;
  let basil = 6;
  let garlic = 3;
  let tb = 3;

  const Servings = (number) => {
    if (number > 1 && number != null || number != ''){
      tomatoes = tomatoes * parseInt(number);
      basil=  basil * parseInt(number);
      garlic = garlic * parseInt(number);
      tb = tb * parseInt(number);
    }
  }

  const resetServings = () => {
    tomatoes = 4;
    basil = 6;
    garlic = 3;
    tb = 3;
  }

  return(
    <View style={styles.container}>
      <View style={styles.bruschettaContainer}>
        <Text style={styles.bruschetta}>Bruschetta Recipe</Text>
      </View>
      <View style={styles.picture}>
        <ImageViewer mainImage={mainImage} />
      </View>
      <View style={styles.inputBox}>
        <TextInput 
          style={styles.input}
          keyboardType='numeric'
          placeholder='Enter the Number of Servings'
          onChangeText={newInput => setUserInput(newInput)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label="View Recipe"
          onPress={() => {  
            Servings(userInput);      
            navigation.navigate(" ", {
              tomatoes: tomatoes,
              basil: basil,
              garlic: garlic,
              tb: tb,
            });
            resetServings();
          }}
        />
      </View>      
      <StatusBar style="auto" />
    </View>
  );
}

function RecipesScreen ({ route }){
  const { tomatoes } = route.params;
  const { basil } = route.params;
  const { garlic } = route.params;
  const { tb } = route.params;


  return (
    <View style={styles.recipeContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Bruschetta</Text>
      </View>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.subHeader}>Ingredients</Text>
        <View style={styles.listItems}>
          <Text style={styles.item}>{ JSON.stringify(tomatoes) } plum tomatoes</Text>
          <Text style={styles.item}>{ JSON.stringify(basil) } basil leaves</Text>
          <Text style={styles.item}>{ JSON.stringify(garlic) } garlic cloves, chopped</Text>
          <Text style={styles.item}>{ JSON.stringify(tb) } TB olive oil</Text>
        </View>
      </View>
      <View style={styles.directionsContainer}>
        <Text style={styles.subHeader}>Directions</Text>
        <View style={styles.directions}>
          <Text style={styles.item}>Combine the ingredients.</Text>
          <Text style={styles.item}>Add salt to taste. Top French</Text>
          <Text style={styles.item}>bread slices</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Healthy Recipes" component={HomeScreen} 
                      options={{ 
                        headerStyle: { backgroundColor: '#f4511e'},
                        headerTintColor: '#fff'}} />
        <Stack.Screen name=" " component={RecipesScreen} options={{ 
                        headerStyle: { backgroundColor: '#f4511e'},
                        headerTintColor: '#fff'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bruschetta: {
    fontSize: 40,
  },
  bruschettaContainer: {
    marginBottom: 15,
  },
  inputBox: {
    marginBottom: 20,
  },
  picture: {
    marginBottom: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 40,
  },
  headerContainer:{
    alignItems: 'center',
    padding: 20,
  },
  recipeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingBottom: 50
  },
  ingredientsContainer: {
    marginLeft: 20,
    paddingTop: 20,
    paddingBottom: 40,
  }, 
  listItems:{
    marginLeft: 20,
  },
  directionsContainer: {
    marginLeft: 20,
  },
  directions: {
    marginLeft: 20,
  },
  subHeader: {
    fontSize: 30,
  },
  item: {
    fontSize: 20,
  }
});
