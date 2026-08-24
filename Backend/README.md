# Jagdamba Optical Backend + Admin Panel

Production-oriented Express + PostgreSQL backend designed for deployment on Render and connection to the Jagdamba Optical frontend on Vercel.

## Included
- REST API
- PostgreSQL schema + automatic startup migration
- Admin JWT login
- Customer registration/login
- Product CRUD + stock + price + categories
- Customer order creation with stock locking/decrement
- Order status and payment-status management
- Customer list and lifetime spend
- Customer inquiry/support messages
- Dashboard statistics
- Category management
- Optional Cloudinary signed image-upload configuration
- Secure headers, CORS and rate limiting
- Responsive admin panel at `/admin`

## Render deployment
1. Create a PostgreSQL database in Render.
2. Create a **Web Service** from this GitHub repository.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add environment variables from `.env.example`.
6. Set `DATABASE_URL` to the Render PostgreSQL **Internal Database URL** when both services are in the same Render account/region.
7. Set a long random `JWT_SECRET`.
8. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
9. Set `CORS_ORIGIN` to your Vercel frontend URL.
10. Deploy.

The database tables and starter categories/products are created automatically on startup.

## Admin panel
After deployment open:
`https://YOUR-RENDER-SERVICE.onrender.com/admin`

Login with the `ADMIN_EMAIL` and `ADMIN_PASSWORD` configured in Render.

## Main API endpoints
- `POST /api/auth/admin/login`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/categories`
- `POST /api/orders`
- `POST /api/inquiries`
- `GET /api/admin/dashboard`
- `GET/POST/PUT/DELETE /api/admin/products`
- `GET/PUT /api/admin/orders`
- `GET /api/admin/customers`
- `GET/PUT /api/admin/inquiries`
- `GET/POST /api/admin/categories`

## Connecting the Vercel frontend
Set your API base URL in the frontend JavaScript, for example:
`https://YOUR-RENDER-SERVICE.onrender.com/api`

Then use `GET /api/products` to load products and `POST /api/orders` for checkout.

## Image uploads
Render's local filesystem should not be used as permanent product-image storage. If you need admin image upload, create a Cloudinary account and set:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Then the admin can use `/api/admin/upload-signature` to obtain a signed browser-upload payload.

## Production notes
- Change the default admin password immediately.
- Keep `.env` out of GitHub.
- Use HTTPS URLs for CORS in production.
- Payment gateway is not included in this starter; COD is supported. For online payments, add Razorpay/Stripe after the basic order flow is verified.
