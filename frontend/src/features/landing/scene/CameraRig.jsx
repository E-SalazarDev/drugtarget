
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    target.current.x = pointer.x * 0.4;
    target.current.y = pointer.y * 0.22;

    camera.position.x += (target.current.x - camera.position.x) * 0.035;
    camera.position.y += (0.2 + target.current.y - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
  });

  return null;
}