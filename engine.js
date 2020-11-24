/*
    Баглист:
- В положении сидя скорость передвижения не изменяется. Обращение к переменной максимальной скорости идет только при нажатии клавиши движения;
- Проблема с колизией не решена;
- После получения урона от traps, скорость не теряется (бесконечный бег);


    Добавить: 
- Силу трения если player не идет (не нажаты кнопки управления);
- Переработать управление (если нажата кнопка, true, и в control() постоянно проверять, прежде чем делать move());
- Разобраться с колизией;
- Лестницу; 
- Активные элементы: таблички, указатели и т.д. (при нажатии кнопки можно совершить действие)

*/



/*--------------------  CANVAS  ----------------------- */


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const posDisp = document.getElementById('posDisp');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




/*---------------------  CLASS  ------------------------ */
    // Class World ----------------------------------
class World {
    constructor(gravity) {
        this.g = gravity/100;
    }
}

    // End class World ----------------------------------


    // Class Camera ----------------------------------
class Camera {
    constructor(x, y, mcx, mcy) {
        this.x = x; // Позиция камеры
        this.y = y; // по X и Y
        this.w = canvas.width;
        this.h = canvas.height;
        this.mcx = mcx; // Сдвиг камеры в mc от границы обзора
        this.mcy = mcy;
    }
    move() {
        if(player.x > this.x + this.w - this.mcx){
            this.x = player.x - (this.w - this.mcx);
        }
        if(player.x < this.x + this.mcx){
            (this.x = player.x - this.mcx);
        }
        if(player.y > this.y + this.h - this.mcy){
            this.y = player.y - (this.h - this.mcy);
        }
        if(player.y < this.y + this.mcy){
            (this.y = player.y - this.mcy);
        }
        
    }
}
    // End class World ----------------------------------


    // Class Player ----------------------------------
class Player {
    onGround = false;
    st = null; // The platform the player is on
    dXj = 1; // Ускорение от прыжка

