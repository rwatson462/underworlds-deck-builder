/**
 * exchange.js deals with import and export of saved decks with other providers (underworldsdb, etc)
 */


// uwdb deck format = csv of card ids. e.g. s1,bg4,bggp21,nv458

// underworldsdb format:
// https://www.underworldsdb.com/shared.php?deck=0,B76,B81,N427,B341,B88,B94,B96,B90,B281,N357,B71,P47,N529,N302,N493,G18,N409,N550,G24,B384,B375,N320,B308,N341,B296,B73,B328,B359,G14,B393,B306,N368

// deckers format:
// https://www.underworlds-deckers.com/en/deck-builder/the-grymwatch/?ObjectiveCard=2302,2320,2341,2357,2368,5071,5073,5076,5281,5296,5306,5308&GambitCard=2409,2427,3047,5081,5328,5341,5359,5375,6014,6018&UpgradeCard=2493,2529,2550,5088,5090,5094,5096,5384,5393,6024

export function importDeck( deckString: string ): boolean
{
    if( deckString.indexOf( 'underworldsdb' ) !== -1 )
    {
        deckString = deckString.substring( deckString.indexOf( 'deck=0' ) + 7 );
        if( deckString.length == 0 )
            return false;

        console.log( deckString) ;
    }

    return true;
}