import { Hono } from 'hono'
import {
  listCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  createDish,
  listDishesByCategory,
} from '../data/menuStore.js'
import { parseJsonBody } from '../utils/body.js'
import { ApiError } from '../utils/errors.js'
import { sendCollection, sendResource } from '../utils/response.js'
import { parseIdParam } from '../utils/validation.js'

const menu = new Hono()

menu.get('/', (c) => sendCollection(c, listCategories()))

menu.get('/:id/dishes', (c) => {
  const categoryId = parseIdParam(c.req.param('id'))
  const category = getCategoryById(categoryId)
  if (!category) throw new ApiError(404, 'NOT_FOUND', 'Category not found.')
  return sendCollection(c, listDishesByCategory(categoryId))
})

menu.post('/:id/dishes', async (c) => {
  const categoryId = parseIdParam(c.req.param('id'))
  const category = getCategoryById(categoryId)
  if (!category) throw new ApiError(404, 'NOT_FOUND', 'Category not found.')
  const payload = await parseJsonBody(c)
  return sendResource(c, createDish(categoryId, payload), 201)
})

menu.get('/:id', (c) => {
  const category = getCategoryById(parseIdParam(c.req.param('id')))
  if (!category) throw new ApiError(404, 'NOT_FOUND', 'Category not found.')
  return sendResource(c, category)
})

export default menu
