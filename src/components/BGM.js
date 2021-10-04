import React from 'react';

export default function BGM({ src, controls, loop, preload }) {
    return (
        <audio controls={controls || false} loop={loop || false} preload={preload || 'auto'}>
            <source src={src} />
        </audio>
    )
}
