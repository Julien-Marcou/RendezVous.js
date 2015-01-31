
SyntaxHighlighter.defaults['toolbar'] = false;
SyntaxHighlighter.all();

/* Configurable Datepicker */
$('#rendez-vous').RendezVous();

/* Default date Datepicker */
$('#rendez-vous-date').RendezVous({
	inputEmptyByDefault: false,
	defaultDate: {
		day: 1,
		month: 1,
		year: 2011
	}
});

/* Custom language Datepicker */
$('#rendez-vous-french').RendezVous({
	i18n: {
		calendar: {
			month: {
				previous: 'Mois précédent',
				next:     'Mois suivant',
				up:       'Sélectionner un mois'
			},
			year: {
				previous: 'Année précédente',
				next:     'Année suivante',
				up:       'Sélectionner une année'
			},
			decade: {
				previous: 'Décennie précédente',
				next:     'Décennie suivante',
				up:       'Sélectionner un jour'
			}
		},
		days: {
			abbreviation: {
				monday:    'Lun',
				tuesday:   'Mar',
				wednesday: 'Mer',
				thursday:  'Jeu',
				friday:    'Ven',
				saturday:  'Sam',
				sunday:    'Dim'
			},
			entire: {
				monday:    'Lundi',
				tuesday:   'Mardi',
				wednesday: 'Mercredi',
				thursday:  'Jeudi',
				friday:    'Vendredi',
				saturday:  'Samedi',
				sunday:    'Dimanche'
			}
		},
		months: {
			abbreviation:
			{
				january:   'Jan',
				february:  'Fév',
				march:     'Mar',
				april:     'Avr',
				may:       'Mai',
				june:      'Juin',
				july:      'Juil',
				august:    'Aou',
				september: 'Sep',
				october:   'Oct',
				november:  'Nov',
				december:  'Déc'
			},
			entire: {
				january:   'Janvier',
				february:  'Février',
				march:     'Mars',
				april:     'Avril',
				may:       'Mai',
				june:      'Juin',
				july:      'Juillet',
				august:    'Août',
				september: 'Septembre',
				october:   'Octobre',
				november:  'Novembre',
				december:  'Décembre'
			}
		}
	}
});

/* Fullscreen opening Datepicker */
$('#rendez-vous-fullscreen').RendezVous();

/* Custom date format Datepicker */
$('#rendez-vous-format').RendezVous({
	formats: {
		display: {
			date: '%Day %d %Month %Y'
		}
	}
});

/* Input split Datepicker */
$('#rendez-vous-split').RendezVous({
	splitInput: true
});

/* Catch events Datepicker */
$('#rendez-vous-events')
	.on('rendezvous-init', function(event, rdv) {
		console.log('rdv-init');
	})
	.on('rendezvous-open', function(event, rdv) {
		console.log('rdv-open');
	})
	.on('rendezvous-close', function(event, rdv) {
		console.log('rdv-close');
	})
	.on('rendezvous-change', function(event, rdv) {
		console.log('rdv-change');
	})
.RendezVous();

/* Always open Datepicker */
$('#rendez-vous-open').RendezVous({
		canClose: false,
		openByDefault: true
	}
);
