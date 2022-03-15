<template>
  <div class="content-anim">
    <canvas class="webgl"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export default {
  mounted() {
    this.$nextTick(() => {
      this.$store.commit('SET_PAGE_READY', true)

      // Canvas
      const canvas = document.querySelector('canvas.webgl')

      // Scene
      const scene = new THREE.Scene()

      const debugObject = {}
      debugObject.depthColor = '#000000'
      debugObject.surfaceColor = '#0000e8'

      //DRACO LOADER
      const dracoLoader = new DRACOLoader()
      // Optimisation : put DRACO to a Worker (a new Threat of CPU)
      dracoLoader.setDecoderPath('/draco/')
      dracoLoader.load

      // Loaders
      const gltfLoader = new GLTFLoader()
      let mixer = null
      let actions = []
      let island = null
      /**
       *
       * ISLAND GLTF LOAD
       */
      // GLTF LOADER
      gltfLoader.setDRACOLoader(dracoLoader)
      gltfLoader.load(
        '/models/island/island.glb',
        (gltf) => {
          console.log('success loading gltf !')

          // Animation of the object
          mixer = new THREE.AnimationMixer(gltf.scene)
          for (const action of gltf.animations) {
            actions.push(mixer.clipAction(action))
          }
          actions[0].play()

          gltf.scene.scale.set(0.1, 0.1, 0.1)
          gltf.scene.position.set(0, -0.005, 0)
          island = gltf.scene
          scene.add(gltf.scene)
        },
        (progress) => {
          console.log('loading gltf in progress !')
        },
        (error) => {
          console.log('error loading gltf !')
          console.log(error)
        }
      )

      /**
       * Water
       */
      // Geometry
      const waterGeometry = new THREE.PlaneGeometry(20, 20, 512, 512)

      // Material
      const waterMaterial = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        vertexShader: `
  uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallWavesIterations;

varying float vElevation;

// Classic Perlin 3D Noise 
// by Stefan Gustavson
//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}
vec4 taylorInvSqrt(vec4 r)
{
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P)
{
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
}

void main(){
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) * 
                      sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
                      uBigWavesElevation;

    for(float i = 1.0; i <= uSmallWavesIterations ; i++){
        elevation -= abs(
            cnoise(
                vec3(
                    modelPosition.xz * uSmallWavesFrequency * i,
                    uTime * uSmallWavesSpeed
                )
            ) * uSmallWavesElevation / i);
    }
    
    // create little waves
    
    
    
    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;    

    vElevation = elevation;
}
  `,
        fragmentShader: `
  uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main(){
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
    gl_FragColor = vec4(color, 1.0);
}
  
  `,
        uniforms: {
          uTime: {
            value: 0,
          },
          uBigWavesElevation: {
            value: 0.022,
          },
          uBigWavesFrequency: {
            value: new THREE.Vector2(0, 0),
          },
          uBigWavesSpeed: {
            value: 0.06,
          },
          uSmallWavesElevation: {
            value: 0.03,
          },
          uSmallWavesFrequency: {
            value: 4.0,
          },
          uSmallWavesSpeed: {
            value: 0.2,
          },
          uSmallWavesIterations: {
            value: 1.2,
          },
          uDepthColor: {
            value: new THREE.Color(debugObject.depthColor),
          },
          uSurfaceColor: {
            value: new THREE.Color(debugObject.surfaceColor),
          },
          uColorOffset: {
            value: 0.08,
          },
          uColorMultiplier: {
            value: 10,
          },
        },
      })

      // Mesh
      const water = new THREE.Mesh(waterGeometry, waterMaterial)
      water.rotation.x = -Math.PI * 0.5
      scene.add(water)

      /**
       * Utils
       */
      const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
      }

      // Fog
      const fog = new THREE.Fog('#020220', 1, 4)
      //scene.fog = fog;

      /**
       * Lights
       */
      var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1)
      hemiLight.color.setHex(0.6, 0.75, 0.5)
      hemiLight.groundColor.setHex(0.095, 0.5, 0.5)
      hemiLight.position.set(50, 50, 50)
      scene.add(hemiLight)

      var dirLight = new THREE.DirectionalLight(0xffffff, 1)
      dirLight.position.set(-1.5, 10, 10)
      //dirLight.position.multiplyScalar(50);
      dirLight.name = 'dirlight'
      dirLight.shadowCameraVisible = true

      scene.add(dirLight)

      dirLight.castShadow = true

      /**
       * Params of objects
       */
      const paramsObj = {
        count: 100,
      }

      /**
       * Objects in the sky
       */

      /**
       * Sizes
       */
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })

      /**
       * Camera
       */
      // Base camera
      const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100
      )
      camera.position.x = 0
      camera.position.y = 0.29
      camera.position.z = 0.83

      camera.rotation.x = -0.5
      scene.add(camera)

      // Controls
      const controls = new OrbitControls(camera, canvas)
      //controls.enableDamping = true;

      controls.autoRotate = true
      controls.enableRotate = false
      controls.enableZoom = false
      controls.autoRotateSpeed = 0.8
      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
      })
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.physicallyCorrectLights = true
      renderer.outputEncoding = THREE.sRGBEncoding
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 5
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFShadowMap
      renderer.setClearColor(0x000000, 0)

      /**
       * Animate
       */
      const clock = new THREE.Clock()
      let previousTime = 0
      const tick = () => {
        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - previousTime
        previousTime = elapsedTime

        // Update uniforms Shaders
        waterMaterial.uniforms.uTime.value = elapsedTime

        // update the Mixer animation model
        if (mixer) {
          mixer.update(deltaTime)
        }

        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
      }

      tick()
    })
  },
}
</script>

<style lang="css" scoped>
.content-anim {
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  background: radial-gradient(circle, #ffffff 0%, #e2f4ff 30%, #6767f8 100%);
}

.webgl {
  position: absolute;
  inset: 0;
  outline: none;
  overflow: hidden;
}
</style>
