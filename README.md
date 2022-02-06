# Beat&Buddy (built for Roadtoweb3 hackathon)

This Project is built on top of polygon blockchain to allow creators to upload their music and make it available for other users to listen to. The uploaded music is stored on ipfs storage and then minted to NFTs allowing it to be owned by the creator itself.
I've built it using next.js for front-end and hardhat for smart-contract development.

## How does it work

It works the same way as other streaming sites would work. Once you reach the landing page you are asked to connect to wallet since its on a block chain we need the address of person who initiated a transaction. You'll find latest music in trending section. You can directly play music.
You can also create your own music by clickin on "upload your own" or "create" button.
On create page you are suppose to upload a mp3 file and provide title for same. Please make sure that you are connected with a wallet
By clicking the upload button you are initiating 2 transactions. One to create a NFT and second to make it live on website
Once live you can play the music

## Things that are working

1. Connecting wallet
2. Music playback
3. upload new music
4. List your uploads
5. List musics on home page

## Things can be added in future

1. Search using title, name
2. Create user profile
3. Ability to create playlist or album with custom art
4. Add lyrics for music if any
5. Seek, forward, backward, shuffle and repeat in music playback
6. Ability to tip your favourite artist
