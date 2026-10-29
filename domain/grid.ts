import * as THREE from 'three';
import { scene, camera, renderer } from './scene';

// Lighting setup for depth rendering 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); 
scene.add(ambientLight);

// Generate 8x8 Spatial Board using loops 
const boardSize = 8; 
const tileGeometry = new THREE.BoxGeometry(1, 0.2, 1);

for (let row = 0; row < boardSize; row++) { 
    for (let col = 0; col < boardSize; col++) { 
        // Determine color parity 
        const isEven = (row + col) % 2 === 0; 
        const tileMaterial = new THREE.MeshStandardMaterial({ color: isEven ? 0xe2e8f0 : 0x1e293b, roughness: 0.4 }); 
        const tile = new THREE.Mesh(tileGeometry, tileMaterial); 
        // Offset positions by subtracting half-width (3.5) to center at origin 
        tile.position.x = col - 3.5; 
        tile.position.y = tile.position.y = Math.sin(row * 0.5) * Math.cos(col * 0.5) * 0.5;
        tile.position.z = row - 3.5; 
        scene.add(tile); 
    } 
}

// Step 2: Construct Custom Line Geometry using BufferGeometry 
const points = []; 
points.push(new THREE.Vector3(-4, 1, -4)); 
points.push(new THREE.Vector3(4, 1, 4)); 
points.push(new THREE.Vector3(-4, 1, 4)); 
points.push(new THREE.Vector3(4, 1, -4));

const lineGeometry = new THREE.BufferGeometry().setFromPoints(points); 
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 }); 
const crossLines = new THREE.LineSegments(lineGeometry, lineMaterial); 
scene.add(crossLines);

export function render() { 
    requestAnimationFrame(render); 
    renderer.render(scene, camera); 
}