import {boardsManager} from "./controller/boardsManager.js";

function init() {
    boardsManager.loadBoards();
    let createNewBoardButton = document.getElementById('add-board-box');
    createNewBoardButton.addEventListener('click', boardsManager.createBoard);

}

init();