import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber';
import { useSphere } from 'use-cannon';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Vector3 } from 'three';
import { FPVControls } from './FPVControls';

const SPEED = 6;
export default function Player(props) {

    const {
        moveForward,
        moveBackward,
        moveLeft,
        moveRight,
        jump,
    } = useKeyboardControls();

    const { camera } = useThree();
    // Player
    const [ref, api] = useSphere(() => ({
        mass: 1,
        // 实现gravity
        type: 'Dynamic',
        ...props
    }));
    const velocity = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe(v => (velocity.current = v));
    }, [api.velocity])
    // camera的位置为player的位置
    useFrame(() => {
        if (Math.abs(ref.current.position.x) >= 50) ref.current.position.x = 49;
        if (Math.abs(ref.current.position.z) >= 50) ref.current.position.z = 49;
        camera.position.copy(ref.current.position);

        // console.log(camera.position);
        const direction = new Vector3();
        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        );
        const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0);
        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);
        api.velocity.set(direction.x, velocity.current[1], direction.z);
        if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
            api.velocity.set(velocity.current[0], 8, velocity.current[2]);
        }
    });

    return (
        <>
            <FPVControls />
            <mesh ref={ref} />
        </>
    )
}
