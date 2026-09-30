const menu=document.querySelector('.menu');
const nav=document.querySelector('nav');
menu?.addEventListener('click',()=>{nav.style.display=nav.style.display==='flex'?'none':'flex';nav.style.flexDirection='column';nav.style.position='absolute';nav.style.top='70px';nav.style.right='5%';nav.style.background='#fff';nav.style.padding='20px';nav.style.boxShadow='0 10px 30px #0002';});
