#pragma glslify: fbm = require(./fbm.glsl)

const float TRANSITION_EDGE = 0.05;

// Patches grow wherever this (world-space, stable) noise field is below the
// current transition progress - low values reveal first, and the ragged fbm
// contour keeps the growing edge looking torn, not blurred.
float patchReveal(vec2 sampleCoord, float frequency, float progress) {
float patchNoise = fbm(sampleCoord * frequency * 0.6) * 0.5 + 0.5;
return 1.0 - smoothstep(patchNoise - TRANSITION_EDGE, patchNoise + TRANSITION_EDGE, progress);
}

#pragma glslify: export(patchReveal)
