import { Mat4 } from './math.js';
import { Parser } from './parser.js';
import { Scene } from './scene.js';
import { Renderer } from './renderer.js';
import { TriangleMesh } from './trianglemesh.js';
// DO NOT CHANGE ANYTHING ABOVE HERE

////////////////////////////////////////////////////////////////////////////////
// TODO: Implement createCube, createSphere, computeTransformation, and shaders
////////////////////////////////////////////////////////////////////////////////

// Example two triangle quad
const quad = {
  positions: [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1,  1, -1, -1,  1, -1],
  normals: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  uvCoords: [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]
}

TriangleMesh.prototype.createCube = function() 
{
  // Vertex list: starting at bottom left front and ending at top right back
  // [-1, -1, 1, 
  // 1, -1, 1, 
  // 1, -1, -1, 
  // -1, -1, -1, 
  // 1, 1, 1, 
  // -1, 1, 1, 
  // -1, 1, -1, 
  // 1, 1, -1]
  // Face list: 
  // Bottom face: [-1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, -1] with normal (0, -1, 0)
  // Top face: [1, 1, 1, -1, 1, 1, -1, 1, -1, 1, 1, -1] with normal (0, 1, 0)
  // Front face: [-1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1] with normal (0, 0, 1)
  // Right face: [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1] with normal (1, 0, 0)
  // Left face: [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1] with normal (-1, 0, 0)
  // Back face: [-1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1] with normal (0, 0, -1)

  // Finally, now we can define our positions and normals 
  // We need to draw 2 triangles for each face, meaning we'll have 2*3*6 total 36 vertices 
  this.positions = [-1, -1, 1, -1, 1, 1, 1, 1, 1, // Bottom t1
                    -1, -1, 1, 1, -1, 1, 1, 1, 1, // Bottom t2
                    -1, -1, -1, -1, 1, -1, 1, 1, -1, // Top t1
                    -1, -1, -1, 1, -1, -1, 1, 1, -1, // Top t2
                    -1, -1, 1, -1, 1, 1, -1, 1, -1, // Front t1
                    -1, -1, 1, -1, -1, -1, -1, 1, -1, // Front t2
                    -1, 1, 1, 1, 1, 1, 1, 1, -1, // Right t1
                    -1, 1, 1, -1, 1, -1, 1, 1, -1, // Right t2
                    -1, -1, 1, 1, -1, 1, -1, -1, -1, // Left t1
                    1, -1, 1, 1, -1, -1, -1, -1, -1, // Left t2
                    1, 1, -1, 1, 1, 1, 1, -1, 1, // Back t1
                    1, 1, -1, 1, -1, -1, 1, -1, 1 // Back t2
                  ];
  // Normal for each vertex --> 6 distinct normals (6 faces) with 36 total normals 
  this.normals = [0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, // Bottom
                  0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, // Top 
                  0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, // Front
                  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, // Right
                 -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, // Left
                  0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1 // Back 
                ];
  // Need to match die faces (1-6) to each face on the cube 
  this.uvCoords = [1/2, 2/3, 0, 1, 0, 2/3,          // Bottom
                   1/2, 2/3, 0, 1, 1/2, 1, 
                   1/2, 2/3, 0, 1/3, 0, 2/3,      // Right
                   1/2, 2/3, 0, 1/3, 1/2, 1/3,  
                   1/2, 1/3, 0, 0, 1/2, 0,          // Top
                   1/2, 1/3, 0, 0, 0, 1/3,
                   1, 1, 1/2, 2/3, 1, 2/3,          // Bottom
                   1, 1, 1/2, 2/3, 1/2, 1,
                   1/2, 1/3, 1, 2/3, 1, 2/3,        // Left
                   1/2, 1/3, 1, 2/3, 1, 1/3,
                   1/2, 0, 1, 1/3, 1/2, 0,        // Right    
                   1/2, 0, 1, 1/3, 1, 0
                  ];
}

TriangleMesh.prototype.createSphere = function(numStacks, numSectors) {
  this.positions = SphereCoords(numStacks, numSectors);
  this.normals = SphereCoords(numStacks, numSectors);
  this.uvCoords = SphereCoordsUV(numStacks, numSectors);
  this.indices = SphereVertices(numStacks, numSectors);
}

