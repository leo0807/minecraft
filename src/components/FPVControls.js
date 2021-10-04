import React, { useEffect } from 'react';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';
import { useThree, extend } from 'react-three-fiber';
import { useRef } from 'react';

extend({ PointerLockControlsImpl });

export const FPVControls = (props) => {
    const { camera, gl } = useThree();
    const controls = useRef();
    // const dom = document.getElementsByTagName('canvas');
    useEffect(() => {
        // dom.onclick = function () {
        //     controls.current.lock();
        // }
        document.addEventListener('click', () => {
            // Lock control to the carmera
            // 用来放置箱子的动作
            controls.current.lock();
        });

    }, []);

    return (
        <pointerLockControlsImpl
            ref={controls}
            args={[camera, gl.domElement]}
            {...props}
        />
    );
};