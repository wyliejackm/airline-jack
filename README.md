go to https://github.com/wyliejackm/airline-jack-server and clone the repo
in terminal in that directory (airline-jack-server):
npm install
npm run dev

in terminal (new window/tab) in this directory (airline-jack):
npm install
ngrok http 3000
copy the forwarding address, put it in src/api/flights.js as instance baseURL

in another terminal (new window/tab) in this directory (airline-jack)