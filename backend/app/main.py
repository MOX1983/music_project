from fastapi import FastAPI, Depends, HTTPException
from app.database import async_session_factory
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemes.user import UserBase
from app.repositories import (create_user as create_user_repo, find_user_by_email, login_user as login_user_repo,
                              create_user_token, find_user_token)

app = FastAPI()

async def get_session():
    async with async_session_factory() as session:
        yield session

@app.get("/")
async def read_root():
    return {"message": "Welcome to FastAPI!"}

@app.post("/sign-up")
async def create_user(user: UserBase, db: AsyncSession = Depends(get_session)):
    find_user = await find_user_by_email(db, user.email)
    if find_user:
        raise HTTPException(status_code=400, detail="User found")
    new_user = await create_user_repo(db, user)
    token = await create_user_token(new_user)
    return {"body": new_user,
            "token": token}


@app.post("/login")
async def login_user(user: UserBase, db: AsyncSession = Depends(get_session)):
    find_user = await login_user_repo(db, user)
    if not find_user:
        raise HTTPException(status_code=400, detail="User not found")
    # create token? find ? Idk
    return user

#?
@app.get("/verification_token")
async def verification_token(token: str):
    result = await find_user_token(token)
    return result