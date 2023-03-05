export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
        //return apiGet(`/api/boards/${boardId}`)
    },
    getStatuses: async function (boardId) {
        // the statuses are retrieved and then the callback function is called with the statuses
        return apiGet(`/api/${boardId}/get-statuses`)
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
        return apiGet(`/api/get-statuses/${statusId}`)
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
        return await apiPost(`/api/boards/${boardId}/cards/new_card`, {body: {"title": cardTitle, "board_id": boardId, "status_id": statusId}})
    },
    deleteBoard: async function (boardId) {
        return await apiDelete(`/api/boards/${boardId}`, {boardId:boardId});
    },
    setColumnName: async function (columnTitle){
        const title = columnTitle.toLowerCase();
        return await apiPost(`/api/statuses`, {body:{"title": title}})
    },
    renameBoard: async function (boardTitle, boardId){
        return await apiPut(`/api/boards/new_name`, {body: {"id": boardId, "title": boardTitle}})
    },
    renameColumn: async function (columnTitle, statusId){
        return await apiPut(`/api/statuses/${statusId}`, {body: {"title": columnTitle}})
    },
    addColumn: async function (columnTitle){
        return await apiPost(`/api/boards/new_column`, {body:{"title": columnTitle}})
    },
    deleteCard: async function (cardId) {
        return await apiDelete(`/api/cards/delete_card/${cardId}`, {cardId:cardId});
    },
    renameCard: async function (cardTitle, cardId){
        return await apiPut(`/api/cards/rename_card/${cardId}`, {body: {"id": cardId, "title": cardTitle}})
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