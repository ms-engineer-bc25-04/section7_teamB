from fastapi import FastAPI

app = FastAPI(title="仮Recipe App API", version="0.1.0")


@app.get("/")
async def root():
    return {"message": "仮のFastAPIサーバーが起動しました！"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
