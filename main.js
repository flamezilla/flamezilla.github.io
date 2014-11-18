
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
var charClass = 0;
var heroes = 0;
var heroCost = 10;
var inTown = true;
var upgrades = {
    restoreRateLvl:0,
    restoreRateCost:300,
    goldRate:0,
    goldRateCost:300
};
var party = {
    maxSize:1,
    currSize:1
};
var pet = {
    level:0,
    hp:0
};
var statPoints = {
    used: 0,
    free: 0
};
//attributes
var atkPwr = 0,
matkPwr = 0,
crit = 0,
def = 0,
mdef = 0,
str = 0,
inte = 0,
agi = 0;

function getClass(classN) {
    var className = "";
    switch(classN) {
        case 0:
            className = "Apprentice";
            break;
        case 1:
            className = "Warrior";
            break;
        case 2:
            className = "Mage";
            break;
        case 3:
            className = "Assassin";
            break;
        default:
            className = "Apprentice";
    }
    document.getElementById('className').innerHTML = className;
}

function getGold(number) {
    gold = gold + number;
    document.getElementById('gold').innerHTML = gold;
};

function kill(zoneLvl) {
    var zoneDamage = Math.ceil(zoneLvl*0.25);
    var zoneExp = Math.round((zoneLvl*10.5) - Math.pow(level,1.2) + level);
    if(level >= zoneLvl) {
        if(hp.current > zoneDamage) {
            gold += zoneLvl;
            document.getElementById('gold').innerHTML = gold;
            hp.current -= zoneDamage;
            document.getElementById('hpBar').setAttribute('value', hp.current);
            updateHp();
            exp.current += Math.max(0,zoneExp);
            if(exp.current >= exp.max) {
                exp.current = 0;
                level = level + 1;
                exp.max = Math.floor(level*.5) + exp.max + 1;
                hp.max = Math.ceil(Math.log(hp.max) + hp.max);
                document.getElementById('level').innerHTML = level;
                printToLog("Level up!");
            };
            if(level >= 10) {
                toggleChooseStats(true);
            }
            updateXp();
        } else {
            document.getElementById('errHp').innerHTML = "Not enough HP!";
        };
    } else {
        document.getElementById('errHp').innerHTML = "Not high enough Level!";
    }
};

function buyUpgrade(upgrade) {
    restoreRateCost = (upgrades.restoreRateLvl+1)*300;
    if(upgrade == "restoreRate" && gold >= restoreRateCost) {
        gold -= (upgrades.restoreRateLvl+1)*300;
        upgrades.restoreRateLvl++;
        hp.restoreRate = hp.restoreRate + upgrades.restoreRateLvl*.1;
        document.getElementById('hpRate').innerHTML = prettify(hp.restoreRate);
        var nextCost = (upgrades.restoreRateLvl+1)*300;
        document.getElementById('restoreRateC').innerHTML = nextCost;
    } else {
        document.getElementById('errUpgrade').innerHTML = "Not enough Gold!";
    }

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
    } else {
        document.getElementById('errGold').innerHTML = "Not enough Gold!";
    };
    document.getElementById('gps').innerHTML = heroes;
};

function unlockAbility(ability) {
    if(ability == "party") {
        party.maxSize = 5;
        updateVars();
    };
};

function pickClass(id) {
    if(charClass == 0) {
        charClass = Number(id);
        getClass(charClass);
        document.getElementById('classPick').style.display = 'none';
        document.getElementById('classtext').innerHTML = "";
    }
}

function checkClass() {
    if(charClass == 0 && level >= 10) {
        document.getElementById('classPick').style.display = 'block';
        document.getElementById('classtext').innerHTML = "Pick a class!";
    } else {
        document.getElementById('classPick').style.display = 'none';
        document.getElementById('classtext').innerHTML = "";
    };
}

function toggleChooseStats(state) {
    if(state) {
        document.getElementById('statBox').style.display = 'block';
    } else {
        document.getElementById('statBox').style.display = 'none';
    }
}

function printToLog(text) {
    var $newLine = $(document.createElement("li"));
    $newLine.attr({
        class: "list-group-item"
    });

    var currentdate = new Date();
    var datetime = currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    $newLine.html(datetime + ": " + text);

    $("#log").append($newLine);

    $("#log").scrollTop($("#log")[0].scrollHeight);
}

function save () {
    var save = {
        gold: gold,
        heroes: heroes,
        heroCost: heroCost,
        level: level,
        expCurr: exp.current,
        expMax: exp.max,
        hpCurr: hp.current,
        hpMax: hp.max,
        hpRest: hp.restoreRate,
        charClass: charClass,
        restoreRateLvl: upgrades.restoreRateLvl,
        restoreRateCost: upgrades.restoreRateCost,
        goldRate: upgrades.goldRate,
        goldRateC: upgrades.goldRateC,
        partyMaxSize: party.maxSize,
        partyCurrSize: party.currSize
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
        if (typeof savegame.hpRest !== "undefined") hp.restoreRate = savegame.hpRest;
        if (typeof savegame.charClass !== "undefined") charClass = savegame.charClass;
        if (typeof savegame.restoreRateLvl !== "undefined") upgrades.restoreRateLvl = savegame.restoreRateLvl;
        if (typeof savegame.restoreRateCost !== "undefined") upgrades.restoreRateCost = savegame.restoreRateCost;
        if (typeof savegame.goldRate !== "undefined") upgrades.goldRate = savegame.goldRate;
        if (typeof savegame.goldRateCost !== "undefined") upgrades.goldRateC = savegame.goldRateCost;
        if (typeof savegame.partyMaxSize !== "undefined") party.maxSize = savegame.partyMaxSize;
        if (typeof savegame.partyCurrSize !== "undefined") party.currSize = savegame.partyCurrSize;
    };
    updateVars();
    updateXp();
}

function deleteSave() {
    localStorage.removeItem("save");
    location.reload();
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
    //hp.restoreRate = hp.restoreRate + upgrades.restoreRateLvl*.1;
    document.getElementById('hpRate').innerHTML = prettify(hp.restoreRate);
    restoreRateCost = (upgrades.restoreRateLvl+1)*300;
    document.getElementById('restoreRateC').innerHTML = restoreRateCost;
    document.getElementById('maxPartySize').innerHTML = party.maxSize;
    document.getElementById('currPartySize').innerHTML = party.currSize;
    getClass(charClass);
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
    document.getElementById('hpCurr').innerHTML = prettify(hp.current);
    document.getElementById('hpMax').innerHTML = hp.max;
    document.getElementById('hpRate').innerHTML = prettify(hp.restoreRate);
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
        hp.current = hp.restoreRate + hp.current;
        if(hp.current > hp.max) {
            hp.current = hp.max;
        }
    }
}, 1000);

window.setInterval(function() {
    document.getElementById("errHp").innerHTML = "";
    document.getElementById("errGold").innerHTML = "";
    document.getElementById("errUpgrade").innerHTML = "";
}, 5000);

window.setInterval(function() {
    save();
    var currentdate = new Date();
    var datetime = currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    console.log(datetime + " saved");
    printToLog("auto save");
}, 30000);