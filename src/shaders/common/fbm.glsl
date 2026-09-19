#pragma glslify: snoise = require(glsl-noise/simplex/2d)

float fbm(vec2 p) {
float value = 0.0;
float amplitude = 0.5;
for (int i = 0; i < 5; i++) {
    value += amplitude * snoise(p);
    p *= 2.0;
    amplitude *= 0.5;
}
return value;
}

#pragma glslify: export(fbm)
