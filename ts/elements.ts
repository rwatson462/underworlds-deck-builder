import { Card } from './classes.js';
import { Names, BookmarkedCards } from './data.js';
import { bookmarkCard } from './view.js';

export function createCardElement( card: Card ): HTMLElement
{
	const container = document.createElement( 'div' );
	container.classList.add( 'list-group-item', 'card-summary-row' );

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
	el.classList.add( BookmarkedCards[card.id] ? 'fas' : 'far', 'fa-fw', 'fa-bookmark' );   // change 'fas' to 'far' for outlined version (i.e. not bookmarked)

	a.appendChild( el );
	span.appendChild( a );
	container.appendChild( span );

	return container;
}
