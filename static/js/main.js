import {boardsManager} from "./controller/boardsManager.js";
import {domManager} from "./view/domManager.js";

function init() {
    boardsManager.loadBoards();
    let createNewBoardButton = document.getElementById('add-board-box');
    createNewBoardButton.addEventListener('click', boardsManager.createBoard);
}

init();