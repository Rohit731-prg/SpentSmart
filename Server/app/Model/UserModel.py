from pydantic import BaseModel, Field, EmailStr, field_validator
from app.Utils.city import citys

class UserModel(BaseModel):
    name: str = Field(..., description="The name of the user")
    email: EmailStr = Field(..., description="The email address of the user")

    city: str = Field(..., description="The city where the user resides")
    @field_validator('city')
    @classmethod
    def validate_city(cls, value):
        if value not in citys:
            raise ValueError("City must be from India")
        return value

    salary: float = Field(..., description="The salary of the user")
    @field_validator('salary')
    @classmethod
    def validate_salary(cls, value):
        if value <= 0:
            raise ValueError("Salary must be a positive number")
        if value < 5000:
            raise ValueError("Salary must be at least 5000")
        return value
    
    password: str = Field(..., min_length=6, description="The password of the user")


class LoginModel(BaseModel):
    email: EmailStr = Field(..., description="The email address of the user")
    password: str = Field(..., min_length=6, description="The password of the user")


class User_Update(BaseModel):
    name: str = Field(..., description="The name of the user")
    email: EmailStr = Field(..., description="The email address of the user")

    city: str = Field(..., description="The city where the user resides")
    @field_validator('city')
    @classmethod
    def validate_city(cls, value):
        if value not in citys:
            raise ValueError("City must be from India")
        return value

    salary: float = Field(..., description="The salary of the user")
    @field_validator('salary')
    @classmethod
    def validate_salary(cls, value):
        if value <= 0:
            raise ValueError("Salary must be a positive number")
        if value < 5000:
            raise ValueError("Salary must be at least 5000")
        return value