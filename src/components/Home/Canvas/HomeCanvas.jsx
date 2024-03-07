import React, { useEffect, useRef, useState } from 'react'
import CharacterImage from '../../../assets/spritesheets/character.png';
import MountainImage from '../../../assets/spritesheets/mountains.png';
import CloudGroupImage from '../../../assets/spritesheets/cloud_group.png';
import SmallCloudGrouImage from '../../../assets/spritesheets/cloud.png';
import CloudImage from '../../../assets/spritesheets/small_cloud_group.png';
import BigBirdGroupImage from '../../../assets/spritesheets/big_bird_group_115x85.png';



export const HomeCanvas = () => {
    const canvasRef = useRef(null);
    const [mouseXOffset, setMouseXOffset] = useState(0);
    const mouseXOffsetRef = useRef(mouseXOffset); 
    const [scale, setScale] = useState(1);
    
    const resizeCanvas = (canvas) => {
        if (canvas) {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            const context = canvas.getContext('2d');
            context.scale(dpr, dpr);
        }
    };
    const drawCharacterImage = (ctx,canvas,image,xOffset) => {
        
        
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imageAspectRatio = image.width / image.height;
            const canvasAspectRatio = canvasWidth / canvasHeight;

            let drawWidth = canvasWidth;
            let drawHeight = canvasHeight;

            if (imageAspectRatio > canvasAspectRatio) {
                drawWidth = canvasWidth ;
                drawHeight = canvasWidth / imageAspectRatio;
            } else {
                drawWidth = canvasHeight * imageAspectRatio;
                drawHeight = canvasHeight;
            }
            const imageOffsetX = canvasWidth * 0.1;
            const imageOffsetY = canvasHeight * 0.2;
            // Calculate position to center the image
            const x = ((canvasWidth - drawWidth) / 2 + xOffset) + imageOffsetX;
            const y = ((canvasHeight - drawHeight) / 2) + imageOffsetY; 

            // Draw the image with calculated dimensions and position
            ctx.drawImage(image, x, y, drawWidth/1.2, drawHeight/1.2);
    };
    const drawMountainImage = (ctx,canvas,image,xOffset) => {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const imageAspectRatio = image.width / image.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;

        let drawWidth = canvasWidth;
        let drawHeight = canvasHeight;

        if (imageAspectRatio > canvasAspectRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imageAspectRatio;
        } else {
            drawWidth = canvasHeight * imageAspectRatio;
            drawHeight = canvasHeight;
        }

        // Calculate position to center the image
        const x = (canvasWidth - drawWidth*2) / 2 + -xOffset;
        const y = (canvasHeight - drawHeight) / 2;
        ctx.drawImage(image, x, y, drawWidth, drawHeight);

    }
    const drawCloudGroupImage = (ctx,canvas,image,Xposition) => {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const imageAspectRatio = image.width / image.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;

        let drawWidth = canvasWidth;
        let drawHeight = canvasHeight;

        if (imageAspectRatio > canvasAspectRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imageAspectRatio;
        } else {
            drawWidth = canvasHeight * imageAspectRatio;
            drawHeight = canvasHeight;
        }

        // Calculate position to center the image
        
        const x = ((canvasWidth - drawWidth) / 2) +  Xposition ;
        const y = (canvasHeight - drawHeight) / 5;
        ctx.drawImage(image, x, y, drawWidth/ 3, drawHeight/ 3);

    }
    const drawBigBirdGroupImage = (ctx,canvas,image,birdFrameIndex,Xposition) => {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const imageAspectRatio = image.width / image.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;

        let drawWidth = canvasWidth;
        let drawHeight = canvasHeight;

        if (imageAspectRatio > canvasAspectRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imageAspectRatio;
        } else {
            drawWidth = canvasHeight * imageAspectRatio;
            drawHeight = canvasHeight;
        }

        // Calculate position to center the image
        
        const x = ((canvasWidth - drawWidth)) + Xposition ;
        const y = (canvasHeight - drawHeight) / 5;
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(image,birdFrameIndex * 115,0,115,85, -x, y, drawWidth / 25, drawHeight / 15);
        ctx.restore();
    }
    useEffect(() => {
        mouseXOffsetRef.current = mouseXOffset;
        const newScale = 1 + mouseXOffset /1000; 
        setScale(Math.max(.5, Math.min(2, newScale)));
    }, [mouseXOffset]);
    useEffect(() => {
        const handleMouseMove = (event) => {
            const movementX = event.clientX - window.innerWidth / 2;
            setMouseXOffset(movementX * 0.05); // Adjust multiplier as needed
        };
    
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d'); 
        let animationFrameId;
        let birdFrameIndex = 0;
        let birdX = 0;
        let lastFrameTime = 0;
        const frameDuration = 200; // Duration of each frame in milliseconds
        const mountainImage = new Image();
        const characterImage = new Image();
        const cloud_groupImage = new Image();
        const cloudImage = new Image();
        const smallCloudGroupImage = new Image();
        const bigBirdGroupImage = new Image();
        let mountainImageLoaded = false;
        let characterImageLoaded = false;
        let cloud_groupImageLoaded = false;
        let cloudImageLoaded = false;
        let smallCloudGroupImageLoaded = false;
        let bigBirdGroupImageLoaded = false;
        let clouds = [];
        let cloudIndex = 0;
        let cloudX = 0; 
        let cloudSpeed = 0;
        
        mountainImage.onload = () => {
            mountainImageLoaded = true;
            startRendering();
        };
        characterImage.onload = () => {
            
            characterImageLoaded = true;
            startRendering(); 
        };
        cloud_groupImage.onload = () =>{
            cloud_groupImageLoaded = true;
            startRendering();
        }
        cloudImage.onload = () =>{
            cloudImageLoaded = true;
            startRendering();
        }
        smallCloudGroupImage.onload = () =>{
            smallCloudGroupImageLoaded = true;
            startRendering();
        }
        bigBirdGroupImage.onload = () =>{
            bigBirdGroupImageLoaded = true;
            startRendering();
        }
        cloud_groupImage.src = CloudGroupImage;
        cloudImage.src = CloudImage;
        smallCloudGroupImage.src = SmallCloudGrouImage;
        mountainImage.src = MountainImage;
        characterImage.src = CharacterImage;
        bigBirdGroupImage.src = BigBirdGroupImage;
       
        const startRendering = () => {
            if (mountainImageLoaded && characterImageLoaded && cloud_groupImageLoaded && cloudImageLoaded && smallCloudGroupImageLoaded && bigBirdGroupImageLoaded) {
                clouds = [cloud_groupImage,cloudImage,smallCloudGroupImage];
                resizeCanvas(canvas);
                cloudSpeed = canvas.width * 0.0001;
                cloudX = canvas.width;
                birdX = canvas.width;
                render();
            }
        };
        
        const render = (timestamp) => {
            const parallaxOffset = mouseXOffsetRef.current * 0.2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            drawMountainImage(ctx,canvas,mountainImage,parallaxOffset);
            drawBigBirdGroupImage(ctx,canvas,bigBirdGroupImage,birdFrameIndex,birdX)
            drawCloudGroupImage(ctx,canvas,clouds[cloudIndex], cloudX);
            drawCharacterImage(ctx,canvas,characterImage,parallaxOffset);
            cloudX -= cloudSpeed/2;
            birdX -= cloudSpeed * 1.5;

            if (cloudX < -600) {
                cloudX = canvas.width ; // Reset X position
                cloudIndex = (cloudIndex + 1) % clouds.length; // Move to next cloud image
            }
            if (birdX < -115) {
                birdX = canvas.width +115;
            }
            
            // Update bird animation frame
            if (timestamp - lastFrameTime > frameDuration) {
                birdFrameIndex = (birdFrameIndex + 1) % 3;
                lastFrameTime = timestamp;
            }
            
            animationFrameId = requestAnimationFrame(render);
        };

        
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return( <div>
                <canvas className='homeCanvas' ref={canvasRef} />
                <div className='text-container' style={{ transform: `scale(${scale})` }} >
                <div className="textured-div" ></div>
                    <div className="serif-text" >
                        <p>
                            Hi, my
                        </p>
                        <div className="secondLine">
                            <p style={{display: "inline"}}>
                                name is  
                            </p>
                            <p className="name "style={{display: "inline"}}>
                                 Florian Meinel
                            </p>
                        </div>
                        <div className="thirdLine">
                            <p style={{display: "inline"}}>
                                I'm a creative 
                            </p>
                            <p className="rank" style={{display: "inline"}}>
                                Software Developer
                            </p>
                            <p style={{display: "inline"}}>
                                from
                            </p>
                            <p className="country">Germany</p>
                        </div> 
                    </div>
                </div>
                
            </div>     
    );
}
