// COUNTDOWN //

const weddingDate =
    new Date(
        "2027-09-27T19:00:00+03:00"
    ).getTime();


function updateCountdown() {
    const difference =
        weddingDate - Date.now();

    if (difference <= 0) {
        document.getElementById(
            "days"
        ).textContent = "00";

        document.getElementById(
            "hours"
        ).textContent = "00";

        document.getElementById(
            "minutes"
        ).textContent = "00";

        document.getElementById(
            "seconds"
        ).textContent = "00";

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (
                difference /
                (1000 * 60 * 60)
            ) % 24
        );


    const minutes =
        Math.floor(
            (
                difference /
                (1000 * 60)
            ) % 60
        );


    const seconds =
        Math.floor(
            (
                difference /
                1000
            ) % 60
        );


    document.getElementById(
        "days"
    ).textContent =
        String(days).padStart(
            2,
            "0"
        );


    document.getElementById(
        "hours"
    ).textContent =
        String(hours).padStart(
            2,
            "0"
        );


    document.getElementById(
        "minutes"
    ).textContent =
        String(minutes).padStart(
            2,
            "0"
        );


    document.getElementById(
        "seconds"
    ).textContent =
        String(seconds).padStart(
            2,
            "0"
        );

}

updateCountdown();

setInterval(
    updateCountdown,
    1000
);


// RSVP ELEMENTS //

const choices =
    document.querySelectorAll(
        ".choice"
    );

const choicesContainer =
    document.getElementById(
        "choices"
    );

const form =
    document.getElementById(
        "rsvpForm"
    );

const guestsField =
    document.getElementById(
        "guestsField"
    );

const guestsSelect =
    document.getElementById(
        "guests"
    );

const feedback =
    document.getElementById(
        "feedback"
    );

const backButton =
    document.getElementById(
        "backButton"
    );

let selectedStatus = "";


// YES / NO / MAYBE //

choices.forEach(
    (choice) => {

        choice.addEventListener(
            "click",
            () => {

                selectedStatus =
                    choice.dataset.answer;

                form.reset();

                choicesContainer
                    .classList
                    .add("hidden");

                feedback
                    .classList
                    .add("hidden");

                form
                    .classList
                    .remove("hidden");


                if (
                    selectedStatus === "yes"
                ) {

                    guestsField
                        .classList
                        .remove("hidden");

                    guestsSelect.required =
                        true;

                }
                else {

                    guestsField
                        .classList
                        .add("hidden");

                    guestsSelect.required =
                        false;

                }


                document
                    .getElementById("name")
                    .focus();


                form.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "center"

                });

            }
        );

    }
);


// RSVP DEMO SUBMIT //

form.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const submitButton =
            form.querySelector(
                ".submit-btn"
            );

        const name =
            document
                .getElementById(
                    "name"
                )
                .value
                .trim();

        const guests =
            selectedStatus === "yes"
                ? Number(
                    guestsSelect.value
                )
                : 0;


        // VALIDATION //

        if (!name) {

            alert(
                "Please enter your name."
            );

            return;
        }


        if (
            selectedStatus === "yes" &&
            !guests
        ) {

            alert(
                "Please select the number of guests."
            );

            return;
        }


        submitButton.disabled =
            true;

        submitButton.textContent =
            "SUBMITTING...";


        // DEMO SUCCESS //

        setTimeout(
            () => {

                submitButton.disabled =
                    false;

                submitButton.innerHTML =
                    `
                    SUBMIT RSVP
                    <span>↗</span>
                    `;

                form.reset();

                form
                    .classList
                    .add("hidden");

                choicesContainer
                    .classList
                    .remove("hidden");

                showFeedback(
                    selectedStatus
                );

            },
            500
        );

    }
);


// BACK BUTTON //

backButton.addEventListener(
    "click",
    () => {

        form.reset();

        form
            .classList
            .add("hidden");

        choicesContainer
            .classList
            .remove("hidden");

        feedback
            .classList
            .add("hidden");

    }
);


// FEEDBACK //

function showFeedback(
    status
) {

    const messages = {

        yes: {

            title:
                "Thank you! 🤍",

            text:
                "Your RSVP has been received. " +
                "We cannot wait to celebrate with you!"

        },


        no: {

            title:
                "Thank you for letting us know.",

            text:
                "We are sorry you cannot make it. " +
                "You will be missed!"

        },


        maybe: {

            title:
                "No problem! ✦",

            text:
                "You can come back and let us know " +
                "by 31 August 2027."

        }

    };


    feedback.innerHTML = `

        <div class="icon">
            ✦
        </div>

        <h3>
            ${messages[status].title}
        </h3>

        <p>
            ${messages[status].text}
        </p>

    `;

    feedback
        .classList
        .remove("hidden");

    feedback.scrollIntoView({

        behavior:
            "smooth",

        block:
            "center"

    });

}