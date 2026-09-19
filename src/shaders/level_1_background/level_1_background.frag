#pragma glslify: patchReveal = require(../common/patchReveal.glsl)
#pragma glslify: forestShade = require(../common/forestShade.glsl)

in vec2 vLocalPosition;

out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uNextTexture;

uniform float uScrollOffset;
uniform float uFrequency;
uniform float uTileSize;
uniform float uTime;
uniform float uSwaySpeed;
uniform float uSwayAmount;
uniform float uTransitionProgress;

void main(void) {
    vec2 sampleCoord = vec2(vLocalPosition.x, vLocalPosition.y - uScrollOffset);

    float shade = forestShade(sampleCoord, uFrequency, uTime, uSwaySpeed, uSwayAmount);

    vec2 uv = sampleCoord / uTileSize;
    vec4 texColor = texture(uTexture, uv);
    vec4 nextTexColor = texture(uNextTexture, uv);

    vec3 shaded = mix(texColor.rgb * 0.7, texColor.rgb * 1.35, shade);
    vec3 nextShaded = mix(nextTexColor.rgb * 0.7, nextTexColor.rgb * 1.35, shade);

    float oldAmount = patchReveal(sampleCoord, uFrequency, uTransitionProgress);

    vec3 finalRgb = mix(nextShaded, shaded, oldAmount);

    finalColor = vec4(finalRgb, texColor.a);
}
