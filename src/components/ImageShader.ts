export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`

export const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D textureMap;
  uniform sampler2D textureMap2;
  uniform sampler2D disp;

  uniform float _rot;
  uniform float dispFactor;
  uniform float dispFactor2;
  uniform float effectFactor;

  vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
   }

  void main() {
    vec2 uv = vUv;

    vec4 disp = texture2D(disp, uv);
    vec2 distortedPosition = vec2(uv.x + max(dispFactor, dispFactor2) * (disp.r * effectFactor), uv.y);
    vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r * effectFactor), uv.y);

    vec4 _texture = texture2D(textureMap, distortedPosition);
    vec4 _texture2 = texture2D(textureMap2, distortedPosition2);
    
    vec4 finalTexture = mix(_texture, _texture2, dispFactor);
  
    gl_FragColor = finalTexture;
  }`
