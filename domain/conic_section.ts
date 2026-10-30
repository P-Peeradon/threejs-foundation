import * as THREE from 'three';
import { scene, camera, renderer } from './scene';

// 1. Create Conic Section (Circle transformed into Ellipse) 
const circleRadius = 2; 
const segments = 64; 
const circleGeometry = new THREE.CircleGeometry(circleRadius, segments); 

// Remove center vertex to keep perimeter ring 
circleGeometry.index = null; 
circleGeometry.deleteAttribute('normal'); 
const conicMaterial = new THREE.LineBasicMaterial({ color: 0x38bdf8 }); 
const conicMesh = new THREE.LineLoop(circleGeometry, conicMaterial); 
scene.add(conicMesh); 
// Disable automatic matrix update for manual matrix control  
conicMesh.matrixAutoUpdate = false; 

// Construct Composite Matrix: Scale non-uniformly (Ellipse) then Translate 
const scaleMatrix = new THREE.Matrix4().makeScale(1.8, 0.8, 1.0); // Conic eccentricity adjustment 
const rotationMatrix = new THREE.Matrix4().makeRotationZ(Math.PI / 4); // 45-degree rotation 
const translationMatrix = new THREE.Matrix4().makeTranslation(-2, 1, 0); 

// Combine matrices: Matrix multiplication M = Translation * Rotation * Scale 
const compositeMatrix = new THREE.Matrix4(); 
compositeMatrix.multiplyMatrices(translationMatrix, rotationMatrix); 
compositeMatrix.multiply(scaleMatrix);

// Apply composite matrix to object 
conicMesh.matrix.copy(compositeMatrix);

// 2. Create Straight Line Segment 
const linePoints = [new THREE.Vector3(-3, 0, 0), new THREE.Vector3(3, 0, 0)]; 
const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints); 
const lineMat = new THREE.LineBasicMaterial({ color: 0xfacc15 }); 
const lineMesh = new THREE.Line(lineGeo, lineMat); 
lineMesh.matrixAutoUpdate = false; 
scene.add(lineMesh); 

// Apply Shear Matrix to Line 
// Shear X relative to Y 
const shearMatrix = new THREE.Matrix4().set( 1, 0.5, 0, 0, 0, 1, 0, -2, 0, 0, 1, 0, 0, 0, 0, 1 ); 
lineMesh.matrix.copy(shearMatrix);

export function animate() {
    requestAnimationFrame(animate); 
    renderer.render(scene, camera);
}