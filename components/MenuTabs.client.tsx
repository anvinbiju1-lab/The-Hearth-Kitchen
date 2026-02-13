'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Leaf, Drumstick } from 'lucide-react';
import { menuData, MenuItem } from '@/lib/menu';

type CategoryTab = 'pizzas' | 'pasta' | 'starters' | 'drinks' | 'coffee' | 'toppings';
type PizzaSubTab = 'veg' | 'non-veg';

export default function MenuTabs() {
    const [activeCategory, setActiveCategory] = useState<CategoryTab>('pizzas');
    const [activePizzaSubTab, setActivePizzaSubTab] = useState<PizzaSubTab>('veg');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    // Get all items for current category
    const categoryItems = useMemo(() => {
        let items: MenuItem[] = [];

        if (activeCategory === 'pizzas') {
            const vegPizzas = menuData.find(cat => cat.id === 'veg-pizzas')?.items || [];
            const nonVegPizzas = menuData.find(cat => cat.id === 'non-veg-pizzas')?.items || [];
            items = activePizzaSubTab === 'veg' ? vegPizzas : nonVegPizzas;
        } else if (activeCategory === 'drinks') {
            const mojitos = menuData.find(cat => cat.id === 'mojitos')?.items || [];
            const signature = menuData.find(cat => cat.id === 'signature-drinks')?.items || [];
            const kombucha = menuData.find(cat => cat.id === 'kombucha')?.items || [];
            items = [...mojitos, ...signature, ...kombucha];
        } else {
            items = menuData.find(cat => cat.id === activeCategory)?.items || [];
        }

        return items;
    }, [activeCategory, activePizzaSubTab]);

    // Filter items based on search and filters
    const filteredItems = useMemo(() => {
        let filtered = categoryItems;

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );
        }

        // Tag filters
        if (selectedFilters.length > 0) {
            filtered = filtered.filter(item => {
                if (selectedFilters.includes('veg') && !item.veg) return false;
                if (selectedFilters.includes('non-veg') && item.veg) return false;
                if (selectedFilters.includes('bestseller') && !item.tags?.includes('bestseller')) return false;
                if (selectedFilters.includes('fusion-hit') && !item.tags?.includes('fusion-hit')) return false;
                return true;
            });
        }

        return filtered;
    }, [categoryItems, searchQuery, selectedFilters]);

    const toggleFilter = (filter: string) => {
        setSelectedFilters(prev =>
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
    };

    return (
        <div className="w-full" style={{ touchAction: 'manipulation' }}>
            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                {(['pizzas', 'pasta', 'starters', 'drinks', 'coffee', 'toppings'] as CategoryTab[]).map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-3 min-h-[44px] rounded-full font-medium whitespace-nowrap transition-all ${activeCategory === cat
                            ? 'bg-ember-600 text-white shadow-lg shadow-ember-600/50'
                            : 'bg-charcoal-800 text-charcoal-300 hover:bg-charcoal-700 active:bg-charcoal-600'
                            }`}
                        style={{ touchAction: 'manipulation' }}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            {/* Pizza Sub-tabs */}
            {activeCategory === 'pizzas' && (
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActivePizzaSubTab('veg')}
                        className={`flex items-center gap-2 px-6 py-2 min-h-[44px] rounded-full font-medium transition-all ${activePizzaSubTab === 'veg'
                            ? 'bg-green-600 text-white'
                            : 'bg-charcoal-800 text-charcoal-300 hover:bg-charcoal-700 active:bg-charcoal-600'
                            }`}
                        style={{ touchAction: 'manipulation' }}
                    >
                        <Leaf className="w-4 h-4" />
                        Vegetarian
                    </button>
                    <button
                        onClick={() => setActivePizzaSubTab('non-veg')}
                        className={`flex items-center gap-2 px-6 py-2 min-h-[44px] rounded-full font-medium transition-all ${activePizzaSubTab === 'non-veg'
                            ? 'bg-red-600 text-white'
                            : 'bg-charcoal-800 text-charcoal-300 hover:bg-charcoal-700 active:bg-charcoal-600'
                            }`}
                        style={{ touchAction: 'manipulation' }}
                    >
                        <Drumstick className="w-4 h-4" />
                        Non-Vegetarian
                    </button>
                </div>
            )}

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search menu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 min-h-[44px] bg-charcoal-800 border border-charcoal-700 rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:border-ember-600"
                        style={{ touchAction: 'manipulation' }}
                    />
                </div>

                {/* Filter Chips */}
                <div className="flex flex-wrap gap-2">
                    {['veg', 'non-veg', 'bestseller', 'fusion-hit'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => toggleFilter(filter)}
                            className={`px-4 py-2 min-h-[44px] rounded-full text-sm font-medium transition-all ${selectedFilters.includes(filter)
                                ? 'bg-ember-600 text-white'
                                : 'bg-charcoal-800 text-charcoal-300 hover:bg-charcoal-700 active:bg-charcoal-600'
                                }`}
                            style={{ touchAction: 'manipulation' }}
                        >
                            {filter === 'veg' && '🌱 Veg'}
                            {filter === 'non-veg' && '🍖 Non-Veg'}
                            {filter === 'bestseller' && '⭐ Bestseller'}
                            {filter === 'fusion-hit' && '🔥 Fusion Hit'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu Items Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredItems.map(item => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedItem(item)}
                            className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-xl p-6 cursor-pointer border border-charcoal-700 hover:border-ember-600 active:border-ember-500 transition-all group"
                            style={{ touchAction: 'manipulation' }}
                        >
                            {/* Tags */}
                            <div className="flex gap-2 mb-3">
                                {item.veg !== undefined && (
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.veg ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                                        }`}>
                                        {item.veg ? '🌱 Veg' : '🍖 Non-Veg'}
                                    </span>
                                )}
                                {item.tags?.includes('bestseller') && (
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-600/20 text-yellow-400">
                                        ⭐ Bestseller
                                    </span>
                                )}
                                {item.tags?.includes('fusion-hit') && (
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-600/20 text-orange-400">
                                        🔥 Fusion Hit
                                    </span>
                                )}
                            </div>

                            {/* Name */}
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-ember-400 transition-colors">
                                {item.name}
                            </h3>

                            {/* Description */}
                            <p className="text-charcoal-300 text-sm mb-4 line-clamp-2">
                                {item.description}
                            </p>

                            {/* Price */}
                            <div className="flex items-center justify-between">
                                {item.priceSmall && item.priceLarge ? (
                                    <div className="flex gap-3">
                                        <span className="text-ember-400 font-bold">
                                            Small: ₹{item.priceSmall}
                                        </span>
                                        <span className="text-ember-400 font-bold">
                                            Large: ₹{item.priceLarge}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-ember-400 font-bold text-lg">
                                        ₹{item.price}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            layoutId={selectedItem.id}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-2xl p-8 max-w-2xl w-full border border-charcoal-700 relative"
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-charcoal-700 hover:bg-charcoal-600 active:bg-charcoal-500 transition-colors"
                                style={{ touchAction: 'manipulation' }}
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>

                            {/* Tags */}
                            <div className="flex gap-2 mb-4">
                                {selectedItem.veg !== undefined && (
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedItem.veg ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                                        }`}>
                                        {selectedItem.veg ? '🌱 Vegetarian' : '🍖 Non-Vegetarian'}
                                    </span>
                                )}
                                {selectedItem.tags?.includes('bestseller') && (
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-600/20 text-yellow-400">
                                        ⭐ Bestseller
                                    </span>
                                )}
                                {selectedItem.tags?.includes('fusion-hit') && (
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-600/20 text-orange-400">
                                        🔥 Fusion Hit
                                    </span>
                                )}
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-4">{selectedItem.name}</h2>
                            <p className="text-charcoal-200 text-lg mb-6">{selectedItem.description}</p>

                            {/* Price */}
                            <div className="flex items-center gap-6 mb-6">
                                {selectedItem.priceSmall && selectedItem.priceLarge ? (
                                    <>
                                        <div>
                                            <div className="text-charcoal-400 text-sm">Small</div>
                                            <div className="text-ember-400 font-bold text-2xl">₹{selectedItem.priceSmall}</div>
                                        </div>
                                        <div>
                                            <div className="text-charcoal-400 text-sm">Large</div>
                                            <div className="text-ember-400 font-bold text-2xl">₹{selectedItem.priceLarge}</div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-ember-400 font-bold text-3xl">₹{selectedItem.price}</div>
                                )}
                            </div>

                            <button
                                className="w-full py-4 min-h-[44px] bg-ember-600 hover:bg-ember-700 active:bg-ember-800 text-white font-bold rounded-lg transition-colors"
                                style={{ touchAction: 'manipulation' }}
                            >
                                Add to Order
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
