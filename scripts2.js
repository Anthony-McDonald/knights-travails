function isValidMove(x, y) {
  if (x > 0 && x < 8) {
    if (y > 0 && y < 8) {
      return true;
    }
  }
  return false;
}

function bfsKnight(startingCoords, endingCoords) {}

// Example usage:
const startingCoords = [0, 0];
const endingCoords = [6, 7];
const { steps, path } = bfsKnight(startingCoords, endingCoords);
if (steps !== -1) {
  console.log(
    `Shortest path from ${startingCoords} to ${endingCoords} is ${steps} steps.`
  );
  console.log(`Path: ${path.map(([x, y]) => `[${x},${y}]`).join(" -> ")}`);
} else {
  console.log(`No path found from ${startingCoords} to ${endingCoords}.`);
}
