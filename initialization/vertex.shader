attribute vec2 vertexCoord;
void main(void) {
    gl_Position = vec4(vertexCoord, 0, 1);
}