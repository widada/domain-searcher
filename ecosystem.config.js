module.exports = {
  apps : [{
    name        : "CRON_JOB",
    script      : "./cron.js",
    exec_mode   : "fork",
    ignore_watch: ['node_modules'],
    watch       : true
  },{
    name        : "API",
    script      : "./http.js",
    exec_mode   : "fork",
    ignore_watch: ['node_modules'],
    watch       : true
  }]
}