const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {

    let decodedString = '';

    function MakeConvertTable( HumanMorse ){
        const dotSign = {
            source: '10',
            morse: '.',
        } ;
        const dashSign = {
            source: '11',
            morse: '-',
        } ;
        const spaceSign = {
            source: '**********',
            morse: ' ',
        }
        let hashResTable = new Map()
        for( let key in HumanMorse ){
            let aLetter = HumanMorse[ key ] ;
            let aSource = '';
            for( let i=0; i<key.length; i++ ){

                if( key[i] === dotSign[ 'morse' ] ){
                    aSource = aSource + dotSign[ 'source' ]
                }

                if( key[i] === dashSign[ 'morse' ] ){
                    aSource = aSource + dashSign[ 'source' ]
                }

            }

            aSource = aSource.padStart( 10, '0' );
            hashResTable.set( aSource.toString(), aLetter  );

        }

        hashResTable.set( spaceSign[ 'source' ] , spaceSign[ 'morse' ] );

        return hashResTable;
    }

    function SplitSourceExpressionString( strExpression ){
        const literalLength = 10;
        let currStartIndex = 0; currEndIndex = currStartIndex + literalLength;
        let retArray = [];
        while( currStartIndex < strExpression.length ){
            let currLiteral = strExpression.slice( currStartIndex, currStartIndex + literalLength );
            currStartIndex += literalLength;
            retArray = [ ...retArray, currLiteral ];
        }

        return retArray;
    }

    let suitableMorseTable = MakeConvertTable( MORSE_TABLE );
    let slicedExpression = SplitSourceExpressionString( expr );

    for( let sliceIndex = 0; sliceIndex < slicedExpression.length; sliceIndex++ ){
        let currLiteral = slicedExpression[ sliceIndex ];
        decodedString = decodedString + suitableMorseTable.get( currLiteral );
    }

    return decodedString;
    // write your solution here
}

module.exports = {
    decode
}