var forms = [
  'Write here',
  'Write her.',
  'Write hee.',
  'Write hre.',
  'Write ere.',
  'Writehere.',
  'Writ here.',
  'Wrie here.',
  'Wrte here.',
  'Wite here.',
  'rite here.'
];

function checkForm(string) {
  for (var index=0; index<forms.length; index++) {
    if (string === forms[index]) {
      return true;
    }
  }
  return false;
};

module.exports = checkForm;
