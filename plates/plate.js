function calcPlates() {
    $("#plates").empty();
    $("#output").empty();
    var plates = [0, 0, 0, 0, 0];
    var input = $("#weight").val();
    if((input % 5) != 0) {
        $("#output").html("Invalid Weight");
        return;
    }
    if(input < 45) {
        $("#output").html("Invalid Weight");
        return;
    }
    if(input == 45) {
        $("#output").html("Empty Bar");
        return;
    }
    var weightLeft = input - 45;
    while(weightLeft != 0) {
        if(weightLeft >= 90) {
            weightLeft -= 90;
            plates[0]++;
            continue;
            //console.log("add 45lb plate");
        }
        if(weightLeft >= 50) {
            weightLeft -= 50;
            plates[1]++;
            continue;
            //console.log("add 25lb plate");
        }
        if(weightLeft >= 20) {
            weightLeft -= 20;
            plates[2]++;
            continue;
            //console.log("add 10lb plate");
        }
        if(weightLeft >= 10) {
            weightLeft -= 10;
            plates[3]++;
            continue;
            //console.log("add 5lb plate");
        }
        if(weightLeft >= 5) {
            weightLeft -= 5;
            plates[4]++;
            continue;
            //console.log("add 2.5lb plate");
        }
    }
    $("#output").html("Add these plates on each side:");
    if(plates[0] > 0) {
        $("#plates").append("<li>" + plates[0] + "x 45lb plate" + "</li>");   
    }
    if(plates[1] > 0) {
        $("#plates").append("<li>" + plates[1] + "x 25lb plate" + "</li>");   
    }
    if(plates[2] > 0) {
        $("#plates").append("<li>" + plates[2] + "x 10b plate" + "</li>");   
    }
    if(plates[3] > 0) {
        $("#plates").append("<li>" + plates[3] + "x 5lb plate" + "</li>");   
    }
    if(plates[4] > 0) {
        $("#plates").append("<li>" + plates[4] + "x 2.5lb plate" + "</li>");   
    }
}