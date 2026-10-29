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
renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

// geometry, material and mesh 
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5); 
const material = new THREE.MeshBasicMaterial({ color: 0x00fff0, wireframe: true }); 
const cube = new THREE.Mesh(geometry, material); 
scene.add(cube); 

// animation 
function animate() { 
    requestAnimationFrame(animate); // Continuous rotation 
    cube.rotation.x += 0.01; 
    cube.rotation.y += 0.01; 
    renderer.render(scene, camera); 
} 

animate();