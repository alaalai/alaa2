class NavigationMenu extends HTMLElement {
    connectedCallback() {
        salla.onReady()
            .then(() => salla.lang.onLoaded())
            .then(() => {
                this.menus = [];
                this.displayAllText = salla.lang.get('blocks.home.display_all');

                return salla.api.component.getMenus()
                    .then(({ data }) => {
                        this.menus = data;
                        return this.render()
                    }).catch((error) => salla.logger.error('salla-menu::Error fetching menus', error));
            });
    }

    /** 
    * Check if the menu has children
    * @param {Object} menu
    * @returns {Boolean}
    */
    hasChildren(menu) {
        return menu?.children?.length > 0;
    }

    /**
    * Check if the menu has products
    * @param {Object} menu
    * @returns {Boolean}
    */
    hasProducts(menu) {
        return menu?.products?.length > 0;
    }

    /**
    * Get the classes for desktop menu
    * @param {Object} menu
    * @param {Boolean} isRootMenu
    * @returns {String}
    */
    getDesktopClasses(menu, isRootMenu) {
        return `!hidden lg:!block ${isRootMenu ? 'root-level lg:!inline-block' : 'relative'} ${menu.products ? ' mega-menu' : ''}
        ${this.hasChildren(menu) ? ' has-children' : ''}`
    }

    /**
    * Get the mobile menu
    * @param {Object} menu
    * @param {String} displayAllText
    * @returns {String}
    */
    /**
    * Get the mobile menu
    * @param {Object} menu
    * @param {String} displayAllText
    * @returns {String}
    */
    getMobileMenu(menu, displayAllText) {
        const menuImage = menu.image ? `<img src="${menu.image}" class="w-8 h-8 rounded-full object-cover mr-3" alt="${menu.title}" />` : '';
        const hasChildren = this.hasChildren(menu);

        return `
        <li class="border-b border-gray-100 last:border-0" ${menu.attrs}>
            ${!hasChildren ? `
                <a href="${menu.url}" aria-label="${menu.title || 'category'}" class="flex items-center py-4 px-6 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors ${menu.image ? '' : ''}" ${menu.link_attrs}>
                    ${menuImage}
                    <span class="font-medium">${menu.title || ''}</span>
                </a>` :
                `
                <div class="group">
                    <button class="w-full flex items-center justify-between py-4 px-6 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('.arrow-icon').classList.toggle('rotate-180')">
                        <div class="flex items-center">
                            ${menuImage}
                            <span class="font-medium">${menu.title}</span>
                        </div>
                        <i class="sicon-keyboard_arrow_down arrow-icon transition-transform duration-200"></i>
                    </button>
                    <ul class="hidden bg-gray-50 py-2">
                        <li class="border-b border-gray-100 last:border-0">
                            <a href="${menu.url}" class="block py-3 px-10 text-sm text-primary font-medium hover:bg-gray-100">${displayAllText}</a>
                        </li>
                        ${menu.children.map((subMenu) => this.getMobileMenu(subMenu, displayAllText).replace('px-6', 'px-10')).join('')}
                    </ul>
                </div>
            `}
        </li>`;
    }

    /**
    * Get the desktop menu
    * @param {Object} menu
    * @param {Boolean} isRootMenu
    * @returns {String}
    */
    getDesktopMenu(menu, isRootMenu) {
        return `
        <li class="${this.getDesktopClasses(menu, isRootMenu)}" ${menu.attrs}>
            <a href="${menu.url}" aria-label="${menu.title || 'category'}" ${menu.link_attrs} class="flex items-center gap-1 hover:text-primary transition-colors py-2">
                <span>${menu.title}</span>
                ${this.hasChildren(menu) ? '<i class="sicon-keyboard_arrow_down text-xs opacity-50"></i>' : ''}
            </a>
            ${this.hasChildren(menu) ? `
                <div class="sub-menu absolute top-full left-0 min-w-[200px] bg-white shadow-dropdown rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${this.hasProducts(menu) ? '!w-full !left-0 !fixed container mx-auto right-0 mt-2' : ''}">
                    <div class="${this.hasProducts(menu) ? 'flex gap-8 p-6' : ''}">
                        <ul class="${this.hasProducts(menu) ? 'w-64 shrink-0 space-y-2' : 'space-y-1'}">
                            ${menu.children.map((subMenu) => `
                                <li>
                                    <a href="${subMenu.url}" class="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
                                        ${subMenu.title}
                                    </a>
                                </li>
                            `).join('\n')}
                        </ul>
                        ${this.hasProducts(menu) ? `
                        <div class="flex-1 border-r border-gray-100 pr-8 mr-8">
                            <salla-products-list
                            source="selected"
                            shadow-on-hover
                            source-value="[${menu.products}]" 
                            class="grid grid-cols-4 gap-4"/>
                        </div>` : ''}
                    </div>
                </div>` : ''}
        </li>`;
    }

    /**
    * Get the menus
    * @returns {String}
    */
    getMenus() {
        return this.menus.map((menu) => `
            ${this.getMobileMenu(menu, this.displayAllText)}
            ${this.getDesktopMenu(menu, true)}
        `).join('\n');
    }

    /**
    * Render the header menu
    */
    render() {
        this.innerHTML = `
        <!-- Mobile Menu Drawer -->
        <div id="mobile-menu" class="mobile-menu fixed inset-0 z-[60] invisible opacity-0 transition-all duration-300">
            <div class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity close-mobile-menu"></div>
            <div class="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl transform translate-x-full transition-transform duration-300 overflow-y-auto drawer-content">
                <div class="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <span class="font-bold text-lg text-gray-800">${salla.lang.get('blocks.header.menu')}</span>
                    <button class="close-mobile-menu p-2 text-gray-500 hover:text-red-500 transition-colors">
                        <i class="sicon-cancel text-xl"></i>
                    </button>
                </div>
                <ul class="flex flex-col pb-20">
                    ${this.menus.map((menu) => this.getMobileMenu(menu, this.displayAllText)).join('')}
                </ul>
            </div>
        </div>`;

        // Add event listeners for opening/closing
        document.addEventListener('click', (e) => {
            if (e.target.closest('[onclick*="mobile-menu::open"]')) {
                const menu = this.querySelector('#mobile-menu');
                menu.classList.remove('invisible', 'opacity-0');
                menu.querySelector('.drawer-content').classList.remove('translate-x-full');
            }
            if (e.target.closest('.close-mobile-menu')) {
                const menu = this.querySelector('#mobile-menu');
                menu.classList.add('invisible', 'opacity-0');
                menu.querySelector('.drawer-content').classList.add('translate-x-full');
            }
        });
    }
}

customElements.define('custom-main-menu', NavigationMenu);
