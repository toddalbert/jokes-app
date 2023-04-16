import { useEffect, useState, Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './src/styles';
import { shuffle } from './src/utils';

export default function App() {
  
  const [jokes, setJokes] = useState(); // Will hold our array of jokes
  const [i, setI] = useState(0); // Our current joke index
  const [reveal, setReveal] = useState(false); // Toggle to show punchline
  
  const getJokes = async () => { // Here we fetch the jokes
    const resp = await fetch('https://api.sampleapis.com/jokes/goodJokes');
    const json = await resp.json();
    setJokes(shuffle(json)); // Shuffle the jokes before setting
  }

  useEffect(() => { getJokes(); }, []); // Run getJokes once at start

  useEffect(() => { setReveal(false); }, [i]); // If joke changes, hide punchline

  const getNextJoke = () => { // Increment joke index. If at end, start at 0 again
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
