
/**
 * Functions for interacting with localStorage
 */


// gets a stored key from localstorage
function getStorageItem( key: string ): string
{
	let item: string;
	if( localStorage )
		item = localStorage.getItem( key );

	return item;
}

// sets a given key/value pair in locastorage
function setStorageItem( key: string, value: string ): void
{
	if( localStorage )
		localStorage.setItem( key, value );
}

// stores an object with a default expiry time of 5 minutes
export function storeObject( key: string, value: object, expiry: number = 5*60*1000 ): void
{
	if( localStorage )
	{
		const str: string = JSON.stringify( value );
		setStorageItem( key, str );

		// only set expiry if given as zero or a positive number (purpose of giving zero will expire the key immediately)
		if ( expiry >= 0 )
			setStorageItem( key+'_expire', (Date.now() + expiry).toString() );
	}
}

// gets a previously stored object from localstorage
export function getStoredObject( key: string ): object
{
	const exp: number = parseInt( getStorageItem( key+'_expire' ) );
	if( exp && exp - Date.now() > 0 )
	{
		const str: string = getStorageItem( key );
		return JSON.parse( str );
	}
	else
		console.log( 'storage expired' );
}