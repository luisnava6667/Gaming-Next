import { ENV } from '@/utils'
export class Platform {
  async getAll() {
    try {
      const sort = 'sort=order:asc'
      const populate = 'populate=icon'
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORMS}?${populate}&${sort}`
      const response = await fetch(url)
      const result = await response.json()
      if (response.status !== 200) throw result
      return result
    } catch (error) {
      throw error
    }
  }
  async getBySlug(slug) {
    try {
      const filters = `filters[slug][$eq]=${slug}`
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORMS}?${filters}`

      const response = await fetch(url)
      const result = await response.json()
      console.log(result);

      if (response.status !== 200) throw result

      return result.data[0]
    } catch (error) {
      throw error
    }
  }
}
