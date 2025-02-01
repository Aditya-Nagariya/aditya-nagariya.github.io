// 3D Background Animation
function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return; // Ensure canvas exists

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00ffff, // Neon blue
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    initBackground();

    // GSAP animations
    gsap.from('.hero-content', {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: 'power4.out',
    });

    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
        });
    });
});

// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('active');
});

// Theme Toggle
document.querySelector('.theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = document.querySelector('.theme-toggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Dark Theme Styles (Optional)
const darkThemeStyles = `
    body.dark-theme {
        --primary: #ff00ff;
        --secondary: #86868b;
        --black: #ffffff;
        --white: #000000;
        --surface: #1d1d1f;
        --glass: rgba(0, 0, 0, 0.5);
        --glass-border: rgba(255, 255, 255, 0.1);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = darkThemeStyles;
document.head.appendChild(styleSheet);
