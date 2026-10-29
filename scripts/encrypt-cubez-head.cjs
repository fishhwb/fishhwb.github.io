// One-time migration: preserve the original GLB payload byte-for-byte inside HWB1.
const fs=require('node:fs'),crypto=require('node:crypto');
const source='assets/cubez-head.glb',target='assets/cubez-head.hwb';
if(!fs.existsSync(source))throw Error('Source GLB missing');
const raw=fs.readFileSync(source);
if(raw.subarray(0,4).toString()!=='glTF')throw Error('Not a GLB');
const key=crypto.randomBytes(32),iv=crypto.randomBytes(12),cipher=crypto.createCipheriv('aes-256-gcm',key,iv);
cipher.setAAD(Buffer.from('HWB1'));
const encrypted=Buffer.concat([cipher.update(raw),cipher.final(),cipher.getAuthTag()]);
fs.writeFileSync(target,Buffer.concat([Buffer.from('HWB1'),iv,encrypted]));
fs.writeFileSync(target+'-key.txt','HWB v1 key for cubez-head.hwb\n'+key.toString('base64')+'\n');
fs.unlinkSync(source);
console.log('CubeZ head encrypted and source removed from checkout');
