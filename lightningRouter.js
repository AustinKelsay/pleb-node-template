const router = require("express").Router();
const {
  getInfo,
  getBalances,
  getChannels,
  createInvoice,
  payInvoice,
  addPeer,
  removePeer,
  openChannel,
  closeChannel,
} = require("./lnd");

router.get("/", async (req, res) => {
  const info = await getInfo();

  const balances = await getBalances();

  const channels = await getChannels();

  res.status(200).json({
    info,
    balances,
    channels: channels.channels,
  });
});

router.post("/addPeer", async (req, res) => {
  const { pubkey, host } = req.body;

  const peer = await addPeer(pubkey, host);

  if (peer.error) {
    res.status(400).json({
      message: peer.error,
    });
  }

  res.status(200).json({
    peer,
  });
});

router.post("/removePeer", async (req, res) => {
  const { pubkey } = req.body;

  const peer = await removePeer(pubkey);

  if (peer.error) {
    res.status(400).json({
      message: peer.error,
    });
  }

  res.status(200).json({
    peer,
  });
});

router.post("/createInvoice", async (req, res) => {
  const { amount, memo } = req.body;

  const invoice = await createInvoice(amount, memo);

  if (invoice.error) {
    res.status(400).json({
      message: invoice.error,
    });
  }

  res.status(200).json({
    invoice,
  });
});

router.post("/payInvoice", async (req, res) => {
  console.log(req.body);

  const { invoice } = req.body;

  const payment = await payInvoice(invoice);

  if (payment.error) {
    res.status(400).json({
      message: payment.error,
    });
  }

  res.status(200).json({
    payment,
  });
});

router.post("/openChannel", async (req, res) => {
  const { pubkey, amount } = req.body;

  const channel = await openChannel(pubkey, amount);

  if (channel.error) {
    res.status(400).json({
      message: channel.error,
    });
  }

  res.status(200).json({
    message: "Channel opened",
  });
});

router.post("/closeChannel", async (req, res) => {
  const { channelId } = req.body;

  const channel = await closeChannel(channelId);

  if (channel.error) {
    res.status(400).json({
      message: channel.error,
    });
  }

  res.status(200).json({
    message: "Channel closed",
  });
});

module.exports = router;
