/* 
Emily Stevenson
CSE 276
Voronoi Diagrams
*/

// global variables
let pts = [];
// array to store random rgb ranges for various vertical bands...looks good when numPoints is high :)
let sunriseQuadrants = [];
let colors = [];
let numPoints = 10;
let distFunctions = [];
// distance calculation method
let k = 0;
// coloring method
let c = 1;

function setup() {
  createCanvas(400, 400);
  // add distance functions to the array
  distFunctions.push(euclid, taxi, chess);
  // set up bands of color ranges
  setSunriseQuadrants();
  // add the points and sites
  addRandomPoints(numPoints);
  addSites(k);
  drawPoints();
}

// Add n randomly generated points and their colors to the global arrays
function addRandomPoints(n) {
  for (let i = 0; i < n; i++) {
    let pt = createVector(random(width), random(height));
    pts.push(pt);
    generateRandomColors(pt.y);
  }
}

// Display the points on the canvas
function drawPoints() {
  stroke(0);
  strokeWeight(8);

  for (let p of pts) {
    point(p);
  }
}

// Color pixels according to their distance from each point
function addSites(k) {
  loadPixels();
  // Max distance calculation for gradient coloring
  let maxDist = max(width, height);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let distanceToPoint = Infinity;
      // Variable for saving the index in both the points and color array of the point with the closest distance to the pixel
      let colorIndex = -1;
      // Check the distance from each pixel to each point, and save the index of the point with the lowest distance
      for (let i = 0; i < pts.length; i++) {
        // Calculate distance using the appropriate distance function
        let distance = distFunctions[k](pts[i].x, pts[i].y, x, y);
        if (distance < distanceToPoint) {
          distanceToPoint = distance;
          colorIndex = i;
        }
      }

      // Color based on coloring method
      if (c === 1) {
        set(x, y, colors[colorIndex]);
      } else {
        // Map values to red and green components based on their distance to a point
        let r = map(distanceToPoint, 0, maxDist, 255, 250);
        let g = map(distanceToPoint, 0, maxDist, 150, 0);

        set(x, y, color(r, g, 80));
      }
    }
  }
  updatePixels();
}

// Calculate euclidean distance
function euclid(x1, y1, x2, y2) {
  return dist(x1, y1, x2, y2);
}

// Caculate taxicab distance
function taxi(x1, y1, x2, y2) {
  return abs(x2 - x1) + abs(y2 - y1);
}

// Calculate chess distance
function chess(x1, y1, x2, y2) {
  return max(abs(x2 - x1), abs(y2 - y1));
}

// Generate colors in random ranges based on the height of the point on the canvas
function generateRandomColors(y) {
  
  // Map the height of the point to one of the 4 quadrants
  let quadrantSpot = map(y, 0, height, 0, 4);
  // Round down to the nearest quadrant
  // Note: We multiply the quadrant level by 6 because each quadrant's rgb range values start every 6th spot in the array
  let l = floor(quadrantSpot) * 6;

  // Based on which quadrant the height fell into, grab the color upper and lower bounds for each color in the designated quadrant
  let rl = sunriseQuadrants[l]; // Red lower bound
  let ru = sunriseQuadrants[l + 1]; // Red upper bound
  let gl = sunriseQuadrants[l + 2]; // Green lower bound
  let gu = sunriseQuadrants[l + 3]; // Green upper bound
  let bl = sunriseQuadrants[l + 4]; // Blue lower bound
  let bu = sunriseQuadrants[l + 5]; // Blue upper bound

  // Add the randomly-generated color to the color array
  let col = color(random(rl, ru), random(gl, gu), random(bl, bu));
  colors.push(col);
}

// Randomly adjust each point's x and y value anywhere from -10 to 10
function nudge() {
  // Iterate throught the point array and generate a random adjustment for x and y
  for (let i = 0; i < pts.length; i++) {
    randomX = random(-10, 10);
    randomY = random(-10, 10);
    
    // check that the new value stays within the canvas size, and if not, reverse the adjustment so that it goes the other direction
    if (pts[i].x + randomX > width || pts[i].x + randomX < 0) {
      randomX *= -1;
    }
    if (pts[i].y + randomY > height || pts[i].y + randomY < 0) {
      randomY *= -1;
    }

    // Adjust the values
    pts[i].x += randomX;
    pts[i].y += randomY;
  }
}

// Change global variables on key press and regenerate the sites and points based on the adjusted values
function keyPressed() {
  if (key === "0") {
    k = 0;
  } else if (key === "1") {
    k = 1;
  } else if (key === "2") {
    k = 2;
  } else if (key === "c") {
    c *= -1;
  } else if (key === "n") {
    nudge();
  }
  addSites(k);
  drawPoints();
}


// Add and delete sites
function mousePressed() {
  // Delete the point closest to the click location when if the click happens when the shift key is being held
  if (keyIsDown(SHIFT)) {
    if (pts.length > 1) {
      let distanceFromMouse = Infinity;
      let colorIndex = -1;
      for (let i = 0; i < pts.length; i++) {
        let distance = distFunctions[k](pts[i].x, pts[i].y, mouseX, mouseY);
        if (distance < distanceFromMouse) {
          distanceFromMouse = distance;
          colorIndex = i;
        }
      }
      // Remove the point and the color at the saved lowest distance index
      pts.splice(colorIndex, 1);
      colors.splice(colorIndex, 1);
    }
  } else {
    // Add points where the mouse clicks when the shift key was not being held
    pts.push(createVector(mouseX, mouseY));
    generateRandomColors(mouseY);
  }
  // redraw the sites and points based on changes
  addSites(k);
  drawPoints();
}

// Add numbers to the sunriseQuadrants array to represent random ranges for each color block
function setSunriseQuadrants() {
  // Note: first value is red lower range, second value is red upper range, third value is green lower range, fourth value is green upper range, fifth value is blue lower range, sixth value is blue upper range

  // burnt orange to red
  sunriseQuadrants.push(200, 255, 60, 130, 20, 50);

  // bright orange to yellow
  sunriseQuadrants.push(255, 255, 170, 210, 40, 90);

  // golden yellow to soft orange
  sunriseQuadrants.push(255, 255, 200, 220, 80, 130);

  // soft peach to warm pink
  sunriseQuadrants.push(255, 255, 180, 220, 180, 210);
}
