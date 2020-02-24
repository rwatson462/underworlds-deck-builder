
export interface Card
{
	glory:       number,   // TODO remove. if this is an objective, this is how much glory it's worth
	id:          number,   // prefixed with season id, e.g. S1, NV456, BGGP22
	warbandId:   number,   // TODO replace this with faction_id
	setId:       number,   // TODO replace this with release_id
	type:        string,   // TODO remove this once typeId is set. objective, upgrade, ploy, gambitspell
	name:        string,   // the name on the card
	colourText:  string,   // TODO replace this with flavour_text
	rulesText:   string,   // TODO move this to rules_text
	number:      number,   // card number in relation to its set
	is_new:      boolean,  // TODO remove this
	surge:       boolean,  // TODO remove. Flag for whether an objective is a surge
	typeId?:     number    // TODO add this to data file, currently it's generated when importing in JS.  ID relating to what type of card this is
}