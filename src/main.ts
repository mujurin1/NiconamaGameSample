import { score } from "./score";

let scene: g.Scene;
let dino: g.FilledRect;
let moveDino = true;

function main(param: g.GameMainParameterObject): void {
  scene = new g.Scene({ game: g.game });
  scene.onLoad.add(onLoaded);
  g.game.pushScene(scene);
}

function onLoaded() {
  score.init(scene);
  scene.append(score.label);

  scene.onUpdate.add(() => {
    if (moveDino) score.addScore(1);
  });

  //#region プレイヤー (Dino)
  dino = new g.FilledRect({
    scene,
    parent: scene,
    cssColor: "brown",
    height: 100,
    width: 100,
    x: 50,
  });
  setY(dino);

  const firstJumpPower = 10;
  let jumpPower = 0;
  let jumpY = 0;
  let jump = false;
  scene.onPointDownCapture.add(() => {
    if (jump) return;
    jump = true;
    jumpPower = firstJumpPower;
    jumpY = 0;
  });
  scene.onUpdate.add(() => {
    if (!jump) return;

    jumpPower -= 0.3;
    jumpY += jumpPower;
    if (jumpY <= 0) {
      jump = false;
    }
    dino.y = fieldY - dino.height - jumpY;
    dino.modified();
  });
  //#endregion プレイヤー (Dino) の生成


  //#region 敵の生成
  createEnemey(); // 最初の敵を生成

  const createEnemyInterval = 3000;
  let createEnemyCounter = 0;
  scene.onUpdate.add(() => {
    createEnemyCounter += g.game.fps;
    if (createEnemyCounter >= createEnemyInterval) {
      createEnemyCounter = 0;
      createEnemey();
    }
  });
  //#endregion 敵の生成
}

const fieldY = g.game.height / 2 + 100;
function setY(entity: g.E) {
  entity.y = fieldY - entity.height;
  entity.modified();
}

function createEnemey(): g.FilledRect {
  const enemy = new g.FilledRect({
    scene,
    parent: scene,
    cssColor: "red",
    height: 80,
    width: 30,
    x: g.game.width + 100,
    y: fieldY
  });
  setY(enemy);
  enemy.onUpdate.add(() => updateEnemy(enemy));

  return enemy;
}

function updateEnemy(enemy: g.E): void {
  if (!moveDino) return;

  enemy.x -= 10;
  enemy.modified();

  if (g.Collision.intersectAreas(enemy, dino)) {
    score.addScore(-100);
    enemy.destroy();
    moveDino = false;

    scene.setTimeout(() => {
      moveDino = true;
    }, 1000);
  }
}

export = main;
