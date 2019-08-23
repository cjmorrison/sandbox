export function checkPointOnTriangle(checkPoint, triVertA, triVertB, triVertC) {
  // my reaserch lead me to the Barycentric coordinate system I found a few differnt algorithms on this, some more effecient then this one.
  // this one however, was easier to understand.
  // https://stackoverflow.com/questions/13300904/determine-whether-point-lies-inside-triangle (answer by user kevintodisco)

  const alpha =
    ((triVertB.y - triVertC.y) * (checkPoint.x - triVertC.x) +
      (triVertC.x - triVertB.x) * (checkPoint.y - triVertC.y)) /
    ((triVertB.y - triVertC.y) * (triVertA.x - triVertC.x) +
      (triVertC.x - triVertB.x) * (triVertA.y - triVertC.y));
  const beta =
    ((triVertC.y - triVertA.y) * (checkPoint.x - triVertC.x) +
      (triVertA.x - triVertC.x) * (checkPoint.y - triVertC.y)) /
    ((triVertB.y - triVertC.y) * (triVertA.x - triVertC.x) +
      (triVertC.x - triVertB.x) * (triVertA.y - triVertC.y));
  const gamma = 1 - alpha - beta;

  if (alpha > 0 && beta > 0 && gamma > 0) {
    return true;
  } else {
    return false;
  }
}

export function inverseDirection(dir) {
  if (dir === "top") {
    return "bottom";
  } else if (dir === "right") {
    return "left";
  } else if (dir === "bottom") {
    return "top";
  } else if (dir === "left") {
    return "right";
  } else {
    console.error(`inverseDirection called with unknown direction ${dir}`);
  }
}

export function rgbToHex(r, g, b) {
  // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb/5623914#5623914 user casablanca
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
