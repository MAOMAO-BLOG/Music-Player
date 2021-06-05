console.log(window.player);
console.log(window.Zepto);
(function($,player){
     function MusicPlayer(dom){
          this.wrap=dom;
          this.dataList=[];
         this.indexObj=null;
          this.timer=null;
          this.list={};
          this.currIndex=0;
          this.progress=player.progress.pro();
          // this.drag=player.progress.drag(document.querySelector('.circle'));
     }
     MusicPlayer.prototype={
          init(){
               this.getDom();
               this.getData('../mock/data.json');
          },
          getDom(){
              this.record=document.querySelector('.songImg img');
              this.controlBtns=document.querySelectorAll('.control li');
          },
          getData(url){
               let This = this;
               $.ajax({
                    url:url,
                    method:'get',
                    success:function(data){
                         This.dataList=data;
                         This.controlList();
                         This.indexObj=new player.controlIndex(data.length);
                         This.loadMusic(This.indexObj.index);
                         
                        This.musicControl();
                        This.dragProgress();
                    },
                    error:function(){
                         console.log('数据请求失败');
                    }
               })
          },
          loadMusic(index){ //加载音乐
              
               player.render(this.dataList[index]);
               player.music.load(this.dataList[index].audioSrc);
                this.progress.renderAllTime(this.dataList[index].duration);
               this.currIndex=index;
               this.list.select(index);
               //是否播放
               if(player.music.status=='play'){
                    player.music.play();
                    this.progress.move(0);
                    this.controlBtns[2].className='playing';
                    this.imgRotate(0);
               }
               player.music.end(()=>{
                    this.loadMusic(this.indexObj.next());

               })
          },
          musicControl(){
               let This=this;
               this.controlBtns[1].addEventListener('touchend',function(){
                    player.music.status='play';
                    This.loadMusic(This.indexObj.prev());
               });
               this.controlBtns[2].addEventListener('touchend',function(){
                    if(player.music.status=='play'){
                         player.music.pause();
                         this.className='';
                         This.stopRotate();
                         This.progress.stop();

                    }
                    else {
                         player.music.play();
                         this.className='playing';
                         let deg=This.record.dataset.rotate||0;
                         This.imgRotate(deg); 
                         This.progress.move();
                    }
               });
               this.controlBtns[3].addEventListener('touchend',function(){
                    player.music.status='play';
                    This.loadMusic(This.indexObj.next());
               })
          },
          imgRotate(deg){
               let This=this;
               clearInterval(this.timer);
               this.timer=setInterval(()=>{
                    deg=+deg+0.2;
                    this.record.style.transform='rotate('+deg+'deg)';
                    this.record.dataset.rotate=deg;
               },1000/60)
          },
          stopRotate(){
               clearInterval(this.timer);
               this.timer=null;
          },
          controlList(){
               let This=this;
               this.list=player.listControl(this.dataList,this.wrap);
               this.controlBtns[4].addEventListener('touchend',()=>{
                    this.list.slideUp();
               });
               this.list.musicList.forEach((item,index)=>{
                    item.addEventListener('touchend',()=>{
                         if(this.currIndex==index){
                              return;
                         }
                         player.music.status='play'
                         This.indexObj.index=index;
                         This.loadMusic(index);
                         This.list.slideDown();
                    })
               })
          },
          dragProgress(){
               let This=this;
               let circle=player.progress.drag(document.querySelector('.circle'));
               circle.init();
               circle.start=function(){
                    This.progress.stop();
                    console.log('start');
               };
               circle.move=function(per){
                    This.progress.update(per);
               };
               circle.end=function(per){
                    let curTime=per*This.dataList[This.indexObj.index].duration;
                    player.music.moveTo(curTime);
                    player.music.play();
                    This.progress.move(per);
                    let deg=This.record.dataset.rotate||0;
                    This.imgRotate(deg);
                    This.controlBtns[2].className='playing'; 
               }
          }
     }
     let musicPlyer=new MusicPlayer(document.querySelector('#wrap'));
     musicPlyer.init();


})(window.Zepto,window.player)