(function(root){
    
    function Progress(){
        this.duration=0;
        this.frameId=null;
        this.startTime=0;
        this.lastPer=0;
        this.init();
    }
    function instanceProgress(){
        return new Progress();
    }
    Progress.prototype={
        init(){
           this.getDom();
        },
        getDom(){
            this.curTime=document.querySelector('.curTime');
            this.totalTime=document.querySelector('.totalTime');
            this.prev=document.querySelector('.prev');
            this.circle=document.querySelector('.circle');
        },
        renderAllTime(time){
            this.duration=time;
            time=this.formatTime(time);
            this.totalTime.innerHTML=time;
        },
        formatTime(time){
            time=Math.round(time);
            let m=Math.floor(time/60);
            let s=time%60;
            m=m<10?'0'+m:m;
            s=s<10?'0'+s:s;
            time=m+':'+s;
            return time;
        },
        move(per){//移动进度条
            cancelAnimationFrame(this.frameId);
            this.startTime=new Date().getTime();
            let This=this;
            this.lastPer=per===undefined?this.lastPer:per;//如果传参，就是切换，就不用记录上一次的百分比,
            function frame(){
                let curTime=new Date().getTime();
                let per=This.lastPer+(curTime-This.startTime)/(This.duration*1000);//进度条移动所占的百分比
                if(per<=1){
                    This.update(per);//更新进度条
                }else{//说明进度条已走完
                    cancelAnimationFrame(this.frameId);
                }
                This.frameId=requestAnimationFrame(frame);
            }
            frame();
        },
        update(per){//更新进度条和已经播放的
            this.curTime.innerHTML=this.formatTime(per*this.duration);
            this.prev.style.width=per*100+'%';
            this.circle.style.transform='translateX('+per*this.circle.parentNode.offsetWidth+'px)';
        },
            
        stop(){//停止移动进度条
            cancelAnimationFrame(this.frameId);
           //记录一下暂停时候的百分比
           let stopTime=new Date().getTime();
           this.lastPer+=(stopTime-this.startTime)/(this.duration*1000);
        }
        
    }


    
    function Drag(obj){
        this.obj=obj;
        this.startPointX=0;//按下时的位置
        this.startLeft=0;//按下时距离左边的距离
        this.percent=0;//百分比
    }
    Drag.prototype={
        init(){
            let This=this;
            this.obj.style.transform='translateX(0)';
            this.obj.addEventListener('touchstart',function(ev){
                This.startPointX=ev.changedTouches[0].pageX;
                This.startLeft=parseFloat(this.style.transform.split('(')[1]);
                This.start && This.start();
            });
            this.obj.addEventListener('touchmove',function(ev){
                This.disPointX=ev.changedTouches[0].pageX-This.startPointX;
                let l=This.startLeft+This.disPointX;
                if(l<0){
                    l=0;
                }else if(l>this.offsetParent.offsetWidth){
                    l=this.offsetParent.offsetWidth;
                }
                this.style.transform='translate('+l+'px)';
                This.percent=l/this.offsetParent.offsetWidth;
                This.move && This.move(This.percent);
            });
            this.obj.addEventListener('touchend',function(){
                This.end && This.end(This.percent);
            })
        }
    }
    function instanceDrag(obj){
        return new Drag(obj);
    }
    root.progress={
        pro:instanceProgress,
        drag:instanceDrag
    }
})(window.player||window.player=={})