# FISH HWB site refresh package

This package adds:

- Startup parody ad: **Hot Single Fish in Your Area**
- Clicking the parody ad opens `/bait/`
- `/bait/` contains a full-screen wall of 72 deliberately fake fish ads
- Large close `×` plus Escape support
- Startup ad appears once per browser tab/session instead of repeatedly while browsing
- Major visual upgrade for clownfish, blue tangs, jellyfish, lanternfish and the abyss anglerfish
- Existing depth, swimming, reduced-motion and Konami swarm behaviour remains intact
- `ADSENSE.md` explains the safe way to add real Google AdSense later

## Apply to the repository

Open PowerShell in this extracted update folder and run:

```powershell
.\apply-update.ps1 -RepoPath "C:\path\to\fishhwb.github.io"
```

The installer copies the new files into the matching repository folders and appends one small idempotent loader to `assets/extras.js`.

After applying, test `index.html` through a local web server rather than opening it with `file://`, then commit and push the changed files.
