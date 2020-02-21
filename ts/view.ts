import { Config, Cards, FilteredCards, BookmarkedCards } from './data.js'
import { Debug, showConfigClick, startTimer, stopTimer } from './debug.js';
import { createCardElement } from './elements.js';
import { storeObject } from './storage.js';

export function registerClickHandlers(): void
{
	document.querySelectorAll( '#js-navigation a' ).forEach( el => {
		el.addEventListener( 'click', handleClick );
	});

	document.querySelectorAll( '.card-filter-btn-group button' ).forEach( el => {
		el.addEventListener( 'click', toggleOptionBtnState );
	});

	document.getElementById( 'card-reset-filters-btn' ).addEventListener( 'click', resetToggleBtnState );

	// TODO remove this handler
	document.getElementById( 'card-show-config-btn' ).addEventListener( 'click', showConfigClick );

	document.getElementById( 'search-text' ).addEventListener( 'keyup', startCardSearch );
}

function handleClick( event: MouseEvent ): void
{
	event.preventDefault();
	const target: HTMLLinkElement = <HTMLLinkElement> event.target;
	Debug( target );
}

function startCardSearch( event: KeyboardEvent): void
{
	event.preventDefault();
	const prevValue: string  = this.dataset.prevValue;
	const searchTerm: string = this.value;

	this.dataset.prevValue = searchTerm;

	// only do anything if the value has actually changed
	if( prevValue != searchTerm )
	{
		clearTimeout( this.dataset.timer );
		this.dataset.timer = setTimeout( refreshView, 300 );
	}
}


// this roughly generic function toggles the config state based on values in the event target's dataset
export function toggleOptionBtnState( event: any ): boolean
{
	const btn = <HTMLElement> event.target;
	const { configKey, configValue } = btn.dataset;

	if( !configValue )
		console.log( configKey, configValue );

	// flip the current config state
	Config[ configKey ][ configValue ] = !Config[ configKey ][ configValue ];

	// refresh the view to update the buttons and any cards displayed
	refreshView();

	event.preventDefault();
	return false;
}


function resetToggleBtnState( event: MouseEvent ): void
{
	event.preventDefault();

	for( let i = 0; i < Config.activeCardTypeFilters.length; i++ )
		Config.activeCardTypeFilters[ i ] = false;

	for( let i = 0; i < Config.activeFactionFilters.length; i++ )
		Config.activeFactionFilters[ i ] = false;

	// clear search text input
	( <HTMLInputElement> document.getElementById( 'search-text' ) ).value = '';

	// refresh the view after altering the config options
	refreshView();
}

export function bookmarkCard( event: MouseEvent ): void
{
	event.preventDefault();

	const card_id = this.dataset.cardId;
	const span = this.querySelector( 'span' );
	if( BookmarkedCards[ card_id ] )
	{
		delete BookmarkedCards[ card_id ];
		span.classList.remove( 'fas' );
		span.classList.add( 'far' );
	}
	else
	{
		BookmarkedCards[ card_id ] = true;
		span.classList.add( 'fas' );
		span.classList.remove( 'far' );
	}

	// update local storage with the bookmarked list, set to expire in approx. 1 year
	storeObject( 'BOOKMARK_CARDS', BookmarkedCards, 365*24*60*60*1000 );

	// if we're only showing bookmarked cards, refresh the view as this change in bookmarked status might influence what's being displayed
	if( Config.activeCustomFilters[0] === true )
		refreshView();
}


export function refreshView(): void
{
	// update the active state of the filter buttons
	document.querySelectorAll( '.card-filter-btn-group button' ).forEach( el => {
		const element: HTMLElement = <HTMLElement> el;
		const { configKey, configValue } = element.dataset;

		if( Config[ configKey ][ configValue ] === true )
			element.classList.add( 'active' );
		else
			element.classList.remove( 'active' );
	});

	startTimer();

	// clear out the current filtered cards list
	FilteredCards.splice(0);

	// check if we're searching for any text in the cards
	const searchTerm: string = ( <HTMLInputElement> document.getElementById( 'search-text' ) ).value.toLowerCase();

	// to speed up filtering, set up small arrays containing only positive filters.  We can loop over these small arrays to quickly check if we have a hit
	const selectedFactionFilters: number[] = [];
	Config.activeFactionFilters.forEach( (value, key) => {
		if( value === true )
			selectedFactionFilters.push( key );
	});

	const selectedTypeFilters: number[] = [];
	Config.activeCardTypeFilters.forEach( (value, key ) => {
		if( value === true )
			selectedTypeFilters.push( key );
	});

	const selectedCustomFilters: number[] = [];
	Config.activeCustomFilters.forEach( (value, key ) => {
		if( value === true )
			selectedCustomFilters.push( key );
	});

	// add cards to the filtered list
	Cards.forEach( card => {
		if( selectedFactionFilters.length > 0 )
		{
			let found = false;
			for( let j = 0; j < selectedFactionFilters.length; j++ )
				if( selectedFactionFilters[j] == card.warbandId )
					found = true;
			if( !found )
				return;
		}

		if( selectedTypeFilters.length > 0 )
		{
			let found = false;
			for( let j = 0; j < selectedTypeFilters.length; j++ )
				if( selectedTypeFilters[j] == card.typeId )
					found = true;
			if( !found )
				return;
		}

		if( selectedCustomFilters.length > 0 )
		{
			let found = false;
			for( let j = 0; j < selectedCustomFilters.length; j++ )
				if( selectedCustomFilters[j] == 0 && BookmarkedCards[ card.id ] === true )
					found = true;
			if( !found )
				return;
		}

		let found = false;
		[ 'name', 'rulesText', 'colourText' ].forEach( prop => {
			if( card[ prop ] && card[ prop ].toLowerCase().indexOf( searchTerm ) !== -1 )
			{
				found = true;
				return;
			}
		});
		if( !found )
			return;

		FilteredCards.push( card );
	});

	stopTimer();

	const view = document.getElementById( 'js-content' );
	while( view.childNodes.length > 0 )
		view.removeChild( view.firstChild );

	FilteredCards.forEach( card => {
		view.appendChild( createCardElement( card ) );
	});

	document.getElementById( 'js-results-count' ).innerText = `Cards found: ${FilteredCards.length}`;

	stopTimer();
}
