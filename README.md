
# Easy Copy and Paste Chrome Extention 

This is a Chrome extention for storing resuable text strings, anything that you find yourself pasting often, and copying them to your clipboard 

# Insatall 

1. Clone Repo
2. `npm install`
3. `npm run build`
4. Go to `chrome://extensions`, enable **Developer mode**
5. Click **Load unpacked** and select the `dist` folder

# Usage 

Open the popup from the toolbar icon (or hotkey Ctrl+Shift+X).

- Edit Mode: add categories, then add labeled text strings underneath 
- Copy Mode: Tab between categories ('w'/'s') to move withing one, press Enter to copy
- Text strings persist locally via chrome.storage 

# Roadmap

- Side panel version so the UI stays open while you paste into a page
- User-customizable keyboard controls