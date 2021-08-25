import * as React from 'react';
import { makeObservable, action, observable } from 'mobx';
import { observer } from 'mobx-react';
import styles from './quiz.module.css';

type Flag = {
  code: string,
  names: string[],
}

const imgUrl = (code: string) => `https://www.countryflags.io/${code}/flat/64.png`

const flags: Flag[] = [
  { names: ['Afghanistan'],	code: 'AF' },
  // { names: ['ALA	Aland Islands'],	code: 'AX' },
  { names: ['Albania'],	code: 'AL' },
  { names: ['Algeria'],	code: 'DZ' },
  // { names: ['American Samoa'],	code: 'AS' },
  { names: ['Andorra'],	code: 'AD' },
  { names: ['Angola'],	code: 'AO' },
  // { names: ['Anguilla'],	code: 'AI' },
  // { names: ['Antarctica'],	code: 'AQ' },
  { names: ['Antigua and Barbuda'],	code: 'AG' },
  { names: ['Argentina'],	code: 'AR' },
  { names: ['Armenia'],	code: 'AM' },
  // { names: ['Aruba'],	code: 'AW' },
  { names: ['Australia'],	code: 'AU' },
  { names: ['Austria'],	code: 'AT' },
  { names: ['Azerbaijan'],	code: 'AZ' },
  { names: ['Bahamas'],	code: 'BS' },
  { names: ['Bahrain'],	code: 'BH' },
  { names: ['Bangladesh'],	code: 'BD' },
  { names: ['Barbados'],	code: 'BB' },
  { names: ['Belarus'],	code: 'BY' },
  { names: ['Belgium'],	code: 'BE' },
  { names: ['Belize'],	code: 'BZ' },
  { names: ['Benin'],	code: 'BJ' },
  // { names: ['Bermuda'],	code: 'BM' },
  { names: ['Bhutan'],	code: 'BT' },
  { names: ['Bolivia'],	code: 'BO' },
  { names: ['Bosnia and Herzegovina'],	code: 'BA' },
  { names: ['Botswana'],	code: 'BW' },
  // { names: ['Bouvet Island'],	code: 'BV' },
  { names: ['Brazil'],	code: 'BR' },
  // { names: ['British Virgin Islands'],	code: 'VG' },
  // { names: ['British Indian Ocean Territory'],	code: 'IO' },
  { names: ['Brunei', 'Brunei Darussalam'],	code: 'BN' },
  { names: ['Bulgaria'],	code: 'BG' },
  { names: ['Burkina Faso'],	code: 'BF' },
  { names: ['Burundi'],	code: 'BI' },
  { names: ['Cambodia'],	code: 'KH' },
  { names: ['Cameroon'],	code: 'CM' },
  { names: ['Canada'],	code: 'CA' },
  { names: ['Cape Verde'],	code: 'CV' },
  // { names: ['Cayman Islands'],	code: 'KY' },
  { names: ['Central African Republic'],	code: 'CF' },
  { names: ['Chad'],	code: 'TD' },
  { names: ['Chile'],	code: 'CL' },
  { names: ['China'],	code: 'CN' },
  { names: ['Hong Kong', 'Hong Kong, SAR China'],	code: 'HK' },
  // { names: ['Macao, SAR China'],	code: 'MO' },
  // { names: ['Christmas Island'],	code: 'CX' },
  // { names: ['Cocos (Keeling) Islands'],	code: 'CC' },
  { names: ['Colombia'],	code: 'CO' },
  { names: ['Comoros'],	code: 'KM' },
  { names: ['Republic of Congo', 'Republic of the Congo', 'Congo (Brazzaville)'],	code: 'CG' },
  { names: ['Democratic Republic of Congo', 'Democratic Republic of the Congo', 'Congo, (Kinshasa)'],	code: 'CD' },
  // { names: ['Cook Islands'],	code: 'CK' },
  { names: ['Costa Rica'],	code: 'CR' },
  { names: ['Ivory Coast', 'Cote dIvoire', 'Cote d\'Ivoire', 'Côte d\'Ivoire'],	code: 'CI' },
  { names: ['Croatia'],	code: 'HR' },
  { names: ['Cuba'],	code: 'CU' },
  { names: ['Cyprus'],	code: 'CY' },
  { names: ['Czechia', 'Czech Republic'],	code: 'CZ' },
  { names: ['Denmark'],	code: 'DK' },
  { names: ['Djibouti'],	code: 'DJ' },
  { names: ['Dominica'],	code: 'DM' },
  { names: ['Dominican Republic'],	code: 'DO' },
  { names: ['Ecuador'],	code: 'EC' },
  { names: ['Egypt'],	code: 'EG' },
  { names: ['El Salvador'],	code: 'SV' },
  { names: ['Equatorial Guinea'],	code: 'GQ' },
  { names: ['Eritrea'],	code: 'ER' },
  { names: ['Estonia'],	code: 'EE' },
  { names: ['Ethiopia'],	code: 'ET' },
  // { names: ['Falkland Islands (Malvinas)'],	code: 'FK' },
  // { names: ['Faroe Islands'],	code: 'FO' },
  { names: ['Fiji'],	code: 'FJ' },
  { names: ['Finland'],	code: 'FI' },
  { names: ['France'],	code: 'FR' },
  // { names: ['French Guiana'],	code: 'GF' },
  // // { names: ['French Polynesia'],	code: 'PF' },
  // { names: ['French Southern Territories'],	code: 'TF' },
  { names: ['Gabon'],	code: 'GA' },
  { names: ['Gambia'],	code: 'GM' },
  { names: ['Georgia'],	code: 'GE' },
  { names: ['Germany'],	code: 'DE' },
  { names: ['Ghana'],	code: 'GH' },
  // { names: ['Gibraltar'],	code: 'GI' },
  { names: ['Greece'],	code: 'GR' },
  // { names: ['Greenland'],	code: 'GL' },
  { names: ['Grenada'],	code: 'GD' },
  // { names: ['Guadeloupe'],	code: 'GP' },
  // { names: ['Guam'],	code: 'GU' },
  { names: ['Guatemala'],	code: 'GT' },
  // { names: ['Guernsey'],	code: 'GG' },
  { names: ['Guinea'],	code: 'GN' },
  { names: ['Guinea-Bissau'],	code: 'GW' },
  { names: ['Guyana'],	code: 'GY' },
  { names: ['Haiti'],	code: 'HT' },
  // { names: ['Heard and Mcdonald Islands'],	code: 'HM' },
  { names: ['Vatican City', 'Holy See (Vatican City State)'],	code: 'VA' },
  { names: ['Honduras'],	code: 'HN' },
  { names: ['Hungary'],	code: 'HU' },
  { names: ['Iceland'],	code: 'IS' },
  { names: ['India'],	code: 'IN' },
  { names: ['Indonesia'],	code: 'ID' },
  { names: ['Iran', 'Iran, Islamic Republic of'],	code: 'IR' },
  { names: ['Iraq'],	code: 'IQ' },
  { names: ['Ireland'],	code: 'IE' },
  // { names: ['Isle of Man'],	code: 'IM' },
  { names: ['Israel'],	code: 'IL' },
  { names: ['Italy'],	code: 'IT' },
  { names: ['Jamaica'],	code: 'JM' },
  { names: ['Japan'],	code: 'JP' },
  // { names: ['Jersey'],	code: 'JE' },
  { names: ['Jordan'],	code: 'JO' },
  { names: ['Kazakhstan'],	code: 'KZ' },
  { names: ['Kenya'],	code: 'KE' },
  { names: ['Kiribati'],	code: 'KI' },
  { names: ['Korea (North)', 'North Korea'],	code: 'KP' },
  { names: ['Korea (South)', 'South Korea'],	code: 'KR' },
  { names: ['Kuwait'],	code: 'KW' },
  { names: ['Kyrgyzstan'],	code: 'KG' },
  { names: ['Laos', 'Lao PDR'],	code: 'LA' },
  { names: ['Latvia'],	code: 'LV' },
  { names: ['Lebanon'],	code: 'LB' },
  { names: ['Lesotho'],	code: 'LS' },
  { names: ['Liberia'],	code: 'LR' },
  { names: ['Libya'],	code: 'LY' },
  { names: ['Liechtenstein'],	code: 'LI' },
  { names: ['Lithuania'],	code: 'LT' },
  { names: ['Luxembourg'],	code: 'LU' },
  { names: ['Macedonia', 'North Macedonia', 'Macedonia, Republic of'],	code: 'MK' },
  { names: ['Madagascar'],	code: 'MG' },
  { names: ['Malawi'],	code: 'MW' },
  { names: ['Malaysia'],	code: 'MY' },
  { names: ['Maldives'],	code: 'MV' },
  { names: ['Mali'],	code: 'ML' },
  { names: ['Malta'],	code: 'MT' },
  { names: ['Marshall Islands'],	code: 'MH' },
  // { names: ['Martinique'],	code: 'MQ' },
  { names: ['Mauritania'],	code: 'MR' },
  { names: ['Mauritius'],	code: 'MU' },
  // { names: ['Mayotte'],	code: 'YT' },
  { names: ['Mexico'],	code: 'MX' },
  { names: ['Micronesia', 'Micronesia, Federated States of'],	code: 'FM' },
  { names: ['Moldova'],	code: 'MD' },
  { names: ['Monaco'],	code: 'MC' },
  { names: ['Mongolia'],	code: 'MN' },
  { names: ['Montenegro'],	code: 'ME' },
  // { names: ['Montserrat'],	code: 'MS' },
  { names: ['Morocco'],	code: 'MA' },
  { names: ['Mozambique'],	code: 'MZ' },
  { names: ['Myanmar'],	code: 'MM' },
  { names: ['Namibia'],	code: 'NA' },
  { names: ['Nauru'],	code: 'NR' },
  { names: ['Nepal'],	code: 'NP' },
  { names: ['Netherlands'],	code: 'NL' },
  // { names: ['Netherlands Antilles'],	code: 'AN' },
  // { names: ['New Caledonia'],	code: 'NC' },
  { names: ['New Zealand', 'NZ'],	code: 'NZ' },
  { names: ['Nicaragua'],	code: 'NI' },
  { names: ['Niger'],	code: 'NE' },
  { names: ['Nigeria'],	code: 'NG' },
  // { names: ['Niue'],	code: 'NU' },
  // { names: ['Norfolk Island'],	code: 'NF' },
  // { names: ['Northern Mariana Islands'],	code: 'MP' },
  { names: ['Norway'],	code: 'NO' },
  { names: ['Oman'],	code: 'OM' },
  { names: ['Pakistan'],	code: 'PK' },
  { names: ['Palau'],	code: 'PW' },
  { names: ['Palestine', 'Palestinian Territory'],	code: 'PS' },
  { names: ['Panama'],	code: 'PA' },
  { names: ['Papua New Guinea'],	code: 'PG' },
  { names: ['Paraguay'],	code: 'PY' },
  { names: ['Peru'],	code: 'PE' },
  { names: ['Philippines'],	code: 'PH' },
  // { names: ['Pitcairn'],	code: 'PN' },
  { names: ['Poland'],	code: 'PL' },
  { names: ['Portugal'],	code: 'PT' },
  // { names: ['Puerto Rico'],	code: 'PR' },
  { names: ['Qatar'],	code: 'QA' },
  // { names: ['Réunion'],	code: 'RE' },
  { names: ['Romania'],	code: 'RO' },
  { names: ['Russia', 'Russian Federation'],	code: 'RU' },
  { names: ['Rwanda'],	code: 'RW' },
  // { names: ['Saint-Barthélemy'],	code: 'BL' },
  // { names: ['Saint Helena'],	code: 'SH' },
  { names: ['Saint Kitts and Nevis'],	code: 'KN' },
  { names: ['Saint Lucia'],	code: 'LC' },
  // { names: ['Saint-Martin (French part)'],	code: 'MF' },
  // { names: ['Saint Pierre and Miquelon'],	code: 'PM' },
  { names: ['Saint Vincent and Grenadines', 'Saint Vincent and the Grenadines'],	code: 'VC' },
  { names: ['Samoa'],	code: 'WS' },
  { names: ['San Marino'],	code: 'SM' },
  { names: ['Sao Tome and Principe'],	code: 'ST' },
  { names: ['Saudi Arabia'],	code: 'SA' },
  { names: ['Senegal'],	code: 'SN' },
  { names: ['Serbia'],	code: 'RS' },
  { names: ['Seychelles'],	code: 'SC' },
  { names: ['Sierra Leone'],	code: 'SL' },
  { names: ['Singapore'],	code: 'SG' },
  { names: ['Slovakia'],	code: 'SK' },
  { names: ['Slovenia'],	code: 'SI' },
  { names: ['Solomon Islands'],	code: 'SB' },
  { names: ['Somalia'],	code: 'SO' },
  { names: ['South Africa'],	code: 'ZA' },
  // { names: ['South Georgia and the South Sandwich Islands'],	code: 'GS' },
  { names: ['South Sudan'],	code: 'SS' },
  { names: ['Spain'],	code: 'ES' },
  { names: ['Sri Lanka'],	code: 'LK' },
  { names: ['Sudan'],	code: 'SD' },
  { names: ['Suriname'],	code: 'SR' },
  // { names: ['Svalbard and Jan Mayen Islands'],	code: 'SJ' },
  { names: ['Swaziland'],	code: 'SZ' },
  { names: ['Sweden'],	code: 'SE' },
  { names: ['Switzerland'],	code: 'CH' },
  { names: ['Syria', 'Syrian Arab Republic (Syria)'],	code: 'SY' },
  { names: ['Taiwan', 'Taiwan, Republic of China'],	code: 'TW' },
  { names: ['Tajikistan'],	code: 'TJ' },
  { names: ['Tanzania', 'Tanzania, United Republic of'],	code: 'TZ' },
  { names: ['Thailand'],	code: 'TH' },
  // { names: ['Timor-Leste'],	code: 'TL' },
  { names: ['Togo'],	code: 'TG' },
  // { names: ['Tokelau'],	code: 'TK' },
  { names: ['Tonga'],	code: 'TO' },
  { names: ['Trinidad and Tobago'],	code: 'TT' },
  { names: ['Tunisia'],	code: 'TN' },
  { names: ['Turkey'],	code: 'TR' },
  { names: ['Turkmenistan'],	code: 'TM' },
  // { names: ['Turks and Caicos Islands'],	code: 'TC' },
  { names: ['Tuvalu'],	code: 'TV' },
  { names: ['Uganda'],	code: 'UG' },
  { names: ['Ukraine'],	code: 'UA' },
  { names: ['United Arab Emirates', 'UAE'],	code: 'AE' },
  { names: ['United Kingdom', 'UK'],	code: 'GB' },
  { names: ['United States of America', 'United States', 'USA', 'US'],	code: 'US' },
  // { names: ['US Minor Outlying Islands'],	code: 'UM' },
  { names: ['Uruguay'],	code: 'UY' },
  { names: ['Uzbekistan'],	code: 'UZ' },
  { names: ['Vanuatu'],	code: 'VU' },
  { names: ['Venezuela', 'Venezuela (Bolivarian Republic)'],	code: 'VE' },
  { names: ['Vietnam', 'Viet Nam'],	code: 'VN' },
  // { names: ['Virgin Islands, US'],	code: 'VI' },
  // { names: ['Wallis and Futuna Islands'],	code: 'WF' },
  // { names: ['Western Sahara'],	code: 'EH' },
  { names: ['Yemen'],	code: 'YE' },
  { names: ['Zambia'],	code: 'ZM' },
  { names: ['Zimbabwe'],	code: 'ZW' },
];

