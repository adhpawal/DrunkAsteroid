;
(function () {
    "use strict";
    var Ball = function () {
        this.dx = 10 * (getRandom(0, 1) > 0 ? -1 : 1);
        this.dy = 10 * (getRandom(0, 1) > 0 ? -1 : 1);
        this.topVal = getRandom(0, 400);
        this.leftVal = getRandom(0, 1250);
        this.ballWidth = 50;
        this.ballHeight = 50;
        this.ballDiv
        this.canvas = document.getElementById("astroid-belt");
        this.canvasHeight = 400;
        this.canvasWidth = 1250;
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
         * This method is responsible for removing provided Element from DOM.
         *
         * Rule :
         *
         * Collision is detected if any of four corner of a rectangle falls within the Area of another rectangle.
         *
         * @param anotherBall : Ball with which collision is detected
         * @author adhpawal <adhpawal@gmail.com>
         */
        this.checkCollision = function (anotherBall) {
            var topPlane = that.topVal;
            var bottomPlane = that.topVal + that.ballHeight;
            var leftPlane = that.leftVal;
            var rightPlane = that.leftVal + that.ballHeight;
            var anotherBallX1 = anotherBall.getLeftVal();
            var anotherBallY1 = anotherBall.getTopVal();
            var anotherBallX2 = anotherBall.getLeftVal() + anotherBall.getWidth();
            var anotherBallY2 = anotherBall.getTopVal();
            var anotherBallX3 = anotherBall.getLeftVal();
            var anotherBallY3 = anotherBall.getTopVal() + anotherBall.getHeight();
            var anotherBallX4 = anotherBall.getLeftVal() + anotherBall.getWidth();
            var anotherBallY4 = anotherBall.getTopVal() + anotherBall.getHeight();
            if (checkInside(anotherBallX1, anotherBallY1, topPlane, leftPlane, rightPlane, bottomPlane) ||
                checkInside(anotherBallX2, anotherBallY2, topPlane, leftPlane, rightPlane, bottomPlane) ||
                checkInside(anotherBallX3, anotherBallY3, topPlane, leftPlane, rightPlane, bottomPlane) ||
                checkInside(anotherBallX4, anotherBallY4, topPlane, leftPlane, rightPlane, bottomPlane)) {
                that.removeFromDom();
                anotherBall.removeFromDom();
                that.dead = true;
                anotherBall.dead = true;
                return true;
            }
        }
    };

    /**
     * This method is responsible for removing provided Element from DOM.
     *
     * @param pointX : x co-ordinate of a Point
     * @param pointY : y co-ordinate of a Point
     * @param topPlane : Min y co-ordinate value of Rectangle surface
     * @param leftPlane : Min x co-ordinate value of Rectangle surface
     * @param rightPlane : Max x co-ordinate value of Rectangle surface
     * @param bottomPlane : Max y co-ordinate value of Rectangle surface
     *
     * @author adhpawal <adhpawal@gmail.com>
     */
    function checkInside(pointX, pointY, topPlane, leftPlane, rightPlane, bottomPlane) {
        if ((pointY >= topPlane && pointY <= bottomPlane) && (pointX >= leftPlane && pointX <= rightPlane)) {
            return true;
        }
        return false;
    }

    var ballList = [];
    var setIntervalId;
    function game() {
        gameEngine();
        setIntervalId =setInterval(gameLoop, 50);
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
            ballList.splice(ballList.indexOf(tempArray[i]), 1);
        }
        //Check for the Condition of Success/Failure
        if(ballList.length == 0){
            var link = document.getElementById('success');
            link.style.display = 'block';
            link.style.visibility = 'visible';
            clearInterval(setIntervalId);
            return;
        }else if(ballList.length == 1){
            var link = document.getElementById('warn');
            link.style.display = 'block';
            link.style.visibility = 'visible';
            clearInterval(setIntervalId);
            return;
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
        for (var i = 0; i < 100; i++) {
            createNewBall = new Ball();
            createNewBall.createElement();
            ballList.push(createNewBall);
        }

    }
    /**
     * Fetch RanDom number between given range of numbers.
     * @param min
     * @param max
     * @returns {*}
     */
    function getRandom(min, max) {
        if(min==max) return max;
        return (min > max) ? (Math.floor(Math.random() * (min - max + 1)) + max) : (Math.floor(Math.random() * (max - min + 1)) + min);
    }

/*    function resetTheSpace(){
        var warnMessage = document.getElementById('warn');
        warnMessage.style.display = 'block';
        warnMessage.style.visibility = 'hidden';
        var successMessage = document.getElementById('success');
        successMessage.style.display = 'block';
        warnMessage.style.visibility = 'hidden';
        clearInterval(setIntervalId);
        game();
    }*/
    game();
})();


