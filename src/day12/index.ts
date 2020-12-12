type Instruction = {
  action: string;
  value: number;
};

type Ship = {
  direction: string;
  x: number;
  y: number;
};

const parseInput = (index: string[]): Instruction[] =>
  index.map((l) => ({
    action: l.charAt(0),
    value: parseInt(l.slice(1)),
  }));

const determineNewDirection = (
  previous: string,
  { action, value }: Instruction
) => {
  const directionOrder = ['N', 'E', 'S', 'W'];
  const finalIndex = directionOrder.length - 1;
  const i = directionOrder.findIndex((v) => v === previous);
  let nextIndex = i;

  const angle = value / 90;

  if (action === 'R') {
    if (i === finalIndex || i + angle > finalIndex) {
      nextIndex = i - directionOrder.length + angle;
    } else {
      nextIndex = i + angle;
    }
  } else if (action === 'L') {
    if (i === 0 || i - angle < 0) {
      nextIndex = directionOrder.length + i - angle;
    } else {
      nextIndex = i - angle;
    }
  }

  return directionOrder[nextIndex];
};

const moveShipOrthogonally = (ship: Ship, { action, value }: Instruction) => {
  const newShip = { ...ship };
  switch (action) {
    case 'N':
      newShip.y += value;
      break;
    case 'S':
      newShip.y -= value;
      break;
    case 'E':
      newShip.x += value;
      break;
    case 'W':
      newShip.x -= value;
      break;
  }

  return newShip;
};

const interpretAction = (ship: Ship, { action, value }: Instruction) => {
  let newShipState = { ...ship };
  switch (action) {
    case 'L':
    case 'R':
      newShipState.direction = determineNewDirection(ship.direction, {
        action,
        value,
      });
      break;
    case 'F':
      newShipState = interpretAction(newShipState, {
        action: newShipState.direction,
        value,
      });
      break;
    default:
      newShipState = moveShipOrthogonally(ship, { action, value });
      break;
  }

  return newShipState;
};

const determineNewWaypointDirection = (
  { x, y, direction }: Ship,
  { action, value }: Instruction
) => {
  // Convert the direction to radians.
  const multiplyer = action === 'R' ? -1 : 1;
  const angle = multiplyer * value * (Math.PI / 180);

  // Calculate the vector rotation.
  return {
    direction,
    x: Math.round(x * Math.cos(angle) - y * Math.sin(angle)),
    y: Math.round(x * Math.sin(angle) + y * Math.cos(angle)),
  };
};

const interpretWaypointShipInteraction = (
  waypoint: Ship,
  ship: Ship,
  { action, value }: Instruction
) => {
  let newWaypointState = { ...waypoint };
  const newShipState = { ...ship };
  switch (action) {
    case 'L':
    case 'R':
      newWaypointState = determineNewWaypointDirection(waypoint, {
        action,
        value,
      });
      break;
    case 'F':
      newShipState.x += value * waypoint.x;
      newShipState.y += value * waypoint.y;
      break;
    default:
      newWaypointState = moveShipOrthogonally(waypoint, { action, value });
      break;
  }

  return { newWaypointState, newShipState };
};

const part1 = (input: string[]) => {
  let shipPosition: Ship = { direction: 'E', x: 0, y: 0 };

  parseInput(input).forEach((instruction) => {
    shipPosition = interpretAction(shipPosition, instruction);
  });

  return Math.abs(shipPosition.x) + Math.abs(shipPosition.y);
};

const part2 = (input: string[]) => {
  let shipPosition: Ship = { direction: 'E', x: 0, y: 0 };
  let waypointPosition: Ship = { direction: 'E', x: 10, y: 1 };

  parseInput(input).forEach((instruction) => {
    ({
      newWaypointState: waypointPosition,
      newShipState: shipPosition,
    } = interpretWaypointShipInteraction(
      waypointPosition,
      shipPosition,
      instruction
    ));
  });

  return Math.abs(shipPosition.x) + Math.abs(shipPosition.y);
};

export default {
  part1,
  part2,
};
