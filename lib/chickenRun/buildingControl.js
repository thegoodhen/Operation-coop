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
        this.buildings.height=250;
        this.buildings.layer=-10;
        this.lastBuildingGeneratedMillis=0;
        this.nextPeriod=1000;
    }
    reset()
    {
        this.buildings.remove();
    }

    step()
    {
        if(Date.now()-this.lastBuildingGeneratedMillis>this.nextPeriod)//generate a new building
        {
            this.lastBuildingGeneratedMillis=Date.now();
            let currentBuilding=new this.buildings.Sprite();
            currentBuilding.x=-50;
            currentBuilding.y=this.sprite.y;
            currentBuilding.collider='k'
            this.nextPeriod=map(gameCtrl.getDifficulty(),0,100,1500,500)+Math.random()*2000;
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