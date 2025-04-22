function checkLogin() {
    const username = localStorage.getItem("username");
    if (!username) {
      window.location.href = "login.html";
      return;
    }
    document.getElementById("userDisplay").textContent = username;
    fetchVotes();
  }
  
  async function castVote(candidate) {
    const username = localStorage.getItem("username");
    const res = await fetch("/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidate, username })
    });
    const data = await res.json();
    updateVotes(data.votes);
  }
  
  async function fetchVotes() {
    const res = await fetch("/votes");
    const data = await res.json();
    updateVotes(data.votes);
  }
  
  function updateVotes(votes) {
    document.getElementById("aliceVotes").textContent = votes.Alice;
    document.getElementById("bobVotes").textContent = votes.Bob;
    document.getElementById("charlieVotes").textContent = votes.Charlie;
  }
  async function castVote(candidate) {
    const response = await fetch('/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ candidate })
    });

    const data = await response.json();
    alert(data.message);

    // Refresh vote count display
    getVotes();
}

document.getElementById('voteA-btn').addEventListener('click', () => {
    castVote('A');
});
  