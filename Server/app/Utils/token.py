from jose import jwt
from app.Config.config import setting


def create_jwt_token(data: dict) -> str:
    return jwt.encode(data, setting.SECRET_KEY, algorithm=setting.ALGORITHM)