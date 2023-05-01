import './App.css'
import HangImage from './components/HangImage';
import { getRandomWord } from './helpers/getRandomWord';
import { letters } from './helpers/letters';
import { useState, useEffect } from 'react'


function App() {


  const [word, setWord] = useState(getRandomWord);
  // EL REPEAT SIRVE PARA REPERTIR UN STRING LA CANTIDAD DE VECES QUE NECESITO
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false)

  useEffect(() => {
    if (attempts >= 9) {
      setLose(true)
    }
  }, [attempts])


  useEffect(() => {
    if (!hiddenWord.includes('_ ')) {
      setWon(true)
    }
  }, [hiddenWord])


  const checkLetter = (letter: string) => {

    // Si lose está en true, no quiero que siga ejecutando
    if (lose) return;
    if (won) return;

    //  Hago una logica negando, es decir cuando la palabra no encuentre la letra, que vaya sumando los intentos
    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9))
      return;
    }
    // Creo una constante para convertir el hiddenWord en un Array y separarlo por espacios
    const hiddenWordArray = hiddenWord.split(' ')
    // Itero la palabra word, y por cada iteración le pregunto si la letra de la posición es igual a la letra que se selecciono, de ser asi, le asigno esa letra a la posición del nuevo array hiddenwordArray
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter
      }
    }
    // Actualiza el estado de hiddenWord, uniendo el array hiddenWord con un join.
    setHiddenWord(hiddenWordArray.join(' '))
  }


  // Se resetea todo y se inicia una nueva partida

  const handleReset = () => {

    const newWord = getRandomWord()

    setWord(newWord)
    setHiddenWord('_ '.repeat(word.length))
    setAttempts(0)
    setWon(false)
    setLose(false)
  }


  return (
    <div className='App'>
      {/*  Imagenes */}
      <HangImage imageNumber={attempts} />
      {/*  Palabra Oculta */}
      <h3>{hiddenWord}</h3>
      {/*  Contador de intentos*/}
      <h3> Intentos: {attempts}</h3>
      {/* Mensaje si perdio */}
      {
        (lose) ?
          <>
            <h2>
              Perdió
            </h2>
            <h3>La palabra era: {word}</h3>
          </>
          : ''
      }
      {/* Mensae si ganó */} {

        (won) ?
          <>
            <h2> Felicitaciones, usted Ganó!!!</h2>
          </>
          :
          ''
      }

      {/*  Botones de letras */}
      {
        letters.map((letter, index) => {
          return (
            <button onClick={() => checkLetter(letter)} key={new Date().getTime() + index}>{letter}</button>
          )
        })
      }
      <br></br>
      <br></br>
      <button onClick={handleReset}>¿Nuevo Juego?</button>
    </div>
  );
};

export default App
