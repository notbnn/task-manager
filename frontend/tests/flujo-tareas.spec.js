import { test, expect } from '@playwright/test'

test('un usuario puede iniciar sesión, crear una tarea y verla', async ({ page }) => {
  // 1. Entrar a la aplicación
  await page.goto('/')

  // 2. Iniciar sesión con tu componente
  await page.getByPlaceholder('Tu Email').fill('admin@test.com') 
  await page.getByPlaceholder('Tu Contraseña').fill('123456') 
  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click()

  // 3. Crear una tarea (OJO: verifica los textos de tu componente de Tareas)
  // Reemplaza 'Placeholder de tu input de tareas' por lo que diga tu app real
  await page.getByPlaceholder('Escribe una nueva tarea...').fill('Comprar pan')
  await page.getByRole('button', { name: 'Agregar Tarea' }).click()

  // 4. Verla en la lista
  await expect(page.getByText('Comprar pan')).toBeVisible()
})