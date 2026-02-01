// 鼠标交互效果
(function() {
    const canvas = document.getElementById('mouse-trail');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 鼠标轨迹粒子
    const trailParticles = [];

    class TrailParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 2;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.life = 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.02;
            this.size *= 0.98;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.life;
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
            gradient.addColorStop(0, '#64ffda');
            gradient.addColorStop(0.5, '#bb86fc');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // 鼠标移动事件
    let lastX = 0;
    let lastY = 0;

    document.addEventListener('mousemove', (e) => {
        const distance = Math.sqrt((e.clientX - lastX) ** 2 + (e.clientY - lastY) ** 2);

        if (distance > 5) {
            for (let i = 0; i < 2; i++) {
                trailParticles.push(new TrailParticle(e.clientX, e.clientY));
            }
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    // 点击波纹效果
    document.addEventListener('click', (e) => {
        createRipple(e.clientX, e.clientY);
    });

    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 800);
    }

    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 更新和绘制轨迹粒子
        for (let i = trailParticles.length - 1; i >= 0; i--) {
            trailParticles[i].update();
            trailParticles[i].draw();

            if (trailParticles[i].life <= 0) {
                trailParticles.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    // 窗口大小调整
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
})();
