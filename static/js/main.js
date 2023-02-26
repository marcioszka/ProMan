import {boardsManager} from "./controller/boardsManager.js";
import {getBoardName} from "./data/dataHandler.js";

function init() {
    boardsManager.loadBoards();
}

init();

let elem = document.getElementById('add-board');
elem.addEventListener('click', getBoardName);