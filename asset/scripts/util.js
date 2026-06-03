// Đọc giá trị từ local storage
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
// Ghi giá trị vào local storage
function writeStoredJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value, null, 2));
}

// Lấy danh sách người dùng từ local storage về
function readUsers() {
  const users = readStoredJSON("userinfo", []);
  return Array.isArray(users) ? users : [];
}

// Lấy người dùng hiện tại
function getCurrentUser() {
  // Lấy ra trường currentUser
  const currentUser = readStoredJSON("currentUser", null);

  if (!currentUser) {
    return null;
  }

  // Kiểm tra xem currentUser có thực sự nằm trong user list hay không?
  try {
    const users = readUsers();
    const freshUser = users.find((user) => user.id === currentUser.id || user.phone === currentUser.phone || String(user.accountNumber) === String(currentUser.accountNumber));

    // Nếu user không hợp lệ lập tức kết thúc phiên
    if (!freshUser) {
      localStorage.removeItem("currentUser");
      return null;
    }

    if (freshUser) {
      writeStoredJSON("currentUser", freshUser);
      return freshUser;
    }
    // Để tối ưu, khỏi ghi đè
    if (JSON.stringify(freshUser) !== JSON.stringify(currentUser)) {
      writeStoredJSON("currentUser", freshUser);
    }
    return currentUser;
  } catch (error) {
    return currentUser;
  }
}

// Kiểm tra các thao tác không dùng cho khách
function requireCurrentUser(redirectUrl = "./login.html") {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.replace(redirectUrl);
    return null;
  }

  return currentUser;
}

// Dùng để đồng bộ dữ liệu khi có thay đổi với 1 user thì thay đổi cả thông số của current user lẫn các users nằm trong user list
function updateStoredUsers(updatedUsers, nextCurrentUser) {
  writeStoredJSON("userinfo", updatedUsers);
  writeStoredJSON("currentUser", nextCurrentUser);
}

// Dùng chung format cho giá trị tiền
function formatMoney(amount, currency = "VND", locale = "vi-VN") {
  const number = Number(amount);
  if (isNaN(number)) {
    return "0 ₫";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(number);
}

// Xóa lỗi của tất cả ô input
function clearFieldValidity(...inputs) {
  inputs.forEach((input) => {
    if (input) {
      input.setCustomValidity("");
    }
  });
}

// Display none tất cả các message
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
