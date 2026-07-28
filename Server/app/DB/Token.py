from sqlalchemy import Column, String, Integer

from app.Config.connectDB import base

class Token(base):
    __tablename__ = "blacklist"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, nullable=False)