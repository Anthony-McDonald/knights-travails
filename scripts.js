function isValidMove(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function bfsKnight(startingCoords, endingCoords) {
  // list of potential moves formatted into two arrays
  const dx = [1, 1, -1, -1, 2, 2, -2, -2];
  const dy = [2, -2, 2, -2, 1, -1, 1, -1];

  // queue defined as the starting coordinates and 0 ( 0 being the level )
  const queue = [[startingCoords[0], startingCoords[1], 0]];
  // create array visited
  const visited = new Array(8).fill(0).map(() => new Array(8).fill(false));
  //path defined as empty dictionary
  const path = {};
  // set visited to true at the starting coordinates
  visited[startingCoords[0]][startingCoords[1]] = true;

  // while the queue isn't empty
  while (queue.length > 0) {
    // x, y, level is the first thing off the queue
    const [x, y, level] = queue.shift();

    // if x and y = ending coordinates, ie if we reach the end
    if (x === endingCoords[0] && y === endingCoords[1]) {
      // set current x and current y to the x and y from queue.shift()
      let currentX = x;
      let currentY = y;
      // set the traversal path as x and y also
      const traversalPath = [[x, y]];
      // while currentX is not the same as the starting coordinates or current y
      // is not the same as the starting coordinates
      while (currentX !== startingCoords[0] || currentY !== startingCoords[1]) {
        // previous x and y values in a string given to prevx and prevy
        const [prevX, prevY] = path[`${currentX},${currentY}`];
        // add the stringed values onto traversalpath
        traversalPath.unshift([prevX, prevY]);
        // go back one more time
        currentX = prevX;
        currentY = prevY;
      }
      // finish off by returning the steps and the traversal path
      return { steps: level, path: traversalPath };
    }

    // run a for loop from 0-8, ie the length of the chess board
    for (let i = 0; i < 8; i++) {
      // set newX and new Y to their values plus the iteration of the list
      const newX = x + dx[i];
      const newY = y + dy[i];

      // if the move requested is a valid move
      if (isValidMove(newX, newY) && !visited[newX][newY]) {
        // set the node to visited
        visited[newX][newY] = true;
        // push the node onto the queue to be another node to look at
        queue.push([newX, newY, level + 1]);
        // add the new values of x and y selected to the path
        path[`${newX},${newY}`] = [x, y];
      }
    }
  }

  return { steps: -1, path: [] }; // Indicates no path found
}

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
