//渲染功能：渲染图片、歌词、是否喜欢
(function(root){
    function renderImg(src){
        root.blurImg(src);
        let img=document.querySelector('.songImg img');
        img.src=src;
    }
    function renderInfo(data){
        let title=document.querySelector('.info h2');
        let singer=document.querySelector('.info .singer');
        let album=document.querySelector('.info .album');
        title.innerText=data.name;
        singer.innerText=data.singer;
        album.innerText=data.album;
    }
    function renderIsLike(isLike){
        let lis=document.querySelectorAll('.control li');
           lis[0] .className=isLike?'liking':'';
    }
    root.render=function(data){
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
})(window.player||window.player=={})