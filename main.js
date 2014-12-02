
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
    str: 0,
    inte: 0,
    agi:0,
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
//item bonus
var itemBonus = {
    atkPwr: 0,
    matkPwr: 0,
    crit: 0,
    def: 0,
    mdef: 0,
    str: 0,
    inte: 0,
    agi: 0
}

//inventory
var inventory = {
    items: [],
    maxSize: 21
}

//equipped
var equipment = {
    hand: {},
    offhand: {},
    head: {},
    torso: {},
    legs: {},
    feet: {},
    hands: {},
    neck: {}
};

//items
var dagger = {
    name: 'dagger',
    img: 'images/dagger_bronze.png',
    equip: 'hand',
    atkPwr: 5,
    matkPwr: 0,
    str: 0,
    inte: 0,
    agi: 0
},
sword = {
    name: 'sword',
    img: 'images/sword_bronze.png',
    equip: 'hand',
    atkPwr: 10,
    matkPwr: 0,
    str: 0,
    inte: 0,
    agi: 0
};

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
    var zoneDamage = Math.ceil(zoneLvl*.25);
    var zoneExp = Math.round((zoneLvl*10.5) - Math.pow(level,1.2) + level);
    if(level >= zoneLvl) {
        if(hp.current > zoneDamage) {
            gold += zoneLvl;
            document.getElementById('gold').innerHTML = gold;
            hp.current -= zoneDamage;
            document.getElementById('hpBar').setAttribute('value', hp.current);
            updateHp();
            exp.current += Math.max(0,zoneExp);
            if(exp.current >= exp.max) {    //Level Up
                exp.current = 0;
                level = level + 1;
                exp.max = Math.floor(level*.5) + exp.max + 1;
                updateStats();
                updateHp();
                document.getElementById('level').innerHTML = level;
                printToLog("Congratulations, you leveled up to " + level);
                if(level >= 10) {
                    statPoints.free += 3;
                    document.getElementById('statPoints').innerHTML = statPoints.free;
                    toggleChooseStats(true);
                };
            };
            updateXp();
        } else {
            document.getElementById('errHp').innerHTML = "Not enough HP!";
        };
    } else {
        document.getElementById('errHp').innerHTML = "Not high enough Level!";
    }
};

function calcHp() {
    switch(charClass) {
        case 0:
            break;
        case 1:
            
            break;
        case 2:
            
            break;
        case 3:
            
            break;
        default:
    }
}

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

function equip(itemName) { //equips item
    var equipTo = itemName.equip;
    equipment[equipTo] = itemName;
    getEquipStats();
    updateStats();
}

function getEquipStats() { //Calculates and adds stats from equipped
    itemBonus.atkPwr = equipment.hand.atkPwr;
}

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
        updateStats();
    }
}

function checkClass() {
    if(statPoints.free != 0) {  //check for unused stat points
        toggleChooseStats(true);
    } else {
        toggleChooseStats(false);
    };
    if(charClass == 0 && level >= 10) {
        document.getElementById('classPick').style.display = 'block';
        document.getElementById('classtext').innerHTML = "Pick a class!";
    } else {
        document.getElementById('classPick').style.display = 'none';
        document.getElementById('classtext').innerHTML = "";
    };
}

function pickStat(id) {
    if(id == 1) {
        str++;
        statPoints.str++;
        statPoints.free--;
        document.getElementById('statPoints').innerHTML = statPoints.free;
    };
    if(id == 2) {
        inte++;
        statPoints.inte++;
        statPoints.free--;
        document.getElementById('statPoints').innerHTML = statPoints.free;
    };
    if(id == 3) {
        agi++;
        statPoints.agi++;
        statPoints.free--;
        document.getElementById('statPoints').innerHTML = statPoints.free;
    };
    if(statPoints.free <= 0) {
        toggleChooseStats(false);
    }
    updateStats();
}

