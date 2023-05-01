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

![image](https://user-images.githubusercontent.com/53542748/235536338-e15ab39a-1a31-4a44-af92-57edaf3d1281.png)

6. Click on the Alice node, visit the connect tab on the right, and copy the 'GRPC Host' value

![image](https://user-images.githubusercontent.com/53542748/235536523-0740bb9e-028e-4c39-854c-d0c4ad65b3c4.png)

7. Add this as the value to LND_HOST in the .env.sample file

<img width="481" alt="image" src="https://user-images.githubusercontent.com/53542748/235537038-3ba636a8-0931-4db9-91cf-9ad4001781e7.png">

8. Go back to the Connect tab and copy the 'TLS Cert' and 'Admin Macaroon' File Paths and add them as the LND_CERT and LND_MACAROON in .env.sample

![image](https://user-images.githubusercontent.com/53542748/235537489-ffcd3ce6-4b68-463a-8db1-7258059453b3.png)

9. Rename the .env.sample to .env

<img width="258" alt="image" src="https://user-images.githubusercontent.com/53542748/235537647-875db3c9-c604-464c-9b61-386d08846a9f.png">

10. Open up the terminal and run `npm i` to install all of the packages and then run `npm run start' to start the server.

<img width="521" alt="image" src="https://user-images.githubusercontent.com/53542748/235538036-0d361a53-c36e-44e0-847c-b439a73172b5.png">

11. Open up a new terminal and run `cd frontend` to navigate to the frontend directory, run `npm i` to install all of the packages, now finally run `npm run dev` to start the frontend.

<img width="657" alt="image" src="https://user-images.githubusercontent.com/53542748/235538322-99afd03b-bc71-4a82-a4ac-fa4753acb57d.png">

12. Visit the Vite local host and you should see pleb-node running. Click 'Connect to your node' and you will see your pubkey and alias immediately populate. Click this button anytime you want to refresh.

<img width="1289" alt="image" src="https://user-images.githubusercontent.com/53542748/235538753-bf63e4e7-de63-4a98-84a0-44fa7e921898.png">


Now in combination with Polar you can open/close channels, create/pay invoices, and add/remove peers.
There is so much more you can do with LND then what is in pleb-node but this should be a great way for you to get started.
Check out lnd.js to see all of the lnd methods being called in pleb-node
