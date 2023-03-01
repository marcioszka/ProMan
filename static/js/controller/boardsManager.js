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
                toggleHideShowBoardColumns);
            //domManager.addEventListener();
            domManager.addEventListener(`.add-column-button[data-board-id="${board.id}"]`,
                'click',
                addColumn);
        }
    },
    createBoard: function () {
        const inputBoxAndButton = htmlFactory(htmlTemplates.inputBox)();
        domManager.addChild(".add-board", inputBoxAndButton);
        domManager.addEventListener('.save-data',
            "click",
            addBoard);
    },
    removeBoard: function () {
        domManager.addEventListener('#delete-board-button', 'click', deleteBoard)
    },
    // renameBoard: function () {
    //     const inputBoxAndButton = htmlFactory(htmlTemplates.inputBox)();
    //     domManager.addChild(".user-panel", inputBoxAndButton);
    //     let parent = element.parentElement;
    //     parent.replaceChild(newElement, element);
    // },
};

function deleteBoard(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    dataHandler.deleteBoard(boardId);
}

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
    dataHandler.createNewBoard(newBoardName);
    document.getElementById('input-box').remove();
}

function addColumn(clickEvent) {
    const columnNameInput = document.createElement('input');
    columnNameInput.setAttribute('id', 'add-column-name-box');
    columnNameInput.setAttribute('required', 'true');
    const addColumnButton = clickEvent.target;
    addColumnButton.insertAdjacentElement('afterend', columnNameInput);
    columnNameInput.onblur = function(event){
        let newColumnName = columnNameInput.value;
        console.log(newColumnName);
        const columnBuilder = htmlFactory(htmlTemplates.column);
        const content = columnBuilder(newColumnName);
        const boardId = parseInt(clickEvent.target.dataset.boardId);
        domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content);
        document.getElementById('add-column-name-box').remove();
    }
}