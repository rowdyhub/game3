/*
    Баглист:
- При подборе монетки, удалять ее из массива!!!!!
- Текст таблички отрисовывается не на первом плане


    Добавить: 
- Разобраться с колизией;
- Лестницу; 
- Активные элементы: таблички, указатели и т.д. (при нажатии кнопки можно совершить действие);
- Добавить атаку (удар);
- Передвижные платформы (лифты и т.д.);
- Чекпоинты;
- Главное меню;

*/



/*--------------------  CANVAS  ----------------------- */


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const posDisp = document.getElementById('posDisp');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




/*---------------------  TEXTURES ------------------------ */
let plr = new Image(90, 35);
plr.src = 'plr.png';

let pll = new Image(90, 35);
pll.src = 'pll.png';

let pld = new Image(90/1.6, 35);
pld.src = 'pld.png';

let pldr = new Image(90/1.6, 35);
pldr.src = 'pldr.png';

let pldl = new Image(90/1.6, 35);
pldl.src = 'pldl.png';

let pljur = new Image(90/1.6, 35);
pljur.src = 'pljur.png';

let pljdr = new Image(90/1.6, 35);
pljdr.src = 'pljdr.png';

let pljul = new Image(90/1.6, 35);
pljul.src = 'pljul.png';

let pljdl = new Image(90/1.6, 35);
pljdl.src = 'pljdl.png';



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
        this.p = 0; // Поза персонажа: 0 - стоять, 1 - идти вправо стоя, 2 - идти влево стоя, 3 - сидеть, 4 - идти вправо сидя, 5 - идти влево сидя
        this.ml = false;
        this.mr = false;
        this.dk = false;
        this.use = false;
        this.hD = h / 1.6; // Высота в положении сидя
        this.jumpHeight = jh;
        this.maxSpeed = ms;
        this.maxSpeedD = ms/3; // Скорость в положении сидя
        this.hp = hp;
        this.money = 0;
    }
    draw() {
        ctx.fillStyle = '#ff000030';
        ctx.fillRect(this.x - cam.x, this.y - cam.y, this.w, this.h);
        if(player.dk == false) {
            if(dX == 0 && dY == 0) {
                ctx.drawImage(plr, this.x - cam.x - 25, this.y - cam.y, this.w + 50, this.h);
            }
            else if(dX > 0 && dY == 0) {
                ctx.drawImage(plr, this.x - cam.x - 25, this.y - cam.y, this.w + 50, this.h);
            }
            else if(dX < 0 && dY == 0) {
                ctx.drawImage(pll, this.x - cam.x - 25, this.y - cam.y, this.w + 50, this.h);
            }
            else if(dX >= 0 && dY < 0) {
                ctx.drawImage(pljur, this.x - cam.x - 25, this.y - cam.y, this.w + 50, this.h);
            }
            else if(dX >= 0 && dY > 0) {
                ctx.drawImage(pljdr, this.x - cam.x - 25, this.y - cam.y, this.w + 50, this.h);
            }
            else if(dX < 0 && dY < 0) {
                ctx.drawImage(pljul, this.x - cam.x - 25, this.y - cam.y, this.w + 50, this.h);
            }
            else if(dX < 0 && dY > 0) {
                ctx.drawImage(pljdl, this.x - cam.x - 25, this.y - cam.y, this.w + 50, this.h);
            }
        }
        if(player.dk == true) {
            if(dX == 0) {
                ctx.drawImage(pld, this.x - cam.x - 25, this.y - cam.y, this.w + 50, this.h);
            }
            else if(dX > 0) {
                ctx.drawImage(pldr, this.x - cam.x - 25, this.y - cam.y, this.w + 50, this.h);
            }
            else if(dX < 0) {
                ctx.drawImage(pldl, this.x - cam.x - 25, this.y - cam.y, this.w + 50, this.h);
            }
        }
        
        
    }
    move() {
        player.x += dX * player.dXj; // Speed player X

            // Collision X
            for(let k=0; k<box.length; k++) {
                if(player.x + player.w > box[k].x && player.x < box[k].x - player.w + 3 && player.y + player.h > box[k].y && player.y < box[k].y + box[k].h){
                    player.x = box[k].x - player.w;
                }
                if(player.x < box[k].x + box[k].w && player.x + player.w > box[k].x + box[k].w + player.w - 3 &&  player.y + player.h > box[k].y && player.y < box[k].y + box[k].h){
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
            if(player.y + player.h >= box[j].y && player.y < box[j].y && player.x + player.w > box[j].x && player.x < box[j].x + box[j].w) {
                player.st = j; // We write down the platform that we touch with our feet
            }
            if(player.y < box[j].y + box[j].h && player.y + player.h > box[j].y + box[j].h - 5 && player.x + player.w > box[j].x && player.x < box[j].x + box[j].w) {
                player.y = box[j].y + box[j].h;
                player.headbutt();
                player.h -= 2;
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
        }
        
        if(trapTimer != 0) trapTimer--;

            // Collision with Win box
        for(let j=0; j<win.length; j++) {
            if(player.y + player.h > win[j].y && player.y < win[j].y + win[j].h && player.x + player.w > win[j].x && player.x < win[j].x + win[j].w) {
                document.location.href = 'map2.html';
            }
        }
            //-------
        

            // Collision with Money
        for(let j=0; j<money.length; j++) {
            if(player.y + player.h > money[j].y && player.y < money[j].y + money[j].h && player.x + player.w > money[j].x && player.x < money[j].x + money[j].w) {
                money[j].pickup();
                money[j].stat = false;
            }
        }
            //-------


            // Collision with Plate
        for(let j=0; j<plate.length; j++) {
            if(player.y + player.h > plate[j].y && player.y < plate[j].y + plate[j].h && player.x + player.w > plate[j].x && player.x < plate[j].x + plate[j].w) {
                plate[j].check = true;
                plate[j].use();
            }
            else {
                plate[j].check = false;
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
    st_on_ground() {
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
            dY -= 4.5;
            player.dXj = 1.4;
        }
        else {
            player.onGround = false; 
        }
    }
    duck(){
        if(player.dk == true){
            if(player.h >= player.hD){
                player.h -= 2;
            }
            if(player.onGround == true){
                player.maxSpeed = player.maxSpeedD;
            }
        }
        else {
            if(player.h <= player.hD * 1.6){
                player.h += 2;
            }
            if(player.h == player.hD * 1.6) {
                player.maxSpeed = player.maxSpeedD * 3;
            }
        }
    }
    move_right_left() {
        if(player.mr == true){
            dX = player.maxSpeed;
            if(this.dk) {
                this.p = 4;
            }
            else {
                this.p = 1;
            }
            
        }
        else if(player.ml == true){
            dX = -player.maxSpeed;
            if(this.dk) {
                this.p = 5;
            }
            else {
                this.p = 2;
            }
            
        }
        else {
           dX = 0;
        }
    }
    kick() {
            player.st = null;
            player.onGround = false;
            player.y -= 5;
            dY = -3.5;
            dX = -dX * 1.4;
    }
    is_dead(){
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
        //ctx.fillStyle = '#d46f0b40';
        //ctx.fillRect(this.x - cam.x, this.y - cam.y, this.w, this.h);
    }
    hit() {
        let damage = getRand(this.mindamage, this.maxdamage)
        player.hp -= damage;
        console.log(damage);
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
        //ctx.fillStyle = '#ff000040';
        //ctx.fillRect(this.x - cam.x, this.y - cam.y, this.w, this.h);
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
        //console.log(player.money);
        console.log(money.length);
    }
}
    // End class Money ----------------------------------


    // Class Plate --------------------------------------
class Plate {
    constructor(x, y, w, h, t, i) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.t = t; // Text in plate
        this.check = false;
        this.interaction = i;
    }
    draw() {
        //ctx.fillStyle = '#30ef3040';
        //ctx.fillRect(this.x - cam.x, this.y - cam.y, this.w, this.h);
    }
    write(){
        if(this.check) {
            ctx.fillStyle = "#000000"
            ctx.font = "20px mainfont";
            ctx.fillText(this.t, this.x + (this.w/2) - cam.x - (this.t.length*9/2), this.y - cam.y - 110);
            return
        }
    }
    use() {
        if(this.interaction == true) {
            if(player.use == true) {
                this.t = 'Использовано';
                return
            }
        }
    }
}
    // End class Plate ----------------------------------


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
            player.ml = true;
        }
        if(e.code == "ArrowRight") {
            player.mr = true;
        }
        if(e.code == "ArrowDown") {
            player.dk = true;
        }
        if(e.code == "Space") {
           if(player.onGround) {
               player.jump();
           }
        }
        if(e.code == 'KeyE') {
            player.use = true;
        }
    }
    document.onkeyup = function(e) {
        if(e.code == "ArrowLeft"){
            player.ml = false;
        }
        if(e.code == "ArrowRight")  {
            player.mr = false;
        }
        if(e.code == "ArrowDown") {
            player.dk = false;
        }
        if(e.code == 'KeyE') {
            player.use = false;
        }
    }
    player.move_right_left();
    player.duck();
}


