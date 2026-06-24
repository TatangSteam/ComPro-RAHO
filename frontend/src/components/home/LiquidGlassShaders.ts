// Liquid Glass Shaders and Physics Constants

export const MAX_DROPLETS = 40;
export const FIXED_DT_MS = 8;
export const MAX_FRAME_DT_MS = 100;
export const MAX_CATCHUP = 6;
export const MAX_ENTRIES = MAX_DROPLETS * 2;

// Physics parameters
export const DAMP = 0.993;
export const MOUSE_R = 0.18;
export const MOUSE_F = 0.008; // Increased from 0.004 for stronger mouse push
export const TENSION_RANGE = 0.12;
export const TENSION_F = 0.0004;
export const MERGE_RATIO = 0.62;
export const SPLIT_SPEED = 0.007; // Decreased from 0.013 for easier splitting
export const SPLIT_MIN_R = 0.035; // Decreased from 0.04 to allow smaller droplets to split
export const MAX_SPEED = 0.020; // Increased from 0.015 to allow faster movement
export const BOUNCE = 0.4;
export const WANDER_F = 0.00004;
export const CENTER_PULL = 0.000008;
export const SOFT_STIFFNESS = 0.22;
export const SOFT_DAMPING = 0.6;

export interface Droplet {
  id: number;
  x: number;
  y: number;
  r: number;
  area: number;
  vx: number;
  vy: number;
  alive: boolean;
  wanderAngle: number;
  wanderSpeed: number;
  softPrevX: number;
  softPrevY: number;
  softOffX: number;
  softOffY: number;
  softVelX: number;
  softVelY: number;
}

// Vertex shader
export const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

// Fragment shader
export const fragmentShader = `
precision highp float;
#define MAX_N ${MAX_ENTRIES}

uniform vec2      uRes;
uniform sampler2D uData;
uniform sampler2D uBg;
uniform int       uCount;
uniform float     uTime;

void main(){
  vec2  uv  = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2  p   = (uv - 0.5) * vec2(asp, 1.0);

  float field = 0.0;
  vec2  grad  = vec2(0.0);
  vec2  lens  = vec2(0.0);
  float lensW = 0.0;

  for(int i = 0; i < MAX_N; i++){
    if(i >= uCount) break;
    vec4  d = texture2D(uData, vec2((float(i)+0.5)/float(MAX_N), 0.5));
    vec2  c = d.xy;
    float r = d.z;
    if(r < 0.001) continue;
    vec2  delta = p - c;
    float dSq   = dot(delta, delta) + 1e-5;
    float contrib = r * r / dSq;
    field += contrib;
    grad  += -2.0 * contrib / dSq * delta;

    float w = r * r / (dSq + r * r);
    lens += (c - p) * w;
    lensW += w;
  }

  lens /= (lensW + 0.001);
  float lensLen = length(lens);

  float thr  = 1.0;
  float edge = smoothstep(thr - 0.08, thr + 0.03, field);

  float refractStrength = 0.035;
  float mappedLens = atan(lensLen * 6.0) * refractStrength;
  vec2  refractDir = (lensLen > 1e-5) ? lens / lensLen : vec2(0.0);
  float refractMask = smoothstep(thr - 0.2, thr + 1.5, field);
  vec2  refractedUV = clamp(uv + refractDir * mappedLens * refractMask, 0.001, 0.999);

  vec3  bgClean = texture2D(uBg, uv).rgb;

  float gradLen = length(grad);
  float nScale = atan(gradLen * 0.5) * 0.3;
  vec2  nGrad  = (gradLen > 1e-4) ? (grad / gradLen) * nScale : vec2(0.0);
  vec3  N = normalize(vec3(-nGrad, 1.0));
  vec3  L = normalize(vec3(0.3, 0.6, 1.0));
  vec3  V = vec3(0.0, 0.0, 1.0);
  vec3  H = normalize(L + V);
  float diff = max(dot(N, L), 0.0);
  float spec = pow(max(dot(N, H), 0.0), 180.0);

  float cosTheta = max(dot(N, V), 0.0);
  float fresnel  = 0.04 + 0.96 * pow(1.0 - cosTheta, 4.0);

  float rim = smoothstep(thr + 0.6, thr, field) * edge;

  float caStr = 0.0018 * edge;
  vec3 bgCA;
  bgCA.r = texture2D(uBg, refractedUV + vec2(caStr, caStr * 0.5)).r;
  bgCA.g = texture2D(uBg, refractedUV).g;
  bgCA.b = texture2D(uBg, refractedUV - vec2(caStr, caStr * 0.5)).b;

  float depth = smoothstep(thr, thr + 3.0, field);
  vec3  tint  = mix(vec3(1.0), vec3(1.0, 0.90, 0.58), depth * 0.28);

  vec3 glassColor = bgCA * tint * (0.92 + 0.08 * diff)
                  + vec3(1.0) * spec * 0.85
                  + vec3(1.0, 0.86, 0.42) * rim * 0.24
                  + vec3(1.0) * fresnel * 0.10;

  float shadowField = smoothstep(thr - 0.35, thr - 0.05, field);
  vec3 bg = bgClean * (1.0 - shadowField * 0.06);

  float borderOuter = smoothstep(thr - 0.10, thr - 0.01, field);
  float borderInner = smoothstep(thr + 0.0, thr + 0.06, field);
  float border = borderOuter * (1.0 - borderInner) * 0.28;

  vec3  col = mix(bg, glassColor, edge);
  col += vec3(1.0) * border;

  gl_FragColor = vec4(col, 1.0);
}
`;

