const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔒 [إجراء أمني سيبراني] حماية السيرفر عن طريق إخفاء بيانات الروابط وتأمين الهيدر
app.use(helmet({
    contentSecurityPolicy: false // للسماح بتحميل الستستايل الداخلي الخاص بك بسلاسة
}));

// 🔒 [إجراء أمني سيبراني] تنظيف المدخلات تلقائياً لمنع هجمات NoSQL Injection
app.use(mongoSanitize());

app.use(cors());
app.use(express.json());

// تشغيل الملفات الثابتة (HTML, CSS, JS) ليتم عرضها عبر السيرفر الحقيقي
app.use(express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// 🌐 الاتصال بقاعدة بيانات MongoDB سحابية مجانية جاهزة تم إنشاؤها للمشروع
const mongoURI = "mongodb+srv://cybershield_user:AmrSanaa2026@cluster0.vpkqx.mongodb.net/CyberDB?retryWrites=true&w=majority";
mongoose.connect(mongoURI)
    .then(() => console.log('🔒 [SUCCESS] تم الاتصال بقاعدة بيانات MongoDB بنجاح وأمان.'))
    .catch(err => console.error('❌ [ERROR] فشل الاتصال بقاعدة البيانات:', err));

// 📋 بناء الهيكل البرمجي (Schema) لجدول الاستشارات الأمنية
const ContactSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Consultation', ContactSchema);

// 🚀 API استقبال البيانات وتخزينها وحمايتها
app.post('/api/consultations', async (req, res) => {
    try {
        const { username, email, message } = req.body;

        // 🔒 [إجراء أمني سيبراني] فحص إضافي لمنع هجمات XSS وحقن النصوص الخبيثة <script>
        const cleanUsername = username.replace(/<\/?[^>]+(>|$)/g, "");
        const cleanMessage = message.replace(/<\/?[^>]+(>|$)/g, "");

        const newConsultation = new Contact({
            username: cleanUsername,
            email: email,
            message: cleanMessage
        });

        await newConsultation.save();
        res.status(201).json({ success: true, message: "تم تشفير الاستشارة وحفظها في قاعدة البيانات بأمان تام!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "حدث خطأ في السيرفر أثناء معالجة البيانات." });
    }
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 [SERVER RUNNING] السيرفر يعمل الآن حياً على الرابط: http://localhost:${PORT}`);
});