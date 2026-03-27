import express, { json } from 'express';
import * as fs from 'fs';
import { readFileSync, truncateSync, writeSync } from 'node:fs';
import path from 'node:path';
import { exit } from 'node:process';

interface Quote {
    name: string,
    message: string,
    time: string
}

// I want it noted how silly the json database is, i'm not going to get fancy with it
const dataPath = path.join(__dirname, '../data/database.json');

let quotes: Quote[] = [];

const fd = fs.openSync(dataPath, 'r+')

try {
  const jsonString = readFileSync(fd, 'utf-8');
  const data = JSON.parse(jsonString);

  quotes = data.quotes as Quote[]
} catch (error) {
  console.error('Error reading or parsing JSON file:', error);
  exit(1);
}

const addQuote = (quote:Quote):boolean => {
    try {
        // yes, you could technically truncate and append to the end, I just don't feel like writing it out
        writeSync(fd, JSON.stringify({quotes}, undefined, 4))
        quotes.push(quote)

        return true;
    } catch {
        return false
    }
}

const app = express();
const port = process.env.PORT || 8090;

app.use(express.json())

app.post('/quote', (req, res) => {
    try{
        const {name, message} = req.body;

        if (!name || !message) return res.status(400).send("Malformed body");
        const q = {name, message, time: new Date().toISOString()}

        if (addQuote(q))
            return res.status(200).json(q)
        else
            return res.status(500).send("Failed to create quote")
    } catch {
        return res.status(500).send("Failed to create quote")
    }
})

app.get('/quote', (req, res) => {
    try {
        let {maxAge} = req.query

        const maxAgeMs = maxAge ? Number.parseInt(maxAge as string) : -1

        if (isNaN(maxAgeMs) || maxAgeMs < 0)
            return res.status(200).json(quotes)
        else
            return res.status(200).json(
                quotes.filter((r) => new Date(r.time).getTime() > (new Date().getTime() - maxAgeMs))
            )
    } catch {
        return res.status(500).send("Failed to complete search")
    }
})

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});