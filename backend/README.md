## Модель данных (PostgreSQL)
Реализованы следующие основные сущности и связи:
* **User** (Пользователь): `id`, `student_id`, `full_name`, `hashed_password`.
* **Survey** (Опрос): `id`, `title`, `description`, `status` (active/completed).
* **Question** (Вопрос): `id`, `survey_id` (FK), `text`, `allow_multiple`. Связь: *Один ко многим* с `Survey`.
* **AnswerOption** (Вариант ответа): `id`, `question_id` (FK), `text`. Связь: *Один ко многим* с `Question`.
* **Participation** (Участие): `id`, `user_id` (FK), `survey_id` (FK). Нужна для запрета повторного голосования.
* **Vote** (Голос): `id`, `survey_id` (FK), `option_id` (FK). Не содержит `user_id`, чтобы обеспечить анонимность голосования.


## Быстрый запуск
### 1. Запустить базу данных
Из папки `backend` выполните:
```bash
docker compose up -d
```

### 2. Создать файл .env
В папке `backend` создайте файл `.env` с содержимым:
```env
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/survey_db
SECRET_KEY=super-secret-key-change-me
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 3. Установить зависимости
Создайте и активируйте виртуальное окружение, затем установите пакеты:

```bash
python -m venv venv
```

```bash
venv\Scripts\activate
```

```bash
pip install -r requirements.txt
```

### 4. Запустить сервер
```bash
uvicorn app.main:app --reload
```

### 5. Проверить работу
Откройте в браузере: http://localhost:8000/docs

### Остановка проекта
Остановить сервер: Ctrl + C в терминале.

Остановить базу данных:
```bash
docker compose down
```