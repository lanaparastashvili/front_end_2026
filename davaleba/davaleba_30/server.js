import express from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: 'ნივთი 1', description: 'პირველი ნივთის აღწერა' },
  { id: 2, name: 'ნივთი 2', description: 'მეორე ნივთის აღწერა' },
  { id: 3, name: 'ნივთი 3', description: 'მესამე ნივთის აღწერა' },
];
let nextId = 4;

function paginate(array, page, limit) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = array.slice(startIndex, endIndex);

  return {
    total: array.length,
    page,
    limit,
    totalPages: Math.ceil(array.length / limit),
    data: results,
  };
}

app.post('/items', (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name ველი სავალდებულოა' });
  }

  const newItem = {
    id: nextId++,
    name,
    description: description || '',
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

app.get('/items', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (page < 1 || limit < 1) {
    return res.status(400).json({ error: 'page და limit პარამეტრები უნდა იყოს დადებითი რიცხვები' });
  }

  const paginated = paginate(items, page, limit);
  res.json(paginated);
});

app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ error: 'ჩანაწერი ვერ მოიძებნა' });
  }

  res.json(item);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ error: 'ჩანაწერი ვერ მოიძებნა' });
  }

  const { name, description } = req.body;
  if (name !== undefined) item.name = name;
  if (description !== undefined) item.description = description;

  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'ჩანაწერი ვერ მოიძებნა' });
  }

  const deleted = items.splice(index, 1);
  res.json({ message: 'ჩანაწერი წარმატებით წაიშალა', item: deleted[0] });
});

app.get('/secret', (req, res) => {
  const headers = req.headers;

  const hasAdminHeader = Object.values(headers).some(
    (value) => typeof value === 'string' && value.toLowerCase().includes('admin')
  );

  if (!hasAdminHeader) {
    return res.status(403).json({
      error: 'წვდომა აკრძალულია. საჭიროა header-ში სიტყვა "admin"',
    });
  }

  res.json({
    message: 'მოგესალმებით, ადმინო! 🎉',
    secretData: 'ეს არის დამალული ინფორმაცია, რომელიც მხოლოდ admin-ებისთვისაა ხელმისაწვდომი.',
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'გვერდი ვერ მოიძებნა' });
});

app.listen(PORT, () => {
  console.log(`სერვერი გაშვებულია: http://localhost:${PORT}`);
});
