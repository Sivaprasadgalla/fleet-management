const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./lib/ConnectDB");
const userRoutes = require('./routes/user.routes')
const driverRoutes =require('./routes/driver.route');
const { auth } = require("./middleware/authentication/auth");
const authorize = require("./middleware/authentication/authorize");
const vehicleRoutes =require('./routes/vehicle.route')
const customerRoutes =require('./routes/customer.route')
const bookingRoutes =require('./routes/booking.route')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Fleet management API running" });
})

//define routes
app.use('/user',userRoutes)
app.use('/driver',auth,authorize('admin','user'),driverRoutes)
app.use('/vehicle',auth,authorize('admin','user'),vehicleRoutes)
app.use('/customer',auth,authorize('admin','user'),customerRoutes)
app.use('/booking',auth,authorize('admin','user'),bookingRoutes)

app.listen(PORT, () => {
    console.log(`Server running in port : ${PORT}`)
});
