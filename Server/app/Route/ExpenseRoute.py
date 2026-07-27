from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.Config.connectDB import get_db
from app.Model.ExpenseModel import ExpenseModel, ExpenseAIModel
from app.Service.ExpenseService import createExpense, createExpenseGenAI, get_all_expense, filterExpenses, delete_expense, update_expense

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


@route.get("/get-filter-expense")
async def get_filter_expense_route(
    input: str = Query(...),
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await filterExpenses(db, input, user.id)


@route.delete("/delete-expense/{id}")
async def delete_expense_route(
    id: int,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await delete_expense(db, id)


@route.put("/update-expense/{id}")
async def update_expense_route(
    id: int,
    expense_details: ExpenseModel,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    return await update_expense(db, expense_details, id)