import express from "express";

const app = express();

// giver add at browser at tilgå
app.use(express.static("public"));
app.use(express.static("videos"));



const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});

/*
MPEG-DASH: man kan se fx i Youtube at der er forskellige kvaliteter af videoen 
det adaptere sig til ens internet hastighed.
Videoen bliver delt op i chunks og der er en manifest fil som fortæller.
Uden chunks vil det ikke være mulighed at køre i små bider og det vil tage lang tid at loade videoen.
Shakar player : bruger chunks og manifest filen til at loade videoen ift ens internet hastighed.
Ved chunks : er biligere indet at loade videoen og det er hurtigere at loade videoen.
fmpeg : det er dyrt
pros vs Cons : 
Pros:
- 
- 



Denne bliver brug når vi cd-in i videos mappe og køre ffmpeg kommandoen i terminalen
denne opretter manifest file mi xml-format og chunket video filer i mp4-format
ffmpeg -i input.mp4 \
-map 0:v -map 0:a -b:v:0 300k -s:v:0 426x240 -profile:v:0 baseline -b:a:0 64k \
-map 0:v -map 0:a -b:v:1 700k -s:v:1 640x360 -profile:v:1 main     -b:a:1 96k \
-map 0:v -map 0:a -b:v:2 1500k -s:v:2 1280x720 -profile:v:2 high   -b:a:2 128k \
-f dash playlist.mpd

*/
