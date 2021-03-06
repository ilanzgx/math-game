$(() => {
    let difficult = 0;
    let timeLeft = 0;
    let timingTimeLeft;
    let score = 0;
    let highestScore = 0;
    let hitHighestScore = 0;
    let playing = 0;
    let playingMusic = 0;

    let num1 = 0;
    let num2 = 0;
    let result = 0;

    // Random 8bits music
    const music = Math.floor((Math.random() * 3) + 1);
    $('#music').attr('src', `./src/assets/sounds/music_${music}.mp4`);

    /* Menu buttons */
    $('#startGame').on('click', () => {
        startGame();
    });

    $('#aboutGame').on('click', () => {
        $('.game-menu').addClass('d-none');
        $('#game-about').removeClass('d-none');
        $('.game-back').removeClass('d-none');
    });

    $('#exitGame').on('click', () => {
        exitGame();
    });

    $('#gameBack').on('click', () => {
        backMenu();
    });

    var vid = document.getElementById("music");
    vid.volume = 0.1; // volume 10%
    var vid2  = document.getElementById("soundEffects");
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
                    $('#music').attr('src', './src/assets/sounds/music_boss.mp4');
                    $('#highestScore').text(highestScore);
                    timingTimeLeft = setInterval(counterTimeLeft, 1000);
                }
                $('.game-difficult').addClass('d-none');
                $('.game').removeClass('d-none');
                $('.game-back').removeClass('d-none');
                
                if(timeLeft <= 0){
                    gameOver();
                    return 1;
                }

                if(score >= highestScore && !hitHighestScore && highestScore != 0){
                    $('#soundEffects').attr('src', './src/assets/sounds/score.wav');
                    hitHighestScore = 1;
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

    function gameOver(){
        $('#music').attr('src', './src/assets/sounds/music_gameover.mp4');
        $('body').css('background', 'url(./src/assets/imgs/background-gameover.jpg)');
        $('body').css('background-size', 'cover');
        
        $('.game-over').removeClass('d-none');
        $('.game').addClass('d-none');
        $('#scoreResult').text(score);
        
        if(score > highestScore){
            highestScore = score;
        }
        score = 0;
        hitHighestScore = 0;
        playing = 1;
        
        clearInterval(timingTimeLeft);
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
        $('#game-about').addClass('d-none');

        if(playing){
            $('#music').attr('src', `./src/assets/sounds/music_${music}.mp4`);
            $('body').css('background', 'url(./src/assets/imgs/background.jpg)');
            $('body').css('background-size', 'cover');
        }
        
        playing = 0;
        difficult = 0;
        timeLeft = 0;
        playingMusic = 0;
        hitHighestScore = 0;
        num1 = 0;
        num2 = 0;
        result = 0;
        clearInterval(timingTimeLeft);
    }

    function rightQuestion(){
        $('#soundEffects').attr('src', './src/assets/sounds/right.wav');
        playing = 0;
        num1 = 0;
        num2 = 0;
        result = 0;
        score += 20;
        timeLeft += 2;
        startGame();
    }

    function wrongQuestion(){
        $('#soundEffects').attr('src', './src/assets/sounds/wrong.wav');
        playing = 0;
        num1 = 0;
        num2 = 0;
        result = 0;
        timeLeft -= 5*difficult;
        if(score > 0){
            score -= 4+difficult;
        }
        startGame();
    }

    function counterTimeLeft(){
        timeLeft--;
        startGame();
        if(timeLeft <= 0){
            gameOver();
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
        timeLeft = 35;
        startGame();
    });

    /* Options */
    $(`.option-1`).on('click', (element) => {
        if($(element.target).text() == result)
            rightQuestion();
        else
            wrongQuestion();
    });

    $(`.option-2`).on('click', (element) => {
        if($(element.target).text() == result)
            rightQuestion();
        else
            wrongQuestion();
    });

    $(`.option-3`).on('click', (element) => {
        if($(element.target).text() == result)
            rightQuestion();
        else
            wrongQuestion();
    });
})