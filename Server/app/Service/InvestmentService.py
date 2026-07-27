from sqlalchemy.orm.session import Session
from sqlalchemy import func

from app.Model.InvestmentModel import InvestmentModel
from app.DB.Investment import Investment
from app.ML.genAI import get_investment_details_genAI

from fastapi import HTTPException

from datetime import datetime, timedelta

async def create_investment(db: Session, investment_details: InvestmentModel, user_id: int):
    try:
        new_investment = Investment(
            amount = investment_details.amount,
            category = investment_details.category,
            time_stamp = investment_details.time_stamp,
            user_id = user_id
        )
        db.add(new_investment)
        db.commit()
        db.refresh(new_investment)

        return {
            "message": "Investment added successfully..!"
        }
    except HTTPException as e:
        print(str(e))
        raise
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))


async def create_investemt_ai(db: Session, input_str: str, user_id: int):
    try:
        response = await get_investment_details_genAI(input_str)
        new_investment = Investment(
            amount = response.amount,
            category = response.category,
            time_stamp = response.time_stamp,
            user_id = user_id
        )
        db.add(new_investment)
        db.commit()
        db.refresh(new_investment)

        return {
            "message": "Investment added successfully..!"
        }
    except HTTPException as e:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def get_all_Investment(db: Session, user_id: int):
    try:
        total_investment = 0
        investments = db.query(Investment).filter(Investment.user_id == user_id).all()
        if not investments:
            raise HTTPException(status_code=400, detail="No records found")

        total_investment = (db.query(func.sum(Investment.amount)).filter(Investment.user_id == user_id).scalar())
        return {
            "investments": investments,
            "total_investment": total_investment
        }
    except HTTPException as e:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def get_filtered_investments(db: Session, input_type: str, user_id: int):
    try:
        total_investment = 0
        investments = []

        filters = ["Today", "This Week", "This Month", "This Year"]
        if input_type not in filters:
            raise HTTPException(status_code=400, detail="Invalid filter type")
        
        if (input_type == "Today"):
            total_investment = (db.query(func.sum(Investment.amount)).filter(
                Investment.user_id == user_id,
                Investment.time_stamp == str(datetime.now().today()).split(" ")[0]
            ))
            investments = db.query(Investment).filter(
                Investment.user_id == user_id,
                Investment.time_stamp == str(datetime.now().today()).split(" ")[0]
            )

        elif input_type == "This Week":
            one_week_time = datetime.now() - timedelta(days=7)
            total_investment = (db.query(func.sum(Investment.amount)).filter(
                Investment.user_id == user_id,
                Investment.time_stamp >= one_week_time
            ))
            investments = db.query(Investment).filter(
                Investment.user_id == user_id,
                Investment.time_stamp >= one_week_time
            )

        elif input_type == "This Month":
            starting_date_month = datetime(year=datetime.now().year, month=datetime.now().month, day=1)
            total_investment = (db.query(func.sum(Investment.amount)).filter(
                Investment.user_id == user_id,
                Investment.time_stamp >= starting_date_month
            ))
            investments = db.query(Investment).filter(
                Investment.user_id == user_id,
                Investment.time_stamp >= starting_date_month
            )

        elif input_type == "This Year":
            current_year_date = datetime(datetime.now().year, month=1, day=1)
            total_investment = (db.query(func.sum(Investment.amount)).filter(
                Investment.user_id == user_id,
                Investment.time_stamp >= current_year_date
            ))
            investments = db.query(Investment).filter(
                Investment.user_id == user_id,
                Investment.time_stamp >= current_year_date
            )
        
        return {
            "investments": investments,
            "total_investment": total_investment
        }
    except HTTPException as e:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def delete_investment(db: Session, investment_id: int):
    try:
         investmente = db.query(Investment).filter(Investment.id == investment_id).first()
         if not investmente:
             raise HTTPException(status_code=400, detail="No records found")
        
         db.delete(investmente)
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


async def update_expense(db: Session, investmente_details: InvestmentModel, investmente_id: int):
    try:
        investmente = db.query(Investment).filter(Investment.id == investmente_id).first()
        if not investmente:
            raise HTTPException(status_code=400, detail="No records found")

        for key, value in dict(investmente_details).items():
            setattr(investmente, key, value)

        db.commit()
        db.refresh(investmente)

        return {
            "message": "Expense deleted successfully"
        }

    except HTTPException as e:
        print(str(e))
        raise 
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))