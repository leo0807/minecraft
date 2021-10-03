import create from 'zustand';
import { nanoid } from 'nanoid';

// LocalStorage保存初始状态
const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
    window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set) => ({
    // texture: 'dirt',
    // 初始状态
    cubes: getLocalStorage('world') || [],
    addCube: (x, y, z) =>
        set((state) => ({
            cubes: [
                // 以前的所有cubes
                ...state.cubes,
                { key: nanoid(), pos: [x, y, z], texture: state.texture },
            ],
        })),
    removeCube: (x, y, z) => {
        set((state) => ({
            cubes: state.cubes.filter((cube) => {
                const [_x, _y, _z] = cube.pos;
                return _x !== x || _y !== y || _z !== z;
            }),
        }));
    },
    setTexture: (texture) => {
        set(state => ({ texture }));
    },
    saveWorld: () =>
        set(state => {
            setLocalStorage('world', state.cubes);
        }),
}));