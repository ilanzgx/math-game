$(() => {
    let difficult = 0;
    let timeLeft = 0;
    let timingTimeLeft;
    let score = 0;
    let playing = 0;
    let playingMusic = 0;

    let num1 = 0;
    let num2 = 0;
    let result = 0;

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
    vid.volume = 0.1; // volume 10%

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
            if(!playing){
                if(!playingMusic){
                    $('#music').attr('src', './src/music_boss.mp4');
                }
                $('.game-difficult').addClass('d-none');
                $('.game').removeClass('d-none');
                $('.game-back').removeClass('d-none');
                timingTimeLeft = setInterval(counterTimeLeft, 1000);

                if(timeLeft <= 0){
                    $('#music').attr('src', './src/music_gameover.mp4');
        
                    $('.game-over').removeClass('d-none');
                    $('.game').addClass('d-none');
                    $('#scoreResult').text(score);
        
                    score = 0;
        
                    clearInterval(timingTimeLeft);
                    return 1;
                }

                playingMusic = 1;
                num1 = Math.floor((Math.random() * 9) + 1);
                num2 = Math.floor((Math.random() * 9) + 1);
                result = num1*num2;
                $('#mathOperation').text(`${num1} * ${num2}`);

                $(`.option-1`).text(result + 4);
                $(`.option-2`).text(result + 6);
                $(`.option-3`).text(result - 4);

                // random position
                $(`.option-${Math.floor((Math.random() * 3) + 1)}`).text(result);
            }
            $('#scoreCounter').text(score);
            $('#timeLeft').text(timeLeft);
            playing = 1;

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
        $('.game-over').addClass('d-none');

        if(playing){
            $('#music').attr('src', `./src/music_${music}.mp4`);
        }
        
        playing = 0;
        difficult = 0;
        timeLeft = 0;
        playingMusic = 0;
        num1 = 0;
        num2 = 0;
        result = 0;
        clearInterval(timingTimeLeft);
    }

    function rightQuestion(){
        playing = 0;
        num1 = 0;
        num2 = 0;
        result = 0;
        score += 20;
        clearInterval(timingTimeLeft);
        startGame();
    }

    function wrongQuestion(){
        playing = 0;
        num1 = 0;
        num2 = 0;
        result = 0;
        timeLeft -= 5;
        if(score > 0){
            score -= 5;
        }
        clearInterval(timingTimeLeft);
        startGame();
    }

    function counterTimeLeft(){
        timeLeft--;
        startGame();
        if(timeLeft <= 0){
            $('#music').attr('src', './src/music_gameover.mp4');

            $('.game-over').removeClass('d-none');
            $('.game').addClass('d-none');
            $('#scoreResult').text(score);

            score = 0;

            clearInterval(timingTimeLeft);
        }
    }

    /* Difficult buttons */
    $('#easyDiff').on('click', () => {
        difficult = 1;
        timeLeft = 80;
        startGame();
    });

    $('#normalDiff').on('click', () => {
        difficult = 2;
        timeLeft = 60;
        startGame();
    });
    
    $('#hardDiff').on('click', () => {
        difficult = 3;
        timeLeft = 80;
        startGame();
    });

    /* Options */
    $(`.option-1`).on('click', (element) => {
        console.log(`${$(element.target).text()} is ${result} ??`)
        if($(element.target).text() == result){
            rightQuestion();
        } else {
            wrongQuestion();
        }
    });

    $(`.option-2`).on('click', (element) => {
        console.log(`${$(element.target).text()} is ${result} ??`)
        if($(element.target).text() == result){
            rightQuestion();
        } else {
            wrongQuestion();
        }
    });

    $(`.option-3`).on('click', (element) => {
        console.log(`${$(element.target).text()} is ${result} ??`)
        if($(element.target).text() == result){
            rightQuestion();
        } else {
            wrongQuestion();
        }
    });
})