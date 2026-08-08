from sqlalchemy.orm.session import Session
from sqlalchemy import func

from fastapi import HTTPException, Request, Response

from app.Model.UserModel import UserModel, LoginModel, User_Update
from app.Utils.Password import hash_password, verify_password
from app.Utils.token import create_jwt_token

from app.DB.Expense import Expense
from app.DB.Investment import Investment
from app.DB.Token import Token
from app.DB.User import User

from datetime import datetime, date


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
    

async def userLogOut(db: Session ,req: Request, res: Response):
    try:
        cookie = req.cookies.get("access_token")
        if not cookie:
            raise HTTPException(status_code=400, detail="No Cookie found")


        token = db.query(Token).filter(Token.token == cookie).first()
        if not token:
            new_tooken = Token(
                token = cookie
            )
            db.add(new_tooken)
            db.commit()
            db.refresh(new_tooken)

        res.delete_cookie(key="access_token")
        return {
            "message": "Logout successfully"
        }
    except HTTPException as e:
        print(str(e))
        raise
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))


async def update_user_info(db: Session, user_info: User_Update, user_id):
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=400, detail="User id not found")

        for key, value in dict(user_info).items():
            setattr(user, key, value)

        db.commit()
        db.refresh(user)

        return {
            "message": "User Info updated successfully..!"
        }
    except HTTPException as e:
        print(str(e))
        raise
    except Exception as e:  
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))


async def get_all_basic_details(db: Session, user_id: int):
    try:
        total_expense = (db.query(func.sum(Expense.amount)).filter(Expense.user_id == user_id).scalar())
        total_investment = (db.query(func.sum(Investment.amount)).filter(Investment.user_id == user_id).scalar())

        today_total_expense = (db.query(func.sum(Expense.amount)).filter(
            Expense.user_id == user_id,
            Expense.time_stamp == date.today()
        ).scalar())
        today_total_investment = (db.query(func.sum(Investment.amount)).filter(
            Investment.user_id == user_id,
            Investment.time_stamp == date.today()
        ).scalar())

        starting_date = datetime(year=datetime.now().year, month=datetime.now().month, day=1)
        this_month_expense = (db.query(func.sum(Expense.amount)).filter(
            Expense.user_id == user_id,
            Expense.time_stamp >= starting_date
        ).scalar())
        this_month_investment = (db.query(func.sum(Investment.amount)).filter(
            Investment.user_id == user_id,
            Investment.time_stamp >= starting_date
        ).scalar())

        group_by_expense = (
            db.query(Expense.category, func.sum(Expense.amount).label("total")).filter(
                Expense.user_id == user_id,
            ).group_by(
                Expense.category
            ).order_by(func.sum(Expense.amount).desc())
            .limit(5)
            .all()
        )

        group_by_expense_json = [
            {
            "category": row.category,
            "total": float(row.total),
            }
            for row in group_by_expense
        ]

        recent_transaction = db.query(Expense).filter(Expense.user_id == user_id).order_by(
            Expense.time_stamp.desc()
        ).limit(7)

        recent_transaction_json = [
            {
                "id": row.id,
                "amount": row.amount,
                "category": row.category,
                "description": row.note,
                "time_stamp": row.time_stamp
            }
            for row in recent_transaction
        ]

        return {
            "total": {
                "total_expense": total_expense,
                "total_investment": total_investment
            },
            "today_report": {
                "expense": today_total_expense,
                "investment": today_total_investment
            },
            "monthly_report": {
                "expense": this_month_expense,
                "investment": this_month_investment
            },
            "top_expense_report": group_by_expense_json,
            "last_transaction": recent_transaction_json
        }
    except HTTPException as e:
        print(str(e))
        raise
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))