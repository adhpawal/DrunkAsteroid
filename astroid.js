;
(function () {
    "use strict";

    var Ball = function () {
        this.dx = 10 * (getRandom(0, 1) > 0 ? -1 : 1);
        this.dy = 10 * (getRandom(0, 1) > 0 ? -1 : 1);
        this.topVal = getRandom(0, 600);
        this.leftVal = getRandom(0, 1350);
        this.ballWidth = 50;
        this.ballHeight = 50;
        this.ballDiv
        this.canvas = document.getElementById("astroid-belt");
        this.canvasHeight = 600;
        this.canvasWidth = 1350;
        this.dead = false;

        var that = this;

        /**
         * This method is responsible for creating dynamic Ball and appending it to DOM.
         *
         * @author nimesh <nimeshmishra@lftechnology.com>
         */
        this.createElement = function () {
            that.ballDiv = document.createElement("div");
            that.ballDiv.className = "ball";
            that.ballDiv.style.top = that.topVal + "px";
            that.ballDiv.style.left = that.leftVal + "px";
            that.addToDom();
        }
        /**
         * This method is responsible for appending provided Element it to DOM.
         *
         * @author nimesh <nimeshmishra@lftechnology.com>
         */
        this.addToDom = function () {
            that.canvas.appendChild(that.ballDiv);
        }
        /**
         * This method is responsible for removing provided Element from DOM..
         *
         * @author nimesh <nimeshmishra@lftechnology.com>
         */
        this.removeFromDom = function () {
            if (that.ballDiv != null) {
                that.canvas.removeChild(that.ballDiv);
            }

        }
        /**
         * Getter/Setters for Ball Positions
         * @returns {*}
         */
        this.getHeight = function () {
            return that.ballHeight;
        }
        this.getWidth = function () {
            return that.ballWidth;
        }
        this.getTopVal = function () {
            return that.topVal;
        }
        this.getLeftVal = function () {
            return that.leftVal;
        }
        this.getDead = function () {
            return that.dead;
        }
        this.setDead = function (isDead) {
            that.dead = isDead;
        }
        /**
         * This method is responsible for ball movement inside the provided plane...
         *
         * @author nimesh <nimeshmishra@lftechnology.com>
         */
        this.movement = function () {

            var totalHeight = that.topVal + that.ballHeight;
            var totalWidth = that.leftVal + that.ballWidth;

            that.ballDiv.style.top = that.topVal + 'px';
            that.ballDiv.style.left = that.leftVal + 'px';

            if (totalHeight >= that.canvasHeight) {
                if ((that.dx < 0 && that.dy > 0) || (that.dx > 0 && that.dy > 0)) {
                    that.dy *= -1;
                }
            }
            if (totalWidth >= that.canvasWidth) {
                if ((that.dx > 0 && that.dy < 0) || (that.dx > 0 && that.dy > 0)) {
                    that.dx *= -1;
                }
            }
            if (that.topVal <= 0 && that.leftVal != 0) {
                if ((that.dx < 0 && that.dy < 0) || (that.dx > 0 && that.dy < 0)) {
                    that.dy *= -1;
                }
            }
            if (that.leftVal <= 0 && that.topVal != 0) {
                if ((that.dx < 0 && that.dy > 0) || (that.dx < 0 && that.dy < 0)) {
                    that.dx *= -1;
                }
            }
            that.topVal += that.dy;
            that.leftVal += that.dx;

        }
        /**
         * This method is responsible for removing provided Element from DOM..
         *
         * @author adhpawal <adhpawal@gmail.com>
         */
        this.checkCollision = function (anotherBall) {
            var firstBallFirstCorner = that.topVal;
            var firsBallSecondCorner = that.topVal + that.ballWidth;
            var firstBallThirdCorner = that.topVal + that.ballHeight;
            var firstBallFourthCorner = that.leftVal + that.ballWidth + that.ballHeight;
            var anotherBallFirstCorner = anotherBall.getTopVal();
            var anotherBallSecondCorner = anotherBall.getTopVal() + anotherBall.getWidth();
            var anotherBallThirdCorner = anotherBall.getTopVal() + anotherBall.getHeight();
            var anotherBallFourthCorner = anotherBall.getLeftVal() + anotherBall.getWidth() + anotherBall.getHeight();

            if (checkInside(firstBallFirstCorner, anotherBallFirstCorner, anotherBallSecondCorner, anotherBallThirdCorner, anotherBallFourthCorner) ||
                checkInside(firsBallSecondCorner, anotherBallFirstCorner, anotherBallSecondCorner, anotherBallThirdCorner, anotherBallFourthCorner) ||
                checkInside(firstBallThirdCorner, anotherBallFirstCorner, anotherBallSecondCorner, anotherBallThirdCorner, anotherBallFourthCorner) ||
                checkInside(firstBallFourthCorner, anotherBallFirstCorner, anotherBallSecondCorner, anotherBallThirdCorner, anotherBallFourthCorner)) {
                that.removeFromDom();
                anotherBall.removeFromDom();
                that.dead = true;
                anotherBall.dead = true;
                return true;
            }
        }
    }

    /**
     * This method is responsible for removing provided Element from DOM.
     *
     * @author adhpawal <adhpawal@gmail.com>
     */
    function checkInside(currentNode, firstNode, secondNode, thirdNode, fourthNode) {
        if (currentNode >= firstNode && currentNode <= secondNode && currentNode >= thirdNode && currentNode <= fourthNode) {
            return true;
        }
        return false;
    }

    var ballList = [];

    function game() {
        gameEngine();
        setInterval(gameLoop, 50);
    }

    /**
     * Game Main Loop.
     *
     * @author runcorn <adhpawal@gmail.com>,nimesh <nimeshmishra@lftechnology.com>
     */
    function gameLoop() {
        var tempArray = [];
        //check for collision
        for (var i = 0; i < ballList.length; i++) {
            for (var j = 0; j < ballList.length; j++) {
                if (i == j) continue;
                if (ballList[i].dead) continue;
                if (ballList[j].dead) continue;
                if (ballList[i].checkCollision(ballList[j])) {
                    tempArray.push(ballList[i]);
                    tempArray.push(ballList[j]);
                }
            }
        }
        for (var i = 0; i < tempArray.length; i++) {
            ballList[i].splice(ballList.indexOf(tempArray[i]), 1);
        }
        for (var i = 0; i < ballList.length; i++) {
            if (ballList[i].dead) {

            }
        }
        tempArray = [];
        for (var i = 0; i < ballList.length; i++) {
            ballList[i].movement();
        }
    }

    //Create Fixed Number of Objects in Different Domains
    function gameEngine() {
        // Creates 99 Balls
        var createNewBall;
        for (var i = 0; i < 20; i++) {
            createNewBall = new Ball();
            createNewBall.createElement();
            ballList.push(createNewBall);
        }

    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    game();
})();


