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

## Offline public list

The PWA manifest is available at `/manifest.webmanifest`. After the app is opened online,
its service worker saves the public trip list for read-only access at `/offline.html`;
when offline, a reload of `/` opens that reader. Cached trip data can be stale and does
not confirm or create a booking. See [java-06.md](./java-06.md) for implementation notes
and the verification report.