const router = require("express").Router();
const {
  getInfo,
  getBalances,
  getChannels,
  addPeer,
  openChannel,
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

  res.status(200).json({
    peer,
  });
});

router.post("/openChannel", async (req, res) => {
  const { pubkey, amount } = req.body;

  console.log("req", req.body);

  const channel = await openChannel(pubkey, amount);

  console.log("channel openend?", channel);

  res.status(200).json({
    message: "Channel opened",
  });
});

module.exports = router;
