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


//let newBoardName = document.getElementsByClassName("board-title");
//console.log(newBoardName);
//let renameBoard = boardsManager.changeName;
//newBoardName.addEventListener('click', boardsManager.changeName);
// newBoardName.onclick = function renameBoard() {
//         let newElement = document.createElement('input');
//         newElement.setAttribute('class', 'change-board-name');
//         newElement.setAttribute('type', 'text');
//         let parent = newBoardName.parentElement;
//         parent.replaceChild(newElement, newBoardName);
//     }