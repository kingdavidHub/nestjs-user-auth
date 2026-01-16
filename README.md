# NestJS User Authentication API

A robust and scalable user authentication and management REST API built with NestJS, Prisma, and PostgreSQL.

## 📋 Description

This project provides a complete user authentication system with user management capabilities. It demonstrates best practices for building production-ready APIs with NestJS, including:

- User registration and authentication
- Password hashing with bcrypt
- CRUD operations for user management
- Database management with Prisma ORM
- Input validation with class-validator
- Structured error handling
- TypeScript type safety

## ✨ Features

- **Authentication**
  - User registration with email and password
  - User login
  - Password encryption using bcrypt

- **User Management**
  - Get all users or filter by email
  - Get user by ID
  - Update user information
  - Delete user (with TODO for soft delete implementation)

- **Database**
  - PostgreSQL database with Prisma ORM
  - Type-safe database queries
  - Database migrations support

## 🛠️ Tech Stack

- **Framework:** NestJS 11.x
- **Language:** TypeScript 5.x
- **Database:** PostgreSQL
- **ORM:** Prisma 7.x
- **Validation:** class-validator, class-transformer
- **Password Hashing:** bcrypt
- **Testing:** Jest
- **Linting:** ESLint with Prettier

## 📦 Installation

```bash
# Install dependencies
yarn install
```

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
PORT=3000
```

## 🗄️ Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio (Database GUI)
npx prisma studio
```

## 🚀 Running the Application

```bash
# Development mode
yarn start:dev

# Production mode
yarn build
yarn start:prod

# Debug mode
yarn start:debug
```

The API will be available at `http://localhost:3000`

## 📡 API Endpoints

### Authentication

| Method | Endpoint         | Description         | Body                                                         |
| ------ | ---------------- | ------------------- | ------------------------------------------------------------ |
| POST   | `/auth/register` | Register a new user | `{ "email": "user@example.com", "password": "password123" }` |
| POST   | `/auth/login`    | Login user          | `{ "email": "user@example.com", "password": "password123" }` |

### Users

| Method | Endpoint     | Description                      | Query/Params                                                     |
| ------ | ------------ | -------------------------------- | ---------------------------------------------------------------- |
| GET    | `/users`     | Get all users or filter by email | `?email=user@example.com`                                        |
| GET    | `/users/:id` | Get user by ID                   | -                                                                |
| PATCH  | `/users/:id` | Update user                      | `{ "email": "newemail@example.com", "password": "newpassword" }` |
| DELETE | `/users/:id` | Delete user                      | -                                                                |

### Example Requests

**Register a new user:**

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Login:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get all users:**

```bash
curl http://localhost:3000/users
```

**Get user by email:**

```bash
curl http://localhost:3000/users?email=test@example.com
```

## 🧪 Testing

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov

# Watch mode
yarn test:watch
```

## 📁 Project Structure

```
src/
├── auth/              # Authentication module
│   ├── dto/          # Data transfer objects
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/            # Users module
│   ├── dto/          # Data transfer objects
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── prisma/           # Prisma service
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── helpers/          # Helper utilities
│   ├── bcryptHelper.ts
│   └── helpers.module.ts
├── generated/        # Prisma generated client
├── app.module.ts     # Root module
└── main.ts           # Application entry point
```

## 🔒 Security Features

- Password hashing using bcrypt with configurable salt rounds
- Input validation using class-validator decorators
- Type-safe database queries with Prisma
- Environment variable configuration

## 🚧 TODO

- [ ] Implement JWT authentication
- [ ] Add refresh token mechanism
- [ ] Implement soft delete for users
- [ ] Add role-based access control (RBAC)
- [ ] Add email verification
- [ ] Add password reset functionality
- [ ] Implement rate limiting
- [ ] Add API documentation with Swagger
- [ ] Add comprehensive error handling with exception filters

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is [UNLICENSED](LICENSE).

## 🔗 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## 👤 Author

**kingdavidHub**

- GitHub: [@kingdavidHub](https://github.com/kingdavidHub)

---

Built with ❤️ using NestJS

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
