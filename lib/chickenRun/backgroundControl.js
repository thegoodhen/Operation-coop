class backgroundControl {
    constructor(color, layer) {
        //this.generateScaleArray();
        this.sprite = new Sprite();
        this.sprite.collider = 'none';
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.sprite.layer = -(layer*10000);
        this.sprite.width = 50;
        this.sprite.height = 50;
        this.hillArray=[];//[0,25,0,20,40,0,20,25,0];
        for(var i=0;i<80;i++)
        {
            this.hillArray.push(Math.random()*150-(layer*20));
        }

        this.sprite.draw = () => {
            push();
            fill(color) ;
            let rollSpeed=2*frameCount*(1/layer);
            let spacing=150;
            translate(-2*spacing,300);
            var offset = rollSpeed % spacing;
            if(offset==0)
            {
                this.rotateArray(this.hillArray)
            }
            beginShape();
            for(var i=0;i<this.hillArray.length;i++)
            {
                curveVertex(i*spacing + offset, this.hillArray[i]);
            }
            curveVertex(spacing*this.hillArray.length, 400);
            curveVertex(0, 400);
            curveVertex(0, 0);
            endShape(CLOSE);
            pop();
        }
    }

rotateArray(arr) {
  const lastElement = arr.pop();
  arr.unshift(lastElement);
}


}