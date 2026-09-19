#pragma glslify: fbm = require(./fbm.glsl)

// Bottom-left <-> top-right, pre-normalized (screen space: up is -y).
const vec2 SWAY_AXIS = vec2(0.70710678, -0.70710678);

// Dappled, slowly swaying shadow-and-light pattern, as if canopy shadow was
// drifting across the ground - a scalar in [0, 1] meant to tint a floor color.
float forestShade(vec2 sampleCoord, float frequency, float time, float swaySpeed, float swayAmount) {
vec2 drift = SWAY_AXIS * sin(time * swaySpeed) * swayAmount;
float height = fbm((sampleCoord + drift) * frequency) * 0.5 + 0.5;
return smoothstep(0.25, 0.8, height);
}

#pragma glslify: export(forestShade)
