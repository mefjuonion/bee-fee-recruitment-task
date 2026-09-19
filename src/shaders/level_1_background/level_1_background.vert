in vec2 aPosition;

out vec2 vLocalPosition;

uniform mat3 uProjectionMatrix;
uniform mat3 uWorldTransformMatrix;

void main(void) {
    vLocalPosition = aPosition;

    mat3 modelViewProjectionMatrix = uProjectionMatrix * uWorldTransformMatrix;
    gl_Position = vec4((modelViewProjectionMatrix * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
}
