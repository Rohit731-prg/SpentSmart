from jose import jwt
from fastapi import HTTPException, Request, Depends
from app.Config.connectDB import get_db
from sqlalchemy.orm.session import Session
from app.Config.config import setting
from app.DB.User import User

async def verify(
    req: Request,
    db: Session = Depends(get_db)
):
    try:
        cookie = req.cookies.get("access_token")
        if not cookie:
            raise HTTPException(status_code=400, detail="No cookie found")
        print(cookie)
        payload = jwt.decode(cookie, setting.SECRET_KEY, algorithms=[setting.ALGORITHM])
        user_id, user_email = payload.get("user_id"), payload.get("email")

        user = db.query(User).filter(User.id == user_id, User.email == user_email).first()
        if not user:
            raise HTTPException(status_code=400, detail="User not found")

        return user
    except HTTPException as e:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))