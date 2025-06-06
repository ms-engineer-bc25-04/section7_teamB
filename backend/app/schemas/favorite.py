# backend/app/schemas/favorite.py

from pydantic import BaseModel, Field

class FavoriteCreate(BaseModel):
    title: str = Field(..., max_length=50)
    content: str = Field(..., max_length=1000)