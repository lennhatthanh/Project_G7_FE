<<<<<<< Updated upstream
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# SanGo Sports Facility Booking Platform

SanGo is a full-stack sports facility booking system. The backend exposes REST APIs for authentication, venue management, bookings, payments, events, discounts, notifications, ratings, and statistics. The frontend provides role-based screens for users, venue owners, staff, and administrators.

This README documents the code that is actually present in the workspace. If something is not implemented in the code, it is marked as not yet implemented.

## 1. Project Overview

The system solves the problem of discovering, managing, and booking sports facilities.

Users can sign up, verify their email, log in, browse available venues, view venue details on a map, book time slots, join events, and review facilities. Venue owners and staff can manage courts, positions, services, discounts, notifications, and bookings. Administrators can manage owners and game types.

The backend is a Node.js and Express API backed by PostgreSQL through Sequelize. It also integrates with AWS S3 for image storage, PayOS for payment links, and Nodemailer for email delivery. The frontend is a Vite + React application with Redux state management and route guards for different user roles.

## 2. Features

### Authentication and roles

- User registration with email verification.
- Login flows for regular users, venue owners, staff, and admins.
- JWT access tokens and refresh tokens.
- Logout through refresh token cookie clearing.
- Role-based route protection on the frontend and backend.

### User account features

- User profile update.
- User password change.
- Admin-side checks for user accounts.

### Venue browsing and booking

- Public venue listing.
- Venue detail lookup by id.
- Booking flow for time slots.
- Booking history for users, staff, and venue owners.
- Payment initiation through PayOS.
- Payment success and cancel handling through callback endpoints.

### Venue owner and staff management

- Create, update, delete, and verify venue owner accounts.
- Create, update, delete, and verify staff accounts.
- View all owners or staff for management screens.

### Sports facility management

- Create, update, delete, and list sports facilities.
- Upload venue images to AWS S3.
- Create, update, delete, and list venue positions/courts.
- Associate positions with a sport type.

### Catalog and operational data

- CRUD for services.
- CRUD for sport types/game types.
- CRUD for discount codes.
- Discount code validation.
- CRUD for notifications.
- Email broadcast for notifications.
- CRUD for ratings.
- Event creation, update, deletion, and participation.

### Reporting and analytics

- Booking count report.
- Revenue report.
- Event participation report.

### Frontend application features

- Public landing page and venue search/list pages.
- Map view using Mapbox.
- Role-specific dashboards and layouts.
- Forms and tables for managing all main backend entities.
- Shared Redux store for app state.

## 3. Tech Stack

### Backend

- Language: JavaScript running on Node.js.
- Framework: Express.
- Database access: Sequelize and raw PostgreSQL queries.
- Database driver: pg and pg-hstore.
- Authentication: jsonwebtoken and bcrypt.
- File upload: multer and multer-s3.
- Object storage: AWS SDK for S3.
- Payments: @payos/node.
- Email: nodemailer.
- Utility packages: dotenv, cors, morgan, body-parser, cookie-parser, method-override, uuid, nodemon.

### Frontend

- Language: JavaScript with React JSX.
- Build tool: Vite.
- Routing: react-router-dom.
- State management: Redux Toolkit and react-redux.
- HTTP client: axios.
- UI and styling: Tailwind CSS 4, Radix UI primitives, clsx, tailwind-merge, tw-animate-css.
- Visualization and UI extras: Swiper, Recharts, react-countup, react-tooltip, react-hot-toast, AOS.
- Map integration: mapbox-gl and @mapbox/mapbox-gl-directions.
- Icons: Lucide React and Font Awesome React.

## 4. Project Structure

The workspace contains two applications: Project_G7_BE and Project_G7_FE.

