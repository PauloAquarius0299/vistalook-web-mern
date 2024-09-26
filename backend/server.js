const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require('./routes/admin/products-router');
const adminOrderRouter = require('./routes/admin/order-routes');
const shopProductsRouter = require('./routes/shop/product-router');
const shopCartRouter = require('./routes/shop/cart-routes');
const shopAddressRouter = require('./routes/shop/address-router');
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");

// Conexão com MongoDB
mongoose.connect('mongodb+srv://paulocgsantos99:paulo99@cluster0.6v3gk.mongodb.net/')
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: [
    "Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"
  ],
  credentials: true,
  preflightContinue: false
}));

app.use(cookieParser());
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Rotas API
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/review', shopReviewRouter);
app.use('/api/common/feature', commonFeatureRouter);

// Rota para single page application
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Inicializar servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
