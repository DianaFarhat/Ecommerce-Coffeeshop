

const mongoose = require("mongoose");
const Category = require("./models/categoryModel");
const Product = require("./models/productModel"); 
const database = require("./database");
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

const chairs = [
  {
    name: "Atmosphera",
    image: "https://ouchcart.com/cdn/shop/products/Hendrix_Upholstered_Barrel_Chair.webp?v=1721373746&width=700",
    brand: "GS",
    quantity: 12,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Defining piece!",
    reviews: [
      {
        name: "John Doe",
        rating: 5,
        comment: "This chair is just beautiful! My wife loves it.",
        user: "679bad8c1966459a0cddd0ce" // actual ObjectId from MongoDB
      }
    ],
    rating: 5,
    numReviews: 1,
    price: 110.00,
    countInStock: 8,
    isBundle: false,
    bundleId: null // Not part of any bundle
  },
  {
    name: "Leisure Chair",
    image: "https://europeanhousehold.com/cdn/shop/files/Untitleddesign-2024-05-22T131648.459.png?v=1716375040&width=1080",
    brand: "EU Household",
    quantity: 17,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Navy blue leisure chair",
    reviews: [
      {
        name: "Diana Farhat",
        rating: 5,
        comment: "Comfiest chair ever",
        user: "679bb5001a45da2ed1f9f1ea" 
      },
      {
        name: "Marwa Bikai",
        rating: 5,
        comment: "Recommended!",
        user: "679bb474fdf36583f7803bfc" 
      },

    ],
    rating: 5,
    numReviews: 2,
    price: 139.00,
    countInStock: 8,
    isBundle: false,
    bundleId: null // Not part of any bundle
  },
  {
    name: "Anastazia Chair",
    image: "https://plus.unsplash.com/premium_photo-1705169612592-32610774a5d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hhaXJ8ZW58MHx8MHx8fDA%3D",
    brand: "Wolves Furniture",
    quantity: 17,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Mustard leisure chair",
    reviews: [
      {
        name: "Diana Farhat",
        rating: 5,
        comment: "Best for after work rest",
        user: "679bb5001a45da2ed1f9f1ea" 
      },
      {
        name: "Marwa Bikai",
        rating: 4,
        comment: "Recommended, the color isn't nice though",
        user: "679bb474fdf36583f7803bfc" 
      },

    ],
    rating: 4.5,
    numReviews: 2,
    price: 139.00,
    countInStock: 8,
    isBundle: false,
    bundleId: null // Not part of any bundle
  },
  {
    name: "Circle Chair",
    image: "https://plus.unsplash.com/premium_photo-1680112806039-244731d88d45?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Wolves Furniture",
    quantity: 17,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Cicle-shaped chair",
    reviews: [
      {
        name: "Diana Farhat",
        rating: 5,
        comment: "My dog loves it",
        user: "679bb5001a45da2ed1f9f1ea" 
      },
      {
        name: "Marwa Bikai",
        rating: 4,
        comment: "Looks good, but not very comfortable to sit in",
        user: "679bb474fdf36583f7803bfc" 
      },

    ],
    rating: 4.5,
    numReviews: 2,
    price: 139.00,
    countInStock: 8,
    isBundle: false,
    bundleId: null // Not part of any bundle
  },
  {
    name: "Kitchen Chair",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Ikea",
    quantity: 13,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Black wooden chair",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 199.99,
    countInStock: 10,
    isBundle: false,
    bundleId: null // Not part of any bundle
  },
  {
    name: "Princessa Chair",
    image: "https://images.unsplash.com/photo-1586158291800-2665f07bba79?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Ikea",
    quantity: 13,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Pink Chair",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 126.00,
    countInStock: 10,
    isBundle: false,
    bundleId: null // Not part of any bundle
  },
  {
    name: "Damak Chair",
    image: "https://plus.unsplash.com/premium_photo-1705169612261-2cf0407141c3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Ikea",
    quantity: 13,
    category: "67a0b7a9d7455824ec57d69f", // actual category id from MongoDB
    description: "Modern chair with a sleek design",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 185.00,
    countInStock: 10,
    isBundle: false,
    bundleId: null // Not part of any bundle
  },
];


