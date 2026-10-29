# Encrypted 3D gallery

Only encrypted .hwb models and image thumbnails belong in this public folder.

Convert .glb models using the unlinked /hwb-tools/ converter. It downloads two files: model.hwb and model.hwb-key.txt. Put both beside each other in assets/3d/ to enable passwordless viewing. Never upload original GLB, GLTF, FBX, OBJ, STL, BLEND or other model sources to this public repository.

A matching image with the same stem can be used as a thumbnail. Images (.png, .jpg, .jpeg, .webp, .avif) are allowed.

The key TXT file is publicly retrievable to make automatic viewing possible. It must not be treated as a secret. The encrypted format blocks direct import but cannot prevent extraction from a browser that displays the model.

Run `node tests/hwb-assets.test.cjs` before publishing. GitHub Actions checks that no unencrypted models or source links appear in the published gallery.
