interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details{
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Mess",
    details: {
        author: "Edd Sheeran",
        year: 2015
    }
}

console.log('Song: ', audioPlayer.song );
console.log('Durantion: ', audioPlayer.songDuration );
console.log('Author: ', audioPlayer.details.author );

const song = "New Song";

const { song:anotherSong, songDuration, details } = audioPlayer; // En la desestructuración lo que va despuest de los : es el renombrado de la constante.
const {author} = details;

console.log('Song: ', anotherSong );
console.log('Durantion: ', songDuration );
console.log('Author: ', author );


const dbz : string[] = ['Goku', 'Vegeta', 'Trunk'];

console.log('Personaje 3: ', dbz[2] || 'No hay personaje');

const trunk =  dbz[2] || 'No hay personaje';
console.log('Personaje 3: ', trunk);

const [, , trunks = 'Not found']: string[] = ['Goku', 'Vegeta']
console.log('Personaje 3: ', trunks);