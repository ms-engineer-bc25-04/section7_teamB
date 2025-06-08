import asyncio
from prisma import Prisma
from prisma.types import UserCreateInput

USERS = [
    UserCreateInput(
        uid="xxxxxxxxxx",
        email="xxxxx@xxxxx",
        name="xxxxx",
    ),
]


async def main():
    db = Prisma()
    await db.connect()
    for user in USERS:
        # uidが重複しないようにチェック
        exists = await db.user.find_unique(where={"uid": user["uid"]})
        if not exists:
            await db.user.create(data=user)
    await db.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
