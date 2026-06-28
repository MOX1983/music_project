from fastapi import FastAPI, Depends, HTTPException
from app.database import async_session_factory
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.schemes import UserBase
from app.repositories import (create_user as create_user_repo, find_user_by_email, login_user as login_user_repo,
                              create_user_token, get_current_user, oauth2_scheme)

from app.repositories import get_user_tracks, get_user_one_track, get_one_track, get_all_tracks

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/mp3", StaticFiles(directory="mp3"), name="mp3")
app.mount("/img", StaticFiles(directory="img"), name="img")


async def get_session():
    async with async_session_factory() as session:
        yield session

@app.get("/")
async def read_root():
    return {"message": "Welcome to FastAPI!"}

@app.post("/sign-up")
async def create_user(user: UserBase, db: AsyncSession = Depends(get_session)):
    find_user = await find_user_by_email(db, user.email)
    if find_user:
        raise HTTPException(status_code=400, detail="User found")
    new_user = await create_user_repo(db, user)
    token = await create_user_token(new_user)
    return {"body": new_user,
            "token": token}


@app.post("/login")
async def login_user(user: UserBase, db: AsyncSession = Depends(get_session)):
    find_user = await login_user_repo(db, user)
    if find_user is None:
        raise HTTPException(status_code=400, detail="User not found")
    access_token = await create_user_token(find_user)
    return {
        "access_token": access_token
    }

@app.get("/me")
async def get_me(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_session)):
    current_user = await get_current_user(token, db)
    return {
        "user_id": current_user.user_id,
        "login": current_user.login,
        "email": current_user.email,
        "photo": current_user.photo
    }


@app.get("/me/tracks")
async def get_me_tracks(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_session)):
    current_user = await get_current_user(token, db)
    result = await get_user_tracks(db, current_user)
    return {"user": current_user.user_id, "tracks": [
        {
            "id": track.track_id,
            "title": track.title,
            "author": track.author,
            "path_file": f"/mp3/{track.path_file}",
            "picture": track.picture
        }
        for track in result
    ]}

# зачем я его сделала ?
@app.get("/me/track")
async def get_me_tracks(title: str, token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_session)):
    current_user = await get_current_user(token, db)
    track = await get_user_one_track(db, current_user, title)
    return {"user": current_user.user_id, "track": {
            "id": track.track_id,
            "title": track.title,
            "author": track.author,
            "path_file": f"/mp3/{track.path_file}",
            "picture": track.picture
        }}

@app.get("/tracks")
async def get_tracks(db: AsyncSession = Depends(get_session)):
    result = await get_all_tracks(db)
    return [
        {
            "id": track.track_id,
            "title": track.title,
            "author": track.author,
            "path_file": f"/mp3/{track.path_file}",
            "picture": track.picture
        }
        for track in result
    ]

@app.get("/track")
async def get_me_tracks(title: str, db: AsyncSession = Depends(get_session)):
    track = await get_one_track(db, title)
    return {
            "id": track.track_id,
            "title": track.title,
            "author": track.author,
            "path_file": f"/mp3/{track.path_file}",
            "picture": track.picture
        }