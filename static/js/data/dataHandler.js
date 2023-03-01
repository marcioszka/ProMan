export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    // getPublicBoards: async function () {
    //     return await apiGet("/api/public_boards")
    // },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
        //return apiGet(`/api/boards/${boardId}`)
    },
    getStatuses: async function () {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (boardTitle) {
        return await apiPost('/api/boards/new_board', { body: {"title": boardTitle}})
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
    },
    deleteBoard: async function (boardId) {
        return await apiDelete(`/api/boards/${boardId}`, {boardId:boardId});
    },
    addColumn: async function (columnTitle){
        return await apiPost(`/api/boards/new_column`, {body:{"title": columnTitle}})
    },
    renameBoard: async function (boardTitle, boardId){
        console.log(boardTitle, boardId);
        return await apiPut(`/api/boards/new_name`, {body: {"id": boardId, "title": boardTitle}})
    },
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiDelete(url, payload) {
    let response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPut(url, payload) {
    let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(payload)
    });
    if (response.ok){
        return await response.json();
    }
}

async function apiPatch(url) {
}