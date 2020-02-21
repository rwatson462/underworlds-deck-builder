import { Config } from './data.js';

export function Debug( ...msg: any): void
{
	// msg.forEach( (m: any) => {
	// 	console.log( m ) 
	// });
}

export function showConfigClick( event: MouseEvent ): void
{
	event.preventDefault();
	console.log( Config );
}

let startTime;

export function startTimer(): void
{
	startTime = Date.now();
	// console.log( 'Starting timer' );
}

export function stopTimer(): void
{
	const endTime = Date.now() - startTime;
	// console.log( 'Stopping timer', endTime );
}