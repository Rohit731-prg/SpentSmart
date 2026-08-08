from sqlalchemy import Column, Integer, String, ForeignKey, Date
from app.Config.connectDB import base

class Investment(base):
    __tablename__ = "INVESTMENT"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('USER.id'), nullable=False)
    amount = Column(Integer, nullable=False)
    category = Column(String, nullable=False)
    time_stamp = Column(Date, nullable=False)