# Задача 7 — виправлення notes API

## План

- [ ] 1. Переглянути поточний `app/api/notes/route.ts` (вже частково відомо)
- [ ] 2. Оновити `app/api/notes/route.ts`:
  - [ ] 2.1) Додати cookies() та forward cookie header у запити до `https://notehub-api.goit.study`
  - [ ] 2.2) Реалізувати парсинг query: `search`, `page`, `perPage`, `tag`, з логікою `tag === 'All'`
  - [ ] 2.3) Для POST: додати заголовок `Content-Type: application/json` та переслати cookies
  - [ ] 2.4) Додати `logErrorResponse(error)` в catch
  - [ ] 2.5) Підлаштувати формат помилок під референс (message + status)
- [ ] 3. Прогнати lint/build (за наявності скриптів)
