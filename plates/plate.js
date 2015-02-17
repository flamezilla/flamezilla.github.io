function calcPlates() {
    document.getElementById("txt").innerHTML = "";
    document.getElementById("FF").innerHTML = "";
    document.getElementById("TF").innerHTML = "";
    document.getElementById("T").innerHTML = "";
    document.getElementById("F").innerHTML = "";
    document.getElementById("TH").innerHTML = "";

    var input = document.getElementById("weight");
    var weight = input.value;
    if((weight % 5) != 0) {
        document.getElementById("txt").innerHTML = "Invalid Weight";
        return;
    }
    if(weight < 45) {
        document.getElementById("txt").innerHTML = "Invalid Weight";
        return;
    }
    if(weight == 45) {
        document.getElementById("txt").innerHTML = "Empty Bar";
        return;
    }
    var FF = 0, TF = 0, T = 0, F = 0, TH = 0;
    var weightLeft = weight-45;
    while(weightLeft != 0) {
        if(weightLeft >= 90) {
            weightLeft -= 90;
            FF++;
            continue;
            //console.log("add 45lb plate");
        }
        if(weightLeft >= 50) {
            weightLeft -= 50;
            TF++;
            continue;
            //console.log("add 25lb plate");
        }
        if(weightLeft >= 20) {
            weightLeft -= 20;
            T++;
            continue;
            //console.log("add 10lb plate");
        }
        if(weightLeft >= 10) {
            weightLeft -= 10;
            F++
            continue;
            //console.log("add 5lb plate");
        }
        if(weightLeft >= 5) {
            weightLeft -= 5;
            TH++
            continue;
            //console.log("add 2.5lb plate");
        }
    }
    var output = document.getElementById("output");
    document.getElementById("txt").innerHTML = "Add these plates on each side:";
    console.log(FF, TF, T, F, TH);
    if(FF>0) { document.getElementById("FF").innerHTML = FF + "x " + "45lb"; }
    if(TF>0) { document.getElementById("TF").innerHTML = TF + "x " + "25lb"; }
    if(T>0) { document.getElementById("T").innerHTML = T + "x " + "10lb"; }
    if(F>0) { document.getElementById("F").innerHTML = F + "x " + "5lb"; }
    if(TH>0) { document.getElementById("TH").innerHTML = TH + "x " + "2.5lb"; }
}