document.addEventListener("DOMContentLoaded", () => {
    
    // 1. مراقبة التهديدات السيبرانية الحية بالعداد المباشر
    const threatElement = document.getElementById("threatCount");
    if (threatElement) {
        setInterval(() => {
            let currentCount = parseInt(threatElement.innerText.replace(/,/g, ''));
            currentCount += Math.floor(Math.random() * 4) + 1;
            threatElement.innerText = currentCount.toLocaleString();
        }, 2500);
    }

    // 2. التحقق من المدخلات قبل إرسالها سحابياً
    const form = document.getElementById("secureForm");
    const nameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (form) {
        form.addEventListener("submit", (e) => {
            let isValid = true;

            if (nameInput.value.trim() === "") {
                document.getElementById("nameError").innerText = "⚠️ يرجى إدخال الاسم الكامل لتأمين طلبك.";
                isValid = false;
            } else {
                document.getElementById("nameError").innerText = "";
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.match(emailPattern)) {
                document.getElementById("emailError").innerText = "⚠️ صيغة البريد الإلكتروني المدخلة غير صالحة.";
                isValid = false;
            } else {
                document.getElementById("emailError").innerText = "";
            }

            if (messageInput.value.trim().length < 15) {
                document.getElementById("messageError").innerText = "⚠️ يرجى كتابة تفاصيل واضحة (15 حرفاً على الأقل).";
                isValid = false;
            } else {
                document.getElementById("messageError").innerText = "";
            }

            // إذا كانت هناك أخطاء، نمنع الإرسال
            if (!isValid) {
                e.preventDefault();
            } else {
                alert("🔒 يتم الآن تشفير البيانات وإرسالها سحابياً بنجاح!");
            }
        });
    }
});