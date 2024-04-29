export const AlphabetOnly = '^[a-zA-Z \-\']+';
export const IsValidMobile = "^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$";
export const IsValidPassword = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#])[A-Za-z0-9@$!%*?&#]{8,14}$";
export const NumberOnly = "^[0-9]*$";
export const CharacterOnly = "^[A-Za-z]*$";
export const AlphaNumericOnly = "^[A-Za-z0-9]*$";
export const CharacterANDSpaceOnly = "^[a-zA-Z]{1,}( [a-zA-Z ]{1,})$";
export const CharacterAndOptionalSpace = "^[A-Za-z][A-Za-z ?]*$";
export const IsValidName = "^[a-zA-Z]{1,}( [a-zA-Z. ]{1,})$";
export const IsValidAddress = "^[A-Za-z0-9\/ ,.-]+$";
export const IsValidEmail = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

//validation on keypress for alphabets and optional space 
export function name(event) {
    var k;
    k = event.charCode;
    return (k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32;
  }

  //validation on keypress for numbers only
  export function number(event) {
    var k;
    k = event.charCode;
    return (k > 47 && k < 58) || k == 8;
  }