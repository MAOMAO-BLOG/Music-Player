(function(root){
    function AudioMusic(){
        this.audio=new Audio();
        this.status='pause';
    }
    AudioMusic.prototype={
            load(src){
                this.audio.src=src;
                this.audio.load();
            },
            play(){
                this.audio.play();
                this.status='play';
            },
            pause(){
                this.audio.pause();
                this.status='pause';
            },
           //音乐播放完成事件
           end(fn){
               this.audio.onended=fn;
           },
           //跳到某个时间点
           moveTo(time){
               this.audio.currentTime=time;//单位是秒
           }
        }
    root.music=new AudioMusic();
})(window.player||window.player=={})