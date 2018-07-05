document.addEventListener('DOMContentLoaded', function (e) {
    let record = false;
    let recorded = [];
    let recordingTimeStamp = 0;
    let savedRecording = [];
    let library = [];
    
    const mic = document.querySelector('.record');
    const status = document.querySelector('#status');
    const speedCount = document.querySelector('.speed');
    

     function playSound(e) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`[data-key="${e.keyCode}"]`);
        if (!audio)
            return;
        if (record) {

            recorded.push({keyCode: e.keyCode, timeStamp: recordingTimeStamp})
            savedRecording.push({keyCode: e.keyCode, timeStamp: recordingTimeStamp})
            
        }
        audio.currentTime = 0;
        audio.play();
        key.querySelector('img').classList.add('shake')
    }

    function endSound(e) {
        const key = document.querySelector(`[data-key="${e.keyCode}"]`);
        if (!key)
            return;
        key.classList.remove('playing');
        key.querySelector('img').classList.remove('shake')
    }

    mic.addEventListener('click', function (e) {
        record = true;
        recordingTimeStamp = 0;
        status.innerHTML = ("Now recording...")
        let interval = setInterval(() => {
            if (recordingTimeStamp >= 4000) {
                clearInterval(interval)
                record = false;    
                status.innerHTML = ('Recording session ended. Please select a note value for playback. Default is quarter notes.')
            }
            
            recordingTimeStamp +=20
        }, 20);

    });

    let play = document.querySelector('.play');
    play.addEventListener('click', () => playTrack(recorded))

    let playTrack = function(recorded) {
        console.log(recorded);
        if (speedCount.value == 20) {
            playbackTimeStamp = 0;
            const playback = setInterval(() => {
                let note = recorded[0]
                console.log(note.timeStamp)
                if (note.timeStamp == playbackTimeStamp) {
                    note = recorded.shift();
                    const audio = document.querySelector(`audio[data-key="${note.keyCode}"]`);
                    audio.currentTime = 0;
                    audio.play();
                }
                if(recorded.length == 0) {
                    clearInterval(playback)
                }
                playbackTimeStamp +=20;
            }, 20); 
        }else {
            const playback = setInterval(() => {
                let note = recorded.shift();
                const audio = document.querySelector(`audio[data-key="${note.keyCode}"]`);
                if (recorded.length > 0) {
                    status.innerHTML = ('Playing back...')
                } else {
                    status.innerHTML = ('Playback complete.')
                }
                audio.currentTime = 0;
                audio.play();
    
                if (recorded.length == 0) {
                    clearInterval(playback)
                }
            }, `${speedCount.value}`)
        }
    }
    let save = document.querySelector('.save-record');
    save.addEventListener('click', function (e) {
        recorded = [];
        if (recorded.length == 0 && savedRecording.length == 0) {
            status.innerHTML = ('Nothing was recorded. Please try again.')
        } 
        else if (savedRecording.length !== 0) {
            library.push(savedRecording);
            
            let database = document.querySelector('.tracklist');
            let newRecord = document.createElement("div");
            newRecord.classList.add("recording")
            database.appendChild(newRecord);
            let playButton = document.createElement('button');
            newRecord.appendChild(playButton);
            playButton.classList.add("button");
            playButton.innerText=(`Track ${library.length}`);
            let recName = document.createElement('span');
            recName.classList.add('recName')
            newRecord.appendChild(recName);
            let namePrompt = prompt("Please enter a name for this track...");
            if (namePrompt != null) {
                recName.innerHTML = "Track name: " + namePrompt
            }else{
                recName.innerHTML = "Track name: untitled"
            }
            console.log(library)

        } 
        savedRecording = [];
    })

    let master = document.getElementById('master-play');
    master.addEventListener('click', () => {
        for (let i = 0; i < library.length; i++) {
           (function() {
               playTrack(library[i])
            }())
        }
    })

    window.addEventListener('keydown', playSound)
    window.addEventListener('keyup', endSound)
})