const canvasFontStack =
  "'Poppins', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

function setFittedFont(
  ctx: CanvasRenderingContext2D,
  text: string,
  targetSize: number,
  minSize: number,
  maxSize: number,
  maxWidth: number,
  weight: number
) {
  let size = Math.min(maxSize, Math.max(minSize, targetSize));

  while (size > minSize) {
    ctx.font = `${weight} ${Math.round(size)}px ${canvasFontStack}`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 2;
  }

  ctx.font = `${weight} ${Math.round(size)}px ${canvasFontStack}`;
  return size;
}

function drawWallpaperText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fillStyle: string | CanvasGradient,
  opacity: number
) {
  ctx.save();
  ctx.globalAlpha = opacity * 0.22;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(text, x + 2, y + 2);
  ctx.fillStyle = '#b69133';
  ctx.fillText(text, x - 2, y - 2);

  ctx.globalAlpha = opacity;
  ctx.shadowColor = 'rgba(128, 88, 20, 0.38)';
  ctx.shadowBlur = 26;
  ctx.shadowOffsetY = 9;
  ctx.fillStyle = fillStyle;
  ctx.fillText(text, x, y);
  ctx.restore();
}

interface DrawBackgroundTextureOptions {
  showTitle?: boolean;
}

// Draw the visual layer that is refracted by the liquid-glass bubbles.
export function drawBackgroundTexture(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  options: DrawBackgroundTextureOptions = {}
) {
  const { showTitle = true } = options;
  const grd = ctx.createLinearGradient(0, 0, width * 0.78, height);
  grd.addColorStop(0, '#fffdf8');
  grd.addColorStop(0.32, '#fff4cf');
  grd.addColorStop(0.68, '#f1d982');
  grd.addColorStop(1, '#b69133');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.38;
  for (let i = 0; i < 5; i++) {
    const cx = width * (0.2 + i * 0.18);
    const cy = height * (0.3 + Math.sin(i * 1.3) * 0.25);
    const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * 0.35);
    const hue = 36 + i * 8;
    rg.addColorStop(0, `hsla(${hue}, 95%, 82%, 0.55)`);
    rg.addColorStop(1, `hsla(${hue}, 75%, 54%, 0)`);
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.restore();

  if (!showTitle) return;

  const centerX = width * 0.5;
  const titleCenterY = height * 0.5;
  const apaText = 'Apa Itu';
  const nanoText = 'Nano Bubble?';
  const isNarrow = width < 640;

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '-0.04em';

  const apaSize = setFittedFont(
    ctx,
    apaText,
    isNarrow ? width * 0.14 : width * 0.085,
    isNarrow ? width * 0.07 : width * 0.045,
    height * 0.16,
    isNarrow ? width * 0.82 : width * 0.72,
    800
  );

  const nanoSize = setFittedFont(
    ctx,
    nanoText,
    isNarrow ? width * 0.16 : width * 0.092,
    isNarrow ? width * 0.078 : width * 0.05,
    height * 0.17,
    isNarrow ? width * 0.9 : width * 0.86,
    800
  );

  const titleGap = Math.max(height * 0.012, Math.min(apaSize, nanoSize) * 0.12);
  const titleHeight = apaSize + titleGap + nanoSize;
  const apaY = titleCenterY - titleHeight / 2 + apaSize / 2;
  const nanoY = titleCenterY + titleHeight / 2 - nanoSize / 2;

  drawWallpaperText(ctx, apaText, centerX, apaY, 'rgba(76, 48, 10, 0.9)', 0.9);

  const goldGradient = ctx.createLinearGradient(width * 0.16, 0, width * 0.84, 0);
  goldGradient.addColorStop(0, '#fff2a6');
  goldGradient.addColorStop(0.48, '#d9aa36');
  goldGradient.addColorStop(1, '#fff6bf');

  drawWallpaperText(ctx, nanoText, centerX, nanoY, goldGradient, 0.9);
  ctx.restore();
}

