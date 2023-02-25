import bcrypt
from functools import wraps
from flask import jsonify, session


def json_response(func):
    """
    Converts the returned dictionary into a JSON response
    :param func:
    :return:
    """
    @wraps(func)
    def decorated_function(*args, **kwargs):
        return jsonify(func(*args, **kwargs))

    return decorated_function

def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

def validate_user(password_from_user, hashed_password):
    hashed_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password_from_user.encode('utf-8'), hashed_bytes)