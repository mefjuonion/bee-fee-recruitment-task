#pragma glslify: fbm = require(../common/fbm.glsl)

in vec2 vLocalPosition;

out vec4 finalColor;

uniform sampler2D uTexture;

uniform float uScrollOffset;
uniform float uFrequency;
uniform float uTileSize;
uniform float uTime;
uniform float uSwaySpeed;
uniform float uSwayAmount;

// Bottom-left <-> top-right, pre-normalized (screen space: up is -y).
const vec2 SWAY_AXIS = vec2(0.70710678, -0.70710678);

void main(void) {
    vec2 sampleCoord = vec2(vLocalPosition.x, vLocalPosition.y - uScrollOffset);

    vec2 drift = SWAY_AXIS * sin(uTime * uSwaySpeed) * uSwayAmount;

    float height = fbm((sampleCoord + drift) * uFrequency) * 0.5 + 0.5;

    vec2 uv = sampleCoord / uTileSize;
    vec4 texColor = texture(uTexture, uv);

    float shade = smoothstep(0.25, 0.8, height);
    vec3 shaded = mix(texColor.rgb * 0.7, texColor.rgb * 1.35, shade);

    finalColor = vec4(shaded, texColor.a);
}
