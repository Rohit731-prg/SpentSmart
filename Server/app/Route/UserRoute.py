from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from app.Model.UserModel import UserModel, LoginModel
from app.Config.connectDB import get_db
from app.Service.UserService import createUser, loginUser, userLogOut

route = APIRouter(
    prefix="/api/user",
)

@route.post("/create")
async def createUser_route(
    user: UserModel,
    db: Session = Depends(get_db)
):
    return await createUser(db, user)


@route.post("/login")
async def login_route(
    res: Response,
    login_details: LoginModel,
    db: Session = Depends(get_db),
):
    return await loginUser(db, login_details, res)