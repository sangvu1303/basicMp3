var player = document.querySelector('#player');
var playbutton = document.querySelector('#play');
var loopbutton = document.querySelector('#loop');
var volumebutton = document.querySelector('#volume');
var progressbar = document.querySelector('#progressbar');
var progress = document.querySelector('#progress');
var duration = 0;

loopbutton.addEventListener('click',function(){
    player.currentTime=0;
})

playbutton.addEventListener('click',function(){
    if(this.classList.contains('fa-play-circle')){
        this.classList.replace('fa-play-circle','fa-pause-circle');
        player.play();
    }else{
        this.classList.replace('fa-pause-circle','fa-play-circle');
        player.pause();
    }
})

volumebutton.addEventListener('click',function(){
    if(this.classList.contains('fa-volume-up')){
        this.classList.replace('fa-volume-up','fa-volume-mute');
        player.volume=0;
    }else{
        this.classList.replace('fa-volume-mute','fa-volume-up');
        player.volume=1;
    }
})

player.onloadedmetadata=function(){
    duration=player.duration;
    var min=Math.floor(duration/60);
    var sec=Math.floor(duration%60);
    document.getElementById('durtime').innerText=(min<10?'0'+min:min) + ':' + (sec<10?'0'+sec:sec);
}

player.addEventListener('timeupdate',function(){
    curtime=this.currentTime;
    var min=Math.floor(curtime/60);
    var sec=Math.floor(curtime%60);
    document.getElementById('curtime').innerText=(min<10?'0'+min:min) + ':' + (sec<10?'0'+sec:sec);
    var percent=curtime*100/duration;
    progress.style.width=percent+'%';
})

var down=false;
progressbar.addEventListener('click',function(e){
    progress.style.width=e.offsetX + 'px';
    var percent=e.offsetX*100/progressbar.offsetWidth;
    player.currentTime=percent*duration/100;
})

progressbar.addEventListener('mousedown',function(e){
    down=true;
})

progressbar.addEventListener('mouseup',function(e){
    down=false;
})

progressbar.addEventListener('mouseout',function(e){
    down=false;
})

progressbar.addEventListener('mousemove',function(e){
    if(down==true){
        progress.style.width=e.offsetX + 'px';
        var percent=e.offsetX*100/progressbar.offsetWidth;
        player.currentTime=percent*duration/100;
    }
})