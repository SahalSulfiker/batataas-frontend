// Fallback menu data — also used if API is slow/unreachable so the section is never empty.
export const FALLBACK_MENU = {
    categories: ["Signature", "Snacks", "Bites", "Fried Chicken", "Chicken Strips", "Burgers", "Drinks", "Soft Drinks", "Add-ons"],
    items: {
        "Signature": [
            { id: "chicken-loaded", name: "Chicken Loaded Fries", price: 180, desc: "Crispy fries smothered with spicy chicken, cheese and sauces.", image: "https://images.pexels.com/photos/20535803/pexels-photo-20535803.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
            { id: "sausage-loaded", name: "Sausage Loaded Fries", price: 200, desc: "Loaded with juicy sausages, cheese, and smoky sauces.", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=80" },
            { id: "machos", name: "Machos", price: 210, desc: "Nacho-style loaded fries — cheesy, crunchy, irresistible.", image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?auto=format&fit=crop&w=900&q=80" },
            { id: "beef-smash-loaded", name: "Smash Beef Loaded Fries", price: 230, desc: "Smashed beef, melted cheese and signature sauce over fries.", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=900&q=80" },
        ],
        "Snacks": [
            { id: "exotic-fries", name: "Exotic French Fries", price: 80, desc: "Golden, crispy fries served with your favorite dipping sauce.", image: "https://images.pexels.com/photos/19264378/pexels-photo-19264378.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
            { id: "cheesy-fries", name: "Cheesy French Fries", price: 135, desc: "Crispy fries loaded with molten cheese and dipping sauce.", image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=900&q=80" },
            { id: "peri-fries", name: "Peri Peri French Fries", price: 90, desc: "Golden fries tossed in fiery peri peri seasoning.", image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
        ],
        "Bites": [
            { id: "nugget-bites", name: "Nugget Bites", price: 130, desc: "Crispy chicken nuggets tossed in signature peri peri seasoning.", image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80" },
            { id: "peri-wings", name: "Peri Wings", price: 150, desc: "Spicy peri peri wings — a fiery combo you can't resist.", image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=80" },
        ],
        "Fried Chicken": [
            { id: "fc-2pc", name: "2 Piece Fried Chicken", price: 160, desc: "Two pieces of golden, juicy hand-breaded fried chicken.", image: "https://images.pexels.com/photos/33037756/pexels-photo-33037756.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
            { id: "fc-5pc", name: "5 Piece Fried Chicken", price: 270, desc: "Five pieces of golden, crunchy fried chicken to share.", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=80" },
            { id: "fc-10pc", name: "10 Piece Fried Chicken", price: 520, desc: "A full bucket of crispy golden fried chicken.", image: "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?auto=format&fit=crop&w=900&q=80" },
            { id: "fc-20pc", name: "20 Piece Fried Chicken", price: 1020, desc: "The ultimate feast — twenty pieces for the whole squad.", image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=900&q=80" },
        ],
        "Chicken Strips": [
            { id: "cs-4pc", name: "4 Piece Chicken Strips", price: 160, desc: "Tender, crispy chicken strips with dipping sauce.", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80" },
            { id: "cs-8pc", name: "8 Piece Chicken Strips", price: 300, desc: "Eight golden strips — crispy on the outside, juicy inside.", image: "https://images.unsplash.com/photo-1626082936935-c5d15b5c7d2a?auto=format&fit=crop&w=900&q=80" },
        ],
        "Burgers": [
            { id: "zinger", name: "Zinger Burger", price: 150, desc: "Crispy spiced chicken fillet with fresh lettuce and creamy mayo.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
            { id: "beef-smash", name: "Beef Smash Burger", price: 170, desc: "Smashed beef patty, melted cheese and our signature sauce.", image: "https://images.pexels.com/photos/36741809/pexels-photo-36741809.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
        ],
        "Drinks": [
            { id: "lime-juice", name: "Lime Juice", price: 25, desc: "Freshly squeezed lime juice — zesty and refreshing.", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80" },
            { id: "mint-lime", name: "Mint Lime Juice", price: 30, desc: "Cool mint meets zesty lime.", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80" },
            { id: "mango-juice", name: "Mango Juice", price: 70, desc: "Thick, sweet, sun-ripened mango.", image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=900&q=80" },
            { id: "strawberry-juice", name: "Strawberry Juice", price: 70, desc: "Fresh strawberries blended smooth.", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80" },
            { id: "chikku-juice", name: "Chikku Juice", price: 70, desc: "Creamy sapodilla shake — a tropical classic.", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=80" },
            { id: "passion-mojito", name: "Passion Fruit Mojito", price: 90, desc: "Passion fruit, mint, lime — the ultimate refresher.", image: "https://images.pexels.com/photos/7491891/pexels-photo-7491891.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
            { id: "mint-mojito", name: "Mint Lime Mojito", price: 90, desc: "Classic minty-lime mojito — cool, crisp, iconic.", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80" },
            { id: "blue-mojito", name: "Blue Curaçao Mojito", price: 90, desc: "Tropical blue curaçao swirled with mint and lime.", image: "https://images.unsplash.com/photo-1595981234058-a9302fb97229?auto=format&fit=crop&w=900&q=80" },
            { id: "cold-coffee", name: "Cold Coffee", price: 90, desc: "Rich, creamy and ice-cold — the perfect pick-me-up.", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80" },
        ],
        "Soft Drinks": [
            { id: "pepsi", name: "Pepsi", price: 40, desc: "Chilled Pepsi — the classic fizz.", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=80" },
            { id: "7up", name: "7UP", price: 40, desc: "Crisp, lemony 7UP — ice cold.", image: "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?auto=format&fit=crop&w=900&q=80" },
        ],
        "Add-ons": [
            { id: "peri-seasoning", name: "Peri Peri Seasoning", price: 10, desc: "Extra peri peri punch for your fries.", image: "https://images.unsplash.com/photo-1599050751795-6cdaafbc2319?auto=format&fit=crop&w=900&q=80" },
            { id: "cheese-slice", name: "Cheese Slice", price: 20, desc: "Add a layer of melty cheese.", image: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=900&q=80" },
            { id: "extra-wings", name: "Extra Wings", price: 35, desc: "Two extra peri peri wings on the side.", image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=80" },
        ],
    },
};
