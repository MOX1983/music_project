import os
from dotenv import load_dotenv

load_dotenv()

class Config():
    USER = os.getenv("DBUSER")
    PASSWORD = os.getenv("PASSWORD")
    HOST = os.getenv("HOST")
    PORT = os.getenv("PORT")
    DBNAME = os.getenv("DBNAME")

    def get_database_url(self):
        return f"postgresql+asyncpg://{self.USER}:{self.PASSWORD}@{self.HOST}:{self.PORT}/{self.DBNAME}"

settings = Config()