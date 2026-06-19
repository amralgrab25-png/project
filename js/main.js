// الانتظار حتى تحميل الصفحة بالكامل
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. تفاعل لوحة التحكم: زيادة عداد التهديدات تلقائياً لمحاكاة المراقبة المباشرة
    const threatElement = document.getElementById("threatCount");
    if (threatElement) {
        setInterval(() => {
            let currentCount = parseInt(threatElement.innerText.replace(/,/g, ''));
            currentCount += Math.floor(Math.random() * 3) + 1; // زيادة عشوائية مابين 1 إلى 3
            threatElement.innerText = currentCount.toLocaleString();
        }, 3000); // تحديث كل 3 ثوانٍ
    }

    // 2. تفاعل الـ Form Validation (التحقق من صحة المدخلات قبل الإرسال)
    const form = document.getElementById("secureForm");
    const nameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // منع الإرسال الافتراضي لتطبيق فحص جافاسكربت
            
            let isValid = true;

            // الفحص الأول: الاسم
            if (nameInput.value.trim() === "") {
                document.getElementById("nameError").innerText = "⚠️ حقل الاسم مطلوب ولا يمكن تركه فارغاً.";
                isValid = false;
            } else {
                document.getElementById("nameError").innerText = "";
            }

            // الفحص الثاني: البريد الإلكتروني
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!emailInput.value.match(emailPattern)) {
                document.getElementById("emailError").innerText = "⚠️ يرجى إدخال بريد إلكتروني صحيح وصالح.";
                isValid = false;
            } else {
                document.getElementById("emailError").innerText = "";
            }

            // الفحص الثالث: الرسالة
            if (messageInput.value.trim().length < 10) {
                document.getElementById("messageError").innerText = "⚠️ يرجى كتابة تفاصيل واضحة (10 أحرف على الأقل).";
                isValid = false;
            } else {
                document.getElementById("messageError").innerText = "";
            }

            // إذا كانت كل البيانات صحيحة
            if (isValid) {
                alert("🔒 تم تشفير البيانات وإرسال طلبك بنجاح! سنتواصل معك قريباً.");
                form.reset(); // تفريغ الحقول بعد الإرسال الناجح
            }
        });
    }
});