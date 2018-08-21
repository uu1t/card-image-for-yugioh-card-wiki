# Card Image for Yu-Gi-Oh! Card Wiki

[![Build Status](https://travis-ci.org/kojole/card-image-for-yugioh-card-wiki.svg?branch=master)](https://travis-ci.org/kojole/card-image-for-yugioh-card-wiki)

> :flower_playing_cards: Chrome Extension to show card images on [Yu-Gi-Oh! Card Wiki](http://yugioh-wiki.net/)

![Screen Shot](./images/screenshot.png)

## Installation

Chrome Web Store: [https://chrome.google.com/webstore/detail/npideaikogpbodfhcdcaabjnccclkfcb](https://chrome.google.com/webstore/detail/npideaikogpbodfhcdcaabjnccclkfcb)

Chrome Version 55 or higher is required.

## Features

When you visit card pages on [Yu-Gi-Oh! Card Wiki](http://yugioh-wiki.net/), search [Yu-Gi-Oh! Wikia!](http://yugioh.wikia.com/wiki/Yu-Gi-Oh!_Wikia) for card images, and show them if found.
When searching, TCG card images may be prior to OCG ones.

## Development

### Requirements

- `node`
- `npm`

### Build instructions for development

```
npm install
npm run build
```

The extension is transpiled into `dist` directory.

### Build instructions for production

```
npm install
npm run zip
```

`firefox-${version}.zip` and `chrome-${version}.zip` are created in the project root directory.

## License

[MIT](https://choosealicense.com/licenses/mit/)
