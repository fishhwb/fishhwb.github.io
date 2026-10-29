// Adds a provenance notice to glTF asset.extras without altering geometry.
const encoder=new TextEncoder(),decoder=new TextDecoder();
export function markGLB(buffer){
 const bytes=new Uint8Array(buffer),view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
 if(bytes.length<20||decoder.decode(bytes.subarray(0,4))!=='glTF'||view.getUint32(4,true)!==2||view.getUint32(8,true)!==bytes.length)throw Error('Invalid GLB v2');
 const length=view.getUint32(12,true),type=view.getUint32(16,true);
 if(type!==0x4e4f534a||20+length>bytes.length)throw Error('Missing GLB JSON chunk');
 const json=JSON.parse(decoder.decode(bytes.subarray(20,20+length)).replace(/\u0000+$/g,'').trim());
 json.asset=json.asset||{version:'2.0'};
 json.asset.extras={...(json.asset.extras||{}),hwbProvenance:{owner:'FISH HWB',rights:'All rights reserved',usage:'Interactive viewing only. No extraction, redistribution or resale.',format:'HWB1'}};
 const raw=encoder.encode(JSON.stringify(json)),pad=(4-raw.length%4)%4,tail=bytes.subarray(20+length);
 const out=new Uint8Array(20+raw.length+pad+tail.length),header=new DataView(out.buffer);
 out.set(bytes.subarray(0,12));header.setUint32(8,out.length,true);
 header.setUint32(12,raw.length+pad,true);header.setUint32(16,0x4e4f534a,true);
 out.set(raw,20);out.fill(0x20,20+raw.length,20+raw.length+pad);out.set(tail,20+raw.length+pad);
 return out.buffer;
}
