const CronJob = require("cron").CronJob;
const { Item } = require("../models");

function deleteItem(id) {
  let d = new Date();
  d.setMilliseconds(d.getMilliseconds() + 1000 * 3600);

  const job = new CronJob(
    d,
    () => {
      Item.destroy({ where: { id } });
    },
    () => {
      console.log("complete");
    }
  );
  return job.start();
}

module.exports = deleteItem;
