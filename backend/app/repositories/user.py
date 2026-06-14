from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

import os
import bcrypt
from dotenv import load_dotenv
from typing import Dict

from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt

from app.schemes.user import UserBase
from app.models.user import User

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 1

async def create_user(db: AsyncSession, user: UserBase) -> User:
    hash_password =bcrypt.hashpw(user.password_hash.encode('utf-8'), bcrypt.gensalt())
    new_user = User(login=user.login, email=user.email, password_hash=hash_password.decode('utf-8'))
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user
async def find_user_by_email(db: AsyncSession, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    result = await db.execute(statement)
    return result.scalars().first()

async def login_user(db: AsyncSession, user: UserBase) -> bool:
    user.password_hash = bcrypt.hashpw(user.password_hash.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    find_user = await find_user_by_email(db, user.email)
    if not find_user:
        return False
    if (bcrypt.checkpw(user.password_hash.encode('utf-8'), find_user.password_hash.encode('utf-8'))
            and find_user.login != user.login):
        return False
    return True




async def create_user_token(user: UserBase) -> str:
    data_user = {
        "user_id": user.user_id,
        "login": user.login,
        "password_hash": user.password_hash,
        "email": user.email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    }
    user_token = jwt.encode(data_user, SECRET_KEY, algorithm=ALGORITHM)
    return user_token

async def find_user_token(token: str) -> Dict:
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        return decoded
    except jwt.JWTError:
        raise {"status": "error"}

