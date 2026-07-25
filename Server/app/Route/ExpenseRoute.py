from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.Config.connectDB import get_db
from app.Model.ExpenseModel import ExpenseModel, ExpenseAIModel
from app.Service.ExpenseService import createExpense, createExpenseGenAI, get_all_expense

from app.Middleware.JWT_middleware import verify

route = APIRouter(
    prefix="/api/expense"
)

@route.post("/create-manual")
async def create_expense(
    expense_data: ExpenseModel,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await createExpense(db, expense_data, user.id)


@route.post("/create-ai")
async def create_ai_expense(
    expense_input: ExpenseAIModel,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await createExpenseGenAI(db, expense_input, user.id)


@route.get("/get-all-expense")
async def get_all_expenses_route(
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await get_all_expense(db, user.id)