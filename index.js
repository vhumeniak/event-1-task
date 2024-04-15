const fs = require('fs');
const filename = 'info.txt';
let totalWords = 0;

const readStream = fs.createReadStream(filename, { encoding: 'latin1' });

readStream.on('data', (chunk) => {
    const chunkString = chunk.toString('utf8');
    const cleanChunk = removeAnsiCharacters(chunkString);
    const lines = cleanChunk.split('\n');

    lines.forEach((line) => {
        console.log(line);
        totalWords += countWordsInLine(line);
    });
});

readStream.on('end', () => {
    console.log(`Кількість слів у текстовому файлі - ${totalWords}`);
});

function countWordsInLine(line) {
    const wordRegex = /\b\w+\b/g;
    return (line.match(wordRegex) || []).length;
}

function removeAnsiCharacters(text) {
    const ansiRegex = /\x1B\[[0-?]*[ -/]*[@-~]/g;
    return text.replace(ansiRegex, '');
}