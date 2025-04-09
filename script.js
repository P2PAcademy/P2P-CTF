const challenges = {
  web: {
    "web-1": {
      name: "Hardcoded Login",
      desc: "A basic login system hides more than it shows. Can you break in?",
      points: 100,
      hash: "70d4ee6d75f1fa014d1ba47a3e517439a73d632cae52113501be67e4ce4f6dde",
      link: "https://programercafe.github.io/web_challenge/Web1/Web1/index.html"
    },
    "web-2": {
      name: "Mastering Chains - 1",
      desc: "A portal which hides many things. Break it and move forward.",
      points: 100,
      hash: "b5c37266a6b99e7fcef095276597b960c08f351a5bd42437cafc9582141d39e2",
      link: "https://programercafe.github.io/web_challenge/web2/index.html"
    },
    "web-3": {
      name: "Mastering Chains - 2",
      desc: "Part 2 of Mastering Chains. Solve part 1 and move forward.",
      points: 150,
      hash: "655f5bde23363583b600a27f3693ebd4bdc4ce4a9abb6b0d4dacd47e138c8854",
      download: "https://programercafe.github.io/web_challenge/web2/challenge2.html"
    },
    "web-4": {
      name: "Mastering Chains - 3",
      desc: "Part 3 of Mastering Chains. Break into part 2 and move forward. Good luck!",
      points: 150,
      hash: "3a67ec19fdc94f697bb7de5a8ac9f8b6a9249eeb29e4bafac5b7a47995681231",
      download: "https://programercafe.github.io/web_challenge/web2/challenge3.html"
    },
    "web-5": {
      name: "Mastering Chains - 4",
      desc: `Part 4 of Mastering Chains. Satellite imagery intercepted from a compromised drone reveals nothing suspicious at first glance.
             But operatives believe there's more to the image than meets the eye. Hidden coordinates? Encrypted metadata? You must extract and analyze the image thoroughly.`,
      points: 200,
      hash: "ed31c57e70e0fcdb9ded83973ddb848d1355602d55d80dc6e37053559df3961d",
      download: "https://programercafe.github.io/web_challenge/web2/challenge4.html"
    }
  },
  reverse: {
    "rev-1": {
      name: "String Finder",
      desc: "Analyze strings in binaries.",
      points: 100,
      hash: "10a5c3195e9434628968f2e185c30c4eb2d71db256537b908f60f63fc1d04cab",
      download: "./DB/Rev/strings.zip"
    },
    "rev-2": {
      name: "Trace Viewer",
      desc: "Use ltrace to follow calls.",
      points: 120,
      hash: "b422b39b44af4e1a9e0f8f8bac42e7f439bdb3c74b0c1a1e861147df437446e1",
      download: "./DB/Rev/ltrace.zip"
    },
    "rev-3": {
      name: "XOR Decode",
      desc: "Undo XOR encoding.",
      points: 130,
      hash: "de150a10612c2581b7d40b5c12e1f1ebd24150a3d52567751de385c8e0710d49",
      download: "./DB/Rev/xor.zip"
    },
    "rev-4": {
      name: "Stack Overflow",
      desc: "Reverse stack overflow.",
      points: 140,
      hash: "9bd162971ff2f1efa1b91adccbe5e8979f883b9f451b0a1c563763e1952c15ee",
      download: "./DB/Rev/overflow.zip"
    },
    "rev-5": {
      name: "Env Secret",
      desc: "Find flag in environment.",
      points: 110,
      hash: "d5982764b5a157abdee0dfaf93621ccdc24049939db7609b68d50397771cf09e",
      download: "./DB/Rev/envflag.zip"
    },
    "rev-6": {
      name: "Ghidra Magic",
      desc: "Decompile and analyze.",
      points: 160,
      hash: "fb46f8a54dbff98b30c410aa5794a44b8ffb6f8af81cc06bd9bcfc9c01023989",
      download: "./DB/Rev/ghidra.zip"
    }
  },
  osint: {
    "osint-1": {
      name: "Where was Shadowlink?",
      desc: `Our field agent "Shadowlink" sent us one last image before communication was cut off. This image appears to have been taken near the coordinates of his last known location.
             He left a short message: 💬 "The horns of truth pierce the lies of the market. That's where I waited."
             Your mission is to locate the statue near this building that our agent was referring to.
             Submit the name of the statue in the format: P2P{statue_name}`,
      points: 100,
      hash: "b0489eace47f9e981f3290eb584ee66f376dbeef747fe1654af3b448b8352476",
      download: "./DB/osint/Shadowlink.bmp"
    }
  },
  stenography: {
    "stenography-1": {
      name: "Shadows in the field",
      desc: `Satellite imagery intercepted from a compromised drone reveals nothing suspicious at first glance. But operatives believe there's more to the image than meets the eye.
             Hidden coordinates? Encrypted metadata? You must extract and analyze the image thoroughly.`,
      points: 150,
      hash: "53ef743682d02a466f7e8e016ef97bccc40d10d62148c64690ba0ca87fa8b4d4",
      download: "./DB/stenography/Field.jpg"
    }
  },
  cryptography: {
    "cryptography-1": {
      name: "Layered Secrets",
      desc: `A suspicious encoded message was found in the logs of a breached system. It looks like Base64... but that might not be the whole story.
             Can you dig deeper and recover the flag?
             'VTJVe2h3ZHV5dF9ueF9renN9'`,
      points: 100,
      hash: "5b16d0bbc8c775e918d1fd9e0cf6322fe313d681ab1c145453c32858814aa7eb",
    }
  }
};


