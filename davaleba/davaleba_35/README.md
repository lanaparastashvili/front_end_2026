# დავალება 3: NestJS + MongoDB

ეს არის NestJS აპლიკაცია MongoDB-სთან Mongoose-ის საშუალებით.

## გაშვება

1. დააყენეთ MongoDB ლოკალურად და ჩართეთ სერვისი, ან გამოიყენეთ MongoDB Atlas.
2. შეცვალეთ `.env` ფაილში `MONGODB_URI` თქვენი კავშირის მისამართით.
3. გაუშვით:

```bash
npm install
npm run start:dev
```

სერვერი გაეშვება `http://localhost:3000` მისამართზე.

## შემოწმება

- `GET /` აბრუნებს NestJS აპის მისასალმებელ პასუხს.
- `GET /health` აჩვენებს MongoDB-ის კავშირის სტატუსს.

წარმატებული კავშირისას `/health` აბრუნებს:

```json
{
  "status": "ok",
  "database": "connected"
}
```

MongoDB Atlas-ის გამოყენებისას `.env`-ში ჩასვით Atlas-ის URI, მაგალითად:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/davaleba_3
```
