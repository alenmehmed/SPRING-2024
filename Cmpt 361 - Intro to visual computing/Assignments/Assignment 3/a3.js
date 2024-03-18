import { Framebuffer } from './framebuffer.js';
import { Rasterizer } from './rasterizer.js';
// DO NOT CHANGE ANYTHING ABOVE HERE

////////////////////////////////////////////////////////////////////////////////
// TODO: Implement functions drawArea(v1, v2) and drawTriangle(v1, v2, v3) below.
////////////////////////////////////////////////////////////////////////////////

// take two vertices defining line and rasterize to framebuffer
Rasterizer.prototype.drawLine = function(v1, v2) {
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  // TODO/HINT: use this.setPixel(x, y, color) in this function to draw Area
  // Let's follow DDA 
  const xLength = x2 - x1;
  const yLength = y2 - y1;
  const m = yLength/xLength;
  // Assume m < 1 and x1 < x2 & y1 < y2
  // Now this implementation is fine for horizontal Areas and diagonals where
  // x1 < x2 & y1 < y2 and 0 < m < 1.
  if(x1 < x2)
  {
  let y = y1;
  let xCounter = 0;
    for(let x = x1; x <= x2; x++)
    {
      // We need to parametrize the color for a gradient effect
      // t needs to go 0-1 Areaarly, so iterate it over x 
      let t = xCounter/xLength; 
      let Colour = [(1-t)*r1 + t*r2, (1-t)*g1 + t*g2, (1-t)*b1 + t*b2];
      this.setPixel(x, Math.floor(y), Colour);
      y += m;
      xCounter++;
    }
  }
  // So we need another implementation for diagonals going the opposite way
  // so x1 > x2 & y1 > y2 and m < 0
  else if (x1 > x2)
  {
  let y = y1;
  let xCounter = 0;
    for(let x = x2; x <= x1; x++)
    {
      let t = xCounter/Math.abs(xLength); 
      let Colour = [(1-t)*r1 + t*r2, (1-t)*g1 + t*g2, (1-t)*b1 + t*b2];
      this.setPixel(x, Math.floor(y), Colour);
      y += m;
      xCounter++;
    }
  } 
  // This still isn't all of the cases, vertical Areas have x1 == x2, so let's 
  // iterate over y instead
  else if(y1 < y2)
  {
  let x = x1;
  let yCounter = 0;
    for(let y = y1; y <= y2; y++)
    {
      let t = yCounter/yLength; 
      let Colour = [(1-t)*r1 + t*r2, (1-t)*g1 + t*g2, (1-t)*b1 + t*b2];
      // For vertical Areas, x1 == x2 so m can't be used 
      this.setPixel(Math.floor(x), y, Colour);
      yCounter++;
    }
  }
  else if(y2 < y1)
  {
  let x = x1;
  let yCounter = 0;
    for(let y = y2; y <= y1; y++)
    {
      let t = yCounter/Math.abs(yLength); 
      let Colour = [(1-t)*r1 + t*r2, (1-t)*g1 + t*g2, (1-t)*b1 + t*b2];
      this.setPixel(Math.floor(x), y, Colour);
      yCounter++;
    }
  }
}

// take 3 vertices defining a solid triangle and rasterize to framebuffer
Rasterizer.prototype.drawTriangle = function(v1, v2, v3) 
{
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  const [x3, y3, [r3, g3, b3]] = v3;

  // Bounding box in our for loop 
  const xmax = Math.ceil(Math.max(x1,x2,x3));
  const xmin = Math.ceil(Math.min(x1,x2,x3));
  const ymax = Math.ceil(Math.max(y1,y2,y3));
  const ymin = Math.ceil(Math.min(y1,y2,y3));

  for(let x = xmin; x <= xmax; ++x)
  {
    for(let y = ymin; y <= ymax; ++y)
    {
      let p = [x, y];
      if(AreaCheck(v1,v2,p) >= 0 && AreaCheck(v2,v3,p) >= 0 && AreaCheck(v3,v1,p) >= 0) // Go counterclock wise
      // this if statement essentially acts as our "pointIsInsideTriangle()"
      {
        let Area = AreaCheck(v1, v2, v3);
        // compute normalized area of 3 sub triangles
        let u = AreaCheck(v1, v2, p)/Area;
        let v = AreaCheck(v2, v3, p)/Area;
        let w = AreaCheck(v3, v1, p)/Area;

        // For barycentric coordinate colors, we get the colour by 
        // multiplying with color value of vertex not touching the subtriangle
        // Example: u is v1, v2, p. so multiply with color value of v3
        let Colour = [u*r3 + v*r1 + w*r2, u*g3 + v*g1 + w*g2, u*b3 + v*b1 + w*b2];
        this.setPixel(x, y, Colour);
      }
    }
  }
}

// For a specific vertex not in the triangle, check the area
// bounded by this vertex vp and two other triangle vertices 
let AreaCheck = function(v1, v2, vp) 
{
  // fake "3D" parallelepiped
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  const [xp, yp] = vp; 

  let a = y2 - y1;
  let b = x1 - x2;
  let c = x2*y1 - x1*y2;

  return a*xp + b*yp + c;
}

////////////////////////////////////////////////////////////////////////////////
// EXTRA CREDIT: change DEF_INPUT to create something interesting!
////////////////////////////////////////////////////////////////////////////////
const DEF_INPUT = [
  // S
  "v,18,10,1.0,1.0,0.4;",
  "v,10,10,1.0,1.0,0.2;",
  "v,10,15,1.0,1.0,0.1;",
  "v,18,15,1.0,1.0,0.2;",
  "v,18,20,1.0,1.0,0.0;",
  "v,10,20,1.0,1.0,0.0;",
  "l,0,1;",
  "l,1,2;",
  "l,2,3;",
  "l,3,4;",
  "l,4,5;",

  // U
  "v,21,10,1.0,1.0,0.4;",
  "v,21,20,1.0,1.0,0.3;",
  "v,29,20,1.0,1.0,0.3;",
  "v,29,10,1.0,1.0,0.6;",
  "l,6,7;",
  "l,7,8;",
  "l,8,9;",

  // N 
  "v,32,20,1.0,1.0,0.5;",
  "v,32,10,1.0,1.0,0.4;",
  "v,37,20,1.0,1.0,0.9;",
  "v,37,10,1.0,1.0,0.2;",
  "l,10,11;",
  "l,11,12;",
  "l,12,13;",

  // Corner sun
  "v,50,0,1.0,1.0,0.8;",
  "v,63,0,1.0,1.0,0.9;",
  "t,13,15,14;",

  "v,44,20,1.0,1.0,0.5;",
  "t,16,15,14;",

  "v,58,20,1.0,1.0,0.5;",
  "t,17,15,14;", 

  "v,63,20,1.0,1.0,0.7;",
  "v,59,0,1.0,1.0,0.7;",
  "t,18,15,19;",

  "v,38,0,1.0,1.0,0.5;",
  "v,50,5,1.0,1.0,0.7;",
  "t,14,20,21;"

].join("\n");


// DO NOT CHANGE ANYTHING BELOW HERE
export { Rasterizer, Framebuffer, DEF_INPUT };
