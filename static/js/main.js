import {boardsManager} from "./controller/boardsManager.js";

function init() {
    boardsManager.loadBoards();
    let username = document.getElementById('user-id');
    if(username != null){
        let createNewBoardButton = document.getElementById('add-board-private');
        createNewBoardButton.addEventListener('click', boardsManager.createBoard)
    }
    else{
        let createNewBoardButton = document.getElementById('add-board');
        createNewBoardButton.addEventListener('click', boardsManager.createBoard);

    };

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