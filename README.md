# cron-js

Cron is a time-based job scheduler in Linux. cron-js is daemon to execute scheduled commands using JavaScript on your webpage. The script depends on the local time of the operating system. Because it is running based on the web browser which running on client side. This script can make easier and more flexible development than server side script.

## Description

```
cron.add([date], [exec]);
```

* date
  * The time and date fields are
   * minute: 0-59
   * hour: 0-23
   * day of month: 1-31
   * month: 1-12
   * day of week: 0-7 (0 is Sunday)

* exec
  * url or function

## Examples

```
cron.add("`Minute` `Hour` `Day of month` `Month` `Day of week`", `Exec`);

cron.start(); // start cron

cron.stop(); // stop cron
```

## Usage

### For every minute

```
cron.add("* * * * *", function() { console.log("exec"); });

cron.start();
```

### For every 5 minute

```
cron.add("*/5 * * * *", function() { console.log("exec"); });

cron.start();
```

### For every 5 minute and Sunday

```
cron.add("*/5 * * * 0", function() { console.log("exec"); });

cron.start();
```

### For every minute URL call

```
cron.add("* * * * *", "http://[YOURURL]");

cron.start();
```

## License

cron-js is available under the terms of the MIT License.

