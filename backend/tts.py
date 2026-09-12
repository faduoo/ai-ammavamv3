import edge_tts
import asyncio

VOICE = "ml-IN-MidhunNeural"

async def generate_audio(text):
    communicate = edge_tts.Communicate(
        text,
        VOICE,
        rate="-10%",
        pitch="-12Hz"
    )

    audio = b""

    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio += chunk["data"]

    return audio


def text_to_speech(text):
    return asyncio.run(generate_audio(text))