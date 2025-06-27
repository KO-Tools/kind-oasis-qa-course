# Kind Oasis Manufacturing Quality Assurance Course

Interactive online training platform for cannabis manufacturing quality assurance, featuring comprehensive modules covering regulatory compliance, cGMP fundamentals, testing protocols, and quality culture development.

## Features

- 14 comprehensive training modules with interactive elements
- Advanced interactive tools: Risk Matrix, FMEA Calculator, Facility Designer, HACCP Decision Tree
- Progress tracking and quiz system with 75% passing threshold
- Mobile-responsive design with collapsible sidebar
- Certificate generation upon course completion
- In-memory storage for development with easy database migration

## Quick Install

```bash
# Clone the repository
git clone https://github.com/yourusername/kind-oasis-qa-course.git
cd kind-oasis-qa-course

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5000`

## Installation Options

### Option 1: Local Development
```bash
npm install
npm run dev
```

### Option 2: Production Build
```bash
npm install
npm run build
npm start
```

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js, TypeScript, in-memory storage
- **Build**: Vite development server with hot module replacement
- **Styling**: CSS custom properties for brand colors, responsive design

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── lib/            # Utilities and course data
│   │   └── hooks/          # Custom React hooks
├── server/                 # Express backend
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data storage interface
│   └── index.ts            # Server entry point
├── shared/                 # Shared TypeScript schemas
└── package.json
```

## Key Components

### Interactive Learning Tools
- **Risk Matrix**: Cost of quality impact visualization
- **FMEA Calculator**: Risk Priority Number calculations
- **Facility Designer**: GMP facility layout tool
- **HACCP Decision Tree**: Quality control navigation
- **Risk Assessment Flowchart**: Process risk evaluation
- **THC Calculator**: Cannabis compliance calculations

### Course Modules
1. Process Quality Assurance (Overview)
2. Product Quality Assurance (Interactive Tools)
3. Document Management
4. Risk Management 
5. Nonconformance & Deviation Management
6. GMP Fundamentals
7-14. Additional specialized modules

## Configuration

The application uses environment variables for configuration:
- `NODE_ENV`: Development or production mode
- `PORT`: Server port (default: 5000)

## Development

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Run type checking
npm run type-check

# Build for production
npm run build
```

## Deployment

The application is designed for easy deployment on platforms like:
- Replit Deployments
- Vercel
- Netlify
- Railway
- Heroku

For production deployment, ensure you configure persistent storage if needed.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.