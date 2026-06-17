from app.database import Base
from sqlalchemy import Column, Integer, ForeignKey

class users_tracks(Base):
    __tablename__ = 'tracks'

    user_id = Column(Integer, ForeignKey('users.user_id'), primary_key=True)
    track_id = Column(Integer, ForeignKey('tracks.track_id'), primary_key=True)