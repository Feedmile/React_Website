import React, { useEffect, useRef, useState } from 'react'
import CharacterImage from '../../../assets/spritesheets/character.png';
import MountainImage from '../../../assets/spritesheets/mountains.png';
import CloudGroupImage from '../../../assets/spritesheets/cloud_group.png';
import SmallCloudGrouImage from '../../../assets/spritesheets/cloud.png';
import CloudImage from '../../../assets/spritesheets/small_cloud_group.png';
import BigBirdGroupImage from '../../../assets/spritesheets/big_bird_group_115x85.png';



export const HomeCanvas = () => {
    const canvasRef = useRef(null);
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
    const drawCharacterImage = (ctx,canvas,image,xOffset,startMove) => {
            
        
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
            const imageOffsetX = canvasWidth * 0.3;
            const imageOffsetY = (canvasHeight + drawHeight) * 0.05;
            // Calculate position to center the image
            const x = ((canvasWidth - drawWidth) / 2 + xOffset*2 + startMove) + imageOffsetX;
            const y = canvasHeight - drawHeight /2 - imageOffsetY; 

            // Draw the image with calculated dimensions and position
            ctx.drawImage(image, x, y, drawWidth/1.2, drawHeight/1.2);
    };
    const drawMountainImage = (ctx,canvas,image,xOffset,startMove) => {
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
        const imageOffsetX = canvasWidth * 0.35;
        const imageOffsetY = (canvasHeight + drawHeight) * 0.15;
        // Calculate position to center the image
        const x = ((canvasWidth - drawWidth) / 2 + -xOffset*3 + startMove) - imageOffsetX;
        const y = canvasHeight - drawHeight / 2 - imageOffsetY;
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
        const imageOffsetX = canvasWidth * 0.3;
        const imageOffsetY = (canvasHeight + drawHeight) * 0.34;
        const x = (((canvasWidth - drawWidth) / 2) +  Xposition) - imageOffsetX ;
        const y = canvasHeight - drawHeight / 2 - imageOffsetY;
        ctx.drawImage(image, x, y, drawWidth/ 3, drawHeight/ 3);

    }
    const drawCloudGroupImageForSmallScreens = (ctx,canvas,image,Xposition) => {
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
        const imageOffsetX = canvasWidth * 0.8;
        const imageOffsetY = (canvasHeight + drawHeight) * 0.6;
        const x = (((canvasWidth - drawWidth) / 2) +  Xposition) - imageOffsetX ;
        const y = canvasHeight - drawHeight / 2 - imageOffsetY;
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
        const imageOffsetX = canvasWidth * 0.05;
        const imageOffsetY = (canvasHeight + drawHeight) * 0.4;
        const x = ((canvasWidth - drawWidth) / 2 + Xposition) + imageOffsetX ;
        const y = canvasHeight - drawHeight / 2 - imageOffsetY;
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(image,birdFrameIndex * 115,0,115,85, -x, y, drawWidth / 25, drawHeight / 15);
        ctx.restore();
    }
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const timer = setTimeout(() => {
            document.body.style.overflow = 'auto';
          }, 500);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d'); 
        let animationFrameId;
        let birdFrameIndex = 0;
        let birdX = 0;
        let lastFrameTime = 0;
        let lastRenderTime = 0;
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
        let cloudIndexSmall = 1;
        let cloudX = 0; 
        let cloudSpeed = 0;
        let move = 0;
        let startMoveLeft = 0;
        let startMoveRight = 0; 
        let start = true;
        
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
            if (mountainImageLoaded && characterImageLoaded  && cloud_groupImageLoaded && cloudImageLoaded && smallCloudGroupImageLoaded && bigBirdGroupImageLoaded) {
                clouds = [cloud_groupImage,cloudImage,smallCloudGroupImage];
                resizeCanvas(canvas);
                cloudSpeed = canvas.width * 0.0001;
                cloudX = canvas.width;
                birdX = canvas.width;
                startMoveLeft = -canvas.width/2;
                startMoveRight = canvas.width/2;
                render(performance.now());
            }
        };
        
        const render = (timestamp) => {
            const pixelRatio = 1;
            if(!lastRenderTime) lastRenderTime = timestamp;
            const deltaTime = (timestamp - lastRenderTime) / 1000;
            lastRenderTime = timestamp;
            canvas.width = canvas.width * pixelRatio;
            canvas.height = canvas.height * pixelRatio;
            ctx.scale(pixelRatio, pixelRatio);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
           
            drawMountainImage(ctx,canvas,mountainImage,move,startMoveLeft);
            drawBigBirdGroupImage(ctx,canvas,bigBirdGroupImage,birdFrameIndex,birdX)
            drawCloudGroupImage(ctx,canvas,clouds[cloudIndex], cloudX);
            drawCloudGroupImageForSmallScreens(ctx,canvas,clouds[cloudIndexSmall], cloudX);
            drawCharacterImage(ctx,canvas,characterImage,move,startMoveRight);
            cloudX -= (cloudSpeed * 50) * deltaTime;
            if(startMoveRight < 0){
                start = false;
            }
            if(start == true){
                startMoveLeft += canvas.width * deltaTime;
                startMoveRight -= canvas.width * deltaTime;
            }
            if(move < canvas.width/50 && start == false){
                const newScale = 1 + (move*3 )/1000; 
                setScale(Math.max(.5, Math.min(2, newScale)));
                move += 3 * deltaTime
            }
            
            birdX -= (cloudSpeed * 200) * deltaTime;

            if (cloudX < -600) {
                cloudX = canvas.width + clouds[cloudIndex].width/2 ;
                cloudIndex = (cloudIndex + 1) % clouds.length;
                cloudIndexSmall = (cloudIndex + 1) % clouds.length;
            }
            if (birdX < -115) {
                birdX = canvas.width +115;
            }
            
            if (timestamp - lastFrameTime > frameDuration) {
                birdFrameIndex = (birdFrameIndex + 1) % 3;
                lastFrameTime = timestamp;
            }
            
            animationFrameId = requestAnimationFrame(render);
        };

        
        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(timer);
            document.body.style.overflow = 'auto';
        };
    }, []);

    return( <div>
                <canvas className='homeCanvas' ref={canvasRef} />
                <div className='text-container text-animation' style={{ transform: `scale(${scale})` }} >
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
