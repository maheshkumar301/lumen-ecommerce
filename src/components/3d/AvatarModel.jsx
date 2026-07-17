import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export const AvatarModel = (props) => {
  const group = useRef();
  // Using the classic RobotExpressive animated model as a placeholder
  const { scene, animations } = useGLTF('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb');
  
  // Safely clone the SkinnedMesh and its skeleton so it can be rendered multiple times
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // Bind the animations to the cloned group
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Attempt to play a waving animation when it loads
    if (actions['Wave']) {
      actions['Wave'].reset().fadeIn(0.5).play();
      
      // After waving, transition to Idle
      const timeout = setTimeout(() => {
        if (actions['Idle']) {
          actions['Wave'].fadeOut(1);
          actions['Idle'].reset().fadeIn(1).play();
        }
      }, 3300);
      return () => clearTimeout(timeout);
    } else if (actions['Idle']) {
      actions['Idle'].play();
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      {/* We position it down slightly and scale it so it looks good on screen */}
      <primitive object={clone} scale={0.6} position={[0, -1.8, 0]} />
    </group>
  );
};

// Preload the model so it loads faster when the user visits the page
useGLTF.preload('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb');