function toggleChooseStats(state) {
    if(state) {
        document.getElementById('classtext').innerHTML = "You have unused Stat Points!";
        document.getElementById('statBox').style.display = 'block';
    } else {
        document.getElementById('classtext').innerHTML = "";
        document.getElementById('statBox').style.display = 'none';
    }
}

function updateStats() {
    switch(charClass) {
        case 0:
            hp.max = (level*6)+4;
            str = level;
            inte = level;
            agi = level;
            atkPwr = level*1.2 + itemBonus.atkPwr;
            matkPwr = level*1.2;
            document.getElementById('atk').innerHTML = prettify(atkPwr);
            document.getElementById('matk').innerHTML = prettify(matkPwr);
            document.getElementById('def').innerHTML = def;
            document.getElementById('mdef').innerHTML = mdef;
            document.getElementById('crit').innerHTML = crit;
            document.getElementById('str').innerHTML = str;
            document.getElementById('int').innerHTML = inte;
            document.getElementById('agi').innerHTML = agi;
            break;
        case 1:
            str = Math.floor(level*2.7) + statPoints.str;
            inte = level + statPoints.inte;
            agi = level + statPoints.agi;
            hp.max = Math.floor((level*str) - 200);
            hp.restoreRate = Math.floor(level / 3);
            atkPwr = (level * 3) + (str * 2.5) - 50;
            matkPwr = level + inte * 1.2;
            crit = ((agi * 25) / (level)) - 24;
            document.getElementById('atk').innerHTML = prettify(atkPwr);
            document.getElementById('matk').innerHTML = prettify(matkPwr);
            document.getElementById('def').innerHTML = def;
            document.getElementById('mdef').innerHTML = mdef;
            document.getElementById('crit').innerHTML = crit;
            document.getElementById('str').innerHTML = str + " (+" + statPoints.str + ")";
            document.getElementById('int').innerHTML = inte + " (+" + statPoints.inte + ")";
            document.getElementById('agi').innerHTML = agi + " (+" + statPoints.agi + ")";
            break;
        case 2:
            str = level + statPoints.str;
            inte = Math.floor(level*2.7) + statPoints.inte;;
            agi = level + statPoints.agi;
            hp.max = Math.floor((level * str * .7) + (inte * 4.5) - 100);
            hp.restoreRate = Math.floor(level / 3);
            atkPwr = level * 1.5;
            matkPwr = (level * 1.5) + (inte * 3.7);
            crit = Math.floor(((agi * 25) / (level)) - 25);
            document.getElementById('atk').innerHTML = prettify(atkPwr);
            document.getElementById('matk').innerHTML = prettify(matkPwr);
            document.getElementById('def').innerHTML = def;
            document.getElementById('mdef').innerHTML = mdef;
            document.getElementById('crit').innerHTML = prettify(crit);
            document.getElementById('str').innerHTML = str + " (+" + statPoints.str + ")";
            document.getElementById('int').innerHTML = inte + " (+" + statPoints.inte + ")";
            document.getElementById('agi').innerHTML = agi + " (+" + statPoints.agi + ")";
            break;
        case 3:
            str = level + statPoints.str;
            inte = level + statPoints.inte;;
            agi = Math.floor(level*2.7) + statPoints.agi;
            hp.max = Math.floor((level * str * .95) + ((agi + level) * 29) - 1150);
            hp.restoreRate = Math.floor(level / 3);
            atkPwr = ((level + str) * 2.5) + ((agi + level) * 2.3) - 100;
            matkPwr = level + inte * 1.3;
            crit = Math.floor(((agi * 25) / (level)) - 65);
            document.getElementById('atk').innerHTML = prettify(atkPwr);
            document.getElementById('matk').innerHTML = prettify(matkPwr);
            document.getElementById('def').innerHTML = def;
            document.getElementById('mdef').innerHTML = mdef;
            document.getElementById('crit').innerHTML = crit;
            document.getElementById('str').innerHTML = str + " (+" + statPoints.str + ")";
            document.getElementById('int').innerHTML = inte + " (+" + statPoints.inte + ")";
            document.getElementById('agi').innerHTML = agi + " (+" + statPoints.agi + ")";
            break;
        default:
    };
    document.getElementById('statPoints').innerHTML = statPoints.free;
}

