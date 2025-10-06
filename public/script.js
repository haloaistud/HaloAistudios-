// 🎬 Three.js Canvas Setup
const canvas = document.getElementById('canvas-3d');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const geometry = new THREE.TorusKnotGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
const knot = new THREE.Mesh(geometry, material);
scene.add(knot);

// ✨ Floating Particles
for (let i = 0; i < 100; i++) {
  const particleGeo = new THREE.SphereGeometry(0.02, 8, 8);
  const particleMat = new THREE.MeshBasicMaterial({ color: 0xff00ff });
  const particle = new THREE.Mesh(particleGeo, particleMat);
  particle.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  );
  scene.add(particle);
}

function animate() {
  requestAnimationFrame(animate);
  knot.rotation.x += 0.01;
  knot.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// 🧩 Tab Switching
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    contents[i].classList.add('active');
  });
});

// 🖥️ Responsive Canvas
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
