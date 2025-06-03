from fastapi import APIRouter
from app.db import prisma_client

router = APIRouter()

@router.get("")
async def read_favorites():
    favorites = await prisma_client.favorite.find_many()
    return favorites
