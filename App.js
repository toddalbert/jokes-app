import { useEffect, useState, Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './src/styles';
import { shuffle } from './src/utils';

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
      : <Fragment>
        <Text style={styles.jokeText}>{jokes[i].setup}</Text>
        <TouchableOpacity onPress={() => setReveal(!reveal)}
          style={reveal ? styles.show : styles.hidden}>
          {reveal
            ? <Text style={styles.punchline}>{jokes[i].punchline}</Text>
            : <Text style={styles.touchToReveal}>Touch for punchline</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.bigButton} onPress={getNextJoke}>
          <Text style={styles.buttonText}>Tell Me Another</Text>
        </TouchableOpacity>
      </Fragment>}
      <StatusBar style="auto" />
    </View>
  );
}
