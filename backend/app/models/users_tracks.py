from app.database import Base
from sqlalchemy import Column, Integer, ForeignKey, Table

users_tracks = Table(
    'users_tracks',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.user_id'), primary_key=True),
    Column('track_id', Integer, ForeignKey('tracks.track_id'), primary_key=True)
)