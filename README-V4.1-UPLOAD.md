# OPTICAL WEATHER v4.1 upload package

This ZIP is an **overlay for the existing `MusicOfScience/visual-brain-food` repository**, whose published `main` branch is OPTICAL WEATHER v3.

It contains only files that are new or changed for the recovered v4.1 content-management pass. It deliberately does not duplicate the unchanged v3 catalogue/application files.

## Upload

1. Unzip this archive.
2. Upload the **contents** of the `optical-weather-v4.1` folder to the root of `MusicOfScience/visual-brain-food` on a new branch.
3. Allow `index.html` to replace the existing file.
4. Keep all existing v3 files (`app.js`, `styles.css`, `data-*.js`, `metadata-v2.js`, existing docs/tests).
5. Commit, preview, run tests, then open a PR.

The public behaviour remains v3 until material is added to `content/curation.js`; v4.1 changes how the collection is maintained, not the visual interface for its own sake.
