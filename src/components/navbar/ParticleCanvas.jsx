import React, { useEffect, useRef } from 'react'

export const ParticleCanvas = (props) => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            const context = canvas.getContext('2d');
            context.scale(dpr, dpr);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const frameId = { current: null };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
            setInterval(() => {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.current.push(new Particle(canvas.width, canvas.height));
            }, 200);
        const animate = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            particles.current.forEach(particle => {
                particle.update();
                particle.draw(context);
                particles.current = particles.current.filter(particle => particle.isAlive());

            });
            frameId.current = requestAnimationFrame(animate);
        };

        animate();
        return () => {
            cancelAnimationFrame(frameId.current);
        };
    }, []);
    return <canvas className={`${props.active} ${props.flip} canvas`}  ref={canvasRef}  />;
};
class Particle {
    constructor(canvasWidth, canvasHeight) {
        this.x = canvasWidth / 2  ;
        this.y = canvasHeight / 2 ;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.size = Math.random() * 3;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = "rgba(0,0,0,1)";
        this.initialLifespan = 100;
        this.lifespan = this.initialLifespan;
        this.edgeDistance = 10; 
        this.turnFactor = .1;
    }
    applyForce(force) {
        console.log(this.color)
        this.speedX += force.x;
        this.speedY += force.y;
    }
    steerAwayFromEdges() {
        let force = { x: 0, y: 0 };
        if (this.x < this.edgeDistance) {
            force.x = this.turnFactor;
        } else if (this.x > this.canvasWidth - this.edgeDistance) {
            force.x = -this.turnFactor;
        }

        if (this.y < this.edgeDistance) {
            force.y = this.turnFactor;
        } else if (this.y > this.canvasHeight - this.edgeDistance) {
            force.y = -this.turnFactor;
        }

        return force;
    }
    update() {
        const steeringForce = this.steerAwayFromEdges();
        this.applyForce(steeringForce);
        this.x += this.speedX;
        this.y += this.speedY;
        this.lifespan -= 1;
        this.speedX = Math.max(Math.min(this.speedX, 3), -3);
        this.speedY = Math.max(Math.min(this.speedY, 3), -3);
    }
    draw(context) {
        const alpha = this.lifespan / this.initialLifespan;
        context.fillStyle = this.color + alpha + ")"; 
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
  
    isAlive() {
        return this.lifespan > 0;
    }
  }