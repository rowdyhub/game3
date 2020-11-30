let world = new World(7);
const cam = new Camera(0, 0, 600, 350);

let player = new Player(250, 850, 35, 90, 200, 1.7, 100);

let box = []; // Объекты сколизией со всех сторон
let win = []; // Объекты завершения уровня
let traps = []; // Объекты причиняющие урон
let money = []; // Монетки

box.push(new Ground(0, 1000, 2500, 50));
box.push(new Ground(0, 690, 200, 250));


win.push(new Winbox(2400, 990, 100, 10));

//traps.push(new Trap(1110, 530, 20, 20, 7, 15));
//traps.push(new Trap(1110-600, 530+337, 40, 20, 10, 20));

money.push(new Money(500, 900, 10, 30));
money.push(new Money(700, 750, 10, 30));
money.push(new Money(900, 900, 10, 30));
