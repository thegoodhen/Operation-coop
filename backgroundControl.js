class backgroundControl {
    constructor(color, layer) {
        //this.generateScaleArray();
        this.sprite = new Sprite();
        this.sprite.collider = 'none';
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.layer=layer;
        this.sprite.layer = -(layer*10000);
        this.sprite.width = 50;
        this.sprite.height = 50;
        this.rollSpeed=0;
        this.snow=[];
        this.zOff=0;
        this.hillColor=color;
        //this.spritesheet=0;
        this.flakeTextures=[];

        this.createHills();
        this.createTrees();
        this.createSnowflakes();




        this.sprite.draw = () => {
            this.updateSnowflakes();
            this.updateHills();

        }
    }

rotateArray(arr) {
  const lastElement = arr.pop();
  arr.unshift(lastElement);
}

createHills()
{
        this.hillArray=[];//[0,25,0,20,40,0,20,25,0];
        const seededRand= new SeededRandom(12345); // seed with 12345
        for(var i=0;i<80;i++)
        {
            this.hillArray.push(seededRand.random()*95-(this.layer*40)+100);
        }
}

/**
 * Create trees; The behavior is actually set directly inside, so they will update automatically from this call onwards.
 */
createTrees()
{
        this.treeArray=[];
                for(var i=0;i<1;i++)
                {
                    var tree = new Sprite();
                    this.treeArray[i]=tree;
                    tree.collider = 'none';
                    tree.id=i;
                    tree.y = 300 + this.layer * -10;
                    tree.layer = this.sprite.layer + 1;
                    tree.draw = () => {
                        push()
                        //translate(this.rollSpeed % 900, 0)
                        stroke([0, 0, 0, 0]);
                        fill([66, 45, 255]);
                        scale(0.5 / this.layer, 0.5 / this.layer)
                        for (var i = 0; i < 5; i++) {
                            scale(1.2, 1.2)
                            translate(0, 20);
                            triangle(0, 0, -40, 100, 40, 100)
                        }
                        pop()

                    }
                    tree.update=()=>{
                        tree.x = ((-100*(tree.id+1)+(this.rollSpeed))%1000)-100;
                        //console.log("ID"+tree.id+"TREEX: " + tree.x);
                    }
                }
}

/**
 * Initializes the snowflakes. They will need to be updated later using updateSnowflakes()
 */
createSnowflakes()
{

    this.snowflakeGravity = createVector(0, 0.3);
    /*
    for (let x = 0; x < spritesheet.width; x += 32) {
        for (let y = 0; y < spritesheet.height; y += 32) {
            let img = spritesheet.get(x, y, 32, 32);
            image(img, x, y);
            this.flakeTextures.push(img);
        }
    }
    */


    for (let i = 0; i < 40; i++) {
        let x = random(width);
        let y = random(height);
        let design = random(this.flakeTextures);
        this.snow.push(new Snowflake(x, y, design));
    }
}

/**
 * Update the snow flakes. Code taken from Coding Train!
 */
updateSnowflakes()
{
    this.zOff += 0.1;

    for (let flake of this.snow) {
        let xOff = flake.pos.x / width;
        let yOff = flake.pos.y / height;
        let wAngle = noise(xOff, yOff, this.zOff) * TWO_PI;
        let wind = p5.Vector.fromAngle(wAngle);
        wind.mult(0.1);

        flake.applyForce(this.snowflakeGravity);
        flake.applyForce(wind);
        flake.update();
        flake.render();
    }
}

/**
 * Update the Hills. Essentially, the hills are a constantly morphing smooth shape.
 */
updateHills()
{
    push();
    fill(this.hillColor);
    this.rollSpeed = 2 * frameCount * (1 / this.layer);
    let spacing = 250;
    translate(-2 * spacing, 300);
    var offset = this.rollSpeed % spacing;
    if (offset == 0) {
        this.rotateArray(this.hillArray)
    }
    beginShape();
    for (var i = 0; i < this.hillArray.length; i++) {
        curveVertex(i * spacing + offset, this.hillArray[i]);
    }
    curveVertex(spacing * this.hillArray.length, 400);
    curveVertex(0, 400);
    curveVertex(0, 0);
    endShape(CLOSE);
    pop();
}

reset()
{
    this.createHills();
}


}