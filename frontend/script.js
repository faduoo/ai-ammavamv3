// ======================================
// AI AMMAVAN — FRONTEND
// ======================================


// ======================================
// FUNNY LOADING SCREEN
// Runs ONLY when website opens
// ======================================

const loadingMessages = [
    "Initializing unnecessary advice...",
    "Checking your career...",
    "Checking your salary...",
    "Comparing you with the neighbour's son...",
    "Calculating your future...",
    "Finding something to criticize...",
    "Preparing unsolicited opinions...",
    "Calling imaginary relatives...",
    "Loading disappointment...",
    "Unfortunately, Ammavan is available."
];

const loadingStatus =
    document.getElementById("loadingStatus");

const progressBar =
    document.getElementById("progressBar");

const checks = [
    document.getElementById("check1"),
    document.getElementById("check2"),
    document.getElementById("check3"),
    document.getElementById("check4")
];

let progress = 0;
let messageIndex = 0;

const loadingInterval = setInterval(() => {

    progress += Math.floor(Math.random() * 12) + 5;

    if (progress > 100) {
        progress = 100;
    }

    if (progressBar) {
        progressBar.style.width = progress + "%";
    }

    if (loadingStatus) {
        loadingStatus.textContent =
            loadingMessages[
                Math.min(
                    messageIndex,
                    loadingMessages.length - 1
                )
            ];
    }

    if (
        messageIndex < checks.length &&
        checks[messageIndex]
    ) {
        checks[messageIndex].textContent =
            "✓ " +
            checks[messageIndex]
                .textContent
                .replace("⏳ ", "");
    }

    messageIndex++;

    if (progress >= 100) {

        clearInterval(loadingInterval);

        setTimeout(() => {

            const screen =
                document.getElementById("loadingScreen");

            if (!screen) return;

            screen.style.opacity = "0";
            screen.style.transition = "opacity .5s";

            setTimeout(() => {

                screen.style.display = "none";

            }, 500);

        }, 500);
    }

}, 350);


// ======================================
// CHAT ELEMENTS
// ======================================

const form =
    document.getElementById("chatForm");

const input =
    document.getElementById("messageInput");

const chat =
    document.getElementById("chat");

const thinking =
    document.getElementById("thinking");

const thinkingText =
    document.getElementById("thinkingText");


// ======================================
// STARTER QUESTIONS
// ======================================

function sendStarter(text) {

    input.value = text;

    sendMessage();

}


// ======================================
// SEND MESSAGE
// ======================================

if (form) {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        sendMessage();

    });

}


// ======================================
// MAIN AI FUNCTION
// ======================================

async function sendMessage() {

    const message =
        input.value.trim();

    if (!message) {
        return;
    }


    // -------------------------------
    // Show user's message
    // -------------------------------

    addMessage(message, "user");

    input.value = "";

    input.disabled = true;


    // -------------------------------
    // Show Ammavan thinking
    // -------------------------------

    showThinking();
    setAmmavanState("thinking");


    try {

        console.log("Sending message to AI:", message);


        const response =
            await fetch("https://ai-ammavamv3-2.onrender.com/chat", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })

            });


        console.log(
            "Server response:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "Server returned " +
                response.status
            );

        }


        const data =
            await response.json();


        console.log(
            "AI DATA:",
            data
        );


        hideThinking();
        setAmmavanState("speaking");


        // -------------------------------
        // Show Ammavan reply
        // -------------------------------

        if (data.reply) {

            addMessage(
                data.reply,
                "ammavan"
            );

        } else {

            addMessage(
                "Enthada? Reply thanne illa. Technology okke valiya sambhavam aanu ennalle parayunne 😐",
                "ammavan"
            );

        }


        // -------------------------------
        // Good... But™
        // -------------------------------

        showGoodBut();


        // -------------------------------
        // Voice
        // -------------------------------

        if (data.voice_text) {

            playAmmavanVoice(
                data.voice_text
            );

        }


    } catch (error) {

        console.error(
            "CHAT ERROR:",
            error
        );

        hideThinking();


        addMessage(
            "Enthada? Server thanne pani mudakki. Njan paranjille technology-ne adhikam depend cheyyaruthennu 😐",
            "ammavan"
        );

    }


    input.disabled = false;

    input.focus();

}


// ======================================
// ADD MESSAGE TO CHAT
// ======================================

