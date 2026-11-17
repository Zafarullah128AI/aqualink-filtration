// AquaLink Filtration — Entrepreneurship A-2.
// Supplier names, review counts and plan prices are illustrative for the
// presentation. All bottle prices are within the Rs 130–400 range from the
// A-1 proposal; the Rs 250 example, 10% commission, launch areas and year-1
// figures are from the A-1 form.
const SUPPLIERS = [
  { name: "AquaPure Water",       area: "Gulshan",            price: 250, rating: 4.8, reviews: 214, delivery: "2–3 hrs", min: 1, since: 2021, delivered: 12400 },
  { name: "Crystal Drop",         area: "FB Area",            price: 220, rating: 4.7, reviews: 186, delivery: "2–4 hrs", min: 1, since: 2022, delivered: 9800 },
  { name: "Neelam Water Supply",  area: "North Karachi",      price: 200, rating: 4.6, reviews: 158, delivery: "3–4 hrs", min: 2, since: 2020, delivered: 15300 },
  { name: "SafeSip Filtration",   area: "Gulistan-e-Jauhar",  price: 280, rating: 4.9, reviews: 301, delivery: "1–2 hrs", min: 1, since: 2021, delivered: 18700 },
  { name: "Al-Noor Water",        area: "FB Area",            price: 180, rating: 4.4, reviews: 97,  delivery: "3–5 hrs", min: 2, since: 2023, delivered: 4200 },
  { name: "BlueSpring Water",     area: "Gulshan",            price: 300, rating: 4.8, reviews: 142, delivery: "2–3 hrs", min: 1, since: 2022, delivered: 7600 },
  { name: "PakClear Water",       area: "North Karachi",      price: 230, rating: 4.5, reviews: 121, delivery: "2–4 hrs", min: 1, since: 2023, delivered: 5100 },
  { name: "FreshFlow Water",      area: "Gulistan-e-Jauhar",  price: 350, rating: 4.7, reviews: 88,  delivery: "1–3 hrs", min: 1, since: 2022, delivered: 6900 },
  { name: "Gulshan Aqua",         area: "Gulshan",            price: 180, rating: 4.5, reviews: 76,  delivery: "2–4 hrs", min: 2, since: 2024, delivered: 2800 },
  { name: "FB Water Point",       area: "FB Area",            price: 240, rating: 4.6, reviews: 131, delivery: "2–3 hrs", min: 1, since: 2021, delivered: 8900 },
  { name: "North Aqua",           area: "North Karachi",      price: 160, rating: 4.3, reviews: 64,  delivery: "3–5 hrs", min: 2, since: 2024, delivered: 1900 },
  { name: "Jauhar Pure Water",    area: "Gulistan-e-Jauhar",  price: 210, rating: 4.6, reviews: 112, delivery: "2–4 hrs", min: 1, since: 2023, delivered: 6300 },
];

const STATUSES = ["Placed", "Accepted", "Out for delivery", "Delivered"];
const FIRST_ORDER_DISCOUNT = 50;

let area = "All areas";
let query = "";
let orders = JSON.parse(localStorage.getItem("aqualinkOrders") || "[]");
let discountUsed = localStorage.getItem("aqualinkDiscountUsed") === "1";

const grid = document.getElementById("supplierGrid");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const orderSupplier = document.getElementById("orderSupplier");
const qtyInput = document.getElementById("qty");
const orderType = document.getElementById("orderType");
const summary = document.getElementById("orderSummary");

function rs(n){ return "Rs " + n.toLocaleString("en-PK"); }

