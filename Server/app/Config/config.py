from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """

    # Database settings
    DATABASE_PASSWORD: str = ""

    # Security settings
    SECRET_KEY: str = "your-secret-key"
    ALGORITHM: str = "HS256"
    GEMINI_API_KEY: str = "your-gemini-key"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


setting = Settings()