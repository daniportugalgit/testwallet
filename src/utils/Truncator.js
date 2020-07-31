class Truncator {
  static tx(fullStr, maxLen, separator) {
    if (fullStr.length <= maxLen) return fullStr;

    separator = separator || '...';

    var sepLen = separator.length,
        charsToShow = maxLen - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2);

    return fullStr.substr(0, frontChars) + 
           separator + 
           fullStr.substr(fullStr.length - backChars);
  }
}

export default Truncator;