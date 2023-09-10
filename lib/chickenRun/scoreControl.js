var comboTextScaleArray = [0.05, 0.06, 0.08, 0.11, 0.14, 0.18, 0.23, 0.28, 0.33, 0.39, 0.45, 0.51, 0.57, 0.63, 0.68, 0.73, 0.78, 0.83, 0.87, 0.9, 0.92, 0.94, 0.95, 0.96, 0.96, 0.96, 0.97, 0.99, 1.03, 1.08, 1.16, 1.26, 1.39, 1.56, 1.76, 2, 2.28, 2.6, 2.96, 3.36, 3.81, 4.33, 4.91, 5.59, 6.35, 7.23, 8.22, 9.34, 10.59, 12];
//var comboTextScaleArray=[0.05, 0.059, 0.093, 0.148, 0.217, 0.295, 0.378, 0.459, 0.533, 0.597, 0.65, 0.69, 0.717, 0.732, 0.741, 0.749, 0.76, 0.773, 0.787, 0.802, 0.816, 0.83, 0.842, 0.855, 0.867, 0.88, 0.894, 0.91, 0.926, 0.94, 0.949, 0.952, 0.955, 0.969, 1.004, 1.07, 1.18, 1.346, 1.58, 1.89, 2.28, 2.753, 3.312, 3.976, 4.777, 5.748, 6.923, 8.335, 10.016, 12]

var announcedComboMultipliersArray = [5, 10, 15, 20, 40];


class scoreControl {
    constructor() {
        //this.generateScaleArray();
        this.sprite = new Sprite();
        this.sprite.collider = 'none';
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.sprite.layer = 20000000;
        this.sprite.width = 50;
        this.sprite.height = 50;
        this.score = 0;
        this.multiplier = 1;
        this.textScale = 1;
        this.tree = loadAnimation("/tree/tree_00000.png", 3);
        this.treeStar = loadImg("/tree/star.png");
        this.flameAnim = loadAni("/fire/Fire_00000.png", frames = 31)//,{frames:14, frameSize:[88,63]});
        this.flameAnim.frameDelay = 1;
        this.combo_images = []
        this.combo_sounds = []
        this.combo_images[0] = loadImg("/comboTexts/combo_presentable.png");
        this.combo_images[1] = loadImg("/comboTexts/combo_ohDeer.png");
        this.combo_images[2] = loadImg("/comboTexts/combo_santastic.png");
        this.combo_images[3] = loadImg("/comboTexts/combo_xmassive.png");
        this.combo_images[4] = loadImg("/comboTexts/combo_sleigher.png");
        this.combo_sounds[0] = loadSound("/music/presentable.mp3")
        this.combo_sounds[1] = loadSound("/music/oh_deer.mp3")
        this.combo_sounds[2] = loadSound("/music/santastic.mp3")
        this.combo_sounds[3] = loadSound("/music/x_massive.mp3")
        this.combo_sounds[4] = loadSound("/music/sleigher.mp3")
        this.treeX = 100;
        this.treeY = 450;
        this.lastComboAnnouncedMillis = 0;
        this.lastAnnouncedCombo = 0;


        this.sprite.draw = () => {
            fill("white")
            text("Score: " + this.score, width - 200, 50);

        this.drawComboText();
        this.drawTreeComboIndicator();
        }
    }

    drawComboText()
    {
        push()
        //tint(255, 100);
        let animationDurationMillis = 3500;
        if (Date.now() - this.lastComboAnnouncedMillis < animationDurationMillis) {
            translate(width / 2, height / 2)
            scale(2 * this.interpolate(comboTextScaleArray, map(Date.now() - this.lastComboAnnouncedMillis, 0, animationDurationMillis, 0, 1)));
            if (Date.now() - this.lastComboAnnouncedMillis > (animationDurationMillis / 2)) {
                tint(255, map(Date.now() - this.lastComboAnnouncedMillis, animationDurationMillis / 2, animationDurationMillis, 255, 0));
            }

            if (announcedComboMultipliersArray.includes(this.lastAnnouncedCombo)) {
                //blendMode(ADD)

                image(this.combo_images[announcedComboMultipliersArray.indexOf(this.lastAnnouncedCombo)], 0, 0, 400, 200);
            }
        }

        pop()

    }