    constructor(x, y, w, h, jh, ms, hp) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h; // Высота в положении стоя
        this.hD = h/1.8; // Высота в положении сидя
        this.jumpHeight = jh;
        this.maxSpeed = ms;
        this.maxSpeedD = ms/2; // Скорость в положении сидя
        this.hp = hp;
        this.money = 0;
    }
    draw() {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x - cam.x, this.y - cam.y, this.w, this.h);
    }
    move() {
        player.x += dX * player.dXj; // Speed player X

            // Collision X
            for(let k=0; k<box.length; k++) {
                if(player.x + player.w > box[k].x && player.x < box[k].x + box[k].w/2 && player.y + player.h > box[k].y && player.y < box[k].y + box[k].h){
                    player.x = box[k].x - player.w;
                }
                if(player.x < box[k].x + box[k].w && player.x + player.w > box[k].x + box[k].w/2 &&  player.y + player.h > box[k].y && player.y < box[k].y + box[k].h){
                    player.x = box[k].x + box[k].w;
                }
            }
            if(player.x < 0){
                player.x = 0;
            }
            //-------

        player.y += dY; // Speed player Y
        
            // Collision Y with Box
        for(let j=0; j<box.length; j++) {
            if(player.y + player.h >= box[j].y && player.y < box[j].y + box[j].h - 5 && player.x + player.w > box[j].x && player.x < box[j].x + box[j].w) {
                player.st = j; // We write down the platform that we touch with our feet
            }
            if(player.y < box[j].y + box[j].h && player.y + player.h > box[j].y + box[j].h - 5 && player.x + player.w > box[j].x && player.x < box[j].x + box[j].w) {
                player.y = box[j].y + box[j].h;
                player.headbutt();
            }
        }
            //-------


        // Collision with Trap box
        
        for(let i=0; i<traps.length; i++) {
            if(player.y + player.h > traps[i].y && player.y < traps[i].y + traps[i].h && player.x + player.w > traps[i].x && player.x < traps[i].x + traps[i].w) {
                if(trapTimer == 0){
                    traps[i].hit();
                    player.kick();
                    trapTimer = 300;
                }
            }
            if(player.x + player.w > traps[i].x && player.x < traps[i].x + traps[i].w && player.y < traps[i].y + traps[i].h && player.y + player.h > traps[i].y ) {
                if(trapTimer == 0){
                    traps[i].hit();
                    player.kick();
                    trapTimer = 300;
                }
            }
            if(player.x < traps[i].x + traps[i].w && player.x + player.w > traps[i].x && player.y + player.h > traps[i].y && player.y < traps[i].y + traps[i].h) {
                if(trapTimer == 0){
                    traps[i].hit();
                    player.kick();
                    trapTimer = 300;
                }
            }
        }
        
        if(trapTimer != 0) trapTimer--;

            // Collision with Win box
        for(let j=0; j<win.length; j++) {
            if(player.y + player.h > win[j].y && player.y < win[j].y + win[j].h && player.x + player.w > win[j].x && player.x < win[j].x + win[j].w) {
                player.x = 100;
                player.y = 790;
            }
        }
            //-------
        

            // Collision with Win box
        for(let j=0; j<money.length; j++) {
            if(player.y + player.h > money[j].y && player.y < money[j].y + money[j].h && player.x + player.w > money[j].x && player.x < money[j].x + money[j].w) {
                money[j].pickup();
                money[j].stat = false;
            }
        }
            //-------            


            // Fall 
        if(player.onGround == false){
            dY += world.g; // Acceleration of gravity
        }
        else {
            dY = 0;
        }
            //-------

            
    }
    stOnground() {
        if(player.st != null){
            // We put the character on the element which he touches with his feet
            player.y = box[player.st].y - player.h;
            player.onGround = true;
            player.dXj = 1;
            // If the character leaves the platform, drop him
            if(player.x + player.w < box[player.st].x || player.x > box[player.st].x + box[player.st].w) {
                player.st = null;
            }
        }
        else if(player.st == null) {
            player.onGround = false;
        }
        else {

        }
    }
    headbutt(){
        dY = 0;
    }
    jump() {
        if(player.y + player.h > box[player.st].y - player.jumpHeight) {
            player.st = null;
            player.onGround = false;
            dY -= 5.5;
            player.dXj = 1.4;
        }
        else {
            player.onGround = false; 
        }
    }
    duck(){
        player.h = player.hD;
        player.maxSpeed = player.maxSpeedD;

    }
    moveLeft() {
        dX = -player.maxSpeed;
    }
    moveRight() {
        dX = player.maxSpeed;
    }
    kick() {
            player.st = null;
            player.onGround = false;
            player.y -= 5;
            dY = -3.5;
            if(0 < dX < 1){dX = -1;}
            if(0 > dX > -1){dX = 1;}
            dX = -dX * 1.2;
    }
    isDead(){
        if(player.hp <= 0){
            player = null;
            alert('You are dead!')
        }
    }
}
    // End class Player ----------------------------------





    // Class Mob
class Mob {

}
    // End class Mob





    // Class Trap [Traps, spikes and other damaging elements]
let trapTimer = 0;

class Trap {
    constructor(x, y, w, h, mindamage, maxdamage) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.mindamage = mindamage;
        this.maxdamage = maxdamage;
    }
    draw() {
        ctx.fillStyle = '#d46f0b';
        ctx.fillRect(this.x - cam.x, this.y - cam.y, this.w, this.h);
    }
    hit() {
        player.hp -= getRand(this.mindamage, this.maxdamage);
    }
}
    // End class Trap
    
    
    // Class Ground --------------------------------------
class Ground {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw() {
        ctx.fillStyle = '#2e2415';
        ctx.fillRect(this.x - cam.x, this.y - cam.y, this.w, this.h);
    }
}
    // End class Ground ----------------------------------


        // Class Money --------------------------------------
class Money {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.stat = true;
    }
    draw() {
        if(this.stat == true){
            ctx.fillStyle = '#c2a61d';
            ctx.fillRect(this.x - cam.x, this.y - cam.y, this.w, this.h);
        }
    }
    pickup(){
        player.money ++ ;
        this.x = null;
        this.y = null;
        console.log(player.money);
    }
}
    // End class Money ----------------------------------


    // Class Ground --------------------------------------
class Winbox {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw() {
        ctx.fillStyle = '#8ee83a';
        ctx.fillRect(this.x - cam.x, this.y - cam.y, this.w, this.h);
    }
}
    // End class Ground ----------------------------------