function addMessage(text, sender) {

    // Remove welcome screen after first message
    const welcome =
        document.querySelector(".welcome-message");

    if (welcome) {
        welcome.remove();
    }


    const messageDiv =
        document.createElement("div");

    messageDiv.className =
        "message " + sender;


    const avatar =
        document.createElement("div");

    avatar.className =
        "message-avatar";

    avatar.textContent =
        sender === "user"
            ? "👤"
            : "😐";


    const bubble =
        document.createElement("div");

    bubble.className =
        "message-bubble";

    bubble.textContent =
        text;


    messageDiv.appendChild(avatar);

    messageDiv.appendChild(bubble);

    chat.appendChild(messageDiv);


    // Scroll to bottom
    chat.scrollTop =
        chat.scrollHeight;

}


// ======================================
// THINKING STATE
// ======================================

function showThinking() {

    if (!thinking) return;

    thinking.style.display = "flex";


    const avatar =
        document.getElementById("ammavanAvatar");

    const mood =
        document.getElementById("ammavanMood");

    const status =
        document.getElementById("ammavanStatus");


    if (avatar) {
        avatar.classList.remove("speaking");
        avatar.classList.add("thinking");
    }

    if (mood) {
        mood.textContent = "Thinking";
    }

    if (status) {
        status.textContent =
            "Finding something to criticize...";
    }


    const thinkingMessages = [

        "Finding something to criticize...",

        "Checking your career...",

        "Thinking about your salary...",

        "Comparing you with someone's son...",

        "Looking for a problem...",

        "Consulting imaginary relatives..."

    ];


    let index = 0;

    thinkingText.textContent =
        thinkingMessages[0];


    window.thinkingTimer =
        setInterval(() => {

            index++;

            if (
                index >=
                thinkingMessages.length
            ) {
                index = 0;
            }

            thinkingText.textContent =
                thinkingMessages[index];

            if (status) {
                status.textContent =
                    thinkingMessages[index];
            }

        }, 900);

}


// ======================================
// HIDE THINKING
// ======================================

function hideThinking() {

    if (thinking) {
        thinking.style.display = "none";
    }

    if (window.thinkingTimer) {
        clearInterval(window.thinkingTimer);
    }


    const avatar =
        document.getElementById("ammavanAvatar");

    const mood =
        document.getElementById("ammavanMood");

    const status =
        document.getElementById("ammavanStatus");


    if (avatar) {
        avatar.classList.remove("thinking");
        avatar.classList.add("speaking");
    }

    if (mood) {
        mood.textContent = "Judging";
    }

    if (status) {
        status.textContent =
            "Giving unsolicited advice...";
    }

}


// ======================================
// GOOD... BUT™
// ======================================

function showGoodBut() {

    const goodBut =
        document.getElementById("goodBut");

    if (!goodBut) return;


    goodBut.classList.add("show");


    setTimeout(() => {

        goodBut.classList.remove("show");

    }, 2200);

}


// ======================================
// AMMAVAN VOICE
// ======================================

async function playAmmavanVoice(text) {

    try {

        console.log(
            "Generating Ammavan voice..."
        );


        const response =
            await fetch(
                "https://ai-ammavamv3-2.onrender.com/speak",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        text: text
                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Voice server error: " +
                response.status
            );

        }


        const audioBlob =
            await response.blob();


        const audioUrl =
            URL.createObjectURL(
                audioBlob
            );


        const audio =
            new Audio(audioUrl);


        audio.play();


        audio.onended = () => {

            URL.revokeObjectURL(audioUrl);

            setAmmavanState("idle");

        };


    } catch (error) {

        console.error(
            "VOICE ERROR:",
            error
        );

    }

}
// ======================================
// AMMAVAN CHARACTER
// ======================================

const ammavanImage =
    document.getElementById("ammavanImage");

const ammavanStage =
    document.getElementById("ammavanStage");

const ammavanMood =
    document.getElementById("ammavanMood");

const ammavanStatus =
    document.getElementById("ammavanStatus");

const thoughtBubble =
    document.getElementById("thoughtBubble");

const speechDots =
    document.querySelector(".speech-dots");


