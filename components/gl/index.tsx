import { Perf } from "r3f-perf";
import { Effects } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Particles } from "./particles";
import { VignetteShader } from "./shaders/vignetteShader";
import { useState, useEffect, useMemo } from "react";
import * as THREE from "three";

// Mouse tracking component that runs inside Canvas
function MouseTracker({ onMouseUpdate, planeScale }: { onMouseUpdate: (pos: THREE.Vector3) => void, planeScale: number }) {
  const { camera, size, viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Get canvas element to ensure correct coordinate reference
      const canvas = document.querySelector('#webgl canvas') as HTMLCanvasElement;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      // Convert to normalized device coordinates relative to canvas
      const ndcX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Raycast from camera to intersect Y=0 plane (XZ plane)
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // y=0 plane
      const intersection = new THREE.Vector3();
      if (!raycaster.ray.intersectPlane(plane, intersection)) {
        return;
      }

      // Clamp to particle plane bounds
      intersection.x = Math.max(-planeScale, Math.min(planeScale, intersection.x));
      intersection.z = Math.max(-planeScale, Math.min(planeScale, intersection.z));
      intersection.y = 0;

      const worldPos = intersection;


      onMouseUpdate(worldPos);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera, size, viewport, onMouseUpdate]);

  return null;
}

export const GL = ({ hovering }: { hovering: boolean }) => {
  // Mouse position state
  const [mousePos, setMousePos] = useState(() => new THREE.Vector3(0, 0, 0));

  // Mouse update callback
  const handleMouseUpdate = useMemo(() => (pos: THREE.Vector3) => {
    setMousePos(pos.clone());
  }, []);

  // Production values - no debug controls
  const speed = 1.0;
  const focus = 3.8;
  const aperture = 1.79;
  const size = 512;
  const noiseScale = 0.6;
  const noiseIntensity = 0.52;
  const timeScale = 1;
  const pointSize = 10.0;
  const opacity = 0.8;
  const planeScale = 10.0;
  const vignetteDarkness = 1.5;
  const vignetteOffset = 0.4;
  const useManualTime = false;
  const manualTime = 0;

  // Only show debug controls in development
  /* const {
    speed,
    focus,
    aperture,
    size,
    noiseScale,
    noiseIntensity,
    timeScale,
    pointSize,
    opacity,
    planeScale,
    vignetteDarkness,
    vignetteOffset,
    useManualTime,
    manualTime,
  } = useControls("Particle System", {
    speed: { value: 1.0, min: 0, max: 2, step: 0.01 },
    noiseScale: { value: 0.6, min: 0.1, max: 5, step: 0.1 },
    noiseIntensity: { value: 0.52, min: 0, max: 2, step: 0.01 },
    timeScale: { value: 1, min: 0, max: 2, step: 0.01 },
    focus: { value: 3.8, min: 0.1, max: 20, step: 0.1 },
    aperture: { value: 1.79, min: 0, max: 2, step: 0.01 },
    pointSize: { value: 10.0, min: 0.1, max: 10, step: 0.1 },
    opacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
    planeScale: { value: 10.0, min: 0.1, max: 10, step: 0.1 },
    size: {
      value: 512,
      options: [256, 512, 1024],
    },
    showDebugPlane: { value: false },
    vignetteDarkness: { value: 1.5, min: 0, max: 2, step: 0.1 },
    vignetteOffset: { value: 0.4, min: 0, max: 2, step: 0.1 },
    useManualTime: { value: false },
    manualTime: { value: 0, min: 0, max: 50, step: 0.01 },
  }); */
  return (
    <div id="webgl">
      <Canvas
        camera={{
          position: [
            1.2629783123314589, 2.664606471394044, -1.8178993743288914,
          ],
          fov: 50,
          near: 0.01,
          far: 300,
        }}
      >
        {/* <Perf position="top-left" /> */}
        <color attach="background" args={["#000"]} />
        <MouseTracker onMouseUpdate={handleMouseUpdate} planeScale={planeScale} />
        <Particles
          speed={speed}
          aperture={aperture}
          focus={focus}
          size={size}
          noiseScale={noiseScale}
          noiseIntensity={noiseIntensity}
          timeScale={timeScale}
          pointSize={pointSize}
          opacity={opacity}
          planeScale={planeScale}
          useManualTime={useManualTime}
          manualTime={manualTime}
          introspect={hovering}
          mousePos={mousePos}
          mouseInfluence={1.2}
          mouseRadius={1.0}
        />
        <Effects multisamping={0} disableGamma>
          <shaderPass
            args={[VignetteShader]}
            uniforms-darkness-value={vignetteDarkness}
            uniforms-offset-value={vignetteOffset}
          />
        </Effects>
      </Canvas>
    </div>
  );
};