const sofas= [
  {
    name: "The Duchess",
    image: "https://m.media-amazon.com/images/I/615V9WOARML._AC_UF894,1000_QL80_.jpg",
    brand: "Williams Sonoma",
    quantity: 12,
    category: "67a0b7a9d7455824ec57d69b", 
    description: "Luxurious purple sofa",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 777.80,
    countInStock: 0,
    isBundle: false,
    bundleId: null 
  },
  {
    name: "Lady Serenity",
    image: "https://www.my-deco-shop.com/1453-15652-thickbox/lotus-sofa-modulable-excellent-confort-assise.jpg",
    brand: "Aoudo",
    quantity: 12,
    category: "67a0b7a9d7455824ec57d69b", 
    description: "Navy blue",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 427.80,
    countInStock: 12,
    isBundle: false,
    bundleId: null 
  },
  {
    name: "Couch Potato",
    image: "https://cdn.knorrweb.com/signature-design-by-ashley-new/80702-16-34-67-08-t913.webp",
    brand: "Aoudo",
    quantity: 12,
    category: "67a0b7a9d7455824ec57d69b", 
    description: "The perfect seating plan to binge-watch your movies, hang out, and just be a couch potato",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 427.80,
    countInStock: 12,
    isBundle: false,
    bundleId: null 
  },
  {
    name: "Bohemian",
    image: "https://www.couchhaus.com/cdn/shop/files/245683217_241127814707443_8451893831527751266_n_1_abb21f58-a352-4a91-ab71-18020e18d6a2.jpg?v=1693686462&width=1080",
    brand: "Aoudo",
    quantity: 12,
    category: "67a0b7a9d7455824ec57d69b", 
    description: "White bohemian style sitting room",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 427.80,
    countInStock: 12,
    isBundle: false,
    bundleId: null 
  },
  {
    name: "Lazy Floor Sofa",
    image: "https://images.thdstatic.com/productImages/71abefb7-ef20-428d-ad60-c8532a08e119/svn/blue-magic-home-sofas-couches-ows-tsa100-31_600.jpg",
    brand: "Home Depot",
    quantity: 12,
    category: "67a0b7a9d7455824ec57d69b", 
    description: "The perfect seating plan to hang out low key on the floor",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 343.80,
    countInStock: 12,
    isBundle: false,
    bundleId: null 
  },
  


];

const lighting= [
  {
    name: "Flow Chandelier",
    image: "https://www.modernspaceliving.com/cdn/shop/products/H9b6ad7ae9f3e43a9b93445c9a0a9bc6ar_600x.jpg?v=1609826987",
    brand: "Williams Sonoma",
    quantity: 12,
    category: "67a0b7aad7455824ec57d6a7", 
    description: "Ebbing and flowing like an everchanging body of water, our Flow Chandelier flows effortlessly into any setting.",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 325.80,
    countInStock: 5,
    isBundle: false,
    bundleId: null 
  },
  {
    name: "Round Around",
    image: "https://www.modernspaceliving.com/cdn/shop/products/H7af00b823b184d4e9d6629c8f6294f37O_600x.jpg?v=1610235922",
    brand: "Williams Sonoma",
    quantity: 12,
    category: "67a0b7aad7455824ec57d6a7", 
    description: "Simple, yet refined, the Round Around Chandelier Light surrounds your living space with its clean circular design. ",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 117.80,
    countInStock: 0,
    isBundle: false,
    bundleId: null 
  },
  {
    name: "Globe Pendant Light",
    image: "https://www.modernspaceliving.com/cdn/shop/products/3f37a188810e1b77ea11a23f55b278a2_600x.jpg?v=1610188637",
    brand: "Home Depot",
    quantity: 12,
    category: "67a0b7aad7455824ec57d6a7", 
    description: "Round globe suspension lamp providing diffused light. Frame in brass, brushed and transparent varnished or chrome steel. Blown glass opal diffuser.",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 325,
    countInStock: 0,
    isBundle: false,
    bundleId: null 
  },
  {
    name: "Eclipse Wall Light",
    image: "https://www.modernspaceliving.com/cdn/shop/files/ModernSimpleCircleLEDWallLightsYedwoDesign_3_400x.webp?v=1689808063",
    brand: "Williams Sonoma",
    quantity: 12,
    category: "67a0b7aad7455824ec57d6a7", 
    description: "Enhance the allure of your living space with our Eclipse Wall Light. Its captivating design and soft, diffused glow create a mesmerizing ambiance, making it a perfect addition to modern homes.",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 777.80,
    countInStock: 10,
    isBundle: false,
    bundleId: null 
  },
  {
    name: "Light Rod Wall Light",
    image: "https://www.modernspaceliving.com/cdn/shop/products/HTB19_jZwACWBuNjy0Faq6xUlXXaN_600x.jpg?v=1609846159",
    brand: "Williams Sonoma",
    quantity: 12,
    category: "67a0b7aad7455824ec57d6a7", 
    description: "Simple yet classic, easy to pair with any room in your home whether it be framing a mirror or hallway. ",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 777.80,
    countInStock: 0,
    isBundle: false,
    bundleId: null 
  },
]

