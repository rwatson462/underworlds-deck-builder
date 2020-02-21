import { Card } from './classes.js';

/**
 * Store this ridiculously huge list of available filters in a separate data object
 * as a single source of truth.  UI actions update this object, then the view is re-drawn based on this config
 * This way, no matter where we are in the app, we know what filters are selected without needing to refer to DOM elements
 */

// TODO add expansion filters
// TODO add championship, relic, open play filters
// TODO add season filters (Shadespire, Nightvault, Beastgrave)

export const Config = {
	activeCardTypeFilters: [ 
		false, // end phase objectives
		false, // surge objectives
		false, // ploys
		false, // spells
		false  // upgrades
	],
	activeFactionFilters: [ 
		false, // universal
		false, // garrek's reavers
		false, // steelheart's champions
		false, // sepulchral guard
		false, // ironskull's boyz
		false, // chosen axes
		false, // spiteclaw's swarm
		false, // magores fiends
		false, // farstriders
		false, // stormsire's cursebreakers
		false, // thorns of the briar queen
		false, // eyes of the nine
		false, // zarbag's gitz
		false, // godsworn hunt
		false, // mollog's mob
		false, // ylthari's guardians
		false, // thunkdrick's profiteers
		false, // ironsoul's condemnors
		false, // lady harrow's mournflight
		false, // grashrak's despoilers
		false, // skaeth's wild hunt
		false, // the grymwatch
		false, // rippa's snarlfangs
		false, // the wurmspat
		false, // hrothgorn's mantrappers
		false, // season 3, warband 7
		false, // season 3, warband 8
	],
	activeCustomFilters: [
		false  // favourite cards
	]
};

export const Names = {
	warbands: [
		'Universal',
		"Garrek\'s Reavers",
		"Steelheart's Champions",
		'Sepulchral Guard',
		"Ironskull's Boyz",
		'Chosen Axes',
		"Spiteclaw's Swarm",
		"Magore's Fiends",
		'Farstriders',
		"Stormsire's Cursebreakers",
		'Thorns of the Briar Queen',
		'Eyes of the Nine',
		"Zarbag's Gitz",
		'Godsworn Hunt',
		"Mollog's Mob",
		"Thunkdrik's Profiteers",
		"Ylthari's Guardians",
		"Grashrak's Depoilers",
		"Skaeth's Wild Hunt",
		"Grymwatch",
		"Rippa's Snarlfangs",
		"Ironsoul's Condemnors",
		"Lady Harrow's Mournflight",
		'Wurmspat',
		"Hrothgorn's Mantrappers",
		'tba', // warband 7 from Beastgrave
		'tba'  // warband 8 from Beastgrave
	],
	cardTypes: [
		'End Phase Objective',
		'Surge Objective',
		'Gambit Ploy',
		'Gambit Spell',
		'Upgrade'
	]
};

// Will be populated with all the cards in the game
export const Cards: Card[] = [];

// Will contain a subset of Cards that are currently being shown displayed
export const FilteredCards: Card[] = [];

/**
 * A list of all card that have been bookmarked by the user
 * Stored in an object so we can easily set properties to be the card id (e.g. S040)
 * Adding a card to bookmarks is then as easy as `BookmarkedCards[cardId] = true`
 * Removing a card becomes `delete BookmarkedCards[cardId]`
 */
export const BookmarkedCards: object = {};