// All of the following functions are implemented using http://www.songho.ca/opengl/gl_sphere.html 
function SphereCoordsUV(stackCount, sectorCount) 
{
  let UVCoords = [];

  for (let i = 0; i <= stackCount; i++) 
  {
    for (let j = 0; j <= sectorCount; j++)
    {
      let u = j/sectorCount;
      let v = i/stackCount;
      UVCoords.push(1 - u);
      UVCoords.push(v);
    }
  }
  return UVCoords;
}

function SphereCoords(stackCount, sectorCount) 
{
  let Coords = [];
  let pi = Math.PI; 
  let stackStep = pi/stackCount;

  for (let i = 0; i <= stackCount; i++) 
  {
    let deg = pi/2 - i*stackStep; 
    // Radius 1 so we can just ignore the 1*
    let xy = Math.cos(deg);
    let z = Math.sin(deg);

    for (let j = 0; j <= sectorCount; j++) 
    {
      let theta = 2 * pi * j / sectorCount;
      let x = xy*Math.cos(theta);
      let y = xy*Math.sin(theta);

      Coords.push(x);
      Coords.push(y);
      Coords.push(z);
    }
  }
  return Coords;
}

function SphereVertices(stackCount, sectorCount) 
{
  let indices = []; 

  for (let i = 0; i < stackCount; i++) 
  {
    let k1 = i * (sectorCount + 1);
    let k2 = k1 + sectorCount + 1;

    for (let j = 0; j < sectorCount; j++)
    {
      if (i != 0) 
      {
        indices.push(k1);
        indices.push(k2);
        indices.push(k1 + 1);
      }
      if (i != (stackCount - 1))
      {
        indices.push(k1 + 1);
        indices.push(k2);
        indices.push(k2 + 1)
      }

      k2++;
      k1++;
    }
  }

  return indices;
}

Scene.prototype.computeTransformation = function(transformSequence) 
{
  let overallTransform = Mat4.create();  // identity matrix
  for (let i = transformSequence.length - 1; i >= 0; i--) 
  {
    let transformMatrix = [];

    let transformType = transformSequence[i][0];
    let tS1 = transformSequence[i][1];
    let tS2 = transformSequence[i][2];
    let tS3 = transformSequence[i][3];

    let tS1Rad = degtoRad(tS1);
    // We need 4x4 homographic matrices, lecture provides all of them in 4D expect rotate about X
    switch(transformType)
    {
      // Translation 
      case "T":
        // Indexed "Transposely" i.e. rows and columns are swapped
        transformMatrix = Mat4.set(Mat4.create(), 1, 0, 0, 0,
                                                  0, 1, 0, 0,
                                                  0, 0, 1, 0,
                                                  tS1, tS2, tS3, 1);
                                                  break;
      // Scale
      case "S":
        transformMatrix = Mat4.set(Mat4.create(), tS1, 0, 0, 0,
                                                  0, tS2, 0, 0,
                                                  0, 0, tS3, 0,
                                                  0, 0, 0, 1);
                                                  break;
      // Rotate around X, just add a homographic index of 1 
      case "Rx":
        transformMatrix = Mat4.set(Mat4.create(), 1, 0, 0, 0,
                                                  0, Math.cos(tS1Rad), Math.sin(tS1Rad), 0,
                                                  0, -Math.sin(tS1Rad), Math.cos(tS1Rad), 0,
                                                  0, 0, 0, 1);
                                                  break;
      // Rotate around Y
      case "Ry":
        transformMatrix = Mat4.set(Mat4.create(), Math.cos(tS1Rad), 0, -Math.sin(tS1Rad), 0,
                                                  0, 1, 0, 0,
                                                  Math.sin(tS1Rad), 0, Math.cos(tS1Rad), 0,
                                                  0, 0, 0, 1);
                                                  break;
      // Rotate around Z
      case "Rz":
        transformMatrix = Mat4.set(Mat4.create(), Math.cos(tS1Rad), Math.sin(tS1Rad), 0, 0,
                                                  -Math.sin(tS1Rad), Math.cos(tS1Rad), 0, 0,
                                                  0, 0, 1, 0,
                                                  0, 0, 0, 1);
                                                  break;
      default:
        return;
    }
    Mat4.multiply(overallTransform, overallTransform, transformMatrix);
  }
  return overallTransform;
}

