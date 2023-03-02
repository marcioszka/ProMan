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
            domManager.addEventListener(`.board-title[data-board-id="${board.id}"]`,
                'click',
                renameBoard);
            domManager.addEventListener(`.add-column-button[data-board-id="${board.id}"]`,
                'click',
                addColumn);
            domManager.addEventListener(`.delete-board-button[data-board-id="${board.id}"]`,
                'click',
                deleteBoard);
        }
    },
    createBoard: function (clickEvent) {
        const createBoardButton = clickEvent.target;
        createBoardButton.style.display = 'none';
        const inputBuilder = htmlFactory(htmlTemplates.inputBox);
        const inputBox = inputBuilder();
        domManager.addChild(".add-board", inputBox);
        domManager.addEventListener('.save-data',
            "click",
            addBoard);
        createBoardButton.style.display = 'block';
    },
    renameColumn: function () {
        const columns = dataHandler.getColumns(); //getColumns : TO CREATE
        for (let column of columns){
            //stworzyć inputa na tresć i podmienić tytuł nim
            //z inputa pobrac naze kolumny, ja wyswietlac i wyslac jako status
        }

    },
};

function renameBoard(clickEvent) { //poprawic kod
    clickEvent.stopPropagation();
    const boardNameInput = document.createElement('input');
    boardNameInput.setAttribute('id', 'change-board-name-box');
    boardNameInput.setAttribute('required', 'true');
    boardNameInput.setAttribute('placeholder', 'Rename board')
    const renameBoardButton = clickEvent.target;
    renameBoardButton.insertAdjacentElement('afterend', boardNameInput);
    console.log(boardNameInput, renameBoardButton); //wyswietla
    boardNameInput.onblur = function(event){
        let newBoardName = boardNameInput.value;
        console.log(newBoardName, boardNameInput); //nie wyswietla, jak na clickEvent
        const boardId = parseInt(clickEvent.target.dataset.boardId);
        dataHandler.renameBoard(newBoardName, boardId);
        document.getElementById('change-board-name-box').remove();
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

function toggleHideShowBoardColumns(clickEvent){
    const hideShowToggler = clickEvent.target;
    const hideShow = hideShowToggler.nextElementSibling;
    const isHidden = hideShow.style.display === 'none';
    console.log();
    if(isHidden) {
        hideShow.style.display = 'block'
    }
    else{
        hideShow.style.display = 'none'
    };
    clickEvent.stopPropagation();
}
function addBoard(clickEvent) {
    const newBoardName = clickEvent.target.previousElementSibling.value;
    dataHandler.createNewBoard(newBoardName);
    document.getElementById('input-box').remove();
}

function addColumn(clickEvent) {  //poprawic kod
    const columnNameInput = document.createElement('input');
    columnNameInput.setAttribute('id', 'add-column-name-box');
    columnNameInput.setAttribute('required', 'true');
    const addColumnButton = clickEvent.target;
    addColumnButton.insertAdjacentElement('afterend', columnNameInput);
    columnNameInput.onblur = function(event){
        let newColumnName = columnNameInput.value;
        const columnBuilder = htmlFactory(htmlTemplates.column);
        const content = columnBuilder(newColumnName);
        const boardId = parseInt(clickEvent.target.dataset.boardId);
        domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content);
        document.getElementById('add-column-name-box').remove();
    }
}