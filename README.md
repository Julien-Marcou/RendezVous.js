RendezVous.js
=========

### A jQuery Datepicker

* Lightweight
* Flat design
* User friendly
* Developer friendly
* Uses SCSS (full *em* based)
* Keep calm and Pick a date !


Some examples
------------------
[**RendezVous.js Demo →**](http://rendezvous.julien-marcou.fr)


How to use
------------------

```javascript
$('#my-datepicker').RendezVous();
```


How to configure
------------------

```javascript
var settings = { /* ... */ };
$('#my-datepicker').RendezVous(settings);
```

```javascript
var callback = function(rdv) { /* ... */ };
$('#my-datepicker').RendezVous(callback);
```

```javascript
var settings = { /* ... */ };
var callback = function(rdv) { /* ... */ };
$('#my-datepicker').RendezVous(settings, callback);
```


Custom settings
------------------

```javascript
	// If false, the datepicker can be only closed by calling "close();"
	canClose: true
```

```javascript
	// If true, the datepicker is open by default
	openByDefault: false
```

```javascript
	// If true, the date input will be split in day, month and year inputs
	splitInput: false
```

```javascript
	// If false, input content can be edited
	inputReadOnly: true
```

```javascript
	// If false, input will contains the default date by default
	inputEmptyByDefault: true
```

```javascript
	// Separator between inputs (for splitted input)
	inputSeparator: ' / '
```

```javascript
	// Default scale at which the datepicker opens
	defaultScale: 'month' // month, year, decade
```

```javascript
	// Input formats
	formats: {
		display: {
			day:   '%D',          // day input (for splitted input)
			month: '%Month',      // month input (for splitted input)
			year:  '%Y',          // year input (for splitted input)
			date:  '%D %Month %Y' // date input
		}
	}

	/**
	 * Available formats
	 *
	 * DAYS
	 * %d   : Numeric day (e.g. 2)
	 * %D   : Numeric day with leading zeros (e.g. 02)
	 * %da  : Textual day abbreviation (e.g mon)
	 * %Da  : Textual capitalized day abbreviation (e.g Mon)
	 * %day : Textual day (e.g monday)
	 * %Day : Textual capitalized day (e.g Monday)
	 *
	 * MONTHS
	 * %m     : Numeric month (e.g. 1)
	 * %M     : Numeric month with leading zeros (e.g. 01)
	 * %mo    : Textual month abbreviation (e.g jan)
	 * %Mo    : Textual capitalized month abbreviation (e.g Jan)
	 * %month : Textual month (e.g january)
	 * %Month : Textual capitalized month (e.g January)
	 *
	 * YEARS
	 * %y : Numeric year, 2 digits (e.g 15)
	 * %Y : Numeric year, 4 digits (e.g 2015)
	 *
	 * DECADES
	 * %x0 : Numeric decade start, 2 digits (e.g 10)
	 * %X0 : Numeric decade start, 4 digits (e.g 2010)
	 * %x9 : Numeric decade end, 2 digits (e.g 19)
	 * %X9 : Numeric decade end, 4 digits (e.g 2019)
	 */
```

```javascript
	// Default selected date
	defaultDate: {
		day:   today.getDate(),    // 1 through 31
		month: today.getMonth(),   // 0 through 11
		year:  today.getFullYear() // No limits
	}
```

```javascript
	// Current language (see live demo at http://rendezvous.julien-marcou.fr)
	i18n: { /* ... */ }
```


Custom callback
------------------

```javascript
$('#my-datepicker').RendezVous(function(rdv) {

	// To open the datepicker
	rdv.open();

	// To close the datepicker
	rdv.close();

	// To set the day of the datepicker
	rdv.setDay(day); // 1 through 31

	// To get the day of the datepicker
	rdv.getDay();

	// To set the month of the datepicker
	rdv.setMonth(month); // 1 through 12

	// To get the month of the datepicker
	rdv.getMonth();

	// To set the year of the datepicker
	rdv.setYear(year); // No limits

	// To get the year of the datepicker
	rdv.getYear();

	// To get the decade of the datepicker
	rdv.getDecade();

	// To set the date of the datepicker
	// (combination of the 3 previous)
	rdv.setDate(day, month, year);

	// To get the date of the datepicker (Date object)
	rdv.getDate();

	// To set the date to the previous day
	rdv.previousDay();

	// To set the date to the next day
	rdv.nextDay();

	// To set the date to the previous month
	rdv.previousMonth();

	// To set the date to the next month
	rdv.nextMonth();

	// To set the date to the previous year
	rdv.previousYear();

	// To set the date to the next year
	rdv.nextYear();

	// To set the date to the previous decade
	rdv.previousDecade();

	// To set the date to the next decade
	rdv.nextDecade();

	// To set the scale of the datepicker
	rdv.setScale(scale); // month, year, decade

	// To get the current scale of the datepicker
	rdv.getScale();

});
```
