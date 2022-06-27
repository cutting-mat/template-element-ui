/**
 * 最少6位字符
 * 最少符合下列四项规则中的三项:
 * - 大写字母
 * - 小写字母
 * - 数字
 * - 特殊符号
 */
const strReverse = function (str) {
  let newstring = "";
  for (let s = 0; s < str.length; s++) {
    newstring = str.charAt(s) + newstring;
  }
  return newstring;
};

export const checkPassword = function (pwd, nMinPwdLen) {
  // Simultaneous variable declaration and value assignment aren't supported in IE apparently
  // so I'm forced to assign the same value individually per var to support a crappy browser *sigh*
  let nScore = 0,
    nLength = 0,
    nAlphaUC = 0,
    nAlphaLC = 0,
    nNumber = 0,
    nSymbol = 0,
    nMidChar = 0,
    nRequirements = 0,
    nUnqChar = 0,
    nRepChar = 0,
    nRepInc = 0,
    nConsecAlphaUC = 0,
    nConsecAlphaLC = 0,
    nConsecNumber = 0,
    nSeqAlpha = 0,
    nSeqNumber = 0,
    nSeqSymbol = 0,
    nReqChar = 0,
    category = 0; // Types of Statistical Characters
  let nMultMidChar = 2,
    nMultConsecAlphaUC = 2,
    nMultConsecAlphaLC = 2,
    nMultConsecNumber = 2;
  let nMultSeqAlpha = 3,
    nMultSeqNumber = 3,
    nMultSeqSymbol = 3;
  let nMultLength = 4,
    nMultNumber = 4;
  let nMultSymbol = 6;
  let nTmpAlphaUC = "",
    nTmpAlphaLC = "",
    nTmpNumber = "";
  let sAlphas = "abcdefghijklmnopqrstuvwxyz";
  let sNumerics = "01234567890";
  let sSymbols = "~!@#$%^&*()_+,./";
  nMinPwdLen = nMinPwdLen || 6;

  if (pwd) {
    nScore = parseInt(pwd.length * nMultLength);
    nLength = pwd.length;
    let arrPwd = pwd.replace(/\s+/g, "").split(/\s*/);
    let arrPwdLen = arrPwd.length;

    /* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
    for (let a = 0; a < arrPwdLen; a++) {
      if (arrPwd[a].match(/[A-Z]/g)) {
        // 匹配大写字母
        if (nTmpAlphaUC !== "") {
          if (nTmpAlphaUC + 1 == a) {
            nConsecAlphaUC++;
          }
        }
        nTmpAlphaUC = a;
        nAlphaUC++;
      } else if (arrPwd[a].match(/[a-z]/g)) {
        // 匹配小写字母
        if (nTmpAlphaLC !== "") {
          if (nTmpAlphaLC + 1 == a) {
            nConsecAlphaLC++;
          }
        }
        nTmpAlphaLC = a;
        nAlphaLC++;
      } else if (arrPwd[a].match(/[0-9]/g)) {
        // 匹配数字
        if (a > 0 && a < arrPwdLen - 1) {
          nMidChar++;
        }
        if (nTmpNumber !== "") {
          if (nTmpNumber + 1 == a) {
            nConsecNumber++;
          }
        }
        nTmpNumber = a;
        nNumber++;
      } else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) {
        if (a > 0 && a < arrPwdLen - 1) {
          nMidChar++;
        }
        nSymbol++;
      }
      /* Internal loop through password to check for repeat characters */
      let bCharExists = false;
      for (let b = 0; b < arrPwdLen; b++) {
        if (arrPwd[a] == arrPwd[b] && a != b) {
          /* repeat character exists */
          bCharExists = true;
          /* 
              Calculate icrement deduction based on proximity to identical characters
              Deduction is incremented each time a new match is discovered
              Deduction amount is based on total password length divided by the
              difference of distance between currently selected match
              */
          nRepInc += Math.abs(arrPwdLen / (b - a));
        }
      }
      if (bCharExists) {
        nRepChar++;
        nUnqChar = arrPwdLen - nRepChar;
        nRepInc = nUnqChar ? Math.ceil(nRepInc / nUnqChar) : Math.ceil(nRepInc);
      }
    }

    /* Check for sequential alpha string patterns (forward and reverse) */
    for (let s = 0; s < 23; s++) {
      let sFwd = sAlphas.substring(s, parseInt(s + 3));
      let sRev = strReverse(sFwd);
      if (
        pwd.toLowerCase().indexOf(sFwd) != -1 ||
        pwd.toLowerCase().indexOf(sRev) != -1
      ) {
        nSeqAlpha++;
      }
    }

    /* Check for sequential numeric string patterns (forward and reverse) */
    for (let s = 0; s < 8; s++) {
      let sFwd = sNumerics.substring(s, parseInt(s + 3));
      let sRev = strReverse(sFwd);
      if (
        pwd.toLowerCase().indexOf(sFwd) != -1 ||
        pwd.toLowerCase().indexOf(sRev) != -1
      ) {
        nSeqNumber++;
      }
    }

    /* Check for sequential symbol string patterns (forward and reverse) */
    for (let s = 0; s < 8; s++) {
      let sFwd = sSymbols.substring(s, parseInt(s + 3));
      let sRev = strReverse(sFwd);
      if (
        pwd.toLowerCase().indexOf(sFwd) != -1 ||
        pwd.toLowerCase().indexOf(sRev) != -1
      ) {
        nSeqSymbol++;
      }
    }

    /* Modify overall score value based on usage vs requirements */
    /* General point assignment */
    if (nAlphaUC > 0 && nAlphaUC < nLength) {
      nScore = parseInt(nScore + (nLength - nAlphaUC) * 2);
    }
    if (nAlphaLC > 0 && nAlphaLC < nLength) {
      nScore = parseInt(nScore + (nLength - nAlphaLC) * 2);
    }
    if (nNumber > 0 && nNumber < nLength) {
      nScore = parseInt(nScore + nNumber * nMultNumber);
    }
    if (nSymbol > 0) {
      nScore = parseInt(nScore + nSymbol * nMultSymbol);
    }
    if (nMidChar > 0) {
      nScore = parseInt(nScore + nMidChar * nMultMidChar);
    }
    /* Point deductions for poor practices */
    if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {
      // Only Letters
      nScore = parseInt(nScore - nLength);
    }
    if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {
      // Only Numbers
      nScore = parseInt(nScore - nLength);
    }
    /* Types of Statistical Characters */
    if (nAlphaLC > 0) category++;
    if (nAlphaUC > 0) category++;
    if (nSymbol > 0) category++;
    if (nNumber > 0) category++;

    if (nRepChar > 0) {
      // Same character exists more than once
      nScore = parseInt(nScore - nRepInc);
    }
    /* Consecutive */
    if (nConsecAlphaUC > 0) {
      // Consecutive Uppercase Letters exist
      nScore = parseInt(nScore - nConsecAlphaUC * nMultConsecAlphaUC);
    }
    if (nConsecAlphaLC > 0) {
      // Consecutive Lowercase Letters exist
      nScore = parseInt(nScore - nConsecAlphaLC * nMultConsecAlphaLC);
    }
    if (nConsecNumber > 0) {
      // Consecutive Numbers exist
      nScore = parseInt(nScore - nConsecNumber * nMultConsecNumber);
    }
    /**存在连续字符串包括字母、数字、特殊字符 */
    if (nSeqAlpha > 0) {
      // Sequential alpha strings exist (3 characters or more)
      nScore = parseInt(nScore - nSeqAlpha * nMultSeqAlpha);
    }
    if (nSeqNumber > 0) {
      // Sequential numeric strings exist (3 characters or more)
      nScore = parseInt(nScore - nSeqNumber * nMultSeqNumber);
    }
    if (nSeqSymbol > 0) {
      // Sequential symbol strings exist (3 characters or more)
      nScore = parseInt(nScore - nSeqSymbol * nMultSeqSymbol);
    }

    /* Determine if mandatory requirements have been met and set image indicators accordingly */
    let arrChars = [nLength, nAlphaUC, nAlphaLC, nNumber, nSymbol];
    let arrCharsIds = ["nLength", "nAlphaUC", "nAlphaLC", "nNumber", "nSymbol"];
    let arrCharsLen = arrChars.length;
    for (let c = 0; c < arrCharsLen; c++) {
      let minVal = 0;
      if (arrCharsIds[c] == "nLength") {
        minVal = parseInt(nMinPwdLen - 1);
      }
      if (arrChars[c] == parseInt(minVal + 1)) {
        nReqChar++;
      } else if (arrChars[c] > parseInt(minVal + 1)) {
        nReqChar++;
      }
    }
    nRequirements = nReqChar;
    let nMinReqChars = 4;
    if (pwd.length >= nMinPwdLen) {
      nMinReqChars = 3;
    }
    if (nRequirements > nMinReqChars) {
      // One or more required characters exist
      nScore = parseInt(nScore + nRequirements * 2);
    }
    /* Determine complexity based on overall score */
    if (nScore > 100) {
      nScore = 100;
    } else if (nScore < 0) {
      nScore = 0;
    }
  }
  // 只存在一种字符时, 强制将为弱
  if (category < 2) {
    nScore = 0;
  }
  return { nScore, category };
};