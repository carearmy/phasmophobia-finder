const State = {
    UNKNOWN: 1,
    YES: 2,
    NO: 3
}

class Evidence {
    constructor(name) {
        this.name = name;
        this.state = State.UNKNOWN;
    }
}

class Ghost {
    constructor(name, evidences, desc) {
        this.name = name;
        this.evidences = evidences;
        this.desc = desc;
    }
}

const evidences = {
    emf_level_5: new Evidence("EMF Level 5"),
    fingerprints: new Evidence("Fingerprints"),
    freezing: new Evidence("Freezing Temperatures"),
    ghost_orb: new Evidence("Ghost Orb"),
    ghost_writing: new Evidence("Ghost Writing"),
    spirit_box: new Evidence("Spirit Box"),
};


const ghosts = {
    banshee: new Ghost(
        "Banshee",
        [
            evidences.emf_level_5,
            evidences.fingerprints,
            evidences.freezing
        ],
        "Lorem ipsum"
    ),
    demon: new Ghost(
        "Demon",
        [
            evidences.freezing,
            evidences.ghost_writing,
            evidences.spirit_box
        ],
        "Lorem ipsum"
    ),
    
    hantu: new Ghost(
        "Hantu",
        [
            evidences.fingerprints,
            evidences.ghost_orb,
            evidences.ghost_writing
        ],
        "Lorem ipsum"
    ),

    jinn: new Ghost(
        "Jinn",
        [
            evidences.emf_level_5,
            evidences.ghost_orb,
            evidences.spirit_box
        ],
        "Lorem ipsum"
    ),

    mare: new Ghost(
        "Mare",
        [
            evidences.freezing,
            evidences.ghost_orb,
            evidences.spirit_box
        ],
        "Lorem ipsum"
    ),

    oni: new Ghost(
        "Oni",
        [
            evidences.emf_level_5,
            evidences.ghost_writing,
            evidences.spirit_box
        ],
        "Lorem ipsum"
    ),

    phantom: new Ghost(
        "Phantom",
        [
            evidences.emf_level_5,
            evidences.freezing,
            evidences.ghost_orb
        ],
        "Lorem ipsum"
    ),

    poltergeist: new Ghost(
        "Poltergeist",
        [
            evidences.fingerprints,
            evidences.ghost_orb,
            evidences.spirit_box
        ],
        "Lorem ipsum"
    ),

    revenant: new Ghost(
        "Revenant",
        [
            evidences.emf_level_5,
            evidences.fingerprints,
            evidences.ghost_writing
        ],
        "Lorem ipsum"
    ),

    shade: new Ghost(
        "Shade",
        [
            evidences.emf_level_5,
            evidences.ghost_orb,
            evidences.ghost_writing
        ],
        "Lorem ipsum"
    ),

    spirit: new Ghost(
        "Spirit",
        [
            evidences.fingerprints,
            evidences.ghost_writing,
            evidences.spirit_box
        ],
        "Lorem ipsum"
    ),

    wraith: new Ghost(
        "Wraith",
        [
            evidences.fingerprints,
            evidences.freezing,
            evidences.spirit_box
        ],
        "Lorem ipsum"
    ),

    yokai: new Ghost(
        "Yokai",
        [
            evidences.ghost_orb,
            evidences.ghost_writing,
            evidences.spirit_box
        ],
        "Lorem ipsum"
    ),
    
    yurei: new Ghost(
        "Yurei",
        [
            evidences.freezing,
            evidences.ghost_orb,
            evidences.ghost_writing
        ],
        "Lorem ipsum"
    )
};

function evidenceLoop(eCurr) {
    let row = $("#evidence")
        .$div({"class": "row align-items-center mb-2"})
        .$div({"class": "col text-center"});

    for (let e = 1; e <= 3 && eCurr.max > eCurr.curr; e++) {
        const key = Object.keys(evidences)[eCurr.curr];

        let button = row.$button(evidences[key].name + " ", {"class": "btn btn-dark mr-2", "id": key, type: "button"});
        button.click(toggleEvidence);

        eCurr.curr++;
    }
}

function ghostInfo() {


    // don't let default click handler do anything
    return false;
}

function selectGhosts() {
    Object.keys(ghosts).forEach(function(key) {
        let ghost = ghosts[key];

        let match = !(Object.values(evidences).some(function (evidence) {
            if (ghost.evidences.includes(evidence)) {
                return evidence.state === State.NO;
            } else {
                return evidence.state === State.YES;
            }
        }));

        $("#" + key).css("opacity", ((match) ? '1.0' : '0.4'));

        console.log(ghost.name + " = " + match);
    });
}

function toggleEvidence() {
    let button = $(this)[0];
    let evidence = evidences[button.id];

    switch (evidence.state) {
        case State.UNKNOWN:
            evidence.state = State.YES;

            $(this).toggleClass("btn-success", true);
            $(this).toggleClass("btn-dark", false);
            $(this).toggleClass("btn-danger", false);
            break;

        case State.YES:
            evidence.state = State.NO;

            $(this).toggleClass("btn-success", false);
            $(this).toggleClass("btn-dark", false);
            $(this).toggleClass("btn-danger", true);
            break;

        case State.NO:
            evidence.state = State.UNKNOWN;

            $(this).toggleClass("btn-success", false);
            $(this).toggleClass("btn-dark", true);
            $(this).toggleClass("btn-danger", false);
            break;
    }

    selectGhosts();
}

function ghostLoop(gCurr) {
    let row = $("#ghosts")
        .$div({"class": "row align-items-center mb-3"})
        .$div({"class": "col text-center"})
        .$div({"class": "card-deck"});

    for (let g = 1; g <= 3 && gCurr.max > gCurr.curr; g++) {
        const key = Object.keys(ghosts)[gCurr.curr];
        const ghost = ghosts[key];

        let body = row.$div({"class": "card", "id": key})
            .$div({"class": "card-body"});

        let title = body.$h5(ghost.name, {"class": "card-title"});
        title.$a("?", {"class": "badge badge-info ml-2", "href": "#"}).click(ghostInfo);

        //body.$p(ghost.desc, {"class": "card-text"});

        let evidences = body.$div_({"class": "card-text"});

        for (let i = 0; i < ghost.evidences.length; i++) {
            let e = ghost.evidences[i];
            evidences.$span(e.name, {"class": "badge badge-secondary mr-2"});
        }

        gCurr.curr++;
    }
}

function addEvidenceButtons() {
    let amount = Object.keys(evidences).length;
    let eCurr = {curr: 0, max: amount}
    const rows = Math.floor(amount / 3);
    const leftover = amount % 3;

    for (let r = 0; r < rows; r++) {
        evidenceLoop(eCurr);
    }

    if (leftover > 0) {
        evidenceLoop(eCurr);
    }

    // For spacing before ghosts
    $("#evidence").$div({"class": "row mb-5"});
}

function addGhostCards() {
    let amount = Object.keys(ghosts).length;
    let gCurr = {curr: 0, max: amount}
    const rows = Math.floor(amount / 3);
    const leftover = amount % 3;

    for (let r = 0; r < rows; r++) {
        ghostLoop(gCurr);
    }

    if (leftover > 0) {
        ghostLoop(gCurr);
    }
}

$.createHtml("configure", {installParentFunctions: true});

addEvidenceButtons();
addGhostCards();
