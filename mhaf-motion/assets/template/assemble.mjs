// Joins the chunks, builds the music (python3 + numpy) and writes out/final.mp4. Needs ffmpeg on PATH.
import {execSync} from 'child_process';
import fs from 'fs';
const sh = (c) => execSync(c, {stdio: 'inherit'});
const chunks = fs.readdirSync('out/chunks').filter((f) => /^c\d+\.mp4$/.test(f)).sort();
fs.writeFileSync('out/list.txt', chunks.map((f) => `file 'chunks/${f}'`).join('\n'));
sh('ffmpeg -v error -y -f concat -safe 0 -i out/list.txt -c copy out/silent.mp4');
if (!fs.existsSync('out/music.wav')) sh('python3 audio.py');
sh('ffmpeg -v error -y -i out/silent.mp4 -i out/music.wav -af "loudnorm=I=-15:TP=-1.5,afade=t=out:st=71:d=1.2" -c:v copy -c:a aac -b:a 192k -shortest out/final.mp4');
console.log('Wrote out/final.mp4');
