# RecordHub

<div align="center">

![RecordHub](https://img.shields.io/badge/RecordHub-Record%20Management-black?style=for-the-badge)

A full-stack record management application built for the **House of EdTech Full Stack Developer Assignment**.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](https://record-hub.vercel.app) · [GitHub](https://github.com/officialsayandeeppaul/RecordHub)

</div>

---

## Features

- **Full CRUD Operations** - Create, read, update, and delete records with validation
- **User Authentication** - Secure sign up/sign in with NextAuth.js and bcrypt password hashing
- **Categories** - Organize records with custom categories, colors, and icons
- **Search & Filter** - Filter records by status, priority, category, and search by title
- **Dashboard** - Overview of your records with statistics
- **Responsive Design** - Works on desktop and mobile devices
- **Due Date Tracking** - Set and track deadlines for your records

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Database** | PostgreSQL + Prisma ORM |
| **Authentication** | NextAuth.js v5 (Auth.js) |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Validation** | Zod |
| **Forms** | React Hook Form |
| **Font** | Poppins (Google Fonts) |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/recordhub?schema=public"

# NextAuth
AUTH_SECRET="your-super-secret-key-min-32-chars"
AUTH_URL="http://localhost:3000"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM_NAME="RecordHub"
SMTP_FROM_EMAIL="noreply@recordhub.app"
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/officialsayandeeppaul/recordhub.git
cd recordhub
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── records/       # Records CRUD endpoints
│   │   ├── categories/    # Categories CRUD endpoints
│   │   └── dashboard/     # Dashboard stats endpoint
│   ├── auth/              # Auth pages (signin, signup)
│   ├── dashboard/         # Dashboard page
│   ├── records/           # Records pages
│   ├── categories/        # Categories page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components (navbar, footer)
│   ├── records/          # Record-specific components
│   ├── categories/       # Category-specific components
│   └── providers/        # Context providers
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   ├── utils.ts          # Helper utilities
│   ├── hooks/            # Custom React hooks
│   └── validations/      # Zod schemas
└── types/                # TypeScript type definitions
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth handlers

### Records
- `GET /api/records` - List records (with pagination, filtering)
- `POST /api/records` - Create record
- `GET /api/records/[id]` - Get single record
- `PATCH /api/records/[id]` - Update record
- `DELETE /api/records/[id]` - Delete record

### Categories
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category
- `PATCH /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT-based session management
- Input validation and sanitization with Zod
- CSRF protection via NextAuth
- SQL injection prevention via Prisma
- XSS protection via React's built-in escaping

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy!

### Docker

```dockerfile
# Coming soon
```

## 🗺️ Application Routes

### Public Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with features overview |
| `/auth/signin` | User sign in page |
| `/auth/signup` | User registration page |

### Protected Routes (Requires Authentication)

| Route | Description |
|-------|-------------|
| `/dashboard` | Main dashboard with stats and recent activity |
| `/records` | List all records with search and filters |
| `/records/new` | Create a new record |
| `/records/[id]` | View record details |
| `/records/[id]/edit` | Edit existing record |
| `/categories` | Manage categories |
| `/profile` | User profile information |
| `/settings` | Application settings |

## 📚 Documentation

### Database Schema

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String?
  image         String?
  role          Role      @default(USER)
  records       Record[]
  categories    Category[]
}

model Record {
  id          String      @id @default(cuid())
  title       String
  description String?
  content     String?
  status      Status      @default(ACTIVE)
  priority    Priority    @default(MEDIUM)
  dueDate     DateTime?
  tags        String[]
  category    Category?
}

model Category {
  id          String   @id @default(cuid())
  name        String
  description String?
  color       String   @default("#6366f1")
  icon        String   @default("folder")
  records     Record[]
}

```

### Status & Priority Enums

| Status | Description |
|--------|-------------|
| `ACTIVE` | Currently active record |
| `PENDING` | Awaiting action |
| `COMPLETED` | Finished/resolved |
| `ARCHIVED` | No longer active |

| Priority | Description |
|----------|-------------|
| `LOW` | Can wait |
| `MEDIUM` | Normal priority |
| `HIGH` | Important |
| `URGENT` | Requires immediate attention |

## 🔒 Security Features

- ✅ Password hashing with bcrypt (12 rounds)
- ✅ JWT-based session management
- ✅ Input validation and sanitization with Zod
- ✅ CSRF protection via NextAuth
- ✅ SQL injection prevention via Prisma
- ✅ XSS protection via React's built-in escaping

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
AUTH_SECRET="your-production-secret-min-32-chars"
AUTH_URL="https://your-domain.com"
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

**Sayandeep Paul**

- GitHub: [github.com/officialsayandeeppaul](https://github.com/officialsayandeeppaul)
- LinkedIn: [linkedin.com/in/sayandeeppaul](https://linkedin.com/in/sayandeeppaul)

---

*Built for House of EdTech Full Stack Developer Assignment - December 2024*
