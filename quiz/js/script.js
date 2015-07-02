var input;

function getInput() {
    $("#output").html("");
    
    input = document.getElementById("comment").value;
    
    processQuiz();

}

function processQuiz() {
    
    //var firstLine = input.split('\n')[0];
    
    var lines = $('textarea').val().split('\n');
    var j = 1;
    for(var i = 0;i < lines.length;i++){
        if(lines[i]) {
            //var x = lines[i].replace(/,/g, '');
            //var wordToReplace = Math.floor(Math.random() * countWords(lines[i]));
            var line = lines[i].split(" ");
            var wordToReplace = Math.floor(Math.random() * line.length);
            var deletedWord = line[wordToReplace];
            line = line.join(" ");
            line = line.replace(deletedWord, "_______");
            //line = line + " [" + deletedWord + "]";
            printToLog((j++ + ". " + line), deletedWord);
        }
    }
    
    //printToLog(firstLine);
    
}

var printToLog = function(text, spoiler) {
    var $newLine = $(document.createElement("li"));
    $newLine.attr({
        class: "list-group-item"
    });
    var $answer = $(document.createElement("div"));
    $answer.attr({
        class: "collapse"
    });
    $answer.html(spoiler);
    $newLine.html(text + " ");
    
    var $answerfield = $(document.createElement("INPUT"));
    $answerfield.attr({
        type: "text",
    });
    
    $newLine.append($answerfield);
    $("#output").append($newLine);
    $("li").last().after($answer);
}

function countWords(str) {
    return str.split(/\s+/).length;
}

function loadAshtak() {
    $("#comment").html("");
    $("#comment").load("ashtak.txt");
}

function showAnswers() {
    $(".btn-primary").click(function(){
        $(".collapse").collapse('toggle');
    }); 
}

function reset() {
    window.location.replace("quiz/index.html");
}   
