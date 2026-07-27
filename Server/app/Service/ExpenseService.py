from sqlalchemy.orm.session import Session
from app.Model.ExpenseModel import ExpenseModel, ExpenseAIModel
from fastapi import HTTPException
from app.DB.Expense import Expense
from app.ML.genAI import get_expense_details_genAI
from datetime import datetime, timedelta
from sqlalchemy import func

async def createExpense(db: Session, expense_data: ExpenseModel, user_id: int):
    try:
        print(expense_data)
        new_expense = Expense(
            amount=expense_data.amount,
            category=expense_data.category,
            note=expense_data.note,
            user_id=user_id,
            time_stamp=expense_data.time_stamp
        )
        db.add(new_expense)
        db.commit()
        db.refresh(new_expense)
        return {
            "message": "Expense created successfully",
            "expense": new_expense
        }
    except HTTPException as e:
        print(str(e))
        db.rollback()
        raise
    except Exception as e:
        print(str(e))
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    

async def createExpenseGenAI(db: Session, input: ExpenseAIModel, user_id: int):
    try:
        Expense_details = get_expense_details_genAI(input.input_str)
        print('Expense_details : ', Expense_details)
        new_expense = Expense(
            amount=Expense_details.amount,
            category=Expense_details.category,
            note=Expense_details.note,
            time_stamp=str(Expense_details.time_stamp).split(" ")[0],
            user_id=user_id
        )
        print("new one: ", new_expense)
        db.add(new_expense)
        db.commit()
        db.refresh(new_expense)
        return {
            "message": "Expense created successfully",
            "expense": new_expense
        }
    except HTTPException as e:
        print("Error: ", str(e))
        raise
    except Exception as e:
        print("Error: ", str(e))
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    

async def get_all_expense(db: Session, id: str):
    try:
        total_expense = 0
        expenses = db.query(Expense).filter(Expense.user_id == id).all()
        if not expenses:
            raise HTTPException(status_code=400, detail="No records found")
        total_expense = (db.query(func.sum(Expense.amount)).filter(Expense.user_id == id).scalar())
        return {
            "expenses": expenses,
            "Total_expense": total_expense
        }
    except HTTPException as e:
        raise 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def filterExpenses(db: Session, filter_type: str, user_id: int):
    try:
        print(filter_type)
        total_expense = 0
        filters = ["Today", "This Week", "This Month", "This Year"]
        if filter_type not in filters:
            raise HTTPException(status_code=400, detail="Invalid filter type")
        expenses = []
        if filter_type == "Today":
            total_expense = (db.query(func.sum(Expense.amount)).filter(Expense.user_id == user_id, Expense.time_stamp == str(datetime.now()).split(" ")[0]).scalar())
            expenses = db.query(Expense).filter(
                Expense.user_id == user_id,
                Expense.time_stamp == str(datetime.now()).split(" ")[0]
            ).all()
        elif filter_type == "This Week":
            one_week_time = datetime.now() - timedelta(days=7)
            total_expense = (db.query(func.sum(Expense.amount)).filter(
                Expense.user_id == user_id,
                Expense.time_stamp >= one_week_time
            ).scalar())
            expenses = db.query(Expense).filter(
                Expense.user_id == user_id,
                Expense.time_stamp >= one_week_time
            ).all()
        elif filter_type == "This Month":
            now = datetime.now()
            starting_current_month_date = datetime(year=now.year, month=now.month, day=1)
            total_expense = (db.query(func.sum(Expense.amount)).filter(
                Expense.user_id == user_id,
                Expense.time_stamp >= starting_current_month_date
            ).scalar())

            expenses = db.query(Expense).filter(
                Expense.user_id == user_id,
                Expense.time_stamp >= starting_current_month_date
            ).all()
        else:
            now = datetime.now()
            starting_current_year_date = datetime(year=now.year, month=1, day=1)
            total_expense = (db.query(func.sum(Expense.amount)).filter(
                Expense.user_id == user_id,
                Expense.time_stamp >= starting_current_year_date
            ).scalar())
            expenses = db.query(Expense).filter(
                Expense.user_id == user_id,
                Expense.time_stamp >= starting_current_year_date
            ).all()

        if not expenses:
            return {
                "expenses": None,
                "Total_expense": 0
            }

        return {
            "expenses": expenses,
            "Total_expense": total_expense
        }
    except HTTPException as e:
        print(str(e))
        raise 
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))


async def delete_expense(db: Session, expense_id: int):
    try:
        expense = db.query(Expense).filter(Expense.id == expense_id).first()
        if not expense:
            raise HTTPException(status_code=400, detail="No records found")

        db.delete(expense)
        db.commit()

        return {
            "message": "Expense deleted successfully"
        }

    except HTTPException as e:
        print(str(e))
        raise 
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))


async def update_expense(db: Session, expense_details: ExpenseModel, expense_id: int):
    try:
        expense = db.query(Expense).filter(Expense.id == expense_id).first()
        if not expense:
            raise HTTPException(status_code=400, detail="No records found")

        for key, value in dict(expense_details).items():
            setattr(expense, key, value)

        db.commit()
        db.refresh(expense)

        return {
            "message": "Expense deleted successfully"
        }

    except HTTPException as e:
        print(str(e))
        raise 
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))