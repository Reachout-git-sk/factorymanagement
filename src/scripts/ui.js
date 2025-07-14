// src/scripts/ui.js

export function getRole() {
  return localStorage.getItem("role");
}

export function showRoleUI() {
  const role = getRole();
  document.getElementById("userRoleDisplay").innerText = `Logged in as: ${role.toUpperCase()}`;

  if (role === "staff") {
    document.querySelectorAll(".admin-only").forEach(el => el.style.display = "none");
  }
}