// Kept temporarily as a visual reference for the previous canvas layout.
function drawLegacyBackgroundTexture(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  // Gradient background
  const grd = ctx.createLinearGradient(0, 0, width * 0.6, height);
  grd.addColorStop(0, '#e8dbc8');
  grd.addColorStop(0.35, '#5b8cdb');
  grd.addColorStop(0.6, '#2d6fd4');
  grd.addColorStop(1, '#1a3fa0');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, width, height);

  // Decorative colour waves
  ctx.save();
  ctx.globalAlpha = 0.35;
  for (let i = 0; i < 5; i++) {
    const cx = width * (0.2 + i * 0.18);
    const cy = height * (0.3 + Math.sin(i * 1.3) * 0.25);
    const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * 0.35);
    const hue = 200 + i * 25;
    rg.addColorStop(0, `hsla(${hue}, 80%, 65%, 0.6)`);
    rg.addColorStop(1, `hsla(${hue}, 60%, 40%, 0)`);
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.restore();

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Badge text (small, at top)
  const badgeSize = Math.round(width * 0.014);
  ctx.font = `500 ${badgeSize}px 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.globalAlpha = 0.9;
  ctx.fillText('Teknologi Inti Raho Premier', width * 0.5, height * 0.12);
  ctx.globalAlpha = 1;

  // Main Hero Title - "Apa Itu"
  const h1Size = Math.round(width * 0.08);
  ctx.font = `700 ${h1Size}px 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
  ctx.fillText('Apa Itu', width * 0.5, height * 0.25);

  // Main Hero Title - "Nano Bubble?" (with gradient effect simulation)
  const h2Size = Math.round(width * 0.09);
  ctx.font = `700 ${h2Size}px 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
  
  // Simulate gradient by using golden color
  ctx.fillStyle = '#D6B85A';
  ctx.fillText('Nano Bubble?', width * 0.5, height * 0.35);
  ctx.fillStyle = '#ffffff';

  // Subtitle
  const h3Size = Math.round(width * 0.028);
  ctx.font = `600 ${h3Size}px 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
  ctx.fillText('Teknologi yang Menjadi Fondasi', width * 0.5, height * 0.44);
  ctx.fillText('Inovasi Kami', width * 0.5, height * 0.44 + h3Size * 1.2);

  // Description paragraph (multiline)
  const descSize = Math.round(width * 0.016);
  ctx.font = `400 ${descSize}px 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
  ctx.globalAlpha = 0.85;
  
  const descLines = [
    'Nano Bubble adalah gelembung gas berukuran nano yang memiliki',
    'karakteristik unik termasuk stabilitas tinggi dan luas permukaan besar.',
    'Karakteristik ini menjadikannya salah satu teknologi yang terus diteliti',
    'untuk berbagai kebutuhan kesehatan.'
  ];
  
  let yPos = height * 0.54;
  descLines.forEach((line) => {
    ctx.fillText(line, width * 0.5, yPos);
    yPos += descSize * 1.4;
  });
  ctx.globalAlpha = 1;

  // Feature labels (4 features in a row)
  const featureSize = Math.round(width * 0.015);
  ctx.font = `600 ${featureSize}px 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
  
  const features = [
    'Stabilitas yang Tinggi',
    'Luas Permukaan Besar',
    'Potensi Pengantaran Gas',
    'Area Riset Berkembang'
  ];
  
  const startX = width * 0.15;
  const spacing = width * 0.22;
  yPos = height * 0.78;
  
  features.forEach((feature, i) => {
    const xPos = startX + (i * spacing);
    ctx.fillText(feature, xPos, yPos);
    
    // Feature description (smaller, lighter)
    ctx.font = `400 ${Math.round(featureSize * 0.75)}px 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
    ctx.globalAlpha = 0.65;
    ctx.fillText(
      i === 0 ? 'Nano Bubble dapat' :
      i === 1 ? 'Ukuran nano memberikan' :
      i === 2 ? 'Memungkinkan distribusi' :
      'Terus dieksplorasi',
      xPos, yPos + featureSize * 1.5
    );
    ctx.globalAlpha = 1;
    ctx.font = `600 ${featureSize}px 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
  });

  // CTA text at bottom
  const ctaSize = Math.round(width * 0.018);
  ctx.font = `500 ${ctaSize}px 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
  ctx.globalAlpha = 0.9;
  ctx.fillText('Pelajari Nano Bubble Lebih Lanjut →', width * 0.5, height * 0.92);
  ctx.globalAlpha = 1;
}
