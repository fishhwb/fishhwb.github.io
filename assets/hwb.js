// HWB v1: authenticated, encrypted GLB container. Keys are never stored on the site.
const enc=new TextEncoder(),dec=new TextDecoder();
const magic=enc.encode("HWB1");
const b64=a=>btoa(String.fromCharCode(...a));
const un64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
export async function encryptGLB(buffer){
 const bytes=new Uint8Array(buffer);
 if(dec.decode(bytes.slice(0,4))!=="glTF")throw Error("A binary GLB file is required");
 const keyBytes=crypto.getRandomValues(new Uint8Array(32));
 const iv=crypto.getRandomValues(new Uint8Array(12));
 const key=await crypto.subtle.importKey("raw",keyBytes,"AES-GCM",false,["encrypt"]);
 const encrypted=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv,additionalData:magic},key,bytes));
 const out=new Uint8Array(4+12+encrypted.length);out.set(magic);out.set(iv,4);out.set(encrypted,16);
 return {data:new Blob([out],{type:"application/octet-stream"}),key:b64(keyBytes)};
}
export async function decryptHWB(buffer,keyText){
 const bytes=new Uint8Array(buffer);
 if(bytes.length<33||dec.decode(bytes.slice(0,4))!=="HWB1")throw Error("Invalid HWB container");
 const raw=un64(keyText.trim());if(raw.length!==32)throw Error("Invalid HWB key");
 const key=await crypto.subtle.importKey("raw",raw,"AES-GCM",false,["decrypt"]);
 const result=await crypto.subtle.decrypt({name:"AES-GCM",iv:bytes.slice(4,16),additionalData:magic},key,bytes.slice(16));
 if(dec.decode(new Uint8Array(result).slice(0,4))!=="glTF")throw Error("Decrypted payload is not GLB");
 return result;
}
