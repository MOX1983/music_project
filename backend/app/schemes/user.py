from pydantic import BaseModel, Field, ConfigDict, EmailStr

class UserBase(BaseModel):
    login: str = Field(min_length=1, max_length=50, alias="login")
    password_hash: str = Field(min_length=8, max_length=255, alias="password_hash")
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)


class UserResponse(UserBase):
    user_id: int

    model_config = ConfigDict(from_attributes=True)


class UserAll(UserResponse):
    photo: str
    model_config = ConfigDict(from_attributes=True)