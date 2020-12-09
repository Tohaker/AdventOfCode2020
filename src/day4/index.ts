import { splitEntriesByBlankLine } from '../common';

const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].sort();
const optionalKeys = ['cid'].sort();
const eyeColours = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

type Passport = {
  byr: string;
  iyr: string;
  eyr: string;
  hgt: string;
  hcl: string;
  ecl: string;
  pid: string;
  cid?: string;
};

const convertToJSON = (line: string): Passport => {
  const jsonString =
    '{"' + line.trim().replace(/ /g, '", "').replace(/:/g, '": "') + '"}';
  return JSON.parse(jsonString);
};

const parsePassports = (input: string[]): Passport[] =>
  splitEntriesByBlankLine(input).map(convertToJSON);

const findValidPassports = (input: Passport[]) =>
  input.filter((passport) => {
    const keys = Object.keys(passport).sort();
    const keysWithoutOptionals = keys.filter((k) => !optionalKeys.includes(k));

    if (keysWithoutOptionals.length !== requiredKeys.length) return false;

    return (
      keysWithoutOptionals.filter((key) => !requiredKeys.includes(key))
        .length === 0
    );
  });

const validateFields = (input: Passport[]) =>
  input.filter((passport) => {
    const byr = parseInt(passport.byr);
    const iyr = parseInt(passport.iyr);
    const eyr = parseInt(passport.eyr);
    const [hgtValue, hgtUnit]: string[] = passport.hgt.split(/(\d+)/).slice(1);

    if (byr < 1920 || byr > 2002) return false;
    if (iyr < 2010 || iyr > 2020) return false;
    if (eyr < 2020 || eyr > 2030) return false;

    const val = parseInt(hgtValue);
    switch (hgtUnit) {
      case 'cm':
        if (val < 150 || val > 193) return false;
        break;
      case 'in':
        if (val < 59 || val > 76) return false;
        break;
      default:
        return false;
    }

    if (
      passport.hcl.charAt(0) !== '#' ||
      passport.hcl.substr(1).length !== 6 ||
      !passport.hcl.substr(1).match(/[0-9a-f]+/)
    )
      return false;

    if (!eyeColours.includes(passport.ecl)) return false;
    if (passport.pid.length !== 9 || isNaN(parseInt(passport.pid)))
      return false;

    return true;
  });

const part1 = (input: string[]) =>
  findValidPassports(parsePassports(input)).length;

const part2 = (input: string[]) =>
  validateFields(findValidPassports(parsePassports(input))).length;

export default {
  part1,
  part2,
};
