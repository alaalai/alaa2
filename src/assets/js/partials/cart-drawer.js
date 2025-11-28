class CartDrawer {
    constructor() {
        this.drawer = document.getElementById('cart-drawer');
        if (!this.drawer) return;

        this.content = this.drawer.querySelector('.drawer-content');
        this.itemsContainer = document.getElementById('drawer-cart-items');
        this.countBadge = document.getElementById('drawer-cart-count');
        this.totalPrice = document.getElementById('drawer-cart-total');
        this.shippingBar = document.getElementById('drawer-shipping-bar');
        this.shippingMsg = document.getElementById('drawer-shipping-msg');
        this.shippingProgress = document.getElementById('drawer-shipping-progress');
        this.upsellSection = document.getElementById('drawer-upsell');

        this.initEvents();
    }

    initEvents() {
        // Listen for open/close events
        document.addEventListener('cart::open', () => this.open());
        document.addEventListener('cart::close', () => this.close());

        // Listen for cart updates
        salla.event.cart.onUpdated((data) => this.update(data));

        // Initial fetch
        // salla.cart.api.get().then((response) => this.update(response.data));
    }

    open() {
        this.drawer.classList.remove('invisible', 'opacity-0');
        this.content.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.drawer.classList.add('invisible', 'opacity-0');
        this.content.classList.add('translate-x-full');
        document.body.style.overflow = '';
    }

    update(data) {
        // Update Count & Total
        this.countBadge.innerText = data.count;
        this.totalPrice.innerText = salla.money(data.total);

        // Update Items
        if (data.count === 0) {
            this.renderEmpty();
        } else {
            this.renderItems(data.items);
        }

        // Update Free Shipping Bar
        this.updateShippingBar(data.free_shipping_bar);

        // Show Upsells if cart has items
        if (data.count > 0) {
            this.upsellSection.classList.remove('hidden');
        } else {
            this.upsellSection.classList.add('hidden');
        }
    }

    renderEmpty() {
        this.itemsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-gray-500">
                <i class="sicon-shopping-bag text-4xl mb-4 opacity-50"></i>
                <p>${salla.lang.get('pages.cart.empty_cart')}</p>
                <a href="${salla.config.get('store.url')}" onclick="salla.event.dispatch('cart::close')" class="btn btn--primary btn--small mt-4">${salla.lang.get('common.elements.back_home')}</a>
            </div>
        `;
    }

    renderItems(items) {
        this.itemsContainer.innerHTML = items.map(item => `
            <div class="flex gap-4 bg-gray-50 p-3 rounded-lg relative group">
                <a href="${item.url}" class="shrink-0 w-20 h-20 bg-white rounded-md border border-gray-200 overflow-hidden">
                    <img src="${item.product_image}" alt="${item.product_name}" class="w-full h-full object-cover">
                </a>
                <div class="flex-1 min-w-0">
                    <a href="${item.url}" class="text-sm font-bold text-gray-800 line-clamp-2 mb-1 hover:text-primary transition-colors">${item.product_name}</a>
                    <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span>${salla.money(item.price)}</span>
                        ${item.is_on_sale ? `<span class="line-through">${salla.money(item.regular_price)}</span>` : ''}
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <salla-quantity-input 
                            cart-item-id="${item.id}" 
                            value="${item.quantity}" 
                            max="${item.max_quantity}" 
                            class="h-8 border-gray-200 bg-white"
                        ></salla-quantity-input>
                        
                        <button onclick="salla.cart.deleteItem('${item.id}')" class="text-red-400 hover:text-red-600 p-1 transition-colors" aria-label="Remove">
                            <i class="sicon-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateShippingBar(data) {
        if (!data) {
            this.shippingBar.classList.add('hidden');
            return;
        }

        this.shippingBar.classList.remove('hidden');
        const isFree = data.has_free_shipping;
        const percent = data.percent;

        this.shippingProgress.style.width = `${percent}%`;

        if (isFree) {
            this.shippingMsg.innerHTML = `<span class="text-green-600 font-bold">🎉 ${salla.lang.get('pages.cart.has_free_shipping')}</span>`;
            this.shippingProgress.classList.add('bg-green-500');
        } else {
            this.shippingMsg.innerHTML = salla.lang.get('pages.cart.free_shipping_alert', { amount: `<span class="font-bold text-primary">${salla.money(data.remaining)}</span>` });
            this.shippingProgress.classList.remove('bg-green-500');
            this.shippingProgress.classList.add('bg-primary');
        }
    }
}

// Initialize
salla.onReady(() => new CartDrawer());
