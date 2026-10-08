# RideShare Mobile

A mobile-first RideShare demo built with Next.js App Router. The trip data is fictional; requests are simulated and are not stored or sent.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` lists three sample departures.
- `/udhetimi/2` shows trip details.
- `/udhetimi/2/kerkesa` shows the simulated pending request.
- `/udhetimi/99` shows the not-found state.