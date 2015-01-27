
JSunit.testSuite('RendezVous.js', function(rendezvous) {

	var $rdv;
	var $testZone = $('#TestZone');
	var containerClass = 'rendezvous-container';
	var popupClass = 'rendezvous-popup';
	var inputClass = 'rendezvous-input';
	var containerSelector = '.'+containerClass;
	var popupSelector = '.'+popupClass;
	var inputSelector = '.'+inputClass;
	var visibleState = ':visible';
	var hiddenState = ':hidden';

	rendezvous.beforeEachTest(function() {
		// Prepare test
		$rdv = $('<div id="RendezVous"></div>');
		$testZone.append($rdv);
	});

	rendezvous.afterEachTest(function() {
		// Clean test
		$rdv = null;
		$testZone.html('');
	});

	rendezvous.test('Automatic build', function() {
		var $rdvAuto = $('#RendezVousAuto');
		Assert.true($rdvAuto.hasClass(containerClass));
		Assert.true($rdvAuto.is(visibleState));

		$rdv.attr('rendezvous', '');
		RendezVous.autoBuild();
		Assert.true($rdv.hasClass(containerClass));
		Assert.true($rdv.is(visibleState));
	});

	rendezvous.test('Manual build', function() {
		$rdv.RendezVous();
		Assert.true($rdv.hasClass(containerClass));
		Assert.true($rdv.is(visibleState));
	});

	rendezvous.test('Interface', function() {
		$rdv.RendezVous(function(rdv) {
			Assert.isObject(rdv);
			Assert.isFunction(rdv.open);
			Assert.isFunction(rdv.close);
			Assert.isFunction(rdv.node);
			Assert.isFunction(rdv.settings);
			Assert.isFunction(rdv.format);
			Assert.isFunction(rdv.today);
			Assert.isFunction(rdv.firstDayOfTheMonth);
			Assert.isFunction(rdv.lastDayOfTheMonth);
			Assert.isFunction(rdv.setDay);
			Assert.isFunction(rdv.getDay);
			Assert.isFunction(rdv.previousDay);
			Assert.isFunction(rdv.nextDay);
			Assert.isFunction(rdv.setMonth);
			Assert.isFunction(rdv.getMonth);
			Assert.isFunction(rdv.previousMonth);
			Assert.isFunction(rdv.nextMonth);
			Assert.isFunction(rdv.setYear);
			Assert.isFunction(rdv.previousYear);
			Assert.isFunction(rdv.nextYear);
			Assert.isFunction(rdv.getYear);
			Assert.isFunction(rdv.setDate);
			Assert.isFunction(rdv.getDate);
			Assert.isFunction(rdv.setScale);
			Assert.isFunction(rdv.getScale);
		});
	});

	rendezvous.test('Openning with open()', function() {
		$rdv.RendezVous(function(rdv) {
			rdv.open();
			Assert.true($rdv.find(popupSelector).is(visibleState));
		});
	});

	rendezvous.test('Openning with focus()', function() {
		$rdv.RendezVous(function(rdv) {
			$rdv.find(inputSelector).find('input').focus();
			Assert.true($rdv.find(popupSelector).is(visibleState));
		});
	});

	rendezvous.test('Closing with close()', function() {
		$rdv.RendezVous(function(rdv) {
			rdv.open();
			Assert.true($rdv.find(popupSelector).is(visibleState));
			rdv.close();
			Assert.true($rdv.find(popupSelector).is(hiddenState));
		});
	});

	rendezvous.test('Closing with blur()', function() {
		$rdv.RendezVous(function(rdv) {
			$rdv.find(inputSelector).find('input').focus();
			Assert.true($rdv.find(popupSelector).is(visibleState));
			$rdv.find(inputSelector).find('input').blur();
			Assert.true($rdv.find(popupSelector).is(hiddenState));
		});
	});

	rendezvous.test('Get node', function() {
		$rdv.RendezVous(function(rdv) {
			Assert.equals($rdv.attr('id'), rdv.node().attr('id'));
		});
	});

	rendezvous.test('Date formats', function() {
		$rdv.RendezVous(function(rdv) {
			Assert.equals('Thursday 1 January 2015', rdv.format('%Day %d %Month %Y', new Date(2015, 0, 1)));
			Assert.equals('Thu 01 Jan 15',           rdv.format('%Da %D %Mo %y',     new Date(2015, 0, 1)));
			Assert.equals('friday 1 january 2016',   rdv.format('%day %d %month %Y', new Date(2016, 0, 1)));
			Assert.equals('fri 01 jan 16',           rdv.format('%da %D %mo %y',     new Date(2016, 0, 1)));
			Assert.equals('01/02/2015',              rdv.format('%D/%M/%Y',          new Date(2015, 1, 1)));
			Assert.equals('16-2-1',                  rdv.format('%y-%m-%d',          new Date(2016, 1, 1)));
		});
	});

	rendezvous.test('First day of the month', function() {
		$rdv.RendezVous(function(rdv) {
			Assert.equals(1, rdv.firstDayOfTheMonth(1, 2015));
		});
	});

	rendezvous.test('Last day of the month', function() {
		$rdv.RendezVous(function(rdv) {
			Assert.equals(28, rdv.lastDayOfTheMonth(2, 2015));
			Assert.equals(29, rdv.lastDayOfTheMonth(2, 2016));
			Assert.equals(30, rdv.lastDayOfTheMonth(4, 2015));
			Assert.equals(31, rdv.lastDayOfTheMonth(3, 2015));
		});
	});

	rendezvous.test('Today', function() {
		$rdv.RendezVous(function(rdv) {
			var todayExpected = new Date();
			var todayGiven = rdv.today();
			Assert.isDate(todayGiven);
			Assert.equals(todayExpected.getDate(), todayGiven.getDate());
			Assert.equals(todayExpected.getMonth(), todayGiven.getMonth());
			Assert.equals(todayExpected.getFullYear(), todayGiven.getFullYear());
		});
	});

	rendezvous.test('Get day', function() {
		$rdv.RendezVous(function(rdv) {
			var todayDay = rdv.today().getDate();
			Assert.equals(todayDay, rdv.getDay());
		});
	});

	rendezvous.test('Set day', function() {
		$rdv.RendezVous(function(rdv) {
			// Set month to a different month than today
			if(rdv.today().getDay() == 5) {
				rdv.setDay(4);
				Assert.equals(4, rdv.getDay());
			}
			else {
				rdv.setDay(5);
				Assert.equals(5, rdv.getDay());
			}
		});
	});

	rendezvous.test('Get month', function() {
		// today's getMonth() is in 0-11 range
		// rdv's getMonth() is in 1-12 range
		// So increase by 1 today's month
		$rdv.RendezVous(function(rdv) {
			var todayMonth = rdv.today().getMonth() + 1;
			Assert.equals(todayMonth, rdv.getMonth());
		});
	});

	rendezvous.test('Set month', function() {
		// today's getMonth() is in 0-11 range
		// rdv's getMonth() is in 1-12 range
		// So increase by 1 today's month
		$rdv.RendezVous(function(rdv) {
			// Set day to a different day than today
			if(rdv.today().getMonth() + 1 == 4) {
				rdv.setMonth(4);
				Assert.equals(4, rdv.getMonth());
			}
			else {
				rdv.setMonth(5);
				Assert.equals(5, rdv.getMonth());
			}
		});
	});

	rendezvous.test('Get year', function() {
		$rdv.RendezVous(function(rdv) {
			var todayYear = rdv.today().getFullYear();
			Assert.equals(todayYear, rdv.getYear());
		});
	});

	rendezvous.test('Set year', function() {
		$rdv.RendezVous(function(rdv) {
			rdv.setYear(2011);
			Assert.equals(2011, rdv.getYear());
		});
	});

	rendezvous.test('Get date', function() {
		$rdv.RendezVous(function(rdv) {
			var dateExpected = new Date();
			var dateGiven = rdv.getDate();
			Assert.isDate(dateGiven);
			Assert.equals(dateExpected.getDate(), dateGiven.getDate());
			Assert.equals(dateExpected.getMonth(), dateGiven.getMonth());
			Assert.equals(dateExpected.getFullYear(), dateGiven.getFullYear());
		});
	});

	rendezvous.test('Set date', function() {
		// rdv's month is in 1-12 range
		// given month is in 0-11 range
		// So increase by 1 given month
		$rdv.RendezVous(function(rdv) {
			rdv.setDate(1, 1, 2014);

			var dateExpected = new Date(2014, 0, 1);
			var dateGiven = rdv.getDate();

			Assert.isDate(dateGiven);
			Assert.equals(dateExpected.getDate(), dateGiven.getDate());
			Assert.equals(dateExpected.getMonth(), dateGiven.getMonth());
			Assert.equals(dateExpected.getFullYear(), dateGiven.getFullYear());
		});
	});

	rendezvous.test('Previous day', function() {
		$rdv.RendezVous(function(rdv) {
			// Trivial case, 20 january 2015
			var dateExpected = new Date(2015, 0, 20);
			dateExpected.setDate(dateExpected.getDate() - 1);

			rdv.setDate(20, 1, 2015);
			rdv.previousDay();
			var dateGiven = rdv.getDate();

			Assert.equals(dateExpected.getDate(), dateGiven.getDate());
			Assert.equals(dateExpected.getMonth(), dateGiven.getMonth());
			Assert.equals(dateExpected.getFullYear(), dateGiven.getFullYear());

			// Particular case, 1 february 2014
			var dateExpected = new Date(2014, 1, 1);
			dateExpected.setDate(dateExpected.getDate() - 1);

			rdv.setDate(1, 2, 2014);
			rdv.previousDay();
			var dateGiven = rdv.getDate();

			Assert.equals(dateExpected.getDate(), dateGiven.getDate());
			Assert.equals(dateExpected.getMonth(), dateGiven.getMonth());
			Assert.equals(dateExpected.getFullYear(), dateGiven.getFullYear());
		});
	});

	rendezvous.test('Next day', function() {
		$rdv.RendezVous(function(rdv) {
			// Trivial case, 20 january 2015
			var dateExpected = new Date(2015, 0, 20);
			dateExpected.setDate(dateExpected.getDate() + 1);

			rdv.setDate(20, 1, 2015);
			rdv.nextDay();
			var dateGiven = rdv.getDate();

			Assert.equals(dateExpected.getDate(), dateGiven.getDate());
			Assert.equals(dateExpected.getMonth(), dateGiven.getMonth());
			Assert.equals(dateExpected.getFullYear(), dateGiven.getFullYear());

			// Particular case, 28 february 2014
			var dateExpected = new Date(2014, 1, 28);
			dateExpected.setDate(dateExpected.getDate() + 1);

			rdv.setDate(28, 2, 2014);
			rdv.nextDay();
			var dateGiven = rdv.getDate();

			Assert.equals(dateExpected.getDate(), dateGiven.getDate());
			Assert.equals(dateExpected.getMonth(), dateGiven.getMonth());
			Assert.equals(dateExpected.getFullYear(), dateGiven.getFullYear());
		});
	});

	rendezvous.test('Previous month', function() {
		$rdv.RendezVous(function(rdv) {
			// Trivial case, 20 may 2015
			var dateExpected = new Date(2015, 4, 20);
			dateExpected.setMonth(dateExpected.getMonth() - 1);

			rdv.setDate(20, 5, 2015);
			rdv.previousMonth();
			var dateGiven = rdv.getDate();

			Assert.equals(dateExpected.getDate(), dateGiven.getDate());
			Assert.equals(dateExpected.getMonth(), dateGiven.getMonth());
			Assert.equals(dateExpected.getFullYear(), dateGiven.getFullYear());

			// Particular case, 20 january 2015
			var dateExpected = new Date(2015, 0, 20);
			dateExpected.setMonth(dateExpected.getMonth() - 1);

			rdv.setDate(20, 1, 2015);
			rdv.previousMonth();
			var dateGiven = rdv.getDate();

			Assert.equals(dateExpected.getDate(), dateGiven.getDate());
			Assert.equals(dateExpected.getMonth(), dateGiven.getMonth());
			Assert.equals(dateExpected.getFullYear(), dateGiven.getFullYear());
		});
	});

	rendezvous.test('Next month', function() {
		$rdv.RendezVous(function(rdv) {
			// Trivial case, 20 may 2015
			var dateExpected = new Date(2015, 4, 20);
			dateExpected.setMonth(dateExpected.getMonth() + 1);

			rdv.setDate(20, 5, 2015);
			rdv.nextMonth();
			var dateGiven = rdv.getDate();

			Assert.equals(dateExpected.getDate(), dateGiven.getDate());
			Assert.equals(dateExpected.getMonth(), dateGiven.getMonth());
			Assert.equals(dateExpected.getFullYear(), dateGiven.getFullYear());

			// Particular case, 20 december 2015
			var dateExpected = new Date(2015, 11, 20);
			dateExpected.setMonth(dateExpected.getMonth() + 1);

			rdv.setDate(20, 12, 2015);
			rdv.nextMonth();
			var dateGiven = rdv.getDate();

			Assert.equals(dateExpected.getDate(), dateGiven.getDate());
			Assert.equals(dateExpected.getMonth(), dateGiven.getMonth());
			Assert.equals(dateExpected.getFullYear(), dateGiven.getFullYear());
		});
	});

	rendezvous.test('Previous year', function() {
		$rdv.RendezVous(function(rdv) {
			var dateExpected = new Date(2015, 0, 1);
			dateExpected.setFullYear(dateExpected.getFullYear() - 1);

			rdv.setDate(1, 1, 2015);
			rdv.previousYear();
			var dateGiven = rdv.getDate();

			Assert.equals(dateExpected.getDate(), dateGiven.getDate());
			Assert.equals(dateExpected.getMonth(), dateGiven.getMonth());
			Assert.equals(dateExpected.getFullYear(), dateGiven.getFullYear());
		});
	});

	rendezvous.test('Next year', function() {
		$rdv.RendezVous(function(rdv) {
			var dateExpected = new Date(2015, 0, 1);
			dateExpected.setFullYear(dateExpected.getFullYear() + 1);

			rdv.setDate(1, 1, 2015);
			rdv.nextYear();
			var dateGiven = rdv.getDate();

			Assert.equals(dateExpected.getDate(), dateGiven.getDate());
			Assert.equals(dateExpected.getMonth(), dateGiven.getMonth());
			Assert.equals(dateExpected.getFullYear(), dateGiven.getFullYear());
		});
	});

	// After all tests, display a Datepicker (to play with it)
	$rdv = $('<div></div>');
	$testZone.append($rdv);
	$rdv.RendezVous();

});

JSunit.render();