@observer
export class Quiz extends React.Component {
  currScore = 0;
  currFlagIndex = 0;
  answerStatus?: 'close' | 'wrong';
  shuffledFlags: Flag[] | undefined;
  timeRemainingSeconds = 60 * 15;
  // Uncomment for testing:
  // timeRemainingSeconds = 5;
  private inputRef = React.createRef<HTMLInputElement>();
  private id: number | undefined;

  constructor(props: {}) {
    super(props);
    makeObservable(this, {
      currScore: observable,
      currFlagIndex: observable,
      answerStatus: observable,
      shuffledFlags: observable,
      timeRemainingSeconds: observable,
      componentDidMount: action,
      checkAnswer: action,
      giveUp: action,
    });
  }

  componentDidMount() {
    this.shuffledFlags = shuffle(flags);
    this.id = window.setInterval(this.updateTime, 1000);
  }

  private readonly updateTime = action(() => {
    if (this.timeRemainingSeconds > 1){
      this.timeRemainingSeconds -= 1;
    } else {
      this.timeRemainingSeconds -= 1;
      this.currFlagIndex = this.shuffledFlags!.length;
      window.clearInterval(this.id);
    }
  });

  readonly checkAnswer = () => {
    const names = this.shuffledFlags![this.currFlagIndex].names;
    for (let i = 0; i < names.length; ++i) {
      if (closeMatch(this.inputRef.current!.value, names[i])) {
        this.answerStatus = undefined;
        this.inputRef.current!.value = '';
        this.currFlagIndex++;
        this.currScore++;
        return;
      } else if (almostMatch(this.inputRef.current!.value, names[i])) {
        this.answerStatus = 'close';
        return;
      }
    }

    this.checkIfWrong();
  };

