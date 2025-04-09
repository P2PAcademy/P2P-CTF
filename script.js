const challenges = {
  web: {
    "web-1": {
      name: "Login Bypass",
      desc: "Bypass authentication via SQL injection.",
      points: 100,
      hash: "226cdc89cc6ece9252ebf1d08f4ee7025e0fc960d4567f4355064482f9ebcdea",
      link: "./web/login-bypass.html"
    },
    "web-2": {
      name: "XSS Exploit",
      desc: "Inject JavaScript to extract session data.",
      points: 150,
      hash: "5f4dcc3b5aa765d61d8327deb882cf992e35ec9a5f8453f68e6c8b8d4cef5e9e",
      download: "./web/xss.zip"
    }
  },
  pwn: {
    "pwn-1": {
      name: "Stack Smashing",
      desc: "Exploit buffer overflow to hijack execution.",
      points: 200,
      hash: "5f4dcc3b5aa765d61d8327deb882cf992e35ec9a5f8453f68e6c8b8d4cef5e9e",
      download: "./pwn/stack-smash.zip"
    }
  },
  reverse: {
    "rev-1": { name: "String Finder", desc: "Analyze strings in binaries.", points: 100, hash: "", download: "./Rev/strings.zip" },
    "rev-2": { name: "Trace Viewer", desc: "Use ltrace to follow calls.", points: 120, hash: "", download: "./Rev/ltrace.zip" },
    "rev-3": { name: "XOR Decode", desc: "Undo XOR encoding.", points: 130, hash: "", download: "./Rev/xor.zip" },
    "rev-4": { name: "Stack Overflow", desc: "Reverse stack overflow.", points: 140, hash: "", download: "./Rev/overflow.zip" },
    "rev-5": { name: "Env Secret", desc: "Find flag in environment.", points: 110, hash: "", download: "./Rev/envflag" },
    "rev-6": { name: "Ghidra Magic", desc: "Decompile and analyze.", points: 160, hash: "", download: "./Rev/ghidra.zip" }
  }
};

let solved = JSON.parse(localStorage.getItem("solved") || '{}');
let currentChallenge = null;

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
            <p class="card-text small mb-2">${data.desc}</p>
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