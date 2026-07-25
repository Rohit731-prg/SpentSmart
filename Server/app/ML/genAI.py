from app.Config.config import setting
from google import genai
from google.genai import types
from app.Utils.ML_prompt import get_expense_prompt, get_investment_prompt
from app.Model.ExpenseModel import ExpenseModel
from app.Model.InvestmentModel import InvestmentModel
from fastapi import HTTPException

key = setting.GEMINI_API_KEY

client = genai.Client(api_key=key)

def get_expense_details_genAI(user_input: str):
    prompt = get_expense_prompt(user_input)
    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=f"Extract expense details from this input: {prompt}",
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=ExpenseModel, # Forces Gemini to return your custom schema
                temperature=0.1,
            )
        )
        # print(response.text)
    
        # (Optional) Validate directly into Pydantic model
        parsed_data = ExpenseModel.model_validate_json(response.text) # type: ignore
        return parsed_data
    except HTTPException as e:
        raise
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))


async def get_investment_details_genAI(user_input: str):
    prompt = get_investment_prompt(user_input)
    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=f"Extract expense details from this input: {prompt}",
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema= InvestmentModel,
                temperature=0.1
            )
        )
        print(response.text)
        parsed_data = InvestmentModel.model_validate_json(response.text) # type: ignore
        return parsed_data
    except HTTPException as e:
        raise
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))
