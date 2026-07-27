from fastapi import APIRouter, Depends

from sqlalchemy.orm.session import Session

from app.Config.connectDB import get_db
from app.Middleware.JWT_middleware import verify
from app.Model.InvestmentModel import InvestmentModel
from app.Service.InvestmentService import create_investment, create_investemt_ai, get_all_Investment

route = APIRouter(
    prefix="/api/investment"
)

@route.post("/create-manual")
async def create_Investment_manual_route(
    investment: InvestmentModel,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await create_investment(db, investment, user.id)


@route.post("/create-ai")
async def create_Investment_ai_route(
    investment: dict,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await create_investemt_ai(db, investment['input'], user.id)


@route.get("/get-all-investments")
async def get_all_investments_route(
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await get_all_Investment(db, user.id)