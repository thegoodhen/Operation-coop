class gameControl {
    constructor() {
        //this.generateScaleArray();
        this.sprite = new Sprite();
        this.sprite.collider = 'none';
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.sprite.width = 50;
        this.sprite.height = 50;
        this.gameOver=false;
        this.savedScore=false;
        this.sprite.draw=()=>{
            if(this.gameOver)
            {
                push();
                translate(width / 2, height / 2);
                rectMode(CENTER);
                noStroke();
                fill([200, 50, 50,100]);
                tint(255,0);
                rect(0, 0, 600, 400);
                var highscore=localStorage.getItem("chickenRunHighscore");
                if(highscore===null)
                {
                    highscore=0;
                }
                if(scoreCtrl.score>highscore)
                {
                    highscore=scoreCtrl.score;
                    if(!this.savedScore)
                    {
                        localStorage.setItem("chickenRunHighscore",highscore);
                        this.savedScore=true;
                    }
                }
                if(this.savedScore)
                {
                    fill('white');
                    text("NEW HIGHSCORE!!!!", -200, -100);
                    text("Score:" + scoreCtrl.score, -200, 0);
                    text("Press ENTER to restart!", -200, 100);;
                }
                else
                {
                    fill('white');
                    text("Your score: " + scoreCtrl.score, -200, -100);
                    text("Highscore: " + highscore, -200, 0);
                    text("Press ENTER to restart!", -200, 100);;
                }
                pop();

            }
            
        }
    }
    getDifficulty()
    {
        var diff=(frameCount/60);//number of seconds since the start
        diff=map(diff,0,240,0,100);
        if(diff>100)
        {
            diff=100;
        }
        return diff;
    }
    reset()
    {
        frameCount=0;
        this.gameOver=false;
        this.savedScore=false;
        player.reset();
        buildingCtrl.reset();
        scoreCtrl.reset();
        backgroundCtrl1.reset();
        backgroundCtrl2.reset();
    }
    endGame()
    {
        this.gameOver=true;
    }

}