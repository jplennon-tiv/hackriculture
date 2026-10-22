const palettes = {
  forest: {name:'Forest & Cream',description:'Deep green, warm cream and a little gold. A natural connection to the cover, with a clearly defined book feature.',colours:['#fcfcf8','#28513d','#f2d98e','#eaf0e1']},
  petrol: {name:'Petrol & Parchment',description:'A rich blue-green feature with parchment accents. A broader editorial feel for Hackriculture’s gardening, food, DIY and home-energy subjects.',colours:['#fcfbf6','#245361','#f1d695','#e5eff0']},
  harvest: {name:'Harvest & Ink',description:'Warm golden yellow with dark olive text and buttons. The brightest option: the launch feels welcoming and immediately catches the eye.',colours:['#fcfbf7','#e0bb56','#303b2b','#f8edcd']},
  plum: {name:'Plum & Oat',description:'A deep plum book feature, oat-coloured details and pale rose behind the form. A distinctive, bookish palette inspired by the cover’s beetroot tones.',colours:['#fcfaf6','#653d53','#eddaa9','#f0e6ea']},
  original: {name:'Original terracotta',description:'The original warm terracotta treatment, kept here as a reference. All five options use exactly the same layout and content.',colours:['#fcfcf8','#ad3e29','#f7e8dc','#2a2e27']}
};
const frame = document.getElementById('preview');
function choose(key) {
  const choice = palettes[key];
  document.querySelectorAll('[data-palette]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.palette===key)));
  frame.src = 'concept.html?design=clay'+(key==='original'?'':'&palette='+key);
  frame.title = choice.name+' colour preview';
  document.getElementById('open-design').href = frame.src;
  document.getElementById('design-note').replaceChildren(Object.assign(document.createElement('strong'),{textContent:choice.name+'. '}),document.createTextNode(choice.description));
  document.getElementById('swatches').replaceChildren(...choice.colours.map(colour=>{const swatch=document.createElement('span');swatch.style.background=colour;swatch.title=colour;return swatch}));
  history.replaceState(null,'','#'+key);
}
document.querySelectorAll('[data-palette]').forEach(button=>button.addEventListener('click',()=>choose(button.dataset.palette)));
['desktop','mobile'].forEach(mode=>document.getElementById(mode).addEventListener('click',()=>{
  document.getElementById('canvas').classList.toggle('mobile',mode==='mobile');
  document.getElementById('desktop').setAttribute('aria-pressed',String(mode==='desktop'));
  document.getElementById('mobile').setAttribute('aria-pressed',String(mode==='mobile'));
}));
window.addEventListener('message',event=>{
  if(event.origin===location.origin&&event.source===frame.contentWindow&&event.data?.type==='preview-height'&&Number.isFinite(event.data.height)){
    frame.style.height=Math.min(Math.max(event.data.height,400),16000)+'px';
  }
});
const key = location.hash.slice(1);
choose(Object.hasOwn(palettes,key)?key:'harvest');
