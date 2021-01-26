let world = new World(7);
const cam = new Camera(0, 0, 600, 350);

let player = new Player(200, 750, 100-50, 180, 200, 1.7, 100);

let box = []; // Объекты со сколизией со всех сторон
let win = []; // Объекты завершения уровня
let traps = []; // Объекты причиняющие урон
let money = []; // Монетки
let plate = []; // Таблички и указатели

box.push(new Ground(0, 930, 1200, 50));
box.push(new Ground(0, 200, 140, 730));
box.push(new Ground(650, 880, 200, 50));
box.push(new Ground(1010, 770, 330, 160));
box.push(new Ground(1320, 670, 570, 160));
box.push(new Ground(1850, -100, 100, 770));


//win.push(new Winbox(2400, 990, 100, 10));

traps.push(new Trap(850, 880, 180, 50, 10, 20));

money.push(new Money(450, 860, 10, 30));
money.push(new Money(740, 810, 10, 30));
money.push(new Money(1160, 690, 10, 30));


plate.push(new Plate(1625, 570, 100, 100, 'Нажми Е', true));

//textures
let back = new Image();
back.src = 'test/back.png';

let grnd = new Image();
grnd.src = 'test/grnd.png';

let light = new Image();
light.src = 'test/light.png';
