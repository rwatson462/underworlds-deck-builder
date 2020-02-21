import './functions.js';
import { Card } from './classes.js';
import { registerClickHandlers, refreshView } from './view.js';
import { Cards, BookmarkedCards } from './data.js';
import { Debug } from './debug.js';
import { getStoredObject, storeObject } from './storage.js';


(function init() {
	Debug( 'Underworlds deck builder initialising' );
	registerClickHandlers();
	loadStoredData();
	getCardData();
})();

function loadStoredData(): void
{
	// load bookmarked cards from local storage
	const bookmarked = getStoredObject( 'BOOKMARK_CARDS' );
	if( bookmarked )
		for( let prop in bookmarked )
		{
			if( bookmarked.hasOwnProperty( prop ) )
				BookmarkedCards[ prop ] = true;
		}
}

function getCardData(): void
{
	Debug( 'Fetching card data' );
	const data = getStoredObject( 'CARDS' );
	if( data )
	{
		cacheCardData( <Card[]> data );
		refreshView();
		return;
	}

	fetch( 'data.json' )
		.then( response => response.json() )
		.then( json => {
			cacheCardData( json.cards );
			refreshView();
		} );
}

function cacheCardData( cards: Card[] ): void
{
	for( let i = 0; i < cards.length; i++ )
	{
		const card: Card = cards[i];
		switch( card.type )
		{
			case 'objective':
				card.typeId = card.surge ? 1 : 0;
				break;
			case 'ploy':
				card.typeId = 2;
				break;
			case 'gambitspell':
				card.typeId = 3;
				break;
			case 'upgrade':
				card.typeId = 4;
		}

		// store to active working data
		Cards.push( card );
	}
	Debug( Cards.length + ' cards loaded' );

	// save in localstorage for quicker repsonse next refresh.  Only stores for 5 minutes by default
	storeObject( 'CARDS', Cards );
}