function setAmmavanState(state) {

    if (!ammavanImage) return;


    // Remove previous states

    ammavanStage.classList.remove(
        "thinking",
        "speaking",
        "angry"
    );


    thoughtBubble.classList.remove("show");


    // THINKING

    if (state === "thinking") {

        ammavanImage.src =
            "assets/ammavan-confused.jpg";

        ammavanStage.classList.add(
            "thinking"
        );

        ammavanMood.textContent =
            "Thinking";

        ammavanStatus.textContent =
            "Finding something to criticize...";

        thoughtBubble.textContent =
            "Hmm...";

        thoughtBubble.classList.add(
            "show"
        );

    }


    // SPEAKING

    else if (state === "speaking") {

        ammavanImage.src =
            "assets/ammavan-lecture.jpg";

        ammavanStage.classList.add(
            "speaking"
        );

        ammavanMood.textContent =
            "Judging";

        ammavanStatus.textContent =
            "Giving unsolicited advice...";

        thoughtBubble.textContent =
            "Njan parayunnath ninte nallathinu vendiya.";

        thoughtBubble.classList.add(
            "show"
        );

        if (speechDots) {
        speechDots.classList.add("active");
        }
    }


    // IDLE

    else {

        ammavanImage.src =
            "assets/ammavan-thinking.jpg";

        ammavanMood.textContent =
            "Disappointed";

        ammavanStatus.textContent =
            "Waiting to judge...";

        if (speechDots) {
            speechDots.classList.remove("active");
        }

    }

}
// ======================================
// AMMAVAN IMAGE MODES
// ======================================

const ammavanModes = {

    angry: {
        image: "assets/ammavan-angry.jpg",
        mood: "😤 Angry",
        status: "Very disappointed."
    },

    happy: {
        image: "assets/ammavan-happy.jpg",
        mood: "😄 Happy",
        status: "Something seems suspicious..."
    },

    confused: {
        image: "assets/ammavan-confused.jpg",
        mood: "🤨 Confused",
        status: "Trying to understand..."
    },

    surprize: {
        image: "assets/ammavan-surprize.jpg",
        mood: "😳 Surprised",
        status: "Ithu njan expect cheythilla."
    },

    sleeping: {
        image: "assets/ammavan-sleeping.jpg",
        mood: "😴 Tired",
        status: "Njangalude kaalath..."
    },

    salary: {
        image: "assets/ammavan-salaraj.jpg",
        mood: "💰 Investigating",
        status: "Salary ethra?"
    },

    work: {
        image: "assets/ammavan-work.jpg",
        mood: "💼 Professional",
        status: "Career nokkunnu..."
    },

    mindout: {
        image: "assets/ammavan-mindout.jpg",
        mood: "🤦 Family Mode",
        status: "Njan paranjille?"
    },

    thinking: {
        image: "assets/ammavan-thinking.jpg",
        mood: "🤔 Thinking",
        status: "Finding something to criticize..."
    },

    lecture: {
        image: "assets/ammavan-lecture.jpg",
        mood: "☝️ Lecturing",
        status: "Njan parayunnath ninte nallathinu vendiya."
    },

    goodorbad: {
        image: "assets/ammavan-goodorbad.jpg",
        mood: "⚠️ Good... But",
        status: "There is a problem."
    },

    thanks: {
        image: "assets/ammavan-thanks.jpg",
        mood: "🙏 Concerned",
        status: "Okay... okay..."
    }
};


function changeAmmavan(mode) {

    const data =
        ammavanModes[mode];

    if (!data) return;


    const image =
        document.getElementById(
            "ammavanImage"
        );

    const mood =
        document.getElementById(
            "ammavanMood"
        );

    const status =
        document.getElementById(
            "ammavanStatus"
        );


    image.style.opacity = "0";


    setTimeout(() => {

        image.src =
            data.image;

        mood.textContent =
            data.mood;

        status.textContent =
            data.status;

        image.style.opacity = "1";

    }, 180);

}
// ======================================
// AMMAVAN PAGE NAVIGATION
// ======================================

