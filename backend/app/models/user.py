from ..database import Base

from sqlalchemy import Column, Integer, String

class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True)
    login = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    password_hash = Column(String, nullable=False)