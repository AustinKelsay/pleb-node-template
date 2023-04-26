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

const createInvoice = async (amount, memo = "") => {
  const invoice = await lnd.services.Lightning.addInvoice({
    value: amount,
    memo,
  });

  return invoice;
};

const payInvoice = async (paymentRequest) => {
  const payment = await lnd.services.Lightning.sendPaymentSync({
    payment_request: paymentRequest,
  });

  return payment;
};

const removePeer = async (pubkey) => {
  const removePeer = await lnd.services.Lightning.disconnectPeer({
    pub_key: pubkey,
  });

  return removePeer;
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

const closeChannel = async (channelPoint) => {
  // first get the channel point from the channel
  const channel = await lnd.services.Lightning.getChanInfo({
    chan_id: channelPoint,
  });

  const fundingTxId = channel.chan_point.split(":")[0];

  const outputIndex = parseInt(channel.chan_point.split(":")[1]);

  // then close the channel
  const channelClose = await lnd.services.Lightning.closeChannel({
    channel_point: {
      funding_txid_str: fundingTxId,
      output_index: outputIndex,
    },
  });

  return channelClose;
};

module.exports = {
  connect,
  getInfo,
  getBalances,
  createInvoice,
  payInvoice,
  getChannels,
  addPeer,
  removePeer,
  openChannel,
  closeChannel,
};
