var player = {
    name: "",
    loc: "",
    level: 99,
    maxhp: 100,
    currhp: 100,
    xp: 0
};

var enemy = {
    name: "",
    loc: "",
    level: 99,
    maxhp: 100,
    currhp: 100,
    xp: 0
};

var playerDamage = 0;
var enemyDamage = 0;
var requestAnimFrame = window.mozRequestAnimationFrame  ||
                                window.webkitRequestAnimationFrame  ||
                                window.msRequestAnimationFrame  ||
                                window.oRequestAnimationFrame;

function loadPlayer(name) {
    player.name = name.charAt(0).toUpperCase() + name.slice(1);
    player.loc = "images/" + name + "B.gif";
    
    var playerName = document.getElementById("playerName");
    var text = document.createTextNode(player.name + " lv." + player.level);
    //playerName.appendChild(text);
    var img = document.getElementById("playerImg");
    var imgurl = document.createElement("IMG");
    imgurl.setAttribute("src", player.loc);
    img.appendChild(imgurl);
}

function loadEnemy(name) {
    enemy.name = name.charAt(0).toUpperCase() + name.slice(1);
    enemy.loc = "images/" + name + "F.gif";
    
    var enemyName = document.getElementById("enemyName");
    var text = document.createTextNode(enemy.name);
    //enemyName.appendChild(text);
    var img = document.getElementById("enemyImg");
    var imgurl = document.createElement("IMG");
    imgurl.setAttribute("src", enemy.loc);
    img.appendChild(imgurl);
}

function loadBattle() {
    var player = "kyurem-black";
    var enemy = "kyurem-white";
    loadPlayer(player);
    loadEnemy(enemy);
    createCanvas(player,enemy);
    updateHp();
}

function createCanvas() {
    var loader = new PxLoader(), 
    backgroundImg = loader.addImage('images/BG_grass.png'), 
    platformImg = loader.addImage('images/PF_grass.png'),
    bar = loader.addImage('images/bar.png');
    
    loader.addCompletionListener(function() { 
        var canvas = document.getElementById('game'), 
            ctx = canvas.getContext('2d'); 
     
        ctx.drawImage(backgroundImg, 0, 0, 600, 450); 
        ctx.drawImage(platformImg, 0, 0, 600, 450); 
        ctx.drawImage(bar, 80, 250, 200, 50); 
        ctx.drawImage(bar, 360, 50, 200, 50);
        ctx.shadowColor = "black";
        ctx.shadowOffsetX = 1; 
        ctx.shadowOffsetY = 1; 
        ctx.shadowBlur = 2;
        ctx.scale(1,1);
        ctx.font = '14px Verdana';
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'white';
        ctx.fillText(player.name, 95, 240);
        ctx.fillText(enemy.name, 375, 40);
        ctx.font = '15px Courier New';
        ctx.fillText('lv.' + player.level, 225, 240);
        ctx.fillText('lv.' + enemy.level, 510, 40);
        
        ctx.fillStyle="#CF0720";
        ctx.fillRect(95,262,(player.currhp/player.maxhp)*165,13);
        ctx.fillRect(375,62,(enemy.currhp/enemy.maxhp)*165,13);
    }); 
     
    // begin downloading images 
    loader.start();
}

function updateHp() {
        var canvas = document.getElementById('game'), 
            ctx = canvas.getContext('2d'); 
            
        
        ctx.clearRect(95, 262, 165, 13);
        ctx.clearRect(375, 62, 165, 13);
        ctx.fillStyle="#CF0720";
        ctx.fillRect(95,262,(player.currhp/player.maxhp)*165,13);
        ctx.fillRect(375,62,(enemy.currhp/enemy.maxhp)*165,13);
        
        if(playerDamage > 0) {
            if(player.currhp <= 0)
                return;
            player.currhp -= 1;
            playerDamage -= 1;
        }
        if(enemyDamage > 0) {
            if(enemy.currhp <= 0)
                return;
            enemy.currhp -= 1;
            enemyDamage -= 1;
        }
        
        requestAnimFrame(updateHp);
}

function damage(person, amount) {
    if(person == "player") {
        person = this.player;
    } else {
        person = this.enemy;
    }
    var hp = person.currhp;
    if(amount >= hp) {
        for(i = person.currhp; i > 0; i--) {
            person.currhp --;
            requestAnimFrame(updateHp);
        }
    } else {
        for(i = amount; i > 0; i--) {
            console.log(person.currhp);
            person.currhp --;
            requestAnimFrame(updateHp);
        }
    }
}