import {boardsManager} from "./controller/boardsManager.js";
import {getBoardName} from "./data/dataHandler.js";

function init() {
    boardsManager.loadBoards();
    let username = document.getElementById('user-id');
    if(username != null){
        let createButton = document.getElementById('add-board-private');
        createButton.addEventListener('click', function(){console.log('OK')})
    }
    else{
        let boardName = document.getElementById('add-board');
        boardName.addEventListener('click', getBoardName);
    }
}

init();


let showHideBoardField = document.getElementById('board-header'); //kolekcja 7 header'ot -> tyle jest tablic obecnie
let hideShow = document.getElementById('board-columns');
console.log(hideShow)
// actionField.addEventListener("click", toggleShow);
function toggleShow() {
    const isHidden = hideShow.style.display === 'none';
    if(isHidden) {
        hideShow.style.display = 'block'
    }
    else{
        hideShow.style.display = 'none'
    }
}


let newBoardName = document.getElementsByClassName("board-title");
console.log(newBoardName);
let renameBoard = boardsManager.changeName;
//newBoardName.addEventListener('click', boardsManager.changeName);
// newBoardName.onclick = function renameBoard() {
//         let newElement = document.createElement('input');
//         newElement.setAttribute('class', 'change-board-name');
//         newElement.setAttribute('type', 'text');
//         let parent = newBoardName.parentElement;
//         parent.replaceChild(newElement, newBoardName);
//     }