const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// ให้ Express สามารถอ่าน JSON จาก Request Body ได้
app.use(express.json());

// 1. สร้าง Connection ไปยัง PostgreSQL Database
const pool = new Pool({
    user: 'postgres',     // เปลี่ยนเป็น username ของ db คุณ
    host: 'localhost',            // เปลี่ยนเป็น host ของ db คุณ
    database: 'mrv',     // เปลี่ยนเป็นชื่อ database
    password: 'postgres', // เปลี่ยนเป็นรหัสผ่าน db
    port: 5436,                   // port มาตรฐานของ PostgreSQL
});

// ตรวจสอบการเชื่อมต่อ Database
pool.connect()
    .then(() => console.log('✅ Connected to PostgreSQL successfully!'))
    .catch(err => console.error('❌ Connection error', err.stack));


app.get('/api', (req, res) => {
    res.send('MRV API is running!');
})
// ==========================================
// API 1: Insert (สมัครสมาชิก / Register)
// ==========================================
app.post('/api/register', async (req, res) => {
    const { username, password, firstname, lastname } = req.body;

    // ตรวจสอบว่ากรอกข้อมูลครบหรือไม่
    if (!username || !password || !firstname || !lastname) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        // ตรวจสอบว่ามี username นี้ในระบบหรือยัง
        const checkUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (checkUser.rows.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // เข้ารหัสผ่าน (Hash password) ด้วยความเข้มข้น 10 (Salt rounds)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // บันทึกข้อมูลลงตาราง users (id เป็น bigserial จะเพิ่มให้เองอัตโนมัติ)
        const insertQuery = `
            INSERT INTO users (username, "password", firstname, lastname) 
            VALUES ($1, $2, $3, $4) RETURNING id, username, firstname, lastname
        `;
        const result = await pool.query(insertQuery, [username, hashedPassword, firstname, lastname]);

        res.status(201).json({
            message: 'User created successfully',
            user: result.rows[0]
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});


// ==========================================
// API 2: Login (เข้าสู่ระบบ)
// ==========================================
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Please provide username and password' });
    }

    try {
        // ค้นหาผู้ใช้จาก username
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        // ถ้าไม่พบผู้ใช้
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // เปรียบเทียบรหัสผ่านที่ส่งมา กับรหัสผ่านที่ถูก Hash ไว้ใน Database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // ลบรหัสผ่านออกจาก object ก่อนส่งกลับไปให้ Client เพื่อความปลอดภัย
        delete user.password;

        res.status(200).json({
            message: 'Login successful',
            user: user
            // หมายเหตุ: ในระบบจริง มักจะมีการสร้าง JWT Token ส่งกลับไปตรงนี้ด้วย
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// เริ่มรัน Server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});