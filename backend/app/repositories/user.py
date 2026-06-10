from sqlalchemy.ext.asyncio import AsyncSession
import bcrypt

from app.schemes.user import UserBase
from app.models.user import User


async def create_user(db: AsyncSession, user: UserBase):
    hash_password =bcrypt.hashpw(user.password_hash.encode('utf-8'), bcrypt.gensalt())
    new_user = User(login=user.login, email=user.email, password_hash=hash_password.decode('utf-8'))
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user