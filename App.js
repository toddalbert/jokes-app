import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [jokes, setJokes] = useState();
  const [i, setI] = useState(0);
  const [reveal, setReveal] = useState(false);
  const getJokes = async () => {
    const resp = await fetch('https://api.sampleapis.com/jokes/goodJokes');
    const json = await resp.json();
    setJokes(shuffle(json));
  }
  useEffect(() => { getJokes(); }, []);
  useEffect(() => { setReveal(false); }, [i]);
  const getNextJoke = () => {
    if(i < jokes.length - 1) setI(i + 1)
    else setI(0)
  }
  return (
    <View style={styles.container}>
    {!jokes
      ? <Text style={styles.text}>Getting Jokes...</Text>
      : <>
        <Text style={styles.jokeText}>{jokes[i].setup}</Text>
        <TouchableOpacity onPress={() => setReveal(!reveal)}
          style={reveal ? styles.show : styles.hidden}>
          <Text style={styles.punchline}>{jokes[i].punchline}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bigButton} onPress={getNextJoke}>
          <Text style={styles.buttonText}>Tell Me Another</Text>
        </TouchableOpacity>
      </>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272262',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 80,
  },
  text: {
    fontSize: 24,
    color: 'whitesmoke',
  },
  jokeText: {
    color: 'whitesmoke',
    textAlign: 'center',
    fontSize: 48,
  },
  punchline: {
    textAlign: 'center',
    color: '#FFBD02',
    fontSize: 32,
  },
  bigButton: {
    backgroundColor: '#FF216E',
    padding: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
  hidden: {
    backgroundColor: '#FFBD02',
    width: '100%',
    padding: 16,
  },
  show: {
    backgroundColor: 'transparent',
    width: '100%',
    padding: 16,
  },
});

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}