let solved = JSON.parse(localStorage.getItem("solved") || '{}');
let currentChallenge = null;

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function renderChallenges() {
  const container = document.getElementById("challengesContainer");
  container.innerHTML = '';

  Object.entries(challenges).forEach(([category, challs]) => {
    const section = document.createElement("div");
    section.innerHTML = `<h4 class="mb-3 text-capitalize">${category}</h4>`;
    const row = document.createElement("div");
    row.className = "row";

    Object.entries(challs).forEach(([id, data]) => {
      const col = document.createElement("div");
      col.className = "col-sm-6 col-md-4 col-lg-3 mb-4";

      col.innerHTML = `
        <div class="card challenge ${solved[id] ? 'solved' : ''}" onclick="openChallenge('${category}', '${id}')">
          <div class="card-body">
            <h6 class="card-title mb-1">${data.name}</h6>
            <p class="card-text small mb-2" title="${data.desc}">${truncateText(data.desc, 80)}</p>
            <span class="badge points">${data.points} pts</span>
            ${solved[id] ? '<span class="badge bg-success ms-2">Solved</span>' : ''}
          </div>
        </div>
      `;
      row.appendChild(col);
    });

    section.appendChild(row);
    container.appendChild(section);
  });

  updateProgress();
}

function openChallenge(category, id) {
  currentChallenge = { category, id };
  const challenge = challenges[category][id];

  document.getElementById("challengeTitle").textContent = challenge.name;
  document.getElementById("challengeDescription").textContent = challenge.desc;
  document.getElementById("flagInput").value = '';
  document.getElementById("feedbackMsg").innerHTML = '';

  const linkWrapper = document.getElementById("challengeLinkWrapper");
  linkWrapper.innerHTML = '';
  if (challenge.link) {
    linkWrapper.innerHTML += `<a href="${challenge.link}" class="btn btn-sm btn-outline-primary" target="_blank" rel="noopener noreferrer"><i class="bi bi-link-45deg"></i> Visit Challenge</a>`;
  }
  if (challenge.download) {
    linkWrapper.innerHTML += `<a href="${challenge.download}" class="btn btn-sm btn-outline-secondary" download><i class="bi bi-download"></i> Download File</a>`;
  }

  new bootstrap.Modal(document.getElementById("challengeModal")).show();
}

document.getElementById("submitFlagBtn").addEventListener("click", () => {
  const flag = document.getElementById("flagInput").value.trim();
  const feedback = document.getElementById("feedbackMsg");

  if (!/^P2P\{[a-zA-Z0-9_\-!@#$%^&*()]+\}$/.test(flag)) {
    feedback.innerHTML = '<div class="alert alert-warning">Invalid flag format. Use P2P{...}</div>';
    return;
  }

  const hash = sha256(flag);
  const { category, id } = currentChallenge;

  if (hash === challenges[category][id].hash) {
    solved[id] = true;
    localStorage.setItem("solved", JSON.stringify(solved));
    feedback.innerHTML = '<div class="alert alert-success">✅ Correct! Challenge solved.</div>';
    renderChallenges();
  } else {
    feedback.innerHTML = '<div class="alert alert-danger">❌ Incorrect flag. Try again.</div>';
  }
});

function updateProgress() {
  const allChalls = Object.values(challenges).flatMap(Object.entries);
  const total = allChalls.length;
  const solvedCount = Object.keys(solved).length;
  const percent = total === 0 ? 0 : Math.round((solvedCount / total) * 100);

  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressText").textContent = `${percent}% Complete (${solvedCount}/${total} solved)`;
}

document.addEventListener("DOMContentLoaded", renderChallenges);
