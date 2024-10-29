‼️App is still in development!‼️

# Clipio 🎥

Created by Etai Gabbai on 10/29/2024

## How It Works 🤔

Clipio leverages a Next.js 14 front-end to generate captions meant for short-form content. The backend written in Python 3.10, uses FFMPEG to add captions to the video. Deepgram and it's API are used to generate captions and save them as an srt. The backend handles video uploads, transcription, exporting and more. [NeonDB's Postgres](https://neon.tech) is used for storing user data via [DrizzleORM](https://orm.drizzle.team/), and [Clerk](https://clerk.com) is used for authentication.

## Requirements

- Next.js 14+
- Node.js
- DeepGram API Key
- Python 3.10
- Flask
- FFMpeg

## Installation 👩‍💻

1. Clone the repository: `git clone https://github.com/DevEtaiGabbai/clipio.git`
2. Navigate to the project directory and run `npm install`
3. Change directory to the `python` folder and install the dependencies: `pip install -r requirements.txt`
4. Start the Google Cloud Function locally: `python server.py` (or `python3` depending on your system)
5. Rename `python/.env.example` to `.env` and set `DEEPGRAM_API_KEY` to your Deepgram API key which can be accessed [here](https://console.deepgram.com/). 
6. Return to the project root directory and run the development server: `npm run dev`
7. Open [localhost:3000](http://localhost:3000) in your browser and you're all set!

## Contributing & Improving 📈

The clone currently fulfills its basic purpose, but there’s always room for enhancement!

Feel free to dive into the code and contribute at any skill level. Here are some potential improvements:

- [ ] Store projects in Database
- [ ] Implement Stripe subscriptions
- [ ] Deploy to vercel
- [ ] Improve captioning interface and it's functionalities
- [ ] Make downloads and exports faster
- [ ] Add different export formats and qualities
- [ ] Add more AI features
- [ ] Fix captioning delay
- [ ] Display all of a users projects on dashboard

## Developers and Maintainers

**Etai Gabbai** - [GitHub](https://github.com/DevEtaiGabbai)
