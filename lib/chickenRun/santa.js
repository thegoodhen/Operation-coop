class Santa{
    constructor()
    {
        this.sprite=new Sprite();
        this.sprite.collider='none';
        this.sprite.x=100;
        this.sprite.y=300;
        this.sprite.width=50;
        this.sprite.height=50;
        this.presents=new Group();
        this.presents.layer=0;
        this.presents.width=50;
        this.presents.height=50;
        this.lastPresentThrownMillis=0;
        this.handRotation=0;
        this.nextPeriod=1000;
        this.kvok=false;
        this.anvil=loadImage("/santa/anvil/anvil.png")
        this.presentBox=loadImage("/santa/present/box.png")
        this.presentBow=loadImage("/santa/present/bow.png")
        this.body=loadImage("/santa/santa.png")
        this.face=loadImage("/santa/face/santa_face.png")
        this.hand=loadImage("/santa/hand/santa_hand.png")
        this.beard=loadAni("/santa/beard/beard_00000.png",frames=14)//,{frames:14, frameSize:[88,63]});
        this.hat=loadAni("/santa/hat/hat_00000.png",frames=14)//,{frames:14, frameSize:[88,63]});
        this.fire=loadAni("/fire/Fire_00000.png",frames=31)//,{frames:14, frameSize:[88,63]});
        this.beard.frameDelay=2;
        this.hat.frameDelay=2;
        this.fire.frameDelay=1;
        this.presentsPicked=0;
            this.sprite.draw=()=>{
                    image(this.body,0,0,200,150)
                    animation(this.beard,30,-10,0,0.25,0.25)
                    image(this.face,15,-40,50,50)
                    animation(this.hat,55,-50,0,0.25,0.25)
                    animation(this.fire,130,30,90,1,1)
                    push()
                    translate(30,-20)
                    rotate(this.handRotation)
                    translate(-20,0)
                    this.handRotation+=1
                    //image(this.hand,10,-18,62,30)
                    image(this.hand,0,0,62,30)
                    pop()
                }
        this.smallBawk=loadSound("/music/chicken_present.mp3")
        this.bigBawk=loadSound("/music/chicken_10presents.mp3")
        this.presentThrow=loadSound("/music/santa_HO.mp3")
    }

    step()
    {
        this.sprite.y=250+Math.sin(Date.now()/400)*30
        if(frameCount>100 && Date.now()-this.lastPresentThrownMillis>this.nextPeriod)//throw a new present
        {
            this.lastPresentThrownMillis=Date.now();
            let currentPresent=new this.presents.Sprite();
            currentPresent.x=this.sprite.x;
            currentPresent.y=this.sprite.y;
            currentPresent.vel.x=Math.random()*2+2;
            currentPresent.vel.y=-2-Math.random()*1;
            currentPresent.collider='k'
            let anvilProbability=map(gameCtrl.getDifficulty(),0,100,0.1,0.5);
            if(Math.random()>(1-anvilProbability))
            {
                currentPresent.radius=30;
                currentPresent.isAnvil=true;

            }
            if(!currentPresent.isAnvil)
            {
                this.presentThrow.play();
            }
            this.nextPeriod=500+Math.random()*3000;
            currentPresent.boxTint=random(255);
            currentPresent.bowTint=random(255);
            currentPresent.draw=()=>
            {
                currentPresent.rotation+=1;
                if(currentPresent.isAnvil)
                {
                    image(this.anvil, 0,0,75,75)
                }
                else
                {
                    colorMode(HSB, 255)
                    tint(currentPresent.boxTint,128,255)
                    image(this.presentBox, 0,0,75,75)
                    tint(currentPresent.bowTint,128,255)
                    image(this.presentBow, 0,0,75,75)
                }
            }
        }
        for(var i=0;i<this.presents.length;i++)
        {
            this.presents[i].vel.y+=0.02;
            //this.presents[i].moveTowards(player.sprite,-0.001);
            if(this.presents[i].overlaps(player.sprite))
            {
                if(!this.presents[i].isAnvil)
                {
                console.log("KDAK"); 
                scoreCtrl.increaseScore();
                this.presentsPicked+=1;
                if(this.presentsPicked%10==0)
                {
                    this.bigBawk.play()
                }
                else
                {
                    this.smallBawk.play()
                }
                scoreCtrl.increaseMultiplier();
                //this.presents[i].collider='none';
                }
                else
                {
                    player.sprite.vel.y=-20;
                    gameCtrl.endGame();
                }
                this.presents[i].remove();
                
            }
           else if(this.presents[i].x>900)
            {
                if(!this.presents[i].isAnvil)
                {
                    scoreCtrl.resetMultiplier();
                }
                this.presents[i].remove();

            }
            
        }
    }
}