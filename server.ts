import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database('velocity.db');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    category TEXT,
    images TEXT, -- JSON array
    colors TEXT, -- JSON array
    sizes TEXT,  -- JSON array
    isNew INTEGER DEFAULT 0,
    isBestSeller INTEGER DEFAULT 0,
    athlete TEXT
  )
`);

// Seed Data if empty
const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (count.count === 0) {
  const products = [
    {
      id: 'v-1',
      name: 'AERO-MAX X1',
      brand: 'VELOCITY',
      price: 240,
      description: 'Engineered for explosive speed and unparalleled comfort. The X1 features our proprietary Carbon-Fiber plate and React-Foam technology.',
      category: 'Running',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1000'
      ]),
      colors: JSON.stringify(['Red/Black', 'Neon Green', 'Stealth Black']),
      sizes: JSON.stringify([7, 8, 9, 10, 11, 12]),
      isNew: 1,
      isBestSeller: 1,
      athlete: 'Eliud Kipchoge'
    },
    {
      id: 'v-2',
      name: 'TITAN COURT',
      brand: 'VELOCITY',
      price: 190,
      description: 'Dominate the hardwood with the Titan Court. High-top support meets low-profile responsiveness for the ultimate basketball experience.',
      category: 'Basketball',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1512374382149-4332c6c021f1?auto=format&fit=crop&q=80&w=1000'
      ]),
      colors: JSON.stringify(['Lakers Gold', 'Royal Blue', 'Classic White']),
      sizes: JSON.stringify([8, 9, 10, 11, 12, 13, 14]),
      isNew: 0,
      isBestSeller: 1,
      athlete: 'LeBron James'
    },
    {
      id: 'v-3',
      name: 'URBAN PULSE',
      brand: 'VELOCITY',
      price: 160,
      description: 'The perfect blend of street style and athletic performance. Designed for the modern urban explorer.',
      category: 'Lifestyle',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1000'
      ]),
      colors: JSON.stringify(['Sandstone', 'Midnight Gray', 'Forest Green']),
      sizes: JSON.stringify([6, 7, 8, 9, 10, 11, 12]),
      isNew: 1,
      isBestSeller: 0,
      athlete: null
    },
    {
      id: 'v-4',
      name: 'CORE TRAINER 360',
      brand: 'VELOCITY',
      price: 130,
      description: 'Versatile training shoe for high-intensity workouts. Stable base with multi-directional traction.',
      category: 'Training',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=1000'
      ]),
      colors: JSON.stringify(['Volt', 'Black/White', 'Crimson']),
      sizes: JSON.stringify([7, 8, 9, 10, 11, 12, 13]),
      isNew: 0,
      isBestSeller: 0,
      athlete: null
    },
    {
      id: 'v-5',
      name: 'ZENITH RUNNER',
      brand: 'VELOCITY',
      price: 210,
      description: 'Ultra-lightweight marathon shoe. Every gram counts when you are chasing your personal best.',
      category: 'Running',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000'
      ]),
      colors: JSON.stringify(['Cloud White', 'Solar Red']),
      sizes: JSON.stringify([7, 8, 9, 10, 11, 12]),
      isNew: 1,
      isBestSeller: 0,
      athlete: null
    },
    {
      id: 'v-6',
      name: 'APEX LIFT',
      brand: 'VELOCITY',
      price: 150,
      description: 'The ultimate weightlifting shoe. Solid heel for maximum stability during heavy squats and cleans.',
      category: 'Training',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=1000'
      ]),
      colors: JSON.stringify(['Iron Gray', 'Raw Umber']),
      sizes: JSON.stringify([8, 9, 10, 11, 12, 13]),
      isNew: 0,
      isBestSeller: 1,
      athlete: null
    }
  ];

  const insert = db.prepare(`
    INSERT INTO products (id, name, brand, price, description, category, images, colors, sizes, isNew, isBestSeller, athlete)
    VALUES (@id, @name, @brand, @price, @description, @category, @images, @colors, @sizes, @isNew, @isBestSeller, @athlete)
  `);

  for (const p of products) {
    insert.run(p);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/products', (req, res) => {
    const products = db.prepare('SELECT * FROM products').all().map((p: any) => ({
      ...p,
      images: JSON.parse(p.images),
      colors: JSON.parse(p.colors),
      sizes: JSON.parse(p.sizes),
      isNew: !!p.isNew,
      isBestSeller: !!p.isBestSeller
    }));
    res.json(products);
  });

  app.get('/api/products/:id', (req, res) => {
    const product: any = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    res.json({
      ...product,
      images: JSON.parse(product.images),
      colors: JSON.parse(product.colors),
      sizes: JSON.parse(product.sizes),
      isNew: !!product.isNew,
      isBestSeller: !!product.isBestSeller
    });
  });

  app.post('/api/orders', (req, res) => {
    const { items, total, payment } = req.body;
    // In a real app, we would save this to an 'orders' table
    console.log('New Order Received:', { items, total, payment });
    res.status(201).json({ success: true, orderId: Math.random().toString(36).substr(2, 9).toUpperCase() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