const rugs= [
  {
    name: "Pastel Abstract Rug",
    image: "https://www.modernspaceliving.com/cdn/shop/products/H58aa57bd3f354ce88b69ae91a1c5d15aM_400x.jpg?v=1638165834",
    brand: "Williams Sonoma",
    quantity: 12,
    category: "67a0b7aad7455824ec57d6ab", 
    description: "Complimentary to any space that already has color. Or it can be a nice finishing touch to add a subtle pop of color to a living area.",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 325.80,
    countInStock: 5,
    isBundle: false,
    bundleId: null 
  },
  {
    name: "Modern Grey Cotton Mat",
    image: "https://www.modernspaceliving.com/cdn/shop/products/Hb8e1eec162114a2fa4b84373ac445a407_600x.jpg?v=1624083010",
    brand: "Home Depot",
    quantity: 12,
    category: "67a0b7aad7455824ec57d6ab", 
    description: "A minimalist Grey Cotton Mat suitable for your bedroom, bathroom, or living room.",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 152.80,
    countInStock: 5,
    isBundle: false,
    bundleId: null 
  },
  {
    name: "Paris Delitta",
    image: "https://cdn.ishtari.com/files/media/cache/product/80000/75000/75800/a1-800x1091.jpg",
    brand: "Zymta Home",
    quantity: 12,
    category: "67a0b7aad7455824ec57d6ab", 
    description: "(L150 x W80)cm Modern Geometric Anti-Slip Stain Resistant Soft Carpet - Beige",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 325.80,
    countInStock: 5,
    isBundle: false,
    bundleId: null 
  },
  {
    name: "Pinky Pink",
    image: "https://imperialrooms.co.uk/cdn/shop/files/Image_1.jpg?v=1730278211",
    brand: "Williams Sonoma",
    quantity: 12,
    category: "67a0b7aad7455824ec57d6ab", 
    description: "A plush floor covering, the Imperial Room Pink Shaggy Rug will envelop your feet in opulent comfort. ",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 325.80,
    countInStock: 5,
    isBundle: false,
    bundleId: null 
  },
  {
    name: "The $1 Rug Test Joke",
    image: "https://i.etsystatic.com/41152141/c/2250/2250/378/0/il/27bf9a/5653799902/il_600x600.5653799902_2437.jpg",
    brand: "Williams Sonoma",
    quantity: 12,
    category: "67a0b7aad7455824ec57d6ab", 
    description: "Ebbing and flowing like an everchanging body of water, our Flow Chandelier flows effortlessly into any setting.",
    reviews: [
      
    ],
    rating: 0,
    numReviews: 0,
    price: 1,
    countInStock: 5,
    isBundle: false,
    bundleId: null 
  },
  

]





async function seedCategories() {
  try {
    // Ensure the database connection is established
    await database.connectToDatabase();
    // Check if any categories already exist
    const existingCategories = await Category.find({});
    if (existingCategories.length === 0) {
      // If no categories exist, add them
      for (let categoryName of categories) {
        const category = await Category.create({ name: categoryName });
        console.log(`${categoryName} category added successfully!`);
      }
    } else {
      console.log("Categories already exist. Skipping category seeding.");
    }
  } catch (err) {
    console.error("Error seeding categories:", err);
  }
}

async function seedProducts(products) {
  try {
    await database.connectToDatabase();

  /*   // Delete all existing products in the collection
    await Product.deleteMany({});
    console.log("Existing products deleted."); */

    // Drop all indexes (except the default _id index)
    await Product.collection.dropIndexes();
    console.log("Indexes dropped.");

    // Loop through each product and insert it individually
    for (let product of products) {
      await Product.create(product);
      console.log(`Product ${product.name} added successfully!`);
    }

    await mongoose.connection.close();
    console.log("Database connection closed.");

    process.exit(0); // Ensure script exits properly
  } catch (err) {
    console.error("Error seeding products:", err);
    await mongoose.connection.close();
    process.exit(1); // Exit with failure code
  }
}



// Call the function to seed categories and products
async function seed() {
  await seedCategories(chairs);
  //await seedProducts(rugs);
  
}
seed();



