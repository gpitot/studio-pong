


class Player {
    constructor({x, y, width, height, color, score}) {
        this.player = {
            x,
            y,
            width, 
            height,
            color, 
            score
        }
    }


    draw = ctx => {
        const {x, y, width, height, color, score} = this.player;
        ctx.fillStyle = color;
        ctx.fillRect(x - width/2, y - height/2, width, height);



        ctx.fillStyle = "red";
        const offset = 2;
        const scoreWidth = ((width - 2) / 5) - offset;
        
        for (let i=0; i<score; i+=1) {
            ctx.fillRect(x - width/2 + offset + ((offset + scoreWidth) * i), y - height / 2 + offset, scoreWidth, height - 4)
        }
    }
}

export default Player;