function update() {
    player.st_on_ground();
    player.move();
    cam.move(player.x, player.y);
    player.is_dead();
}


function render() {
    // Draw background
    ctx.fillStyle = '#412d1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    

    // Get debug info
    // console.log('Speed Y: ' + dY);

    ctx.fillStyle = "#000";
    ctx.font = "15px mainfont";
    ctx.fillText(/* ~~dY + ' ' + ~~dX + ' : ' + ~~player.x + ' x ' + ~~player.y + ' => ' + r */player.ml + ':' +player.mr, 20, 20);
    ctx.fillText(player.onGround, 20, 35);
    ctx.fillText(player.st, 20, 50);

    ctx.textBaseline = "hanging";
    
    
    ctx.drawImage(back, 0 - cam.x, 0 - cam.y);
    ctx.drawImage(grnd, 0 - cam.x, 0 - cam.y);

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
    // Draw plate array;
    for(let i=0; i<plate.length; i++){
        plate[i].draw();
        plate[i].write();
    }

    // Draw player
    player.draw();
    
    ctx.drawImage(light, 0 - cam.x, 0 - cam.y);

    //HUD
    ctx.font = "25px mainfont";
    ctx.fillStyle = "#fff";
    ctx.fillRect(10, 70, 230, 80);
    ctx.fillStyle = "#000";
    ctx.fillText('Здоровье: ' + player.hp, 20, 80);
    ctx.fillText('Монетки: ' + player.money, 20, 115);
}



function loop() {
    control();
    update();
    render();
}
setInterval(loop, (30/1000)*200);