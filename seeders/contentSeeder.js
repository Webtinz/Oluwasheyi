const sequelize = require('../src/config/database');
const path = require('path');
const fs = require('fs');

sequelize.sync()
    .then(() => {
        console.log('La base de données a été synchronisée');
    })
    .catch((error) => {
        console.error('Erreur lors de la synchronisation:', error);
    });

// Read the SQL file
const sqlFilePath = path.join(__dirname, "content.sql");
const seedQuery = fs.readFileSync(sqlFilePath, "utf8");

// Run the SQL query
async function seedDatabase() {
    try {
        await sequelize.query(seedQuery);
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error executing SQL file:", error);
    } finally {
        await sequelize.close();
    }
}

seedDatabase();