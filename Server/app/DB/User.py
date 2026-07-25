from sqlalchemy import Column, Integer, String, Float
from app.Config.connectDB import base

class User(base):
    __tablename__ = "USER"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    city = Column(String, nullable=False)
    salary = Column(Float, nullable=False)
    password = Column(String, nullable=False)