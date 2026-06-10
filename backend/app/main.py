from fastapi import FastAPI, Depends
from app.database import async_session_factory
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemes.user import UserBase
from app.repositories.user import create_user as create_user_repo

app = FastAPI()

async def get_session():
    async with async_session_factory() as session:
        yield session

@app.get("/")
async def read_root():
    return {"message": "Welcome to FastAPI!"}

@app.post("/create_user")
async def create_user(user: UserBase, db: AsyncSession = Depends(get_session)):
    new_user = await create_user_repo(db, user)
    return new_user