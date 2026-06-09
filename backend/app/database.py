from sqlalchemy.orm import declarative_base
from sqlalchemy import create_engine

from config import settings

create_engine = create_engine(url=settings.get_database_url(), echo=True)

Base = declarative_base()