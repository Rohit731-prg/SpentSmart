from pydantic import BaseModel, Field

class InvestmentModel(BaseModel):
    amount: float = Field(...)
    category: str = Field(...)
    time_stamp: str = Field(...)