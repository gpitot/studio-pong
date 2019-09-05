


class Ball {
    constructor({canvasDimensions, playerScores, players}) {
        
        

        this.canvasDimensions = canvasDimensions;
        this.playerScores = playerScores;
        this.players = players;
        

        this.speed = 20;
        this.resetBall();
    }


    resetBall = () => {

        const rndVel = (min, max) => {
            return Math.floor(Math.random() * (max-min + 1)) + min;
        }

        const {width, height} = this.canvasDimensions;

    
        const rndYDir = Math.random() > 0.5 ? 1 : -1;
        this.ball = {
            x : width / 2,
            y : height / 2,
            vx : rndVel(-4, 4),
            vy : rndVel(2, 4) * rndYDir,
            size : 10,
            color : 'white'
        }
        this.updatePos();
    }


    checkIntersectPlayer = (ball, player) => {
        //find horizontal and vertical dist between ball center and rect center
        const distX = Math.abs(ball.x - player.x-player.width/2);
        const distY = Math.abs(ball.y - player.y-player.height/2);


        //If the distance is greater than halfCircle + halfRect, then they are too far apart to be colliding
        if (distX > (player.width/2 + ball.size)) { return false; }
        if (distY > (player.height/2 + ball.size)) { return false; }


        //If the distance is less than halfRect then they are definitely colliding
        if (distX <= (player.width/2)) { return true; } 
        if (distY <= (player.height/2)) { return true; }

        /*
        Test for collision at rect corner. 
        Think of a line from the rect center to any rect corner
        Now extend that line by the radius of the circle
        If the circle’s center is on that line they are colliding at exactly that rect corner
        */
        const dx=distX-player.width/2;
        const dy=distY-player.height/2;
        return (dx*dx+dy*dy<=(circle.r*circle.r));
    }


    updatePos = () => {

        let {x, y, vx, vy, size} = this.ball;
        x += vx;
        y += vy;

        const {width, height} = this.canvasDimensions;
        if (x < size/2 || x > width - size/2 ) {
            vx *= -1;
        }

        if (y < size /2) {
            //player 0 wins
            this.playerScores(0);
            return this.resetBall();
        }

        if (y > height - size/2) {
            //player 1 wins
            this.playerScores(1);
            return this.resetBall();
        }


        const futureBall = {
            x,
            y,
            size
        }
        for (let i=0; i<this.players.length; i+=1) {
            if (this.checkIntersectPlayer(futureBall, this.players[i].player)) {
                vy *= -1;
            }
        }

        this.ball = {
            ...this.ball,
            x,
            y, 
            vx, 
            vy
        }


        

        setTimeout(this.updatePos, this.speed);
    }


    draw = ctx => {
        const {x, y, vx, vy, size, color} = this.ball;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size/2, 0, 2 * Math.PI);
        ctx.stroke(); 
        ctx.fill();
    }
}

export default Ball;