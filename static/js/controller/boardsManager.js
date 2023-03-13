import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {columnsManager} from "./columnsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            await columnsManager.loadColumns(board.id);
            await cardsManager.loadCards(board.id);
            domManager.addEventListener(`.board-title[data-board-id="${board.id}"]`,
                'click',
                renameBoard);
            domManager.addEventListener(`.delete-board-button[data-board-id="${board.id}"]`,
                'click',
                deleteBoard);
            domManager.addEventListener(`.board-header[data-board-id="${board.id}"]`,
                "click",
                toggleHideShowBoardColumns);
            domManager.addEventListener(`.add-column-button[data-board-id="${board.id}"]`,
                'click',
                addColumn);
            domManager.addEventListener(`.add-card-button[data-board-id="${board.id}"]`, 'click', addCard);

        }
    },
    createBoard: function (clickEvent) {
        clickEvent.target.style.display = 'none';
        const inputBuilder = htmlFactory(htmlTemplates.inputPanel);
        const inputBox = inputBuilder();
        domManager.addChild(".add-board", inputBox);
        domManager.addEventListener('.save-data',
            "click",
            addBoard);
    },
};


function addCard(clickEvent){
    clickEvent.stopPropagation();
    const cardNameField = document.createElement('input');
    cardNameField.setAttribute('placeholder', 'New card');
    clickEvent.target.style.display = "none";
    //const boardId = parseInt(clickEvent.target.dataset.boardId);
    clickEvent.target.insertAdjacentElement('afterend', cardNameField);
    cardNameField.onblur = function(event, ){
        const boardId = parseInt(event.target.previousElementSibling.dataset.boardId);
        const cardName = cardNameField.value; //ok
        cardNameField.remove();
        clickEvent.target.style.display = "block";
        const cardId = dataHandler.createNewCard(cardName, boardId, 1); // uzupełnić o userId
        const newCard = htmlFactory(htmlTemplates.card)(cardId, cardName);
        domManager.addChild(`.board-column-1[data-board-id="${boardId}"]`, newCard);
    }
}


function renameBoard(clickEvent) {
    clickEvent.stopPropagation();
    clickEvent.target.style.display = 'none';
    const boardNameInput = document.createElement('input');
    boardNameInput.setAttribute('id', 'change-board-name-box');
    boardNameInput.setAttribute('required', 'true');
    boardNameInput.setAttribute('placeholder', 'Rename board')
    const renameBoardButton = clickEvent.target;
    renameBoardButton.insertAdjacentElement('afterend', boardNameInput);
    boardNameInput.onblur = function (event) {
        let newBoardName = boardNameInput.value;
        const boardId = parseInt(clickEvent.target.dataset.boardId);
        dataHandler.renameBoard(newBoardName, boardId);
        document.getElementById('change-board-name-box').remove();
        location.reload();
    }
}

function deleteBoard(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    dataHandler.deleteBoard(boardId);
}

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}

function toggleHideShowBoardColumns(clickEvent) {
    const hideShowToggler = clickEvent.target;
    const hideShow = hideShowToggler.nextElementSibling;
    const isHidden = hideShow.style.display === 'none';
    if (isHidden) {
        hideShow.style.display = 'block'
    } else {
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
        const boardId = parseInt(clickEvent.target.dataset.boardId);
        dataHandler.setColumnName(newColumnName, boardId);
        document.getElementById('add-column-name-box').remove();
        location.reload();
    }
}

function takenColumnName(columnName, boardId){
    const columns = dataHandler.getStatuses(boardId);
    for(let column of columns){
        const hasColumn = column.title==columnName ? true : false;
        if (hasColumn == true) { return true}
    }
    return false;
}