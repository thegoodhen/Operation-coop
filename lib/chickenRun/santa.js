const STATE_THROWING = 0;
const STATE_WAITING = 1;
const STATE_RELOAD = 2;
const STATE_IDLE = 3;
class Santa {
    constructor() {
        this.sprite = new Sprite();
        this.sprite.collider = 'none';
        this.sprite.x = 100;
        this.sprite.y = 300;
        this.sprite.width = 50;
        this.sprite.height = 50;
        this.presents = new Group();
        this.presents.layer = 0;
        this.presents.width = 50;
        this.presents.height = 50;
        this.lastPresentThrownMillis = 0;
        this.handRotation = 0;
        this.nextPeriod = 1000;
        this.kvok = false;
        this.anvil = loadImage("/santa/anvil/anvil.png")
        this.presentBox = loadImage("/santa/present/box.png")
        this.presentBow = loadImage("/santa/present/bow.png")
        this.body = loadImage("/santa/santa.png")
        this.face = loadImage("/santa/face/santa_face.png")
        this.hand = loadImage("/santa/hand/santa_hand.png")
        this.beard = loadAni("/santa/beard/beard_00000.png", frames = 14)//,{frames:14, frameSize:[88,63]});
        this.hat = loadAni("/santa/hat/hat_00000.png", frames = 14)//,{frames:14, frameSize:[88,63]});
        this.fire = loadAni("/fire/Fire_00000.png", frames = 31)//,{frames:14, frameSize:[88,63]});
        this.fireWoof = loadSound("/music/woof_flames.mp3")
        this.wahwah = loadSound("/music/wahwah_gameover.mp3")
        this.state = STATE_IDLE;
        this.beard.frameDelay = 2;
        this.hat.frameDelay = 2;
        this.fire.frameDelay = 1;
        this.presentsPicked = 0;
        this.anvilIsNext = false;
        this.nextPresentHue = 0;
        this.nextPresentBowHue = 0;
        this.fireSprite = new Sprite();
        //this.fireSprite.collider='dynamic'
        this.fireSprite.friction = 0;

        this.fireSprite.draw = () => {
            this.fireSprite.x = this.sprite.x + 130
            this.fireSprite.y = this.sprite.y + 30
            animation(this.fire, 0, 0, 90, 1, 1)
            if (this.fireSprite.overlaps(player.sprite)) {
                player.sprite.vel.y = -20;
                player.sprite.vel.x = 0;
                player.isBurned = true;
                this.fireWoof.play();
                gameCtrl.endGame();
            }
        }

        this.sprite.update = () => {
            this.handleStateMachine();
        }

        this.sprite.draw = () => {

            this.sprite.y = 250 + Math.sin(Date.now() / 400) * 30
            image(this.body, 0, 0, 200, 150)
            animation(this.beard, 30, -10, 0, 0.25, 0.25)
            image(this.face, 15, -40, 50, 50)
            animation(this.hat, 55, -50, 0, 0.25, 0.25)
            //animation(this.fire,130,30,90,1,1)
            push()

            //draw the hand
            translate(30, -20)
            rotate(this.handRotation - 40)
            translate(-20, 0)
            //image(this.hand,10,-18,62,30)
            image(this.hand, 0, 0, 62, 30)
            translate(-30, -10)
            //show the present/anvil in Santas hand
            if (this.state != STATE_WAITING) {
                if (this.anvilIsNext) {
                    image(this.anvil, 0, 0, 30, 30)
                }
                else {
                    colorMode(HSB, 255)
                    tint(this.nextPresentHue, 128, 255)
                    image(this.presentBox, 0, 0, 30, 30)
                    tint(this.nextPresentBowHue, 128, 255)
                    image(this.presentBow, 0, 0, 30, 30)
                }
            }
            pop()
        }
        this.smallBawk = loadSound("/music/chicken_present.mp3")
        this.bigBawk = loadSound("/music/chicken_10presents.mp3")
        this.presentThrow = loadSound("/music/santa_HO.mp3")
        this.anvilThrow = loadSound("/music/santa_anvil.mp3")
    }


    handleStateMachine() {
        switch (this.state) {
            case STATE_THROWING:
                this.handRotation += 10
                if ((this.handRotation % 360) > 150) {
                    this.state = STATE_WAITING;
                    this.lastPresentThrownMillis = Date.now();
                    let currentPresent = new this.presents.Sprite();
                    currentPresent.layer = 10000;
                    currentPresent.x = this.sprite.x + 40;
                    currentPresent.y = this.sprite.y - 55;
                    currentPresent.vel.x = Math.random() * 2 + 2;
                    currentPresent.vel.y = -1.4 - Math.random() * 1;
                    currentPresent.collider = 'k'
                    currentPresent.size = 0.3;
                    this.nextPeriod = 500 + Math.random() * 3000;
                    currentPresent.boxTint = this.nextPresentHue;
                    currentPresent.bowTint = this.nextPresentBowHue;
                    if (this.anvilIsNext) {
                        currentPresent.isAnvil = true;
                    }
                    currentPresent.draw = this.drawPresent.bind(this, currentPresent);
                }
                break;
            case STATE_WAITING:
                this.handRotation += 2
                if (Date.now() - this.lastPresentThrownMillis > 300) {
                    this.nextPresentBowHue = random(255);
                    this.nextPresentHue = random(255);
                    let anvilProbability = map(gameCtrl.getDifficulty(), 0, 100, 0.1, 0.5);
                    if (Math.random() > (1 - anvilProbability)) {
                        this.anvilIsNext = true;
                    }
                    else {
                        this.anvilIsNext = false;
                    }
                    this.state = STATE_RELOAD;
                }
                break;
            case STATE_RELOAD:
                this.handRotation += 3;
                if ((this.handRotation % 360) < 20) {
                    this.state = STATE_IDLE;
                }
                break;
            case STATE_IDLE:
                if (frameCount > 100 && Date.now() - this.lastPresentThrownMillis > this.nextPeriod)//throw a new present
                {
                    this.state = STATE_THROWING;
                    if (!this.anvilIsNext) {
                        this.presentThrow.play();
                    }
                    else {
                        this.anvilThrow.play();
                    }
                }
                break;

        }
    }

    drawPresent(currentPresent) {

        push()
        if (currentPresent.size < 1) {
            currentPresent.size += 0.01;
        }
        scale(currentPresent.size)
        currentPresent.rotation += 1;
        if (currentPresent.isAnvil) {
            image(this.anvil, 0, 0, 75, 75)
        }
        else {
            colorMode(HSB, 255)
            tint(currentPresent.boxTint, 128, 255)
            image(this.presentBox, 0, 0, 75, 75)
            tint(currentPresent.bowTint, 128, 255)
            image(this.presentBow, 0, 0, 75, 75)
        }
        pop()

        currentPresent.vel.y += 0.02;
        if (currentPresent.overlaps(player.sprite)) {
            if (!currentPresent.isAnvil) {
                //console.log("KDAK");
                scoreCtrl.increaseScore();
                this.presentsPicked += 1;
                if (this.presentsPicked % 10 == 0) {
                    this.bigBawk.play()
                }
                else {
                    this.smallBawk.play()
                }
                scoreCtrl.increaseMultiplier();
                //this.presents[i].collider='none';
            }
            else {
                player.sprite.vel.y = -20;
                gameCtrl.endGame();
                this.wahwah.play();
            }
            currentPresent.remove();

        }
        else if (currentPresent.x > 900) {
            if (!currentPresent.isAnvil) {
                scoreCtrl.resetMultiplier();
            }
            currentPresent.remove();

        }
    }

    step() {
        //console.log(this.state);
    }
}