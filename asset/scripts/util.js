function readStoredJSON(key, fallbackValue) {
  try {
    const rawValue = localStorage.getItem(key);
    if (rawValue === null || rawValue === "") {
      return fallbackValue;
    }

    return JSON.parse(rawValue);
  } catch (error) {
    return fallbackValue;
  }
}

function writeStoredJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value, null, 2));
}

function readUsers() {
  const users = readStoredJSON("userinfo", []);
  return Array.isArray(users) ? users : [];
}

function getCurrentUser() {
  const currentUser = readStoredJSON("currentUser", null);

  if (!currentUser) {
    return null;
  }

  try {
    const users = readUsers();
    const freshUser = users.find((user) => user.id === currentUser.id || user.phone === currentUser.phone || String(user.accountNumber) === String(currentUser.accountNumber));

    if (freshUser) {
      writeStoredJSON("currentUser", freshUser);
      return freshUser;
    }
  } catch (error) {
    return currentUser;
  }

  return currentUser;
}

function requireCurrentUser(redirectUrl = "./login.html") {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.replace(redirectUrl);
    return null;
  }

  return currentUser;
}

function updateStoredUsers(updatedUsers, nextCurrentUser) {
  writeStoredJSON("userinfo", updatedUsers);
  writeStoredJSON("currentUser", nextCurrentUser);
}

function formatBalance(rawBalance) {
  const numeric = Number(rawBalance);
  if (Number.isFinite(numeric)) {
    return `${numeric} vnd`;
  }
  return "0 vnd";
}

function formatMoney(amount) {
  const numericAmount = Number(amount || 0);
  return `${numericAmount.toLocaleString("vi-VN")} VND`;
}

function clearFieldValidity(...inputs) {
  inputs.forEach((input) => {
    if (input) {
      input.setCustomValidity("");
    }
  });
}

function clearFieldMessages(...elements) {
  elements.forEach((element) => {
    if (element) {
      element.classList.add("d-none");
    }
  });
}

function syncBasicValidity(rules) {
  rules.forEach(({ input, invalid, message }) => {
    if (input) {
      input.setCustomValidity(invalid ? message : "");
    }
  });
}
