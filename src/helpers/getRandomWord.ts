let words: string[] = [
  "COMPUTADORA",
  "FAMILIA",
  "HIJOS",
  "DEPORTE",
  "FUTBOL",
  "JUEGO",
  "FELICIDAD",
  "PELICULAS",
  "MUSICA",
  "COCINAR",
];

export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};