/*-------------------  CONTROL  ---------------------- */


let dX = 0;
let dY = 0;

/*---------------------  OBJECTS ------------------------ */

let world = new World(7);
const cam = new Camera(0, 0, 600, 350);

let player = new Player(85, canvas.height - 150, 35, 90, 200, 1.7, 100);

let box = []; // Объекты сколизией со всех сторон
let win = []; // Объекты завершения уровня
let traps = []; // Объекты причиняющие урон
let money = []; // Монетки

box.push(new Ground(0, canvas.height-50, canvas.width, 50));
box.push(new Ground(300, canvas.height-200, 150, 30));
box.push(new Ground(400, canvas.height-400, 350, 30));
box.push(new Ground(900, 550, 350, 30));
box.push(new Ground(100, canvas.height-700, 250, 30));
box.push(new Ground(1270, 400, 170, 30));
box.push(new Ground(0, canvas.height-150, 70, 150));
box.push(new Ground(1590, 430, 150, 30));
box.push(new Ground(1845, 250, 250, 30));
box.push(new Ground(1250, 100, 450, 30));
box.push(new Ground(550, 240, 400, 30));

win.push(new Winbox(100, canvas.height-710, 250, 10));

traps.push(new Trap(1110, 530, 20, 20, 7, 15));
traps.push(new Trap(1110-600, 530+337, 40, 20, 10, 20));

money.push(new Money(1110-800, 530+320, 10, 30));
money.push(new Money(1110-820, 530+320, 10, 30));
money.push(new Money(1110-840, 530+320, 10, 30));


/*------------------  GAME CICLE ---------------------- */

let r;
canvas.onmousemove = getPos;
function getPos(e){
    return r = e.offsetX + 'x' + e.offsetY;
}


function control(){
    //KeyBoard
    document.onkeydown = function(e) {
        if(e.code == "ArrowLeft") {
            player.moveLeft();
        }
        if(e.code == "ArrowRight") {
            player.moveRight();
        }
        if(e.code == "ArrowDown") {
            player.duck();
        }
        if(e.code == "Space") {
           if(player.onGround) {
               player.jump();
           }
        }
    }
    document.onkeyup = function(e) {
        if(e.code == "ArrowLeft"){
            dX = 0;
        }
        if(e.code == "ArrowRight")  {
            dX = 0;
        }
        if(e.code == "ArrowDown") {
            player.h = player.hD * 1.8;
            player.maxSpeed = player.maxSpeedD * 2;
        }
    }
}


function update() {
    player.stOnground();
    player.move();
    cam.move(player.x, player.y);
    player.isDead();
}


function render() {
    // Draw background
    ctx.fillStyle = '#b7c4ba';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    

    // Get debug info
    // console.log('Speed Y: ' + dY);

    ctx.fillStyle = "#000";
    ctx.font = "15px serif";
    ctx.fillText(/* ~~dY + ' ' + ~~dX + ' : ' + ~~player.x + ' x ' + ~~player.y + ' => ' + r */player.maxSpeed, 20, 20);
    ctx.fillText(player.onGround, 20, 35);
    ctx.fillText(player.st, 20, 50);

    ctx.textBaseline = "hanging";
    
    ctx.font = "25px serif";
    ctx.fillStyle = "#fff";
    ctx.fillRect(10, 60, 200, 80);
    ctx.fillStyle = "#000";
    ctx.fillText('Здоровье: ' + player.hp, 20, 70);
    ctx.fillText('Монетки: ' + player.money, 20, 105);

    ctx.font = "15px serif";
    ctx.fillText('Прыжок           -> Space', 500, 20);
    ctx.fillText('Перемещение -> ← →', 500, 35);

    // Draw box array;
    for(let i=0; i<box.length; i++){
        box[i].draw();
    }
    // Draw traps array;
    for(let i=0; i<traps.length; i++){
        traps[i].draw();
    }
    // Draw win array;
    for(let i=0; i<win.length; i++){
        win[i].draw();
    }
    // Draw money array;
    for(let i=0; i<money.length; i++){
        money[i].draw();
    }

    // Draw player
    player.draw();
}



function loop() {
    control();
    update();
    render();
}
setInterval(loop, 30/1000);
    
    