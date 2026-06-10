from app.database import Base

# from app.models.users_tracks import users_tracks

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True)
    login = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    password_hash = Column(String, nullable=False)

    # tracks = relationship("Track", secondary='app.models.users_tracks.users_tracks', back_populates="users")