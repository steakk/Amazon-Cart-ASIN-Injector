# Amazon Cart ASIN Injector — Chrome Extension

A lightweight Chrome extension that shows the ASIN (Amazon Standard Identification Number) for each item directly inside the price block of your Amazon Shopping Cart.

This comes in handy if the company you work for requires you to put the ASIN on your Purchase Orders.

---

## Features

- Active **only** on Amazon cart pages (`https://www.amazon.com/gp/cart/view.html*`)
- Scrapes the product URL of each cart item to extract the ASIN
- Injects the ASIN visibly into the price block for quick reference

---

## Installation (Manual)

> Chrome extensions outside the Chrome Web Store require **Developer Mode** for installation.

1. Download or clone this repository to your local machine.

2. Open Chrome and go to `chrome://extensions/`

3. Enable **Developer Mode** (toggle switch in the top-right).

4. Click **Load unpacked** and select the folder where you saved this extension.

5. Visit your Amazon Shopping Cart page to see the ASINs appear in each item’s price block.

---

## Usage Notes

- The extension runs only on Amazon's cart page URL pattern.
- If the cart page structure changes, the extension may require updates.
- No personal data is collected or transmitted by this extension.

---

## Development

- Built using Manifest V3 for Chrome extensions.
- Content script scrapes ASINs from product URLs and injects into `.sc-item-price-block`.
- Minimal permissions (`scripting` and Amazon cart host access).

---

## License

MIT License © Your Name

---

## Feedback

If you find issues or want to suggest improvements, feel free to open an issue or submit a pull request.

---

*Happy shopping!*
