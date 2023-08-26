import { createFont } from "./util";

export const score = {
  get value() {
    return g.game.vars.gameState.score as number;
  },
  set value(value: number) {
    g.game.vars.gameState.score = value;
  },

  label: undefined as g.Label,

  init: (scene: g.Scene): void => {
    g.game.vars = { gameState: { score: 0 } };

    score.label = new g.Label({
      scene,
      font: createFont({ size: 40 }),
      text: "SCORE: 0",
      x: 900,
      y: 30,
    });
  },

  addScore: (point: number): void => {
    score.value += point;
    score.label.text = `SCORE: ${score.value}`;
    score.label.invalidate();
  }
};

