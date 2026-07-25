from sqlalchemy.orm.session import Session
from sqlalchemy import func

from app.Model.InvestmentModel import InvestmentModel
from app.DB.Investment import Investment
from app.ML.genAI import get_investment_details_genAI

from fastapi import HTTPException

async def create_investment(db: Session, investment_details: InvestmentModel, user_id: int):
    try:
        new_investment = Investment(
            amout = investment_details.amout,
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
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def create_investemt_ai(db: Session, input_str: str, user_id: int):
    try:
        response = await get_investment_details_genAI(input_str)
        new_investment = Investment(
            amout = response.amout,
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
    