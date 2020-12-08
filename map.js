let world = new World(7);
const cam = new Camera(0, 0, 600, 350);

let player = new Player(85, canvas.height - 150, 17, 90, 200, 1.7, 100);

let box = []; // Объекты сколизией со всех сторон
let win = []; // Объекты завершения уровня
let traps = []; // Объекты причиняющие урон
let money = []; // Монетки
let plate = []; // Таблички и указатели

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

plate.push(new Plate(1110-240, 530+305, 25, 50, 'Табличка'));
