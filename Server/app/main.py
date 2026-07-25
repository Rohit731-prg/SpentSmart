from fastapi import FastAPI
from app.Route.UserRoute import route as user_route
from app.Route.ExpenseRoute import route as expense_route
from fastapi.middleware.cors import CORSMiddleware
from app.Config.connectDB import base, engine

app = FastAPI()

base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_route)
app.include_router(expense_route)