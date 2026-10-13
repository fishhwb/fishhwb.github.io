# Automatic 3D gallery

Files placed anywhere under this folder are indexed by `.github/scripts/build-site-content.mjs`.

- `.glb`, `.gltf`, `.obj`, `.stl`, `.fbx` — interactive browser preview.
- `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif` — render/gallery image.
- `.blend` — shown as a downloadable source file (browsers cannot render Blender project files directly).

A same-name image beside a model is used as its thumbnail when available. For example, `Zhyraa.glb` can use `Zhyraa.webp` or `Zhyraa.png`.

Use readable filenames: `echo-reef-shark.glb` becomes `Echo Reef Shark` on the site.
