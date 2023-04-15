import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    width: '90%',
    fontSize: 48,
  },
  touchToReveal: {
    textAlign: 'center',
    color: '#262272',
    fontSize: 24,
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
    height: 88,
    padding: 24,
  },
  show: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 88,
    padding: 16,
  },
});