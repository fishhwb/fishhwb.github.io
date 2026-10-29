import {encryptGLB,decryptHWB} from '../assets/hwb.js';
import {markGLB} from '../assets/hwb-provenance.js';
const source=document.querySelector('#source'),status=document.querySelector('#status');
function download(blob,name){
 const url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download=name;a.click();
 setTimeout(()=>URL.revokeObjectURL(url),30000);
}
document.querySelector('#convert').addEventListener('click',async()=>{
 try{
  const file=source.files[0];
  if(!file||!file.name.toLowerCase().endsWith('.glb'))throw Error('Select a GLB file');
  status.textContent='Encrypting locally...';
  const result=await encryptGLB(markGLB(await file.arrayBuffer()));
  await decryptHWB(await result.data.arrayBuffer(),result.key);
  const name=file.name.slice(0,-4);
  download(result.data,name+'.hwb');
  download(new Blob(['HWB v1 key for '+name+'.hwb\n'+result.key+'\n'],{type:'text/plain'}),name+'.hwb-key.txt');
  status.textContent='Encrypted and verified. Store the key TXT safely.';
 }catch(e){status.textContent=e.message;}
});