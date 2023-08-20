class buildingControl{
    constructor()
    {
        this.sprite=new Sprite();
        this.sprite.collider='none';
        this.sprite.x=50;
        this.sprite.y=500;
        this.sprite.width=50;
        this.sprite.height=50;
        this.buildings=new Group();
        this.buildings.width=100;
        this.buildings.height=200;
        this.buildings.layer=-10;
        this.lastBuildingGeneratedMillis=0;
        this.nextPeriod=1000;
        this.lastSeenAnnouncedCombo=0;
        this.snowmanBody=loadImage("/snowman/snowman.png")//,img=>{this.theBody=img.resize(100,0)});
        this.snowmanHats=loadAni("/snowman/hats/hat1.png",6)//,img=>{this.theBody=img.resize(100,0)});
        this.snowmanScarves=loadAni("/snowman/scarves/scarf1.png",1)//,img=>{this.theBody=img.resize(100,0)});
        this.snowmanPartyBlower=loadAni("/snowman/party_blower/party_blower00000.png",39);
    }
    reset()
    {
        this.buildings.remove();
    }

    step()
    {
        //this.snowmanBody.resize(100,0)
        //this.snowmanHats.resize(100,0)
        if(Date.now()-this.lastBuildingGeneratedMillis>this.nextPeriod)//generate a new building
        {
            this.lastBuildingGeneratedMillis = Date.now();
            let currentBuilding = new this.buildings.Sprite();
            if(scoreCtrl.lastAnnouncedCombo && scoreCtrl.lastAnnouncedCombo!=this.lastSeenAnnouncedCombo)
            {
                this.lastSeenAnnouncedCombo=scoreCtrl.lastAnnouncedCombo
                currentBuilding.celebrate=true;
            }
            else
            {
                currentBuilding.celebrate=false;
            }
            currentBuilding.hatChoice = Math.floor(Math.random() * 5)
            currentBuilding.scarveChoice = 0
            currentBuilding.tintOffset = Math.floor(-200 + Math.random() * 400)
            currentBuilding.draw = () => {
                push()
                translate(0, 150)
                scale(1, 1 + (Math.sin(Date.now() / 100)) * 0.05)
                translate(0, -150)
                image(this.snowmanBody, 0, 0, 100, 200)
                push()
                colorMode(HSB, 255)
                //tint(currentBuilding.tintOffset,255,255)
                //tint((Date.now()/10)%255,0,255)
                //tint((Date.now()/10)%255,255,255)
                image(this.snowmanScarves[currentBuilding.scarveChoice], 0, -15, 68, 50)
                if (currentBuilding.celebrate) {
                    image(this.snowmanHats[5], 0, -65, 68, 50)
                    let partyBlowerFrame = frameCount % 80;
                    if (partyBlowerFrame >= 40) {
                        partyBlowerFrame = 79 - partyBlowerFrame;
                    }
                    image(this.snowmanPartyBlower[partyBlowerFrame], -68, -52, 125, 50)
                }
                else {
                    image(this.snowmanHats[currentBuilding.hatChoice], 0, -65, 68, 50)
                }
                pop()
                pop()
            }
            currentBuilding.x = -50;
            currentBuilding.y = this.sprite.y;
            currentBuilding.collider = 'k'
            this.nextPeriod = map(gameCtrl.getDifficulty(), 0, 100, 1500, 500) + Math.random() * 2000;
        }
        for(var i=0;i<this.buildings.length;i++)
        {
            this.buildings[i].vel.x=map(gameCtrl.getDifficulty(),0,100,4,10);
            if(this.buildings[i].x>1000)
            {
                this.buildings[i].remove();
            }
        }
    }
}