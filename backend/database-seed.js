// Add required files
const mongoose = require("mongoose");
const Category = require("./models/categoryModel");
const Product= require("./models/productModel"); 
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


//Predefined Products
const products = [
  {
    name: "DYVLINGE",
    image: "https://www.ikea.com/us/en/images/products/dyvlinge-swivel-chair-kelinge-orange__1322496_pe942190_s5.jpg?f=xxs",
    brand: "Ikea",
    quantity: 13,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Swivel chair, Kelinge orange",
    reviews: [
      {
        name: "John Doe",
        rating: 5,
        comment: "This product is excellent! I really enjoyed using it.",
        user: "679bad8c1966459a0cddd0ce" // actual ObjectId from MongoDB
      }
    ],
    rating: 5,
    numReviews: 1,
    price: 199.99,
    countInStock: 10,
  },
  {
    name: "Atmosphera",
    image: "https://gs.com.lb/media/catalog/product/cache/232017014910326b8b0a0ffa34e68891/-/_/-_0215_dhjjaypcbnana0199os_1.jpg",
    brand: "GS",
    quantity: 12,
    category: "67a0b7a9d7455824ec57d69d", // actual category id from MongoDB
    description: "The coziest black coffee table out there!",
    reviews: [
      {
        name: "John Doe",
        rating: 5,
        comment: "This table is just beautiful! My wife loves it.",
        user: "679bad8c1966459a0cddd0ce" // actual ObjectId from MongoDB
      }
    ],
    rating: 5,
    numReviews: 1,
    price: 110.00,
    countInStock: 8,
  },
 
];

async function seedProducts() {
  try {
    // Connect to the database
    await connectToDatabase();

    // (Optional) Clear out existing products if you want a fresh start.
    await Product.deleteMany();
    console.log("Existing products cleared.");

    // Seed the products array into the database
    for (let product of products) {
      await Product.create(product);
    }

    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    // Close the connection after seeding
    mongoose.connection.close();
  }
}


//TODO: Consider refactoring, error in this function not all products were added to the database
/*
async function seedCategoriesAndProducts() {
  try {
    // Ensure the database connection is established
    await database.connectToDatabase();

    // Check if any categories already exist
    const existingCategories = await Category.find({});

    if (existingCategories.length === 0) {
      // If no categories exist, add them
      for (let categoryName of categories) {
        await Category.create({ name: categoryName });
        console.log(`${categoryName} category added successfully!`);
      }
    } else {
      console.log("Categories already exist. Skipping category seeding.");
    }

    // Loop over products and insert them into the database
    for (let product of products) {
      // Directly insert the product as it already has the category ID
      await Product.create(product);
      console.log(`Product ${product.name} added successfully!`);
    }

    mongoose.connection.close(); // Close the connection after seeding
  } catch (err) {
    console.error("Error seeding categories and products:", err);
    mongoose.connection.close();
  }
}
*/

// Call the function to seed categories and products
seedCategoriesAndProducts();


