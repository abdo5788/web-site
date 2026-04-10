// ...existing code...
// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle && navToggle.addEventListener('click', ()=>{
    if(navLinks.style.display === 'flex'){
        navLinks.style.display = '';
    } else {
        navLinks.style.display = 'flex';
    }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(href.startsWith('#') && href.length>1){
            e.preventDefault();
            const target = document.querySelector(href);
            if(target){
                target.scrollIntoView({behavior:'smooth'});
            }
        }
    })
});

// Scroll reveal
const revealElems = document.querySelectorAll('.reveal');
const revealOnScroll = ()=>{
    revealElems.forEach(el=>{
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight - 80){
            el.classList.add('show');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Gallery lightbox
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
if(galleryGrid){
    galleryGrid.addEventListener('click', (e)=>{
        if(e.target.tagName === 'IMG'){
            const src = e.target.dataset.large || e.target.src;
            lightboxImg.src = src;
            lightbox.style.display = 'flex';
        }
    })
}
lightboxClose && lightboxClose.addEventListener('click', ()=>{lightbox.style.display = 'none';lightboxImg.src='';});
lightbox && lightbox.addEventListener('click', (e)=>{if(e.target===lightbox) {lightbox.style.display='none';lightboxImg.src='';}});

// Simple map markers using Google Maps API
function initMap(){
    if(typeof google === 'undefined') return;
    const libya = {lat:32.0,lng:12.0};
    const map = new google.maps.Map(document.getElementById('map'),{zoom:5,center:libya});
    const places = [
        {pos:{lat:32.8872,lng:13.3139},title:'Tripoli',desc:'Capital city with historical old town.'},
        {pos:{lat:32.6348,lng:14.2856},title:'Leptis Magna',desc:'Ancient Roman ruins by the sea.'},
        {pos:{lat:32.7912,lng:12.5005},title:'Sabratha',desc:'Roman archaeological site with a coastal theater.'},
        {pos:{lat:30.1511,lng:9.4790},title:'Ghadames',desc:'Oasis town with distinctive architecture.'},
        {pos:{lat:32.8349,lng:21.7664},title:'Cyrene',desc:'Ancient Greek city ruins.'}
    ];
    places.forEach(p=>{
        const marker = new google.maps.Marker({position:p.pos,map, title:p.title});
        const infow = new google.maps.InfoWindow({content:`<h3>${p.title}</h3><p>${p.desc}</p>`});
        marker.addListener('click', ()=>infow.open(map,marker));
    });
}
// If Google Maps script loaded, initialize
window.initMap = initMap;
