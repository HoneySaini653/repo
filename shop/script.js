// Product Database Structure
const products = {
    items: [
        {
            id: "P001",
            name: "Engine Oil Filter",
            category: "engine",
            price: 299,
            stock: 50,
            description: "High-quality engine oil filter for all types of vehicles",
            specifications: {
                brand: "FilterPro",
                model: "FP-123",
                compatibility: ["Honda", "Toyota", "Maruti"]
            },
            images: ["filter1.jpg", "filter2.jpg"],
            ratings: 4.5
        }
        // Add more products following this structure
    ]
};

// Main App
class PartsStore {
    constructor() {
        this.currentView = 'vehicleType';
        this.selectedType = null;
        this.selectedBrand = null;
        this.cart = [];
        this.cartTotal = 0;
        
        // Database of vehicles and parts
        this.database = {
            tractors: {
                brands: {
                    'Mahindra': this.getPartCategories(),
                    'Sonalika': this.getPartCategories(),
                    'John Deere': this.getPartCategories(),
                    'Massey Ferguson': this.getPartCategories()
                }
            },
            bikes: {
                brands: {
                    'Hero': this.getPartCategories(),
                    'Honda': this.getPartCategories(),
                    'Bajaj': this.getPartCategories(),
                    'TVS': this.getPartCategories()
                }
            },
            cars: {
                brands: {
                    'Maruti Suzuki': this.getPartCategories(),
                    'Hyundai': this.getPartCategories(),
                    'Tata': this.getPartCategories(),
                    'Toyota': this.getPartCategories()
                }
            },
            others: {
                categories: this.getPartCategories()
            }
        };

        this.init();
    }

    getPartCategories() {
        return {
            'Engine Parts': ['Pistons', 'Gaskets', 'Valves'],
            'Transmission': ['Gears', 'Clutch Plates', 'Bearings'],
            'Brake System': ['Brake Shoes', 'Brake Pads', 'Brake Discs'],
            'Suspension': ['Shock Absorbers', 'Springs', 'Bush Kit'],
            'Electrical': ['Batteries', 'Alternators', 'Starters'],
            'Filters': ['Oil Filters', 'Air Filters', 'Fuel Filters']
        };
    }

    init() {
        this.setupEventListeners();
        this.updateCartCount();
    }

