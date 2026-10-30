import * as THREE from 'three';

export class SpatialGeometryViewer extends HTMLElement { 
    constructor() { 
        super(); 
        this.attachShadow({ mode: 'open' });
        // Component State 
        this.animationId = null; 
    } 
    
    connectedCallback() { 
        // Setup Container 
        const container = document.createElement('div'); 
        container.style.width = '100%'; 
        container.style.height = '100%'; 
        container.style.position = 'relative'; 
        
        const canvas = document.createElement('canvas'); 
        canvas.style.width = '100%'; 
        canvas.style.height = '100%'; 
        canvas.style.display = 'block'; 
        
        container.appendChild(canvas); 
        this.shadowRoot.appendChild(container);

        // Init Three.js Environment 
        this.initThree(canvas); 
        
        // Event Listeners 
        this.handleResize = this.onWindowResize.bind(this); 
        window.addEventListener('resize', this.handleResize); 
    } 
    
    initThree(canvas) { 
        const width = this.clientWidth || 800; 
        const height = this.clientHeight || 600; 
        this.scene = new THREE.Scene(); 
        this.scene.background = new THREE.Color(0x111827); 
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000); 
        this.camera.position.set(5, 5, 10); 
        this.camera.lookAt(0, 0, 0); 
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); 
        this.renderer.setSize(width, height); 
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
        // Sample Geometry Payload: Polyhedron 
        this.geometry = new THREE.IcosahedronGeometry(2, 0); 
        this.material = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true }); 
        this.mesh = new THREE.Mesh(this.geometry, this.material); 
        this.scene.add(this.mesh); 
        // Start Loop 
        this.animate = this.animate.bind(this); 
        this.animate(); 
    } 
    
    animate() { 
        this.animationId = requestAnimationFrame(this.animate); 
        if (this.mesh) { 
            this.mesh.rotation.x += 0.005; 
            this.mesh.rotation.y += 0.01; 
        } 
        
        this.renderer.render(this.scene, this.camera); 
    } 
    
    onWindowResize() { 
        if (!this.renderer || !this.camera) return; 
        const width = this.clientWidth; 
        const height = this.clientHeight; // Update Camera Projection Matrix 
        
        this.camera.aspect = width / height; 
        this.camera.updateProjectionMatrix(); // Update Renderer Dimensions 
        this.renderer.setSize(width, height); 
    } 
    
    disconnectedCallback() { 
        // Cleanup resources when component unmounts 
        window.removeEventListener('resize', this.handleResize); 
        cancelAnimationFrame(this.animationId); 
        if (this.geometry) this.geometry.dispose(); 
        if (this.material) this.material.dispose(); 
        if (this.renderer) this.renderer.dispose(); 
    } 

} 

// Register Custom Element 
customElements.define('spatial-geometry-viewer', SpatialGeometryViewer);