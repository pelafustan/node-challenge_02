import express from 'express';
import cors from 'cors';
import * as fs from 'fs';
import { nanoid } from 'nanoid';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/add-song', (req, res) => {
    const id = nanoid();
    const songs = JSON.parse(fs.readFileSync('songs.json', 'utf8'));
    const newSong = { id, ...req.body };
    songs.push(newSong)

    fs.writeFileSync('songs.json', JSON.stringify(songs));

    console.log('Data gathered from form: ', newSong);

    res.status(200).send('Data received!');
});

app.get('/songs', (req, res) => {
    console.log(req.body);
    const songs = JSON.parse(fs.readFileSync('songs.json', 'utf8'));
    songs ? res.send(JSON.stringify(songs)) : res.status(200).send('[]');
});

app.delete('/songs/:id', (req, res) => {
    const { id } = req.params;
    const songs = JSON.parse(fs.readFileSync('songs.json', 'utf8'));

    const updatedSongs = songs.filter(song => song.id !== id);

    fs.writeFileSync('songs.json', JSON.stringify(updatedSongs));

    res.status(200).send('Song added!');
});

app.put('/songs/:id', (req, res) => {
    const { id } = req.params;
    const { title, artist, key } = req.body;
    const songs = JSON.parse(fs.readFileSync('songs.json', 'utf8'));
    let flag = false;

    const updatedSongs = songs.map(song => {
        if (song.id === id) {
            flag = true;
            return { ...song, title, artist, key };
        }
        return song;
    });

    if (flag) {
        fs.writeFileSync('songs.json', JSON.stringify(updatedSongs));
        res.status(200).send('Song updated!');
    } else {
        res.status(500).send('Song not found!');
    }

});

app.listen(8089, () => console.log('Server running!'));
