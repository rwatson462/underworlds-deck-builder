
/**
 * A placeholder for common functions used in various places
 */

 interface Array<T>
 {
	 contains( search: any ): boolean;
 }

Array.prototype.contains = function( search: any ): boolean
{
	for( let i = 0; i < this.length; i++ )
		if( this[i] == search )
			return true;
}