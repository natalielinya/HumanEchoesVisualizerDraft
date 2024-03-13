// noprotect

// https://github.com/ZRNOF/Shox
import * as Shox from "https://cdn.jsdelivr.net/npm/shox@1.0.0/src/Shox.js"

export const frag = `#version 300 es
  precision mediump float;

  uniform vec2 canvasSize;
  uniform vec2 mouse;
  uniform float time;

  ${Shox.displace}
  ${Shox.noiseMath}
  ${Shox.snoise3D}
  ${Shox.snoise3DImage}
  ${Shox.gradient}
  ${Shox.zcPalette(5)}
  ${Shox.extend}
  ${Shox.smooth}

  in vec2 vTexCoord;
  out vec4 fragColor;
  void main() {
    vec2 uv = vTexCoord;
    vec2 mo = mouse;
    mo = min(max(vec2(0.), mouse), vec2(1.));

    uv-=0.5;
    uv.x *= canvasSize.x/canvasSize.y;

    vec2 muv = smoo3(mirror(uv, 1.));

    float scal = 2.;
    float gain = mo.y*100.;
    float ofst = .5;
    float expo = mo.x*2.5;
    vec3  move = vec3(0., 0., time*0.0025);
    vec4 dimg = snoise3DImage(1.*uv, scal, gain, ofst, expo, move);

    float wei = 0.1;
    vec2 duv = smoo3(displace(muv, dimg.rg, ofst, wei));

    vec2 puv = smoo3(conical(duv, vec2(.5), 5., time*0.001));

    vec4 colors[] = vec4[](
      vec4(0.086, 0.18, 0.019, 1.0), 
      vec4(0.14, 0.41, 0.2, 1.0),
      vec4(1.0, 1.0,0.85, 1.0),
			vec4(0.8, 0.5, 0.0, 1.0),
      vec4(0.086, 0.18, 0.019, 1.0)
			
			//vec4(0.0, 0.0, 0.0, 1.0): Black (RGB: 0, 0, 0) with full opacity (Alpha: 1.0)
	//vec4(0.8, 0.5, 0.0, 1.0): An orange-ish color (RGB: 0.8, 0.5, 0.0) with full opacity (Alpha: 1.0)
	//vec4(1.0, 1.0, 1.0, 1.0): White (RGB: 1.0, 1.0, 1.0) with full opacity (Alpha: 1.0)
	//vec4(0.3, 0.6, 0.7, 1.0): A light blue color (RGB: 0.3, 0.6, 0.7) with full opacity (Alpha: 1.0)
	//vec4(0.0, 0.0, 0.0, 1.0): Again, black with full opacity
    );
    float positions[] = float[](
      0.0,
      0.25,
      0.5,
      0.75,
      1.0
    );
    vec4 color = smoo3(palette(puv.x, colors, positions));

    fragColor = smoo3(color);
  }
`

export const vert = `#version 300 es

  in vec4 aPosition;
  in vec2 aTexCoord;

  out vec2 vTexCoord;

  void main() {
    vTexCoord = aTexCoord;
    gl_Position = aPosition;
  }
`
