class obstacleControl{
    constructor()
    {
        this.sprite=new Sprite();
        this.sprite.collider='none';
        this.sprite.x=50;
        this.sprite.y=500;
        this.sprite.width=50;
        this.sprite.height=50;
        this.obstacles=new Group();
        this.obstacles.width=100;
        this.obstacles.height=200;
        this.obstacles.layer=-10;
        this.lastObstacleGeneratedMillis=0;
        this.nextPeriod=1000;
        this.lastSeenAnnouncedCombo=0;
        this.snowmanBody=loadImage("./snowman/snowman.png")//,img=>{this.theBody=img.resize(100,0)});
        this.snowmanHats=loadAni("./snowman/hats/hat1.png",6)//,img=>{this.theBody=img.resize(100,0)});
        this.snowmanScarves=loadAni("./snowman/scarves/scarf1.png",1)//,img=>{this.theBody=img.resize(100,0)});
        this.snowmanPartyBlower=loadAni("./snowman/party_blower/party_blower00000.png",39);
    }

    step()
    {
        //this.snowmanBody.resize(100,0)
        //this.snowmanHats.resize(100,0)
        if(frameCount>60*4 && Date.now()-this.lastObstacleGeneratedMillis>this.nextPeriod)//generate a new obstacle
        {
            this.lastObstacleGeneratedMillis = Date.now();
            this.createObstacle();
            //plan the creation of next obstacle based on the current difficulty
            this.nextPeriod = map(gameCtrl.getDifficulty(), 0, 100, 1500, 500) + Math.random() * 2000;
        }
    }


    reset()
    {
        this.obstacles.remove();
    }

    /**
     * Create a new obstacle; this also defines its behavior!
     */
    createObstacle()
    {
        let currentObstacle = new this.obstacles.Sprite();
        //see if the current obstacle (snowman only for now) should celebrate;
        //if the last combo announced by the score control changes from last time, we should celebrate!
        if (scoreCtrl.lastAnnouncedCombo && scoreCtrl.lastAnnouncedCombo != this.lastSeenAnnouncedCombo) {
            this.lastSeenAnnouncedCombo = scoreCtrl.lastAnnouncedCombo
            currentObstacle.celebrate = true;
        }
        else {
            currentObstacle.celebrate = false;
        }
        currentObstacle.hatChoice = Math.floor(Math.random() * 5)
        currentObstacle.scarveChoice = 0
        currentObstacle.tintOffset = random(255);//Math.floor(-200 + Math.random() * 400)
        currentObstacle.draw = () => {

            //dynamically adjust the speed at which the obstacle moves based on the current difficulty
            currentObstacle.vel.x = map(gameCtrl.getDifficulty(), 0, 100, 4, 10);
            //remove obstacle when off-screen
            if (currentObstacle.x > 1000) {
                currentObstacle.remove();
            }

            push()
            translate(0, 150)
            //dancing animation
            scale(1, 1 + (Math.sin(Date.now() / 100)) * 0.05)
            translate(0, -150)
            image(this.snowmanBody, 0, 0, 100, 200)
            push()
            colorMode(HSB, 255)
            //tinting the accessories TODO: optimize this! Expensive call.
            tint(currentObstacle.tintOffset, 255, 255)
            //tint((Date.now()/10)%255,0,255)
            //tint((Date.now()/10)%255,255,255)

            //draw the scarf
            image(this.snowmanScarves[currentObstacle.scarveChoice], 0, -15, 68, 50)
            //draw the party hat
            if (currentObstacle.celebrate) {
                image(this.snowmanHats[5], 0, -65, 68, 50)
                //draw and animate the party blower
                let partyBlowerFrame = frameCount % 80;
                if (partyBlowerFrame >= 40) {
                    partyBlowerFrame = 79 - partyBlowerFrame;
                }
                image(this.snowmanPartyBlower[partyBlowerFrame], -68, -52, 125, 50)
            }
            else {
                //draw a normal hat
                image(this.snowmanHats[currentObstacle.hatChoice], 0, -65, 68, 50)
            }
            pop()
            pop()
        }
        //moving the obstacle
        currentObstacle.x = -50;
        currentObstacle.y = this.sprite.y;
        currentObstacle.collider = 'k'
    }
}