| Path | Purpose |
| --- | --- |
| Project_G7_BE/app.js | Main Express app setup, middleware registration, route mounting, and health check. |
| Project_G7_BE/bin/www | Server bootstrap and port binding. |
| Project_G7_BE/db.js | Lightweight pg Pool helper used for direct SQL queries. |
| Project_G7_BE/config/config.js | Sequelize environment configuration and PostgreSQL SSL setup. |
| Project_G7_BE/controllers/ | Business logic for auth, users, owners, staff, venues, positions, services, discounts, notifications, ratings, bookings, events, and statistics. |
| Project_G7_BE/middleware/ | JWT authentication middleware. |
| Project_G7_BE/models/ | Sequelize models, associations, indexes, and raw query helpers. |
| Project_G7_BE/migrations/ | Sequelize migration files that define the database schema. |
| Project_G7_BE/seeders/ | Seed data for initial database content. |
| Project_G7_BE/routes/ | Express route definitions that mount the controllers. |
| Project_G7_BE/services/ThongKeService.js | Raw SQL service layer used by the statistics controller. |
| Project_G7_BE/public/ | Static assets served by Express. |
| Project_G7_BE/views/ | EJS templates used by the Express app. |
| Project_G7_BE/uploads/ | Local upload directory used by some routes and static file serving. |
| Project_G7_BE/test-db.js | Standalone PostgreSQL connection test script. |
| Project_G7_BE/01_current_config.md | Current deployment and configuration notes. |
| Project_G7_BE/02_ideal_config.md | Target configuration notes. |
| Project_G7_BE/04_terraform_ai_prompt.md | Terraform planning notes and prompt file. |
| Project_G7_BE/W4_evidence_pack | Evidence artifacts for workshop or deployment submission. |
| Project_G7_FE/src/main.jsx | React entry point that renders the app into the DOM. |
| Project_G7_FE/src/App.jsx | Main router composition for all role-based routes. |
| Project_G7_FE/src/store.jsx | Redux store configuration. |
| Project_G7_FE/src/index.css | Global CSS and Tailwind base setup. |
| Project_G7_FE/src/App.css | App-level styling and Tailwind imports. |
| Project_G7_FE/src/router/ | Route definitions for user, owner, staff, and admin flows. |
| Project_G7_FE/src/layout/ | Shared layout wrappers and navigation components. |
| Project_G7_FE/src/page/ | Screens for home, auth, booking, map, profile, dashboards, and management views. |
| Project_G7_FE/src/redux/ | Slice files for each major domain entity. |
| Project_G7_FE/src/components/ | Shared UI components and reusable primitives. |
| Project_G7_FE/src/kiemtra/ | Route guard components for role checks. |
| Project_G7_FE/src/utils/http.js | Axios instance with API base URL from environment variables. |
| Project_G7_FE/src/assets/ | Static images and icons used by the UI. |
| Project_G7_FE/public/ | Public static assets for the frontend build. |
| Project_G7_FE/vite.config.js | Vite config and the @ alias mapping to src. |
| Project_G7_FE/package.json | Frontend scripts and dependencies. |

## 5. API Endpoints

Base paths are mounted in Project_G7_BE/app.js.

### Core

| Method | Path | Description |
| --- | --- | --- |
| GET | / | Renders the default EJS index page. |
| GET | /health | Returns a simple health response with status, message, and timestamp. |

### Auth: /auth

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| POST | /auth/dang-ky | Register a regular user and send a verification email. | No |
| GET | /auth/verify | Verify the email token from the registration email. | No |
| POST | /auth/dang-nhap | Log in as a regular user. | No |
| POST | /auth/dang-nhap-chu-san | Log in as a venue owner. | No |
| POST | /auth/dang-nhap-nhan-vien | Log in as staff. | No |
| POST | /auth/dang-nhap-admin | Log in as an admin. | No |
| POST | /auth/refresh | Refresh the access token using the refresh token cookie. | No |
| GET | /auth/dang-xuat | Log out and clear the refresh token cookie. | Yes |

### Users: /nguoi-dung

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| PUT | /nguoi-dung/cap-nhat-nguoi-dung | Update a user account. | Yes |
| PUT | /nguoi-dung/cap-nhat-nguoi-dung-open | Update a user account with open fields. | Yes |
| PUT | /nguoi-dung/doi-mat-khau-nguoi-dung | Change the user password. | Yes |
| DELETE | /nguoi-dung/xoa-nguoi-dung/:id | Delete a user by id. | Yes |
| GET | /nguoi-dung/get-all | List all users. | Yes |
| GET | /nguoi-dung/get-nguoi-dung | Get the current user. | Yes |
| GET | /nguoi-dung/kiem-tra-nguoi-dung | Check the current user role or account state. | Yes |

