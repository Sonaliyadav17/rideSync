let pool = [];

function addUser() {
  let name = document.getElementById("name").value.trim();
  let from = document.getElementById("from").value.trim();
  let to = document.getElementById("to").value.trim();
  let interest = document.getElementById("interest").value;
  let female = document.getElementById("femaleMode").checked;

  if (!name || !from || !to || !interest) {
    alert("Please fill all fields");
    return;
  }

  pool.push({ name, from, to, interest, female });
  matchUsers();

  // Clear fields after adding
  document.getElementById("name").value = "";
  document.getElementById("from").value = "";
  document.getElementById("to").value = "";
  document.getElementById("interest").value = "";
  document.getElementById("femaleMode").checked = false;
}

function matchUsers() {
  let result = document.getElementById("result");
  result.innerHTML = "";

  if (pool.length < 2) {
    result.innerHTML = "<p>Waiting for more users to match...</p>";
    return;
  }

  let matchFound = false;

  for (let i = 0; i < pool.length; i++) {
    for (let j = i + 1; j < pool.length; j++) {
      if (
        pool[i].interest === pool[j].interest &&
        pool[i].female === pool[j].female &&
        pool[i].from.toLowerCase() === pool[j].from.toLowerCase() &&
        pool[i].to.toLowerCase() === pool[j].to.toLowerCase()
      ) {
        matchFound = true;
        result.innerHTML += `
          <div class="card">
            🎉 Match Found! <br><br>
            ${pool[i].name} 🤝 ${pool[j].name} <br>
            Route: ${pool[i].from} → ${pool[i].to} <br>
            Interest: ${pool[i].interest}
          </div>
        `;
      }
    }
  }

  if (!matchFound) {
    result.innerHTML = "<p>No exact match found yet.</p>";
  }
}

// Theme toggle
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Counter animation
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
  let update = () => {
    let target = +counter.getAttribute("data-target");
    let count = +counter.innerText;
    let increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(update, 20);
    } else {
      counter.innerText = target;
    }
  };
  update();
});