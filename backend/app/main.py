from fastapi import FastAPI, Depends, HTTPException
from app.database import async_session_factory
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemes import UserBase
from app.repositories import (create_user as create_user_repo, find_user_by_email, login_user as login_user_repo,
                              create_user_token, get_current_user, oauth2_scheme)
from app.models import User
from app.repositories import get_user_tracks, get_user_one_track

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
    if find_user is None:
        raise HTTPException(status_code=400, detail="User not found")
    access_token = await create_user_token(find_user)
    return {
        "access_token": access_token
    }

@app.get("/me")
async def get_me(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_session)):
    current_user = await get_current_user(token, db)
    return {
        "user_id": current_user.user_id,
        "login": current_user.login,
        "email": current_user.email
    }


@app.get("/me/tracks")
async def get_tracks(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_session)):
    current_user = await get_current_user(token, db)
    result = await get_user_tracks(db, current_user)
    return {"user": current_user.user_id, "tracks": result}