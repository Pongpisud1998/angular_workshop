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


ขั้นตอนการสร้าง Component, การตั้งค่า Router และการสร้าง Service สำหรับเรียก API โดยอิงจาก Angular เวอร์ชันใหม่ (Standalone Components) ซึ่งเป็นค่าเริ่มต้นของ Angular

---

### Step 1: เปิดใช้งาน `HttpClient` ในโปรเจกต์
ก่อนที่เราจะเรียก API ได้ เราต้องตั้งค่าให้ Angular รู้จักระบบ HTTP ก่อน

เปิดไฟล์ `src/app/app.config.ts` และเพิ่ม `provideHttpClient()` ลงไป:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// 1. Import provideHttpClient
import { provideHttpClient } from '@angular/common/http'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // 2. เพิ่มเข้าไปใน providers
    provideHttpClient() 
  ]
};
```

---

### Step 2: สร้าง Service สำหรับเรียก API
Service จะทำหน้าที่จัดการข้อมูลและคุยกับเซิร์ฟเวอร์หลังบ้าน (Backend)

1. รันคำสั่งนี้ใน Terminal เพื่อสร้าง Service:
```bash
ng generate service services/api
```

2. เปิดไฟล์ `src/app/services/api.service.ts` แล้วเขียนโค้ดสำหรับดึงข้อมูล:
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Inject HttpClient แบบใหม่
  private http = inject(HttpClient); 
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  // ฟังก์ชันสำหรับดึงข้อมูล Users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
```

---

### Step 3: สร้าง Component สำหรับแสดงผล
ตอนนี้เราจะสร้างหน้าจอเพื่อเอาข้อมูลจาก Service มาแสดง

1. รันคำสั่งสร้าง Component:
```bash
ng generate component components/user-list
```

2. **เขียนโค้ดหลังบ้าน (TypeScript):** เปิดไฟล์ `src/app/components/user-list/user-list.component.ts`
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [], // ไม่ต้อง import CommonModule แล้วใน Angular ใหม่
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  // Inject Service เข้ามาใช้งาน
  private apiService = inject(ApiService);
  
  // ตัวแปรเก็บข้อมูลที่จะเอาไปแสดงใน HTML
  users: any[] = [];

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      }
    });
  }
}
```

3. **เขียนโค้ดหน้าบ้าน (HTML):** เปิดไฟล์ `src/app/components/user-list/user-list.component.html` และใส่โค้ดแสดงผลพร้อม Tailwind CSS
```html
<div class="p-6 max-w-4xl mx-auto">
  <h2 class="text-2xl font-bold mb-6 text-gray-800">รายชื่อผู้ใช้งานระบบ (API Data)</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- ใช้ @for ซึ่งเป็น Control Flow แบบใหม่ของ Angular 17+ -->
    @for (user of users; track user.id) {
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
        <h3 class="text-lg font-semibold text-blue-600">{{ user.name }}</h3>
        <p class="text-gray-600 flex items-center mt-2">
          <span class="font-medium mr-2">อีเมล:</span> {{ user.email }}
        </p>
        <p class="text-gray-600 flex items-center mt-1">
          <span class="font-medium mr-2">บริษัท:</span> {{ user.company.name }}
        </p>
      </div>
    } @empty {
      <div class="col-span-full text-center py-8 text-gray-500">
        กำลังโหลดข้อมูล...
      </div>
    }
  </div>
</div>
```

---

### Step 4: ตั้งค่า Router (การนำทาง)
เชื่อมโยง URL เข้ากับ Component ที่เราเพิ่งสร้าง

1. เปิดไฟล์ `src/app/app.routes.ts` และเพิ่มเส้นทาง (Route):
```typescript
import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
  // ถ้าเข้า path '/users' ให้เปิดหน้า UserListComponent
  { path: 'users', component: UserListComponent },
  // ถ้าเข้ามาที่หน้าแรกเปล่าๆ ให้ redirect ไปที่ '/users'
  { path: '', redirectTo: 'users', pathMatch: 'full' }
];
```

2. เตรียมพื้นที่แสดงผลในแอปหลัก: เปิดไฟล์ `src/app/app.component.html` ลบของเดิมทิ้งให้หมด แล้วใส่ `<router-outlet>` พร้อมเมนูนำทาง (Navbar) เล็กๆ:
```html
<!-- Navbar แบบง่ายๆ ด้วย Tailwind -->
<nav class="bg-blue-600 p-4 text-white shadow-md">
  <div class="container mx-auto flex gap-4">
    <a routerLink="/" class="text-xl font-bold">My App</a>
    <a routerLink="/users" class="hover:text-blue-200 transition-colors pt-1">ผู้ใช้งาน</a>
  </div>
</nav>

<!-- จุดที่ Router จะเอา Component มาแทรก -->
<main class="min-h-screen bg-gray-50">
  <router-outlet></router-outlet>
</main>
```

*(ข้อควรระวัง: สำหรับไฟล์ `app.component.ts` ต้องแน่ใจว่ามีการ `import { RouterOutlet, RouterLink } from '@angular/router';` ไว้ในส่วน `imports: [...]` แล้ว)*
