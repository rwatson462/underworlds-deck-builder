<?php

/**
 * Loads a card image returning a big cachable time
 */

// this should be a card id (e.g. S1, BG427, BGGP17)
$card = isset( $_REQUEST[ 'card' ] )
	? $_REQUEST[ 'card' ]
	: '';

// validate card is
$season = strtoupper( preg_replace( '/[\d]*$/', '', $card ) );
$number = preg_replace( '/^[a-zA-Z]*/', '', $card );

if( !$season || !$number )
	exit( 'Invaild card number (1)' );

// validate card number against maximum number of cards in the season
// start to build directory to find image
switch( $season )
{
	case 'S':
		$max_card = 437;
		$image_dir = 'shadespire';
		break;
	case 'L':
		$max_card = 60;
		$image_dir = 'leaders';
		break;
	case 'NV':
		$max_card = 557;
		$image_dir = 'nightvault';
		break;
	case 'NVPU':
		$max_card = 60;
		$image_dir = 'power_unbound';
		break;
	case 'COD':
		$max_card = 60;
		$image_dir = 'dreadfane';
		break;
	case 'BG':
		$max_card = 438;
		$image_dir = 'beastgrave';
		break;
	case 'BGGP':
		$max_card = 32;
		$image_dir = 'beastgrave_gift_pack';
		break;
	default:
		exit( 'Invalid card number (2)' );
}

if( $number < 1 || $number > $max_card )
	exit( 'Invalid card number (3)' );

// TODO once code is suitably live, replace this with relative url and add file_exists check
$url = 'http://uwdb.uk/images/cards/' . $image_dir . '/' . $season . $number . '.png';

// opportunity to place logging here to count accesses of images

// send super cache headers, allowing the browser to cache this request for up to a year
header( 'Cache-Control: public, max-age=31536000' );

// output the image
readfile( $url );