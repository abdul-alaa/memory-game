/// <reference path="../Scripts/jquery-2.1.4.min.js" />

(function (w) {
    var level = 0;
    var board = document.getElementById("MemoryBoard");
    var arr_cards2 = ["1.jpg", "1.jpg", "2.jpg", "2.jpg", "3.jpg", "3.jpg", "4.jpg", "4.jpg", "5.jpg", "5.jpg", "6.jpg", "6.jpg", "7.jpg", "7.jpg", "8.jpg", "8.jpg", "9.jpg", "9.jpg", "10.jpg", "10.jpg", "11.jpg", "11.jpg", "12.jpg", "12.jpg", "13.jpg", "13.jpg", "14.jpg", "14.jpg", "15.jpg", "15.jpg"];
    var arr_cards1 = ["1.jpg", "1.jpg", "2.jpg", "2.jpg", "3.jpg", "3.jpg", "4.jpg", "4.jpg", "5.jpg", "5.jpg", "6.jpg", "6.jpg", "7.jpg", "7.jpg", "8.jpg", "8.jpg", "9.jpg", "9.jpg", "10.jpg", "10.jpg"];
    var arr_cards0 = ["1.jpg", "1.jpg", "2.jpg", "2.jpg", "3.jpg", "3.jpg", "4.jpg", "4.jpg", "5.jpg", "5.jpg", "6.jpg", "6.jpg"];
    var boardContent = "<div class='center bounceInDown'>";
    var SelectedCards = [0, 0];
    var score = 0;
    var Percentage = document.getElementById("Percentage");
    var ColoredSpace = document.getElementById("ColoredSpace");
    var WhiteSpace = document.getElementById("WhiteSpace");
    var ProgressArea = document.getElementById("progArea");
    var Background_Track = new Audio();
    var Flip_Sound = new Audio();
    Flip_Sound.src = "audio/flip.mp3";
    var Timer = document.getElementById("Timer");
    var timeInterval;
    var BackgroundTrack = document.getElementById("BackgroundTrack");
    var firstSelection;
    /*Enable and Disaple Background music sound */
    BackgroundTrack.onclick = function () {
        if (Background_Track.muted) {
            Background_Track.muted = false;
            BackgroundTrack.src = "images/SoundON.png";
        } else {
            Background_Track.muted = true;
            BackgroundTrack.src = "images/SoundOFF.png";
        }
    }
    Background_Track.src = "audio/FullTrack.mp3";
    Background_Track.play();

    /* Shuffle The Array To Show random Photoes Each time the game start  */
    Array.prototype.Shuffle_Array = function (arr) {
        var temp;
        var rand;
        for (var i = 0; i < this.length; i++) {
            while ((rand = parseInt(Math.random() * this.length)) == i) { }
            temp = arr[i];
            arr[i] = arr[rand];
            arr[rand] = temp;
        }

    }
   
    /*Main Function Handling The Game Body  */
    function Level(dur, arrOfCards) {
        ProgressArea.className = "ProgressArea bounceInRight";
        ProgressArea.style.display = "block";
        board.innerHTML = "";
        boardContent = "<div class='center bounceInDown'>";

        function GenrateCards() {
            /*shuffle the array before drowing cards*/
            arrOfCards.Shuffle_Array(arrOfCards);
            /*Drowing the Cards in the main Div */
            for (var i = 0; i < arrOfCards.length; i++) {
                boardContent +=

                " <div id='card" + i + "' class='card" + level + "' onclick='CheckCards(this ,\"" + arrOfCards[i] + "\")'>" +
                    "<div id='a" + i + "' class='back'  style='background-image:url(\"images/Cards/" + arrOfCards[i] + "\");' >" +
                    "</div>" +
                    "<div class='front' style='background-image:url(images/CardBack.jpg)'>" +
                    "</div>" +
                "</div>"
            }
            boardContent += "</div>";
            board.innerHTML = boardContent;
           

            /*Adding The Flip animation to each Card And Disable click event while drowing Cards  */
            for (var y = 0; y < arrOfCards.length; y++) {
                $("#card" + y).flip();
                document.getElementById("card" + y).style.pointerEvents = 'none';
            }
            var i = 0;
            /*animate to show  eatch card at the begining */
            var t = setInterval(function () {
                $("#card" + i).flip(true);
                i++;
                //to stop flipping at the begining when reaching the last card 
                if (i == arrOfCards.length) {
                    clearInterval(t);
                    /*Delay the Flipping cards the the back again before to show the last card*/
                    setTimeout(function () {
                        /*Returns Cards Back after showing the to the user by flipping them back again  */
                        var tt = setInterval(function () {//to flip to back
                            i--;
                            /*Create the flipping back animation*/
                            $("#card" + i).flip(false);
                            $("#card" + i + " div").removeClass("back");   
                            $("#card" + i + " div").removeClass("front");   

                            if (i == 0) {   // that mean if we flipped all the cards back 
                                // moves the game down to show sound control and timer by using slide down
                                $("#Timer").slideDown("slow");
                                $("#BackgroundTrack").slideDown("slow");
                                //calling the timer to start counting each second
                                startTimer(dur - 1, Timer);
                                //Enable the onclick event again So user can flip and play the game
                                for (var y = 0; y < arrOfCards.length; y++) {
                                    document.getElementById("card" + y).style.pointerEvents = 'auto';
                                }
                                // to show the keys 
                                $("#options").show("slow");
                                clearInterval(tt);//all the cards flipped back so we clear the interval 
                            }
                        }, 100);//End Of Flipping the cards back
                    }, 1000)// end of time out that maks delay to show the last card flipping animation 
                }
            }, 500);
        }
        /*The function that handling the time of the game */
        w.startTimer = function (duration, display) {
            timer = duration
            var minutes;
            var seconds;
            timeInterval = setInterval(function () {
                minutes = parseInt(timer / 60, 10)
                seconds = parseInt(timer % 60, 10);
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                display.textContent = minutes + ":" + seconds;
                //if the time finished
                if (--timer < 0) {
                    $("#progArea").hide();
                    //hide the keys 
                    $("#options").hide("slow");
                    lavel = 0;//reset the lvl
                    score = 0;//reset the Score 
                    //drow the game over frame 

                    board.innerHTML = "<div class ='GameOver zoomInDown' style='width:auto;height:auto;text-align:center;'>" +
                                        "<h1 style='color:yellow; font-family:CHLORINR;font-size:100px'>Game Over</h1> " +
                                        "<input id='btnTryAgain' type='button' name='name' value='Try Again' /> <br/>" +
                                        "<input type='button' name='name' onclick='window.close();' value='Exit' id='Exitt' />" +
                                      "</div>";


                    //board.innerHTML = "<div id='GameOver'> <div id='head'>Game Over</div> " +
                    //                    "<input id='btnTryAgain' type='button' name='name' value='Try Again' /> <br/>" +
                    //                    " <input type='button' name='name' onclick='window.close();' value='Exit' /> " +
                    //                  " </div>";
                    boardContent = "";//reset the variable witch contain the body of the game 
                    $("#WhiteSpace").animate({ height: "100%" }, 1500);
                    $("#ColoredSpace").animate({ height: "0%" }, 1500);
                    Percentage.innerHTML = "";
                    //enpty timer div
                    document.getElementById("Timer").innerHTML = "";
                    Background_Track.muted = true;
                    //play gameover sound 
                    var GameOver = new Audio();
                    GameOver.src = "audio/GameOver.mp3"
                    GameOver.loop = false;
                    GameOver.play();
                    clearInterval(timeInterval);
                }//end of time finish 
            }, 1000);//end of timer
        }
        //Check when user select any card 
        w.CheckCards = function (elem, val) {
            $("#" + elem.id + " div:first").addClass("back");
            $("#" + elem.id + " div:last").addClass("front");

            //checking if there this no Card Selected  !!
            if (SelectedCards[0] == 0 && SelectedCards[0].className != "selected") {
                //play the flipping sound
                Flip_Sound.src = "audio/flip.mp3";
                Flip_Sound.play();
                //save the seleted card ULR in the first index of SelectedCards Array
                SelectedCards[0] = val;
                //flip the card to be shown to the user
                $("#" + elem.id).flip(false);
                //Add selected  class to handle selection of this Card 
                elem.className += " selected";
                //disable the onclick  event on the shown Card 
                document.getElementById(elem.id).style.pointerEvents = 'none';
                //saving the first selected element For Farther use
                firstSelection = elem;

                /*Checking if there is only one Card Selected !! */
            } else if (SelectedCards[1] == 0 && SelectedCards[1].className != "selected" && elem.className != "card" + level + " selected") {
                //play the flipping sound
                Flip_Sound.src = "audio/flip.mp3";
                Flip_Sound.play();
                //save the seleted card URL in the second index of SelectedCards Array
                SelectedCards[1] = val;
                //flip the card to be shown to the user
                $("#" + elem.id).flip(false);
                //Add selected  class to handle selection of this Card 
                elem.className += " selected";
                //disable the onclick  event on the shown Card 
                document.getElementById(elem.id).style.pointerEvents = 'none';
                /*If the both saved URL are the same(the cards matched) */
                if (SelectedCards[0] == SelectedCards[1]) {
                    //increase the score by one 
                    score += 1;
                    //increaseb the Progress par 
                    var per = 100 / (arrOfCards.length / 2) * score;
                    //show the progress par percent 
                    Percentage.innerHTML = Math.round(per) + "%";
                    /* increasing the coloerd div and decreasing the white div in the progress par div*/
                    $("#WhiteSpace").animate({ height: (100 - per) + "%" }, 1500);
                    $("#ColoredSpace").animate({ height: (per) + "%" }, 1500);

                    //selecting the Cards thats already Matched
                    var selected = document.getElementsByClassName("selected");

                    /*Add The card + level class  to the element by replacing the selected class*/
                    selected[1].className = "card" + level;
                    selected[0].className = "card" + level;

                    //reset the array vales that contains the url
                    SelectedCards[0] = 0;
                    SelectedCards[1] = 0;
                    //Here We Check to know if all cards selected 
                    if (score == arrOfCards.length / 2) {
                        //stop the timer from Decreasing
                        clearInterval(timeInterval);
                        //stop the music 
                        Background_Track.muted = true;
                        /*Play the Winning Sound */
                        Flip_Sound.src = "audio/SMALL.mp3";
                        Flip_Sound.play();

                        //Background_Track.disabled = true;    ????

                        //level up  - increase the level
                        level++;
                        //Hide the keys 
                        $("#options").hide("slow");

                        /*Checking the Lvl To run the Next lvl  */
                        if (level == 1) {
                            LevelUp(90, arr_cards1,5000);
                        }
                        else if (level == 2) {
                            LevelUp(120, arr_cards2,5000);
                        }
                        else {
                            /////////////
                            boardContent = "";
                            board.innerHTML = "<div class ='GameOver zoomInDown' style='width:auto;height:auto;text-align:center;'>" +
                                      "<h1 style='color:yellow; font-family:CHLORINR;font-size:100px'>Congratulation</h1> " +
                                      "<div style='color:yellow; font-family:CHLORINR;font-size:100px'> Your Score is " + score + " </div >" +
                                      "<input type='button' name='name' onclick='window.close();' value='Exit' id='Exitt' />" +
                                    "</div>";
                        }
                    }
                    //if the Cards not match (url no equals in the array)
                } else {
                    setTimeout(function () {//Add Some requred  time For Cards to be Fully Flipped after Selection 
                        //selecting the Cards thats already Matched
                        var selected = document.getElementsByClassName("selected");
                        // Flip the Cards Back Again 
                        $("#" + selected[0].id).flip(false);
                        $("#" + selected[1].id).flip(false);

                        //Play the Flipping Sound
                        Flip_Sound.src = "audio/Crowd.mp3";
                        Flip_Sound.play();

                        selected[1].className = "card" + level;
                        selected[0].className = "card" + level;

                        //reset the array that Contain  the Url
                        SelectedCards[0] = 0;
                        SelectedCards[1] = 0;
                        //enable the onclick event in both cards that does not match 
                        document.getElementById(elem.id).style.pointerEvents = 'auto';
                        document.getElementById(firstSelection.id).style.pointerEvents = 'auto';
                        //reset the first element variable
                        firstSelection = null;
                    }, 700);
                }
            }
        }

        function LevelUp(duration, arr,timeout) {
            setTimeout(function () {
                //reset the score
                score = 0;

                //Clearing the main div that contain game body
                Percentage.innerHTML = "";

                //clearing the timer Div 
                document.getElementById("Timer").innerHTML = "";

                //resitting the progress par 
                $("#WhiteSpace").animate({ height: "100%" }, 1500);
                $("#ColoredSpace").animate({ height: "0%" }, 1500);

                //Playing the background music again after the winning sound
                Background_Track.muted = false;
                Background_Track.play();

                //Drowing The Next LVL
                Level(duration, arr);
            }, timeout);//Adding Requred Time Waiting The Winning Sound To be Finnished 
        }
        //Adding Time When the key are Pressed 
        $("#TimeKey").click(function () {
            var src = $("#TimeKey").attr("src");
            if (src.indexOf("key1") == -1) {
                $("#TimeKey").attr("src", "images/key1.png");
                timer += 20;
            }
        });

        //Helping The user By Showing Two Matched Card
        $("#MatchedKey").click(function () {
            var src = $("#MatchedKey").attr("src");
            //checking if the key is not already pressed 
            if (src.indexOf("showCard") == -1) {
                $("#MatchedKey").attr("src", "images/showCard.png");
                var rand = 0;
                switch (level) {
                    case 0:
                        //Generate Random Number With the array index Range 
                        rand = parseInt(Math.random() * arr_cards0.length + 1)
                        //here we get the image url  from the selected card with the random id 
                        //gets the url by cutting it from the index of the last "/"+1 to index of the (")    
                        var x = $("#a" + rand).css("background-image").substring($("#a" + rand).css("background-image").lastIndexOf("/") + 1, $("#a" + rand).css("background-image").lastIndexOf("\""));
                        //Getting the First Element By Id After Getting The ID From The Array Using The IndexOf To get the index 
                        //Next two lines  Prevent the user from Moving the Cards Untill the Flip Complete  
                        $("#card" + arr_cards0.indexOf(x) + " div:first").addClass("back");
                        $("#card" + arr_cards0.indexOf(x) + " div:last").addClass("front");
                        //Getting the Second Element By Id After Getting The ID From The Array Using The IndexOf To get the index 
                        //Next two lines  Prevent the user from Moving the Cards Untill the Flip Complete  
                        $("#card" + arr_cards0.lastIndexOf(x) + " div:first").addClass("back");
                        $("#card" + arr_cards0.lastIndexOf(x) + " div:last").addClass("front");
                        //Flip the Matched Cards 
                        $("#card" + arr_cards0.indexOf(x)).flip(true);
                        $("#card" + arr_cards0.lastIndexOf(x)).flip(true);
                        setTimeout(function () {//Give Time Until the Flip Complete 
                            //Flip the Cards Back 
                            $("#card" + arr_cards0.indexOf(x)).flip(false);
                            $("#card" + arr_cards0.lastIndexOf(x)).flip(false);
                        }, 1000);
                        break;
                    case 1:
                        //Generate Random Number With the array index Range 
                        rand = parseInt(Math.random() * arr_cards1.length + 1);
                        //here we get the image url  from the selected card with the random id 
                        //gets the url by cutting it from the index of the last "/"+1 to index of the (")    
                        var x = $("#a" + rand).css("background-image").substring($("#a" + rand).css("background-image").lastIndexOf("/") + 1, $("#a" + rand).css("background-image").lastIndexOf("\""));
                        //Getting the First Element By Id After Getting The ID From The Array Using The IndexOf To get the index 
                        //Next two lines  Prevent the user from Moving the Cards Untill the Flip Complete  
                        $("#card" + arr_cards1.indexOf(x) + " div:first").addClass("back");
                        $("#card" + arr_cards1.indexOf(x) + " div:last").addClass("front");
                        //Getting the Second Element By Id After Getting The ID From The Array Using The IndexOf To get the index 
                        //Next two lines  Prevent the user from Moving the Cards Untill the Flip Complete  
                        $("#card" + arr_cards1.lastIndexOf(x) + " div:first").addClass("back");
                        $("#card" + arr_cards1.lastIndexOf(x) + " div:last").addClass("front");
                        //Flip the Matched Cards 
                        $("#card" + arr_cards1.indexOf(x)).flip(true);
                        $("#card" + arr_cards1.lastIndexOf(x)).flip(true);
                        setTimeout(function () {//Give Time Until the Flip Complete 
                            //Flip the Cards Back 
                            $("#card" + arr_cards1.indexOf(x)).flip(false);
                            $("#card" + arr_cards1.lastIndexOf(x)).flip(false);
                        }, 1000);
                        break;
                    case 2:
                        rand = parseInt(Math.random() * arr_cards2.length + 1);
                        var x = $("#a" + rand).css("background-image").substring($("#a" + rand).css("background-image").lastIndexOf("/") + 1, $("#a" + rand).css("background-image").lastIndexOf("\""));
                        $("#card" + arr_cards2.indexOf(x) + " div:first").addClass("back");
                        $("#card" + arr_cards2.indexOf(x) + " div:last").addClass("front");
                        $("#card" + arr_cards2.lastIndexOf(x) + " div:first").addClass("back");
                        $("#card" + arr_cards2.lastIndexOf(x) + " div:last").addClass("front");
                        $("#card" + arr_cards2.indexOf(x)).flip(true);
                        $("#card" + arr_cards2.lastIndexOf(x)).flip(true);
                        setTimeout(function () {
                            $("#card" + arr_cards2.indexOf(x)).flip(false);
                            $("#card" + arr_cards2.lastIndexOf(x)).flip(false);
                        }, 1000);
                        break;
                    default:
                        break;
                }
            }
        });

        

        /*When the user press try Again button  */
        $(document).on("click", "#btnTryAgain", function () {
            //Play The Background Music Of the Game
            Background_Track.play();
            Background_Track.muted = false;
            //Drow The First LVL 
            level = 0;
            for (var i = 0; i < 9999; i++) {
            clearInterval(i);
            }
            SelectedCards = [0, 0];
            firstSelection = null;
            LevelUp(60, arr_cards0,1000);
        })
        GenrateCards();
    }

    

   
    $("#btnAbout").click(function () {
        board.innerHTML = "<div class='GameOver zoomInDown' style='width:auto;height:auto;text-align:center;'>\
                        <h1 class='devloped'>Develpbed By:</h1>\
                        <span >Amin Abdelnasser</span><br/>\
                        <span >Mohamed Abdelhalim</span><br/>\
                        <span >Ahmed Ramez</span><br/>\
                        <span >Abdelrahman Alaa</span><br/>\
                        <span >Micheal Gamel</span><br/>\
                        <input id='btnStart' type='button' name='name' value='Start The Game' />\
                    </div>;"

    });

/*Call the First LVL At the Begining*/
    

    $(document).on("click", "#btnStart", function () {
        Level(60, arr_cards0);
    })

    })(window);

   