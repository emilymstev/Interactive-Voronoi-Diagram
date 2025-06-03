# Interactive-Voronoi-Diagram

## Project Description
This project generates iterative Voronoi diagrams using p5.js. Each pixel is colored based on its nearest site using different distance metrics. The diagram responds to user input via mouse and keyboard. It uses 3 types of distance metrics (Euclidean, Taxicab, and Chebyshev), supports 2 color modes (region-based and gradient-based) and is fully interactive, allowing users to add, remove, and nudge points and toggle distance and coloring modes.

## Features
* Distance modes - Press 0, 1, or 2 to switch between Euclidean, Taxicab, and Chebyshev distance
* Add Sites - Click anywhere to add a new site
* Remove Sites - Shift+Click to remove the nearest site (if more than one)
* Nudge Sites - Press n to randomly shift each site slightly
* Coloring Modes - Press c to toggle between region colors and distance based gradients
* Dynamic Colors - Region colors may vary based on vertical placement

## Files
* index.html - the main HTML file to load the sketch
* sketch.js - the main sketch with all interaction and rendering logic
* p5.js - p5.js library
* p5.sound.min.js - unused in this project but included for p5 compatability
* style.js - styling logic

## Keyboard & Mouse Controls
* 0, 1, 2 - switch distance metric (Euclidean, Taxicab, and Chebyshev, respectively)
* Click - add site
* Shift + Click - remove the nearest site
* n - nudge all sites randomly
* c - toggle color modes

## How to Run
1) Web Browser
Maks sure all 5 files are in the same folder, and open the index.html to run the sketch in the browser.

2) p5.js Web edithr
Create a new sketch on editor.p5js.org. Paste the contents of sketch.js into the editor, and run the sketch.
