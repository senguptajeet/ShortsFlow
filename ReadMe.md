# 🌊 ShortsFlow - YouTube Auto Scroll

> **Watch Seamlessly. Scroll Automatically.** 
> A lightweight, Manifest V3 Chrome Extension that intelligently detects when a YouTube Short finishes playing and automatically scrolls to the next one.

---

## ✨ Features

- **🧠 Smart Completion Detection:** Bypasses YouTube's native infinite loop by monitoring internal video timeframes rather than relying on broken HTML5 `ended` events.
- **⏱️ Customizable Delay:** Choose your preferred breathing room. Set a delay between 0 and 5 seconds before the next Short loads.
- **🎛️ Master Toggle:** Easily disable auto-scrolling straight from the popup when you want to stop and read comments.
- **⚡ Memory Efficient:** Dynamically attaches and detaches event listeners using a `MutationObserver` to ensure zero memory leaks or browser slowdowns.
- **🌙 Modern UI:** A clean, responsive, dark-themed control panel built with pure CSS.

---

## 🛠️ Installation (Developer Mode)

Since this extension is in active development, you can install it directly from the source code.

1. **Download the source code:**
   - Clone this repository: `git clone https://github.com/senguptajeet/ShortsFlow.git`
   - *Or* click the green **Code** button at the top of this page and select **Download ZIP**, then extract it.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Toggle on **Developer mode** in the top right corner.
4. Click the **Load unpacked** button in the top left.
5. Select the `ShortsFlow` folder you downloaded.
6. 📌 **Pin the extension** to your browser toolbar for quick access!

---

## 💻 Usage

1. Navigate to [YouTube Shorts](https://www.youtube.com/shorts).
2. Click the **ShortsFlow** icon in your Chrome toolbar.
3. Ensure the toggle is turned **ON**.
4. Adjust the **Scroll Delay** slider to your preference.
5. Take your hands off the keyboard and enjoy seamless viewing!

---

## 🏗️ Technical Architecture

ShortsFlow is built strictly with vanilla web technologies, avoiding unnecessary frameworks to keep the extension ultra-fast and secure.

- **Standard:** Chrome Extension Manifest V3
- **Languages:** HTML5, CSS3, Vanilla JavaScript
- **Permissions:** `storage` (Used exclusively to save your delay and toggle preferences locally on your machine).

---

## 👨‍💻 Author

**Jeet Sengupta**
- GitHub: [@senguptajeet](https://github.com/senguptajeet)

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).