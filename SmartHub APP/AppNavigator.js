// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Cadastrodeitens from './components/Cadastrodeitens';
import Telaprincipal from './components/Telaprincipal';
import Teste from './components/MqqtTest';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tela Principal">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} // Esconde a barra de cabeçalho
        />
        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro} 
          options={{ headerShown: true }} // Mostra a barra de cabeçalho
        />
        <Stack.Screen 
          name="Tela Principal" 
          component={Telaprincipal} 
          options={{ headerShown: true }} // Mostra a barra de cabeçalho
        />
        <Stack.Screen 
          name="Cadastro de itens" 
          component={Cadastrodeitens} 
          options={{ headerShown: true }} // Mostra a barra de cabeçalho
        />
        <Stack.Screen 
          name="Teste" 
          component={Teste} 
          options={{ headerShown: true }} // Mostra a barra de cabeçalho
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}