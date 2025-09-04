const modal = document.getElementById("serviceModal");
const serviceCards = document.querySelectorAll(".service-card");
const closeBtn = document.querySelector(".close");
const serviceTitle = document.getElementById("serviceTitle");
const packageOptions = document.getElementById("packageOptions");
const orderForm = document.getElementById("orderForm");
const successMessage = document.getElementById("successMessage");

const packages = [
  {name:"أساسية", price:"250$", duration:"3-5 أيام"},
  {name:"متوسطة", price:"400$", duration:"5-7 أيام"},
  {name:"متميزة", price:"600$", duration:"7-10 أيام"}
];

serviceCards.forEach(card => {
  card.addEventListener("click", () => {
    serviceTitle.textContent = "اختر الباقة لـ " + card.querySelector("h3").textContent;
    packageOptions.innerHTML = "";
    orderForm.style.display = "none";
    successMessage.style.display = "none";

    packages.forEach(pkg => {
      const btn = document.createElement("button");
      btn.className = "package-btn";
      btn.innerHTML = `<strong>${pkg.name}</strong><span>السعر: ${pkg.price}</span><span>المدة: ${pkg.duration}</span>`;
      btn.addEventListener("click", () => {
        orderForm.style.display = "flex";
        document.getElementById("details").value = `الباقة المختارة: ${pkg.name} - السعر: ${pkg.price} - المدة: ${pkg.duration}`;
      });
      packageOptions.appendChild(btn);
    });

    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => { 
  modal.style.display="none"; 
  orderForm.style.display="none"; 
  successMessage.style.display="none";
});
window.addEventListener("click", (e) => { 
  if(e.target==modal){ 
    modal.style.display="none"; 
    orderForm.style.display="none"; 
    successMessage.style.display="none";
  } 
});

orderForm.addEventListener("submit", function(e){
  e.preventDefault();
  emailjs.sendForm('service_abh3379', 'template_abc123', this, 'WfHldY3bzvH4elbWR')
    .then(() => {
      successMessage.style.display = "block";
      orderForm.reset();
    }, (error) => {
      alert("حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى.");
      console.error(error);
    });
});
