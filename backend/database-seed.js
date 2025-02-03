// Add required files
const mongoose = require("mongoose");
const Category = require("./models/categoryModel"); 
const database= require("./database"); 

// Predefined furniture categories
const categories = [
  "Sofa",
  "Table",
  "Chair",
  "Bed",
  "Storage",
  "Desk",
  "Lighting",
  "Shelving",
  "Rugs",
  "Decor",
];

async function seedCategories() {
  try {
    // Ensure the database connection is established
    await database.connectToDatabase();

    // Check if any categories already exist
    const existingCategories = await Category.find({});

    if (existingCategories.length === 0) {
      // If no categories exist, add them
      for (let categoryName of categories) {
        await Category.create({ name: categoryName });
      }
      console.log("Furniture categories added successfully!");
    } else {
      console.log("Categories already exist. Skipping seeding.");
    }

    mongoose.connection.close(); // Close the connection after seeding
  } catch (err) {
    console.error("Error seeding categories:", err);
    mongoose.connection.close();
  }
}

seedCategories();
