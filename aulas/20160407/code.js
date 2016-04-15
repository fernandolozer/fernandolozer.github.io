var game;
var avatar;
var myObstacles = [];

function startGame() {
    game = new Game(document.getElementById("game"), 480, 270, updateFunc, 20);
    avatar = new GameObject(30, 30, "red", 10, 120);
    avatar.gravity = 0.075;
    score = new GameObject("30px", "Consolas", "black", 280, 40, "text");
    game.start();
}

function updateFunc() {
    var x, height, gap, minHeight, minGap, maxGap, maxHeight;
    for (var i = 0; i < myObstacles.length; i++) {
        if (avatar.crashWith(myObstacles[i])) {
            return;
        }
    }
    game.clear();
    game.frameno++;
    if (game.frameno == 1 || everyInterval(150)) {
        x = game.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        // insere no vetor de obstaculos
        // parte de cima
        myObstacles.push(new GameObject(
            10,
            height,
            "green",
            x,
            0
        ));
        // parte de baixo
        myObstacles.push(new GameObject(
            10,
            game.canvas.height - height - gap,
            "green",
            x,
            height + gap
        ));
    }
    score.text = "SCORE: " + game.frameno;
    score.update(game.context);
    avatar.newPos();
    avatar.update(game.context);

    for (var i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x += -1;
        myObstacles[i].update(game.context);
    }
}

// TODO: Almentar a velocidade a cada score de 1000, que pode
// ser utilizado como o ultimo exercicio da lista.
// TODO: Criar uma nova funcao que quando tiver keyup, reiniciar o jogo
function everyInterval(n) {
    return ((game.frameno / n) % 1 == 0);
}

window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (key == 32) {
        avatar.speedY -= 1.9;
    }
}

function Game(canvas, width, height, updateFunc, time) {
    this.canvas = canvas;
    this.start = function() {
        this.canvas.height = height;
        this.canvas.width = width;
        this.context = this.canvas.getContext("2d");
        this.frameno = 0;
        this.interval = setInterval(updateFunc, time);
    }
    this.clear = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function GameObject(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function(ctx) {
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitTop();
    }
    this.hitBottom = function() {
        var bottom = game.canvas.height - this.height;
        if (this.y > bottom) {
            this.y = bottom;
        }
    }
    this.hitTop = function() {
        var top = 0;
        if (this.y < top) {
            this.y = top;
        }
    }
    this.crashWith = function(obj2) {
        var myleft = this.x;
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;

        var otherleft = obj2.x;
        var otherright = obj2.x + obj2.width;
        var othertop = obj2.y;
        var otherbottom = obj2.y + obj2.height;

        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

window.onload = startGame;