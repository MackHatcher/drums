document.addEventListener('DOMContentLoaded', function(e) {
    let record = false;
    let recorded = [];
    let savedRecording = [];
    const storedRecording = [];
    const storedRecording2 = [];
    const storedRecording3 = [];
    const storedRecording4 = [];
    const storedRecording5 = [];
    const mic = document.querySelector('.record');
    const status = document.querySelector('#status');

    
    function playSound (e) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`[data-key="${e.keyCode}"]`);
        if (!audio)
            return;
        if(record) {
            recorded.push(e.keyCode)
            savedRecording.push(e.keyCode)
        }
        audio.currentTime = 0;
        audio.play();
        key.querySelector('img').classList.add('shake')
    }
    
    function endSound (e) {
        const key = document.querySelector(`[data-key="${e.keyCode}"]`);
        if(!key)
            return;
        key.classList.remove('playing');    
        key.querySelector('img').classList.remove('shake')
    }

    mic.addEventListener('click', function(e) {
        record = true;
        status.innerHTML=("Now recording...")
        setTimeout(() => {
            record = false;
            status.innerHTML=('Recording session ended!')
        }, 5000);
        
    });

    let play = document.querySelector('.play');
    play.addEventListener('click', function(e) {
        const playback = setInterval(() => {
            const note = recorded.shift();
            const audio = document.querySelector(`audio[data-key="${note}"]`);
            if (recorded.length > 0) {
                status.innerHTML=('Playing back...')
            }else {
                status.innerHTML=('Playback complete.')
            }
            audio.currentTime = 0;
            audio.play();
            
            if(recorded.length == 0) {
                clearInterval(playback)
            }
        }, 250)
    })

    let save = document.querySelector('.save-record');
    save.addEventListener('click', function(e) {
        recorded = [];
        if (storedRecording1.length == 0) {
            storedRecording1.push(savedRecording);
            savedRecording = [];
            console.log(storedRecording1)            
        } else if (storedRecording1.length !=0) {
            storedRecording2.push(savedRecording);
            savedRecording = [];
            console.log(storedRecording2)
        } else if (storedRecording2.length !=0) {
            storedRecording3.push(savedRecording);
            savedRecording = [];
            console.log(storedRecording3)
        } else if (storedRecording3.length !=0) {
            storedRecording4.push(savedRecording);
            savedRecording = [];
            console.log(storedRecording4)
        } else if (storedRecording4.length !=0) {
            storedRecording5.push(savedRecording);
            savedRecording = [];
            console.log(storedRecording5)
        } else if (storedRecording5.length !=0) {
            status.innerHTML=('Cannot store more than 5 track layers')
            return;
        }
        
    })

    window.addEventListener('keydown', playSound)
    window.addEventListener('keyup', endSound)
})

