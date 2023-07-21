// variables
var level  = 0
var colors= ["green", "red", "blue", "yellow"];
var clicked = []
var pattern = []
var current_score = 0
var highest_score = 0
var game_on = false

function animatePress(color){
    $("button"+ "#"+ color).addClass("pressed")
    setTimeout(function(){$("button"+ "#"+ color).removeClass("pressed")}, 100)
}

function play_sound(name){
    var a =  "sounds/" + name+ ".mp3"   
    var audio = new Audio(a);
    audio.play()
}

function Game_Over(){
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")}, 200)
    $("#level-title").text("Game Over! Press a Button to Restart!")
    level= 0
    clicked = []
    pattern = []
    current_score = 0
    game_on = false
    
}



function nextSequence(){
    clicked = []
    var r_num = Math.floor(Math.random()*4) ;
    var chosen_button = colors[r_num];
    pattern.push(chosen_button)
    var c = "button" + "#" + chosen_button;
    $(c).fadeOut(50).fadeIn(50);
    play_sound(chosen_button);
    level+=1;
    $("#level-title").text("Level "+ level)
}





function checkAnswer(currentLevel){
    if(clicked[currentLevel] === pattern[currentLevel]){
        console.log("Success!")

        if(clicked.length === pattern.length){
            current_score += 10;
            highest_score = Math.max(current_score, highest_score);
            setTimeout(nextSequence, 500)
            $("#current-score").text("Current Score:"+ current_score);
            $("#highest-score").text("Highest Score: "+ highest_score)
        }
    }
    else{
        console.log("Fail")
        Game_Over()
        $("#current-score").text("Current Score:"+ current_score);
    }

}





$("button").on("click", function(event){
    var User_Color = event.target.id;
    clicked.push(User_Color);
    console.log(clicked)
    console.log(pattern)
    play_sound(User_Color)
    animatePress(User_Color)
    $("#level-title").text("Level "+ level)
    checkAnswer(clicked.length-1)
    
})


$(document).on("keypress", function(){
    if (!game_on){
    nextSequence();
    game_on = true
    }  
})
   

