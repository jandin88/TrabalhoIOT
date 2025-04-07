import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  function validar() {
    let mensagem = "";
    if (usuario === "" || senha === "") {
      mensagem = "Por favor, entre com usuário e senha.";
    } else if (usuario === "admin" && senha === "admin") {
      mensagem = 'Usuário logado.';
      navigation.navigate('Tela Principal');
    } else if (usuario === "admin" && senha !== "admin") {
      mensagem = "Senha incorreta";
    } else if (usuario !== "admin") {
      mensagem = "Usuário incorreto";
    }
    setMensagemErro(mensagem);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/SmartHub1.png")} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
      />
      {mensagemErro ? <Text style={styles.error}>{mensagemErro}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={validar}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.linkText}>Crie sua conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#e0f7fa',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 150,
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#00796b',
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b2ebf2',
  },
  error: {
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 5,
    color: '#00796b',
    textAlign: 'center',
    fontWeight: '500',
    textDecorationLine: 'underline',
  }
});
