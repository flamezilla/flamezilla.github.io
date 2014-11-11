
//initialize data
var gold = 0;
var hp = {
    current:10,
    max:10,
    restoreRate:.5
};
var exp = {
    current:0,
    max:10
};
var level = 1;
var heroes = 0;
var heroCost = 10;
var inTown = true;


function getGold(number) {
    gold = gold + number;
    document.getElementById('gold').innerHTML = gold;
};

function kill() {
    if(hp.current > 1) {
        gold = gold + 1;
        document.getElementById('gold').innerHTML = gold;
        hp.current = hp.current - 1;
        document.getElementById('hpBar').setAttribute('value', hp.current);
        updateHp();
        exp.current = exp.current + 1;
        if(exp.current == exp.max) {
            exp.current = 0;
            level = level + 1;
            exp.max = Math.floor(level*.5) + exp.max + 1;
            hp.max = Math.ceil(Math.log(hp.max) + hp.max);
            document.getElementById('level').innerHTML = level;
        };
        updateXp();
    } else {
        document.getElementById('errHp').innerHTML = "Not enough HP!";
    };
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
        document.getElementById('heroCost').innerHTML = nextCost;
    } else {
        document.getElementById('errGold').innerHTML = "Not enough Gold!";
    };
    document.getElementById('gps').innerHTML = heroes;
};

function save () {
    var save = {
        gold: gold,
        heroes: heroes,
        heroCost: heroCost,
        level: level,
        expCurr: exp.current,
        expMax: exp.max,
        hpCurr: hp.current,
        hpMax: hp.max        
    }
    localStorage.setItem("save",JSON.stringify(save));
};

function load() {
    if (localStorage.getItem("save")) {
        var savegame = JSON.parse(localStorage.getItem("save"));
        if (typeof savegame.heroes !== "undefined") heroes = savegame.heroes;
        if (typeof savegame.gold !== "undefined") gold = savegame.gold;
        if (typeof savegame.heroCost !== "undefined") heroCost = savegame.heroCost;
        if (typeof savegame.level !== "undefined") level = savegame.level;
        if (typeof savegame.expCurr !== "undefined") exp.current = savegame.expCurr;
        if (typeof savegame.expMax !== "undefined") exp.max = savegame.expMax;
        if (typeof savegame.hpCurr !== "undefined") hp.current = savegame.hpCurr;
        if (typeof savegame.hpMax !== "undefined") hp.max = savegame.hpMax;
    };
    updateVars();
    updateXp();
}

function deleteSave() {
    localStorage.removeItem("save");
};

function updateVars() {
    document.getElementById('gold').innerHTML = gold;
    document.getElementById('heroes').innerHTML = heroes;
    heroCost = Math.floor(10 * Math.pow(1.1,heroes));
    document.getElementById('heroCost').innerHTML = heroCost;
    document.getElementById('gps').innerHTML = heroes;
    document.getElementById('hpCurr').innerHTML = hp.current;
    document.getElementById('hpMax').innerHTML = hp.max;
    document.getElementById('level').innerHTML = level;
    document.getElementById('expCurr').innerHTML = exp.current;
    document.getElementById('expMax').innerHTML = exp.max;
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
    document.getElementById('hp').innerHTML = Math.round(prettify(((hp.current*100)/(hp.max*100)))*100);
    document.getElementById('hpCurr').innerHTML = hp.current;
    document.getElementById('hpMax').innerHTML = hp.max;
    document.getElementById('hpRate').innerHTML = hp.restoreRate;
}

function updateXp() {
    document.getElementById('expBar').setAttribute('value', exp.current);
    document.getElementById('expBar').setAttribute('max', exp.max);
    document.getElementById('exp').innerHTML = Math.round(prettify(((exp.current*100)/(exp.max*100)))*100);
    document.getElementById('expCurr').innerHTML = exp.current;
    document.getElementById('expMax').innerHTML = exp.max;
}

function prettify(input){
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

window.setInterval(function() {
    getGold(heroes);
    updateHp();
    if(hp.current < hp.max) {
        console.log(hp.restoreRate);
        hp.current = hp.restoreRate + hp.current;
        if(hp.current > hp.max) {
            hp.current = hp.max;
        }
    }
    document.getElementById("errHp").innerHTML = "";
    document.getElementById("errGold").innerHTML = "";
}, 1000);

window.setInterval(function() {
    save();
    var currentdate = new Date(); 
    var datetime = currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();
    console.log(datetime + " saved");
}, 30000);