// Three.js 3D 粒子系统
(function() {
    const container = document.getElementById('particles-container');

    // 场景、相机、渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    camera.position.z = 50;

    // 粒子参数
    const particleCount = window.innerWidth < 768 ? 2000 : 5000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    // 初始化粒子位置和速度
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = (Math.random() - 0.5) * 200;
        positions[i + 2] = (Math.random() - 0.5) * 200;

        velocities.push({
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // 粒子材质
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x64ffda,
        size: 0.8,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // 连线系统
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x64ffda,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending
    });

    let lineSystem = null;

    // 鼠标位置（3D 空间）
    const mouse = { x: 0, y: 0 };

    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // 动画循环
    function animate() {
        requestAnimationFrame(animate);

        const positions = particleSystem.geometry.attributes.position.array;

        // 更新粒子位置
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // 应用速度
            positions[i3] += velocities[i].x;
            positions[i3 + 1] += velocities[i].y;
            positions[i3 + 2] += velocities[i].z;

            // 边界检测
            if (Math.abs(positions[i3]) > 100) velocities[i].x *= -1;
            if (Math.abs(positions[i3 + 1]) > 100) velocities[i].y *= -1;
            if (Math.abs(positions[i3 + 2]) > 100) velocities[i].z *= -1;

            // 鼠标交互（力场效果）
            const mouseX = mouse.x * 50;
            const mouseY = mouse.y * 50;

            const dx = positions[i3] - mouseX;
            const dy = positions[i3 + 1] - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 20) {
                const force = (20 - distance) / 20;
                positions[i3] += dx * force * 0.1;
                positions[i3 + 1] += dy * force * 0.1;
            }
        }

        particleSystem.geometry.attributes.position.needsUpdate = true;

        // 绘制连线
        if (lineSystem) {
            scene.remove(lineSystem);
        }

        const linePositions = [];
        const maxDistance = 15;

        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const i3 = i * 3;
                const j3 = j * 3;

                const dx = positions[i3] - positions[j3];
                const dy = positions[i3 + 1] - positions[j3 + 1];
                const dz = positions[i3 + 2] - positions[j3 + 2];
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance < maxDistance) {
                    linePositions.push(
                        positions[i3], positions[i3 + 1], positions[i3 + 2],
                        positions[j3], positions[j3 + 1], positions[j3 + 2]
                    );
                }
            }
        }

        if (linePositions.length > 0) {
            const lineGeometry = new THREE.BufferGeometry();
            lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
            lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
            scene.add(lineSystem);
        }

        // 缓慢旋转
        particleSystem.rotation.y += 0.0005;
        particleSystem.rotation.x += 0.0002;

        renderer.render(scene, camera);
    }

    animate();

    // 窗口大小调整
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();
