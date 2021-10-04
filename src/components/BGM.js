import React, { useEffect, useState } from 'react';

export default function BGM({ src, controls, loop, preload, autoplay }) {
    const [audio] = useState(new Audio(src));
    useEffect(() => {

        audio.play();
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            audio.play();
        });
        audio.addEventListener('playing', () => console.log('playing'));
        audio.addEventListener('pasue', () => console.log('pasue'));

        return () => audio.removeEventListener('ended', () => {
            audio.currentTime = 0;
            audio.play()
        });
    }, [audio]);

    return (
        <div></div>
    )
}
