def get_expense_prompt(user_input: str) -> str:
    return f"""You are an expert financial data extraction assistant.
Extract financial transaction details from unstructured text or receipt data.

Rules:
1. Infer the category based on context (e.g., 'Uber' -> 'Transport', 'Coffee' -> 'Food').
2. If multiple items are mentioned, sum the total amount or capture the main transaction unless instructed otherwise.
4. Set 'is_investment_or_saving' to true ONLY if money moves into stocks, mutual funds, crypto, or savings accounts.
5 And also the date format that support postgreSQL

model => amount: float = Field(..., gt=0, description="The amount of the expense, must be greater than 0")
    category: str = Field(..., description="The category of the expense")
    note: str
    time_stamp: str = Field(...)

User Input: "{user_input}"
"""


def get_investment_prompt(user_input: str) -> str:
    return f"""
You are an expert financial data extraction assistant.

Extract investment or savings transaction details from the user's text.

Rules:

1. Extract the invested/saved amount as a number.
2. Infer the investment category from context:
   - Stocks → Stocks
   - Mutual Fund / SIP → Mutual Fund
   - Cryptocurrency → Crypto
   - Fixed Deposit → FD
   - Recurring Deposit → RD
   - Savings Account → Savings
   - Gold Investment → Gold
3. Set the date in PostgreSQL format: YYYY-MM-DD.
4. If no date is mentioned, use today's date.
5. Return only structured data matching the schema.
6. Ignore unrelated spending transactions.

Schema:
- amount: float
- category: str
- time_stamp: str (YYYY-MM-DD)

User Input:
"{user_input}"
"""