function degtoRad(deg) 
{
  return deg*(Math.PI/180);
}

Renderer.prototype.VERTEX_SHADER = `
precision mediump float;
attribute vec3 position, normal;
attribute vec2 uvCoord;
uniform vec3 lightPosition;
uniform mat4 projectionMatrix, viewMatrix, modelMatrix;
uniform mat3 normalMatrix;
varying vec2 vTexCoord;

// TODO: implement vertex shader logic below
// From slides: "Computation relies on
// 1) Light sources
// 2) Local geometry + material
// 3) Camera view point"

varying vec3 LightSource;
varying vec3 Normal;
varying vec3 ViewPoint;

void main() {
  LightSource = lightPosition;
  Normal = normalize(normalMatrix * normal);
  // gl_Position is our ViewPoint, without the projection to world, only to view (Camera)
  vec4 ViewPointhomo = (viewMatrix * modelMatrix * vec4(position, 1.0));
  ViewPoint = vec3(ViewPointhomo) / ViewPointhomo.w;

  vTexCoord = uvCoord;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

Renderer.prototype.FRAGMENT_SHADER = `
precision mediump float;
uniform vec3 ka, kd, ks, lightIntensity;
uniform float shininess;
uniform sampler2D uTexture;
uniform bool hasTexture;
varying vec2 vTexCoord;

// TODO: implement fragment shader logic below

varying vec3 LightSource;
varying vec3 Normal;
varying vec3 ViewPoint;

vec3 ca, cd, cs, color;
vec3, v, h;

void main() {
  vec3 Normal1 = normalize(Normal);
  float d = -ViewPoint.z;
  vec3 direction = normalize(LightSource - ViewPoint);

  v = -normalize(ViewPoint);
  h = normalize(v + d);

  ca = ka * lightIntensity;
  cd = (kd / (d*d)) * max(dot(Normal1, direction), 0.0) * lightIntensity;
  cs = (ks / (d*d)) * pow(max(0.0, dot(h, Normal1)), shininess) * lightIntensity;

  color = ca + cd + cs;

  if(hasTexture)
  {
    gl_FragColor = texture2D(uTexture, vTexCoord) * vec4(color, 1.0);
  }
  else
  {
    gl_FragColor = vec4(color, 1.0);
  }
}
`;

////////////////////////////////////////////////////////////////////////////////
// EXTRA CREDIT: change DEF_INPUT to create something interesting!
////////////////////////////////////////////////////////////////////////////////
const DEF_INPUT = [
  "c,myCamera,perspective,5,5,5,0,0,0,0,1,0;",
  "l,myLight,point,0,5,0,2,2,2;",
  "p,unitCube,cube;",
  "p,unitSphere,sphere,20,20;",
  "m,globeMat,0.3,0.3,0.3,0.7,0.7,0.7,1,1,1,5,globe.jpg;",
  "m,hubbleMat,0.3,0.3,0.3,0.7,0.7,0.7,1,2,3,5,hubble.jpg;",
  "m,moonMat,0.3,0.3,0.3,0.7,0.7,0.7,1,2,3,5,moon.jpg;",
  "o,gl,unitSphere,globeMat;",
  "o,hu,unitSphere,hubbleMat;",
  "o,mo,unitSphere,moonMat;",
  "X,gl,S,1.5,1.5,1.5;X,gl,Rx,90;X,gl,Ry,-150;X,gl,T,0,1.5,0;",
  "X,hu,S,0.4,0.4,0.4;X,hu,Rx,180;X,gl,Ry,90;X,hu,T,2.5,2,0;",
  "X,mo,S,0.75,0.75,0.75;X,mo,Rx,0;X,gl,Ry,0;X,mo,T,-2.5,-2,0;"
].join("\n");

// DO NOT CHANGE ANYTHING BELOW HERE
export { Parser, Scene, Renderer, DEF_INPUT };
