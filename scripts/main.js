$(function() {
    init();
})

/**
 *  =====================
 *  INITIALINGZING
 * ========================
 * 
 *  make sure there is only one black cell in each row
 *  make sure all black cells cannot be at one column
 * 
 */
var time = 0.000;
var stopWatch;
var board = new Array();
function init() {
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 3; j++) {
            // draw game board with 12 white cells
            var grid = $("#grid-" + i + "-" + j);
            grid.css("top", getPosTop(i, j));
            grid.css("left", getPosLeft(i, j));
            // draw game board with 12 black cells
            $("#grid-container").append($("<div class='block' id='block-" + i + "-" + j + "'></div>"));
            var block = $("#block-" + i + "-" + j);
            block.css("top", getPosTop(i, j));
            block.css("left", getPosLeft(i, j));
            // set default value of cell to 0
            // 0 is white, 1 is black 
            board[i][j] = 0;
        }
    }
    // generate black cell randomly at each row
    for (var i = 0; i < 4; i++) {
        // generate random col
        var randomY = parseInt(Math.floor(Math.random() * 3));  
        // check if black cell is on the same col
        if (i > 0 && board[i - 1][randomY] == 1) {
            // or re-generate another col
            randomY = parseInt(Math.floor(Math.random() * 3));
        }
        var block = $("#block-" + i + "-" + randomY);
        block.css("background-color", "black");
        board[i][randomY] = 1;
    }
    // initialize key tips
    $("#block-3-0").text("Press J to Start");
    $("#block-3-1").text("Press K to Start");
    $("#block-3-2").text("Press L to Start");
    // intialize timer

}

/**
 *  ===================
 *      GAME RUNNING
 *  ==================
 * 
 *  if correct is pressed, cell moves down
 * 
 *  if wront key is pressed, game over.
 */
// When a key is pressed
$(document).keydown(function(event) {
    switch (event.keyCode) {
        // J
        case 74:
            // check is correct key is pressed
            if (board[3][0] == 1) {
                // time starts running
                timer();
                // remove key tips
                clear();
                // moving cells down
                moveDown();
            } else {
                isOver();
            }
            break;
        // K
        case 75:
            // check is correct key is pressed
            if (board[3][1] == 1) {
                // time starts running
                timer();
                // remove key tips
                clear();
                // moving cells down
                moveDown();
            } else {
                isOver();
            }
            break;
        // L
        case 76:
            // check is correct key is pressed
            if (board[3][2] == 1) {
                // time starts running
                timer();
                // remove key tips
                clear();
                // moving cells down
                moveDown();
            } else {
                isOver();
            }
            break;
    }
});
function moveDown() {
    for (var i = 3; i >= 0; i--) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] == 1) { // if current cell is black
                if (i == 3) { // at bottom
                    // change black to white
                    $("#block-" + i + "-" + j).css("background-color", "#fff");
                    board[i][j] = 0;
                } else { // at row 1 to 3
                    // black to white
                    $("#block-" + i + "-" + j).css("background-color", "#fff");
                    board[i][j] = 0;
                    // white to black
                    $("#block-" + (i + 1) + "-" + j).css("background-color", "#000");
                    board[i + 1][j] = 1;
                }
            }
            
        }
    }
    // generate another black at first row as all other cells moving down
    var randomY = parseInt(Math.floor(Math.random() * 3));
    var block = $("#block-0-" + randomY);
    block.css("background-color", "black");
    board[0][randomY] = 1;
}
function timer() {
    time += 0.001;
    $("span").text(time.toString().substr(0, 5));
    stopWatch = setTimeout("timer()", 1);
}
function clear() {
    $("#block-3-0").text("");
    $("#block-3-1").text("");
    $("#block-3-2").text("");
}

/**
 * ================
 *      GAME OVER
 * ================
 */
function isOver() {
    // timer stops
    clearTimeout(stopWatch);
    $("#grid-container").append("<div id='gameover' class='gameover'><p>Time used</p><span>" + time.toString().substr(0, 5) + "s</span><button onclick='restart()' id='restart'>Restart</button></div>");
    var gameover = $("#gameover");
    gameover.css("width", "300px");
    gameover.css("height", "400px");
    gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
}
function restart() {
    // $("#gameover").remove();
    // $("#timer").html("<span>0.000</span>" + "s");
    // init();
    window.location=""; //reload window
}

/**
 *  *********************
 *  HELPER Function
 *  ***********************
 */
function getPosTop(i, j) {
    return i *100;
}
function getPosLeft(i, j) {
    return j * 100;
}