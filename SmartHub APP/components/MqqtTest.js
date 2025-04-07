import React, { useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import mqtt from 'mqtt';

const App = () => {
  useEffect(() => {
    // Conectar ao broker MQTT HiveMQ usando WebSocket
    const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt', {
      clientId: 'react-native-client',
      clean: true,
      connectTimeout: 10000, // Timeout de 20 segundos
      username: '',          // Opcional: se precisar de autenticação, coloque o username
      password: '',          // Opcional: se precisar de autenticação, coloque a senha
    });

    client.on('connect', () => {
      console.log('Conectado ao broker MQTT');
      Alert.alert('Conexão MQTT', 'Conectado com sucesso!');
      
      // Inscrição no tópico
      client.subscribe('reactnative/testmqtt', (err) => {
        if (!err) {
          console.log('Inscrito no tópico reactnative/testmqtt');
        } else {
          console.error('Erro ao se inscrever:', err);
        }
      });

      // Publicação de uma mensagem de teste
      client.publish('reactnative/testmqtt', 'Mensagem de teste', { qos: 2 });
    });

    client.on('message', (topic, message) => {
      console.log(`Mensagem recebida: ${message.toString()} no tópico ${topic}`);
    });

    client.on('error', (err) => {
      console.error('Erro MQTT:', err);
      Alert.alert('Erro', `Falha na conexão MQTT: ${err.message}`);
    });

    // Limpeza ao desmontar o componente
    return () => {
      if (client && client.connected) {
        client.end();
      }
    };
  }, []);

  return (
    <View>
      <Text>Teste de Conexão MQTT com HiveMQ!</Text>
    </View>
  );
};

export default App;