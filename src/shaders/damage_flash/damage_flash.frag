in vec2 vTextureCoord;

out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uIntensity;

void main(void) {
vec4 color = texture(uTexture, vTextureCoord);
finalColor = mix(color, vec4(1.0, 0.0, 0.0, 1.0), uIntensity);
}
