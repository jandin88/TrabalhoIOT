import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function Cadastro({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  function cadastrar() {
    if (senha !== confirmarSenha) {
      setMensagemErro("As senhas não coincidem.");
      return;
    }
    console.log("Usuário cadastrado:", usuario);
    setUsuario("");
    setSenha("");
    setConfirmarSenha("");
    setMensagemErro("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        onChangeText={setUsuario}
        value={usuario}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Senha"
        onChangeText={setSenha}
        value={senha}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Confirme a Senha"
        onChangeText={setConfirmarSenha}
        value={confirmarSenha}
      />
      {mensagemErro ? <Text style={styles.error}>{mensagemErro}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={cadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Voltar para Login</Text>
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
});
