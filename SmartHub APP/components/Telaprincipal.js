import React, { useEffect, useState, useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, Text, ScrollView } from 'react-native';
import mqtt from 'mqtt';

export default function Menu() {
  const [client, setClient] = useState(null);  // Estado para o cliente MQTT
  const [buttonColors, setButtonColors] = useState({}); // Armazenar cor de fundo para cada botão
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Conectar ao broker MQTT HiveMQ usando WebSocket
    const mqttClient = mqtt.connect('wss://broker.hivemq.com:8884/mqtt', {
      clientId: 'react-native-client',
      clean: true,
      connectTimeout: 10000, // Timeout de 10 segundos
    });

    mqttClient.on('connect', () => {
      console.log('Conectado ao broker MQTT');
    });

    mqttClient.on('error', (err) => {
      console.error('Erro MQTT:', err);
    });

    setClient(mqttClient);

    // Limpeza ao desmontar o componente
    return () => {
      if (mqttClient && mqttClient.connected) {
        mqttClient.end();
      }
    };
  }, []);

  // Função para tratar o pressionamento de botões
  const handlePress = (buttonNumber, shouldScroll = false) => {
    if (shouldScroll) {
      // Se for para fazer o scroll até a seção
      scrollToSection(buttonNumber);
    } else {
      // Se for para publicar no tópico MQTT
      const topic = 'SmartHub';  // Tópico fixo SmartHub
      const message = `${buttonNumber}`;  // Mensagem a ser publicada

      if (client) {
        // Publica a mensagem no tópico SmartHub
        client.publish(topic, message, { qos: 0, retain: false }, (error) => {
          if (error) {
            console.error('Erro ao publicar:', error);
          } else {
            console.log(`Mensagem publicada no tópico ${topic}: ${message}`);
            // Atualiza a cor do botão para indicar sucesso na publicação
            setButtonColors((prevColors) => ({
              ...prevColors,
              [buttonNumber]: '#81c784', // Cor de fundo verde para indicar sucesso
            }));

            // Restaura a cor após 2 segundos
            setTimeout(() => {
              setButtonColors((prevColors) => ({
                ...prevColors,
                [buttonNumber]: '#ffffff', // Cor de fundo padrão (branco)
              }));
            }, 2000);
          }
        });
      } else {
        console.error('Cliente MQTT não está conectado.');
      }
    }
  };

  const scrollToSection = (buttonNumber) => {
    let yPosition = 0;
    switch (buttonNumber) {
      case 5: // Lampadas
        yPosition = 0;
        break;
      case 6: // Tomadas
        yPosition = 300;
        break;
      case 7: // Janelas
        yPosition = 600;
        break;
      case 8: // Fechaduras
        yPosition = 900;
        break;
      default:
        break;
    }

    scrollViewRef.current.scrollTo({
      y: yPosition,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.menuContainer}>
        <Text style={styles.titlemenu}>MENU</Text>
        <TouchableOpacity onPress={() => handlePress(5, true)} style={styles.buttonmenu}>
          <Image source={require("../assets/Lampada.png")} style={styles.image} />
          <Text style={styles.textmenu}>LAMPADAS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(6, true)} style={styles.buttonmenu}>
          <Image source={require("../assets/Tomada.png")} style={styles.image} />
          <Text style={styles.textmenu}>TOMADAS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(7, true)} style={styles.buttonmenu}>
          <Image source={require("../assets/Janela.png")} style={styles.image} />
          <Text style={styles.textmenu}>JANELAS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(8, true)} style={styles.buttonmenu}>
          <Image source={require("../assets/Fechadura.png")} style={styles.image} />
          <Text style={styles.textmenu}>FECHADURAS</Text>
        </TouchableOpacity>
      </View>
      <ScrollView ref={scrollViewRef} style={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LAMPADAS</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={() => handlePress(5)} 
              style={[styles.button, { backgroundColor: buttonColors[5] || '#ffffff' }]}
            >
              <Image source={require("../assets/Lampada.png")} style={styles.image} />
              <Text style={styles.text}>LAMPADA QUARTO CASAL</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handlePress(6)} 
              style={[styles.button, { backgroundColor: buttonColors[6] || '#ffffff' }]}
            >
              <Image source={require("../assets/Lampada.png")} style={styles.image} />
              <Text style={styles.text}>LAMPADA QUARTO SOLTEIRO</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handlePress(7)} 
              style={[styles.button, { backgroundColor: buttonColors[7] || '#ffffff' }]}
            >
              <Image source={require("../assets/Lampada.png")} style={styles.image} />
              <Text style={styles.text}>LAMPADA COZINHA</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handlePress(8)} 
              style={[styles.button, { backgroundColor: buttonColors[8] || '#ffffff' }]}
            >
              <Image source={require("../assets/Lampada.png")} style={styles.image} />
              <Text style={styles.text}>LAMPADA SALA</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handlePress(9)} 
              style={[styles.button, { backgroundColor: buttonColors[9] || '#ffffff' }]}
            >
              <Image source={require("../assets/Lampada.png")} style={styles.image} />
              <Text style={styles.text}>LAMPADA BANHEIRO</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TOMADAS</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={() => handlePress(10)} 
              style={[styles.button, { backgroundColor: buttonColors[10] || '#ffffff' }]}
            >
              <Image source={require("../assets/Tomada.png")} style={styles.image} />
              <Text style={styles.text}>TOMADA TV</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handlePress(11)} 
              style={[styles.button, { backgroundColor: buttonColors[11] || '#ffffff' }]}
            >
              <Image source={require("../assets/Tomada.png")} style={styles.image} />
              <Text style={styles.text}>TOMADA CAFETEIRA</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>JANELAS</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={() => handlePress(12)} 
              style={[styles.button, { backgroundColor: buttonColors[12] || '#ffffff' }]}
            >
              <Image source={require("../assets/Janela.png")} style={styles.image} />
              <Text style={styles.text}>JANELA QUARTO CASAL</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handlePress(13)} 
              style={[styles.button, { backgroundColor: buttonColors[13] || '#ffffff' }]}
            >
              <Image source={require("../assets/Janela.png")} style={styles.image} />
              <Text style={styles.text}>JANELA SALA</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handlePress(14)} 
              style={[styles.button, { backgroundColor: buttonColors[14] || '#ffffff' }]}
            >
              <Image source={require("../assets/Janela.png")} style={styles.image} />
              <Text style={styles.text}>JANELA QUARTO SOLTEIRO</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handlePress(15)} 
              style={[styles.button, { backgroundColor: buttonColors[15] || '#ffffff' }]}
            >
              <Image source={require("../assets/Janela.png")} style={styles.image} />
              <Text style={styles.text}>JANELA BANHEIRO</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handlePress(16)} 
              style={[styles.button, { backgroundColor: buttonColors[16] || '#ffffff' }]}
            >
              <Image source={require("../assets/Janela.png")} style={styles.image} />
              <Text style={styles.text}>JANELA COZINHA</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FECHADURAS</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={() => handlePress(17)} 
              style={[styles.button, { backgroundColor: buttonColors[17] || '#ffffff' }]}
            >
              <Image source={require("../assets/Fechadura.png")} style={styles.image} />
              <Text style={styles.text}>FECHADURA PRINCIPAL</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handlePress(18)} 
              style={[styles.button, { backgroundColor: buttonColors[18] || '#ffffff' }]}
            >
              <Image source={require("../assets/Fechadura.png")} style={styles.image} />
              <Text style={styles.text}>FECHADURA DOS FUNDOS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  menuContainer: {
    width: 100,
    padding: 10,
    backgroundColor: '#61a6ab',
    borderRightWidth: 1,
    borderColor: '#b2ebf2',
  },
  titlemenu: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonmenu: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 5,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00796b',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    margin: 5,
    borderWidth: 1,
    borderColor: '#b2ebf2',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
  },
  textmenu: {
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
  },
});
