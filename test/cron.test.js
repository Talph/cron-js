(function() {
	test('Cron test',function() {
		cron.add("* * * * *", function() { console.log("exec"); });

		equal(!!cron.list(), true, "Registered cron job is null test");
		equal(cron.list().length > 0, true, "Registered cron job test");

		cron.add("*/1 * * * *", "url");

		equal(cron.list().length > 0, true, "Registered cron job test");
		equal(cron.list().length === 2, true, "Registered cron job count test");

		cron.add("*/2 * * * 0", "url");

		equal(cron.list().length > 0, true, "Registered cron job test");
		equal(cron.list().length === 3, true, "Registered cron job count test");

		equal(cron.start(), true, "Cron job start test");
		equal(cron.start(), false, "Cron job multiple start test");
		equal(cron.stop(), true, "Cron job stop test");
		equal(cron.stop(), true, "Cron job multiple stop test");

		cron.start();
		cron.clear();

		equal(cron.list().length === 0, true, "Stop and registered cron job test");
	});
}(jQuery));

