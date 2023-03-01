import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_board(title):
    return data_manager.execute_select(
        """
        SELECT title FROM boards WHERE title=%(title)s
        ;
        """
    )


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_private_boards(user_id):
    return data_manager.execute_select(
        """
        SELECT * FROM boards WHERE user_id <> 'null' OR user_id=%(user_id)s
        ;
        """, {'user_id': user_id}
    )


def get_public_boards():
    return data_manager.execute_select(
        """SELECT * FROM boards WHERE user_id <> 'null';"""
    )


def add_board(title):
    return data_manager.execute_update(
        """
        INSERT INTO boards (title) VALUES (%(title)s)
        """, {'title': title}
    )


def add_private_board(user_id, title):
    return data_manager.execute_update(
        """
        INSERT INTO boards (title, user_id) VALUES (%(title)s, %(user_id)s)
        """, {'title': title, 'user_id': user_id}
    )


def get_cards_for_board(board_id):
    # remove this code once you implement the database
    return [{"title": "title1", "id": 1}, {"title": "board2", "id": 2}]

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def add_user(username, password):
    new_user = data_manager.execute_select('INSERT INTO users (username, password) VALUES (%(username)s, %(password)s) RETURNING id', {'username': username, 'password': password})
    return new_user


def get_user_password(username):
    user_data = data_manager.execute_select('SELECT password FROM users WHERE username=%(username)s', {'username': username}, fetchall=False)
    return user_data['password']


def get_user_id(username):
    user_data = data_manager.execute_select('SELECT id FROM users WHERE username=%(username)s', {'username': username}, fetchall=False)
    return user_data['id']


def get_board(id):
    return data_manager.execute_select(
        """
        SELECT * FROM boards WHERE id=%(id)s;
        """, {'id': id}
    )


def delete_board(board_id):
    data_manager.execute_update(
        """
        DELETE 
        FROM boards
        WHERE id = %(board_id)s
        """,
        {'board_id': board_id}
    )


def delete_cards(board_id):
    data_manager.execute_update(
        """
        DELETE 
        FROM cards
        WHERE board_id = %(board_id)s
        """,
        {'board_id': board_id}
    )

def add_column(title):
    data_manager.execute_update(
        """
            INSERT INTO statuses (title)
            VALUES (%(title)s);
            """,
        {'title': title}
    )

def update_board_name(id, title):
    data_manager.execute_update(
        """
            UPDATE boards
            SET title = %(title)s
            WHERE id = %(id)s;
        """,
        {'id': id, 'title': title}
    )

