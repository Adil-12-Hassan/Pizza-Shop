const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/pizza-shop';

const sampleItems = [
    // --- STARTERS ---
    {
        name: "Garlic Bread Supreme",
        description: "Toasted baguette with garlic butter, herbs, and melted mozzarella",
        price: 299,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1573140247632-f84660f67627?w=400",
        available: true
    },
    {
        name: "Mozzarella Sticks",
        description: "Golden fried cheese sticks served with marinara sauce",
        price: 349,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400",
        available: true
    },
    {
        name: "Chicken Wings (6pcs)",
        description: "Spicy buffalo wings served with ranch dip",
        price: 499,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400",
        available: true
    },
    {
        name: "Loaded Nachos",
        description: "Tortilla chips topped with cheese, jalapenos, salsa, and sour cream",
        price: 449,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400",
        available: true
    },

    // --- PIZZAS ---
    {
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
        price: 599,
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
        available: true
    },
    {
        name: "Pepperoni Feast",
        description: "Double pepperoni with extra mozzarella cheese",
        price: 799,
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
        available: true
    },
    {
        name: "BBQ Chicken Pizza",
        description: "Grilled chicken, onions, corn, and tangy BBQ sauce",
        price: 849,
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
        available: true
    },
    {
        name: "Veggie Supreme",
        description: "Mushrooms, onions, capsicum, olives, and corn",
        price: 699,
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
        available: true
    },
    {
        name: "Meat Lovers",
        description: "Pepperoni, sausage, chicken, and ham",
        price: 999,
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400",
        available: true
    },
    {
        name: "Hawaiian Pizza",
        description: "Ham and pineapple with mozzarella",
        price: 749,
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
        available: true
    },

    // --- BURGERS ---
    {
        name: "Classic Chicken Burger",
        description: "Crispy chicken patty with lettuce and mayo",
        price: 299,
        category: "Burger",
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400",
        available: true
    },
    {
        name: "Double Cheeseburger",
        description: "Two beef patties with double cheddar cheese",
        price: 549,
        category: "Burger",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
        available: true
    },
    {
        name: "Zinger Stack",
        description: "Spicy fried chicken thigh with hash brown and cheese",
        price: 499,
        category: "Burger",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400",
        available: true
    },
    {
        name: "Veggie Delight",
        description: "Potato and pea patty with fresh veggies",
        price: 249,
        category: "Burger",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400",
        available: true
    },

    // --- PASTAS ---
    {
        name: "Chicken Alfredo",
        description: "Fettuccine pasta in creamy parmesan sauce with grilled chicken",
        price: 649,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400",
        available: true
    },
    {
        name: "Spaghetti Bolognese",
        description: "Classic meat sauce served over spaghetti",
        price: 599,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=400",
        available: true
    },
    {
        name: "Penne Arrabbiata",
        description: "Spicy tomato sauce with garlic and chili flakes",
        price: 499,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1608835291093-394b0c943a75?w=400",
        available: true
    },

    // --- SIDES ---
    {
        name: "French Fries",
        description: "Crispy golden potato fries",
        price: 149,
        category: "Sides",
        image: "https://images.unsplash.com/photo-1518013431117-e595ed18ea99?w=400",
        available: true
    },
    {
        name: "Onion Rings",
        description: "Batter fried onion rings",
        price: 199,
        category: "Sides",
        image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400",
        available: true
    },
    {
        name: "Coleslaw",
        description: "Fresh cabbage and carrot salad in creamy dressing",
        price: 99,
        category: "Sides",
        image: "https://images.unsplash.com/photo-1625938145744-e38051539994?w=400",
        available: true
    },

    // --- DESSERTS ---
    {
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten center",
        price: 299,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400",
        available: true
    },
    {
        name: "New York Cheesecake",
        description: "Classic creamy cheesecake with strawberry topping",
        price: 349,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1524351199678-941a58a3dfcd?w=400",
        available: true
    },
    {
        name: "Tiramisu",
        description: "Coffee-flavoured Italian dessert",
        price: 399,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
        available: true
    },

    // --- DRINKS ---
    {
        name: "Coke (500ml)",
        description: "Chilled Coca-Cola",
        price: 99,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400",
        available: true
    },
    {
        name: "Sprite (500ml)",
        description: "Lemon-lime soda",
        price: 99,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400",
        available: true
    },
    {
        name: "Oreo Shake",
        description: "Thick milkshake blended with Oreo cookies",
        price: 249,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
        available: true
    },
    {
        name: "Iced Coffee",
        description: "Cold brewed coffee with milk and ice",
        price: 199,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400",
        available: true
    },

    // --- SIMPLE DEALS ---
    {
        name: "Burger Buddy",
        description: "2 Chicken Burgers + 2 Fries + 2 Cokes",
        price: 899,
        category: "Simple Deal",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400",
        available: true
    },
    {
        name: "Pizza for Two",
        description: "1 Medium Pizza + 2 Drinks",
        price: 799,
        category: "Simple Deal",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
        available: true
    },
    {
        name: "Lunch Box",
        description: "1 Zinger Burger + 1 Fries + 1 Coke",
        price: 499,
        category: "Simple Deal",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400",
        available: true
    },

    // --- FAMILY DEALS ---
    {
        name: "Mega Feast",
        description: "2 Large Pizzas + 2 Sides + 1.5L Drink",
        price: 1999,
        category: "Family Deal",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
        available: true
    },
    {
        name: "Family Party",
        description: "3 Large Pizzas + 3 Burgers + 2 1.5L Drinks",
        price: 3499,
        category: "Family Deal",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
        available: true
    },
    {
        name: "Weekend Special",
        description: "2 Pastas + 1 Large Pizza + 4 Drinks",
        price: 1599,
        category: "Family Deal",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
        available: true
    }
];

const menuItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    available: Boolean,
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

async function populate() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to DB');

        await MenuItem.deleteMany({}); // Clear existing
        console.log('🗑️ Cleared existing items');

        await MenuItem.insertMany(sampleItems);
        console.log('✅ Inserted ' + sampleItems.length + ' sample items');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

populate();