const pageTransitions = {

    chat: {
        image: "assets/ammavan-happy.jpg",
        icon: "💬",
        title: "Calling Ammavan...",
        text: "Preparing unnecessary advice..."
    },

    modes: {
        image: "assets/ammavan-thinking.jpg",
        icon: "🎭",
        title: "Choosing Ammavan's personality...",
        text: "Checking how annoyed he should be..."
    },

    tracker: {
        image: "assets/ammavan-work.jpg",
        icon: "📊",
        title: "Counting your mistakes...",
        text: "Calculating unnecessary statistics..."
    },

    memory: {
        image: "assets/ammavan-confused.jpg",
        icon: "🧠",
        title: "Searching Ammavan's memory...",
        text: "Why does he remember this?"
    },

    tools: {
        image: "assets/ammavan-mindout.jpg",
        icon: "🛠",
        title: "Checking usefulness...",
        text: "Usefulness currently at 0.3%."
    },

    settings: {
        image: "assets/ammavan-lecture.jpg",
        icon: "⚙️",
        title: "Adjusting Ammavan...",
        text: "Warning: Ammavan cannot be adjusted."
    }

};
function openSection(section, button) {

    const transition =
        document.getElementById(
            "pageTransition"
        );

    const image =
        document.getElementById(
            "transitionImage"
        );

    const icon =
        document.getElementById(
            "transitionIcon"
        );

    const title =
        document.getElementById(
            "transitionTitle"
        );

    const text =
        document.getElementById(
            "transitionText"
        );


    const data =
        pageTransitions[section];


    if (!data) return;


    // Update sidebar

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });


    if (button) {

        button.classList.add(
            "active"
        );

    }


    // Update transition

    image.src =
        data.image;

    icon.textContent =
        data.icon;

    title.textContent =
        data.title;

    text.textContent =
        data.text;


    // Show transition

    transition.classList.add(
        "show"
    );


    // Open requested page

    setTimeout(() => {

        renderSection(section);

    }, 850);


    // Hide transition

    setTimeout(() => {

        transition.classList.remove(
            "show"
        );

    }, 1250);

}
// ======================================
// SECTION CONTENT
// ======================================

