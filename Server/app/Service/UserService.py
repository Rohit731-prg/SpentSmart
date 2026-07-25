from sqlalchemy.orm.session import Session
from app.Model.UserModel import UserModel, LoginModel
from fastapi import HTTPException, Response
from app.DB.User import User
from app.Utils.Password import hash_password, verify_password
from app.Utils.token import create_jwt_token
from app.Redis.redis import blackList_token

async def createUser(db: Session, user_data: UserModel):
    try:
        user = db.query(User).filter(User.email == user_data.email).first()
        if user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        password = hash_password(user_data.password)
        new_user = User(
            name=user_data.name,
            email=user_data.email,
            city=user_data.city,
            salary=user_data.salary,
            password=password
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "message": "User created successfully",
        }
    except HTTPException as e:
        print(str(e ))
        raise
    except Exception as e:
        print(str(e ))
        raise HTTPException(status_code=500, detail=str(e))


async def loginUser(db: Session, lofin_details: LoginModel, res: Response):
    try:
        user = db.query(User).filter(User.email == lofin_details.email).first()
        if not user:
            raise HTTPException(status_code=400, detail="User email not found")
        
        # Verify the password
        compaire_password = verify_password(lofin_details.password, str(user.password))
        if not compaire_password:
            raise HTTPException(status_code=400, detail="Incorrect password")
        
        token = create_jwt_token({"user_id": user.id, "email": user.email})
        res.set_cookie(key="access_token", value=token, httponly=True)

        return {
            "message": "Login successful",
            "user": {
                "name": user.name,
                "email": user.email,
                "city": user.city,
                "salary": user.salary
            }
        }
    except HTTPException as e:
        raise
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))
    

async def userLogOut(res: Response, token: str):
    try:
        blackList_token(token_id=token, expiration_time=3600)
        res.delete_cookie(key="access_token")
        return {
            "message": "User logged out successfully"
        }
    except HTTPException as e:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