function renderSuppliers(){
  let list = SUPPLIERS.filter(s =>
    (area === "All areas" || s.area === area) &&
    (query === "" || s.name.toLowerCase().includes(query)));
  const sort = sortSelect.value;
  if (sort === "price") list.sort((a,b) => a.price - b.price);
  if (sort === "rating") list.sort((a,b) => b.rating - a.rating);
  if (sort === "delivery") list.sort((a,b) => parseInt(a.delivery) - parseInt(b.delivery));
  grid.innerHTML = list.length ? list.map(s => `
    <article class="card">
      <h3>${s.name}</h3>
      <p class="area">${s.area} &nbsp;•&nbsp; <span class="badge">✓ Lab-tested</span></p>
      <p class="price">${rs(s.price)} <small>/ 19-litre bottle</small></p>
      <p class="meta">★ ${s.rating} (${s.reviews} reviews) &nbsp;•&nbsp; Delivery ${s.delivery}<br>
      Minimum order: ${s.min} bottle${s.min > 1 ? "s" : ""} &nbsp;•&nbsp; Since ${s.since}<br>
      ${s.delivered.toLocaleString("en-PK")} bottles delivered</p>
      <button data-supplier="${s.name}">Order from ${s.name}</button>
    </article>`).join("") : "<p class='small'>No supplier matches your search — try another name or area.</p>";
  document.getElementById("resultCount").textContent =
    list.length + " supplier" + (list.length === 1 ? "" : "s") + (area === "All areas" ? " across all launch areas" : " in " + area) + ".";
  grid.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    orderSupplier.value = b.dataset.supplier;
    updateSummary();
    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
  }));
}

function fillSupplierOptions(){
  orderSupplier.innerHTML = SUPPLIERS.map(s =>
    `<option value="${s.name}">${s.name} — ${s.area} — ${rs(s.price)}/bottle</option>`).join("");
}

function calcTotals(){
  const s = SUPPLIERS.find(x => x.name === orderSupplier.value) || SUPPLIERS[0];
  const qty = Math.max(1, parseInt(qtyInput.value || "1", 10));
  const subtotal = s.price * qty;
  const discount = (!discountUsed && subtotal > FIRST_ORDER_DISCOUNT) ? FIRST_ORDER_DISCOUNT : 0;
  const total = subtotal - discount;
  const commission = Math.round(total * 0.10);
  return { s, qty, subtotal, discount, total, commission };
}

function updateSummary(){
  const t = calcTotals();
  summary.innerHTML = `<strong>Order summary:</strong> ${t.qty} × ${rs(t.s.price)} (${t.s.name}) = <strong>${rs(t.subtotal)}</strong>` +
    (t.discount ? ` &nbsp;•&nbsp; First-order discount −${rs(t.discount)}` : "") +
    ` &nbsp;•&nbsp; You pay <strong>${rs(t.total)}</strong> &nbsp;•&nbsp; Supplier receives ${rs(t.total - t.commission)} &nbsp;•&nbsp; AquaLink earns ${rs(t.commission)} (10%) &nbsp;•&nbsp; ${orderType.value}`;
}

function statusTimeline(o){
  return `<ol class="timeline">` + STATUSES.map((st, i) => {
    const cls = o.status === "Cancelled" ? "cancelled" : (i < o.status ? "done" : (i === o.status ? "now" : ""));
    return `<li class="${cls}">${st}</li>`;
  }).join("") + `</ol>` + (o.status === "Cancelled" ? `<p><span class="badge cancelled-badge">✕ Order cancelled</span></p>` : "");
}

function renderOrders(){
  document.getElementById("orderCount").textContent = orders.filter(o => o.status !== "Cancelled").length;
  const list = document.getElementById("orderList");
  if (!orders.length){ list.innerHTML = "<p class='small'>No orders yet — place your first order above.</p>"; return; }
  list.innerHTML = orders.slice().reverse().map(o => `
    <article class="card"><h3>Order ${o.id} — ${o.supplier}</h3>
    <p class="meta">${o.qty} × 19-litre bottle(s) &nbsp;•&nbsp; ${o.type} &nbsp;•&nbsp; ${o.day}<br>
    ${o.name} — ${o.address} (${o.phone})<br>
    Subtotal ${rs(o.subtotal)}${o.discount ? ` − discount ${rs(o.discount)}` : ""} &nbsp;•&nbsp; Total paid: <strong>${rs(o.total)}</strong> (supplier ${rs(o.total - o.commission)} • AquaLink ${rs(o.commission)})</p>
    ${statusTimeline(o)}
    <div class="order-actions">
      ${o.status !== "Cancelled" && o.status < 3 ? `<button class="btn-small" data-advance="${o.id}">Update status</button>` : ""}
      ${o.status !== "Cancelled" && o.status < 2 ? `<button class="btn-small danger" data-cancel="${o.id}">Cancel order</button>` : ""}
      ${o.status === 3 ? `<p class="small">✓ Delivered — thank you for ordering with AquaLink!</p>` : ""}
    </div></article>`).join("");
  list.querySelectorAll("[data-advance]").forEach(b => b.addEventListener("click", () => {
    const o = orders.find(x => x.id === b.dataset.advance);
    if (o && o.status < 3){ o.status++; saveOrders(); renderOrders(); }
  }));
  list.querySelectorAll("[data-cancel]").forEach(b => b.addEventListener("click", () => {
    const o = orders.find(x => x.id === b.dataset.cancel);
    if (o){ o.status = "Cancelled"; saveOrders(); renderOrders(); }
  }));
}

