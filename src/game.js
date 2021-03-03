$(() => {

    let difficult = 0;

    // Random 8bits music
    const music = Math.floor((Math.random() * 3) + 1);
    $('#music').attr('src', `./src/music_${music}.mp4`);

    /* Menu buttons */
    $('#startGame').on('click', () => {
        startGame();
    });

    $('#exitGame').on('click', () => {
        exitGame();
    });

    $('#gameBack').on('click', () => {
        backMenu();
    });

    var vid = document.getElementById("music");
    vid.volume = 0.1; // sound 10%

    function startGame(){
        // hide game menu
        $('.game-menu').addClass('d-none');

        // check if you already have a difficult
        if(!difficult){
            // undefined difficult
            $('.game-difficult').removeClass('d-none');
            $('.game-back').removeClass('d-none');
            return;
        } else {
            // start the game
            $('.game-difficult').addClass('d-none');
            $('.game').removeClass('d-none');
            //$('.game-back').addClass('d-none');
        }
    }

    function exitGame(){
        window.close();
    }

    function backMenu(){
        $('.game-menu').removeClass('d-none');
        $('.game-difficult').addClass('d-none');
        $('.game-back').addClass('d-none');
        $('.game').addClass('d-none');
    }

    /* Difficult buttons */
    $('#easyDiff').on('click', () => {
        difficult = 1;
        startGame();
    });

    $('#normalDiff').on('click', () => {
        difficult = 2;
        startGame();
    });
    
    $('#hardDiff').on('click', () => {
        difficult = 3;
        startGame();
    });
})