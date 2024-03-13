import { Framebuffer } from './framebuffer.js';
import { Rasterizer } from './rasterizer.js';
// DO NOT CHANGE ANYTHING ABOVE HERE


////////////////////////////////////////////////////////////////////////////////
// TODO: Implement functions drawLine(v1, v2) and drawTriangle(v1, v2, v3) below.
////////////////////////////////////////////////////////////////////////////////

// take two vertices defining line and rasterize to framebuffer
Rasterizer.prototype.drawLine = function(v1, v2) {
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const step = (Math.abs(dx) >= Math.abs(dy)) ? Math.abs(dx) : Math.abs(dy);
  const length = Math.sqrt(dx * dx + dy * dy);
  const stepX = dx / step;
  const stepY = dy / step;
  const distStep = Math.sqrt(stepX * stepX + stepY * stepY);

  let x = x1, y = y1, dist = 0, i = 1;
  do {
    const t = dist / length;  // linear interpolation "alpha" in [0,1]
    const c = [(1-t) * r1 + t * r2, (1-t) * g1 + t * g2, (1-t) * b1 + t * b2];
    this.setPixel(Math.floor(x), Math.floor(y), c);
    y += stepY;
    x += stepX;
    i += 1;
    dist += distStep;
  } while (i <= step)
}

// take 3 vertices defining a solid triangle and rasterize to framebuffer
Rasterizer.prototype.drawTriangle = function(v1, v2, v3) {
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  const [x3, y3, [r3, g3, b3]] = v3;
  const p1 = new Point(x1, y1), p2 = new Point(x2, y2), p3 = new Point(x3, y3);
  const l = new Line(p1, p2), m = new Line(p2, p3), n = new Line(p3, p1);
  const area = l.dot(p3);
  const xmin = Math.ceil(Math.min(x1, x2, x3));
  const xmax = Math.ceil(Math.max(x1, x2, x3));
  const ymin = Math.ceil(Math.min(y1, y2, y3));
  const ymax = Math.ceil(Math.max(y1, y2, y3));
  for (let x = xmin; x <= xmax; ++x) {
    for (let y = ymin; y <= ymax; ++y) {
      let p = new Point(x, y);
      if (l.inside(p) && m.inside(p) && n.inside(p)) {
        const w = l.dot(p) / area, u = m.dot(p) / area, v = n.dot(p) / area;
        const c = [u*r1 + v*r2 + w*r3, u*g1 + v*g2 + w*g3, u*b1 + v*b2 + w*b3];
        this.setPixel(x, y, c);
      }
    }
  }
}

class Point {
  constructor(x, y) { this.x = x, this.y = y; }
}

class Line {
  constructor(v0, v1) {
    this.a = v1.y - v0.y;
    this.b = v0.x - v1.x;
    this.c = -(this.a * v0.x + this.b * v0.y);
  }
  dot(p) { return this.a * p.x + this.b * p.y + this.c; }
  inside(p) {
    const e = this.dot(p);
    return e > 0 || (e == 0 && (this.a < 0 || (this.a == 0 && this.b < 0)));
  }
}

////////////////////////////////////////////////////////////////////////////////
// EXTRA CREDIT: change DEF_INPUT to create something interesting!
////////////////////////////////////////////////////////////////////////////////
const DEF_INPUT = [
  "v,10,10,1.0,0.0,0.0;",
  "v,52,52,0.0,1.0,0.0;",
  "v,52,10,0.0,0.0,1.0;",
  "v,10,52,1.0,1.0,1.0;",
  "t,0,1,2;",
  "t,0,3,1;",
  "v,10,10,1.0,1.0,1.0;",
  "v,10,52,0.0,0.0,0.0;",
  "v,52,52,1.0,1.0,1.0;",
  "v,52,10,0.0,0.0,0.0;",
  "l,4,5;",
  "l,5,6;",
  "l,6,7;",
  "l,7,4;"
].join("\n");


// DO NOT CHANGE ANYTHING BELOW HERE
export { Rasterizer, Framebuffer, DEF_INPUT };
