from ..database import Base

from sqlalchemy import Column, Integer, String

class Track(Base):
    __tablename__ = 'tracks'

    tracks_id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    path_file = Column(String, nullable=False)