    drawTreeComboIndicator()
    {

            var treeFrame = Math.floor(this.multiplier / 5);
            if (treeFrame >= this.tree.frames.length) {
                treeFrame = this.tree.frames.length - 1;
            }
            //draw the star on the tree
            if (this.multiplier >= 20 && this.multiplier < 25) {
                push()

                translate(this.treeX, this.treeY);
                translate(0, -70);
                rotate(frameCount % 360);
                //blendMode(ADD)
                tint(255, 100);
                image(this.treeStar, 0, 0, 150, 150);
                rotate(-2 * frameCount % 360);
                tint(255, 200);
                image(this.treeStar, 0, 0, 100, 100);
                pop()
            }
            push()
            tint(255, 160);

            //shake if the multiplier is sufficiently large
            if (this.multiplier > 20) {
                let shakeAmount = map(this.multiplier, 20, 25, 0, 50);
                if (shakeAmount > 50) {
                    shakeAmount = 0;
                }
                translate(-(shakeAmount / 2) + Math.random() * shakeAmount, -(shakeAmount / 2) + Math.random() * shakeAmount)
            }

            //blink the tree
            if (frameCount % 30 < 15) {

                //scale(this.textScale);
                translate(this.treeX, this.treeY);
                image(this.tree.frames[0], 0, 0, 100, 200);
            }
            else {
                //scale(this.textScale);
                translate(this.treeX, this.treeY);

                image(this.tree.frames[treeFrame], 0, 0, 100, 200);
            }

            //draw the fire if the multiplier is sufficiently large
            if (this.multiplier > 25) {

                push()
                rotate(-90)
                tint(255, 255);
                animation(this.flameAnim, 100, 0, 90, 1, 1)
                if (this.multiplier > 30) {
                    animation(this.flameAnim, 0, 0, 90, 1, 1)
                    animation(this.flameAnim, -40, 0, 90, 1, 1)
                    animation(this.flameAnim, -30, -40, 90, 1, 1)
                    animation(this.flameAnim, -30, 40, 90, 1, 1)

                }

                pop()
            }
            //draw the combo multiplier text
            fill("black");
            stroke("black");
            translate(-10, 120)
            scale(this.textScale);
            text("x" + this.multiplier, 0, 0);
            pop();
            if (this.textScale > 1) {
                this.textScale -= 0.005;
            }
    }

    generateScaleArray() {
        for (let i = 0; i < 50; i++) {
            const arr = [];
            for (let i = 0; i < 50; i++) {
                const x = i / 49;
                let y;
                if (x < 0.5) {
                    y = 1 / (1 + Math.exp(-10 * (2 * x - 1)));
                } else if (x < 0.75) {
                    y = 0.95;
                } else {
                    y = 1.5 * Math.exp((x - 0.75) * 8) + 0.95;
                }
                comboTextScaleArray.push(y);
            }



        }
    }

    interpolate(arr, value) {
        // Check if value is less than or equal to zero
        if (value <= 0) {
            return arr[0];
        }
        // Check if value is greater than or equal to one
        if (value >= 1) {
            return arr[arr.length - 1];
        }
        // Calculate the index of the lower value
        const lowerIndex = Math.floor((arr.length - 1) * value);
        // Calculate the interpolation factor
        const factor = (value - lowerIndex / (arr.length - 1)) * (arr.length - 1);
        // Find the two values to interpolate between
        const a = arr[lowerIndex];
        const b = arr[lowerIndex + 1];
        // Interpolate between the two values
        return a + factor * (b - a);
    }


    increaseScore() {
        this.score += 1 * this.multiplier;
    }
    increaseMultiplier() {
        this.multiplier++;
        this.textScale += 0.5;
        if (announcedComboMultipliersArray.includes(this.multiplier)) {
            this.lastAnnouncedCombo = this.multiplier;
            this.lastComboAnnouncedMillis = Date.now();
            let soundIndex = announcedComboMultipliersArray.indexOf(this.lastAnnouncedCombo);
            this.combo_sounds[soundIndex].play()
            console.log("PIPKOKDAK");
        }
    }

    resetMultiplier() {
        this.multiplier = 1;
        this.lastAnnouncedCombo = 0;
    }
    reset() {
        this.resetMultiplier();
        this.score = 0;
    }

    step() {
    }
}