import { createLaunchVariation } from './launch-variations.js';

const requested = new URLSearchParams(location.search).get('design');
const launchVariants = ['gold','clay','ink'];
const design = ['editorial','garden','companion','newspaper',...launchVariants].includes(requested) ? requested : 'gold';
document.body.className = launchVariants.includes(design) ? `newspaper launch-variant launch-${design}` : design;
const media = '../../public/images/';
const names = {editorial:'The Gardener’s Journal',garden:'From the Plot',companion:'The Growing Companion',newspaper:'The Hackriculture Gazette',gold:'Harvest Gold',clay:'Terracotta Feature',ink:'Ink & Lemon'};
document.title = names[design]+' — Hackriculture design preview';
const palette = new URLSearchParams(location.search).get('palette');
const paletteNames = {forest:'Forest & Cream',petrol:'Petrol & Parchment',harvest:'Harvest & Ink',plum:'Plum & Oat'};
if (design === 'clay' && Object.hasOwn(paletteNames, palette)) {
  document.body.dataset.palette = palette;
  document.title = paletteNames[palette]+' — Hackriculture colour preview';
}

const brand = `<a class="brand" href="#main" aria-label="Hackriculture home"><img src="${media}icons/hackriculture-logo.jpg" alt="" width="160" height="160"><span>hackriculture</span></a>`;
const header = `<a class="skip" href="#main">Skip to content</a><header class="wrap header">${brand}<button class="mobile-menu" aria-expanded="false" aria-controls="main-nav">Menu +</button><nav class="nav" id="main-nav" aria-label="Main navigation"><a href="#book">The book</a><a href="#guides">Growing guides</a><a href="#videos">From YouTube</a><a href="#about">About John</a><a class="nav-cta" href="#launch">Book launch updates ↗</a></nav></header>`;
const cover = `<div class="book-cover"><img src="assets/book-cover.jpg" alt="The Vegetable Guru, Your at-a-glance growing companion, by John Lennon" width="925" height="1200"></div>`;
const signup = `<section class="signup" id="launch"><div class="wrap signup-grid"><div><div class="eyebrow">The Vegetable Guru · Coming soon</div><h2>Be there for<br>the first chapter.</h2><p>The book is nearly ready. Leave your email and I’ll let you know when you can order your copy.</p></div><form class="launch-form"><label for="launch-email">Your email address</label><div class="email-row"><input id="launch-email" type="email" autocomplete="off" placeholder="you@example.com" required aria-describedby="signup-terms"><button class="button light" type="submit">Let me know <span aria-hidden="true">↗</span></button></div><p class="small" id="signup-terms">A launch notification from John at Hackriculture. Unsubscribe at any time. <button type="button" class="privacy-link" style="border:0;background:none;color:inherit;padding:0;text-decoration:underline;font-size:inherit">Privacy</button></p><div class="form-message" role="status" aria-live="polite"></div></form></div></section>`;
const footer = `<footer class="wrap footer">${brand}<p>Practical growing. From Cornwall.</p><a href="https://www.youtube.com/@hackriculture" target="_blank" rel="noopener">Watch on YouTube ↗</a><span>© 2026 Hackriculture</span></footer><div class="preview-note">Design preview · Sample artwork from the first proof · The email form does not submit or save your details</div>`;
const guides = [
  {name:'Beetroot',slug:'beetroot',image:'beetroot-botanical.webp',label:'ROOT VEGETABLES'},
  {name:'Carrots',slug:'carrots',image:'carrots-botanical.webp',label:'ROOT VEGETABLES'},
  {name:'Lettuce',slug:'lettuce',image:'lettuce-botanical.webp',label:'SALADS & LEAVES'},
  {name:'Outdoor tomatoes',slug:'outdoor-tomatoes',image:'outdoor-tomatoes-botanical.webp',label:'FRUITING VEGETABLES'}
];
function guideCards(){return `<div class="guide-grid">${guides.map(g=>`<a class="guide" href="https://hackriculture.com/growing/${g.slug}/" target="_blank" rel="noopener"><div class="guide-image"><img src="${media}guides/${g.image}" alt="Illustration of ${g.name.toLowerCase()}" loading="lazy" width="400" height="400"></div><div class="guide-label"><span>${g.name}</span><span aria-hidden="true">↗</span></div><span class="small">${g.label}</span></a>`).join('')}</div>`}
const videos = [
  {id:'Y1RCQXVBO00',image:'video-Y1RCQXVBO00.avif',type:'ON THE ALLOTMENT',title:'A season of growing, a plot full of lessons.'},
  {id:'bzR9prfOEcI',image:'video-bzR9prfOEcI.jpg',type:'GROWING TOMATOES',title:'Outdoor tomatoes, in a British summer.'},
  {id:'K7zozngB4Mg',image:'video-K7zozngB4Mg.jpg',type:'PLANNING A SMALL PLOT',title:'Making a family garden work harder.'}
];
function videoCards(){return `<div class="video-grid">${videos.map(v=>`<a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener"><div class="video-image"><img src="${media}photos/${v.image}" alt="" loading="lazy" width="640" height="360"><span class="play" aria-hidden="true">▶</span></div><div class="eyebrow">${v.type}</div><h3>${v.title}</h3></a>`).join('')}</div>`}
function sampleButton(type='crop'){const base=type==='crop'?'beetroot':'rotation';return `<button class="sample-visual" type="button" data-sample="${type}" aria-label="Enlarge ${type==='crop'?'Beetroot':'Rotation and planning'} book spread"><img src="assets/${base}-left.jpg" alt="${type==='crop'?'Beetroot growing guide, page 12':'Rotation and planning, page 148'}" loading="lazy"><img src="assets/${base}-right.jpg" alt="${type==='crop'?'Beetroot growing guide, page 13':'Rotation and planning, page 149'}" loading="lazy"></button>`}
const aboutCopy = `<div><div class="eyebrow">Meet the gardener</div><h2>A real garden.<br>A lifetime of learning.</h2><p>I’m John. From my garden and allotment in Cornwall, I share the useful things I’ve learnt about growing food and doing a little more for yourself.</p><p style="margin-top:16px">The Vegetable Guru brings that practical approach to the page: clear advice to turn to as each job comes along.</p><a class="text-link" href="https://www.youtube.com/watch?v=EgWiQnMn9qM" target="_blank" rel="noopener">Watch my story <span aria-hidden="true">↗</span></a></div>`;
const authorPhoto = `<img src="${media}photos/me-allotment-kneeling.jpeg" alt="John beside his vegetables at the allotment" loading="lazy" width="450" height="640">`;

function editorial(){return `${header}<main id="main">
  <section class="wrap editorial-hero"><div><div class="eyebrow"><span class="status-dot"></span>A new book from John Lennon</div><h1 class="heading-serif">A little knowledge.<br><em>A better<br>harvest.</em></h1><p class="lede">Meet <em>The Vegetable Guru</em>. An illustrated growing companion for the questions that crop up along the way.</p><div class="actions"><a class="button" href="#book">Look inside the book <span aria-hidden="true">↗</span></a><a class="text-link" href="#launch">Tell me when it’s ready</a></div><p class="small">Coming soon · From the gardener behind Hackriculture</p></div><figure class="editorial-stage">${cover}<figcaption>Your at-a-glance growing companion</figcaption></figure></section>
  <section class="wrap three-uses" aria-label="What the book helps with"><div class="triple"><div><span class="number">01 / GROW</span><h3>Know your crop.</h3><p>44 illustrated growing guides, with the useful details brought together in one place.</p></div><div><span class="number">02 / UNDERSTAND</span><h3>Find the trouble.</h3><p>Recognise common problems and find practical, organic ways to tackle them.</p></div><div><span class="number">03 / PLAN</span><h3>See the bigger picture.</h3><p>Make sense of soil, compost, crop rotation, watering and the space you have.</p></div></div></section>
  <section class="wrap section sample-row" id="book"><div><div class="eyebrow">Between the covers</div><h2 class="heading-serif">Made to be<br>turned to.</h2><p>A growing calendar. A planting reminder. Help when something starts eating the crop before you do. Take a closer look at the pages.</p><button class="button ghost" data-sample="crop">Read a sample <span aria-hidden="true">↗</span></button></div><div>${sampleButton()}<div class="sample-meta"><span>BEETROOT / PAGES 12–13</span><span>Click to read the spread ↗</span></div></div></section>
  <section class="wrap section section-rule" id="guides"><div class="section-head"><div><div class="eyebrow">Something useful for today</div><h2 class="heading-serif">Start with what you grow.</h2></div><a class="text-link" href="https://hackriculture.com/growing/" target="_blank" rel="noopener">All 44 free guides ↗</a></div>${guideCards()}</section>
  <section class="about-band section" id="about"><div class="wrap about-row">${authorPhoto}${aboutCopy}</div></section>
  <section class="wrap section" id="videos"><div class="section-head"><div><div class="eyebrow">From the channel</div><h2 class="heading-serif">Out of the book.<br>Into the garden.</h2></div><a class="text-link" href="https://www.youtube.com/@hackriculture" target="_blank" rel="noopener">Visit the channel ↗</a></div>${videoCards()}</section>
  ${signup}</main>${footer}`}

function garden(){return `${header}<main id="main">
  <section class="garden-hero"><img class="garden-background" src="${media}photos/garden-summer.jpeg" alt="John’s productive garden and greenhouse in Cornwall" width="640" height="409"><div class="wrap"><div class="eyebrow">Hackriculture · Cornwall, England</div><h1>Good things<br>come from<br><em>growing.</em></h1><p>Practical ideas, honest experiments and a new book to help you along the way.</p><div class="actions"><a class="button" href="#book">Meet The Vegetable Guru <span aria-hidden="true">↗</span></a></div></div><span class="garden-caption">A summer afternoon in John’s garden</span></section>
  <section class="wrap book-intro"><div>${cover}</div><div><div class="eyebrow">A new chapter · Coming soon</div><h2>The Vegetable Guru</h2><p>Your at-a-glance growing companion. 44 vegetable guides, 14 Troubles guides and practical help for the whole plot.</p></div><a class="text-link" href="#launch">Join the launch list <span aria-hidden="true">↗</span></a></section>
  <section class="wrap section" id="videos"><div class="story-intro"><div><div class="eyebrow" style="margin-bottom:15px">Notes from the garden</div><h2>Watch it grow.<br>Learn as we go.</h2></div><p>Come along for the sowing, the harvests and the things that don’t quite go to plan. There’s always something to learn.</p></div>${videoCards()}</section>
  <section class="book-feature section" id="book"><div class="wrap book-feature-inner"><div><div class="eyebrow">The Vegetable Guru</div><h2>A little help,<br>season after season.</h2><p>A practical book for the everyday decisions of growing vegetables. Clear calendars, illustrated guides and the information you need when you need it.</p><ul><li><span>Growing guides</span><strong>44 crops</strong></li><li><span>Vegetable Troubles</span><strong>14 guides</strong></li><li><span>Growing Techniques</span><strong>The whole plot</strong></li></ul><a class="button" href="#launch">Let me know when it’s ready <span aria-hidden="true">↗</span></a></div><div>${sampleButton()}<div class="sample-meta"><span>A LOOK INSIDE / BEETROOT</span><button class="text-link" data-sample="crop" style="background:none;border:0;padding:0;font-size:11px">Read the pages ↗</button></div></div></div></section>
  <section class="wrap section" id="guides"><div class="section-head"><div><div class="eyebrow">Free growing guides</div><h2>What’s growing<br>in your garden?</h2></div><a class="text-link" href="https://hackriculture.com/growing/" target="_blank" rel="noopener">Explore the collection ↗</a></div>${guideCards()}</section>
  <section class="wrap section section-rule" id="about"><div class="about-row">${authorPhoto}${aboutCopy}</div></section>
  ${signup}</main>${footer}`}

function companion(){return `${header}<main id="main">
  <section class="wrap companion-hero"><div><div class="eyebrow">Introducing The Vegetable Guru</div><h1>Know what<br>to grow.<br><span>And how.</span></h1><p class="lede">A practical, illustrated companion to growing your own. From your first sowing to the problems that keep you guessing.</p><div class="actions"><a class="button" href="#book">Explore the book <span aria-hidden="true">↗</span></a><a class="text-link" href="#launch">Get the launch email</a></div><p class="small">By John Lennon, the gardener behind Hackriculture.</p></div><div class="companion-stage" aria-label="The Vegetable Guru with botanical vegetable illustrations"><div class="art-square beet"><span class="art-label">Roots</span><img src="${media}guides/beetroot-botanical.webp" alt="Beetroot illustration"></div><div class="art-square carrot"><span class="art-label">Grow</span><img src="${media}guides/carrots-botanical.webp" alt="Carrot illustration"></div><div class="art-square onion"><span class="art-label">Harvest</span><img src="${media}guides/onions-and-shallots-botanical.webp" alt="Onions and shallots illustration"></div><div class="art-square tomato"><span class="art-label">Learn</span><img src="${media}guides/outdoor-tomatoes-botanical.webp" alt="Tomato illustration"></div>${cover}</div></section>
  <section class="wrap feature-strip" aria-label="Inside The Vegetable Guru"><div><strong>44</strong><span>VEGETABLE<br>GROWING GUIDES</span></div><div><strong>14</strong><span>ILLUSTRATED<br>TROUBLES GUIDES</span></div><div><strong>01</strong><span>PRACTICAL COMPANION<br>FOR YOUR PLOT</span></div></section>
  <section class="wrap section" id="guides"><div class="section-head"><div><div class="eyebrow">The free growing collection</div><h2>Pick a crop.<br>Get growing.</h2></div><a class="text-link" href="https://hackriculture.com/growing/" target="_blank" rel="noopener">Browse all growing guides ↗</a></div>${guideCards()}</section>
  <section class="book-lab section" id="book"><div class="wrap book-lab-grid"><div><div class="eyebrow">A closer look at the book</div><h2>Useful on the page.<br>Useful on the plot.</h2><p id="sample-description">See the growing calendar, planting advice and practical details brought together in a two-page crop guide.</p><div class="sample-tabs" aria-label="Choose a book sample"><button data-tab="crop" aria-pressed="true">Grow a crop</button><button data-tab="planning" aria-pressed="false">Plan the plot</button></div><button class="button" id="current-sample" data-sample="crop">Read these pages <span aria-hidden="true">↗</span></button></div><div id="sample-slot">${sampleButton()}<div class="sample-meta"><span>BEETROOT / PAGES 12–13</span><span>First-proof preview</span></div></div></div></section>
  <section class="wrap section" id="videos"><div class="section-head"><div><div class="eyebrow">Watch. Try. Learn.</div><h2>The garden is<br>our classroom.</h2></div><a class="text-link" href="https://www.youtube.com/@hackriculture" target="_blank" rel="noopener">Hackriculture on YouTube ↗</a></div>${videoCards()}</section>
  <section class="wrap section section-rule" id="about"><div class="about-row">${authorPhoto}${aboutCopy}</div></section>
  ${signup}</main>${footer}`}

function newspaper(){
  const featuredGuides=[...guides,
    {name:'Onions & shallots',slug:'onions-and-shallots',image:'onions-and-shallots-botanical.webp',label:'BULBS'},
    {name:'Potatoes',slug:'potatoes',image:'potatoes-botanical.webp',label:'TUBERS'}
  ];
  return `<a class="skip" href="#main">Skip to content</a>
  <div class="news-utility"><div class="wrap"><span>Practical growing & a little more self-sufficiency</span><a href="https://www.youtube.com/@hackriculture" target="_blank" rel="noopener">From the Hackriculture YouTube channel ↗</a></div></div>
  <header class="wrap header news-header">
    <div class="news-masthead">${brand}<span class="news-tagline">FROM THE GARDEN • FOR THE GARDENER</span></div>
    <div class="news-header-note"><strong>Good things start in the garden.</strong><span>Ideas, experience and a new book from John Lennon.</span></div>
    <button class="mobile-menu" aria-expanded="false" aria-controls="main-nav">Menu +</button>
    <nav class="nav" id="main-nav" aria-label="Main navigation"><a href="#main" class="news-home">Home</a><a href="#book">The Vegetable Guru</a><a href="#guides">Growing guides</a><a href="#videos">From YouTube</a><a href="#about">About John</a><a class="nav-cta" href="#launch">Join the book launch list <span aria-hidden="true">↗</span></a></nav>
  </header>
  <main class="wrap news-main" id="main">
    <div class="news-edition"><span><b>THE GARDEN EDITION</b> · Cornwall, England</span><a href="#book">Coming soon: <strong>The Vegetable Guru</strong> →</a></div>
    <div class="news-top-grid">
      <section class="news-lead" aria-labelledby="lead-title">
        <div class="news-lead-copy"><div class="eyebrow">Welcome to Hackriculture</div><h1 id="lead-title">More from<br> your garden.<br> <em>One idea at a time.</em></h1><p>What to grow, what to try and what to do when things go wrong. Practical experience from my garden and allotment, brought together here.</p><a class="button" href="#guides">Find a growing guide <span aria-hidden="true">↗</span></a></div>
        <figure><img src="${media}photos/garden-summer.jpeg" alt="John’s vegetable beds and greenhouse in Cornwall" width="640" height="409"><figcaption>A look around my garden in Cornwall</figcaption></figure>
      </section>
      <aside class="news-sidebar" aria-label="The new book and launch notification">
        <section class="news-book-card" id="book">
          <div class="news-panel-label">THE BOOKSHELF <span>Coming soon</span></div>
          <div class="news-book-body"><h2>The Vegetable Guru</h2><p class="news-subtitle">Your at-a-glance growing companion</p><div class="news-book-detail">${cover}<div><p>A practical, illustrated reference to keep close at hand.</p><ul><li><strong>44</strong> vegetable guides</li><li><strong>14</strong> Troubles guides</li><li>Growing techniques</li></ul><p class="news-byline">By John Lennon</p></div></div><button class="button" data-sample="crop">Look inside the book <span aria-hidden="true">↗</span></button></div>
        </section>
        <section class="news-launch" id="launch"><div class="eyebrow">First to hear</div><h2>Tell me when it’s ready.</h2><p>One email when the book is available to order.</p><form class="launch-form"><label for="launch-email">Your email address</label><input id="launch-email" type="email" autocomplete="off" placeholder="you@example.com" required aria-describedby="signup-terms"><button class="button" type="submit">Email me at launch <span aria-hidden="true">↗</span></button><p id="signup-terms">Launch notification only. Unsubscribe at any time. <button class="privacy-link" type="button">Privacy</button></p><div class="form-message" role="status" aria-live="polite"></div></form></section>
      </aside>
      <section class="news-channel" id="videos"><div class="news-section-heading"><h2>From the channel</h2><a href="https://www.youtube.com/@hackriculture" target="_blank" rel="noopener">All videos ↗</a></div><div class="news-video-grid">${videos.map(v=>`<article><a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener"><div class="video-image"><img src="${media}photos/${v.image}" alt="" width="640" height="360"><span class="play" aria-hidden="true">▶</span></div><div class="eyebrow">${v.type}</div><h3>${v.title}</h3></a></article>`).join('')}</div></section>
    </div>
    <section class="news-guides" id="guides"><div class="news-section-heading"><div><span class="eyebrow">The free growing library</span><h2>What’s growing on your plot?</h2></div><a href="https://hackriculture.com/growing/" target="_blank" rel="noopener">Browse all 44 guides ↗</a></div><div class="news-crop-grid">${featuredGuides.map(g=>`<a href="https://hackriculture.com/growing/${g.slug}/" target="_blank" rel="noopener"><img src="${media}guides/${g.image}" alt="" loading="lazy" width="400" height="400"><div><span>${g.label}</span><h3>${g.name} <b aria-hidden="true">↗</b></h3></div></a>`).join('')}</div></section>
    <div class="news-lower-grid">
      <section class="news-inside" id="samples"><div class="news-section-heading"><div><span class="eyebrow">Inside The Vegetable Guru</span><h2>A book to use, season after season.</h2></div></div><p class="news-section-intro">Growing calendars, illustrated crop guides and practical help for the whole plot. Open a spread and take a closer look.</p><div class="news-samples"><article>${sampleButton()}<h3>A crop at a glance</h3><p>Beetroot · Pages 12–13</p><button class="news-read-link" data-sample="crop">Read the crop guide ↗</button></article><article>${sampleButton('planning')}<h3>Think about the whole plot</h3><p>Rotation and planning · Pages 148–149</p><button class="news-read-link" data-sample="planning">Read the planning spread ↗</button></article></div><p class="news-proof-note">A preview from the first proof. Final publication details will follow the printed-copy review.</p></section>
      <section class="news-about" id="about"><div class="news-section-heading"><h2>A word from John</h2></div><div class="news-author">${authorPhoto}<div class="news-author-name"><strong>John Lennon</strong><span>Gardener, author<br>& curious experimenter</span></div></div><h3>There’s always something<br>new to learn.</h3><p>I’m John, the gardener behind Hackriculture. I share the useful things I’ve learnt from my garden and allotment in Cornwall, including the things that don’t quite go to plan.</p><p>The Vegetable Guru brings that practical approach to the page: a companion to turn to as each job comes along.</p><a class="news-read-link" href="https://www.youtube.com/watch?v=EgWiQnMn9qM" target="_blank" rel="noopener">Meet me on YouTube ↗</a></section>
    </div>
    <div class="news-closing"><div><strong>The Vegetable Guru is on its way.</strong><span>Be first to hear when you can order your copy.</span></div><a class="button" href="#launch">Join the launch list ↗</a></div>
  </main><footer class="wrap news-footer"><span><strong>hackriculture</strong> · Practical growing from Cornwall.</span><div><a href="#guides">Growing guides</a><a href="https://www.youtube.com/@hackriculture" target="_blank" rel="noopener">YouTube ↗</a><span>© 2026 Hackriculture</span></div></footer><div class="preview-note">Local design preview · Book images from the first proof · Email form demonstrates the layout; no details are submitted or saved</div>`;
}

const content = launchVariants.includes(design)
  ? createLaunchVariation({tone:design,brand,cover,sampleButton,authorPhoto,media})
  : ({editorial,garden,companion,newspaper}[design])();
document.getElementById('site').innerHTML = content+`<dialog class="sample-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Close preview">×</button><h2 id="dialog-title"></h2><p id="dialog-description"></p><div class="dialog-pages"></div></dialog>`;

const dialog = document.querySelector('.sample-dialog');
function openDialog(){
  if(parent!==window){
    const frame=window.frameElement;
    const visibleTop=Math.max(0,-frame.getBoundingClientRect().top);
    dialog.style.marginTop=(visibleTop+25)+'px';
    dialog.style.maxHeight=Math.max(260,parent.innerHeight-50)+'px';
  }
  dialog.showModal();
}
function showSample(type){
  const crop=type==='crop';
  const base=crop?'beetroot':'rotation';
  document.getElementById('dialog-title').textContent=crop?'Beetroot · pages 12–13':'Rotation and planning · pages 148–149';
  document.getElementById('dialog-description').textContent='First-proof preview. Open either page at full size to read the detail. The final sample selection will follow John’s review of the printed copy.';
  document.querySelector('.dialog-pages').innerHTML=['left','right'].map((side,index)=>`<figure><a href="assets/${base}-${side}.jpg" target="_blank" rel="noopener"><img src="assets/${base}-${side}.jpg" alt="${crop?'Beetroot page '+(12+index):'Rotation and planning page '+(148+index)}"><figcaption style="font:12px/1.5 Arial,sans-serif;padding:10px 0;text-decoration:underline">Open page ${crop?12+index:148+index} at full size ↗</figcaption></a></figure>`).join('');
  openDialog();
}
document.addEventListener('click',event=>{
  const sample=event.target.closest('[data-sample]');
  if(sample){showSample(sample.dataset.sample);return}
  const tab=event.target.closest('[data-tab]');
  if(tab){
    const crop=tab.dataset.tab==='crop';
    document.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b===tab)));
    document.getElementById('sample-description').textContent=crop?'See the growing calendar, planting advice and practical details brought together in a two-page crop guide.':'Explore the rotation and planning spread, with practical ways to organise crops and make use of a small plot.';
    document.getElementById('current-sample').dataset.sample=tab.dataset.tab;
    document.getElementById('sample-slot').innerHTML=sampleButton(tab.dataset.tab)+`<div class="sample-meta"><span>${crop?'BEETROOT / PAGES 12–13':'ROTATION / PAGES 148–149'}</span><span>First-proof preview</span></div>`;
  }
});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
document.querySelector('.privacy-link').addEventListener('click',()=>{
  document.getElementById('dialog-title').textContent='Email sign-up in this preview';
  document.getElementById('dialog-description').textContent='This is a local design demonstration. Nothing entered in the form is submitted or stored. The published version will identify the chosen email provider, explain how the launch list is used and provide an unsubscribe option.';
  document.querySelector('.dialog-pages').replaceChildren();
  openDialog();
});
document.querySelector('.mobile-menu').addEventListener('click',event=>{
  const expanded=event.currentTarget.getAttribute('aria-expanded')==='true';
  event.currentTarget.setAttribute('aria-expanded',String(!expanded));
  event.currentTarget.textContent=expanded?'Menu +':'Close −';
  document.querySelector('.header').classList.toggle('menu-open',!expanded);
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{
  document.querySelector('.header').classList.remove('menu-open');
  const button=document.querySelector('.mobile-menu');button.setAttribute('aria-expanded','false');button.textContent='Menu +';
}));
document.querySelector('.launch-form').addEventListener('submit',event=>{
  event.preventDefault();
  document.querySelector('.form-message').textContent='Preview only — no email address was submitted or saved.';
  document.getElementById('launch-email').value='';
});
if(parent!==window){
  const reportHeight=()=>parent.postMessage({type:'preview-height',height:document.documentElement.scrollHeight},location.origin);
  new ResizeObserver(reportHeight).observe(document.getElementById('site'));
  window.addEventListener('load',reportHeight);
}