  private readonly checkIfWrong = debounce(() => {
    console.log('calling debounce')
    for (let i = 0; i < this.shuffledFlags!.length; ++i) {
      if (i === this.currFlagIndex) {
        continue;
      }
      const names = this.shuffledFlags![i].names;
      for (let j = 0; j < names.length; ++j) {
        if (closeMatch(this.inputRef.current!.value, names[j])) {
          this.answerStatus = 'wrong';
          return;
        }
      }
    }
    this.answerStatus = undefined;
  });

  readonly giveUp = () => {
    if (window.confirm('Are you sure you want to end the quiz?')) {
      this.timeRemainingSeconds = 1;
    }
  };

  render() {
    return this.shuffledFlags ? (
      <div className={styles.container}>
        <h1 className={styles.title}>World Flag Quiz</h1>
        {this.currFlagIndex < this.shuffledFlags.length ? (
          <>
            <img
              className={styles.flag}
              alt="Flag" src={imgUrl(this.shuffledFlags[this.currFlagIndex].code)}
            />
            <input
              onChange={this.checkAnswer}
              ref={this.inputRef}
              type="text"
              className={styles.input}
              placeholder="Guess the flag"
            />
            <p className={styles.answerStatus} style={{
              color: this.answerStatus === 'close'
                  ? 'orange'
                  : (this.answerStatus === 'wrong' ? 'red' : 'white'),
            }}>
              {this.answerStatus === 'close' && <>Close!</>}
              {this.answerStatus === 'wrong' && <>Try again...</>}
              {!this.answerStatus && <>...</>}
            </p>
            <div className={styles.info}>
              <div className={styles.item}>
                <p className={styles.strong}>Current score:</p>
                <p>{this.currScore}/{this.shuffledFlags.length}</p>
              </div>
              <div className={styles.item}>
                <p className={styles.strong}>Time Remaining:</p>
                <p>{formatSecondsToTime(this.timeRemainingSeconds)}</p>
              </div>
            </div>
            <button className={styles.giveUp} onClick={this.giveUp}>Give up</button>
          </>
        ) : (
          <div className={styles.score}>
            <div className={styles.results}>
              <div className={styles.item}>
                <p className={styles.strong}>Your score:</p>
                <p>{this.currScore}/{this.shuffledFlags.length}</p>
              </div>
              <div className={styles.item}>
                <p className={styles.strong}>Time remaining:</p>
                <p>{formatSecondsToTime(this.timeRemainingSeconds)}</p>
              </div>
            </div>
            <button
                className={styles.playAgain}
                onClick={() => window.location.reload()}
            >
              Play again
            </button>
          </div>
        )}
      </div>
    ): null;
  }
}

