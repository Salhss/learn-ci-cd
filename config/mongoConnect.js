const mongoose = require("mongoose");

// Fungsi untuk menghubungkan ke MongoDB Atlas
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.DB_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Gagal terhubung ke MongoDB Atlas:", error);
    process.exit(1); // Keluar dari proses jika koneksi gagal
  }
}

module.exports = connectToMongoDB;
