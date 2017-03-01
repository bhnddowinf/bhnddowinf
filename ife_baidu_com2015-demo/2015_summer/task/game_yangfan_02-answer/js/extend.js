(function (window, createjs) {

    function Button(label, color) {
        this.Container_constructor();

        this.color = color || '#ccc';
        this.label = label;

        this.setup();
    }

    var p = createjs.extend(Button, createjs.Container);


    p.setup = function () {
        var text = new createjs.Text(this.label, "20px Arial", "#000");
        text.textBaseline = "top";
        text.textAlign = "center";

        var width = text.getMeasuredWidth() + 30;
        var height = text.getMeasuredHeight() + 20;

        text.x = width / 2;
        text.y = 10;

        var background = new createjs.Shape();
        background
            .graphics
            .setStrokeStyle(2)
            .beginStroke('#000')
            .beginFill(this.color)
            .drawRoundRect(0, 0, width, height, 10);

        this.addChild(background, text);
      /*  this.on("click", this.handleClick);
        this.on("rollover", this.handleRollOver);
        this.on("rollout", this.handleRollOver);*/
        this.cursor = "pointer";

        this.mouseChildren = false;

        this.offset = Math.random() * 10;
        this.count = 0;
    };

    p.handleClick = function (event) {
        alert("You clicked on a button: " + this.label);
    };

    p.handleRollOver = function (event) {
        this.alpha = event.type == "rollover" ? 0.4 : 1;
    };

    createjs.Button = createjs.promote(Button, "Container");


    function Enemy (obj) {
        this.Container_constructor();

        for (var i in obj) {
            this[i] = obj[i];
        }

        this.setup();
    }
    var enemy = createjs.extend(Enemy, createjs.Container);
    enemy.tick = function (event, that) {
        this.currentInterval--;
        if (this.currentInterval <= 0) {
            that.addEnemyBullet(this, that.config.enemyBullet);
            this.currentInterval = this.interval;
        }


    }
    enemy.setup = function () {

        var spriteSheet = new createjs.SpriteSheet({
                framerate: 30,
                "images": this.result,
                "frames": {"width": 190, "height": 177},
                // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                "animations": {
                    "normal": [0, 0, 'normal'],
                    "boom": [1, 4, null, 0.2]
                }
            });
        var img = new createjs.Sprite(spriteSheet);
        img.scaleX = this.width /img.getBounds().width;
        img.scaleY = this.height / img.getBounds().height;


       /* var img = new createjs.Bitmap(this.result);

        img.scaleX = this.width /img.getBounds().width;
        img.scaleY = this.height / img.getBounds().height;*/

        /*var hit = new createjs.Shape();
        hit.graphics.beginFill("#000").drawRect(img.x,
            img.y, this.width, this.height);*/
        // this.hitArea = img;
        var that = this;
        img.on('animationend', function (obj) {
            if (obj.name == 'boom') {
                that.isRemove = true;
            }
        })
        this.addChild(img);
    };


    createjs.Enemy = createjs.promote(Enemy, "Container");

    function Particle (x, y, r, col) {
        this.Container_constructor();
        this.x = x;
        this.y = y;
        this.r = r;
        this.col = col;
        this.setup();
    }
    var particle = createjs.extend(Particle, createjs.Container);
    particle.setup = function () {


        // determines whether particle will travel to the right of left
        // 50% chance of either happening
        this.dir = (Math.random() * 2 > 1) ? 1 : -1;

        // random values so particles do no travel at the same speeds
        this.vx = Math.random() * 4 * this.dir;
        this.vy = Math.random() * 7;
        this.speed = Math.random();

        this.isRemove = false;

        var g = new createjs.Graphics();
        g.setStrokeStyle(1);
        g.beginStroke(createjs.Graphics.getRGB(0,0,0));
        g.beginFill(createjs.Graphics.getRGB(255,0,0));
        g.drawCircle(0,0,3);

        var s = new createjs.Shape(g);
        s.x = 0;
        s.y = 0;
        this.addChild(s);

        this.update = function() {
            // update coordinates
            this.x += this.vx;
            this.y += this.vy;

            // increase velocity so particle accelerates off screen
            this.vx *= 1.1;
            this.vy *= 1.1;

            // adding this negative amount to the
            // y velocity exerts an upward pull on
            // the particle, as if drawn to the
            // surface
            this.vy -= this.speed;

            // offscreen
            if (this.y < 0) {
                this.isRemove = true;
            }
        };

        this.render = function() {
            //Draw.circle(this.x, this.y, this.r, this.col);
        };

    };
    createjs.Particle = createjs.promote(Particle, "Container");

})(window, createjs);