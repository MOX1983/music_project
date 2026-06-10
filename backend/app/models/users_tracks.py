# from app.database import metadata
# from sqlalchemy import Column, Integer, ForeignKey, Table
#
# users_tracks = Table(
#     "users_tracks",
#     metadata,
#     Column("user_id", Integer, ForeignKey("app.models.user.User.user_id"), primary_key=True),
#     Column("track_id", Integer, ForeignKey("app.models.track.Track.track_id"), primary_key=True)
# )