import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let columnsManager = {
    loadColumns: async function (boardId) {
        const columns = await dataHandler.getStatuses(boardId);
        console.log(columns);
        // for (let column of columns) {
        //     const columnBuilder = htmlFactory(htmlTemplates.column);
        //     const content = columnBuilder(column.title, column.board_id);
        //     domManager.addChild(`.columns-in-boards[data-board-id="${boardId}"]`, content);
        // }
    },
};