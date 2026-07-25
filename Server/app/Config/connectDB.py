from app.Config.config import setting
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

password = setting.DATABASE_PASSWORD
url = f"postgresql://postgres:{password}@localhost:5432/spentsmart"

engine = create_engine(url)

sessionLocal = sessionmaker(
    autoflush=False,
    autocommit=False,
    bind=engine
)

base = declarative_base()

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()