### Owners: /chu-san

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| POST | /chu-san/them-moi-chu-san | Create a venue owner account. | Yes |
| PUT | /chu-san/cap-nhat-chu-san | Update a venue owner account. | Yes |
| PUT | /chu-san/cap-nhat-chu-san-open | Update a venue owner account with open fields. | Yes |
| PUT | /chu-san/doi-mat-khau-chu-san | Change the owner password. | Yes |
| DELETE | /chu-san/xoa-chu-san/:id | Delete a venue owner by id. | Yes |
| GET | /chu-san/get-all | List all venue owners. | Yes |
| GET | /chu-san/get-chu-san | Get the current owner account. | Yes |
| GET | /chu-san/kiem-tra-chu-san | Check the current owner account. | Yes |

### Staff: /nhan-vien

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| POST | /nhan-vien/them-moi-nhan-vien | Create a staff account. | Yes |
| PUT | /nhan-vien/cap-nhat-nhan-vien | Update a staff account. | Yes |
| PUT | /nhan-vien/cap-nhat-nhan-vien-open | Update a staff account with open fields. | Yes |
| PUT | /nhan-vien/doi-mat-khau-nhan-vien | Change the staff password. | Yes |
| DELETE | /nhan-vien/xoa-nhan-vien/:id | Delete a staff account by id. | Yes |
| GET | /nhan-vien/get-all | List all staff accounts. | Yes |
| GET | /nhan-vien/get-nhan-vien | Get the current staff account. | Yes |
| GET | /nhan-vien/get-all-chu-san | List staff by venue owner scope. | Yes |
| GET | /nhan-vien/kiem-tra-nhan-vien | Check the current staff account. | Yes |

### Admin: /admin

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| GET | /admin/kiem-tra-admin | Check the current admin account. | Yes |

### Venues: /san

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| POST | /san/them-san | Create a sports facility and upload hinh_anh to S3. | Yes |
| PUT | /san/cap-nhat-san | Update a sports facility and optionally replace hinh_anh. | Yes |
| DELETE | /san/xoa-san/:id | Delete a sports facility by id. | No |
| GET | /san/lay-tat-ca | List facilities for the current owner. | Yes |
| GET | /san/lay-tat-ca-chu-san-open | List owner facilities in open mode. | Yes |
| GET | /san/lay-tat-ca-open | List all public facilities. | No |
| GET | /san/lay-san-theo-id/:id | Get facility details by id. | No |

### Venue positions: /vi-tri-san

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| POST | /vi-tri-san/them-vi-tri-san | Create a position or court. | Yes |
| PUT | /vi-tri-san/cap-nhat-vi-tri-san | Update a position or court. | No |
| DELETE | /vi-tri-san/xoa-vi-tri-san/:id | Delete a position or court by id. | No |
| GET | /vi-tri-san/lay-tat-ca | List all positions or courts. | No |
| GET | /vi-tri-san/lay-vi-tri-san-chu-san | List positions for the current owner. | Yes |
| GET | /vi-tri-san/lay-vi-tri-san-nhan-vien | List positions for the current staff user. | Yes |

### Services: /dich-vu

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| GET | /dich-vu/lay-tat-ca | List all services. | Yes |
| GET | /dich-vu/lay-tat-ca-by-id/:id | Get a service by id. | No |
| GET | /dich-vu/lay-tat-ca-open | List services in open mode. | No |
| POST | /dich-vu/them-dich-vu | Create a service. | No |
| PUT | /dich-vu/cap-nhat-dich-vu | Update a service. | No |
| DELETE | /dich-vu/xoa-dich-vu/:id | Delete a service by id. | No |

### Game types: /mon-choi

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| POST | /mon-choi/them-mon-choi | Create a sport or game type. | No |
| PUT | /mon-choi/cap-nhat-mon-choi | Update a sport or game type. | No |
| DELETE | /mon-choi/xoa-mon-choi/:id | Delete a sport or game type by id. | No |
| GET | /mon-choi/lay-mon-choi | List all sport or game types. | No |
| GET | /mon-choi/lay-mon-choi-open | List sport or game types in open mode. | No |

### Discount codes: /ma-giam-gia

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| POST | /ma-giam-gia/them-ma-giam-gia | Create a discount code. | No |
| PUT | /ma-giam-gia/cap-nhat-ma-giam-gia | Update a discount code. | No |
| DELETE | /ma-giam-gia/xoa-ma-giam-gia/:id | Delete a discount code by id. | No |
| GET | /ma-giam-gia/lay-ma-giam-gia | List discount codes. | Yes |
| POST | /ma-giam-gia/kiem-tra-ma-giam-gia | Validate a discount code. | No |

