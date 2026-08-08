from fastapi import APIRouter, Depends, Response, Request

from sqlalchemy.orm import Session

from app.Model.UserModel import UserModel, LoginModel, User_Update
from app.Config.connectDB import get_db
from app.Service.UserService import createUser, loginUser, userLogOut, update_user_info, get_all_basic_details
from app.Middleware.JWT_middleware import verify

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


@route.post("/log-out")
async def logout_route(
    res: Response,
    req: Request,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await userLogOut(db, req, res)


@route.put("/update-user-info")
async def update_user_info_route(
    user_info: User_Update,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await update_user_info(db, user_info, user.id)


@route.get("/get-all-basic-info")
async def get_basic_info_route(
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await get_all_basic_details(db, user.id)