import app.models.users_tracks
from app.database import Base

# from app.models.users_tracks import users_tracks

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class Track(Base):
    __tablename__ = 'tracks'

    track_id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    path_file = Column(String, nullable=False)

    # users = relationship("User", secondary='app.models.users_tracks.users_tracks', back_populates="tracks")

