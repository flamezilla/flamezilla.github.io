
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
var starterPack = false;
var upgrades = {
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
    maxSize: 24
}

//equipped
var equipment = {
    hand: {},
    offhand: {},
    head: {},
    torso: {},
    legs: {},
    feet: {},
    gloves: {},
    neck: {}
};

//items
var bronze_dagger = {
    name: 'Dagger',
    img: 'images/new/W_Dagger001.png',
    type: 'weapon',
    quality: 'text-muted',
    equip: 'hand',
    atkPwr: 5,
    matkPwr: 0,
    str: 10,
    inte: 0,
    agi: 0,
    upgrade: 0,
    equipD: 'One-Hand',
    disc: 'A shitty dagger',
    moniker: 'bronze_dagger'
},
bronze_sword = {
    name: 'Sword',
    img: 'images/new/W_Sword001.png',
    type: 'weapon',
    quality: 'text-muted',
    equip: 'hand',
    atkPwr: 10,
    matkPwr: 0,
    str: 30,
    inte: 20,
    agi: 10,
    upgrade: 0,
    equipD: 'One-Hand',
    disc: 'A shitty sword',
    moniker: 'bronze_sword'
};
bronze_chestpiece = {
    name: 'Bronze Chestpiece',
    img: 'images/new/A_Armour01.png',
    type: 'armor',
    quality: 'text-muted',
    equip: 'torso',
    def: 10,
    mdef: 10,
    str: 0,
    inte: 0,
    agi: 0,
    upgrade: 0,
    equipD: 'Chest',
    disc: 'Shitty chest armor',
    moniker: 'bronze_chestpiece'
};
hp_potion = {
    name: 'Health Potion',
    img: 'images/new/P_Red03.png',
    type: 'potion',
    quality: 'text-muted',
    equip: 'mouth',
    disc: 'Recovers 50 HP',
    moniker: 'hp_potion'
};
wep_upgrade = {
    name: 'Weapon Upgrade Stone',
    img: 'images/new/I_Rubi.png',
    type: 'item',
    quality: 'text-primary',
    equip: 'weapon',
    disc: "Chance to increase a weapon's upgrade level by 1",
    moniker: 'wep_upgrade'
};
armor_upgrade = {
    name: 'Armor Upgrade Stone',
    img: 'images/new/I_Saphire.png',
    type: 'item',
    quality: 'text-primary',
    equip: 'armor',
    disc: "Chance to increase an armor's upgrade level by 1",
    moniker: 'armor_upgrade'
};


//monsters


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


function addToInv(itemName, amount) {
    if(amount > (inventory.maxSize - inventory.items.length)) {
        var d = document.createElement('DIV');
        d.className = "alert alert-warning";
        var a = document.createElement("A");
        a.setAttribute("href", "#");
        a.setAttribute("data-dismiss", "alert");
        a.className = "close";
        var t = document.createTextNode("x");
        var text = document.createTextNode("Not enough inventory space!");
        d.appendChild(a);
        a.appendChild(t);
        d.appendChild(text);
        document.getElementById("tab3Content").appendChild(d);
    } else {
        if(amount <= inventory.maxSize - inventory.items.length) {
            for(i = 0; i < amount; i++) {
                inventory.items.push(itemName);
            }
        }
        updateInvTable();
    }
    
}

function removeFromInv(itemName) {
    inventory.items.splice(inventory.items.indexOf(itemName), 1);
    updateInvTable()
}

function useItem(itemName) {
    if(itemName.type == 'weapon' || itemName.type == 'armor') {
        equip(itemName);
        return;
    };
    if(itemName.type == 'potion') {
        if(hp.current < hp.max) {
            var restore = Math.floor(hp.max * .3);
            hp.current += restore;
            if(hp.current > hp.max) {
                hp.current = hp.max;
            }
            updateHp();
            removeFromInv(itemName);
            printToLog("Used " + itemName.name + "!");
        }
    };
}

function getUpgradeProb(curr) {
    var chance = new Chance();
    
    var prob = 100 - (5 * curr);
    if(curr > 19)
        prob  = 1;
    return chance.bool({likelihood: prob});
}

function upgradeItem(itemName, pos) {
    if(itemName.type == 'weapon') {
        var k = inventory.items.indexOf(wep_upgrade);
        if(k == -1) {
            printToLog("You don't have the required upgrade stone!");
            return;
        }
        removeFromInv(wep_upgrade);
        if(getUpgradeProb(inventory.items[pos].upgrade)) {
            inventory.items[pos].upgrade++;
            updateInvTable();
            printToLog("Upgrade successful! Upgraded to +" + inventory.items[pos].upgrade);
        } else {
            printToLog("Upgrade failed!");
        }
        return;
    };
    if(itemName.type == 'armor') {
        var k = inventory.items.indexOf(armor_upgrade);
        if(k == -1) {
            printToLog("You don't have the required upgrade stone!");
            return;
        }
        removeFromInv(armor_upgrade);
        if(getUpgradeProb(inventory.items[pos].upgrade)) {
            inventory.items[pos].upgrade++;
            updateInvTable();
            printToLog("Upgrade successful! Upgraded to +" + inventory.items[pos].upgrade);
        } else {
            printToLog("Upgrade failed!");
        }
        return;
    };
}

