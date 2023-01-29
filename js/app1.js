/// <reference path="../Scripts/jquery-2.1.4.min.js" />

(function (w) {
    var level=0;
    var board = document.getElementById("MemoryBoard");
    var arr_cards2 = ["1.jpg", "1.jpg", "2.jpg", "2.jpg", "3.jpg", "3.jpg", "4.jpg", "4.jpg", "5.jpg", "5.jpg", "6.jpg", "6.jpg", "7.jpg", "7.jpg", "8.jpg", "8.jpg", "9.jpg", "9.jpg", "10.jpg", "10.jpg", "11.jpg", "11.jpg", "12.jpg", "12.jpg", "13.jpg", "13.jpg", "14.jpg", "14.jpg", "15.jpg", "15.jpg"];
    var arr_cards1= ["1.jpg", "1.jpg", "2.jpg", "2.jpg", "3.jpg", "3.jpg", "4.jpg", "4.jpg", "5.jpg", "5.jpg", "6.jpg", "6.jpg", "7.jpg", "7.jpg", "8.jpg", "8.jpg", "9.jpg", "9.jpg", "10.jpg", "10.jpg"];
    var arr_cards0= ["1.jpg", "1.jpg", "2.jpg", "2.jpg", "3.jpg", "3.jpg", "4.jpg", "4.jpg", "5.jpg", "5.jpg", "6.jpg", "6.jpg"];
    var boardContent = "<div class='center'>";
    var SelectedCards = [0, 0];
    var score = 0;
    var Percentage = document.getElementById("Percentage");
    var ColoredSpace = document.getElementById("ColoredSpace");
    var WhiteSpace = document.getElementById("WhiteSpace");
    var Background_Track = new Audio();
    var Flip_Sound = new Audio();
    Flip_Sound.src = "audio/flip.mp3";
    var Timer = document.getElementById("Timer");
    var timeInterval;
    var BackgroundTrack = document.getElementById("BackgroundTrack");
    var firstSelection;
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
    
    //document.getElementsByTagName("body").innerHTML =  '<div id="FullArea">'+
    //    '<div class="MemoryGame fadeInDown">Memory Game</div>'+
    //        '<div class="StartMenu fadeInLeft">'+
    //            '<div onclick="start()" id="StartNewGame">START NEW GAME</div>'+
    //            '<div id="Help">VIEW HELP</div>'+
    //        '<div id="Exit">EXIT</div>'+
    //        '</div>'+
    //    '</div>'


    //// <script src="js/app.js"></script>
    //function start() {
    //    document.getElementsByTagName("body").innerHTML= '<div id="Timer">00:00</div>'+
    //'<div class="Container">'+
    //    '<div class="Memory bounceInDown">'+
    //       ' <div id="MemoryBoard">'+
    //            '<div class="center">'+
    //                '<div class="GameOver zoomInDown" style="width:auto;height:auto;text-align:center;">'+
    //                    '<h1 style="color:yellow; font-family:CHLORINR;font-size:100px">Game Memory</h1>'+
    //                    '<input id="btnStart" type="button" name="name" value="Start" /> <br />'+
    //                    '<input id="btnAbout" type="button" name="name" value="About" /> <br />'+
    //                    '<input type="button" name="name" onclick="window.close();" value="Exit" id="Exitt" />'+
    //                '</div>'+
    //            '</div>'+
    //        '</div>'+
    //    '</div>'+
    //    '<div class="ProgressArea bounceInRight">'+
    //    '<div id="ProgressBar">'+
    //        '<div id="WhiteSpace"></div>'+
    //        '<div id="ColoredSpace">'+
    //            '<div id="Percentage"></div>'+
    //        '</div>'+
    //    '</div>'+
    //'</div>'+
    //    '</div>'+
    //'<div id="options">'+
    //    '<img id="TimeKey" src="images/key.png" />'+
    //    '<img id="MatchedKey" src="images/key.png" />'+
    //    '<img id="BackgroundTrack" src="images/SoundON.png" />'+
    //'</div>'
    Level(60, arr_cards0);
    //}
    function Level(dur,arrOfCards) {
        function GenrateCards() {
            arrOfCards.Shuffle_Array(arrOfCards);
            for (var i = 0; i < arrOfCards.length; i++) {
                boardContent +=

                " <div id='card" + i + "' class='card' onclick='CheckCards(this ,\"" + arrOfCards[i] + "\")'>" +
                    "<div id='a" + i + "' class='back'  style='background-image:url(\"images/Cards/" + arrOfCards[i] + "\");' >" +
                    "</div>" +
                    "<div class='front' style='background-image:url(images/CardBack.jpg)'>" +
                    "</div>" +
                "</div>"
            }



            boardContent += "</div>";
            board.innerHTML = boardContent;

            for (var y = 0; y < arrOfCards.length; y++) {

                $("#card" + y).flip();
                document.getElementById("card" + y).style.pointerEvents = 'none';

            }





            var i = 0;
            var t = setInterval(function () {

                $("#card" + i).flip(true);


                i++;
                if (i == arrOfCards.length) {
                    clearInterval(t);
                    var tt = setInterval(function () {
                        i--;

                        $("#card" + i).flip(false);

                        $("#card" + i + " div").removeClass("back");
                        $("#card" + i + " div").removeClass("front");

                        if (i == 0) {
                            $("#Timer").slideDown("slow");
                            $("#BackgroundTrack").slideDown("slow");
                            startTimer(dur-1, Timer);
                            //SelectedCards = [0, 0];
                            for (var y = 0; y < arrOfCards.length; y++) {
                                document.getElementById("card" + y).style.pointerEvents = 'auto';
                            }
                            clearInterval(tt);
                        }
                    }, 100);
                }
            }, 300);




        }

        w.startTimer = function (duration, display) {
            var timer = duration, minutes, seconds;
            timeInterval = setInterval(function () {
                minutes = parseInt(timer / 60, 10)
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;

                if (--timer < 0) {

                    alert("Finished");
                    clearInterval(timeInterval);
                }
            }, 1000);
        }

      

        w.CheckCards = function (elem, val) {

            $("#" + elem.id + " div:first").addClass("back");
            $("#" + elem.id + " div:last").addClass("front");

            if (SelectedCards[0] == 0 && SelectedCards[0].className != "selected") {

                Flip_Sound.src = "audio/flip.mp3";
                Flip_Sound.play();

                SelectedCards[0] = val;

                $("#" + elem.id).flip(false);

                elem.className += " selected";
                document.getElementById(elem.id).style.pointerEvents = 'none';
                firstSelection = elem;

            } else if (SelectedCards[1] == 0 && SelectedCards[1].className != "selected" && elem.className != "card selected") {

                Flip_Sound.src = "audio/flip.mp3";
                Flip_Sound.play();

                SelectedCards[1] = val;
                $("#" + elem.id).flip(false);
                elem.className += " selected";
                document.getElementById(elem.id).style.pointerEvents = 'none';
                if (SelectedCards[0] == SelectedCards[1]) {

                    score += 1;
                    var per = 100 / (arrOfCards.length / 2) * score;


                    Percentage.innerHTML = Math.round(per) + "%";
                    
                    $("#ColoredSpace").css("height", (per) + "%").fadeIn("slow");
                    $("#WhiteSpace").css("height", (100 - per) + "%").fadeIn("slow");


                    var selected = document.getElementsByClassName("selected");

                    selected[1].className = "card";
                    selected[0].className = "card";

                    SelectedCards[0] = 0;
                    SelectedCards[1] = 0;

                    if (score == arrOfCards.length / 2) {
                        clearInterval(timeInterval);
                        Background_Track.muted = true;
                        Flip_Sound.src = "audio/SMALL.mp3";
                        Flip_Sound.play();
                        //level up
                        level++;
                       
                        if (level == 1) {
                            board.innerHTML = "";
                            Percentage.innerHTML = "";
                            boardContent = "";
                            $("#ColoredSpace").css("height", (0) + "%").fadeIn("slow");
                            $("#WhiteSpace").css("height", (100) + "%").fadeIn("slow");
                            document.getElementById("Timer").innerHTML = "01:30";
                            Level(90, arr_cards1);
                        } 
                        else if (level == 2) {
                            board.innerHTML = "";
                            Percentage.innerHTML = "";
                            boardContent = "";
                            $("#ColoredSpace").css("height", (0) + "%").fadeIn("slow");
                            $("#WhiteSpace").css("height", (100) + "%").fadeIn("slow");
                            document.getElementById("Timer").innerHTML = "02:0";
                            Level(120, arr_cards2);
                        }
                        else
                        {
                            alert("you finnshed the game go fuck your self مبسوط خلصت اه خلصت ");
                        }
                        
                    }


                } else {

                    setTimeout(function () {

                        var selected = document.getElementsByClassName("selected");

                        $("#" + selected[0].id).flip(false);
                        $("#" + selected[1].id).flip(false);

                        selected[1].className = "card";
                        selected[0].className = "card";

                        SelectedCards[0] = 0;
                        SelectedCards[1] = 0;
                        Flip_Sound.src = "audio/Crowd.mp3";
                        Flip_Sound.play();
                        document.getElementById(elem.id).style.pointerEvents = 'auto';
                        document.getElementById(firstSelection.id).style.pointerEvents = 'auto';
                        firstSelection = null;


                    }, 700);
                }


            }






        }

        GenrateCards();
    }

   
    

})(window);