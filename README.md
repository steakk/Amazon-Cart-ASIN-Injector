# 🛒 Amazon Cart ASIN Injector — Chrome Extension

A lightweight Chrome extension that displays the **ASIN** (Amazon Standard Identification Number) for each item directly inside the **price block** of your Amazon Shopping Cart.

This is especially useful if your company requires the ASIN to be included on **purchase orders**.

---

## ✨ Features

- 🔒 Works **only** on Amazon cart pages (`https://www.amazon.*/gp/cart/view.html*`)
- 🔍 Scrapes the product URL of each cart item to extract the ASIN
- 🧾 Injects the ASIN visibly into each item’s **price block** for quick reference
- 🧠 Includes a summary text area that can be copied directly into Excel or Google Sheets

---

## 🚀 Installation

You can install the extension in one of two ways:

### 📦 Option 1: Using the `.crx` File (Easier)

1. [Download the `.crx` file from the [Releases](https://github.com/steakk/Amazon-Cart-ASIN-Injector/releases)].
2. Open Chrome and go to `chrome://extensions/`
3. **Drag and drop** the `.crx` file into the page
4. Click **"Add Extension"** when prompted
5. ✅ You're done!

> ℹ️ You may need to enable Developer Mode to install manually signed extensions

---

### 🛠️ Option 2: Load as Unpacked Extension (For Developers)

1. Clone or download this repository to your local machine.
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer Mode** (top-right toggle)
4. Click **Load unpacked**
5. Select the folder containing the extension files
6. ✅ Done!

---

## 💡 Usage Notes

- Runs only on Amazon's cart page — other pages are unaffected
- If Amazon updates their cart page structure, the extension may need adjustments
- No personal data is collected or transmitted — this runs 100% locally in your browser

---

## 🔧 Development

- Built using **Manifest V3** for Chrome Extensions
- Uses a **content script** to:
  - Scrape product links
  - Extract ASINs
  - Inject a readable ASIN tag into the DOM
  - Create a tab-delimited summary for copy-paste use
- Requires only minimal permissions (`scripting` and access to Amazon cart pages)

---

## ⚖️ License

This project is licensed under the [Unlicense](https://unlicense.org/).

> This is free and unencumbered software released into the public domain.  
>  
> That means you can:  
> • Steal it 🏴‍☠️  
> • Fork it 🍴  
> • Break it 🔨  
> • Pretend you wrote it 🧠  
> • Use it to automate your dog’s Amazon cart 🐶  
>  
> No permissions needed. No attribution required. No lawsuits expected (unless you’re doing something *really* dumb).  
>  
> Basically, if you can think of a use for this, **go nuts**. Just don’t email me if your toaster starts ordering ASINs off Amazon.

---

## 💬 Feedback

Got an idea, a bug, or want to say thanks?  
Open an [issue](https://github.com/steakk/Amazon-Cart-ASIN-Injector/issues) or submit a [pull request](https://github.com/steakk/Amazon-Cart-ASIN-Injector/pulls).

---

🛍️ *Happy shopping — and may your purchase orders be ASIN-perfect!*
