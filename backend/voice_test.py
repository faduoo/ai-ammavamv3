import os
from dotenv import load_dotenv
from sarvamai import SarvamAI
from sarvamai.play import save

load_dotenv()

api_key = os.getenv("SARVAM_API_KEY")

if not api_key:
    print("SARVAM_API_KEY missing!")
    exit()

client = SarvamAI(
    api_subscription_key=api_key
)

CLONED_VOICE_ID = "svc-5d3a661e-b38f-4e0f-b488-a3cf685bffa5"

print("Testing cloned Ammavan voice...")

try:
    audio = client.text_to_speech.convert(
        text="എന്താടാ? എന്താ പരിപാടി? Good ആണ്... പക്ഷേ എന്തെങ്കിലും പ്രശ്നം ഉണ്ടാവും.",
        model="bulbul:v3",
        language_code="ml-IN",
        speaker=CLONED_VOICE_ID
    )

    save(audio, "ammavan_test.wav")

    print("SUCCESS!")
    print("Created: ammavan_test.wav")

except Exception as e:
    print("ERROR:")
    print(e)