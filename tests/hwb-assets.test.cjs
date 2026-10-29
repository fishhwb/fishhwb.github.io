// Fail builds that would publish unencrypted 3D source assets.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),folder=path.join(root,'assets','3d');
const forbidden=new Set(['.glb','.gltf','.fbx','.obj','.stl','.blend','.dae','.usd','.usdz','.ply','.3ds']);
let count=0;
function walk(dir){if(!fs.existsSync(dir))return;for(const item of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,item.name);if(item.isDirectory())walk(full);else if(item.isFile()){assert(!forbidden.has(path.extname(item.name).toLowerCase()),'Public unencrypted model: '+path.relative(root,full));if(item.name.endsWith('.hwb')){count++;const data=fs.readFileSync(full);assert(data.length>32&&data.subarray(0,4).toString()==='HWB1','Invalid HWB: '+full);assert(fs.existsSync(full+'-key.txt'),'Missing viewer key: '+full);}}}}
walk(folder);
const gallery=JSON.parse(fs.readFileSync(path.join(root,'assets','gallery.json'),'utf8'));
for(const item of gallery.items||[]){assert(item.type!=='model'||(item.ext==='hwb'&&item.path.endsWith('.hwb')&&item.key===item.path+'-key.txt'),'Gallery contains non-HWB model');assert(item.type!=='source','Gallery exposes source download');}
console.log('HWB publication checks passed ('+count+' models).');
