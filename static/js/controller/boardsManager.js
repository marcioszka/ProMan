import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const user_id = document.getElementById('user-id');
        const allBoards = await dataHandler.getBoards();
        const boards = structuredClone(allBoards);
        if(user_id != null){ //zalogowany
             for (let eachBoard of boards){
                 if (Object.values(eachBoard)[2] !== null && Object.values(eachBoard)[2] !== user_id)
                        {delete boards[eachBoard]};
             }
         }
        else{ //niezalogowany
            for (let eachBoard of boards){
                if (Object.values(eachBoard)[2] !== null) {delete boards[eachBoard]};
            }
            console.log(boards);
            };
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
            //domManager.addEventListener()
        }
    },
    createBoard: function () {
        const inputBoxAndButton = htmlFactory(htmlTemplates.inputBox)();
        domManager.addChild(".add-board", inputBoxAndButton);
        domManager.addEventListener('.save-data',
            "click",
            addBoard);
    }
    // renameBoard: function () {
    //     const inputBoxAndButton = htmlFactory(htmlTemplates.inputBox)();
    //     domManager.addChild(".user-panel", inputBoxAndButton);
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
    dataHandler.createNewBoard(newBoardName);
    document.getElementById('input-box').remove();
}