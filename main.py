from flask import Flask, render_template, redirect, request, url_for, session
from dotenv import load_dotenv
from util import json_response, hash_password, validate_user
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = 'b$2b$12$UqwJUUmOTIXVJ1NFd.UMg.'
load_dotenv()


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    user_id = session.get('id')
    if user_id:
        return queries.get_private_boards(user_id)
    else:
        return queries.get_public_boards()

@app.route("/api/boards/new_board", methods=['POST', 'GET'])
@json_response
def create_board():
    """
    Handle new board
    """
    data = request.get_json(force=True)
    content = data["body"]
    title = content["title"]
    user_id = session.get('id')
    if user_id:
        return queries.add_private_board(user_id, title)
    else:
        return queries.add_board(title)


@app.route("/api/boards/new_name", methods=['PUT'])
@json_response
def rename_board():
    data = request.get_json(force=True)
    content = data["body"]
    board_title = content["title"]
    board_id = content["id"]
    return queries.update_board_name(board_id, board_title)


@app.route("/api/boards/<int:board_id>", methods=['GET', 'DELETE'])
@json_response
def delete_board(board_id: int):
    """
    Deleting all boards.
    """
    queries.delete_cards(board_id)
    queries.delete_statuses(board_id)
    queries.delete_board(board_id)
    return request.get_json()

@app.route("/api/statuses", methods=['POST', 'GET'])
@json_response
def add_column():
    data = request.get_json(force=True)
    content = data["body"]
    column_title = content["title"]
    board_id = content["board_id"]
    return queries.add_column(column_title, board_id)

@app.route("/api/statuses/delete_status", methods=['GET', 'DELETE'])
@json_response
def delete_column():
    data = request.get_json(force=True)
    content = data["body"]
    queries.delete_status(content["title"], content["board_id"])
    # queries.delete_cards_by_status(status_id)
    return request.get_json()

@app.route("/api/statuses/<int:status_id>", methods=['PUT'])
@json_response
def update_status(status_id):
    data = request.get_json(force=True)
    content = data["body"]
    column_title = content["title"]
    return queries.get_status_id(column_title)


@app.route("/api/boards/<int:board_id>/cards")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    # data = request.get_json(force=True)
    # content = data["body"]
    # board_id = content["board_id"]
    return queries.get_cards_for_board(board_id)


# @app.route("/api/boards/<int:board_id>/cards/")
# @json_response
# def get_cards_for_boards(board_id: int):
#     """
#     All cards that belongs to a board
#     :param board_id: id of the parent board
#     """
#
#     return queries.get_cards_for_board(board_id)


@app.route('/api/boards/<int:board_id>/cards/new_card', methods=['POST'])
@json_response
def add_card(board_id):
    data = request.get_json(force=True)
    content = data["body"]
    card_title = content["title"]
    status_id = content["status_id"]
    board_id = content["board_id"]
    result = queries.add_card(board_id, status_id, card_title)
    return result["id"]


@app.route("/register", methods=['GET', 'POST'])
def register():
    users_data = queries.get_users()
    users = [user_data["username"] for user_data in users_data]
    print(users)
    if request.method == 'POST':
        username = request.form.get('username')
        if username in users:
            return render_template("registration_form.html", message_username="Username already in use")
        password_to_hash = request.form.get('password')
        password_repeated = request.form.get('password2')
        if password_repeated != password_to_hash:
            return render_template("registration_form.html", message_password="Passwords don't match. Try again.")
        password = hash_password(password_to_hash)
        new_user = queries.add_user(username, password)
        if new_user:
            return redirect('/')
        else:
            return render_template("error.html")
    else:
        return render_template("registration_form.html")


@app.route("/login", methods=['GET', 'POST'])
def login():
    is_logged = False
    if request.method == 'POST':
        user_login = request.form.get("login")
        user_password = request.form.get("user_password")
        hashed_password = queries.get_user_password(user_login)
        is_logged = validate_user(user_password, hashed_password)
        if is_logged:
            session['user'] = user_login
            session['logged'] = True
            session['id'] = queries.get_user_id(user_login)
            return redirect('/')
        else:
            return render_template('error.html')
    elif request.method == 'GET':
        session.clear()
        return render_template('login_form.html')


@app.route("/logout")
def logout():
    session.clear()
    return redirect('/')


@app.route("/api/cards/")
@json_response
def get_all_cards():

    return queries.get_all_cards()


@app.route("/api/cards/delete_card/<int:card_id>", methods=['GET', 'DELETE'])
@json_response
def delete_card(card_id: int):
    return queries.delete_card(card_id)


@app.route("/api/boards/<int:board_id>/get-statuses", methods=['GET'])
@json_response
def get_columns(board_id):
    return queries.get_board_statuses(board_id)


@app.route("/api/statuses/new_name", methods=['GET', 'PUT'])
@json_response
def rename_column():
    data = request.get_json(force=True)
    content = data["body"]
    title = content["title"]
    id = content["id"]
    return queries.update_column_name(id, title)


@app.route("/api/cards/rename_card/<int:card_id>", methods=['GET', 'PUT'])
@json_response
def rename_card(card_id):
    data = request.get_json(force=True)
    content = data["body"]
    title = content["title"]
    return queries.update_card_name(card_id, title)


@app.route("/api/change_card_order/<int:card_order>", methods=['PUT'])
# @json_response
def change_card_order(card_order):

    data = request.get_json(force=True)
    card_id = data['id']
    order_status = data['order_status']
    queries.change_card_order(card_id, order_status)
    return request.get_json()
    # return queries.change_card_order(data['id'], data['order_status'])


@app.route("/api/change_card_status/<int:card_id>", methods=['PUT'])
@json_response
def change_card_status(card_id):
    data = request.get_json(force=True)
    content = data['body']
    card_status = content['card_status']
    queries.change_card_status(card_id, card_status)
    return request.get_json()


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
