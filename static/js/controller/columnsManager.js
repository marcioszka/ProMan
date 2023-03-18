import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import { cardsManager } from "./cardsManager.js";

export let columnsManager = {
    loadColumns: async function (boardId) {
        const columns = await dataHandler.getStatuses(boardId);
        for (let column of columns) {
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(column);
            await cardsManager.loadCards(boardId, column.id);
            domManager.addChild(`.columns-in-boards[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(`.delete-column-button[data-board-id="${boardId}"]`,
               'click',
               deleteColumn);
            domManager.addEventListener(`.board-column-title[data-id="${column.id}"]`,
                'click',
                renameColumn);
            }
    },
};

function deleteColumn(clickEvent) {
    const columnName = clickEvent.target.previousElementSibling.innerText;
    const boardId = parseInt(clickEvent.target.dataset.boardId);
    dataHandler.deleteColumn(columnName, boardId);
}

function renameColumn(clickEvent) {
    clickEvent.stopPropagation();
    const oldName = clickEvent.target.innerText;
    clickEvent.target.style.display = "none";
    const newColumnNameField = document.createElement('input');
    newColumnNameField.setAttribute('id', 'change-column-name-box');
    newColumnNameField.setAttribute('required', 'true');
    newColumnNameField.setAttribute('placeholder', oldName);
    clickEvent.target.insertAdjacentElement('afterend', newColumnNameField);
    newColumnNameField.onblur = function (event) {
        let newColumnName = newColumnNameField.value;
        const columnId = parseInt(clickEvent.target.dataset.id);
        dataHandler.renameColumn(columnId, newColumnName);
        document.getElementById('change-column-name-box').remove();
        location.reload();
        }
    }

function handleKeyPress(keyEvent) {
    keyEvent.stopPropagation();
    const newName = keyEvent.target.value;
    if(keyEvent.key == 'Enter' && newName != "")
    {
        const boardId = parseInt(keyEvent.target.dataset.boardId);
        dataHandler.renameColumn(newName, columnId);
    }
    else if (keyEvent.key == 'Escape'){
        return;
    }
}
 async function columnNameValidation(columnName, boardId){
    let columns = await dataHandler.getStatuses(boardId);
    let columnNames = ["new", "in progress", "testing", "done"];
    for(let column of columns){
        columnNames.push(column.title);
    }
    columnName.toLowerCase();
    return columnNames.includes(columnName)
}