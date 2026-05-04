# angular_workshop

```markdown
# การสร้างโปรเจกต์ Angular พร้อมติดตั้ง Tailwind CSS

โปรเจกต์นี้เป็นการเริ่มต้นสร้างแอปพลิเคชันด้วย **Angular (TypeScript)** และมีการบูรณาการร่วมกับ **Tailwind CSS** เพื่อใช้ในการจัดการสไตล์และ UI ของแอปพลิเคชันอย่างรวดเร็ว

---

## 🛠 สิ่งที่ต้องมีก่อนเริ่มต้น (Prerequisites)

ก่อนเริ่มสร้างโปรเจกต์ ตรวจสอบให้แน่ใจว่าได้ติดตั้งเครื่องมือเหล่านี้ในเครื่องแล้ว:
* **[Node.js](https://nodejs.org/)** (แนะนำให้ใช้เวอร์ชัน LTS ล่าสุด)
* **Angular CLI** (สามารถติดตั้งได้ผ่านคำสั่งด้านล่าง)
```bash
npm install -g @angular/cli
```

---

## 🚀 ขั้นตอนการติดตั้ง (Installation Steps)

### 1. สร้างโปรเจกต์ Angular ใหม่
ใช้คำสั่ง Angular CLI เพื่อสร้างโปรเจกต์ใหม่ (ในตัวอย่างนี้จะตั้งชื่อว่า `my-project` คุณสามารถเปลี่ยนชื่อได้ตามต้องการ)
```bash
ng new my-project
```
*(ระหว่างการสร้าง ระบบจะถามว่าต้องการเพิ่ม Angular routing หรือไม่ และจะใช้รูปแบบ Stylesheet แบบไหน ให้เลือกตามความเหมาะสม เช่น `CSS` หรือ `SCSS`)*

หลังจากสร้างเสร็จแล้ว ให้เข้าไปที่โฟลเดอร์ของโปรเจกต์:
```bash
cd my-project
```

### 2. ติดตั้ง Tailwind CSS
ติดตั้ง Tailwind CSS และเครื่องมือที่เกี่ยวข้อง (PostCSS และ Autoprefixer) ผ่าน npm:

```bash
npm install -D tailwindcss postcss autoprefixer
```

### 3. สร้างไฟล์ Configuration ของ Tailwind
รันคำสั่งด้านล่างเพื่อสร้างไฟล์ `tailwind.config.js` สำหรับจัดการการตั้งค่าต่างๆ ของ Tailwind:
```bash
npx tailwindcss init
```

### 4. กำหนดพาธของไฟล์ Template
เปิดไฟล์ `tailwind.config.js` ที่เพิ่งถูกสร้างขึ้นมา และอัปเดตในส่วนของ `content` เพื่อให้ Tailwind รู้ว่าต้องไปค้นหาคลาส CSS ที่ไฟล์ไหนบ้าง (ใน Angular จะเป็นไฟล์ `.html` และ `.ts` ในโฟลเดอร์ `src`)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 5. เพิ่ม Tailwind Directives ลงใน Global Styles
เปิดไฟล์สไตล์หลักของโปรเจกต์ (ปกติจะอยู่ที่ `src/styles.css` หรือ `src/styles.scss`) และเพิ่มโค้ด 3 บรรทัดนี้ลงไปที่ด้านบนสุดของไฟล์:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🏃‍♂️ การรันโปรเจกต์ (Running the Project)

เมื่อตั้งค่าทุกอย่างเสร็จสิ้น สามารถรัน Development server ได้ด้วยคำสั่ง:
```bash
ng serve
```
จากนั้นเปิดเบราว์เซอร์ไปที่ `http://localhost:4200/`

---

## 🧪 ทดสอบการใช้งาน Tailwind CSS

สามารถทดสอบว่า Tailwind CSS ทำงานได้ปกติหรือไม่ โดยลองลบโค้ดทั้งหมดในไฟล์ `src/app/app.component.html` แล้วแทนที่ด้วยโค้ดด้านล่างนี้:
```html
<div class="min-h-screen bg-gray-100 flex items-center justify-center">
  <div class="bg-white p-8 rounded-lg shadow-lg text-center">
    <h1 class="text-4xl font-bold text-blue-600 mb-4">Hello Angular + Tailwind!</h1>
    <p class="text-gray-600">การติดตั้งเสร็จสมบูรณ์ พร้อมสำหรับการพัฒนาแล้ว</p>
    <button class="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
      เริ่มต้นใช้งาน
    </button>
  </div>
</div>
```
หากหน้าเว็บแสดงผลโดยมีสไตล์ มีสี และจัดกึ่งกลางตามคลาสของ Tailwind แสดงว่าการติดตั้งสมบูรณ์!
```