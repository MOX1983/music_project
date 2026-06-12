from sqlalchemy.orm import declarative_base
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.config import settings


engine = create_async_engine(url=settings.get_database_url(), echo=True)

async_session_factory = async_sessionmaker(engine, class_=AsyncSession)

Base = declarative_base()


# async def setup_database():
#     async with engine.begin() as connection:
#         await connection.run_sync(Base.metadata.create_all)