// Optional, dismissible notice. DevTools detection is heuristic, not security.
(function(){
  'use strict';
  const threshold=170;
  let dismissed=false,visible=false;
  const overlay=document.createElement('section');
  overlay.id='hwb-inspection-notice';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-label','Developer tools notice');
  overlay.hidden=true;
  overlay.style.cssText='position:fixed;inset:0;z-index:2147483646;background:#0b1820;color:#e9f6f5;display:none;place-items:center;padding:24px;text-align:center;font:16px system-ui';
  const inner=document.createElement('div');
  inner.style.cssText='max-width:520px';
  const title=document.createElement('h2');title.textContent='Developer mode is not for viewing these models';
  const message=document.createElement('p');message.textContent='These 3D assets are for viewing only. Extraction, redistribution and resale are not authorised. Developer tools detection is not a security feature.';
  const button=document.createElement('button');button.textContent='Return to the website';
  button.style.cssText='padding:12px 20px;border:0;border-radius:8px;cursor:pointer';
  button.addEventListener('click',()=>{dismissed=true;overlay.hidden=true;overlay.style.display='none';});
  inner.append(title,message,button);overlay.append(inner);
  function update(){
    if(dismissed)return;
    const gallery=document.getElementById('models');
    const onGallery=gallery&&gallery.getBoundingClientRect().top<innerHeight&&gallery.getBoundingClientRect().bottom>0;
    const likelyOpen=(outerWidth-innerWidth>threshold)||(outerHeight-innerHeight>threshold);
    const show=Boolean(onGallery&&likelyOpen);
    if(show!==visible){visible=show;overlay.hidden=!show;overlay.style.display=show?'grid':'none';}
  }
  document.addEventListener('DOMContentLoaded',()=>{document.body.append(overlay);update();});
  window.addEventListener('resize',update);
  window.addEventListener('scroll',update,{passive:true});
})();
