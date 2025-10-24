# 🚀 Deployment Guide for Soccer Manager Mini-Sim

This document outlines the steps required to deploy the **Soccer Manager Mini-Sim** project. Since the project is a purely client-side application (HTML, CSS, and JavaScript) contained within a single file, deployment is quick and requires only a static file host.

## 1. Project Requirements

The project has **no server-side dependencies** (no Node.js, Python, PHP, etc.) and no external database.

### Required Files:

1.  **`index.html`** (Contains all HTML, CSS, and JavaScript)
2.  **Audio Files** (E.g., `Heat Waves.mp3`, `The Nights.mp3`, etc.)

**Important:** The audio files referenced in the JavaScript (`*.mp3`) must be placed in the **same directory** as the `index.html` file for the audio player to function correctly.

***

## 2. Deployment Method

The simplest and most common method for deploying this static project is using **GitHub Pages**.

### Step 2.1: Prepare Your Repository

1.  Ensure all your current code (the combined HTML/JS file) is saved as `index.html` in the root of your GitHub repository.
2.  Commit and push all necessary audio files to the same root directory.

### Step 2.2: Enable GitHub Pages

1.  Navigate to your repository on GitHub (e.g., `(https://mkp-winner.github.io/Soccer-Manager-Mini-Simulator)`).
2.  Click the **Settings** tab.
3.  In the sidebar, click **Pages**.
4.  Under the **Source** section:
    * Change the source from **None** (or master/main) to the **`main`** branch (or whichever branch holds your final code).
    * Ensure the directory is set to **`/ (root)`**.
5.  Click **Save**.

### Step 2.3: Access the Live Site

1.  GitHub will take a minute or two to build and publish the site.
2.  After the process is complete, the **Pages** section of your settings will display a link to your live website (e.g., `(https://mkp-winner.github.io/Soccer-Manager-Mini-Simulator)`).

***

## 3. Local Testing (Optional)

You can run this project locally without any special software:

1.  Download or clone the entire repository to your local machine.
2.  Locate the `index.html` file in your file explorer.
3.  **Double-click** the `index.html` file.

This will open the project directly in your default web browser, allowing you to test all features locally before deployment.

***

## 4. Troubleshooting ⚠️

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| **Music doesn't play.** | Browser security (Autoplay policy). | Manually click the **"▶️ Start Background Music"** button after the page loads, or grant permission to the site. |
| **Music selector is empty.** | `index.html` can't find the audio files. | Ensure your `.mp3` files are named exactly as they appear in the JavaScript `anthems` list and are in the same directory as `index.html`. |
| **Help button link is wrong.** | Placeholder URL was not replaced. | Update the `helpVideoURL` constant in the JavaScript to your actual video link: `const helpVideoURL = "YOUR_ACTUAL_VIDEO_LINK";` |
| **Page shows 404 on GitHub Pages.** | Incorrect source branch/directory. | Go back to **Settings > Pages** and ensure the source branch is `main` and the directory is `/ (root)`. |
