// scripts/seed-database.ts
import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker/locale/ru'

// Настройки Supabase
const supabaseUrl = process.env.NUXT_SUPABASE_URL
const supabaseKey = process.env.NUXT_SUPABASE_KEY

const supabase = createClient(
    supabaseUrl as string,
    supabaseKey as string
)

// Функция анализа тональности (упрощенная)
function analyzeSentiment(text: string, rating: number): 'positive' | 'neutral' | 'negative' {
    if (rating >= 4) return 'positive'
    if (rating <= 2) return 'negative'
    return 'neutral'
}

// Генерация случайных пользователей
async function seedUsers(count: number) {
    const users = []

    for (let i = 0; i < count; i++) {
        const role = i < 2 ? 'admin' : i < 5 ? 'moderator' : 'user'

        users.push({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            avatar_url: faker.image.avatar(),
            role,
            created_at: faker.date.past().toISOString(),
            last_login: faker.date.recent().toISOString()
        })
    }

    const { data, error } = await supabase
        .from('users')
        .insert(users)
        .select()

    if (error) {
        console.error('Ошибка при создании пользователей:', error)
        return []
    }

    console.log(`Создано ${data.length} пользователей`)
    return data
}

// Генерация случайных продуктов
async function seedProducts(count: number) {
    const products = []

    for (let i = 0; i < count; i++) {
        products.push({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price()),
            image_url: faker.image.url(),
            category: faker.commerce.department(),
            created_at: faker.date.past().toISOString()
        })
    }

    const { data, error } = await supabase
        .from('products')
        .insert(products)
        .select()

    if (error) {
        console.error('Ошибка при создании продуктов:', error)
        return []
    }

    console.log(`Создано ${data.length} продуктов`)
    return data
}

// Генерация случайных отзывов
async function seedReviews(users: any[], products: any[], count: number) {
    const reviews = []

    // Последние 90 дней для создания реалистичной временной шкалы
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 90)

    for (let i = 0; i < count; i++) {
        const rating = faker.number.int({ min: 1, max: 5 })
        const text = faker.lorem.paragraph()
        const sentiment = analyzeSentiment(text, rating)

        // Распределяем даты создания равномерно
        const createdAt = faker.date.between({ from: startDate, to: new Date() }).toISOString()

        reviews.push({
            user_id: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
            product_id: products[faker.number.int({ min: 0, max: products.length - 1 })].id,
            rating,
            text,
            sentiment,
            created_at: createdAt
        })
    }

    const { data, error } = await supabase
        .from('reviews')
        .insert(reviews)
        .select()

    if (error) {
        console.error('Ошибка при создании отзывов:', error)
        return []
    }

    console.log(`Создано ${data.length} отзывов`)
    return data
}

// Основная функция заполнения БД
async function seedDatabase() {
    console.log('Начало заполнения базы данных...')

    // Сначала очищаем существующие данные
    await supabase.from('reviews').delete().neq('id', '0')
    await supabase.from('products').delete().neq('id', '0')
    await supabase.from('users').delete().neq('id', '0')

    console.log('База данных очищена')

    // Заполняем таблицы тестовыми данными
    const users = await seedUsers(50)
    const products = await seedProducts(30)
    await seedReviews(users, products, 500)

    console.log('База данных успешно заполнена!')
}

// Запуск скрипта
seedDatabase().catch(console.error)