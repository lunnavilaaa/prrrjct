/* REGISTER */
function register(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm-password").value;

  if (password !== confirm) {
    alert("Password tidak sama");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ name, email, phone, password }));
  alert("Register berhasil!");
  window.location.href = "index3.html";
}

/* LOGIN */
function login(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Belum ada akun, silakan register dulu");
    return;
  }

  if (email === user.email && password === user.password) {
    localStorage.setItem("login", "true");

    alert("Login berhasil!");

    // 🔥 PINDAH KE HOME AFTER LOGIN
    window.location.replace("index4.html");
  } else {
    alert("Email atau password salah");
  }
}

/* ADD TO CART */
function addToCart(nama, harga) {
  if (!localStorage.getItem("login")) {
    alert("Silakan login dulu");
    window.location.href = "index3.html";
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ nama, harga });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produk ditambahkan ke cart");
}

/* LOAD CART */
if (document.getElementById("cartItems")) {
  const cartItems = document.getElementById("cartItems");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cartItems.innerHTML = cart.map(item => {
    total += item.harga;
    return `<p>${item.nama} - Rp ${item.harga.toLocaleString()}</p>`;
  }).join("");

  if (document.getElementById("totalHarga")) {
    document.getElementById("totalHarga").innerText =
      "Total: Rp " + total.toLocaleString();
  }
}

/* PLACE ORDER */
function placeOrder() {
  localStorage.removeItem("cart");
  Math.random() > 0.3
    ? window.location.href = "success.html"
    : window.location.href = "failed.html";
}
