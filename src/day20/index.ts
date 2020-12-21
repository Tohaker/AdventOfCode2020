type Image = string[][];

const parseInput = (input: string[]) => {
  const result = new Map<string, Image>();
  let currentId = '0';
  let image: Image = [];

  input.forEach((line, i) => {
    if (line.includes('Tile')) {
      const matches = line.match(/\d+/);
      if (matches) currentId = matches[0];
      return;
    }

    if (line) {
      image.push(Array.from(line));
    }

    if (line === '' || i === input.length - 1) {
      result.set(currentId, image);
      image = [];
    }
  });

  return result;
};

const reverse = <T>(array: T[]) =>
  array.reduceRight((a: T[], c) => a.concat(c), []);

const arrayToString = (array: string[]) => array.reduce((a, c) => a + c, '');

const transposeClockwise = (image: Image) =>
  image.map((row, i) => row.map((_, j) => image[image.length - 1 - j][i]));

const flipVerticalAxis = (image: Image) => image.map((l) => reverse(l));

const flipHorizontalAxis = (image: Image) =>
  image.reduceRight((a: Image, c) => (a.push(c), a), []);

const findImageOrientations = (image: Image) => {
  const tpose = transposeClockwise(image);
  const horizFlip = flipHorizontalAxis(image);
  const tposeHorizFlip = flipHorizontalAxis(tpose);
  const vertFlip = flipVerticalAxis(image);

  return [
    image, // Original image
    tpose, // Clockwise rotation of original
    horizFlip, // Mirror image horizontally of original
    tposeHorizFlip, // Clockwise rotation of mirror image horizontal
    vertFlip, // Mirror image vertically of original
    flipHorizontalAxis(vertFlip), // Original rotated 180 degrees
    flipVerticalAxis(tposeHorizFlip), // Anticlockwise rotation of original
    flipVerticalAxis(tpose), // Anticlockwise rotation of mirror image horizontal
  ];
};

const topEdge = (image: Image) => image[0];
const bottomEdge = (image: Image) => image[image.length - 1];
const leftEdge = (image: Image) =>
  image.reduce((acc, curr) => acc.concat(curr[0]), []);
const rightEdge = (image: Image) =>
  image.reduce((acc, curr) => acc.concat(curr[curr.length - 1]), []);

const removeEdges = (image: Image) =>
  image
    .slice(1, image.length - 1)
    .map((line) => line.slice(1, line.length - 1));

const findPositionInMap = (map: string[][], id: string) => {
  let row = 0;
  let col = 0;
  map.forEach((line, i) => {
    if (line.includes(id)) {
      row = i;
      col = line.findIndex((v) => v === id);
    }
  });

  return {
    row,
    col,
  };
};

const findNextId = (alreadyScanned: string[], idMap: string[][]) => {
  let nextId = '';
  idMap.forEach((row) =>
    row.forEach((col) => {
      if (!alreadyScanned.includes(col) && col !== '0') nextId = col;
    })
  );

  return nextId;
};

const verifyMap = (map: Image[][], idMap: string[][]) => {
  let valid = true;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      const tile = map[i][j];

      const tileUp = map[i - 1] ? map[i - 1][j] : undefined;
      const tileDown = map[i + 1] ? map[i + 1][j] : undefined;
      const tileLeft = map[i][j - 1];
      const tileRight = map[i][j + 1];

      if (
        tileUp &&
        arrayToString(topEdge(tile)) !== arrayToString(bottomEdge(tileUp))
      ) {
        valid = false;
        console.log(`Tile above ${idMap[i][j]} misaligned`);
      }
      if (
        tileDown &&
        arrayToString(bottomEdge(tile)) !== arrayToString(topEdge(tileDown))
      ) {
        valid = false;
        console.log(`Tile below ${idMap[i][j]} misaligned`);
      }
      if (
        tileLeft &&
        arrayToString(leftEdge(tile)) !== arrayToString(rightEdge(tileLeft))
      ) {
        valid = false;
        console.log(`Tile left of ${idMap[i][j]} misaligned`);
      }
      if (
        tileRight &&
        arrayToString(rightEdge(tile)) !== arrayToString(leftEdge(tileRight))
      ) {
        valid = false;
        console.log(`Tile right of ${idMap[i][j]} misaligned`);
      }
    }
  }

  return valid;
};

