import Player from './player';
import Ball from './ball';

class Pong {
    constructor(canvas, socket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.socket = socket;

        this.dimensions = {
            width : 400,
            height : 600
        }

        this.players = [];
        this.loadPlayerInit();
        let y = null;
        if (this.players.length == 0) {
            y = 10;
        } else {
            y = 590;
        }
        this.players.push(
            new Player({
                x : 200,
                y,
                width: 40,
                height : 10,
                color : 'white',
                score : 0,
                id : 0
            }),
        );

        this.ball = new Ball({
            canvasDimensions : this.dimensions,
            players : this.players,
            playerScores : this.playerScores
        });

        this.ended = true;

        this.updateCanvasDimensions();
        this.draw();
    }

    updateCanvasDimensions = () => {
        //screen has reset or init, update canvas size
        const {width, height} = this.dimensions;
        this.canvas.width = width;
        this.canvas.height = height;
    }


    loadPlayerInit = () => {
        //load the first player (if there is one)
        this.socket.emit('joined', {}, (data)=> {
            console.log(data);
        });
    }

    serverPing = () => {
        //update ball and their player pos
        this.socket.on('ping', data => {
            
        });

        this.socket.on('newplayer', data => {

        });

    }

    moveMyPlayer = e => {
        //move my player
        //send update to server


        this.socket.emit('ping', {});
    }

    playerScores = id => {
        this.players[id].player.score += 1;
        
        if (this.players[id].player.score === 5) {
            //end game
            this.ended = true;
        }
    }

    draw = () => {
        
        const {width, height} = this.dimensions;
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, width, height);

        this.players.forEach(player => player.draw(this.ctx));


        //draw ball
        this.ball.draw(this.ctx);


        if (this.ended) return;
        requestAnimationFrame(this.draw);
    }
}

export default Pong;