(function(root){
    function listControl(data,wrap){
        let list=document.createElement('div');
        let dl=document.createElement('dl');
        let dt=document.createElement('dt');
        let close=document.createElement('div');
        list.className='list';
        close.className='close';
        dt.innerHTML='播放列表';
        close.innerHTML='关闭';
        let musicList=[];
        list.appendChild(dl);
        dl.appendChild(dt);
        data.forEach((item,index) => {
            let dd=document.createElement('dd');
            dd.addEventListener('touchend',()=>{
                select(index);
            })
            dd.innerHTML=item.name;
            musicList.push(dd);
            dl.appendChild(dd);
        });
        list.appendChild(close);
        wrap.appendChild(list);
        let disY=list.offsetHeight;
        console.log('disY',disY);
        list.style.transform='translateY('+disY+'px)';
        function slideUp(){
            list.style.transition='.2s';
            list.style.transform='translateY(0)';
        }
        function slideDown(){
            list.style.transition='.2s';
            list.style.transform='translateY('+disY+'px)';
        }
        close.addEventListener('touchend',slideDown);
        function select(index){
            for(let i=0;i<musicList.length;i++){
                musicList[i].className='';
            }
            musicList[index].className='active';
        }
        select(0);
        return {
            dom:list,
            musicList:musicList,
            slideUp:slideUp,
            slideDown:slideDown,
            select:select
        }
    }
    root.listControl=listControl;
})(window.player||window.player=={})