### Ratings: /danh-gia

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| POST | /danh-gia/them-moi-danh-gia | Create a rating. | Yes |
| PUT | /danh-gia/cap-nhat-danh-gia | Update a rating. | Yes |
| DELETE | /danh-gia/xoa-danh-gia/:id | Delete a rating by id. | Yes |
| GET | /danh-gia/lay-du-lieu | List ratings. | No |

### Notifications: /thong-bao

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| POST | /thong-bao/them-thong-bao | Create a notification. | Yes |
| PUT | /thong-bao/cap-nhat-thong-bao | Update a notification. | Yes |
| DELETE | /thong-bao/delete-thong-bao/:id | Delete a notification by id. | Yes |
| GET | /thong-bao/lay-thong-bao | List notifications for the current user. | Yes |
| GET | /thong-bao/lay-thong-bao-open | List public notifications. | Yes |
| POST | /thong-bao/gui-thong-bao | Send notification emails to facility users. | Yes |

### Bookings: /dat-san

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| POST | /dat-san/thanh-toan/ | Create booking records and generate a PayOS checkout link. | Optional auth through verifyTokenDatSan |
| GET | /dat-san/check-thanh-toan/:id_san | Handle PayOS payment return or cancel for a facility. | No |
| POST | /dat-san/check-thanh-toan/:id_san | Handle PayOS payment return or cancel for a facility. | No |
| GET | /dat-san/lich-su-dat-san | Get booking history for the current user. | Yes |
| GET | /dat-san/lich-su-dat-san-nhan-vien | Get booking history for the current staff user. | Yes |
| GET | /dat-san/lich-su-dat-san-chu-san | Get booking history for the current owner. | Yes |

### Events: /su-kien

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| GET | /su-kien/lay-tat-ca | List events for the current owner context. | Yes |
| GET | /su-kien/lay-tat-ca-open | List open events and current participation state. | Yes |
| POST | /su-kien/them-su-kien | Create an event. | Yes |
| POST | /su-kien/tham-gia-su-kien | Join an event and generate a PayOS checkout link. | Yes |
| PUT | /su-kien/cap-nhat-su-kien | Update an event. | Yes |
| DELETE | /su-kien/xoa-su-kien/:id | Delete an event by id. | Yes |
| POST | /su-kien/check-thanh-toan/ | Handle PayOS payment return or cancel for an event. | No |
| GET | /su-kien/check-thanh-toan/ | Handle PayOS payment return or cancel for an event. | No |

### Statistics: /thong-ke

| Method | Path | Description | Protected |
| --- | --- | --- | --- |
| GET | /thong-ke/dat-san | Booking count per facility for the current owner. | Yes |
| GET | /thong-ke/doanh-thu | Revenue per facility for the current owner. | Yes |
| GET | /thong-ke/su-kien | Event participation count for the current owner. | Yes |

## 6. Environment Variables

No .env.example file exists in the repository. The variables below are referenced directly in code.

### Backend variables

| Variable | Used by | Purpose |
| --- | --- | --- |
| DB_HOST | db.js, config/config.js, app.js debug log, test-db.js | PostgreSQL host. |
| DB_USER | db.js, config/config.js, test-db.js | PostgreSQL username. |
| DB_PASSWORD | db.js, config/config.js, test-db.js | PostgreSQL password. |
| DB_NAME | db.js, config/config.js, test-db.js | PostgreSQL database name. |
| DB_PORT | db.js, config/config.js | PostgreSQL port. |
| PORT | bin/www | Express listen port. Optional; defaults to 3000. |
| JWT_ACCESS_KEY | middleware/authMiddleware.js, controllers/authController.js | Signs and verifies access tokens. |
| JWT_REFRESH_KEY | controllers/authController.js, middleware/authMiddleware.js | Signs and verifies refresh tokens. |
| JWT_EMAIL_SECRET | controllers/authController.js | Signs and verifies registration email tokens. |
| CLIENT_ID | controllers/datsanController.js, controllers/sukienController.js | PayOS client id. |
| API_KEY | controllers/datsanController.js, controllers/sukienController.js | PayOS API key. |
| CHECKSUM_KEY | controllers/datsanController.js, controllers/sukienController.js | PayOS checksum key. |
| AWS_REGION | routes/san.js | AWS region for the S3 client. Defaults to us-west-2 if missing. |
| AWS_ACCESS_KEY_ID | routes/san.js | AWS access key for S3 uploads. |
| AWS_SECRET_ACCESS_KEY | routes/san.js | AWS secret key for S3 uploads. |
| S3_BUCKET_NAME | routes/san.js | S3 bucket used for venue images. |

