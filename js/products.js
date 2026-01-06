// Sample Food Data with 100+ items
const foodItems = [
    // Indian (20 items)
    {
        id: 1,
        name: "Butter Chicken",
        price: 320,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
        category: "indian",
        rating: 4.8,
        description: "Tender chicken in a rich tomato and butter sauce with aromatic spices."
    },
    {
        id: 2,
        name: "Paneer Tikka Masala",
        price: 280,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
        category: "indian",
        rating: 4.6,
        description: "Grilled cottage cheese cubes in a creamy tomato gravy with Indian spices."
    },
    {
        id: 3,
        name: "Biryani (Chicken)",
        price: 250,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
        category: "indian",
        rating: 4.9,
        description: "Fragrant basmati rice cooked with chicken and a blend of aromatic spices."
    },
    {
        id: 4,
        name: "Masala Dosa",
        price: 120,
        image: "https://images.unsplash.com/photo-1630383249896-424e482dfd5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
        category: "indian",
        rating: 4.5,
        description: "Crispy fermented crepe filled with spiced potato filling, served with chutneys."
    },
    {
        id: 5,
        name: "Chole Bhature",
        price: 150,
        image: "https://images.unsplash.com/photo-1585937421612-70ca003675ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
        category: "indian",
        rating: 4.4,
        description: "Spicy chickpea curry served with deep-fried bread (bhature)."
    },
    {
        id: 6,
        name: "Rogan Josh",
        price: 340,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
        category: "indian",
        rating: 4.7,
        description: "Aromatic lamb curry cooked with yogurt, ginger, and Kashmiri spices."
    },
    {
        id: 7,
        name: "Palak Paneer",
        price: 220,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
        category: "indian",
        rating: 4.5,
        description: "Cottage cheese cubes in a smooth spinach gravy with mild spices."
    },
    {
        id: 8,
        name: "Tandoori Chicken",
        price: 300,
        image: "https://images.unsplash.com/photo-1626645738196-c2a7c85f4f3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
        category: "indian",
        rating: 4.8,
        description: "Juicy chicken marinated in yogurt and spices, cooked in a tandoor oven."
    },
    {
        id: 9,
        name: "Aloo Gobi",
        price: 180,
        image: "https://images.unsplash.com/photo-1604908177523-6f5d3e3c4b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
        category: "indian",
        rating: 4.3,
        description: "A flavorful dry curry made with potatoes and cauliflower, spiced with turmeric and cumin."
    },
    {
        id: 10,
        name: "Dal Makhani",
        price: 200,
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80",
        category: "indian",
        rating: 4.6,
        description: "Creamy lentil curry made with black lentils and kidney beans, simmered with butter and cream."
    },
        {
        id: 11,
        name: "Veg Kolhapuri",
        price: 230,
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46",
        category: "indian",
        rating: 4.4,
        description: "Spicy mixed vegetable curry from Kolhapur with bold masala flavors."
    },
    {
        id: 12,
        name: "Pav Bhaji",
        price: 140,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        category: "indian",
        rating: 4.7,
        description: "Mumbai-style mashed vegetable curry served with buttered pav."
    },
    {
        id: 13,
        name: "Misal Pav",
        price: 130,
        image: "https://images.unsplash.com/photo-1643874738176-8c7b8d3c9d18",
        category: "indian",
        rating: 4.8,
        description: "Spicy Maharashtrian curry topped with farsan, served with pav."
    },
    {
        id: 14,
        name: "Vada Pav",
        price: 40,
        image: "https://images.unsplash.com/photo-1606755962773-d324e7a7a2f1",
        category: "street",
        rating: 4.6,
        description: "Mumbai’s favorite street food with spicy potato fritter in pav."
    },
    {
        id: 15,
        name: "Samosa",
        price: 25,
        image: "https://images.unsplash.com/photo-1601050690728-7c3b7c6c8c5c",
        category: "street",
        rating: 4.5,
        description: "Crispy deep-fried snack filled with spiced potatoes."
    },

    /* ---------- CHINESE ---------- */
    {
        id: 16,
        name: "Veg Hakka Noodles",
        price: 160,
        image: "https://images.unsplash.com/photo-1617196037304-5e46c6b75b92",
        category: "chinese",
        rating: 4.4,
        description: "Stir-fried noodles with vegetables and Indo-Chinese sauces."
    },
    {
        id: 17,
        name: "Chicken Fried Rice",
        price: 190,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
        category: "chinese",
        rating: 4.6,
        description: "Wok-tossed rice with chicken, veggies, and soy sauce."
    },
    {
        id: 18,
        name: "Veg Manchurian",
        price: 170,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
        category: "chinese",
        rating: 4.5,
        description: "Deep-fried vegetable balls tossed in spicy Manchurian sauce."
    },
    {
        id: 19,
        name: "Chicken Manchurian",
        price: 210,
        image: "https://images.unsplash.com/photo-1628294895950-9805252327bc",
        category: "chinese",
        rating: 4.7,
        description: "Crispy chicken chunks in spicy Indo-Chinese gravy."
    },
    {
        id: 20,
        name: "Spring Rolls",
        price: 140,
        image: "https://images.unsplash.com/photo-1604908554025-e477bbecf3e5",
        category: "chinese",
        rating: 4.3,
        description: "Crispy rolls stuffed with vegetables and noodles."
    },

    /* ---------- FAST FOOD ---------- */
    {
        id: 21,
        name: "Veg Burger",
        price: 120,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
        category: "fastfood",
        rating: 4.2,
        description: "Classic vegetable burger with lettuce and cheese."
    },
    {
        id: 22,
        name: "Chicken Burger",
        price: 160,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        category: "fastfood",
        rating: 4.5,
        description: "Juicy chicken patty burger with mayo and lettuce."
    },
    {
        id: 23,
        name: "French Fries",
        price: 90,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
        category: "fastfood",
        rating: 4.4,
        description: "Crispy golden fries lightly salted."
    },
    {
        id: 24,
        name: "Cheese Pizza",
        price: 220,
        image: "https://images.unsplash.com/photo-1548365328-8b849e6c7f6a",
        category: "fastfood",
        rating: 4.6,
        description: "Classic cheese pizza with mozzarella topping."
    },
    {
        id: 25,
        name: "Pepperoni Pizza",
        price: 280,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
        category: "fastfood",
        rating: 4.7,
        description: "Loaded pizza with spicy pepperoni and cheese."
    },

    /* ---------- DESSERTS ---------- */
    {
        id: 26,
        name: "Gulab Jamun",
        price: 90,
        image: "https://images.unsplash.com/photo-1602253057119-44d745d9a7e0",
        category: "desserts",
        rating: 4.8,
        description: "Soft milk-solid balls soaked in sugar syrup."
    },
    {
        id: 27,
        name: "Rasgulla",
        price: 90,
        image: "https://images.unsplash.com/photo-1601050690630-5c1c2f5d9a0f",
        category: "desserts",
        rating: 4.6,
        description: "Spongy cottage cheese balls in light sugar syrup."
    },
    {
        id: 28,
        name: "Chocolate Brownie",
        price: 150,
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47b7f8e",
        category: "desserts",
        rating: 4.7,
        description: "Rich chocolate brownie with gooey center."
    },
    {
        id: 29,
        name: "Ice Cream Sundae",
        price: 170,
        image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625",
        category: "desserts",
        rating: 4.6,
        description: "Vanilla ice cream topped with chocolate sauce and nuts."
    },
    {
        id: 30,
        name: "Cheesecake",
        price: 220,
        image: "https://images.unsplash.com/photo-1542826438-8bfa02a6c6c0",
        category: "desserts",
        rating: 4.8,
        description: "Creamy cheesecake with biscuit base."
    },

    /* ---------- BEVERAGES ---------- */
    {
        id: 31,
        name: "Masala Chai",
        price: 40,
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3",
        category: "beverages",
        rating: 4.7,
        description: "Indian spiced tea brewed with milk."
    },
    {
        id: 32,
        name: "Cold Coffee",
        price: 110,
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
        category: "beverages",
        rating: 4.5,
        description: "Chilled coffee blended with milk and ice."
    },
    {
        id: 33,
        name: "Fresh Lime Soda",
        price: 70,
        image: "https://images.unsplash.com/photo-1590080876106-5f06d44d6c98",
        category: "beverages",
        rating: 4.4,
        description: "Refreshing lime soda with salt or sugar."
    },
    {
        id: 34,
        name: "Mango Shake",
        price: 120,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
        category: "beverages",
        rating: 4.8,
        description: "Creamy mango milkshake made from fresh mangoes."
    },
    {
        id: 35,
        name: "Orange Juice",
        price: 90,
        image: "https://images.unsplash.com/photo-1572441710534-68029aeb5f04",
        category: "beverages",
        rating: 4.3,
        description: "Freshly squeezed orange juice."
    }
    // Add more items as needed to reach 100+
];