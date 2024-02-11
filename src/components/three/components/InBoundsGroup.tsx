import { useBoolean } from '@chakra-ui/react';
import { GroupProps, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { Power2 } from 'gsap';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Group, Vector3 } from 'three';

const BOUNDS = {
  min: -5,
  max: 5,
};

const InBoundsGroup: React.FC<PropsWithChildren & GroupProps> = ({
  children,
  ...props
}) => {
  const [isHidden, setIshidden] = useBoolean();
  const ref = useRef<Group>(null);

  // useEffect(() => {
  //   if (ref.current) {
  //     if (isHidden) {
  //       gsap.to(ref.current.scale, {
  //         y: 1,
  //         ease: Power2.easeOut,
  //         duration: 1,
  //       });
  //     } else {
  //       gsap.set(ref.current.scale, { y: 0 });
  //       gsap.to(ref.current.scale, {
  //         y: 1,
  //         ease: Power2.easeOut,
  //         duration: 1,
  //       });
  //     }
  //   }
  // }, [isHidden]);

  console.log('devmax', ref.current?.getWorldPosition(new Vector3()));

  useFrame(() => {
    if (ref.current) {
      const worldPos = ref.current.getWorldPosition(new Vector3());
      if (worldPos.x >= BOUNDS.min && worldPos.x <= BOUNDS.max) {
        // setIshidden.off();
        ref.current.visible = true;
      } else if (!isHidden) {
        ref.current.visible = false;
        // setIshidden.on();
      }
    }
  });

  return (
    <group {...props} ref={ref}>
      {children}
    </group>
  );
};

export default InBoundsGroup;
