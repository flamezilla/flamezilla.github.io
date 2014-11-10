
//initialize data
var gold = 0;
var hp = {
    current:10,
    max:10,
    restoreRate:.05
};
var exp = 0;
var heroes = 0;
var heroCost = 10;
var inTown = true;


function getGold(number) {
    gold = gold + number;
    document.getElementById("gold").innerHTML = gold;
    hp.current = hp.current - 1;
    document.getElementById("hpBar").setAttribute('value', hp.current);
    updateHp();
};

function buyHero() {
    heroCost = Math.floor(10 * Math.pow(1.1,heroes));
    if(gold >= heroCost) {
        gold = gold - heroCost;
        heroes = heroes + 1;
        document.getElementById('gold').innerHTML = gold;
        document.getElementById('heroes').innerHTML = heroes;
        var nextCost = Math.floor(10 * Math.pow(1.1,heroes));
        document.getElementById('heroCost').innerHTML = nextCost;
    };
};

function save () {
    var save = {
        gold: gold,
        heroes: heroes,
        heroCost: heroCost
    }
    localStorage.setItem("save",JSON.stringify(save));
};

function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.gold !== "undefined") gold = savegame.gold;
    if (typeof savegame.heroes !== "undefined") heroes = savegame.heroes;
    if (typeof savegame.heroCost !== "undefined") heroCost = savegame.heroCost;
    updateVars();
}

function deleteSave() {
    localStorage.removeItem("save");
};

function updateVars() {
    document.getElementById('gold').innerHTML = gold;
    document.getElementById('heroes').innerHTML = heroes;
    heroCost = Math.floor(10 * Math.pow(1.1,heroes));
    document.getElementById('heroCost').innerHTML = heroCost;
};

function updateHp() {
    var low = hp.max*.25;
    var high = hp.max*.75;
    var optimum = hp.max*.85;
    document.getElementById('hpBar').setAttribute('max', hp.max);
    document.getElementById('hpBar').setAttribute('high', high);
    document.getElementById('hpBar').setAttribute('low', low);
    document.getElementById('hpBar').setAttribute('optimum', optimum);
    document.getElementById('hpBar').setAttribute('value', hp.current);
    document.getElementById('hp').innerHTML = (hp.current/hp.max)*100;
}

window.setInterval(function() {
    //getGold(heroes);
    updateHp();
    if(hp.current != hp.max) {
        console.log(hp.restoreRate);
        hp.current = hp.restoreRate*hp.max + hp.current;
    }
}, 1000);

window.setInterval(function() {
    save();
    var currentdate = new Date(); 
    var datetime = currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();
    console.log(datetime + " saved");
}, 30000);