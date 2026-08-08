from fastapi import APIRouter, Depends

from sqlalchemy.orm.session import Session

from app.Config.connectDB import get_db
from app.Middleware.JWT_middleware import verify
from app.Model.InvestmentModel import InvestmentModel
from app.Service.InvestmentService import create_investment, create_investemt_ai, get_all_Investment, get_filtered_investments, delete_investment, update_expense

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
    investment: str,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await create_investemt_ai(db, investment, user.id)


@route.get("/get-all-investments")
async def get_all_investments_route(
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await get_all_Investment(db, user.id)


@route.get("/get-filter-investments/{input}")
async def get_filter_investments_route(
    input: str,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await get_filtered_investments(db, input, user.id)


@route.put("/update-investment/{id}")
async def update_investment_route(
    id: int,
    investment: InvestmentModel,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await update_expense(db, investment, id)


@route.delete("/delete-investment/{id}")
async def delete_investent_route(
    id: int,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await delete_investment(db, id)