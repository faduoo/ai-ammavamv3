import os

from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from dotenv import load_dotenv
from sarvamai import SarvamAI

from ammavan import ask_ammavan


# -----------------------------------------
# LOAD ENVIRONMENT
# -----------------------------------------

load_dotenv()


# -----------------------------------------
# FLASK
# -----------------------------------------

app = Flask(__name__)

CORS(app)


# -----------------------------------------
# SARVAM AI
# -----------------------------------------

sarvam_api_key = os.getenv("SARVAM_API_KEY")

if not sarvam_api_key:
    print("WARNING: SARVAM_API_KEY not found")

sarvam = SarvamAI(
    api_subscription_key=sarvam_api_key
)


# -----------------------------------------
# HOME
# -----------------------------------------

@app.route("/")
def home():

    return jsonify({
        "status": "online",
        "message": "AI Ammavan is ready 😐"
    })


# -----------------------------------------
# CHAT
# -----------------------------------------

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json()

        if not data:

            return jsonify({
                "error": "Data onnum kittiyilla 😐"
            }), 400


        message = data.get(
            "message",
            ""
        ).strip()


        if not message:

            return jsonify({
                "error": "Enthada? Onnum parayanille? 😐"
            }), 400


        print("")
        print("--------------------------------")
        print("USER:")
        print(message)


        # ONE GEMINI CALL
        result = ask_ammavan(message)


        display_reply = result["display"]

        voice_reply = result["voice"]


        print("")
        print("DISPLAY:")
        print(display_reply)

        print("")
        print("VOICE TEXT:")
        print(voice_reply)

        print("--------------------------------")
        print("")


        # SEND BOTH VERSIONS
        return jsonify({

            "reply": display_reply,

            "voice_text": voice_reply

        })


    except Exception as e:

        print("CHAT ERROR:", e)

        return jsonify({
            "error":
            "Ammavan ippo busy aanu... pinne vilikk 😐"
        }), 500


# -----------------------------------------
# SPEAK
# -----------------------------------------

@app.route("/speak", methods=["POST"])
def speak():

    try:

        data = request.get_json()

        if not data:

            return jsonify({
                "error": "Voice data kittiyilla 😐"
            }), 400


        text = data.get(
            "text",
            ""
        ).strip()


        if not text:

            return jsonify({
                "error":
                "Enthada? Parayan onnum ille?"
            }), 400


        print("Generating voice...")

        print("TTS:", text)


        audio_chunks = []


        for chunk in sarvam.text_to_speech.convert_stream(

            text=text,

            language_code="ml-IN",

            speaker="mani",

            model="bulbul:v3",

            output_audio_codec="mp3",

            pace=0.95

        ):

            audio_chunks.append(chunk)


        audio = b"".join(audio_chunks)


        print("Voice ready 🔊")


        return Response(

            audio,

            mimetype="audio/mpeg",

            headers={
                "Cache-Control": "no-cache"
            }

        )


    except Exception as e:

        print("VOICE ERROR:", e)

        return jsonify({
            "error":
            "Ammavan samsarikkaan pattunnilla 😐"
        }), 500


# -----------------------------------------
# RUN SERVER
# -----------------------------------------

if __name__ == "__main__":

    print("")
    print("======================================")
    print("        AI AMMAVAN 😐")
    print("======================================")
    print("http://127.0.0.1:5000")
    print("======================================")
    print("")

    app.run(

        host="127.0.0.1",

        port=5000,

        debug=True,

        threaded=True

    )