### Frontend variables

| Variable | Used by | Purpose |
| --- | --- | --- |
| VITE_API_URL | src/utils/http.js, src/page/DanhSachSan.jsx, src/page/MapBox.jsx, src/page/ChuSan/QuanLySan.jsx | Base URL of the backend API and image URLs. |
| VITE_MAPBOX_TOKEN | src/page/MapBox.jsx | Mapbox access token. |

### Notes

- Email credentials are hard-coded in controllers and are not yet moved to environment variables.
- The backend expects a file named global-bundle.pem in the backend root for PostgreSQL SSL in config/config.js. The repository currently includes global-bundle.pem.save, so the real PEM file still needs to be present or restored.

## 7. How to Run

The two apps are separate, so start the backend first and then the frontend.

### Backend: Project_G7_BE

1. Open a terminal in Project_G7_BE.
2. Install dependencies.

   npm install

3. Create a .env file in Project_G7_BE and fill in the backend variables listed above.
4. Make sure global-bundle.pem exists in Project_G7_BE if you want the Sequelize SSL configuration to work.
5. Run database migrations.

   npx sequelize-cli db:migrate

6. Optionally run seeders if you want sample data. The repository has seeded data files in seeders/.
7. Start the backend server.

   npm start

### Frontend: Project_G7_FE

1. Open a second terminal in Project_G7_FE.
2. Install dependencies.

   npm install

3. Create a .env file in Project_G7_FE and set VITE_API_URL and VITE_MAPBOX_TOKEN.
4. Start the frontend development server.

   npm run dev

### Local development notes

- The backend CORS origin is hard-coded to https://lnnhatthanh.id.vn in app.js. For local development, this must be changed to your local frontend origin before browser requests will succeed.
- PayOS return and cancel URLs in controllers/datsanController.js and controllers/sukienController.js are hard-coded to production CloudFront URLs, so local payment callback testing will redirect there unless those URLs are updated.

## 8. Architecture Notes

- The backend follows a standard Express request flow: routes in routes/ map HTTP requests to controller methods, controllers execute business logic, and models or raw SQL queries access PostgreSQL.
- Sequelize is used for the main domain models, while some reporting and history queries use raw SQL through sequelize.query or the pg Pool helper in db.js.
- models/index.js loads all Sequelize models automatically and then calls each model's associate method to wire foreign keys and relationships.
- Auth uses JWT access tokens in the Authorization header and refresh tokens in an httpOnly cookie. middleware/authMiddleware.js validates protected requests and attaches req.user.
- Booking and event payment flows create database records first, then generate a PayOS checkout link. The controllers also schedule a timeout that removes unpaid records after a short delay.
- Venue images are uploaded with multer and stored in S3 through multer-s3. The frontend renders those images using the VITE_API_URL plus the uploads/images path.
- Notifications can be created in the database and also sent by email through Nodemailer.
- The frontend composes routes from router/routerNguoiDung.jsx, router/routerChuSan.jsx, router/routerNhanVien.jsx, and router/routerAdmin.jsx, then wraps them with layout and role-check components from kiemtra/.
- Redux store configuration in src/store.jsx combines slices for the main entities: page, chuSan, admin, nguoiDung, san, monchoi, magiamgia, dichvu, thongbao, vitrisan, map, nhanvien, danhgia, sukien, and thongke.
- MapBox integration reads VITE_MAPBOX_TOKEN on the frontend and uses venue data and icons from the backend API.

## 9. Not Yet Implemented

- A shared .env.example file is not present.
- Email credentials are still hard-coded in source instead of being loaded from environment variables.
- Local-development-friendly CORS and callback URLs are not yet parameterized.

If you want, I can also generate a compact OpenAPI spec from the route list or split this into separate backend and frontend READMEs.
>>>>>>> Stashed changes