function saveOrders(){
  localStorage.setItem("aqualinkOrders", JSON.stringify(orders));
}

document.getElementById("areaChips").addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return;
  area = e.target.dataset.area;
  document.querySelectorAll("#areaChips button").forEach(b => b.classList.toggle("active", b === e.target));
  document.getElementById("areaSelect").value = area;
  renderSuppliers();
});
document.getElementById("areaForm").addEventListener("submit", e => {
  e.preventDefault();
  area = document.getElementById("areaSelect").value;
  document.querySelectorAll("#areaChips button").forEach(b => b.classList.toggle("active", b.dataset.area === area));
  renderSuppliers();
  document.getElementById("suppliers").scrollIntoView({ behavior: "smooth" });
});
sortSelect.addEventListener("change", renderSuppliers);
searchInput.addEventListener("input", () => { query = searchInput.value.trim().toLowerCase(); renderSuppliers(); });
document.getElementById("qtyMinus").addEventListener("click", () => { qtyInput.value = Math.max(1, parseInt(qtyInput.value || "1", 10) - 1); updateSummary(); });
document.getElementById("qtyPlus").addEventListener("click", () => { qtyInput.value = Math.min(20, parseInt(qtyInput.value || "1", 10) + 1); updateSummary(); });
[qtyInput, orderSupplier, orderType].forEach(el => el.addEventListener("change", updateSummary));
qtyInput.addEventListener("input", updateSummary);

document.querySelectorAll("[data-plan]").forEach(b => b.addEventListener("click", () => {
  const bottles = b.dataset.plan === "Weekly Saver" ? 4 : b.dataset.plan === "Family Plan" ? 8 : 20;
  qtyInput.value = Math.min(20, bottles);
  orderType.value = "Weekly recurring";
  updateSummary();
  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
}));

document.getElementById("orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const t = calcTotals();
  const o = {
    id: "AQ-" + String(orders.length + 1).padStart(3, "0"),
    supplier: t.s.name, qty: t.qty, type: orderType.value,
    day: document.getElementById("orderDay").value,
    name: document.getElementById("custName").value.trim(),
    address: document.getElementById("custAddress").value.trim(),
    phone: document.getElementById("custPhone").value.trim(),
    subtotal: t.subtotal, discount: t.discount, total: t.total, commission: t.commission,
    status: 0,
  };
  orders.push(o);
  if (t.discount){ discountUsed = true; localStorage.setItem("aqualinkDiscountUsed", "1"); }
  saveOrders();
  const box = document.getElementById("confirmBox");
  box.hidden = false;
  box.innerHTML = `<strong>✓ Order ${o.id} placed!</strong> ${t.s.name} has been notified (dashboard + WhatsApp) and will deliver ${t.qty} bottle(s) on ${o.day}. ` +
    `You pay ${rs(t.total)}${t.discount ? ` (includes Rs 50 first-order discount)` : ""} — supplier receives ${rs(t.total - t.commission)}, AquaLink earns ${rs(t.commission)} (10%). ` +
    `Track it under My orders below. Thank you, ${o.name}!`;
  renderOrders();
  box.scrollIntoView({ behavior: "smooth" });
  e.target.reset();
  qtyInput.value = 2;
  updateSummary();
});

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const box = document.getElementById("contactConfirm");
  box.hidden = false;
  box.innerHTML = `<strong>✓ Message sent!</strong> Thank you, ${document.getElementById("contactName").value.trim()} — we will reply on WhatsApp shortly.`;
  e.target.reset();
  box.scrollIntoView({ behavior: "smooth" });
});

fillSupplierOptions();
renderSuppliers();
updateSummary();
renderOrders();
