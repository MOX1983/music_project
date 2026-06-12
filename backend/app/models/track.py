from app.database import Base

from app.models.users_tracks import users_tracks

from sqlalchemy import Column, Integer, String, Time
from sqlalchemy.orm import relationship

class Track(Base):
    __tablename__ = 'tracks'

    track_id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    path_file = Column(String, nullable=False)
    duration = Column(Time, nullable=False)
    category = Column(String)
    picture = Column(String)

    users = relationship("User", secondary=users_tracks, back_populates="tracks")

