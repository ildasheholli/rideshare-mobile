# RideShare Mobile

A mobile-first RideShare demo built with Next.js App Router. Trip data is fictional. Signed-in users can save personal favorites and send ride requests through Neon; only the trip's owner can accept a request, which consumes one seat.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` lists three sample departures.
- `/udhetimi/2` shows trip details.
- `/udhetimi/2/kerkesa` sends a request and displays its live status.
- `/udhetimi/99` shows the not-found state.
- Signed-in users can save trips from `/`; favorites are stored in Neon and remain after refresh.
- Trip details show role-specific requests and seats, refreshed every five seconds.

Initialize Neon by running `schema.sql`, `schema-java05.sql`, `schema-java09.sql`, and `schema-java10.sql` in order.

## Offline public list

The PWA manifest is available at `/manifest.webmanifest`. After the app is opened online,
its service worker saves the public trip list for read-only access at `/offline.html`;
when offline, a reload of `/` opens that reader. Cached trip data can be stale and does
not confirm or create a booking. See [java-06.md](./java-06.md) for implementation notes
and the verification report.