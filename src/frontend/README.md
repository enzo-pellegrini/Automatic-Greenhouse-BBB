# Frontend of the eos project

## Install instructions
To run this frontend, you first need to install the dependencies with `npm i`. Then you have to rum `npm run build` to build as a static site. The output is in `public`

## Architecture
This simple frontend is using mainly three packages:
+ DaisyUI (based on tailwind), that provides styling for the UI components I'm using. Only the css needed for the html I wrote is being built to the css, using a process called purging, by PostCSS
+ SvelteKit (based on svelte), a framework that's enabling us to build the fronted in components, each one with his own javascript code. The components in this project are all independent. The most notable feature is that variables in components are reactive, making it possible to bind ui elements behaviour and content to them.
+ Socket.io, used to update the sensor data every second using a lightweight protocol.