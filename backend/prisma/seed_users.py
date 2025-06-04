import asyncio
from prisma import Prisma
from prisma.types import UserCreateInput

USERS = [
    UserCreateInput(
        uid="GZahYKu5DIMSamu1C6pgbzYPU6E2",
        email="pandorobo1412@gmail.com",
        name="kotone",
    ),
    # {
    #     "uid": "firebase_uid_2",
    #     "email": "kotone@test.com",
    #     "name": "takae",
    # },
    # {
    #     "uid": "firebase_uid_3",
    #     "email": "alice@example.com",
    #     "name": "noriko",
    # },
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