    setupEventListeners() {
        // Vehicle type selection
        document.querySelectorAll('.selection-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                this.showBrands(type);
            });
        });

        // Back buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.back-button')) {
                this.handleBack();
            }
        });

        // Search functionality
        const searchInput = document.querySelector('.search-box input');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Cart icon click handler
        document.querySelector('.cart').addEventListener('click', () => {
            this.showCartModal();
        });
    }

    showBrands(type) {
        this.selectedType = type;
        this.currentView = 'brands';
        
        const brandsGrid = document.getElementById('brandSelection');
        brandsGrid.innerHTML = '<div class="back-button"><i class="fas fa-arrow-left"></i> Back</div>';

        if (type === 'others') {
            this.showPartCategories(type);
            return;
        }

        const brands = this.database[type].brands;
        Object.keys(brands).forEach(brand => {
            const brandCard = this.createCard(brand, 'brand');
            brandsGrid.appendChild(brandCard);
        });

        this.updateView();
    }

    showPartCategories(brand) {
        this.selectedBrand = brand;
        this.currentView = 'parts';
        
        const partsGrid = document.getElementById('partsCategories');
        partsGrid.innerHTML = '<div class="back-button"><i class="fas fa-arrow-left"></i> Back</div>';

        const categories = this.selectedType === 'others' 
            ? this.database.others.categories
            : this.database[this.selectedType].brands[brand];

        Object.keys(categories).forEach(category => {
            const categoryCard = this.createCard(category, 'category');
            partsGrid.appendChild(categoryCard);
        });

        this.updateView();
    }

    createCard(title, type) {
        const card = document.createElement('div');
        card.className = 'selection-card';
        card.innerHTML = `
            <i class="fas fa-${this.getIconForType(type)}"></i>
            <h2>${title}</h2>
        `;
        card.addEventListener('click', () => {
            if (type === 'brand') {
                this.showPartCategories(title);
            } else if (type === 'category') {
                this.showProducts(title);
            }
        });
        return card;
    }

    getIconForType(type) {
        const icons = {
            brand: 'building',
            category: 'tools'
        };
        return icons[type] || 'circle';
    }

    showProducts(category) {
        this.currentView = 'products';
        const productsGrid = document.getElementById('productsList');
        productsGrid.innerHTML = '<div class="back-button"><i class="fas fa-arrow-left"></i> Back</div>';
        
        // Sample products - Replace with your actual product data
        const products = [
            {
                id: 1,
                name: 'Premium Brake Shoe',
                price: 999,
                image: 'brake-shoe.jpg',
                category: category
            },
            {
                id: 2,
                name: 'Heavy Duty Clutch Plate',
                price: 1499,
                image: 'clutch-plate.jpg',
                category: category
            },
            {
                id: 3,
                name: 'Oil Filter',
                price: 299,
                image: 'oil-filter.jpg',
                category: category
            }
        ];

        products.forEach(product => {
            const productCard = this.createProductCard(product);
            productsGrid.appendChild(productCard);
        });

        this.updateView();
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'selection-card product-card';
        card.innerHTML = `
            <img src="${product.image || 'placeholder.jpg'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price}</p>
            <button class="add-to-cart-btn" onclick="event.stopPropagation(); store.addToCart({
                id: ${product.id},
                name: '${product.name}',
                price: ${product.price},
                image: '${product.image || 'placeholder.jpg'}'
            })">
                Add to Cart
            </button>
        `;
        return card;
    }

    handleBack() {
        switch (this.currentView) {
            case 'brands':
                this.currentView = 'vehicleType';
                this.selectedType = null;
                break;
            case 'parts':
                if (this.selectedType === 'others') {
                    this.currentView = 'vehicleType';
                    this.selectedType = null;
                } else {
                    this.currentView = 'brands';
                    this.selectedBrand = null;
                }
                break;
            case 'products':
                this.currentView = 'parts';
                break;
        }
        this.updateView();
    }

    updateView() {
        // Hide all views
        document.getElementById('vehicleTypeSelection').classList.add('hidden');
        document.getElementById('brandSelection').classList.add('hidden');
        document.getElementById('partsCategories').classList.add('hidden');
        document.getElementById('productsList').classList.add('hidden');

        // Show current view
        switch (this.currentView) {
            case 'vehicleType':
                document.getElementById('vehicleTypeSelection').classList.remove('hidden');
                break;
            case 'brands':
                document.getElementById('brandSelection').classList.remove('hidden');
                break;
            case 'parts':
                document.getElementById('partsCategories').classList.remove('hidden');
                break;
            case 'products':
                document.getElementById('productsList').classList.remove('hidden');
                break;
        }
    }

    handleSearch(term) {
        // Implement search functionality
        console.log('Searching for:', term);
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = this.cart.length;

        // Enable or disable the checkout button based on cart length
        const checkoutBtn = document.getElementById('checkoutButton');
        if (checkoutBtn) {
            checkoutBtn.disabled = this.cart.length === 0; // Disable if cart is empty
        }
    }

    addToCart(product) {
        this.cart.push(product);
        this.cartTotal += product.price;
        this.updateCartCount();
        this.showCartNotification();
        this.saveCartToLocalStorage();
    }

    saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('cartTotal', this.cartTotal);
    }

    showCartModal() {
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalElement = document.getElementById('cartTotal');

        // Clear previous items
        cartItemsContainer.innerHTML = '';

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center">Your cart is empty</p>';
        } else {
            this.cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>₹${item.price}</p>
                    </div>
                    <button class="remove-item-btn" onclick="store.removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        cartTotalElement.textContent = this.cartTotal;
        cartModal.show();
    }

    removeFromCart(index) {
        const removedItem = this.cart[index];
        this.cart.splice(index, 1);
        this.cartTotal -= removedItem.price;
        this.updateCartCount();
        this.saveCartToLocalStorage();
        this.showCartModal(); // Refresh the cart modal
    }

    showCartNotification() {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Item added to cart
        `;
        document.body.appendChild(notification);
        
        // Remove notification after 2 seconds
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    checkout() {
        // Get cart items and total
        const items = this.cart.map(item => `${item.name} - ₹${item.price}`).join('\n');
        const total = this.cartTotal;

        // Create WhatsApp message with payment request
        const message = `New Order:\n\n${items}\n\nTotal: ₹${total}\n\n` + 
                       `Please send payment QR code for ₹${total}\n` +
                       `Once payment is confirmed, the order will be processed.`;
                       
        const phoneNumber = '917888323326';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Close cart modal
        const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        cartModal.hide();

        // Show confirmation modal
        const confirmModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
        document.querySelector('#checkoutModal .modal-body').innerHTML = `
            <p>Your order total is ₹${total}</p>
            <p>After clicking confirm:</p>
            <ol>
                <li>You'll be redirected to WhatsApp</li>
                <li>Shop owner will send you a payment QR code</li>
                <li>Complete the payment to confirm your order</li>
            </ol>
        `;
        confirmModal.show();

        // Add event listener to confirm button
        document.getElementById('confirmCheckout').onclick = () => {
            // Clear cart
            this.cart = [];
            this.cartTotal = 0;
            this.updateCartCount();
            this.saveCartToLocalStorage();
            
            // Close confirmation modal
            confirmModal.hide();

            // Open WhatsApp with the message
            window.open(whatsappUrl, '_blank');
        };
    }
}

// Initialize the store
const store = new PartsStore();
