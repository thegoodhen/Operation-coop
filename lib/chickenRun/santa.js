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
        this.nextPeriod=1000;
    }

    step()
    {
        if(Date.now()-this.lastPresentThrownMillis>this.nextPeriod)//throw a new present
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
            this.nextPeriod=500+Math.random()*3000;
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