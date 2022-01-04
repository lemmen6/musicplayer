const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const albumcover = document.querySelector('#cover');


//song title
const songs = ['Sultans of Swing', 'Never Gonna Give You Up']

//keep track of songs
let songIndex = 0;

//load song info
loadSong(songs[songIndex])

//update song details 
function loadSong(song) {
    title.innerText = song 
    audio.src = `music/${song}.mp3`
    albumcover.src = `images/${song}.jpeg`
}

//play / pause song function
function playSong() {
musicContainer.classList.add('play');
playBtn.querySelector('i.fas').classList.remove('fa-play');
playBtn.querySelector('i.fas').classList.add('fa-pause');

audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
    }

//previous song funciton
function prevSong() {
songIndex -- 

if(songIndex < 0) {
songIndex = songs.length - 1;
}

loadSong(songs[songIndex])
playSong()

};

//next song function
function nextSong() {
    songIndex ++
    
    if(songIndex > songs.length - 1 ) {
    songIndex = 0
    }
    
    loadSong(songs[songIndex])
    playSong()
    
    };

// update progress funciton
function updateProgress(e) {
const { duration, currentTime } = e.srcElement;
const progressPercent = (currentTime / duration ) * 100;
progress.style.width = `${progressPercent}%`;
}

// set progress function
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
  }

//event listener pause/play
playBtn.addEventListener('click', () => {
const isPlaying = musicContainer.classList.contains('play')

if(isPlaying) {
        pauseSong()
    }   else {
        playSong()
    }
});

//event listeners next / prev song
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress);
