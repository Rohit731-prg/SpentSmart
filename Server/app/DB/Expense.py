from sqlalchemy import Column, ForeignKey, Integer, Date, String
from app.Config.connectDB import base

class Expense(base):
    __tablename__ = "EXPENSE"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('USER.id'), nullable=False)
    amount = Column(Integer, nullable=False)
    category = Column(String, nullable=False)
    note = Column(String, nullable=True)
    time_stamp = Column(Date, nullable=False)