function equip(itemName) { //equips item
    var equipTo = itemName.equip;
    equipment[equipTo] = itemName;
    getEquipStats();
    updateStats();
    updateEquipment();
    printToLog("Equipped " + itemName.name + "!");
}

function updateEquipment(){ 
    var hand = document.getElementById("equipHand");
    var offhand = document.getElementById("equipOffhand");
    var head = document.getElementById("equipHead");
    var torso = document.getElementById("equipTorso");
    var legs = document.getElementById("equipLegs");
    var feet = document.getElementById("equipFeet");
    var gloves = document.getElementById("equipGloves");
    var neck = document.getElementById("equipNeck");
    var equipList = [];
    equipList.push(hand);
    equipList.push(offhand);
    equipList.push(head);
    equipList.push(torso);
    equipList.push(legs);
    equipList.push(feet);
    equipList.push(gloves);
    equipList.push(neck);
    var equipList2 = [];
    equipList2.push("hand");
    equipList2.push("offhand");
    equipList2.push("head");
    equipList2.push("torso");
    equipList2.push("legs");
    equipList2.push("feet");
    equipList2.push("gloves");
    equipList2.push("neck");
    
    
    for(i = 0; i < 8; i++) {
        if(equipList[i].hasChildNodes()) equipList[i].removeChild(equipList[i].firstChild);
        var img = document.createElement('IMG');
        if(typeof equipment[equipList2[i]].img != "undefined") img.setAttribute("src", equipment[equipList2[i]].img);
        equipList[i].appendChild(img);
    }
    /*
    if(hand.hasChildNodes()) hand.removeChild(hand.firstChild);
    var img = document.createElement('IMG');
    if(typeof equipment.hand.img != "undefined") img.setAttribute("src", equipment.hand.img);
    hand.appendChild(img);
    
    if(offhand.hasChildNodes()) offhand.removeChild(offhand.firstChild);
    img = document.createElement('IMG');
    if(typeof equipment.offhand.img != "undefined") img.setAttribute("src", equipment.offhand.img);
    offhand.appendChild(img);
    
    if(head.hasChildNodes()) head.removeChild(head.firstChild);
    img = document.createElement('IMG');
    if(typeof equipment.head.img != "undefined") img.setAttribute("src", equipment.head.img);
    head.appendChild(img);
    
    if(torso.hasChildNodes()) torso.removeChild(torso.firstChild);
    img = document.createElement('IMG');
    if(typeof equipment.torso.img != "undefined") img.setAttribute("src", equipment.torso.img);
    torso.appendChild(img);
    
    if(legs.hasChildNodes()) legs.removeChild(legs.firstChild);
    img = document.createElement('IMG');
    if(typeof equipment.legs.img != "undefined") img.setAttribute("src", equipment.legs.img);
    legs.appendChild(img);
    
    if(gloves.hasChildNodes()) gloves.removeChild(gloves.firstChild);
    img = document.createElement('IMG');
    if(typeof equipment.gloves.img != "undefined") img.setAttribute("src", equipment.gloves.img);
    gloves.appendChild(img);
    
    if(feet.hasChildNodes()) feet.removeChild(feet.firstChild);
    img = document.createElement('IMG');
    if(typeof equipment.feet.img != "undefined") img.setAttribute("src", equipment.feet.img);
    feet.appendChild(img);
    
    if(neck.hasChildNodes()) neck.removeChild(neck.firstChild);
    img = document.createElement('IMG');
    if(typeof equipment.neck.img != "undefined") img.setAttribute("src", equipment.neck.img);
    neck.appendChild(img);*/
    
}

