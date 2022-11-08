'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');
btnScrollTo.addEventListener('click',function(e){
  const s1coords=section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)',window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',document.documentElement.clientHeight,document.documentElement.clientWidth
  );



  // window.scrollTo({
  //   left:s1coords.left+window.pageXOffset,
  //   top:s1coords.top+window.pageYOffset,
  //   behavior:'smooth',
  // })

  section1.scrollIntoView({behavior:'smooth'});
})



  //Page Navigation

  // document.querySelectorAll('.nav__link').forEach(function(el){
  //   el.addEventListener('click',function(e){
  //     e.preventDefault();
  //     const id=this.getAttribute('href');
  //     document.querySelector(id).scrollIntoView({behavior:'smooth'})
  //   })
  // })

  document.querySelector('.nav__links').addEventListener('click',function(e){
    e.preventDefault();

    if(e.target.classList.contains('nav__link')){
          const id=e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior:'smooth'})
    }
  })


    // const h1=document.querySelector('h1');

    // h1.firstElementChild.style.color='white';
    // h1.lastElementChild.style.color='orangered';

    // h1.closest('header').style.background='var(--gradient-secondary)';
    

  const tabs=document.querySelectorAll('.operations__tab');
  const tabsContainer=document.querySelector('.operations__tab-container');
  const tabsContent=document.querySelectorAll('.operations__content');

  tabsContainer.addEventListener('click',function(e){
    const clicked=e.target.closest('.operations__tab');
    console.log(clicked)
    if(!clicked) return;
    tabs.forEach(t=>t.classList.remove('operations__tab--active'))
    clicked.classList.add('operations__tab--active');
    tabsContent.forEach(c=>c.classList.remove('operations__content--active'))
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
    
  })


const header=document.querySelector('.header');
const nav=document.querySelector('.nav');
const navHeight=nav.getBoundingClientRect().height;

const stickyNav=function(entries){
  const [entry]=entries;
  console.log(entry);

  if(!entry.isIntersecting)nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver=new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`
})

headerObserver.observe(header);


const allSections=document.querySelectorAll('.section')
const revealSection=function(entries,observer){
  const [entry]=entries;
  if(!entry.isIntersecting)return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver=new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15,
});
allSections.forEach(function(section){
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});


const imgTargets=document.querySelectorAll('img[data-src]');

const loadImg=function(entries,observer){
  const [entry]=entries;
  console.log(entry)

  if(!entry.isIntersecting)return;

  entry.target.src=entry.target.dataset.src;

  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver=new IntersectionObserver(loadImg,{
  root:null,
  threshold:0,
  rootMargin:'200px',
})

imgTargets.forEach(img=>imgObserver.observe(img));

const Slider=function(){
let curSlide=0;
const slides=document.querySelectorAll('.slide');
const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right');
const dotContainer=document.querySelector('.dots')

const slider=document.querySelector('.slider');
const maxSlide=slides.length
// slider.style.transform='scale(0.4) translateX(-800px)';
// slider.style.overflow='visible';

// slides.forEach((s,i)=>(s.style.transform=`translateX(${100*i}%)`));

const createDots=function(){
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`);
  });
};

const activateDots=function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot=>dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add(`dots__dot--active`);
}


const goToSlide=function(slide){
  slides.forEach(
    (s,i)=>(s.style.transform=`translateX(${100*(i-slide)}%)`)
  );
}
const nextSlide=function(){
  if(curSlide===maxSlide-1){
    curSlide=0;
  }else{
    curSlide++;
  }
  goToSlide(curSlide);
  activateDots(curSlide);
  // slides.forEach((s,i)=>(s.style.transform=`translateX(${100*(i-curSlide)}%)`));
};

const prevSlide=function(){
  if(curSlide===0){
    curSlide=maxSlide-1;
  }else{
    curSlide--;
    
  }

  goToSlide(curSlide);
  activateDots(curSlide);

  // slides.forEach((s,i)=>(s.style.transform=`translateX(${100*(i-curSlide)}%)`));
};
const init=function(){
  goToSlide(0);
  createDots();
  activateDots(0);
}
init()

btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);

document.addEventListener('keydown',function(e){
  console.log(e);
  if(e.key==='ArrowLeft') prevSlide();
  e.key==='ArrowRight' && nextSlide();
})

document.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide}=e.target.dataset;
    goToSlide(slide);
    activateDots(slide);

  }
})
}
Slider()
//   const nav=document.querySelector('.nav');
//   const initialCoords=section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll',function(){
//   console.log(window.scrollY);

//   if(window.scrollY>initialCoords.top)nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// })

// const obsCallback=function(entries,observer){
//   entries.forEach(entry=>{
//     console.log(entry);
//   });
// };

// const obsOptions={
//   root:null,
//   threshold:0.1,
// };

// const observer=new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(section1);

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header=document.querySelector('.header');
// const allSections=document.querySelectorAll('.section');
// console.log(allSections);
// document.getElementById('section--1');
// const allButtons=document.getElementsByTagName('button');
// console.log(allButtons);
// console.log(document.getElementsByClassName('btn'));
// const message=document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML='we use cookies for improved functionality and analytics, <button class="btn btn--close-cookie">Got it!</button>';
// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));
// document.querySelector('.btn--close-cookie').addEventListener('click',function(){
//   message.remove();
// })
// message.style.backgroundColor='#37383d';
// message.style.width='120%';

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// const h1=document.querySelector('h1')

// h1.addEventListener('mouseenter',function(e){
//   alert('Great')
// })
// h1.onmouseenter=function(e){
//   alert('Great')
// }

// const randomInt=(min,max)=>
//   Math.floor(Math.random()*(max-min+1)+min);
// const randomColor=()=>
// `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor=randomColor();
// });
// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor=randomColor();
// });
// document.querySelector('.nav').addEventListener('click',function(e){
//   this.style.backgroundColor=randomColor();
// });
