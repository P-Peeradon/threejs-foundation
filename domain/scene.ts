import * as THREE from 'three'; 

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

// camera
const fov: number = 75; // degrees
const aspect = window.innerWidth / window.innerHeight;
const near: number = 0.1;
const far: number = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 2, 5);

// renderer
const canvas: THREE.OffscreenCanvas | undefined = (document.querySelector('#webgl-canvas') as THREE.OffscreenCanvas) ?? undefined;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(
    window.innerWidth, 
    window.innerHeight
); 

export {scene, camera, renderer};