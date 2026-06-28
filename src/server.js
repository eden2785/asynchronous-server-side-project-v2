import express, { json } from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from './routes/user.router.js';
import costRouter from './routes/cost.router.js';
import aboutRouter from './routes/about.router.js';
import connectDB from './config/database.config.js';
import { errorHandler } from './middleware/error.middleware.js';
import { getAbout } from './controllers/about.controller.js';
import costController from './controllers/cost.controller.js';
const { getMonthlyReport, addCost } = costController;

// 🛠 הגדרת __dirname ל-ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🌱 טעינת משתני סביבה
config();

const main = async () => {
  await connectDB();
  const app = express();

  // 📁 הגשת קבצים סטטיים (CSS, תמונות וכו') מתוך /public
  app.use(express.static(path.join(__dirname, 'public')));

  // 🏠 דף הבית – שליחה של index.html מתוך views
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  });

  // 🧱 Middleware
  app.use(json());
  app.use(morgan('dev'));
  app.use(errorHandler);

  // 📌 הגדרת ראוטים
  app.use('/api/users', userRouter);
  app.use('/api/costs', costRouter);
  app.use('/api/about', aboutRouter);
  app.get('/api/about/', getAbout);
  app.get('/api/report/', getMonthlyReport);
  app.post('/api/add/', addCost);

  // 🚀 הרצת השרת
  const PORT = process.env.PORT || 5000;
  return app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
};

main();