const createMap = (images: Map<string, Image>) => {
  let idMap: string[][] = [];
  let imageMap: Image[][] = [];

  const scannedIds = [];
  let id = '';
  let image: Image = [];

  while (scannedIds.length < images.size) {
    if (scannedIds.length === 0) {
      [id, image] = images.entries().next().value;
      idMap.push([id]);
      imageMap.push([image]);
    }

    const { row, col } = findPositionInMap(idMap, id);
    const orientation = imageMap[row][col];

    const top = topEdge(orientation);
    const bottom = bottomEdge(orientation);
    const left = leftEdge(orientation);
    const right = rightEdge(orientation);

    images.forEach((nextImage, nextId) => {
      if (nextId === id) return;
      if (idMap.find((row) => row.includes(nextId))) return;

      const nextOrientations = findImageOrientations(nextImage);

      for (let i = 0; i < nextOrientations.length; i++) {
        const nextOrientation = nextOrientations[i];
        const nextTop = topEdge(nextOrientation);
        const nextBottom = bottomEdge(nextOrientation);
        const nextLeft = leftEdge(nextOrientation);
        const nextRight = rightEdge(nextOrientation);

        let { row, col } = findPositionInMap(idMap, id);

        if (arrayToString(top) === arrayToString(nextBottom)) {
          // Check if there's a row above the current row
          if (!idMap[row - 1]) {
            idMap.unshift(Array(idMap[row].length).fill('0'));
            imageMap.unshift(Array(imageMap[row].length).fill([]));
          }

          ({ row, col } = findPositionInMap(idMap, id));
          idMap[row - 1][col] = nextId;
          imageMap[row - 1][col] = nextOrientation;
          break;
        } else if (arrayToString(bottom) === arrayToString(nextTop)) {
          // Check if there's a row below the current row
          if (!idMap[row + 1]) {
            idMap.push(Array(idMap[row].length).fill('0'));
            imageMap.push(Array(imageMap[row].length).fill([]));
          }

          idMap[row + 1][col] = nextId;
          imageMap[row + 1][col] = nextOrientation;
          break;
        } else if (arrayToString(left) === arrayToString(nextRight)) {
          // Check if there's a col before the current col
          if (!idMap[row][col - 1]) {
            idMap = idMap.map((r) => (r.unshift('0'), r));
            imageMap = imageMap.map((r) => (r.unshift([]), r));
          }

          ({ row, col } = findPositionInMap(idMap, id));
          idMap[row][col - 1] = nextId;
          imageMap[row][col - 1] = nextOrientation;
          break;
        } else if (arrayToString(right) === arrayToString(nextLeft)) {
          // Check if there's a col after the current col
          if (!idMap[row][col + 1]) {
            idMap = idMap.map((r) => (r.push('0'), r));
            imageMap = imageMap.map((r) => (r.push([]), r));
          }

          idMap[row][col + 1] = nextId;
          imageMap[row][col + 1] = nextOrientation;
          break;
        }
      }
    });

    scannedIds.push(id);
    id = findNextId(scannedIds, idMap);
    image = images.get(id) || [];
  }

  return { idMap, imageMap };
};

/**
 * Finds a Sea Monster of the form:
 * ```
 *  .#.#...#.###...#.##.O#..
 *  #.O.##.OO#.#.OO.##.OOO##
 *  ..#O.#O#.O##O..O.#O##.##
 * ```
 * @param {Image} image  The image to search
 * @return {{found: boolean, newImage: string[]}}
 */
const markSeaMonsters = (image: Image) => {
  // A full sea monster can only be found from the 3rd row onwards.
  const start = 2;
  let found = false;
  const newImage = image.map(arrayToString);

  for (let i = start; i < newImage.length; i++) {
    let newTopLine = newImage[i - 2];
    let newMidLine = newImage[i - 1];
    let newBotLine = newImage[i];

    const lineLen = newTopLine.length;
    const monsterLen = 20;

    for (let j = 0; j < lineLen - monsterLen; j++) {
      const topSlice = newTopLine.slice(j, j + monsterLen + 1);
      const midSlice = newMidLine.slice(j, j + monsterLen + 1);
      const botSlice = newBotLine.slice(j, j + monsterLen + 1);

      if (
        topSlice.match(/.{19}[#]/) &&
        midSlice.match(/[#].{4}#{2}.{4}#{2}.{4}#{3}/) &&
        botSlice.match(/.([#].{2}){6}/)
      ) {
        found = true;
        newTopLine =
          newTopLine.slice(0, j + monsterLen - 1) +
          'O' +
          newTopLine.slice(j + monsterLen);
        newMidLine =
          newMidLine.slice(0, j + 1) +
          'O' +
          newMidLine.slice(j + 2, j + 6) +
          'OO' +
          newMidLine.slice(j + 8, j + 12) +
          'OO' +
          newMidLine.slice(j + 14, j + 18) +
          'OOO' +
          newMidLine.slice(j + monsterLen + 1);
        newBotLine =
          newBotLine.slice(0, j + 2) +
          'O' +
          newBotLine.slice(j + 3, j + 5) +
          'O' +
          newBotLine.slice(j + 6, j + 8) +
          'O' +
          newBotLine.slice(j + 9, j + 11) +
          'O' +
          newBotLine.slice(j + 12, j + 14) +
          'O' +
          newBotLine.slice(j + 15, j + 17) +
          'O' +
          newBotLine.slice(j + 18);
      }
    }

    newImage[i - 2] = newTopLine;
    newImage[i - 1] = newMidLine;
    newImage[i] = newBotLine;
  }

  return { found, newImage };
};

const part1 = (input: string[]) => {
  const { idMap } = createMap(parseInput(input));

  return [
    idMap[0][0],
    idMap[0][idMap[0].length - 1],
    idMap[idMap.length - 1][0],
    idMap[idMap.length - 1][idMap[0].length - 1],
  ]
    .map(Number)
    .reduce((acc, curr) => acc * curr, 1);
};

const part2 = (input: string[]) => {
  const { imageMap, idMap } = createMap(parseInput(input));
  if (!verifyMap(imageMap, idMap)) return 0;

  const finalMap = imageMap
    .map((row) => row.map(removeEdges))
    .reduce(
      (acc: Image, row) =>
        acc.concat(
          row.reduce((arr: Image, image, i) => {
            if (i === 0) {
              image.forEach((line) => arr.push(line));
            } else {
              image.forEach((line, j) => {
                arr[j] = arr[j].concat(line);
              });
            }
            return arr;
          }, [])
        ),
      []
    );

  const mapOrientations = findImageOrientations(finalMap);
  for (let i = 0; i < mapOrientations.length; i++) {
    const { found, newImage } = markSeaMonsters(mapOrientations[i]);
    if (found)
      return newImage.reduce(
        (acc, row) =>
          acc +
          Array.from(row).reduce((a: number, c) => a + Number(c === '#'), 0),
        0
      );
  }

  return 0;
};

export default {
  part1,
  part2,
};
