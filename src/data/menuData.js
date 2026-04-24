// Fallback menu data — also used if API is slow/unreachable so the section is never empty.
export const FALLBACK_MENU = {
    categories: ["Signature", "Snacks", "Bites", "Fried Chicken", "Chicken Strips", "Burgers", "Drinks", "Soft Drinks", "Add-ons"],
    items: {
        "Signature": [
            { id: "chicken-loaded", name: "Chicken Loaded Fries", price: 180, desc: "Crispy fries smothered with spicy chicken, cheese and sauces.", image: "/images/chicken loaded fries.jpg" },
            { id: "sausage-loaded", name: "Sausage Loaded Fries", price: 200, desc: "Loaded with juicy sausages, cheese, and smoky sauces.", image: "/images/sausage loaded fries.jpeg" },
            { id: "machos", name: "Machos", price: 210, desc: "Nacho-style loaded fries — cheesy, crunchy, irresistible.", image: "/images/machos.jpeg" },
            { id: "beef-smash-loaded", name: "Smash Beef Loaded Fries", price: 230, desc: "Smashed beef, melted cheese and signature sauce over fries.", image: "/images/beef loaded fries.jpeg" },
        ],
        "Snacks": [
            { id: "exotic-fries", name: "Exotic French Fries", price: 80, desc: "Golden, crispy fries served with your favorite dipping sauce.", image: "/images/exotic french.jpeg" },
            { id: "cheesy-fries", name: "Cheesy French Fries", price: 135, desc: "Crispy fries loaded with molten cheese and dipping sauce.", image: "/images/cheesy fries.jpeg" },
            { id: "peri-fries", name: "Peri Peri French Fries", price: 90, desc: "Golden fries tossed in fiery peri peri seasoning.", image: "/images/peri peri fries.jpg" },
        ],
        "Bites": [
            { id: "nugget-bites", name: "Nugget Bites", price: 130, desc: "Crispy chicken nuggets tossed in signature peri peri seasoning.", image: "/images/nuggets.jpeg" },
            { id: "peri-wings", name: "Peri Wings", price: 150, desc: "Spicy peri peri wings — a fiery combo you can't resist.", image: "/images/8pcs wings.jpeg" },
        ],
        "Fried Chicken": [
            { id: "fc-2pc", name: "2 Piece Fried Chicken", price: 160, desc: "Two pieces of golden, juicy hand-breaded fried chicken.", image: "/images/2pcs.jpeg" },
            { id: "fc-5pc", name: "5 Piece Fried Chicken", price: 270, desc: "Five pieces of golden, crunchy fried chicken to share.", image: "/images/5pcs fried chckn.jpeg" },
            { id: "fc-10pc", name: "10 Piece Fried Chicken", price: 520, desc: "A full bucket of crispy golden fried chicken.", image: "/images/10ocs.jpeg" },
            { id: "fc-20pc", name: "20 Piece Fried Chicken", price: 1020, desc: "The ultimate feast — twenty pieces for the whole squad.", image: "/images/20 piece fried chicken.jpg" },
        ],
        "Chicken Strips": [
            { id: "cs-4pc", name: "4 Piece Chicken Strips", price: 160, desc: "Tender, crispy chicken strips with dipping sauce.", image: "/images/4pcs strips.jpeg" },
            { id: "cs-8pc", name: "8 Piece Chicken Strips", price: 300, desc: "Eight golden strips — crispy on the outside, juicy inside.", image: "/images/8pcs wings.jpeg" },
        ],
        "Burgers": [
            { id: "zinger", name: "Zinger Burger", price: 150, desc: "Crispy spiced chicken fillet with fresh lettuce and creamy mayo.", image: "/images/zinger burger.jpg" },
            { id: "beef-smash", name: "Beef Smash Burger", price: 170, desc: "Smashed beef patty, melted cheese and our signature sauce.", image: "/images/beef smash burger.jpg" },
        ],
        "Drinks": [
            { id: "lime-juice", name: "Lime Juice", price: 25, desc: "Freshly squeezed lime juice — zesty and refreshing.", image: "/images/lime juice.jpg" },
            { id: "mint-lime", name: "Mint Lime Juice", price: 30, desc: "Cool mint meets zesty lime.", image: "/images/mint lime.jpg" },
            { id: "mango-juice", name: "Mango Juice", price: 70, desc: "Thick, sweet, sun-ripened mango.", image: "/images/mango juice.jpg" },
            { id: "strawberry-juice", name: "Strawberry Juice", price: 70, desc: "Fresh strawberries blended smooth.", image: "/images/strawberry juice.jpg" },
            { id: "chikku-juice", name: "Chikku Juice", price: 70, desc: "Creamy sapodilla shake — a tropical classic.", image: "/images/chikku juice.jpg" },
            { id: "passion-mojito", name: "Passion Fruit Mojito", price: 90, desc: "Passion fruit, mint, lime — the ultimate refresher.", image: "/images/passion fruit mojito.jpg" },
            { id: "mint-mojito", name: "Mint Lime Mojito", price: 90, desc: "Classic minty-lime mojito — cool, crisp, iconic.", image: "/images/mint lime.jpg" },
            { id: "blue-mojito", name: "Blue Curaçao Mojito", price: 90, desc: "Tropical blue curaçao swirled with mint and lime.", image: "/images/blue mojito new.png" },
            { id: "cold-coffee", name: "Cold Coffee", price: 90, desc: "Rich, creamy and ice-cold — the perfect pick-me-up.", image: "/images/cold coffee.jpg" },
        ],
        "Soft Drinks": [
            { id: "pepsi", name: "Pepsi", price: 20, desc: "Chilled Pepsi — the classic fizz.", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=80" },
            { id: "7up", name: "7UP", price: 20, desc: "Crisp, lemony 7UP — ice cold.", image: "/images/7 up.jpg" },
        ],
        "Add-ons": [
            { id: "peri-seasoning", name: "Peri Peri Seasoning", price: 10, desc: "Extra peri peri punch for your fries.", image: "/images/peri peri seasoning.jpg" },
            { id: "cheese-slice", name: "Cheese Slice", price: 20, desc: "Add a layer of melty cheese.", image: "/images/cheese slice.jpg" },
            { id: "extra-wings", name: "Extra Wings", price: 35, desc: "Two extra peri peri wings on the side.", image: "/images/wings.jpeg" },
        ],
    },
};
