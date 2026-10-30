import * as THREE from 'three';
import { scene, camera, renderer } from './scene';

// 1. Evaluate Polynomial Coefficients for Cubic Curve: y = 0.1\*x^3 - 0.2\*x^2 - 0.5\*x + 1 
const a = 0.1, b = -0.2, c = -0.5, d = 1.0; 
const curvePoints = []; 
const xMin = -5, xMax = 5, samples = 100; 
for (let i = 0; i <= samples; i++) { 
    const x = xMin + (i / samples) * (xMax - xMin); 
    const y = a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d; 
    curvePoints.push(new THREE.Vector3(x, y, 0)); 
} 

const cubicGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints); 
const cubicMaterial = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 3 }); 
const cubicCurveMesh = new THREE.Line(cubicGeometry, cubicMaterial); 
cubicCurveMesh.matrixAutoUpdate = false; 
scene.add(cubicCurveMesh);

// Apply 3D Matrix Transformation to Cubic Curve 
const transformMatrix = new THREE.Matrix4().makeRotationZ(Math.PI / 6); 
transformMatrix.setPosition(new THREE.Vector3(1, -2, 0)); 
cubicCurveMesh.matrix.copy(transformMatrix);

// 2. Demonstrating Normal Vector Matrix Calculation 
const modelMatrix = new THREE.Matrix4().makeScale(2.0, 0.5, 1.0); 

// Non-uniform scaling  
// Calculate Inverse Transpose Matrix for Normals 
const normalMatrix = new THREE.Matrix3(); 
normalMatrix.getNormalMatrix(modelMatrix); 
console.log("Model Matrix (Non-uniform scale):", modelMatrix.elements); 
console.log("Correct Normal Matrix (M^-T):", normalMatrix.elements);

export function animate() { 
    requestAnimationFrame(animate); 
    renderer.render(scene, camera); 
} 