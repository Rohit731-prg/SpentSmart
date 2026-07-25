from sqlalchemy import Column, ForeignKey, Integer, String
from app.Config.connectDB import base

class Expense(base):
    __tablename__ = "EXPENSE"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('USER.id'), nullable=False)
    amount = Column(nullable=False)
    category = Column('category', nullable=False)
    note = Column('note', nullable=True)
    time_stamp = Column('time_stamp', nullable=False)