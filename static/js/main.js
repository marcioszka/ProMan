import {boardsManager} from "./controller/boardsManager.js";
import {getBoardName} from "./data/dataHandler.js";

function init() {
    boardsManager.loadBoards();
}

init();

let boardName = document.getElementById('add-board');
boardName.addEventListener('click', getBoardName);

let newBoardName = document.getElementsByClassName("board-title");
console.log(newBoardName);
//let renameBoard = boardsManager.changeName;
//newBoardName.addEventListener('click', boardsManager.changeName);
// newBoardName.onclick = function renameBoard() {
//         let newElement = document.createElement('input');
//         newElement.setAttribute('class', 'change-board-name');
//         newElement.setAttribute('type', 'text');
//         let parent = newBoardName.parentElement;
//         parent.replaceChild(newElement, newBoardName);
//     }