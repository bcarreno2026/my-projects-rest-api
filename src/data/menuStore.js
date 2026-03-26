const seededAt = new Date().toISOString()

let categories = [
  {
    id: 1,
    name: 'Salad Toppings',
    description: 'Spinach, lettace, tomatoe, pickels.',
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 2,
    name: 'Bologna Choices',
    description: 'Ham, Spam, salami.',
    created_at: seededAt,
    updated_at: seededAt,
  },
]

let dishes = [
  {
    id: 1,
    category_id: 1,
    title: 'Spinach, lettuce',
    description: 'Crispy hand picked spinach and lettuce.',
    price: '0.50',
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 2,
    category_id: 1,
    title: 'sliced tomatoe',
    description: 'Roma sliced tomato.',
    price: '0.75',
    created_at: seededAt,
    updated_at: seededAt,
  },
  {
    id: 3,
    category_id: 2,
    title: 'Regular Bologna',
    description: ' Large Cut.',
    price: '5.00',
    created_at: seededAt,
    updated_at: seededAt,
  },
]

let nextCategoryId = 3
let nextDishId = 4

function clone(item) {
  return { ...item }
}
function nowIso() {
  return new Date().toISOString()
}

export function listCategories() {
  return categories.map(clone)
}

export function getCategoryById(id) {
  const category = categories.find((item) => item.id === id)
  return category ? clone(category) : null
}

export function listDishesByCategory(categoryId) {
  return dishes.filter((dish) => dish.category_id === categoryId).map(clone)
}

export function createCategory(input) {
  const category = {
    id: nextCategoryId++,
    name: input.name.trim(),
    description: input.description || '',
    created_at: nowIso(),
    updated_at: nowIso(),
  }
  categories.push(category)
  return clone(category)
}

export function createDish(categoryId, input) {
  const dish = {
    id: nextDishId++,
    category_id: categoryId,
    title: input.title.trim(),
    description: input.description || '',
    price: input.price || '0.00',
    created_at: nowIso(),
    updated_at: nowIso(),
  }
  dishes.push(dish)
  return clone(dish)
}

export function deleteCategory(id) {
  const startSize = categories.length
  categories = categories.filter((item) => item.id !== id)
  if (categories.length === startSize) return false
  dishes = dishes.filter((dish) => dish.category_id !== id)
  return true
}
