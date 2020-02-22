import { Card } from './classes.js';
import { Names, BookmarkedCards } from './data.js';
import { bookmarkCard } from './view.js';

export function createCardElement( card: Card ): HTMLElement
{
	const container = document.createElement( 'div' );

	let span = document.createElement( 'span' );
	span.innerText = `${card.id} - ${card.name}`;
	container.appendChild( span );

	span = document.createElement( 'span' );
	span.innerText = Names.cardTypes[ card.typeId ];
	container.appendChild( span );

	span = document.createElement( 'span' );
	span.classList.add( 'text-right' );
	
	// check if this card is bookmarked
	let a = document.createElement( 'a' );
	a.href = '#';
	a.dataset.cardId = card.id.toString();
	a.addEventListener( 'click', bookmarkCard );

	let el = document.createElement( 'span' );
	el.classList.add( 'icon-bookmark' );
	if( BookmarkedCards[card.id] )
		el.classList.add( 'selected' );

	a.appendChild( el );
	span.appendChild( a );
	container.appendChild( span );

	return container;
}
