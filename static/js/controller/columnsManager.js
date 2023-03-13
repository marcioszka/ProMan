import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let columnsManager = {
    loadColumns: async function (boardId) {
        const columns = await dataHandler.getStatuses(boardId);
        for (let column of columns) {
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(column.title, boardId);
            domManager.addChild(`.columns-in-boards[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(`.delete-column-button[data-board-id="${boardId}"]`,
               'click',
               deleteColumn);
        }
    },
};

function deleteColumn(clickEvent) {
    const columnName = clickEvent.target.previousElementSibling.innerText;
    const boardId = parseInt(clickEvent.target.dataset.boardId);
    dataHandler.deleteColumn(columnName, boardId);
}