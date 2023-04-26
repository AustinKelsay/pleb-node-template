# pleb-node-template

A simple fullstack Lightning App template for learning / development with LND

## Features:
- Vite frontend with simple darkmode styling / form management / data display.
- LND-GRPC library reducing code and making LND methods easier to work with.
- Express server with basic middleware setup / routes for lightning methods.
- Prebuilt LND methods for creating/paying invoices, openeing/closing channels, and adding/removing peers.


## Local Setup (in regtest using Polar):

1. Make sure that you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) and [Polar](https://lightningpolar.com) installed


2. Open Docker Desktop and wait for it to start

<img width="912" alt="image" src="https://user-images.githubusercontent.com/53542748/234646702-30806d33-85e6-42d2-9409-71c42d00ef4d.png">

3. Open Polar and create a new Lightning network

<img width="832" alt="image" src="https://user-images.githubusercontent.com/53542748/234647029-0c79aabf-6448-49f9-821c-dc54a407b637.png">

4. Create your network however you like, though for starting out it's best to have at least 2 LND nodes to talk to each other.

<img width="1426" alt="image" src="https://user-images.githubusercontent.com/53542748/234647812-84a1472d-2464-4874-b8c7-d6151686ca6b.png">

5. Start your network

<img width="1431" alt="image" src="https://user-images.githubusercontent.com/53542748/234648030-e4c08fae-63d2-4b14-9a40-fa321472f46f.png">
