import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
            domManager.addEventListener(`.board-header[data-board-id="${board.id}"]`,
                "click",
                toggleHideShowBoardColumns)
        }
    },
    createBoard: function () {
        const inputBoxAndButton = htmlFactory(htmlTemplates.inputBox)();
        domManager.addChild(".user-panel", inputBoxAndButton);
        domManager.addEventListener('.save-data',
            "click",
            addBoard);
    }
    // changeName: async function (element) {
    //     let newElement = document.createElement('input');
    //     newElement.setAttribute('class', 'change-board-name');
    //     let parent = element.parentElement;
    //     parent.replaceChild(newElement, element);
    // }
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}

function toggleHideShowBoardColumns(clickEvent){
    const hideShowToggler = clickEvent.target;
    const hideShow = hideShowToggler.nextElementSibling;
    const isHidden = hideShow.style.display === 'none';
    if(isHidden) {
        hideShow.style.display = 'block'
    }
    else{
        hideShow.style.display = 'none'
    };
}
function addBoard(clickEvent) {
    const newBoardName = clickEvent.target.previousElementSibling.value;
    console.log(newBoardName);//document.getElementById('add-board-title-box').value;
    dataHandler.createNewBoard(newBoardName);
    document.getElementById('input-box').remove();
}