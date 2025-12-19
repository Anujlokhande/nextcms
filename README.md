# NextCMS 

A full-stack Content Management System (CMS) built using **Next.js App Router**, **NextAuth**, **Prisma**, and **MongoDB**.  
The platform supports authentication, role-based access (admin/user), blog creation, drafts, search, and admin management.

---

##  Features

- User Authentication (Sign Up / Sign In) using NextAuth
- Role-based access (Admin & User)
- Create, edit, delete, and publish blogs
- Draft support
- Blog search and filtering
- Admin dashboard for managing users and posts
- Image upload with Cloudinary
- Rate-limited API routes
- SEO-friendly dynamic routing
- Modern UI with reusable components

---

##  Tech Stack

- **Frontend:** Next.js 14 (App Router), React
- **Backend:** Next.js API Routes
- **Authentication:** NextAuth.js
- **Database:** MongoDB
- **ORM:** Prisma
- **Image Uploads:** Cloudinary
- **Styling:** Tailwind CSS
- **Rate Limiting:** Custom middleware

---

##  Application Routes (Pages)

### Public Routes
| Route | Description |
|------|------------|
| `/` | Home page |
| `/blogs` | View all published blogs |
| `/blog/[slug]` | Single blog page |
| `/search` | Search blogs |
| `/user/[slug]` | User profile and blogs |

### Authentication Routes
| Route | Description |
|------|------------|
| `/sign-in` | User login |
| `/sign-up` | User registration |

### User Dashboard
| Route | Description |
|------|------------|
| `/dashboard` | User dashboard |
| `/draft` | All drafts |
| `/draft/[slug]` | Edit draft |

### Admin Routes
| Route | Description |
|------|------------|
| `/posts` | Manage all posts |
| `/users` | Manage users |

---

##  API Routes

### Auth
| Method | Endpoint | Description |
|------|---------|------------|
| `GET/POST` | `/api/auth/[...nextauth]` | Authentication handlers |

### Blog APIs
| Method | Endpoint | Description |
|------|---------|------------|
| `POST` | `/api/v1/create` | Create a blog |
| `GET` | `/api/v1/get` | Get all blogs |
| `GET` | `/api/v1/get/[slug]` | Get single blog |
| `PUT` | `/api/v1/update/[slug]` | Update blog |
| `DELETE` | `/api/v1/delete/[id]` | Delete blog |
| `GET` | `/api/v1/search` | Search blogs |
| `GET` | `/api/v1/state` | Blog stats |

### Upload
| Method | Endpoint | Description |
|------|---------|------------|
| `POST` | `/api/upload` | Image upload |

### Open Graph
| Method | Endpoint | Description |
|------|---------|------------|
| `GET` | `/api/og` | Dynamic OG image generation |

---

##  Middleware

- API rate limiting
- Origin validation
- Role-based access control

---

## ⚙️ Setup & Installation

```bash
git clone https://github.com/Anujlokhande/nextcms.git
cd nextcms
npm install
