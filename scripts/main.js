$(function() {
    init();
})

// initializing
function init() {
    
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            // draw game board with 12 white cells
            var grid = $("#grid-" + i + "-" + j);
            grid.css("top", getPosTop(i, j));
            grid.css("left", getPosLeft(i, j));
            // draw game board with 12 black cells
            $("#grid-container").append($(""));
        }
    }
}

function getPosTop(i, j) {
    return i *100;
}
function getPosLeft(i, j) {
    return j * 100;
}