function shuffle(array: any[]) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function closeMatch(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  a = a.toLowerCase();
  b = b.toLowerCase();
  if (a[0] !== b[0] || a[a.length - 1] !== b[b.length - 1]) {
    return false;
  }
  if (diffCharacters(a, b) > reasonableDiff(a.length)) {
    return false;
  }
  return true;
}

function almostMatch(a: string, b: string): boolean {
  a = a.toLowerCase();
  b = b.toLowerCase();
  // Stop false positives on short strings
  if (a.length < 3 || b.length < 3) {
    return false;
  }
  // Don't appear if they're just typing i.e. "Cambodi" for "Cambodia"
  if (b.slice(0, a.length) === a) {
    return false;
  }
  if (diffCharacters(a, b) > reasonableDiff(a.length)) {
    return false;
  }
  return true;
}

function diffCharacters(a: string, b: string) {
  let dist = 0;
  for (var i = 0, j = Math.max(a.length, b.length); i < j; i++) {
    if (!a[i] || !b[i] || a[i] !== b[i]) {
      dist++;
    }
  }
  return dist;
}

function reasonableDiff(n: number) {
  if (n < 3) {
    return 0;
  }
  if (n < 5) {
    return 1;
  }
  return 2;
}

function formatSecondsToTime(timeInSeconds: number) {
  const allMinutes = Math.floor(timeInSeconds / 60);
  const hours = Math.floor(allMinutes / 60);
  const minutes = Math.floor(allMinutes % 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${hours > 0 ? `${padTime(hours)}:` : ''}${padTime(minutes)}:${padTime(seconds)}`;
}

function padTime(time: number): string {
  return String(time).padStart(2, '0');
}

function debounce(func: any, timeout = 300){
  let timer: any | undefined;
  const func2 = (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(func2, args); }, timeout);
  };
  return func2;
}
