# Gmail Line Enlarger Chrome Extension

A Chrome extension that allows you to enlarge the line height of emails in Gmail for better readability.

## Features

- Adjustable line height multiplier (1.0x to 2.0x)
- Quick preset buttons (1.0x, 1.25x, 1.5x, 1.75x, 2.0)
- Real-time preview - changes apply immediately
- Settings are saved and persist across sessions
- Works with all Gmail views (inbox, reading pane, compose window)

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top right)
3. Click "Load unpacked"
4. Select the `enlargemail-extension` folder
5. The extension will be installed and ready to use!

## Usage

1. Open Gmail in your browser
2. Click the extension icon in the Chrome toolbar
3. Use the slider or preset buttons to adjust line height
4. Changes apply immediately to all Gmail emails

## File Structure

```
enlargemail-extension/
├── manifest.json          # Extension configuration
├── content.js             # Script that applies styles to Gmail pages
├── README.md              # This file
├── assets/
│   └── icons/            # Extension icons
│       ├── icon16.png    # 16x16 toolbar icon
│       ├── icon48.png    # 48x48 extension page icon
│       └── icon128.png   # 128x128 Chrome Web Store icon
└── popup/                # Popup UI files
    ├── popup.html        # Popup HTML structure
    ├── popup.css         # Popup styling
    └── popup.js          # Popup logic and controls
```

## Notes

- The extension only works on Gmail (mail.google.com)
- Settings are synced across devices if you're signed into Chrome
- Icons are located in `assets/icons/` directory

## Privacy Policy

**Gmail Line Enlarger does not collect, store, or transmit any user data.**

The extension only saves your preferred line height setting (a number between 1.0 and 2.0) locally using Chrome's built-in storage. This setting is stored on your device and may sync through Chrome's sync service if you're signed in - the extension itself does not access or control this sync.

- No personal information is collected
- No email content is accessed or read
- No user activity is tracked
- No data is sent to external servers
- The extension only modifies CSS styling for visual presentation

Your privacy is protected. If you have questions, please contact us via GitHub issues.\