function renderSection(section) {

    const main =
        document.getElementById(
            "mainContent"
        );


    if (section === "chat") {

        location.reload();

        return;

    }


    if (section === "modes") {

        main.innerHTML = `

            <div class="useless-page modes-page">

                <div class="page-heading">

                    <span>🎭 AMMAVAN PERSONALITY LAB</span>

                    <h1>
                        Choose Your Ammavan
                    </h1>

                    <p>
                        Because apparently one Ammavan
                        wasn't enough.
                    </p>

                </div>


                <div class="big-mode-grid">

                    <button onclick="changeAmmavan('angry')">
                        <img src="assets/ammavan-angry.jpg">
                        <b>Angry Ammavan</b>
                        <small>0% patience</small>
                    </button>

                    <button onclick="changeAmmavan('lecture')">
                        <img src="assets/ammavan-lecture.jpg">
                        <b>Lecture Mode</b>
                        <small>45 minutes minimum</small>
                    </button>

                    <button onclick="changeAmmavan('salary')">
                        <img src="assets/ammavan-salaraj.jpg">
                        <b>Salary Inspector</b>
                        <small>Gross or net?</small>
                    </button>

                    <button onclick="changeAmmavan('mindout')">
                        <img src="assets/ammavan-mindout.jpg">
                        <b>Family Mode</b>
                        <small>Relatives activated</small>
                    </button>

                    <button onclick="changeAmmavan('sleeping')">
                        <img src="assets/ammavan-sleeping.jpg">
                        <b>Sunday Ammavan</b>
                        <small>Do not disturb</small>
                    </button>

                    <button onclick="changeAmmavan('confused')">
                        <img src="assets/ammavan-confused.jpg">
                        <b>Confused Ammavan</b>
                        <small>Even he doesn't know</small>
                    </button>

                </div>

            </div>

        `;

        return;

    }


    if (section === "tracker") {

        main.innerHTML = `

            <div class="useless-page tracker-page">

                <div class="page-heading">

                    <span>📊 AMMAVAN ANALYTICS</span>

                    <h1>
                        Advice Tracker
                    </h1>

                    <p>
                        Extremely important statistics
                        nobody requested.
                    </p>

                </div>


                <div class="analytics-grid">

                    <div class="analytics-card">

                        <strong>
                            347
                        </strong>

                        <span>
                            Unsolicited Advice
                        </span>

                    </div>


                    <div class="analytics-card">

                        <strong>
                            82
                        </strong>

                        <span>
                            Career Warnings
                        </span>

                    </div>


                    <div class="analytics-card">

                        <strong>
                            56
                        </strong>

                        <span>
                            Salary Questions
                        </span>

                    </div>


                    <div class="analytics-card">

                        <strong>
                            91%
                        </strong>

                        <span>
                            Negativity
                        </span>

                    </div>

                </div>


                <div class="useless-chart">

                    <h3>
                        AMMAVAN ADVICE ACTIVITY
                    </h3>

                    <div class="fake-bars">

                        <span style="height:35%"></span>
                        <span style="height:70%"></span>
                        <span style="height:45%"></span>
                        <span style="height:90%"></span>
                        <span style="height:60%"></span>
                        <span style="height:100%"></span>
                        <span style="height:80%"></span>

                    </div>

                    <p>
                        Somehow this information
                        will not improve your life.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    if (section === "memory") {

        main.innerHTML = `

            <div class="useless-page memory-page">

                <div class="page-heading">

                    <span>🧠 AMMAVAN MEMORY</span>

                    <h1>
                        What Ammavan Remembers
                    </h1>

                    <p>
                        Unfortunately, he remembers everything.
                    </p>

                </div>


                <div class="memory-list">

                    <div>
                        <b>3 minutes ago</b>
                        <p>
                            You said you want a job.
                            Ammavan is still concerned.
                        </p>
                    </div>

                    <div>
                        <b>Yesterday</b>
                        <p>
                            You bought something.
                            Ammavan suspects EMI.
                        </p>
                    </div>

                    <div>
                        <b>2019</b>
                        <p>
                            You got good marks.
                            Ammavan asks why not 100.
                        </p>
                    </div>

                    <div>
                        <b>Unknown date</b>
                        <p>
                            Someone else's son
                            apparently did better.
                        </p>
                    </div>

                </div>

            </div>

        `;

        return;

    }


    if (section === "tools") {

        main.innerHTML = `

            <div class="useless-page tools-page">

                <div class="page-heading">

                    <span>🛠 USELESS TECHNOLOGY</span>

                    <h1>
                        Ammavan Tools
                    </h1>

                    <p>
                        Tools that solve absolutely nothing.
                    </p>

                </div>


                <div class="tools-grid">

                    <button onclick="uselessTool('career')">

                        🎓

                        <b>
                            Career Panic Generator
                        </b>

                        <small>
                            Generate unnecessary career anxiety.
                        </small>

                    </button>


                    <button onclick="uselessTool('salary')">

                        💰

                        <b>
                            Salary Interrogator
                        </b>

                        <small>
                            Gross? Net? CTC?
                        </small>

                    </button>


                    <button onclick="uselessTool('marriage')">

                        💍

                        <b>
                            Marriage Countdown
                        </b>

                        <small>
                            Ammavan wants to know.
                        </small>

                    </button>


                    <button onclick="uselessTool('petrol')">

                        ⛽

                        <b>
                            Petrol Guilt Calculator
                        </b>

                        <small>
                            Calculate how much you wasted today.
                        </small>

                    </button>

                </div>

            </div>

        `;

        return;

    }


    if (section === "settings") {

        main.innerHTML = `

            <div class="useless-page settings-page">

                <div class="page-heading">

                    <span>⚙ AMMAVAN CONFIGURATION</span>

                    <h1>
                        Settings
                    </h1>

                    <p>
                        You can change some things.
                        Probably.
                    </p>

                </div>


                <div class="settings-list">

                    <label>

                        <span>
                            Negativity Level
                        </span>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value="91"
                        >

                    </label>


                    <label>

                        <span>
                            Unsolicited Advice
                        </span>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value="97"
                        >

                    </label>


                    <label>

                        <span>
                            "Njangalude Kaalath"
                        </span>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value="75"
                        >

                    </label>


                    <label>

                        <span>
                            Neighbour's Son Comparisons
                        </span>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value="62"
                        >

                    </label>


                    <div class="settings-warning">

                        ⚠️

                        Ammavan may ignore
                        these settings anyway.

                    </div>

                </div>

            </div>

        `;

    }

}
function uselessTool(type) {

    const messages = {

        career:
            "Career panic generated successfully. 😐",

        salary:
            "Salary detected. Ammavan immediately asks: Gross aano net?",

        marriage:
            "Marriage countdown activated. Ammavan has already informed relatives.",

        petrol:
            "Petrol wasted. Ammavan is disappointed."
    };


    alert(
        messages[type] ||
        "Something useless happened."
    );

}