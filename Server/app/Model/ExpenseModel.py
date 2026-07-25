from pydantic import BaseModel, Field

class ExpenseModel(BaseModel):
    amount: float = Field(..., description="The amount of the expense, must be greater than 0")
    category: str = Field(..., description="The category of the expense")
    note: str
    time_stamp: str = Field(...)

class ExpenseAIModel(BaseModel):
    input_str: str = Field(..., min_length=1)