function getEquipStats() { //Calculates and adds stats from equipped
    if(typeof equipment.hand.atkPwr != "undefined") itemBonus.atkPwr = equipment.hand.atkPwr;
    if(typeof equipment.hand.matkPwr != "undefined") itemBonus.matkPwr = equipment.hand.matkPwr;
    if(typeof equipment.hand.str != "undefined") itemBonus.str = equipment.hand.str;
    if(typeof equipment.hand.inte != "undefined") itemBonus.inte = equipment.hand.inte;
    if(typeof equipment.hand.agi != "undefined") itemBonus.agi = equipment.hand.agi;
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
    getEquipStats();
    switch(charClass) {
        case 0:
            hp.max = (level*6)+4;
            str = level + itemBonus.str;
            inte = level + itemBonus.inte;
            agi = level + itemBonus.agi;
            atkPwr = level*1.2 + itemBonus.atkPwr;
            matkPwr = level*1.2 + itemBonus.matkPwr;
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
            str = Math.floor(level*2.7) + statPoints.str + itemBonus.str;
            inte = level + statPoints.inte + itemBonus.inte;
            agi = level + statPoints.agi + itemBonus.agi;
            hp.max = Math.floor((level*str) - 200);
            hp.restoreRate = Math.floor(level / 3);
            atkPwr = (level * 3) + (str * 2.5) - 50 + itemBonus.atkPwr;
            matkPwr = level + inte * 1.2 + itemBonus.matkPwr;
            crit = Math.floor(((agi * 25) / (level)) - 24);
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
            str = level + statPoints.str + itemBonus.str;
            inte = Math.floor(level*2.7) + statPoints.inte + itemBonus.inte;
            agi = level + statPoints.agi + itemBonus.agi;
            hp.max = Math.floor((level * str * .7) + (inte * 4.5) - 100);
            hp.restoreRate = Math.floor(level / 3);
            atkPwr = level * 1.5 + itemBonus.atkPwr;
            matkPwr = (level * 1.5) + (inte * 3.7) + itemBonus.matkPwr;
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
            str = level + statPoints.str; + itemBonus.str
            inte = level + statPoints.inte + itemBonus.inte;
            agi = Math.floor(level*2.7) + statPoints.agi + itemBonus.agi;
            hp.max = Math.floor((level * str * .95) + ((agi + level) * 29) - 1150);
            hp.restoreRate = Math.floor(level / 3);
            atkPwr = ((level + str) * 2.5) + ((agi + level) * 2.3) - 100 + itemBonus.atkPwr;
            matkPwr = level + inte * 1.3 + itemBonus.matkPwr;
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

function updateInvTable() {
    var parent = document.getElementById("inventoryT");
    parent.removeChild(parent.firstChild);
    var s = document.createTextNode("Inventory (" + inventory.items.length + "/" + inventory.maxSize + ")");
    parent.appendChild(s);
    
    parent = document.getElementById("inv_table");
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.firstChild);
    }
    
    
    var tableDiv = document.getElementById("inv_table");
    var table = document.createElement('TABLE');
    table.setAttribute("id", "table1");
    var tableBody = document.createElement('TBODY');
    
    tableDiv.className = "table-responsive";
    table.className = "table table-bordered table-striped";
    
    table.appendChild(tableBody);
    
    var items = inventory.items;
    
    var k = 0; //index for items array
    for (i = 0; i < Math.ceil(inventory.maxSize/6); i++) {
        var tr = document.createElement('TR');
        tr.style.height = "60px";
        for (j = 0; j < 6; j++) {
            var th = document.createElement('TH');
            th.setAttribute("width", "77");
            //th.style.width = "14%";
            if(items[k]) {
                var x = document.createElement("INPUT");
                var xloc = items[k].img;
                x.setAttribute("type", "image");
                x.setAttribute("src", xloc);
                x.setAttribute("name", items[k].name);
                x.setAttribute("class", "btn");
                x.setAttribute("id", "item" + k);
                x.setAttribute("data-toggle", "modal");
                x.setAttribute("data-target", "#itemM" + k);
                
                var div = document.createElement('DIV');
                div.className = "modal fade";
                div.setAttribute("id", "itemM" + k);
                div.setAttribute("tabindex", "-1");
                div.setAttribute("role", "dialog");
                div.setAttribute("aria-labelledby", "mySmallModalLabel");
                div.setAttribute("aria-hidden", "true");
                
                var div2 = document.createElement('DIV');
                div2.className = "modal-dialog modal-sm";
                div.appendChild(div2);
                
                var modal = document.createElement('DIV');
                modal.className = "modal-content";
                div2.appendChild(modal);
                
                var modalHeader = document.createElement('DIV');
                modalHeader.className = "modal-header";
                modal.appendChild(modalHeader);
                
                var header = document.createElement('H4');
                header.className = "modal-title";
                var t = document.createTextNode(items[k].name);
                if(items[k].type == "weapon" || items[k].type == "armor") {
                    if(items[k].upgrade > 0) {
                        var t = document.createTextNode(items[k].name + " (+" + items[k].upgrade + ")");
                    }
                };
                header.className = items[k].quality;
                header.appendChild(t);
                modalHeader.appendChild(header);
                
                var modalBody = document.createElement('DIV');
                modalBody.className = "modal-body";
                modal.appendChild(modalBody);
                var p = document.createElement('P');
                p.className = "text-muted small";
                var em = document.createElement('EM');
                em.appendChild(document.createTextNode(items[k].disc));
                if(items[k].type == "weapon" || items[k].type == "armor") {
                    var statsP = document.createElement('P');
                    var stats = document.createTextNode(items[k].equipD);
                    statsP.appendChild(stats);
                    statsP.appendChild(document.createElement("br"));
                    if(items[k].atkPwr > 0) {
                        stats = document.createTextNode(items[k].atkPwr + " Attack Power");
                        statsP.appendChild(stats);
                        statsP.appendChild(document.createElement("br"));
                    }
                    if(items[k].matkPwr > 0) {
                        stats = document.createTextNode(items[k].atkPwr + " Magic Attack Power");
                        statsP.appendChild(stats);
                        statsP.appendChild(document.createElement("br"));
                    }
                    if(items[k].def > 0) {
                        stats = document.createTextNode(items[k].def + " Defense");
                        statsP.appendChild(stats);
                        statsP.appendChild(document.createElement("br"));
                    }
                    if(items[k].mdef > 0) {
                        stats = document.createTextNode(items[k].mdef + " Magic Defense");
                        statsP.appendChild(stats);
                        statsP.appendChild(document.createElement("br"));
                    }
                    if(items[k].str > 0) {
                        stats = document.createTextNode("+ " + items[k].str + " STR");
                        statsP.appendChild(stats);
                        statsP.appendChild(document.createElement("br"));
                    }
                    if(items[k].inte > 0) {
                        stats = document.createTextNode("+ " + items[k].inte + " INT");
                        statsP.appendChild(stats);
                        statsP.appendChild(document.createElement("br"));
                    }
                    if(items[k].agi > 0) {
                        stats = document.createTextNode("+ " + items[k].agi + " AGI");
                        statsP.appendChild(stats);
                        statsP.appendChild(document.createElement("br"));
                    }
                    modalBody.appendChild(statsP);
                };
                p.appendChild(em);
                modalBody.appendChild(p);
                
                var modalFooter = document.createElement('DIV');
                modalFooter.className = "modal-footer";
                modal.appendChild(modalFooter);
                var cbutton = document.createElement('BUTTON');
                if(items[k].type == "weapon" || items[k].type == "armor") {
                    var button = document.createElement('BUTTON');
                    button.setAttribute("type", "button");
                    button.setAttribute("onClick", "upgradeItem(" + items[k].moniker + "," + k + ")");
                    button.className = "btn btn-info";
                    button.setAttribute("data-dismiss", "modal");
                    modalFooter.appendChild(button);
                    button.appendChild(document.createTextNode("Upgrade"));
                    
                    button = document.createElement('BUTTON');
                    button.setAttribute("type", "button");
                    button.setAttribute("onClick", "useItem(" + items[k].moniker + ")");
                    button.className = "btn btn-success";
                    button.setAttribute("data-dismiss", "modal");
                    modalFooter.appendChild(button);
                    button.appendChild(document.createTextNode("Equip"));
                } else {
                    var button = document.createElement('BUTTON');
                    button.setAttribute("type", "button");
                    button.setAttribute("onClick", "useItem(" + items[k].moniker + ")");
                    button.className = "btn btn-primary";
                    button.setAttribute("data-dismiss", "modal");
                    modalFooter.appendChild(button);
                    button.appendChild(document.createTextNode("Use"));
                
                };
                cbutton.setAttribute("type", "button");
                cbutton.setAttribute("class", "btn btn-default");
                cbutton.setAttribute("data-dismiss", "modal");
                modalFooter.appendChild(cbutton);
                cbutton.appendChild(document.createTextNode("Close"));
                
                th.appendChild(x);
                th.appendChild(div);
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
        inventory: inventory,
        starterPack: starterPack
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
        if (typeof savegame.equipment.gloves !== "undefined") equipment.gloves = savegame.equipment.gloves;
        if (typeof savegame.equipment.neck !== "undefined") equipment.neck = savegame.equipment.neck;
        if (typeof savegame.inventory.items !== "undefined") inventory.items = savegame.inventory.items;
        if (typeof savegame.inventory.maxSize !== "undefined") inventory.maxSize = savegame.inventory.maxSize;
        if (typeof savegame.starterPack !== "undefined") starterPack = savegame.starterPack;
    };
    updateVars();
    updateXp();
    updateStats();
    updateInvTable();
    updateEquipment();
    giveStarterPack();
    addToInv(wep_upgrade, 3);
    addToInv(armor_upgrade, 3);
}

function giveStarterPack() {
    if(!starterPack) {
        addToInv(bronze_dagger, 1);
        addToInv(bronze_sword, 1);
        addToInv(hp_potion, 5);
        addToInv(bronze_chestpiece, 1);
        starterPack = true;
    }
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