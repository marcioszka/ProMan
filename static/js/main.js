import {boardsManager} from "./controller/boardsManager.js";

function init() {
    boardsManager.loadBoards();
    let createNewBoardButton = document.getElementById('add-board-box');
    createNewBoardButton.addEventListener('click', boardsManager.createBoard);


    //createNewBoardButton.addEventListener("mouseover", ()=>{
    //    createNewBoardButton.removeEventListener("click", boardsManager.createBoard)
    //}); OR:
    //createNewBoardButton.removeEventListener('click', boardsManager.createBoard)

}

init();