class Chicken{
    constructor()
    {
        this.sprite=new Sprite();
        this.sprite.width=50;
        this.sprite.height=50;
        //this.sprite.collider='none';
        this.acc=0.5;
        this.energy=1;
        this.sprite.bounciness=0;
        this.sprite.friction=0;
        this.lastTimeEnergyUsed=0;
        this.walkCycleProgress=0;

        this.body=loadImage("/chicken/body.png");
        this.face=loadAni("/chicken/face/face00000.png",116)
        this.faceDetails=loadAni("/chicken/details/face_details00000.png",8)
        this.frontLeg=loadImage("/chicken/legs/leg_front.png")
        this.backLeg=loadImage("/chicken/legs/leg_back.png")


        this.sprite.draw=()=>{
            push();
            if(gameCtrl.gameOver)
            {
                rotate(frameCount*4);
                this.energy=0;
                this.sprite.collider='none';
            }
            push();
            translate(15,25);
            rotate(-this.walkCycleProgress-180);
            translate(50,25);
            image(this.backLeg,-30,-25,100,50);
            pop();

            image(this.body,0,0,100,100);
            //animation(this.faceDetails,-30,-25,0,0.75,0.75);


            var detailsFrame=map(this.sprite.vel.y,-10,10,0,this.faceDetails.frames.length-1,true);
            detailsFrame=Math.round(detailsFrame);
            image(this.faceDetails.frames[detailsFrame],-30,-25,75,75);
            
            var faceFrame=(1-this.energy)*(this.face.frames.length);
            faceFrame=Math.round(faceFrame);
            if(faceFrame<0)
            {
                faceFrame=0;
            }
            if(faceFrame>=this.face.frames.length)
            {
                faceFrame=this.face.frames.length-1;
            }
            image(this.face.frames[faceFrame],-30,-25,75,75);

            push();
            translate(15,25);
            this.walkCycleProgress+=5;
            rotate(-this.walkCycleProgress);
            translate(50,25);
            image(this.frontLeg,-30,-25,100,50);
            pop();
            //animation(this.face,-30,-25,0,0.75,0.75);
            pop();
        }
        
        this.sprite.debug=true;
    }
    moveLeft()
    {
        if (this.sprite.y < 550)//flying; TODO: better check
        {
            this.sprite.vel.x-=(this.acc*this.energy)+0.2;
        }
        else
        {
            this.sprite.vel.x-=(this.acc*0.5)+0.2;
        }

    }
    moveRight()
    {
        if (this.sprite.y < 550)//flying; TODO: better check
        {
            this.sprite.vel.x += (this.acc * this.energy) + 0.2;
        }
        else {

            this.sprite.vel.x += (this.acc * 0.5) + 0.2;
        }
    }
    moveUp()
    {
        if (this.energy > 0) {
            this.energy -= 0.005;
            this.lastTimeEnergyUsed=Date.now();
        }
        this.sprite.vel.y-=((this.acc*this.energy)+0.6);
    }

    moveDown()
    {
        if (this.energy > 0) {
            this.energy -= 0.005;
            this.lastTimeEnergyUsed=Date.now();
        }
        this.sprite.vel.y+=(this.acc*this.energy)+0.6;
    }
    step()
    {
        if(this.sprite.collides(buildingCtrl.buildings))
        {
            this.sprite.vel.y=-20;
            gameCtrl.endGame();
        }
        if(Date.now()-this.lastTimeEnergyUsed>1000)
        {
            if (this.energy < 1) {
                this.energy += 0.005;
            }

        }
        if(this.sprite.vel.y<10)
        {
            this.sprite.vel.y+=0.58;
        }
        stroke("white")
        fill("white")
        textSize(32);
        //console.log(this.energy)
        //console.log(this.sprite.vel.y)
        this.sprite.rotation=0;
        //text("KOKODAK",10,10)

        if(this.sprite.vel.x>0&&this.sprite.x>(800-20))
        {
            this.sprite.vel.x=0;

        }
        if(this.sprite.vel.y<0&&this.sprite.y<(-20))
        {
            this.sprite.vel.y=0;

        }
        if(this.sprite.x>2000)
        {
            this.sprite.x=2000;
        }
        if(this.sprite.y>2000)
        {
            this.sprite.y=2000;
        }
    }
    reset()
    {
        this.sprite.bounciness=0;
        this.sprite.pos.x=width/2;
        this.sprite.pos.y=height/2;
        this.sprite.vel.x=0;
        this.sprite.vel.y=0;
        this.sprite.collider='dynamic'
        this.sprite.friction=0;
        this.gameOver=false;
        this.energy=1;
    }
}