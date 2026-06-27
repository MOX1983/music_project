from pydantic import BaseModel, Field, ConfigDict, EmailStr

class TrackBase(BaseModel):
    title: str = Field(max_length=255, alias="title")
    author: str = Field(max_length=255, alias="author")
    path_file: str = Field(max_length=255, alias="path_file")


class TrackResponse(TrackBase):
    track_id: int

    model_config = ConfigDict(from_attributes=True)