function addInvTable() {
    var tableDiv = document.getElementById("inv_table");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    
    tableDiv.className = "table-responsive";
    
    table.appendChild(tableBody);
    
    var items = inventory.items;
    
    var k = 0; //index for items array
    for (i = 0; i < 3; i++) {
        var tr = document.createElement('TR');
        tr.style.height = "60px";
        for (j = 0; j < 7; j++) {
            var th = document.createElement('TH');
            if(items[k]) {
                var x = document.createElement("IMG");
                var xloc = items[k].img;
                x.setAttribute("src", xloc);
                x.setAttribute("alt", items[k].name);
                th.setAttribute("width", "75");
                th.appendChild(x);
            };
            tr.appendChild(th);
            k++;
        }
        tableBody.appendChild(tr);
    }
    tableDiv.appendChild(table);
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
        partyCurrSize: party.currSize,
        str: str,
        inte: inte,
        agi: agi,
        spStr: statPoints.str,
        spInt: statPoints.inte,
        spAgi: statPoints.agi,
        spF: statPoints.free,
        equipment: equipment,
        inventory: inventory
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
        if (typeof savegame.str !== "undefined") str = savegame.str;
        if (typeof savegame.inte !== "undefined") inte = savegame.inte;
        if (typeof savegame.agi !== "undefined") agi = savegame.agi;
        if (typeof savegame.spStr !== "undefined") statPoints.str = savegame.spStr;
        if (typeof savegame.spInt !== "undefined") statPoints.inte = savegame.spInt;
        if (typeof savegame.spAgi !== "undefined") statPoints.agi = savegame.spAgi;
        if (typeof savegame.spF !== "undefined") statPoints.free = savegame.spF;
        if (typeof savegame.equipment.hand !== "undefined") equipment.hand = savegame.equipment.hand;
        if (typeof savegame.equipment.offhand !== "undefined") equipment.offhand = savegame.equipment.offhand;
        if (typeof savegame.equipment.head !== "undefined") equipment.head = savegame.equipment.head;
        if (typeof savegame.equipment.torso !== "undefined") equipment.torso = savegame.equipment.torso;
        if (typeof savegame.equipment.legs !== "undefined") equipment.legs = savegame.equipment.legs;
        if (typeof savegame.equipment.feet !== "undefined") equipment.feet = savegame.equipment.feet;
        if (typeof savegame.equipment.hands !== "undefined") equipment.hands = savegame.equipment.hands;
        if (typeof savegame.equipment.neck !== "undefined") equipment.neck = savegame.equipment.neck;
        if (typeof savegame.inventory.items !== "undefined") inventory.items = savegame.inventory.items;
        if (typeof savegame.inventory.maxSize !== "undefined") inventory.maxSize = savegame.inventory.maxSize;
    };
    updateVars();
    updateXp();
    updateStats();
    inventory.items[0] = dagger;
    inventory.items[1] = dagger;
    inventory.items[2] = dagger;
    inventory.items[3] = dagger;
    inventory.items[4] = dagger;
    inventory.items[5] = dagger;
    inventory.items[6] = dagger;
    inventory.items[7] = dagger;
    inventory.items[8] = dagger;
    inventory.items[9] = dagger;
    addInvTable();
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
    
    //stats
    document.getElementById('atk').innerHTML = atkPwr;
    document.getElementById('matk').innerHTML = matkPwr;
    document.getElementById('def').innerHTML = def;
    document.getElementById('mdef').innerHTML = mdef;
    document.getElementById('crit').innerHTML = crit;
    document.getElementById('str').innerHTML = str;
    document.getElementById('int').innerHTML = inte;
    document.getElementById('agi').innerHTML = agi;
    
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

//Buff duration
window.setInterval(function() {
    var dec = 5;//every 5 seconds
}, 5000);

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