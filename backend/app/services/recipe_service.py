# backend/app/services/recipe_service.py

from app.db import prisma_client

async def get_all_recipes():
    recipes = await prisma_client.recipe.find_many()
    return recipes
