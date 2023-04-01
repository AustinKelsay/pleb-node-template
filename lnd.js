const LndGrpc = require("lnd-grpc");
const dotenv = require("dotenv");

dotenv.config();

const options = {
  host: process.env.LND_HOST,
  cert: process.env.LND_CERT,
  macaroon: process.env.LND_MACAROON,
};

const lnd = new LndGrpc(options);

const connect = async () => {
  await lnd.connect();

  console.log("LND gRPC client is ready to use");
};

const getInfo = async () => {
  const info = await lnd.services.Lightning.getInfo();

  return info;
};

const getBalances = async () => {
  const walletBalance = await lnd.services.Lightning.walletBalance();

  const channelBalance = await lnd.services.Lightning.channelBalance();

  return {
    walletBalance,
    channelBalance,
  };
};

const getChannels = async () => {
  const channels = await lnd.services.Lightning.listChannels();

  return channels;
};

const addPeer = async (pubkey, host) => {
  const addPeer = await lnd.services.Lightning.connectPeer({
    addr: {
      pubkey,
      host: host,
    },
  });

  return addPeer;
};

const openChannel = async (pubkey, amount) => {
  const channelOpen = await lnd.services.Lightning.openChannel({
    node_pubkey: pubkey,
    local_funding_amount: amount,
  });

  return channelOpen;
};

module.exports = {
  connect,
  getInfo,
  getBalances,
  getChannels,
  addPeer,
  openChannel,
};
