import View from "./view.js";
import Store from "./store.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store(`live-t3-storage-key`, players);

  //current Tab state change
  store.addEventListener("statechange", () => {
    view.render(store.game, store.stats);
  });

  //other Tab state change
  window.addEventListener("storage", () => {
    view.render(store.game, store.stats);
  });

  //initial render
  view.render(store.game, store.stats);

  view.bindGameResetEvent((event) => {
    store.reset();
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    //Save a valid move
    store.playerMove(+square.id);
  });
}

window.addEventListener("load", init);
