(function (window, createjs) {
    var canvas = document.getElementById('plane-game');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var enemyContainer,
        bulletContainer,
        hpContainer,
        plane,
        overContainer,
        bgContainer,
        enemyBulletContainer,
        boss,
        bossContainer,
        hand,
        foodContainer,
        scoreContainer;

    function isMobile() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    var randomBG = Math.round(Math.random() * 4);
    var manifest = [
                {
                    src: 'plane.png',
                    id: 'plane'
                },
                {
                    src: 'plane_weak.png',
                    id: 'plane_weak'
                },
                {
                    src: 'enemy.png',
                    id: 'enemy'
                },
                {
                    src: 'enemy2.png',
                    id: 'enemy2'
                },
                {
                    src: 'bullet.png',
                    id: 'bullet'
                },
                {
                    src: 'bg_move.png',
                    id: 'bg_move'
                },
                {
                    src: 'bg1.png',
                    id: 'bg1'
                },
                {
                    src: 'bg2.png',
                    id: 'bg2'
                },
                {
                    src: 'bg3.png',
                    id: 'bg3'
                },
                {
                    src: 'hp.png',
                    id: 'hp'
                },
                {
                    src: 'enemy_bullet.png',
                    id: 'enemy_bullet'
                },
                {
                    src: 'boss_bullet_left.png',
                    id: 'boss_bullet_left'
                },
                {
                    src: 'boss_bullet_right.png',
                    id: 'boss_bullet_right'
                },
                {
                    src: 'boss_bullet_mid.png',
                    id: 'boss_bullet_mid'
                }, {
                    src: 'cheese.png',
                    id: 'cheese'
                }, {
                    src: 'chicken.png',
                    id: 'chicken'
                }, {
                    src: 'mushroom.png',
                    id: 'mushroom'
                }, {
                    src: 'bacon.png',
                    id: 'bacon'
                }, {
                    src: 'score.png',
                    id: 'score'
                }
            ];
    for(var i = 1, len = 4; i <= len; i++) {
        manifest.push({
            src: 'enemy_boom' + i + '.png',
            id: 'enemy_boom' + i
        });
    }
    var boosImages = ['boss1', 'boss2', 'wuyou1', 'wuyou2', 'wuyouhuaidiao', 'wuyouboom1','wuyouboom2','wuyouboom3','wuyouboom4','wuyouboom5','wuyouboom6','wuyouboom7',
     'wuzuo1', 'wuzuo2', 'wuzuohuaidiao', 'wuzuoboom1', 'wuzuoboom2', 'wuzuoboom3', 'wuzuoboom4', 'wuzuoboom5', 'wuzuoboom6', 'wuzuoboom7', 'zuizhong', 'zuizhonghong'];
    boosImages.forEach(function (item) {
        manifest.push({
            src: item + '.png',
            id: item
        });
    });
    for (var i = 0, len = 10; i < len; i++) {
        manifest.push({
            src: i + '.png',
            id: i
        });
    }
    var gameManager = {
        config: {
            manifest: manifest,
            margin: 20,
            plane: {
                attack: 2,
                hp: 5,
                width: 80,
                height: 80
            },
            enemyBullet: {
                speed: 200,
                width: 16,
                height: 16
            },
            food: {
                scale: 0.75
            },
            boss: {
                bullet: {
                    speed: 300,
                    interval: 30,
                    currentInterval: 30,
                    width: 16,
                    height: 16
                },
                superBullet: {
                    interval: 50,
                    currentInterval: 50,
                    leftAndRight: {
                        width: 16,
                        height: 23,
                        speed: 200
                    },
                    mid: {
                        width: 20,
                        height: 28,
                        speed: 200
                    }

                },
                width: 256,
                height: 161,
                leftHandHp: undefined,
                rightHandHp: undefined,
                downSpeed: 30,
                shuffleSpeed: 15,
                counter: 5, // 多久boss开始出来
                tick: function (event, that) {
                    if (that.score > this.counter) {
                        this.move(event);
                    }

                    if (boss.status == 'ballBullet') {
                        this.bullet.currentInterval--;
                        if (this.bullet.currentInterval < 0) {
                            that.addBossBullet(this.bullet);
                            this.bullet.currentInterval = this.bullet.interval;
                        }
                    } else if (boss.status == 'zuizhong') {
                        this.superBullet.currentInterval--;
                        if (this.superBullet.currentInterval < 0) {
                            that.addBossSuperBullet(this.superBullet);
                            this.superBullet.currentInterval = this.superBullet.interval;
                        }
                    }


                },
                move: function (event) {
                    if (bossContainer.y < 70) {
                        // 往下移动
                        bossContainer.y += this.downSpeed * event.delta / 1000;
                    } else {
                        // 左右移动
                        if (bossContainer.x < 50) {
                            this.towardsLeft = true;
                        }
                        if (bossContainer.x + bossContainer.getTransformedBounds().width > canvas.width - 50) {
                            this.towardsLeft = false;
                        }
                        if (this.towardsLeft) {
                            bossContainer.x += this.shuffleSpeed * event.delta / 1000;
                        } else {
                            bossContainer.x -= this.shuffleSpeed * event.delta / 1000;
                        }


                    }


                }
            },
            bullet: {
                speed: 300,
                interval: 15,
                currentInterval: 15,
                width: 10,
                height: 30,
                tick: function (that, event) {
                    this.currentInterval--;
                    if (this.currentInterval <= 0) {
                        that.addBullet(this);
                        this.currentInterval = this.interval;
                    }
                    this.move(that, event);
                },
                move: function (that, event) {
                    // move bullet
                    for (var i = 0; i < bulletContainer.getNumChildren(); i++) {
                        var bullet = bulletContainer.getChildAt(i);
                        bullet.y -= this.speed * event.delta / 1000;;
                    }
                }
            },
            enemy: [
                {
                    id: 'enemy1',
                    speed: 60,
                    hp: 1,
                    width: 90,
                    height: 85,
                    interval: 120,
                    minInterval: 80,
                    score: 1,
                    tick: function (that, event) {
                        if (this.currentInterval == null) {
                            this.currentInterval = this.interval;
                        }
                        this.currentInterval--;
                        if (this.currentInterval <= 0) {
                            that.addEnemy(this);
                            this.currentInterval = this.interval = Math.max(this.interval - that.score / 10, this.minInterval);
                        }
                        //this.move(that);
                    },
                    move: function (event) {

                        this.y += this.speed * event.delta / 1000;

                    }
                }
            ]

        },
        score: 0,
        currentHP: undefined,
        currentBullet: 30,
        init: function () {

            this.currentHP = this.config.plane.hp;
            createjs.Ticker.setPaused(true);

            // save last Max Score
            //localStorage.setItem('MaxScore', 0);
            //alert(this.lastMaxScore);
            this.loader = new createjs.LoadQueue();
            this.loader.addEventListener('complete', this.handleLoadComplete.bind(this));
            this.loader.addEventListener('progress', this.handleProgress.bind(this));
            this.loader.loadManifest(this.config.manifest, true, './img/');



        },
        handleProgress: function (data) {
            document.querySelector('.percent').innerHTML = (data.loaded * 100).toFixed(0) + '%';
        },
        handleLoadComplete: function () {
            document.querySelector('.percent').style.display = 'none';

            this.stage = new createjs.Stage(canvas);
            createjs.Touch.enable(this.stage);
            createjs.Ticker.setFPS(80);
            createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
            //this.stage.enableMouseOver(60);
            createjs.Ticker.addEventListener("tick", this.tick.bind(this));

            this.initStart();
            this.initPlay();
            this.initOver();
            this.initFPS();

            this.gameContainer.visible = false;
            this.overContainer.visible = false;
        },
        tick: function (event) {
            var that = this;
            if (createjs.Ticker.getPaused()) {

            } else {

                this.config.bullet.tick(this, event);

                this.config.enemy.forEach(function (enemy) {
                    enemy.tick(this, event);
                }.bind(this));

                this.config.boss.tick(event, this);

                enemyContainer.children.forEach(function (enemy) {
                    enemy.tick(event, that);
                }.bind(this));



                enemyContainer.children.forEach(function (enemy) {
                    enemy.move(event);
                }.bind(this));

                // move
                for (var i = 0; i < enemyBulletContainer.getNumChildren(); i++) {
                    var bullet = enemyBulletContainer.getChildAt(i);
                    if (bullet.move) {
                        bullet.move(event, bullet);
                    } else {
                        bullet.y += this.config.enemyBullet.speed * event.delta / 1000;
                    }
                }



                this.checkCollision();

                this.updateHP();
                this.updateFPS();
                this.updateScore();
                this.updateBG(event);
            }


            this.stage.update();
        },
        addBullet: function (obj) {


            var bulletResult = this.loader.getResult('bullet');
            var bullet = new createjs.Bitmap(bulletResult);
            bullet.x = this.plane.x + this.config.plane.width / 2 - bullet.getTransformedBounds().width + 3;
            bullet.y = this.plane.y - bullet.getTransformedBounds().height / 2;
            bullet.scaleX = obj.width / bullet.getBounds().width;
            bullet.scaleY = obj.height / bullet.getBounds().height;
            bulletContainer.addChild(bullet);
        },
        addEnemy: function (obj) {
            var enemyResult = [this.loader.getResult('enemy')];
            for(var i = 1, len = 4; i <= len; i++) {
                enemyResult.push(this.loader.getResult('enemy_boom' + i));
            }
            var enemy = new createjs.Enemy({
                x: (canvas.width - 70) * Math.random(),
                y: 0,
                width: obj.width,
                height: obj.height,
                result: enemyResult,
                score: obj.score,
                hp: obj.hp,
                move: obj.move,
                speed: obj.speed,
                interval: 90,
                currentInterval: 90
            });


            enemyContainer.addChild(enemy);

        },
        addEnemyBullet: function (enemy, config) {

            var bulletResult = this.loader.getResult('enemy_bullet');
            var bullet = new createjs.Bitmap(bulletResult);
            bullet.x = enemy.x + enemy.width / 2 - config.width / 2 - 10;
            bullet.y = enemy.y + enemy.height - 35;
            bullet.scaleX = config.width / bullet.getBounds().width;
            bullet.scaleY = config.height / bullet.getBounds().height;
            enemyBulletContainer.addChild(bullet);
        },
        addBossBullet: function (config) {
            var bulletResult = this.loader.getResult('enemy_bullet');
            var bullet = new createjs.Bitmap(bulletResult);
            bullet.x = bossContainer.x + bossContainer.getTransformedBounds().width / 2 - 15;
            bullet.y = bossContainer.y + bossContainer.getTransformedBounds().height - 60;
            bullet.scaleX = config.width / bullet.getBounds().width;
            bullet.scaleY = config.height / bullet.getBounds().height;
            enemyBulletContainer.addChild(bullet);


        },
        addFood: function (enemy) {
            var foods = ['bacon', 'chicken', 'mushroom', 'cheese'];
            var food = foods[Math.floor(Math.random() * 4)];
            var foodResult = this.loader.getResult(food);


            food = new createjs.Bitmap(foodResult);
            food.x = enemy.x + 10;
            food.y = enemy.y + 10;
            food.scaleX = food.scaleY = this.config.food.scale;
            createjs.Tween.get(food)
            .to({alpha:0, visible:false}, 500)
            .to({alpha:1, visible: true}, 500)
            .to({alpha:0, visible:false}, 500)
            .to({alpha:1, visible: true}, 500)
            .to({alpha:0, visible:false}, 500)
            .call(function () {
                foodContainer.removeChild(food);
            });

            foodContainer.addChild(food);

        },
        addBossSuperBullet: function (config) {
            var bulletResult = this.loader.getResult('boss_bullet_mid');
            var bullet = new createjs.Bitmap(bulletResult);
            bullet.x = bossContainer.x + bossContainer.getTransformedBounds().width / 2 - 15;
            bullet.y = bossContainer.y + bossContainer.getTransformedBounds().height - 60;
            bullet.scaleX = config.mid.width / bullet.getBounds().width;
            bullet.scaleY = config.mid.height / bullet.getBounds().height;
            enemyBulletContainer.addChild(bullet);


            // 左右比较特殊的子弹
            bulletResult = this.loader.getResult('boss_bullet_left');
            bullet = new createjs.Bitmap(bulletResult);
            bullet.x = bossContainer.x + bossContainer.getTransformedBounds().width / 2 - 15 - 30;
            bullet.y = bossContainer.y + bossContainer.getTransformedBounds().height - 60;
            bullet.scaleX = config.mid.width / bullet.getBounds().width;
            bullet.scaleY = config.mid.height / bullet.getBounds().height;
            bullet.move = function (event, b) {
                b.x -= config.mid.speed * Math.cos(67 / 180 * Math.PI) * event.delta / 1000;
                b.y += config.mid.speed * Math.sin(67 / 180 * Math.PI) * event.delta / 1000;
            }
            enemyBulletContainer.addChild(bullet);

            bulletResult = this.loader.getResult('boss_bullet_right');
            bullet = new createjs.Bitmap(bulletResult);
            bullet.x = bossContainer.x + bossContainer.getTransformedBounds().width / 2 - 15 + 30;
            bullet.y = bossContainer.y + bossContainer.getTransformedBounds().height - 60;
            bullet.scaleX = config.mid.width / bullet.getBounds().width;
            bullet.scaleY = config.mid.height / bullet.getBounds().height;

            bullet.move = function (event, b) {
                b.x += config.mid.speed * Math.cos(67 / 180 * Math.PI) * event.delta / 1000;
                b.y += config.mid.speed * Math.sin(67 / 180 * Math.PI) * event.delta / 1000;
            }

            enemyBulletContainer.addChild(bullet);
        },
        loseHP: function () {
            this.currentHP--;
            plane.isInvincible = true;
            setTimeout(function () {
                plane.isInvincible = false;
            }, 2000);

            if (this.currentHP <= 1) {
                plane.gotoAndPlay('weak');
            }

        },
        destoryEnemy: function (enemy) {
            enemy.isDied = true;
            this.score += enemy.score;
            enemy.children[0].gotoAndPlay('boom');

            this.addFood(enemy);

        },
        checkCollision: function () {
            var bullet, enemy, i, l, j, len, removeArr = [];
            // check out of screen
            for (i = 0; i < bulletContainer.getNumChildren(); i++) {
                bullet = bulletContainer.getChildAt(i);
                if (bullet.y < 0 || bullet.isRemove) {
                    bullet.isRemove = true;
                    removeArr.push(i);
                }
            }
            removeArr.forEach(function (i) {
                bulletContainer.removeChildAt(i);
            });
            // check out of screen
            removeArr = [];
            for (i = 0; i < enemyContainer.getNumChildren(); i++) {
                enemy = enemyContainer.getChildAt(i);
                if (enemy.y < 0 || enemy.y > canvas.height || enemy.isRemove) {
                    enemy.isRemove = true;
                    removeArr.push(i);
                }
            }
            removeArr.forEach(function (i) {
                enemyContainer.removeChildAt(i);
            });

            removeArr = [];
            for (i = 0; i < enemyBulletContainer.getNumChildren(); i++) {
                bullet = enemyBulletContainer.getChildAt(i);
                if (bullet.y < 0 || bullet.y > canvas.height || bullet.isRemove) {
                    bullet.isRemove = true;
                    removeArr.push(i);
                }
            }
            removeArr.forEach(function (i) {
                enemyBulletContainer.removeChildAt(i);
            });

            // check bullet hit enemy
            for (i = 0 , l = bulletContainer.getNumChildren(); i < l; i++) {
                for (j = 0, len = enemyContainer.getNumChildren(); j < len; j++) {
                    enemy = enemyContainer.getChildAt(j);
                    if (!enemy.isDied) {
                        bullet = bulletContainer.getChildAt(i);
                        if (ndgmr.checkPixelCollision(enemy.children[0], bullet, 0.4, false)) {
                            // hit
                            // enemy.hp--;
                            // console.log('died', j, enemy.isDied);

                            this.destoryEnemy(enemy);

                            bullet.isRemove = true;
                        }
                    }

                }
            }
            // 检查敌机子弹击中我机
            if (!plane.isInvincible) {
                for (i = 0 , l = enemyBulletContainer.getNumChildren(); i < l; i++) {
                    bullet = enemyBulletContainer.getChildAt(i);
                    if (ndgmr.checkPixelCollision(plane, bullet, 0.4, false)) {
                        // hit
                        this.loseHP();
                        bullet.isRemove = true;

                    }

                }
            }

            // 检查我方子弹击中boss
            for (i = 0 , l = bulletContainer.getNumChildren(); i < l; i++) {
                bullet = bulletContainer.getChildAt(i);
                var intersection = ndgmr.checkPixelCollision(boss, bullet, 0.4, false);
                if (intersection) {
                    // 命中
                    if (this.config.boss.leftHandHp > 0
                        && this.config.boss.width / boss.getBounds().width * 20 + boss.x < intersection.x
                        && this.config.boss.width / boss.getBounds().width *282 + boss.x > intersection.x ) {
                        // 左臂中弹
                        this.config.boss.leftHandHp--;
                        if (this.config.boss.leftHandHp <= 0) {
                            hand.visible = true;
                            if (this.config.boss.rightHandHp <= 0) {
                                // 右边已经跪掉
                                hand.gotoAndPlay('wuyouleftboom');
                                boss.gotoAndPlay('zuizhonghong');
                                boss.status = 'zuizhong';

                                // this.config.boss.status = 'zuizhong';
                            } else {
                                boss.status = 'ballBullet';
                                hand.gotoAndPlay('leftboom');
                                boss.gotoAndPlay('wuzuo');

                            }


                        }

                    }
                    if (this.config.boss.rightHandHp > 0
                        && this.config.boss.width / boss.getBounds().width * 430 + boss.x < intersection.x
                        && this.config.boss.width / boss.getBounds().width * 680 + boss.x > intersection.x ) {
                        // 左臂中弹
                        this.config.boss.rightHandHp--;
                        if (this.config.boss.rightHandHp <= 0) {
                            hand.visible = true;
                            if (this.config.boss.leftHandHp <= 0) {
                                hand.gotoAndPlay('wuzuorightboom');
                                boss.gotoAndPlay('zuizhonghong');
                                boss.status = 'zuizhong';

                                // this.config.boss.status = 'zuizhong';
                            } else {
                                boss.status = 'ballBullet';
                                hand.gotoAndPlay('rightboom');
                                boss.gotoAndPlay('wuyou');
                            }

                        }

                    }



                    bullet.isRemove = true;

                    // hit
                    // enemy.hp--;
                    // console.log('died', j, enemy.isDied);

                }

            }
            // 检查plane与boss相撞
            if (!plane.isInvincible) {
                var intersection = ndgmr.checkPixelCollision(boss, plane, 0.4, false);
                if (intersection) {
                    this.loseHP();

                }
            }


            // check plane hit enemy
            l = enemyContainer.getNumChildren();
            for (i = 0; i < l; i++) {
                enemy = enemyContainer.getChildAt(i);
                if (!enemy.isDied) {
                    if (!plane.isInvincible) {
                        var intersection = ndgmr.checkPixelCollision(enemy.children[0], plane, 0.4, false);
                        if (intersection) {
                            this.loseHP();
                            this.destoryEnemy(enemy);
                            // enemy.isRemove = true;


                        }
                    }
                }
                /*enemy = enemyContainer.getChildAt(i);
                var planeRect = plane.getTransformedBounds();
                var enemyRect = enemy.getTransformedBounds();
                if (planeRect.x > enemyRect.x + enemyRect.width ||
                    planeRect.y > enemyRect.y + enemyRect.height ||
                    enemyRect.x > planeRect.x + planeRect.width ||
                    enemyRect.y > planeRect.y + planeRect.height) {
                } else {
                    // hit
                    this.currentHP--;
                    enemy.isRemove = true;
                    // this.addParticle({x: enemy.x, y: enemy.y});
                }*/
            }



        },
        initFPS: function () {
            var fps = this.fps = new createjs.Text('FPS:' + createjs.Ticker.getMeasuredFPS());
            fps.x = canvas.width - fps.getMeasuredWidth() - 10;
            fps.y = canvas.height - fps.getMeasuredHeight() - 10;

            this.stage.addChild(fps);
        },
        updateScore: function () {
            var first = Math.floor(this.score / 10);
            var second = this.score % 10;

            firstBitmap.visible = false;
            secondBitmap.visible = false;
            firstBitmap = scoreContainer.getChildByName('decade' + first);
            firstBitmap.visible = true;
            // firstBitmap.x = 138 * firstBitmap.scaleX;

            secondBitmap = scoreContainer.getChildByName('digit' + second);
            secondBitmap.visible = true;
            // secondBitmap.x = 138 * firstBitmap.scaleX;




        },
        updateFPS: function () {
            this.fps.text = 'FPS:' + createjs.Ticker.getMeasuredFPS();
        },
        updateBG: function (event) {
            if (bgContainer.y >= canvas.height) {
                bgContainer.y = 0;
            }
            bgContainer.y += event.delta / 1000 * 10;
        },
        initStart: function () {
            var startContainer = this.startContainer = new createjs.Container();
            var startBackground = new createjs.Shape();
            startBackground
                .graphics
                .setStrokeStyle(1)
                .beginFill('blue')
                .drawRoundRect(0, 0, canvas.width, canvas.height);

            var startButton = new createjs.Button('Start Game');
            startButton.x = canvas.width / 2 - startButton.getBounds().width / 2;
            startButton.y = canvas.height / 2;
            startButton.on('click', this.startGame.bind(this));
            startContainer.addChild(startBackground, startButton);

            this.stage.addChild(startContainer);
        },
        initPlay: function () {
            this.config.boss.leftHandHp = 10;
            this.config.boss.rightHandHp = 10;
            // game interface
            var gameContainer = this.gameContainer = new createjs.Container();
            var hit = new createjs.Shape();
            hit.graphics.beginFill("#000").drawRect(0, 0, canvas.width, canvas.height);
            gameContainer.hitArea = hit;
            gameContainer.visible = true;

            scoreContainer = new createjs.Container();

            var scoreResult = this.loader.getResult('score');
            var score = new createjs.Bitmap(scoreResult);
            score.scaleX = window.innerWidth / 649;
            score.scaleY = window.innerHeight / 1136;
            score.x = 13 * score.scaleX ;
            score.y = 17 * score.scaleY;
            scoreContainer.addChild(score);
            for (var i = 0, len = 10; i < len; i++) {
                var numberResult = this.loader.getResult(i);
                var num = new createjs.Bitmap(numberResult);
                num.name = 'digit' + i;
                num.scaleX = window.innerWidth / 649;
                num.scaleY = window.innerHeight / 1136;
                num.x = 181 * num.scaleX;
                num.y = 17 * num.scaleY;
                num.visible = false;
                scoreContainer.addChild(num);
            }
            for (var i = 0, len = 10; i < len; i++) {
                var numberResult = this.loader.getResult(i);
                var num = new createjs.Bitmap(numberResult);
                num.name = 'decade' + i;
                num.scaleX = window.innerWidth / 649;
                num.scaleY = window.innerHeight / 1136;
                num.x = 151 * num.scaleX;
                num.y = 17 * num.scaleY;
                num.visible = false;
                scoreContainer.addChild(num);
            }
            firstBitmap = scoreContainer.getChildByName('decade0');
            firstBitmap.visible = true;
            // firstBitmap.x = 138 * firstBitmap.scaleX;

            secondBitmap = scoreContainer.getChildByName('digit0');
            secondBitmap.visible = true;


            hpContainer = new createjs.Container();


            var spriteSheet = new createjs.SpriteSheet({
                framerate: 30,
                "images": [this.loader.getResult("plane"), this.loader.getResult("plane_weak")],
                "frames": {"width": 181, "height": 206},
                // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                "animations": {
                    "normal": [0, 0, 'normal'],
                    "weak": [0, 1, "weak", 0.05]
                }
            });
            plane = this.plane = new createjs.Sprite(spriteSheet);
            plane.x = canvas.width / 2 - this.config.plane.width / 2;
            plane.y = canvas.height - this.config.plane.height - 50;
            plane.scaleX = this.config.plane.width / plane.getBounds().width;
            plane.scaleY = this.config.plane.height / plane.getBounds().height;


           /* var planeResult = this.loader.getResult('plane');
            plane = this.plane = new createjs.Bitmap(planeResult);
            plane.scaleX = this.config.plane.width / plane.getBounds().width;
            plane.scaleY = this.config.plane.height / plane.getBounds().height;
            plane.x = canvas.width / 2 - this.config.plane.width / 2;
            plane.y = canvas.height - this.config.plane.height - 50;*/

            // bg
            bgContainer = new createjs.Container();
            var bgResult = this.loader.getResult('bg_move');
            var bg1 = new createjs.Bitmap(bgResult);
            var bg2 = new createjs.Bitmap(bgResult);
            bg1.x = bg1.y = bg2.x = 0;
            bg2.scaleX = bg1.scaleX = canvas.width / bg1.getBounds().width;
            bg2.scaleY = bg1.scaleY = canvas.height / bg1.getBounds().height;
            bg2.y = -canvas.height;
            bgContainer.addChild(bg1, bg2);

            var bgConstContainer = new createjs.Container();
            for (var i = 1, len = 3; i <= len; i++) {
                bgResult = this.loader.getResult('bg' + i);
                var bg = new createjs.Bitmap(bgResult);
                bg.x = bg.y = 0;
                bg.scaleX = canvas.width / bg.getBounds().width;
                bg.scaleY = canvas.height / bg.getBounds().height;
                bgConstContainer.addChild(bg);
            }



            // if (window.DeviceOrientationEvent && isMobile()) {
            if (false) {
                // if support device orientation
                window.addEventListener('deviceorientation', this.handleDeviceOrientation.bind(this));
            } else {
                // if not support device orientation, use touch move
                this.stage.addEventListener('stagemousemove', this.handlePlaneTouchMove.bind(this));
            }

            bulletContainer = new createjs.Container();
            this.enemyBulletContainer = enemyBulletContainer = new createjs.Container();
            enemyContainer = new createjs.Container();

            bossContainer = new createjs.Container();

            var images = boosImages.map(function (img) {
                return this.loader.getResult(img);
            }, this);
            var spriteSheet = new createjs.SpriteSheet({
                framerate: 90,
                "images": images,
                "frames": {"width": 512, "height": 322},
                // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                "animations": {
                    "normal": [0, 1, 'normal', 0.05],
                    "wuyou": [2, 3, "wuyou", 0.05],
                    'wuzuo': [12, 13, 'wuzuo', 0.05],
                    'wuyouleftboom': [4, 11, null, 0.2],
                    "leftboom": [5, 11, null, 0.2],
                    'wuzuorightboom': [14, 21, null, 0.2],
                    "rightboom": [15, 21, null, 0.2],
                    'zuizhong': [22, 22, 'zuizhong'],
                    'zuizhonghong': [22, 23, 'zuizhonghong', 0.05]
                }
            });
            boss = new createjs.Sprite(spriteSheet, 'normal');

            hand = new createjs.Sprite(spriteSheet);

            hand.on('animationend', function (obj) {
                this.visible = false;
            });
            hand.visible = false;

            bossContainer.x = canvas.width / 2 - this.config.boss.width / 2;
            bossContainer.y = -200;
            hand.scaleX = boss.scaleX = this.config.boss.width / boss.getBounds().width;
            hand.scaleY = boss.scaleY = this.config.boss.height / boss.getBounds().height;

            bossContainer.addChild(boss, hand);

            foodContainer = new createjs.Container();

            gameContainer.addChild(bgContainer, plane, bulletContainer, enemyBulletContainer, enemyContainer, bossContainer, foodContainer, bgConstContainer, scoreContainer, hpContainer);

            this.updateHP();
            this.stage.addChild(gameContainer);

        },
        handleDeviceOrientation: function (event) {
            var factor = 0.6;
            var betaDirection = Math.round(event.beta * factor);
            var gammaDirection = Math.round(event.gamma * factor);
            var x = (plane.x + gammaDirection);
            var y = (plane.y + betaDirection);
            this.updatePlane({
                x: x,
                y: y
            });
        },
        handlePlaneTouchMove: function (e) {
            var point = {
                x: e.localX - this.config.plane.width / 2,
                y: e.localY - this.config.plane.height / 2
            };

            this.updatePlane(point);

        },
        initOver: function () {
            overContainer = this.overContainer = new createjs.Container();
            var restartButton = new createjs.Button('Restart Game');
            restartButton.x = canvas.width / 2 - restartButton.getBounds().width / 2;
            restartButton.y = canvas.height / 2;
            restartButton.on('click', this.restartGame.bind(this));

            overContainer.addChild(restartButton);
            this.stage.addChild(overContainer);
        },
        restartGame: function () {
            this.currentHP = this.config.plane.hp;
            this.score = 0;
            this.stage.removeChild(this.gameContainer);
            this.initPlay();
            createjs.Ticker.setPaused(false);
            this.startContainer.visible = false;
            this.overContainer.visible = false;
            this.gameContainer.visible = true;
        },
        startGame: function () {
            this.startContainer.visible = false;
            this.gameContainer.visible = true;
            createjs.Ticker.setPaused(false);
        },
        gameOver: function () {
            this.startContainer.visible = false;
            this.gameContainer.visible = false;
            this.overContainer.visible = true;
            createjs.Ticker.setPaused(true);
        },
        updateHP: function () {
            hpContainer.removeAllChildren();
            for (var i = 0, len = this.currentHP; i < len; i++) {
                var hpResult = this.loader.getResult('hp');
                var hp = new createjs.Bitmap(hpResult);
                hp.scaleX = window.innerWidth / 649;
                hp.scaleY = window.innerHeight / 1136;
                hp.x = i * window.innerWidth / 649 * 62;
                hpContainer.addChild(hp);
            }
            if (this.currentHP <= 0) {
                this.gameOver();
                return false;
            }
            // hpContainer.x = canvas.width - hpContainer.getBounds().width - this.config.margin;
            // hpContainer.y = this.config.margin;
            hpContainer.x = 285 / 649 * window.innerWidth;
            hpContainer.y = 19 / 1136 * window.innerHeight;
        },
        updatePlane: function (point) {
            point.x = Math.min(point.x, canvas.width - this.config.plane.width);
            point.x = Math.max(point.x, 0);
            point.y = Math.min(point.y, canvas.height - this.config.plane.height);
            point.y = Math.max(point.y, 0);

            plane.x = point.x;
            plane.y = point.y;
        }
    };


    window.onload = gameManager.init.bind(gameManager);
    window.gameManager = gameManager;
})(window, createjs);
