DROP SCHEMA IF EXISTS iso CASCADE;
CREATE SCHEMA IF NOT EXISTS iso;

-- continents
CREATE TABLE IF NOT EXISTS iso.continents (
    "id"                CHAR(2) NOT NULL PRIMARY KEY,
    "name"              VARCHAR(20) NOT NULL
);

-- countries
CREATE TABLE IF NOT EXISTS iso.countries (
    "id"                CHAR(2) PRIMARY KEY,
    "continent_id"      CHAR(2) NOT NULL,
    "name"              VARCHAR(100) NOT NULL,
    "flag"              CHAR(2) NOT NULL,
    "tld"               CHAR(2) NOT NULL,
    "prefix"            VARCHAR(100) NOT NULL,
    "is_eu"             BOOLEAN NOT NULL DEFAULT FALSE,
    "is_enabled"        BOOLEAN NOT NULL DEFAULT FALSE,
    "iso2"              CHAR(3),
    "demonym"           VARCHAR(30),
    "population"        INTEGER,
    "density"           FLOAT,
    "area"              INTEGER,
    "gdp"               INTEGER,
    "median_age"        INTEGER,
    "website"           VARCHAR(120),
    "driving_side"      VARCHAR(5),
    "un_member"         BOOLEAN,
    "religion"          VARCHAR(20),
    CONSTRAINT  "fk_continent"   
        FOREIGN KEY("continent_id")    
        REFERENCES  iso.continents("id")
);

CREATE TABLE iso.cities (
    "id"                VARCHAR(20)     NOT NULL,
    "name"              VARCHAR(100)     NOT NULL,
    "name_ascii"        VARCHAR(100)     NOT NULL,
    "latitude"          FLOAT,
    "longitude"         FLOAT,
    "country"           VARCHAR(100)     NOT NULL,
    "country_id"        CHAR(2)         NOT NULL,
    "iso2"              CHAR(2)         NOT NULL,
    "iso3"              CHAR(3)         NOT NULL,
    "admin_name"        VARCHAR(100)     NOT NULL,
    "capital"           VARCHAR(20),
    "population"        INTEGER,
    CONSTRAINT  "fk_country"   
        FOREIGN KEY("country_id")    
        REFERENCES  iso.countries("id")
);


--languages
CREATE TABLE IF NOT EXISTS iso.languages (
    "id"                CHAR(3) PRIMARY KEY,
    "name"              VARCHAR(100) UNIQUE,
    "is_enabled"        BOOLEAN NOT NULL DEFAULT FALSE
);

-- country_languages
CREATE TABLE IF NOT EXISTS iso.country_languages (
    "id"                SERIAL PRIMARY KEY,
    "country_id"        CHAR(2) NOT NULL,
    "language_id"       CHAR(3) NOT NULL,
    "is_enabled"        BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT  "fk_country"     
        FOREIGN KEY("country_id")  
        REFERENCES  iso.countries ("id"),
    CONSTRAINT  "fk_language"    
        FOREIGN KEY("language_id") 
        REFERENCES  iso.languages ("id"),
    UNIQUE ("country_id", "language_id")
);

-- currencies
CREATE TABLE IF NOT EXISTS iso.currencies (
    "id"                CHAR(3) NOT NULL PRIMARY KEY,
    "name"              VARCHAR(100) NOT NULL
);

-- country_currencies
CREATE TABLE IF NOT EXISTS iso.country_currencies (
    "id"                SERIAL PRIMARY KEY,
    "country_id"        CHAR(2),
    "currency_id"       CHAR(3),
    "is_enabled"        BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT  "fk_country" 
        FOREIGN KEY("country_id") 
        REFERENCES  iso.countries ("id"),
    CONSTRAINT  "fk_currency" 
        FOREIGN KEY("currency_id") 
        REFERENCES  iso.currencies ("id"),
    UNIQUE ("country_id", "currency_id")
);

-- insert data
INSERT INTO
    iso.continents ("id", "name")
VALUES
    ('AF', 'Africa'),
    ('AN', 'Antarctica'),
    ('AS', 'Asia'),
    ('EU', 'Europe'),
    ('NA', 'North America'),
    ('OC', 'Oceania'),
    ('SA', 'South America');

INSERT INTO
    iso.countries (
        "id",
        "continent_id",
        "name",
        "flag",
        "tld",
        "prefix",
        "is_eu"
    )
VALUES
    ('ad', 'EU', 'Andorra', '🇦🇩', 'ad', '376', false),
    ('ae', 'AS', 'United Arab Emirates', '🇦🇪', 'ae', '971', false),
    ('af', 'AS', 'Afghanistan', '🇦🇫', 'af', '93', false),
    ('ag', 'NA', 'Antigua and Barbuda', '🇦🇬', 'ag', '1268', false),
    ('ai', 'NA', 'Anguilla', '🇦🇮', 'ai', '1264', false),
    ('al', 'EU', 'Albania', '🇦🇱', 'al', '355', false),
    ('am', 'AS', 'Armenia', '🇦🇲', 'am', '374', false),
    ('ao', 'AF', 'Angola', '🇦🇴', 'ao', '244', false),
    ('aq', 'AN', 'Antarctica', '🇦🇶', 'aq', '', false),
    ('ar', 'SA', 'Argentina', '🇦🇷', 'ar', '54', false),
    ('as', 'OC', 'American Samoa', '🇦🇸', 'as', '1684', false),
    ('at', 'EU', 'Austria', '🇦🇹', 'at', '43', true),
    ('au', 'OC', 'Australia', '🇦🇺', 'au', '61', false),
    ('aw', 'NA', 'Aruba', '🇦🇼', 'aw', '297', false),
    ('ax', 'EU', 'Åland Islands', '🇦🇽', 'ax', '358', false),
    ('az', 'AS', 'Azerbaijan', '🇦🇿', 'az', '994', false),
    ('ba', 'EU', 'Bosnia and Herzegovina', '🇧🇦', 'ba', '387', false),
    ('bb', 'NA', 'Barbados', '🇧🇧', 'bb', '1246', false),
    ('bd', 'AS', 'Bangladesh', '🇧🇩', 'bd', '880', false),
    ('be', 'EU', 'Belgium', '🇧🇪', 'be', '32', true),
    ('bf', 'AF', 'Burkina Faso', '🇧🇫', 'bf', '226', false),
    ('bg', 'EU', 'Bulgaria', '🇧🇬', 'bg', '359', true),
    ('bh', 'AS', 'Bahrain', '🇧🇭', 'bh', '973', false),
    ('bi', 'AF', 'Burundi', '🇧🇮', 'bi', '257', false),
    ('bj', 'AF', 'Benin', '🇧🇯', 'bj', '229', false),
    ('bl', 'NA', 'Saint Barthélemy', '🇧🇱', 'bl', '590', false),
    ('bm', 'NA', 'Bermuda', '🇧🇲', 'bm', '1441', false),
    ('bn', 'AS', 'Brunei', '🇧🇳', 'bn', '673', false),
    ('bo', 'SA', 'Bolivia', '🇧🇴', 'bo', '591', false),
    ('bq', 'NA', 'Caribbean Netherlands', '🇧🇶', '', '599', false),
    ('br', 'SA', 'Brazil', '🇧🇷', 'br', '55', false),
    ('bs', 'NA', 'Bahamas', '🇧🇸', 'bs', '1242', false),
    ('bt', 'AS', 'Bhutan', '🇧🇹', 'bt', '975', false),
    ('bv', 'AN', 'Bouvet Island', '🇧🇻', 'bv', '', false),
    ('bw', 'AF', 'Botswana', '🇧🇼', 'bw', '267', false),
    ('by', 'EU', 'Belarus', '🇧🇾', 'by', '375', false),
    ('bz', 'NA', 'Belize', '🇧🇿', 'bz', '501', false),
    ('ca', 'NA', 'Canada', '🇨🇦', 'ca', '1', false),
    ('cc', 'AS', 'Cocos (Keeling) Islands', '🇨🇨', 'cc', '61', false),
    ('cd', 'AF', 'DR Congo', '🇨🇩', 'cd', '243', false),
    ('cf', 'AF', 'Central African Republic', '🇨🇫', 'cf', '236', false),
    ('cg', 'AF', 'Republic of the Congo', '🇨🇬', 'cg', '242', false),
    ('ch', 'EU', 'Switzerland', '🇨🇭', 'ch', '41', false),
    ('ci', 'AF', 'Ivory Coast', '🇨🇮', 'ci', '225', false),
    ('ck', 'OC', 'Cook Islands', '🇨🇰', 'ck', '682', false),
    ('cl', 'SA', 'Chile', '🇨🇱', 'cl', '56', false),
    ('cm', 'AF', 'Cameroon', '🇨🇲', 'cm', '237', false),
    ('cn', 'AS', 'China', '🇨🇳', 'cn', '86', false),
    ('co', 'SA', 'Colombia', '🇨🇴', 'co', '57', false),
    ('cr', 'NA', 'Costa Rica', '🇨🇷', 'cr', '506', false),
    ('cu', 'NA', 'Cuba', '🇨🇺', 'cu', '53', false),
    ('cv', 'AF', 'Cape Verde', '🇨🇻', 'cv', '238', false),
    ('cw', 'NA', 'Curaçao', '🇨🇼', 'cw', '599', false),
    ('cx', 'AS', 'Christmas Island', '🇨🇽', 'cx', '61', false),
    ('cy', 'EU', 'Cyprus', '🇨🇾', 'cy', '357', true),
    ('cz', 'EU', 'Czech Republic', '🇨🇿', 'cz', '420', true),
    ('de', 'EU', 'Germany', '🇩🇪', 'de', '49', true),
    ('dj', 'AF', 'Djibouti', '🇩🇯', 'dj', '253', false),
    ('dk', 'EU', 'Denmark', '🇩🇰', 'dk', '45', true),
    ('dm', 'NA', 'Dominica', '🇩🇲', 'dm', '1767', false),
    ('do', 'NA', 'Dominican Republic', '🇩🇴', 'do', '1809,1829,1849', false),
    ('dz', 'AF', 'Algeria', '🇩🇿', 'dz', '213', false),
    ('ec', 'SA', 'Ecuador', '🇪🇨', 'ec', '593', false),
    ('ee', 'EU', 'Estonia', '🇪🇪', 'ee', '372', true),
    ('eg', 'AF', 'Egypt', '🇪🇬', 'eg', '20', false),
    ('eh', 'AF', 'Western Sahara', '🇪🇭', 'eh', '212', false),
    ('er', 'AF', 'Eritrea', '🇪🇷', 'er', '291', false),
    ('es', 'EU', 'Spain', '🇪🇸', 'es', '34', true),
    ('et', 'AF', 'Ethiopia', '🇪🇹', 'et', '251', false),
    ('fi', 'EU', 'Finland', '🇫🇮', 'fi', '358', true),
    ('fj', 'OC', 'Fiji', '🇫🇯', 'fj', '679', false),
    ('fk', 'SA', 'Falkland Islands', '🇫🇰', 'fk', '500', false),
    ('fm', 'OC', 'Micronesia', '🇫🇲', 'fm', '691', false),
    ('fo', 'EU', 'Faroe Islands', '🇫🇴', 'fo', '298', false),
    ('fr', 'EU', 'France', '🇫🇷', 'fr', '33', true),
    ('ga', 'AF', 'Gabon', '🇬🇦', 'ga', '241', false),
    ('gb', 'EU', 'United Kingdom', '🇬🇧', 'uk', '44', false),
    ('gd', 'NA', 'Grenada', '🇬🇩', 'gd', '1473', false),
    ('ge', 'AS', 'Georgia', '🇬🇪', 'ge', '995', false),
    ('gf', 'SA', 'French Guiana', '🇬🇫', 'gf', '594', false),
    ('gg', 'EU', 'Guernsey', '🇬🇬', 'gg', '44', false),
    ('gh', 'AF', 'Ghana', '🇬🇭', 'gh', '233', false),
    ('gi', 'EU', 'Gibraltar', '🇬🇮', 'gi', '350', false),
    ('gl', 'NA', 'Greenland', '🇬🇱', 'gl', '299', false),
    ('gm', 'AF', 'Gambia', '🇬🇲', 'gm', '220', false),
    ('gn', 'AF', 'Guinea', '🇬🇳', 'gn', '224', false),
    ('gp', 'NA', 'Guadeloupe', '🇬🇵', 'gp', '590', false),
    ('gq', 'AF', 'Equatorial Guinea', '🇬🇶', 'gq', '240', false),
    ('gr', 'EU', 'Greece', '🇬🇷', 'gr', '30', true),
    ('gs', 'AN', 'South Georgia', '🇬🇸', 'gs', '500', false),
    ('gt', 'NA', 'Guatemala', '🇬🇹', 'gt', '502', false),
    ('gu', 'OC', 'Guam', '🇬🇺', 'gu', '1671', false),
    ('gw', 'AF', 'Guinea-Bissau', '🇬🇼', 'gw', '245', false),
    ('gy', 'SA', 'Guyana', '🇬🇾', 'gy', '592', false),
    ('hk', 'AS', 'Hong Kong', '🇭🇰', 'hk', '852', false),
    ('hm', 'AN', 'Heard Island and McDonald Islands', '🇭🇲', 'hm', '', false),
    ('hn', 'NA', 'Honduras', '🇭🇳', 'hn', '504', false),
    ('hr', 'EU', 'Croatia', '🇭🇷', 'hr', '385', true),
    ('ht', 'NA', 'Haiti', '🇭🇹', 'ht', '509', false),
    ('hu', 'EU', 'Hungary', '🇭🇺', 'hu', '36', true),
    ('id', 'AS', 'Indonesia', '🇮🇩', 'id', '62', false),
    ('ie', 'EU', 'Ireland', '🇮🇪', 'ie', '353', true),
    ('il', 'AS', 'Israel', '🇮🇱', 'il', '972', false),
    ('im', 'EU', 'Isle of Man', '🇮🇲', 'im', '44', false),
    ('in', 'AS', 'India', '🇮🇳', 'in', '91', false),
    ('io', 'AS', 'British Indian Ocean Territory', '🇮🇴', 'io', '246', false),
    ('iq', 'AS', 'Iraq', '🇮🇶', 'iq', '964', false),
    ('ir', 'AS', 'Iran', '🇮🇷', 'ir', '98', false),
    ('is', 'EU', 'Iceland', '🇮🇸', 'is', '354', false),
    ('it', 'EU', 'Italy', '🇮🇹', 'it', '39', true),
    ('je', 'EU', 'Jersey', '🇯🇪', 'je', '44', false),
    ('jm', 'NA', 'Jamaica', '🇯🇲', 'jm', '1876', false),
    ('jo', 'AS', 'Jordan', '🇯🇴', 'jo', '962', false),
    ('jp', 'AS', 'Japan', '🇯🇵', 'jp', '81', false),
    ('ke', 'AF', 'Kenya', '🇰🇪', 'ke', '254', false),
    ('kg', 'AS', 'Kyrgyzstan', '🇰🇬', 'kg', '996', false),
    ('kh', 'AS', 'Cambodia', '🇰🇭', 'kh', '855', false),
    ('ki', 'OC', 'Kiribati', '🇰🇮', 'ki', '686', false),
    ('km', 'AF', 'Comoros', '🇰🇲', 'km', '269', false),
    ('kn', 'NA', 'Saint Kitts and Nevis', '🇰🇳', 'kn', '1869', false),
    ('kp', 'AS', 'North Korea', '🇰🇵', 'kp', '850', false),
    ('kr', 'AS', 'South Korea', '🇰🇷', 'kr', '82', false),
    ('kw', 'AS', 'Kuwait', '🇰🇼', 'kw', '965', false),
    ('ky', 'NA', 'Cayman Islands', '🇰🇾', 'ky', '1345', false),
    ('kz', 'AS', 'Kazakhstan', '🇰🇿', 'kz', '76,77', false),
    ('la', 'AS', 'Laos', '🇱🇦', 'la', '856', false),
    ('lb', 'AS', 'Lebanon', '🇱🇧', 'lb', '961', false),
    ('lc', 'NA', 'Saint Lucia', '🇱🇨', 'lc', '1758', false),
    ('li', 'EU', 'Liechtenstein', '🇱🇮', 'li', '423', false),
    ('lk', 'AS', 'Sri Lanka', '🇱🇰', 'lk', '94', false),
    ('lr', 'AF', 'Liberia', '🇱🇷', 'lr', '231', false),
    ('ls', 'AF', 'Lesotho', '🇱🇸', 'ls', '266', false),
    ('lt', 'EU', 'Lithuania', '🇱🇹', 'lt', '370', true),
    ('lu', 'EU', 'Luxembourg', '🇱🇺', 'lu', '352', true),
    ('lv', 'EU', 'Latvia', '🇱🇻', 'lv', '371', true),
    ('ly', 'AF', 'Libya', '🇱🇾', 'ly', '218', false),
    ('ma', 'AF', 'Morocco', '🇲🇦', 'ma', '212', false),
    ('mc', 'EU', 'Monaco', '🇲🇨', 'mc', '377', false),
    ('md', 'EU', 'Moldova', '🇲🇩', 'md', '373', false),
    ('me', 'EU', 'Montenegro', '🇲🇪', 'me', '382', false),
    ('mf', 'NA', 'Saint Martin', '🇲🇫', 'fr', '590', false),
    ('mg', 'AF', 'Madagascar', '🇲🇬', 'mg', '261', false),
    ('mh', 'OC', 'Marshall Islands', '🇲🇭', 'mh', '692', false),
    ('mk', 'EU', 'Macedonia', '🇲🇰', 'mk', '389', false),
    ('ml', 'AF', 'Mali', '🇲🇱', 'ml', '223', false),
    ('mm', 'AS', 'Myanmar', '🇲🇲', 'mm', '95', false),
    ('mn', 'AS', 'Mongolia', '🇲🇳', 'mn', '976', false),
    ('mo', 'AS', 'Macau', '🇲🇴', 'mo', '853', false),
    ('mp', 'OC', 'Northern Mariana Islands', '🇲🇵', 'mp', '1670', false),
    ('mq', 'NA', 'Martinique', '🇲🇶', 'mq', '596', false),
    ('mr', 'AF', 'Mauritania', '🇲🇷', 'mr', '222', false),
    ('ms', 'NA', 'Montserrat', '🇲🇸', 'ms', '1664', false),
    ('mt', 'EU', 'Malta', '🇲🇹', 'mt', '356', true),
    ('mu', 'AF', 'Mauritius', '🇲🇺', 'mu', '230', false),
    ('mv', 'AS', 'Maldives', '🇲🇻', 'mv', '960', false),
    ('mw', 'AF', 'Malawi', '🇲🇼', 'mw', '265', false),
    ('mx', 'NA', 'Mexico', '🇲🇽', 'mx', '52', false),
    ('my', 'AS', 'Malaysia', '🇲🇾', 'my', '60', false),
    ('mz', 'AF', 'Mozambique', '🇲🇿', 'mz', '258', false),
    ('na', 'AF', 'Namibia', '🇳🇦', 'na', '264', false),
    ('nc', 'OC', 'New Caledonia', '🇳🇨', 'nc', '687', false),
    ('ne', 'AF', 'Niger', '🇳🇪', 'ne', '227', false),
    ('nf', 'OC', 'Norfolk Island', '🇳🇫', 'nf', '672', false),
    ('ng', 'AF', 'Nigeria', '🇳🇬', 'ng', '234', false),
    ('ni', 'NA', 'Nicaragua', '🇳🇮', 'ni', '505', false),
    ('nl', 'EU', 'Netherlands', '🇳🇱', 'nl', '31', true),
    ('no', 'EU', 'Norway', '🇳🇴', 'no', '47', false),
    ('np', 'AS', 'Nepal', '🇳🇵', 'np', '977', false),
    ('nr', 'OC', 'Nauru', '🇳🇷', 'nr', '674', false),
    ('nu', 'OC', 'Niue', '🇳🇺', 'nu', '683', false),
    ('nz', 'OC', 'New Zealand', '🇳🇿', 'nz', '64', false),
    ('om', 'AS', 'Oman', '🇴🇲', 'om', '968', false),
    ('pa', 'NA', 'Panama', '🇵🇦', 'pa', '507', false),
    ('pe', 'SA', 'Peru', '🇵🇪', 'pe', '51', false),
    ('pf', 'OC', 'French Polynesia', '🇵🇫', 'pf', '689', false),
    ('pg', 'OC', 'Papua New Guinea', '🇵🇬', 'pg', '675', false),
    ('ph', 'AS', 'Philippines', '🇵🇭', 'ph', '63', false),
    ('pk', 'AS', 'Pakistan', '🇵🇰', 'pk', '92', false),
    ('pl', 'EU', 'Poland', '🇵🇱', 'pl', '48', true),
    ('pm', 'NA', 'Saint Pierre and Miquelon', '🇵🇲', 'pm', '508', false),
    ('pn', 'OC', 'Pitcairn Islands', '🇵🇳', 'pn', '64', false),
    ('pr', 'NA', 'Puerto Rico', '🇵🇷', 'pr', '1787,1939', false),
    ('ps', 'AS', 'Palestine', '🇵🇸', 'ps', '970', false),
    ('pt', 'EU', 'Portugal', '🇵🇹', 'pt', '351', true),
    ('pw', 'OC', 'Palau', '🇵🇼', 'pw', '680', false),
    ('py', 'SA', 'Paraguay', '🇵🇾', 'py', '595', false),
    ('qa', 'AS', 'Qatar', '🇶🇦', 'qa', '974', false),
    ('re', 'AF', 'Réunion', '🇷🇪', 're', '262', false),
    ('ro', 'EU', 'Romania', '🇷🇴', 'ro', '40', true),
    ('rs', 'EU', 'Serbia', '🇷🇸', 'rs', '381', false),
    ('ru', 'EU', 'Russia', '🇷🇺', 'ru', '7', false),
    ('rw', 'AF', 'Rwanda', '🇷🇼', 'rw', '250', false),
    ('sa', 'AS', 'Saudi Arabia', '🇸🇦', 'sa', '966', false),
    ('sb', 'OC', 'Solomon Islands', '🇸🇧', 'sb', '677', false),
    ('sc', 'AF', 'Seychelles', '🇸🇨', 'sc', '248', false),
    ('sd', 'AF', 'Sudan', '🇸🇩', 'sd', '249', false),
    ('se', 'EU', 'Sweden', '🇸🇪', 'se', '46', true),
    ('sg', 'AS', 'Singapore', '🇸🇬', 'sg', '65', false),
    ('sh', 'AF', 'Saint Helena', '🇸🇭', '', '290', false),
    ('si', 'EU', 'Slovenia', '🇸🇮', 'si', '386', true),
    ('sj', 'EU', 'Svalbard and Jan Mayen', '🇸🇯', 'sj', '4779', false),
    ('sk', 'EU', 'Slovakia', '🇸🇰', 'sk', '421', true),
    ('sl', 'AF', 'Sierra Leone', '🇸🇱', 'sl', '232', false),
    ('sm', 'EU', 'San Marino', '🇸🇲', 'sm', '378', false),
    ('sn', 'AF', 'Senegal', '🇸🇳', 'sn', '221', false),
    ('so', 'AF', 'Somalia', '🇸🇴', 'so', '252', false),
    ('sr', 'SA', 'Suriname', '🇸🇷', 'sr', '597', false),
    ('ss', 'AF', 'South Sudan', '🇸🇸', 'ss', '211', false),
    ('st', 'AF', 'São Tomé and Príncipe', '🇸🇹', 'st', '239', false),
    ('sv', 'NA', 'El Salvador', '🇸🇻', 'sv', '503', false),
    ('sx', 'NA', 'Sint Maarten', '🇸🇽', 'sx', '1721', false),
    ('sy', 'AS', 'Syria', '🇸🇾', 'sy', '963', false),
    ('sz', 'AF', 'Swaziland', '🇸🇿', 'sz', '268', false),
    ('tc', 'NA', 'Turks and Caicos Islands', '🇹🇨', 'tc', '1649', false),
    ('td', 'AF', 'Chad', '🇹🇩', 'td', '235', false),
    ('tf', 'AN', 'French Southern and Antarctic Lands', '🇹🇫', 'tf', '', false),
    ('tg', 'AF', 'Togo', '🇹🇬', 'tg', '228', false),
    ('th', 'AS', 'Thailand', '🇹🇭', 'th', '66', false),
    ('tj', 'AS', 'Tajikistan', '🇹🇯', 'tj', '992', false),
    ('tk', 'OC', 'Tokelau', '🇹🇰', 'tk', '690', false),
    ('tl', 'OC', 'Timor-Leste', '🇹🇱', 'tl', '670', false),
    ('tm', 'AS', 'Turkmenistan', '🇹🇲', 'tm', '993', false),
    ('tn', 'AF', 'Tunisia', '🇹🇳', 'tn', '216', false),
    ('to', 'OC', 'Tonga', '🇹🇴', 'to', '676', false),
    ('tr', 'AS', 'Turkey', '🇹🇷', 'tr', '90', false),
    ('tt', 'NA', 'Trinidad and Tobago', '🇹🇹', 'tt', '1868', false),
    ('tv', 'OC', 'Tuvalu', '🇹🇻', 'tv', '688', false),
    ('tw', 'AS', 'Taiwan', '🇹🇼', 'tw', '886', false),
    ('tz', 'AF', 'Tanzania', '🇹🇿', 'tz', '255', false),
    ('ua', 'EU', 'Ukraine', '🇺🇦', 'ua', '380', false),
    ('ug', 'AF', 'Uganda', '🇺🇬', 'ug', '256', false),
    ('um', 'OC', 'United States Minor Outlying Islands', '🇺🇲', 'us', '', false),
    ('us', 'NA', 'United States', '🇺🇸', 'us', '1', false),
    ('uy', 'SA', 'Uruguay', '🇺🇾', 'uy', '598', false),
    ('uz', 'AS', 'Uzbekistan', '🇺🇿', 'uz', '998', false),
    ('va', 'EU', 'Vatican City', '🇻🇦', 'va', '3906698,379', false),
    ('vc', 'NA', 'Saint Vincent and the Grenadines', '🇻🇨', 'vc', '1784', false),
    ('ve', 'SA', 'Venezuela', '🇻🇪', 've', '58', false),
    ('vg', 'NA', 'British Virgin Islands', '🇻🇬', 'vg', '1284', false),
    ('vi', 'NA', 'United States Virgin Islands', '🇻🇮', 'vi', '1340', false),
    ('vn', 'AS', 'Vietnam', '🇻🇳', 'vn', '84', false),
    ('vu', 'OC', 'Vanuatu', '🇻🇺', 'vu', '678', false),
    ('wf', 'OC', 'Wallis and Futuna', '🇼🇫', 'wf', '681', false),
    ('ws', 'OC', 'Samoa', '🇼🇸', 'ws', '685', false),
    ('xk', 'EU', 'Kosovo', '🇽🇰', '', '383', false),
    ('ye', 'AS', 'Yemen', '🇾🇪', 'ye', '967', false),
    ('yt', 'AF', 'Mayotte', '🇾🇹', 'yt', '262', false),
    ('za', 'AF', 'South Africa', '🇿🇦', 'za', '27', false),
    ('zm', 'AF', 'Zambia', '🇿🇲', 'zm', '260', false),
    ('zw', 'AF', 'Zimbabwe', '🇿🇼', 'zw', '263', false);


UPDATE iso.countries SET iso2 = 'CN', demonym = 'Chinese', population = 1413142846, density = 147.2, area = 9596960, gdp = 17963170, median_age = 39.8, website = 'https://www.gov.cn', driving_side = 'right', un_member = TRUE, religion = 'No Religion' WHERE id = 'cn';
UPDATE iso.countries SET iso2 = 'IN', demonym = 'Indian', population = 1399179585, density = 425.6, area = 3287263, gdp = 3465541, median_age = 29.5, website = 'http://india.gov.in', driving_side = 'left', un_member = TRUE, religion = 'Hinduism' WHERE id = 'in';
UPDATE iso.countries SET iso2 = 'US', demonym = 'American', population = 339665118, density = 34.5, area = 9833517, gdp = 25744100, median_age = 38.5, website = 'https://www.usa.gov', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'us';
UPDATE iso.countries SET iso2 = 'ID', demonym = 'Indonesian', population = 279476346, density = 146.7, area = 1904569, gdp = 1319100, median_age = 31.2, website = 'https://indonesia.go.id', driving_side = 'left', un_member = TRUE, religion = 'Islam' WHERE id = 'id';
UPDATE iso.countries SET iso2 = 'PK', demonym = 'Pakistani', population = 247653551, density = 311.1, area = 796095, gdp = 326796, median_age = 22.7, website = 'http://www.pakistan.gov.pk', driving_side = 'left', un_member = TRUE, religion = 'Islam' WHERE id = 'pk';
UPDATE iso.countries SET iso2 = 'NG', demonym = 'Nigerian', population = 230842743, density = 249.9, area = 923768, gdp = 15414, median_age = 19.2, website = 'https://nigeria.gov.ng', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ng';
UPDATE iso.countries SET iso2 = 'BR', demonym = 'Brazilian', population = 218689757, density = 25.7, area = 8515770, gdp = 1920095, median_age = 34.7, website = 'https://www.gov.br', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'br';
UPDATE iso.countries SET iso2 = 'BD', demonym = 'Bangladeshi', population = 167184465, density = 1126.1, area = 148460, gdp = 432677, median_age = 29.2, website = 'http://www.bangladesh.gov.bd', driving_side = 'left', un_member = TRUE, religion = 'Islam' WHERE id = 'bd';
UPDATE iso.countries SET iso2 = 'RU', demonym = 'Russian', population = 141698923, density = 8.3, area = 17098242, gdp = 2240422, median_age = 41.5, website = 'http://gov.ru', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ru';
UPDATE iso.countries SET iso2 = 'MX', demonym = 'Mexican', population = 129875529, density = 66.1, area = 1964375, gdp = 1463323, median_age = 30.6, website = 'https://www.gob.mx', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'mx';
UPDATE iso.countries SET iso2 = 'JP', demonym = 'Japanese', population = 123719238, density = 327.4, area = 377915, gdp = 4232173, median_age = 49.5, website = 'https://www.japan.go.jp', driving_side = 'left', un_member = TRUE, religion = 'No Religion' WHERE id = 'jp';
UPDATE iso.countries SET iso2 = 'ET', demonym = 'Ethiopian', population = 116462712, density = 105.5, area = 1104300, gdp = 118971, median_age = 20.2, website = 'https://www.pmo.gov.et', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'et';
UPDATE iso.countries SET iso2 = 'PH', demonym = 'Philippine', population = 116434200, density = 388.1, area = 300000, gdp = 404284, median_age = 25.4, website = 'https://www.gov.ph', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ph';
UPDATE iso.countries SET iso2 = 'CD', demonym = 'Congolese', population = 111859928, density = 47.7, area = 2344858, gdp = 62551, median_age = 16.8, website = 'https://www.primature.gouv.cd', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'cd';
UPDATE iso.countries SET iso2 = 'EG', demonym = 'Egyptian', population = 109546720, density = 109.4, area = 1001450, gdp = 409306, median_age = 24.1, website = 'https://www.sis.gov.eg', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'eg';
UPDATE iso.countries SET iso2 = 'VN', demonym = 'Vietnamese', population = 104799174, density = 316.4, area = 331210, gdp = 408802, median_age = 32.7, website = 'https://vietnam.gov.vn', driving_side = 'right', un_member = TRUE, religion = 'No Religion' WHERE id = 'vn';
UPDATE iso.countries SET iso2 = 'IR', demonym = 'Iranian', population = 87590873, density = 53.1, area = 1648195, gdp = 398047, median_age = 33.3, website = 'https://president.ir/en', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'ir';
UPDATE iso.countries SET iso2 = 'DE', demonym = 'German', population = 84220184, density = 235.9, area = 357022, gdp = 4076923, median_age = 46.7, website = 'https://www.deutschland.de', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'de';
UPDATE iso.countries SET iso2 = 'TR', demonym = 'Turkish', population = 83593483, density = 106.7, area = 783562, gdp = 907118, median_age = 33.6, website = 'https://www.turkiye.gov.tr', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'tr';
UPDATE iso.countries SET iso2 = 'TH', demonym = 'Thai', population = 69794997, density = 136.0, area = 513120, gdp = 495340, median_age = 41, website = 'https://www.thaigov.go.th', driving_side = 'left', un_member = TRUE, religion = 'Buddhism' WHERE id = 'th';
UPDATE iso.countries SET iso2 = 'FR', demonym = 'French', population = 68521974, density = 106.4, area = 643801, gdp = 2775316, median_age = 42.4, website = 'https://www.service-public.fr', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'fr';
UPDATE iso.countries SET iso2 = 'GB', demonym = 'British', population = 68138484, density = 279.7, area = 243610, gdp = 3089072, median_age = 40.6, website = 'https://www.gov.uk', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'gb';
UPDATE iso.countries SET iso2 = 'TZ', demonym = 'Tanzanian', population = 65642682, density = 69.3, area = 947300, gdp = 2361, median_age = 18.9, website = 'https://www.tanzania.go.tz', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'tz';
UPDATE iso.countries SET iso2 = 'IT', demonym = 'Italian', population = 61021855, density = 202.5, area = 301340, gdp = 2046952, median_age = 48.1, website = 'https://www.italia.it', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'it';
UPDATE iso.countries SET iso2 = 'ZA', demonym = 'South African', population = 58048332, density = 47.6, area = 1219090, gdp = 405270, median_age = 30.1, website = 'https://www.gov.za', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'za';
UPDATE iso.countries SET iso2 = 'MM', demonym = 'Burmese', population = 57970293, density = 85.7, area = 676578, gdp = 65211, median_age = 30.4, website = 'https://www.myanmar.gov.mm', driving_side = 'right', un_member = TRUE, religion = 'Buddhism' WHERE id = 'mm';
UPDATE iso.countries SET iso2 = 'KE', demonym = 'Kenyan', population = 57052004, density = 98.3, area = 580367, gdp = 113419, median_age = 20.9, website = 'http://www.president.go.ke', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'ke';
UPDATE iso.countries SET iso2 = 'KR', demonym = 'South Korean', population = 51966948, density = 521.1, area = 99720, gdp = 1673916, median_age = 45, website = 'http://www.korea.go.kr', driving_side = 'right', un_member = TRUE, religion = 'No Religion' WHERE id = 'kr';
UPDATE iso.countries SET iso2 = 'CO', demonym = 'Colombian', population = 49336454, density = 43.3, area = 1138910, gdp = 343939, median_age = 32.4, website = 'https://www.gov.co', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'co';
UPDATE iso.countries SET iso2 = 'SD', demonym = 'Sudanese', population = 49197555, density = 26.4, area = 1861484, gdp = 36729, median_age = 19.1, website = 'http://www.sudan.gov.sd/index.php/en', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'sd';
UPDATE iso.countries SET iso2 = 'UG', demonym = 'Ugandan', population = 47729952, density = 198.0, area = 241038, gdp = 48243, median_age = 16.1, website = 'http://www.statehouse.go.ug', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'ug';
UPDATE iso.countries SET iso2 = 'ES', demonym = 'Spanish', population = 47222613, density = 93.4, area = 505370, gdp = 1415874, median_age = 46.3, website = 'https://administracion.gob.es', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'es';
UPDATE iso.countries SET iso2 = 'AR', demonym = 'Argentinian', population = 46621847, density = 16.8, area = 2780400, gdp = 631133, median_age = 33, website = 'https://www.argentina.gob.ar', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ar';
UPDATE iso.countries SET iso2 = 'DZ', demonym = 'Algerian', population = 44758398, density = 18.8, area = 2381740, gdp = 191912, median_age = 28.9, website = 'https://www.el-mouradia.dz/ar/home', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'dz';
UPDATE iso.countries SET iso2 = 'UA', demonym = 'Ukrainian', population = 43306477, density = 71.8, area = 603550, gdp = 160502, median_age = 45.3, website = 'https://ukraine.ua', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ua';
UPDATE iso.countries SET iso2 = 'IQ', demonym = 'Iraqi', population = 41266109, density = 94.1, area = 438317, gdp = 264182, median_age = 22.1, website = 'https://gds.gov.iq', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'iq';
UPDATE iso.countries SET iso2 = 'AF', demonym = 'Afghan', population = 39232003, density = 60.2, area = 652230, gdp = 14174, median_age = 19.9, website = 'https://alemarahenglish.af', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'af';
UPDATE iso.countries SET iso2 = 'CA', demonym = 'Canadian', population = 38516736, density = 3.9, area = 9984670, gdp = 2137939, median_age = 42.4, website = 'https://www.canada.ca', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ca';
UPDATE iso.countries SET iso2 = 'PL', demonym = 'Polish', population = 37991766, density = 121.5, area = 312685, gdp = 688125, median_age = 42.4, website = 'https://www.gov.pl', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'pl';
UPDATE iso.countries SET iso2 = 'MA', demonym = 'Moroccan', population = 37067420, density = 51.7, area = 716550, gdp = 130912, median_age = 30.2, website = 'http://www.maroc.ma/en', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'ma';
UPDATE iso.countries SET iso2 = 'AO', demonym = 'Angolan', population = 35981281, density = 28.9, area = 1246700, gdp = 113304, median_age = 16.2, website = 'https://www.governo.gov.ao', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ao';
UPDATE iso.countries SET iso2 = 'SA', demonym = 'Saudi Arabian', population = 35939806, density = 16.7, area = 2149690, gdp = 1108148, median_age = 32, website = 'http://www.saudi.gov.sa', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'sa';
UPDATE iso.countries SET iso2 = 'MY', demonym = 'Malaysian', population = 34219975, density = 103.7, area = 329847, gdp = 406305, median_age = 31.4, website = 'https://www.malaysia.gov.my', driving_side = 'left', un_member = TRUE, religion = 'Islam' WHERE id = 'my';
UPDATE iso.countries SET iso2 = 'GH', demonym = 'Ghanaian', population = 33846114, density = 141.9, area = 238533, gdp = 73766, median_age = 21.3, website = 'https://www.ghana.gov.gh', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'gh';
UPDATE iso.countries SET iso2 = 'MZ', demonym = 'Mozambican', population = 32513805, density = 40.7, area = 799380, gdp = 18406, median_age = 17.2, website = 'http://www.portaldogoverno.gov.mz', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'mz';
UPDATE iso.countries SET iso2 = 'PE', demonym = 'Peruvian', population = 32440172, density = 25.2, area = 1285216, gdp = 242631, median_age = 30.1, website = 'https://www.gob.pe', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'pe';
UPDATE iso.countries SET iso2 = 'YE', demonym = 'Yemeni', population = 31565602, density = 59.8, area = 527968, gdp = 11007, median_age = 21.6, website = 'http://www.yemen.gov.ye', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'ye';
UPDATE iso.countries SET iso2 = 'UZ', demonym = 'Uzbekistani', population = 31360836, density = 70.1, area = 447400, gdp = 80391, median_age = 28.7, website = 'https://www.gov.uz/en', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'uz';
UPDATE iso.countries SET iso2 = 'NP', demonym = 'Nepalese', population = 30899443, density = 209.9, area = 147181, gdp = 39406, median_age = 27.1, website = 'https://nepal.gov.np', driving_side = 'left', un_member = TRUE, religion = 'Hinduism' WHERE id = 'np';
UPDATE iso.countries SET iso2 = 'VE', demonym = 'Venezuelan', population = 30518260, density = 33.5, area = 912050, gdp = 129313, median_age = 30.8, website = 'https://mppre.gob.ve', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 've';
UPDATE iso.countries SET iso2 = 'CM', demonym = 'Cameroonian', population = 30135732, density = 63.4, area = 475440, gdp = 44341, median_age = 18.8, website = 'https://www.prc.cm/fr', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'cm';
UPDATE iso.countries SET iso2 = 'CI', demonym = 'Ivoirian', population = 29344847, density = 91.0, area = 322463, gdp = 70018, median_age = 21, website = 'https://www.gouv.ci', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'ci';
UPDATE iso.countries SET iso2 = 'MG', demonym = 'Malagasy', population = 28812195, density = 49.1, area = 587041, gdp = 14954, median_age = 21, website = 'https://www.presidence.gov.mg', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'mg';
UPDATE iso.countries SET iso2 = 'AU', demonym = 'Australian', population = 26461166, density = 3.4, area = 7741220, gdp = 1776577, median_age = 37.9, website = 'https://www.australia.gov.au', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'au';
UPDATE iso.countries SET iso2 = 'KP', demonym = 'North Korean', population = 26072217, density = 216.3, area = 120538, gdp = 15176, median_age = 35.6, website = '', driving_side = 'right', un_member = TRUE, religion = 'No Religion' WHERE id = 'kp';
UPDATE iso.countries SET iso2 = 'NE', demonym = 'Nigerien', population = 25396840, density = 20.0, area = 1267000, gdp = NULL, median_age = 15.1, website = 'http://www.presidence.ne', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'ne';
UPDATE iso.countries SET iso2 = 'TW', demonym = 'Taiwanese', population = 23588613, density = 655.6, area = 35980, gdp = 775017, median_age = 44, website = 'https://www.taiwan.gov.tw', driving_side = 'right', un_member = TRUE, religion = 'Buddhism' WHERE id = 'tw';
UPDATE iso.countries SET iso2 = 'LK', demonym = 'Sri Lankan', population = 23326272, density = 355.5, area = 65610, gdp = 76187, median_age = 33.9, website = 'https://www.gov.lk/index.php', driving_side = 'left', un_member = TRUE, religion = 'Buddhism' WHERE id = 'lk';
UPDATE iso.countries SET iso2 = 'SY', demonym = 'Syrian', population = 22933531, density = 122.4, area = 187437, gdp = 18595, median_age = 23.9, website = 'http://www.moi.gov.sy', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'sy';
UPDATE iso.countries SET iso2 = 'BF', demonym = 'Burkinabe', population = 22489126, density = 82.0, area = 274200, gdp = 19176, median_age = 18.5, website = 'https://www.gouvernement.gov.bf/accueil', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'bf';
UPDATE iso.countries SET iso2 = 'ML', demonym = 'Malian', population = 21359722, density = 17.2, area = 1240192, gdp = 18827, median_age = 16.3, website = 'http://www.primature.gov.ml', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'ml';
UPDATE iso.countries SET iso2 = 'MW', demonym = 'Malawian', population = 21279597, density = 179.6, area = 118484, gdp = 12558, median_age = 20, website = 'http://www.malawi.gov.mw', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'mw';
UPDATE iso.countries SET iso2 = 'ZM', demonym = 'Zambian', population = 20216029, density = 26.9, area = 752618, gdp = 29136, median_age = 18.2, website = 'http://www.statehouse.gov.zm', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'zm';
UPDATE iso.countries SET iso2 = 'KZ', demonym = 'Kazakhstani', population = 19543464, density = 7.2, area = 2724900, gdp = 225496, median_age = 31.7, website = 'https://www.gov.kz', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'kz';
UPDATE iso.countries SET iso2 = 'CL', demonym = 'Chilean', population = 18549457, density = 24.5, area = 756102, gdp = 300686, median_age = 36.6, website = 'https://www.thisischile.cl/?lang=en', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'cl';
UPDATE iso.countries SET iso2 = 'TD', demonym = 'Chadian', population = 18523165, density = 14.4, area = 1284000, gdp = 16799, median_age = 16.5, website = '', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'td';
UPDATE iso.countries SET iso2 = 'SN', demonym = 'Senegalese', population = 18384660, density = 93.5, area = 196722, gdp = 27775, median_age = 19, website = 'https://www.sec.gouv.sn', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'sn';
UPDATE iso.countries SET iso2 = 'RO', demonym = 'Romanian', population = 18326327, density = 76.9, area = 238391, gdp = 300690, median_age = 45.1, website = 'http://www.guv.ro', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ro';
UPDATE iso.countries SET iso2 = 'GT', demonym = 'Guatemalan', population = 17980803, density = 165.1, area = 108889, gdp = 95003, median_age = 24.4, website = 'https://www.guatemala.gob.gt', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'gt';
UPDATE iso.countries SET iso2 = 'EC', demonym = 'Ecuadorian', population = 17483326, density = 61.7, area = 283561, gdp = 115049, median_age = 27.7, website = 'https://www.gob.ec', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ec';
UPDATE iso.countries SET iso2 = 'NL', demonym = 'Dutch', population = 17463930, density = 420.4, area = 41543, gdp = 1572, median_age = 42.2, website = 'https://www.government.nl', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'nl';
UPDATE iso.countries SET iso2 = 'KH', demonym = 'Cambodian', population = 16891245, density = 93.3, area = 181035, gdp = 29504, median_age = 27.6, website = 'https://www.ccc.gov.kh', driving_side = 'right', un_member = TRUE, religion = 'Buddhism' WHERE id = 'kh';
UPDATE iso.countries SET iso2 = 'ZW', demonym = 'Zimbabwean', population = 15418674, density = 39.5, area = 390757, gdp = 26418, median_age = 21, website = 'https://www.zim.gov.zw/index.php', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'zw';
UPDATE iso.countries SET iso2 = 'BJ', demonym = 'Beninese', population = 14219908, density = 126.3, area = 112622, gdp = 17396, median_age = 17.1, website = 'https://www.gouv.bj', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'bj';
UPDATE iso.countries SET iso2 = 'GN', demonym = 'Guinean', population = 13607249, density = 55.3, area = 245857, gdp = 20846, median_age = 19.3, website = 'http://www.presidence.gov.gn', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'gn';
UPDATE iso.countries SET iso2 = 'RW', demonym = 'Rwandese', population = 13400541, density = 508.8, area = 26338, gdp = 13312, median_age = 20.5, website = 'https://www.gov.rw', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'rw';
UPDATE iso.countries SET iso2 = 'BI', demonym = 'Burundian', population = 13162952, density = 473.0, area = 27830, gdp = 4032, median_age = 18.2, website = 'https://www.presidence.gov.bi', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'bi';
UPDATE iso.countries SET iso2 = 'SO', demonym = 'Somalian', population = 12693796, density = 19.9, area = 637657, gdp = 10420, median_age = 19, website = 'https://web.mfa.gov.so', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'so';
UPDATE iso.countries SET iso2 = 'BO', demonym = 'Bolivian', population = 12186079, density = 11.1, area = 1098581, gdp = 44008, median_age = 26.2, website = 'https://www.mingobierno.gob.bo', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'bo';
UPDATE iso.countries SET iso2 = 'SS', demonym = 'South Sudanese', population = 12118379, density = 18.8, area = 644329, gdp = 4616, median_age = 18.7, website = 'https://mofaic.gov.ss', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ss';
UPDATE iso.countries SET iso2 = 'TN', demonym = 'Tunisian', population = 11976182, density = 73.2, area = 163610, gdp = 46181, median_age = 34, website = 'https://www.social.gov.tn/en', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'tn';
UPDATE iso.countries SET iso2 = 'BE', demonym = 'Belgian', population = 11913633, density = 390.3, area = 30528, gdp = 582643, median_age = 41.9, website = 'https://www.belgium.be', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'be';
UPDATE iso.countries SET iso2 = 'HT', demonym = 'Haitian', population = 11470261, density = 413.3, area = 27750, gdp = 18751, median_age = 24.7, website = 'http://primature.gouv.ht', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ht';
UPDATE iso.countries SET iso2 = 'JO', demonym = 'Jordanian', population = 11086716, density = 124.1, area = 89342, gdp = 47452, median_age = 24.6, website = 'https://psd.gov.jo/en-us', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'jo';
UPDATE iso.countries SET iso2 = 'CU', demonym = 'Cuban', population = 10985974, density = 99.1, area = 110860, gdp = 147193, median_age = 42.3, website = 'http://www.cuba.cu', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'cu';
UPDATE iso.countries SET iso2 = 'DO', demonym = 'Dominican', population = 10790744, density = 221.7, area = 48670, gdp = 113537, median_age = 28.9, website = 'https://www.dominicanrepublic.com', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'do';
UPDATE iso.countries SET iso2 = 'CZ', demonym = 'Czech', population = 10706242, density = 135.8, area = 78867, gdp = 290527, median_age = 43.9, website = 'https://www.czechia.eu', driving_side = 'right', un_member = TRUE, religion = 'No Religion' WHERE id = 'cz';
UPDATE iso.countries SET iso2 = 'SE', demonym = 'Swedish', population = 10536338, density = 23.4, area = 450295, gdp = 591188, median_age = 41, website = 'https://sweden.se', driving_side = 'right', un_member = TRUE, religion = 'No Religion' WHERE id = 'se';
UPDATE iso.countries SET iso2 = 'GR', demonym = 'Greek', population = 10497595, density = 79.6, area = 131957, gdp = 217285, median_age = 46.2, website = 'https://www.government.gov.gr', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'gr';
UPDATE iso.countries SET iso2 = 'AZ', demonym = 'Azerbaijani', population = 10420515, density = 120.3, area = 86600, gdp = 78721, median_age = 33.8, website = 'http://mfa.gov.az/en', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'az';
UPDATE iso.countries SET iso2 = 'PT', demonym = 'Portuguese', population = 10223150, density = 111.0, area = 92090, gdp = 254849, median_age = 46, website = 'https://www.portugal.gov.pt', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'pt';
UPDATE iso.countries SET iso2 = 'AE', demonym = 'Emirati', population = 9973449, density = 119.3, area = 83600, gdp = 507063, median_age = 35.7, website = 'https://u.ae', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'ae';
UPDATE iso.countries SET iso2 = 'PG', demonym = 'Papua New Guinean', population = 9819350, density = 21.2, area = 462840, gdp = 31609, median_age = 21.6, website = 'https://papuanewguinea.travel', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'pg';
UPDATE iso.countries SET iso2 = 'HU', demonym = 'Hungarian', population = 9670009, density = 103.9, area = 93028, gdp = 177337, median_age = 44.5, website = 'https://www.kormany.hu', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'hu';
UPDATE iso.countries SET iso2 = 'HN', demonym = 'Catracho', population = 9571352, density = 85.4, area = 112090, gdp = 31717, median_age = 25.3, website = 'https://www.honduras.travel/en', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'hn';
UPDATE iso.countries SET iso2 = 'BY', demonym = 'Belarusian', population = 9383853, density = 45.2, area = 207600, gdp = 72873, median_age = 41.7, website = 'https://www.belarus.by', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'by';
UPDATE iso.countries SET iso2 = 'TJ', demonym = 'Tajikistani', population = 9245937, density = 64.2, area = 144100, gdp = 10492, median_age = 22.7, website = 'https://www.mfa.tj/en', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'tj';
UPDATE iso.countries SET iso2 = 'IL', demonym = 'Israeli', population = 9043387, density = 412.2, area = 21937, gdp = 525002, median_age = 30.1, website = 'https://www.gov.il', driving_side = 'right', un_member = TRUE, religion = 'Judaism' WHERE id = 'il';
UPDATE iso.countries SET iso2 = 'AT', demonym = 'Austrian', population = 8940860, density = 106.6, area = 83871, gdp = 470302, median_age = 44.8, website = 'https://www.oesterreich.gv.at/en', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'at';
UPDATE iso.countries SET iso2 = 'SL', demonym = 'Sierra Leonean', population = 8908040, density = 124.2, area = 71740, gdp = 3481, median_age = 19.2, website = 'https://statehouse.gov.sl', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'sl';
UPDATE iso.countries SET iso2 = 'TG', demonym = 'Togolese', population = 8703961, density = 153.3, area = 56785, gdp = 8087, median_age = 20.5, website = 'https://www.republicoftogo.com', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'tg';
UPDATE iso.countries SET iso2 = 'CH', demonym = 'Swiss', population = 8563760, density = 207.5, area = 41277, gdp = 818426, median_age = 44, website = 'https://www.admin.ch', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ch';
UPDATE iso.countries SET iso2 = 'LA', demonym = 'Laotian', population = 7852377, density = 33.2, area = 236800, gdp = 15362, median_age = 25, website = 'https://www.tourismlaos.org', driving_side = 'right', un_member = TRUE, religion = 'Buddhism' WHERE id = 'la';
UPDATE iso.countries SET iso2 = 'PY', demonym = 'Paraguayan', population = 7439863, density = 18.3, area = 406752, gdp = 41722, median_age = 31.3, website = 'https://www.paraguay.gov.py', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'py';
UPDATE iso.countries SET iso2 = 'HK', demonym = 'Hong Konger', population = 7288167, density = 6577.8, area = 1108, gdp = 359838, median_age = 46.8, website = 'http://www.gov.hk', driving_side = 'left', un_member = FALSE, religion = 'No Religion' WHERE id = 'hk';
UPDATE iso.countries SET iso2 = 'LY', demonym = 'Libyan', population = 7252573, density = 4.1, area = 1759540, gdp = 40537, median_age = 26.1, website = 'https://ejraat.gov.ly/?l=en', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'ly';
UPDATE iso.countries SET iso2 = 'BG', demonym = 'Bulgarian', population = 6827736, density = 61.6, area = 110879, gdp = 90213, median_age = 44.7, website = 'http://www.government.bg', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'bg';
UPDATE iso.countries SET iso2 = 'RS', demonym = 'Serbian', population = 6693375, density = 86.4, area = 77474, gdp = 9397, median_age = 43.7, website = 'https://www.srbija.gov.rs', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'rs';
UPDATE iso.countries SET iso2 = 'SV', demonym = 'Salvadoran', population = 6602370, density = 313.8, area = 21041, gdp = 32488, median_age = 29.2, website = 'https://elsalvador.travel/en', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'sv';
UPDATE iso.countries SET iso2 = 'NI', demonym = 'Nicaraguan', population = 6359689, density = 48.8, area = 130370, gdp = 15671, median_age = 28.5, website = 'https://www.visitnicaragua.us', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ni';
UPDATE iso.countries SET iso2 = 'ER', demonym = 'Eritrean', population = 6274796, density = 53.4, area = 117600, gdp = 2383, median_age = 21, website = 'http://www.shabait.com/index.php', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'er';
UPDATE iso.countries SET iso2 = 'KG', demonym = 'Kyrgyzstani', population = 6122781, density = 30.6, area = 199951, gdp = 12560, median_age = 28.1, website = 'https://www.gov.kg/ky', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'kg';
UPDATE iso.countries SET iso2 = 'SG', demonym = 'Singaporean', population = 5975383, density = 8310.7, area = 719, gdp = 466788, median_age = 38.9, website = 'https://www.gov.sg', driving_side = 'left', un_member = TRUE, religion = 'Buddhism' WHERE id = 'sg';
UPDATE iso.countries SET iso2 = 'DK', demonym = 'Danish', population = 5946984, density = 138.0, area = 43094, gdp = 400167, median_age = 42.2, website = 'https://denmark.dk', driving_side = 'right', un_member = TRUE, religion = 'No Religion' WHERE id = 'dk';
UPDATE iso.countries SET iso2 = 'TM', demonym = 'Turkmenistani', population = 5690818, density = 11.7, area = 488100, gdp = 67009, median_age = 30.7, website = 'http://www.turkmenistan.gov.tm', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'tm';
UPDATE iso.countries SET iso2 = 'CG', demonym = 'Congolese', population = 5677493, density = 16.6, area = 342000, gdp = 15344, median_age = 20.5, website = 'https://gouvernement.cg', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'cg';
UPDATE iso.countries SET iso2 = 'FI', demonym = 'Finnish', population = 5614571, density = 16.6, area = 338145, gdp = 282511, median_age = 43.2, website = 'https://finland.fi', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'fi';
UPDATE iso.countries SET iso2 = 'NO', demonym = 'Norwegian', population = 5597924, density = 17.3, area = 323802, gdp = 579422, median_age = 40.6, website = 'http://www.norway.no', driving_side = 'right', un_member = TRUE, religion = 'No Religion' WHERE id = 'no';
UPDATE iso.countries SET iso2 = 'CF', demonym = 'Central African', population = 5552228, density = 8.9, area = 622984, gdp = 2395, median_age = 20.2, website = '', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'cf';
UPDATE iso.countries SET iso2 = 'LR', demonym = 'Liberian', population = 5506280, density = 49.4, area = 111369, gdp = 3265, median_age = 19.7, website = 'https://www.mofa.gov.lr', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'lr';
UPDATE iso.countries SET iso2 = 'SK', demonym = 'Slovak', population = 5425319, density = 110.6, area = 49035, gdp = 115304, median_age = 42.5, website = 'https://www.slovakia.com', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'sk';
UPDATE iso.countries SET iso2 = 'LB', demonym = 'Lebanese', population = 5331203, density = 512.6, area = 10400, gdp = 39303, median_age = 35.8, website = 'https://www.ministryinfo.gov.lb/en', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'lb';
UPDATE iso.countries SET iso2 = 'IE', demonym = 'Irish', population = 5323991, density = 75.8, area = 70273, gdp = 532415, median_age = 39.8, website = 'http://www.gov.ie', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'ie';
UPDATE iso.countries SET iso2 = 'CR', demonym = 'Costa Rican', population = 5256612, density = 102.9, area = 51100, gdp = 68380, median_age = 35, website = 'https://www.presidencia.go.cr', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'cr';
UPDATE iso.countries SET iso2 = 'NZ', demonym = 'New Zealander', population = 5109702, density = 19.0, area = 268838, gdp = 245845, median_age = 37.7, website = 'https://www.govt.nz', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'nz';
UPDATE iso.countries SET iso2 = 'GE', demonym = 'Georgian', population = 4927228, density = 70.7, area = 69700, gdp = 24605, median_age = 38, website = 'https://www.gov.ge', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ge';
UPDATE iso.countries SET iso2 = 'PA', demonym = 'Panamanian', population = 4404108, density = 58.4, area = 75420, gdp = 76522, median_age = 31.2, website = 'https://visitpanama.com/?lang=en', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'pa';
UPDATE iso.countries SET iso2 = 'MR', demonym = 'Mauritanian', population = 4244878, density = 4.1, area = 1030700, gdp = 10997, median_age = 21.9, website = '', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'mr';
UPDATE iso.countries SET iso2 = 'HR', demonym = 'Croatian', population = 4169239, density = 73.7, area = 56594, gdp = 71552, median_age = 44.8, website = 'https://www.vlada.hr', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'hr';
UPDATE iso.countries SET iso2 = 'OM', demonym = 'Omani', population = 3833465, density = 12.4, area = 309500, gdp = 114666, median_age = 27.1, website = 'https://www.oman.om', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'om';
UPDATE iso.countries SET iso2 = 'BA', demonym = 'Herzegovinian', population = 3807764, density = 74.4, area = 51197, gdp = 24473, median_age = 44.4, website = 'http://www.fbihvlada.gov.ba', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'ba';
UPDATE iso.countries SET iso2 = 'UY', demonym = 'Uruguayan', population = 3416264, density = 19.4, area = 176215, gdp = 71171, median_age = 36.2, website = 'https://www.gub.uy', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'uy';
UPDATE iso.countries SET iso2 = 'MN', demonym = 'Mongolian', population = 3255468, density = 2.1, area = 1564116, gdp = 17146, median_age = 31.2, website = 'https://www.gov.mn/en', driving_side = 'right', un_member = TRUE, religion = 'Buddhism' WHERE id = 'mn';
UPDATE iso.countries SET iso2 = 'MD', demonym = 'Moldavian', population = 3250532, density = 96.0, area = 33851, gdp = 14510, median_age = 39.4, website = 'http://www.moldova.md', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'md';
UPDATE iso.countries SET iso2 = 'KW', demonym = 'Kuwaiti', population = 3103580, density = 174.2, area = 17818, gdp = 175363, median_age = 30.1, website = 'https://www.e.gov.kw', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'kw';
UPDATE iso.countries SET iso2 = 'AL', demonym = 'Albanian', population = 3101621, density = 107.9, area = 28748, gdp = 18916, median_age = 35.8, website = 'https://www.kryeministria.al/en', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'al';
UPDATE iso.countries SET iso2 = 'PR', demonym = 'Puerto Rican', population = 3057311, density = 335.8, area = 9104, gdp = 113434, median_age = 45.6, website = 'https://pr.gov', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'pr';
UPDATE iso.countries SET iso2 = 'AM', demonym = 'Armenian', population = 2989091, density = 100.5, area = 29743, gdp = 19513, median_age = 38.3, website = 'http://www.gov.am/en', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'am';
UPDATE iso.countries SET iso2 = 'PS', demonym = 'West Banker', population = 2949246, density = 521.5, area = 5655, gdp = NULL, median_age = NULL, website = 'https://www.pcbs.gov.ps/default.aspx', driving_side = 'right', un_member = FALSE, religion = 'Islam' WHERE id = 'xw';
UPDATE iso.countries SET iso2 = 'JM', demonym = 'Jamaican', population = 2820982, density = 256.7, area = 10991, gdp = 17097, median_age = 30.5, website = 'https://www.gov.jm', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'jm';
UPDATE iso.countries SET iso2 = 'NA', demonym = 'Namibian', population = 2777232, density = 3.4, area = 824292, gdp = 12607, median_age = 22.5, website = 'https://gov.na', driving_side = 'left', un_member = TRUE, religion = '' WHERE id = 'na';
UPDATE iso.countries SET iso2 = 'LT', demonym = 'Lithuanian', population = 2655755, density = 40.7, area = 65300, gdp = 70878, median_age = 45, website = 'https://www.lietuva.lt/en', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'lt';
UPDATE iso.countries SET iso2 = 'QA', demonym = 'Qatari', population = 2532104, density = 218.5, area = 11586, gdp = 237101, median_age = 34.2, website = 'https://www.diwan.gov.qa', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'qa';
UPDATE iso.countries SET iso2 = 'GM', demonym = 'Gambian', population = 2468569, density = 218.5, area = 11300, gdp = 2231, median_age = 19.9, website = 'https://gambia.gov.gm', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'gm';
UPDATE iso.countries SET iso2 = 'BW', demonym = 'Botswanan', population = 2417596, density = 4.2, area = 581730, gdp = 20352, median_age = 26.8, website = 'https://gov.bw', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'bw';
UPDATE iso.countries SET iso2 = 'GA', demonym = 'Gabonese', population = 2397368, density = 9.0, area = 267667, gdp = 20132, median_age = 21.8, website = 'https://gouvernement.ga', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ga';
UPDATE iso.countries SET iso2 = 'LS', demonym = 'Basotho', population = 2210646, density = 72.8, area = 30355, gdp = 2287, median_age = 23.7, website = 'https://www.gov.ls', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'ls';
UPDATE iso.countries SET iso2 = 'MK', demonym = 'Macedonian', population = 2133410, density = 83.0, area = 25713, gdp = 13711, median_age = 40.1, website = 'https://vlada.mk', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'mk';
UPDATE iso.countries SET iso2 = 'SI', demonym = 'Slovenian', population = 2099790, density = 103.6, area = 20273, gdp = 59981, median_age = 45.9, website = 'https://www.gov.si', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'si';
UPDATE iso.countries SET iso2 = 'GW', demonym = 'Guinea-Bissauan', population = 2078820, density = 57.5, area = 36125, gdp = 1574, median_age = 18.3, website = 'https://www.gov.gw', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'gw';
UPDATE iso.countries SET iso2 = 'XK', demonym = 'Kosovan', population = 1964327, density = 180.4, area = 10887, gdp = NULL, median_age = 31.7, website = 'http://www.rks-gov.net', driving_side = 'right', un_member = FALSE, religion = 'Islam' WHERE id = 'xk';
UPDATE iso.countries SET iso2 = 'LV', demonym = 'Latvian', population = 1821750, density = 28.2, area = 64589, gdp = 40876, median_age = 45.2, website = 'https://www.mk.gov.lv', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'lv';
UPDATE iso.countries SET iso2 = 'GQ', demonym = 'Equatorial Guinean', population = 1737695, density = 61.9, area = 28051, gdp = 11767, median_age = 21.9, website = 'https://www.guineaecuatorialpress.com', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'gq';
UPDATE iso.countries SET iso2 = 'BH', demonym = 'Bahraini', population = 1553886, density = 2044.6, area = 760, gdp = 44382, median_age = 33.3, website = 'https://www.bahrain.bh', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'bh';
UPDATE iso.countries SET iso2 = 'TL', demonym = 'East Timorese', population = 1476042, density = 99.2, area = 14874, gdp = 3204, median_age = 20.3, website = 'http://timor-leste.gov.tl/?lang=en', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'tl';
UPDATE iso.countries SET iso2 = 'TT', demonym = 'Trinidadian', population = 1407460, density = 274.5, area = 5128, gdp = 30053, median_age = 38, website = 'http://www.gov.tt', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'tt';
UPDATE iso.countries SET iso2 = 'MU', demonym = 'Mauritian', population = 1309448, density = 641.9, area = 2040, gdp = 12898, median_age = 39.3, website = 'http://www.govmu.org', driving_side = 'left', un_member = TRUE, religion = 'Hinduism' WHERE id = 'mu';
UPDATE iso.countries SET iso2 = 'CY', demonym = 'Cypriot', population = 1308120, density = 141.4, area = 9251, gdp = 29210, median_age = 39.1, website = 'http://www.cyprus.gov.cy', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'cy';
UPDATE iso.countries SET iso2 = 'EE', demonym = 'Estonian', population = 1202762, density = 26.6, area = 45228, gdp = 38049, median_age = 44.7, website = 'https://valitsus.ee', driving_side = 'right', un_member = TRUE, religion = 'No Religion' WHERE id = 'ee';
UPDATE iso.countries SET iso2 = 'SZ', demonym = 'liSwati', population = 1130043, density = 65.1, area = 17364, gdp = 4326, median_age = 24.4, website = 'http://www.gov.sz', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'sz';
UPDATE iso.countries SET iso2 = 'DJ', demonym = 'Djiboutian', population = 976143, density = 42.1, area = 23200, gdp = 4003, median_age = 26, website = 'https://www.presidence.dj', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'dj';
UPDATE iso.countries SET iso2 = 'FJ', demonym = 'Fijian', population = 947760, density = 51.9, area = 18274, gdp = 4979, median_age = 31.2, website = 'https://www.fiji.gov.fj', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'fj';
UPDATE iso.countries SET iso2 = 'KM', demonym = 'Comorian', population = 888378, density = 397.5, area = 2235, gdp = 1246, median_age = 22.3, website = 'https://beit-salam.km', driving_side = 'right', un_member = TRUE, religion = 'Islam' WHERE id = 'km';
UPDATE iso.countries SET iso2 = 'BT', demonym = 'Bhutanese', population = 876181, density = 22.8, area = 38394, gdp = 2898, median_age = 30.2, website = 'http://www.bhutan.gov.bt', driving_side = 'left', un_member = TRUE, religion = 'Buddhism' WHERE id = 'bt';
UPDATE iso.countries SET iso2 = 'GY', demonym = 'Guyanese', population = 791739, density = 3.7, area = 214969, gdp = 14718, median_age = 27.9, website = 'https://parliament.gov.gy', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'gy';
UPDATE iso.countries SET iso2 = 'SB', demonym = 'Solomon Islander', population = 714766, density = 24.7, area = 28896, gdp = 1597, median_age = 24.8, website = 'https://solomons.gov.sb', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'sb';
UPDATE iso.countries SET iso2 = 'LU', demonym = 'Luxembourgian', population = 660924, density = 255.6, area = 2586, gdp = 81530, median_age = 39.8, website = 'https://luxembourg.public.lu', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'lu';
UPDATE iso.countries SET iso2 = 'MO', demonym = 'Macanese', population = 639971, density = 22856.1, area = 28, gdp = 24042, median_age = 42, website = 'https://www.gov.mo', driving_side = 'left', un_member = FALSE, religion = 'Buddhism' WHERE id = 'mo';
UPDATE iso.countries SET iso2 = 'SR', demonym = 'Surinamese', population = 639759, density = 3.9, area = 163820, gdp = 3620, median_age = 31.6, website = 'https://gov.sr', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'sr';
UPDATE iso.countries SET iso2 = 'CV', demonym = 'Cabo Verdean', population = 603901, density = 149.7, area = 4033, gdp = 2314, median_age = 28.3, website = 'http://www.governo.cv', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'cv';
UPDATE iso.countries SET iso2 = 'ME', demonym = 'Montenegrin', population = 602445, density = 43.6, area = 13812, gdp = 6229, median_age = 40.7, website = 'https://www.gov.me', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'me';
UPDATE iso.countries SET iso2 = 'EH', demonym = 'Sahrawi', population = 565581, density = 2.1, area = 272000, gdp = NULL, median_age = NULL, website = '', driving_side = 'right', un_member = FALSE, religion = 'Islam' WHERE id = 'eh';
UPDATE iso.countries SET iso2 = 'MV', demonym = 'Maldivian', population = 521021, density = 1748.4, area = 298, gdp = 6170, median_age = 31.3, website = 'https://visitmaldives.com', driving_side = 'left', un_member = TRUE, religion = 'Islam' WHERE id = 'mv';
UPDATE iso.countries SET iso2 = 'BN', demonym = 'Brunei', population = 484991, density = 84.1, area = 5765, gdp = 16681, median_age = 32, website = 'https://www.gov.bn/bm', driving_side = 'left', un_member = TRUE, religion = 'Islam' WHERE id = 'bn';
UPDATE iso.countries SET iso2 = 'MT', demonym = 'Maltese', population = 467138, density = 1478.3, area = 316, gdp = 18100, median_age = 43.2, website = 'http://www.gov.mt', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'mt';
UPDATE iso.countries SET iso2 = 'BZ', demonym = 'Belizean', population = 419137, density = 18.3, area = 22966, gdp = 2830, median_age = 26.4, website = 'http://www.belize.gov.bz', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'bz';
UPDATE iso.countries SET iso2 = 'GP', demonym = 'Guadeloupean', population = 378561, density = 232.5, area = 1628, gdp = 9462, median_age = NULL, website = 'https://www.guadeloupe.gouv.fr', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'gp';
UPDATE iso.countries SET iso2 = 'IS', demonym = 'Icelander', population = 360872, density = 3.5, area = 103000, gdp = 28064, median_age = 37.8, website = 'http://www.iceland.is', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'is';
UPDATE iso.countries SET iso2 = 'BS', demonym = 'Bahamian', population = 358508, density = 25.8, area = 13880, gdp = 12897, median_age = 30.2, website = 'https://www.bahamas.gov.bs', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'bs';
UPDATE iso.countries SET iso2 = 'VU', demonym = 'Ni-Vanuatu', population = 313046, density = 25.7, area = 12189, gdp = 985, median_age = 24.2, website = 'https://www.gov.vu', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'vu';
UPDATE iso.countries SET iso2 = 'BB', demonym = 'Barbadian', population = 303431, density = 705.7, area = 430, gdp = 5699, median_age = 41, website = 'http://www.gov.bb', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'bb';
UPDATE iso.countries SET iso2 = 'PF', demonym = 'French Polynesian', population = 301488, density = 72.4, area = 4167, gdp = 5814, median_age = 34.8, website = 'https://www.polynesie-francaise.pref.gouv.fr', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'pf';
UPDATE iso.countries SET iso2 = 'NC', demonym = 'New Caledonian', population = 300682, density = 16.2, area = 18575, gdp = 9623, median_age = 33.9, website = 'https://gouv.nc', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'nc';
UPDATE iso.countries SET iso2 = 'ST', demonym = 'Sao Tomean', population = 220372, density = 228.6, area = 964, gdp = 546, median_age = 20.4, website = 'http://www.saotome.st', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'st';
UPDATE iso.countries SET iso2 = 'WS', demonym = 'Samoan', population = 207501, density = 73.3, area = 2831, gdp = 857, median_age = 26.9, website = 'http://www.samoagovt.ws', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'ws';
UPDATE iso.countries SET iso2 = 'GU', demonym = 'Guamanian', population = 169330, density = 311.3, area = 544, gdp = NULL, median_age = 30.1, website = 'http://www.guam.gov', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'gu';
UPDATE iso.countries SET iso2 = 'LC', demonym = 'Saint Lucian', population = 167591, density = 272.1, area = 616, gdp = 2165, median_age = 39, website = 'http://www.govt.lc', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'lc';
UPDATE iso.countries SET iso2 = 'CW', demonym = 'Curaçaoan', population = 152849, density = 344.3, area = 444, gdp = NULL, median_age = 37.5, website = 'http://www.curacao.com', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'cw';
UPDATE iso.countries SET iso2 = 'AW', demonym = 'Aruban', population = 123702, density = 687.2, area = 180, gdp = 3544, median_age = 40.7, website = 'http://www.aruba.com', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'aw';
UPDATE iso.countries SET iso2 = 'KI', demonym = 'I-Kiribati', population = 115372, density = 142.3, area = 811, gdp = 223, median_age = 26.9, website = 'https://www.kiribati.gov.ki', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'ki';
UPDATE iso.countries SET iso2 = 'GD', demonym = 'Grenadian', population = 114299, density = 332.3, area = 344, gdp = 1192, median_age = 35, website = 'https://www.gov.gd', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'gd';
UPDATE iso.countries SET iso2 = 'TO', demonym = 'Tongan', population = 105221, density = 140.9, area = 747, gdp = 488, median_age = 25.4, website = 'http://www.mic.gov.to', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'to';
UPDATE iso.countries SET iso2 = 'VI', demonym = 'Virgin Islander', population = 104917, density = 54.9, area = 1910, gdp = NULL, median_age = 42.7, website = 'http://www.vi.gov', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'vi';
UPDATE iso.countries SET iso2 = 'JE', demonym = 'Jersey People', population = 102785, density = 886.1, area = 116, gdp = NULL, median_age = 38, website = 'https://www.gov.je', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'je';
UPDATE iso.countries SET iso2 = 'AG', demonym = 'Antigua and Barbuda', population = 101489, density = 229.1, area = 443, gdp = 1770, median_age = 33.6, website = 'http://www.ab.gov.ag', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'ag';
UPDATE iso.countries SET iso2 = 'VC', demonym = 'Saint Vincentian', population = 100804, density = 259.1, area = 389, gdp = 946, median_age = 37, website = 'https://www.gov.vc', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'vc';
UPDATE iso.countries SET iso2 = 'FM', demonym = 'Micronesian', population = 100319, density = 142.9, area = 702, gdp = 427, median_age = 27.8, website = 'https://gov.fm', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'fm';
UPDATE iso.countries SET iso2 = 'SC', demonym = 'Seychelloise', population = 97617, density = 214.5, area = 455, gdp = 1994, median_age = 38.2, website = 'http://www.egov.sc', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'sc';
UPDATE iso.countries SET iso2 = 'IM', demonym = 'Manx', population = 91840, density = 160.6, area = 572, gdp = NULL, median_age = 44.8, website = 'http://www.gov.im', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'im';
UPDATE iso.countries SET iso2 = 'AD', demonym = 'Andorran', population = 85468, density = 182.6, area = 468, gdp = 3376, median_age = 48.1, website = 'https://www.govern.ad', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'ad';
UPDATE iso.countries SET iso2 = 'MH', demonym = 'Marshallese', population = 80966, density = 447.3, area = 181, gdp = 279, median_age = 25.1, website = 'https://rmiparliament.org/cms', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'mh';
UPDATE iso.countries SET iso2 = 'DM', demonym = 'Dominican', population = 74656, density = 99.4, area = 751, gdp = 612, median_age = 36.5, website = 'http://www.dominica.gov.dm', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'dm';
UPDATE iso.countries SET iso2 = 'BM', demonym = 'Bermudian', population = 72576, density = 1344.0, area = 54, gdp = 7546, median_age = 43.7, website = 'https://www.gov.bm', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'bm';
UPDATE iso.countries SET iso2 = 'GG', demonym = 'Guernsey', population = 67642, density = 867.2, area = 78, gdp = NULL, median_age = 44.8, website = 'https://www.gov.gg', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'gg';
UPDATE iso.countries SET iso2 = 'KY', demonym = 'Caymanian', population = 65483, density = 248.0, area = 264, gdp = 6281, median_age = 41, website = 'https://www.gov.ky', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'ky';
UPDATE iso.countries SET iso2 = 'TC', demonym = 'Turks and Caicos Islander', population = 59367, density = 62.6, area = 948, gdp = 1138, median_age = 35.9, website = 'https://www.gov.tc', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'tc';
UPDATE iso.countries SET iso2 = 'GL', demonym = 'Greenlandic', population = 57777, density = 0.0, area = 2166086, gdp = 2926, median_age = 35, website = 'https://naalakkersuisut.gl', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'gl';
UPDATE iso.countries SET iso2 = 'KN', demonym = 'Kittitian', population = 54817, density = 210.0, area = 261, gdp = 979, median_age = 38.1, website = 'https://www.gov.kn', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'kn';
UPDATE iso.countries SET iso2 = 'FO', demonym = 'Faroe Islander', population = 52600, density = 37.8, area = 1393, gdp = NULL, median_age = 36.8, website = 'https://www.government.fo', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'fo';
UPDATE iso.countries SET iso2 = 'MP', demonym = 'Northern Mariana Islander', population = 51295, density = 110.5, area = 464, gdp = NULL, median_age = 32.3, website = 'http://gov.mp', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'mp';
UPDATE iso.countries SET iso2 = 'SX', demonym = 'St. Maartener', population = 45677, density = 1343.4, area = 34, gdp = NULL, median_age = 41.1, website = '', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'sx';
UPDATE iso.countries SET iso2 = 'AS', demonym = 'American Samoan', population = 44620, density = 199.2, area = 224, gdp = 709, median_age = 29.4, website = 'https://www.americansamoa.gov', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'as';
UPDATE iso.countries SET iso2 = 'LI', demonym = 'Liechtensteiner', population = 39993, density = 250.0, area = 160, gdp = 7757, median_age = 44.1, website = 'https://www.liechtenstein.li', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'li';
UPDATE iso.countries SET iso2 = 'VG', demonym = 'British Virgin Islander', population = 39369, density = 260.7, area = 151, gdp = NULL, median_age = 38.2, website = 'http://www.bvi.gov.vg', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'vg';
UPDATE iso.countries SET iso2 = 'SM', demonym = 'Sammarinese', population = 34892, density = 572.0, area = 61, gdp = 1780, median_age = 45.9, website = 'https://www.gov.sm', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'sm';
UPDATE iso.countries SET iso2 = 'MF', demonym = 'Saint-Martinoi', population = 32897, density = 657.9, area = 50, gdp = NULL, median_age = 34, website = 'https://www.sintmaartengov.org', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'mf';
UPDATE iso.countries SET iso2 = 'MC', demonym = 'Monegasque', population = 31597, density = 15798.5, area = 2, gdp = 8772, median_age = 56.2, website = 'https://www.gouv.mc|https://www.mairie.mc', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'mc';
UPDATE iso.countries SET iso2 = 'BQ', demonym = 'Dutch Caribbean', population = 30397, density = NULL, area = NULL, gdp = 725, median_age = NULL, website = 'http://www.rijksdienstcn.com', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'bq';
UPDATE iso.countries SET iso2 = 'GI', demonym = 'Gibraltarian', population = 29629, density = 4232.7, area = 7, gdp = NULL, median_age = 36.6, website = 'http://www.gibraltar.gov.gi', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'gi';
UPDATE iso.countries SET iso2 = 'PW', demonym = 'Palauan', population = 21779, density = 47.4, area = 459, gdp = 225, median_age = 35, website = 'https://www.palaugov.pw', driving_side = 'right', un_member = TRUE, religion = 'Christianity' WHERE id = 'pw';
UPDATE iso.countries SET iso2 = 'AI', demonym = 'Anguillan', population = 19079, density = 209.7, area = 91, gdp = NULL, median_age = 36.8, website = 'https://www.gov.ai', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'ai';
UPDATE iso.countries SET iso2 = 'WF', demonym = 'Wallisian', population = 15929, density = 112.2, area = 142, gdp = NULL, median_age = 35.8, website = 'http://www.wallis-et-futuna.pref.gouv.fr', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'wf';
UPDATE iso.countries SET iso2 = 'TV', demonym = 'Tuvaluan', population = 11639, density = 447.7, area = 26, gdp = 59, median_age = 27.5, website = 'https://finance.gov.tv', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'tv';
UPDATE iso.countries SET iso2 = 'NR', demonym = 'Nauruan', population = 9852, density = 469.1, area = 21, gdp = 147, median_age = 27.5, website = 'https://www.nauru.gov.nr', driving_side = 'left', un_member = TRUE, religion = 'Christianity' WHERE id = 'nr';
UPDATE iso.countries SET iso2 = 'CK', demonym = 'Cook Islander', population = 7939, density = 33.6, area = 236, gdp = NULL, median_age = 40.6, website = 'http://www.ck/govt.htm', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'ck';
UPDATE iso.countries SET iso2 = 'SH', demonym = 'Ascension Islander', population = 7935, density = 20.1, area = 394, gdp = NULL, median_age = 44.7, website = '', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'sh';
UPDATE iso.countries SET iso2 = 'BL', demonym = 'Saint-Barth', population = 7093, density = 283.7, area = 25, gdp = NULL, median_age = 47, website = 'https://www.comstbarth.fr', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'bl';
UPDATE iso.countries SET iso2 = 'MS', demonym = 'Montserratian', population = 5440, density = 53.3, area = 102, gdp = NULL, median_age = 36.4, website = 'https://www.gov.ms', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'ms';
UPDATE iso.countries SET iso2 = 'PM', demonym = 'Saint-Pierrai', population = 5195, density = 21.5, area = 242, gdp = NULL, median_age = 50.6, website = 'http://www.spm-ct975.fr', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'pm';
UPDATE iso.countries SET iso2 = 'FK', demonym = 'Falkland Islander', population = 3662, density = 0.3, area = 12173, gdp = NULL, median_age = NULL, website = 'http://www.falklands.gov.fk', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'fk';
UPDATE iso.countries SET iso2 = 'SJ', demonym = 'Svalbardian', population = 2926, density = 0.0, area = 62045, gdp = NULL, median_age = NULL, website = 'https://www.sysselmesteren.no/en', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'sj';
UPDATE iso.countries SET iso2 = 'CX', demonym = 'Christmas Islander', population = 2205, density = 16.3, area = 135, gdp = NULL, median_age = NULL, website = 'https://www.shire.gov.cx', driving_side = 'left', un_member = FALSE, religion = 'Buddhism' WHERE id = 'cx';
UPDATE iso.countries SET iso2 = 'NU', demonym = 'Niuean', population = 2000, density = 7.7, area = 260, gdp = NULL, median_age = NULL, website = 'https://www.gov.nu', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'nu';
UPDATE iso.countries SET iso2 = 'NF', demonym = 'Norfolk Islander', population = 1748, density = 48.6, area = 36, gdp = NULL, median_age = NULL, website = 'http://www.info.gov.nf', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'nf';
UPDATE iso.countries SET iso2 = 'TK', demonym = 'Tokelauan', population = 1647, density = 137.3, area = 12, gdp = NULL, median_age = NULL, website = 'https://www.tokelau.org.nz', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'tk';
UPDATE iso.countries SET iso2 = 'VA', demonym = 'Vatican', population = 1000, density = NULL, area = 0, gdp = NULL, median_age = NULL, website = 'http://www.vaticanstate.va', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'va';
UPDATE iso.countries SET iso2 = 'CC', demonym = 'Cocos Islander', population = 596, density = 42.6, area = 14, gdp = NULL, median_age = NULL, website = '', driving_side = 'left', un_member = FALSE, religion = 'Islam' WHERE id = 'cc';
UPDATE iso.countries SET iso2 = 'UM', demonym = '', population = 300, density = 6.1, area = 49.26, gdp = NULL, median_age = NULL, website = '', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'um';
UPDATE iso.countries SET iso2 = 'PN', demonym = 'Pitcairn Islander', population = 50, density = 1.1, area = 47, gdp = NULL, median_age = NULL, website = 'https://www.government.pn', driving_side = 'left', un_member = FALSE, religion = 'Christianity' WHERE id = 'pn';
UPDATE iso.countries SET iso2 = 'IO', demonym = '', population = NULL, density = NULL, area = 60, gdp = NULL, median_age = NULL, website = 'https://www.biot.gov.io', driving_side = 'right', un_member = FALSE, religion = 'Islam' WHERE id = 'io';
UPDATE iso.countries SET iso2 = 'GF', demonym = 'French Guianese', population = NULL, density = NULL, area = NULL, gdp = NULL, median_age = NULL, website = 'https://www.ctguyane.fr', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'gf';
UPDATE iso.countries SET iso2 = 'TF', demonym = '', population = NULL, density = NULL, area = NULL, gdp = NULL, median_age = NULL, website = 'https://taaf.fr', driving_side = 'right', un_member = FALSE, religion = '' WHERE id = 'tf';
UPDATE iso.countries SET iso2 = 'MQ', demonym = 'Martiniquai', population = NULL, density = NULL, area = NULL, gdp = NULL, median_age = NULL, website = 'http://www.martinique.pref.gouv.fr', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 'mq';
UPDATE iso.countries SET iso2 = 'YT', demonym = 'Mahoran', population = NULL, density = NULL, area = NULL, gdp = NULL, median_age = NULL, website = 'https://mayotte.fr', driving_side = 'right', un_member = FALSE, religion = 'Islam' WHERE id = 'yt';
UPDATE iso.countries SET iso2 = 'RE', demonym = 'Reunion', population = NULL, density = NULL, area = NULL, gdp = NULL, median_age = NULL, website = 'http://www.regionreunion.com', driving_side = 'right', un_member = FALSE, religion = 'Christianity' WHERE id = 're';
UPDATE iso.countries SET iso2 = 'GS', demonym = 'South Sandwich Islander', population = NULL, density = NULL, area = NULL, gdp = NULL, median_age = NULL, website = 'https://gov.gs', driving_side = 'left', un_member = FALSE, religion = '' WHERE id = 'gs';
UPDATE iso.countries SET iso2 = 'HM', demonym = '', population = NULL, density = NULL, area = 412, gdp = NULL, median_age = NULL, website = 'https://www.antarctica.gov.au/antarctic-operations/stations/other-locations/heard-island', driving_side = 'left', un_member = FALSE, religion = '' WHERE id = 'hm';
UPDATE iso.countries SET iso2 = 'BV', demonym = '', population = NULL, density = NULL, area = 49, gdp = NULL, median_age = NULL, website = '', driving_side = 'right', un_member = FALSE, religion = '' WHERE id = 'bv';
UPDATE iso.countries SET iso2 = 'AQ', demonym = '', population = NULL, density = NULL, area = 14200000, gdp = NULL, median_age = NULL, website = 'http://www.ats.aq', driving_side = '', un_member = FALSE, religion = 'No Religion' WHERE id = 'aq';

    

INSERT INTO
    iso.languages ("id", "name")
VALUES
    ('afr', 'Afrikaans'),
    ('amh', 'Amharic'),
    ('ara', 'Arabic'),
    ('arc', 'Aramaic'),
    ('aym', 'Aymara'),
    ('aze', 'Azerbaijani'),
    ('bar', 'Austro-Bavarian German'),
    ('bel', 'Belarusian'),
    ('ben', 'Bengali'),
    ('ber', 'Berber'),
    ('bis', 'Bislama'),
    ('bjz', 'Belizean Creole'),
    ('bos', 'Bosnian'),
    ('bul', 'Bulgarian'),
    ('bwg', 'Chibarwe'),
    ('cal', 'Carolinian'),
    ('cat', 'Catalan'),
    ('ces', 'Czech'),
    ('cha', 'Chamorro'),
    ('ckb', 'Sorani'),
    ('cmn', 'Mandarin'),
    ('crs', 'Seychellois Creole'),
    ('dan', 'Danish'),
    ('deu', 'German'),
    ('div', 'Maldivian'),
    ('dzo', 'Dzongkha'),
    ('ell', 'Greek'),
    ('eng', 'English'),
    ('est', 'Estonian'),
    ('eus', 'Basque'),
    ('fao', 'Faroese'),
    ('fas', 'Persian'),
    ('fij', 'Fijian'),
    ('fil', 'Filipino'),
    ('fin', 'Finnish'),
    ('fra', 'French'),
    ('gil', 'Gilbertese'),
    ('gle', 'Irish'),
    ('glg', 'Galician'),
    ('glv', 'Manx'),
    ('grn', 'Guaraní'),
    ('gsw', 'Swiss German'),
    ('hat', 'Haitian Creole'),
    ('heb', 'Hebrew'),
    ('her', 'Herero'),
    ('hgm', 'Khoekhoe'),
    ('hif', 'Fiji Hindi'),
    ('hin', 'Hindi'),
    ('hmo', 'Hiri Motu'),
    ('hrv', 'Croatian'),
    ('hun', 'Hungarian'),
    ('hye', 'Armenian'),
    ('ind', 'Indonesian'),
    ('isl', 'Icelandic'),
    ('ita', 'Italian'),
    ('jam', 'Jamaican Patois'),
    ('jpn', 'Japanese'),
    ('kal', 'Greenlandic'),
    ('kat', 'Georgian'),
    ('kaz', 'Kazakh'),
    ('kck', 'Kalanga'),
    ('khi', 'Khoisan'),
    ('khm', 'Khmer'),
    ('kin', 'Kinyarwanda'),
    ('kir', 'Kyrgyz'),
    ('kon', 'Kikongo'),
    ('kor', 'Korean'),
    ('kwn', 'Kwangali'),
    ('lao', 'Lao'),
    ('lat', 'Latin'),
    ('lav', 'Latvian'),
    ('lin', 'Lingala'),
    ('lit', 'Lithuanian'),
    ('loz', 'Lozi'),
    ('ltz', 'Luxembourgish'),
    ('lua', 'Tshiluba'),
    ('mah', 'Marshallese'),
    ('mey', 'Hassaniya'),
    ('mfe', 'Mauritian Creole'),
    ('mkd', 'Macedonian'),
    ('mlg', 'Malagasy'),
    ('mlt', 'Maltese'),
    ('mon', 'Mongolian'),
    ('mri', 'Māori'),
    ('msa', 'Malay'),
    ('mya', 'Burmese'),
    ('nau', 'Nauru'),
    ('nbl', 'Southern Ndebele'),
    ('ndc', 'Ndau'),
    ('nde', 'Northern Ndebele'),
    ('ndo', 'Ndonga'),
    ('nep', 'Nepali'),
    ('nfr', 'Guernésiais'),
    ('niu', 'Niuean'),
    ('nld', 'Dutch'),
    ('nno', 'Norwegian Nynorsk'),
    ('nob', 'Norwegian Bokmål'),
    ('nor', 'Norwegian'),
    ('nrf', 'Jèrriais'),
    ('nso', 'Northern Sotho'),
    ('nya', 'Chewa'),
    ('nzs', 'New Zealand Sign Language'),
    ('oci', 'Occitan'),
    ('pap', 'Papiamento'),
    ('pau', 'Palauan'),
    ('pih', 'Norfuk'),
    ('pol', 'Polish'),
    ('por', 'Portuguese'),
    ('prs', 'Dari'),
    ('pus', 'Pashto'),
    ('que', 'Quechua'),
    ('rar', 'Cook Islands Māori'),
    ('roh', 'Romansh'),
    ('ron', 'Romanian'),
    ('run', 'Kirundi'),
    ('rus', 'Russian'),
    ('sag', 'Sango'),
    ('sin', 'Sinhala'),
    ('slk', 'Slovak'),
    ('slv', 'Slovene'),
    ('smi', 'Sami'),
    ('smo', 'Samoan'),
    ('sna', 'Shona'),
    ('som', 'Somali'),
    ('sot', 'Sotho'),
    ('spa', 'Spanish'),
    ('sqi', 'Albanian'),
    ('srd', 'Sardinian'),
    ('srp', 'Serbian'),
    ('ssw', 'Swazi'),
    ('swa', 'Swahili'),
    ('swe', 'Swedish'),
    ('tam', 'Tamil'),
    ('tet', 'Tetum'),
    ('tgk', 'Tajik'),
    ('tha', 'Thai'),
    ('tir', 'Tigrinya'),
    ('tkl', 'Tokelauan'),
    ('toi', 'Tonga'),
    ('ton', 'Tongan'),
    ('tpi', 'Tok Pisin'),
    ('tsn', 'Tswana'),
    ('tso', 'Tsonga'),
    ('tuk', 'Turkmen'),
    ('tur', 'Turkish'),
    ('tvl', 'Tuvaluan'),
    ('ukr', 'Ukrainian'),
    ('urd', 'Urdu'),
    ('uzb', 'Uzbek'),
    ('ven', 'Venda'),
    ('vie', 'Vietnamese'),
    ('xho', 'Xhosa'),
    ('zdj', 'Comorian'),
    ('zho', 'Chinese'),
    ('zib', 'Zimbabwean Sign Language'),
    ('zul', 'Zulu');

INSERT INTO
    iso.currencies ("id", "name")
VALUES
    ('AED', 'UAE Dirham'),
    ('AFN', 'Afghani'),
    ('ALL', 'Lek'),
    ('AMD', 'Armenian Dram'),
    ('ANG', 'Netherlands Antillean Guilder'),
    ('AOA', 'Kwanza'),
    ('ARS', 'Argentine Peso'),
    ('AUD', 'Australian Dollar'),
    ('AWG', 'Aruban Florin'),
    ('AZN', 'Azerbaijanian Manat'),
    ('BAM', 'Convertible Mark'),
    ('BBD', 'Barbados Dollar'),
    ('BDT', 'Taka'),
    ('BGN', 'Bulgarian Lev'),
    ('BHD', 'Bahraini Dinar'),
    ('BIF', 'Burundi Franc'),
    ('BMD', 'Bermudian Dollar'),
    ('BND', 'Brunei Dollar'),
    ('BOB', 'Boliviano'),
    ('BRL', 'Brazilian Real'),
    ('BSD', 'Bahamian Dollar'),
    ('BTN', 'Bhutanese ngultrum'),
    ('BWP', 'Pula'),
    ('BYN', 'Belarussian Ruble'),
    ('BZD', 'Belize Dollar'),
    ('CAD', 'Canadian Dollar'),
    ('CDF', 'Congolese franc'),
    ('CHF', 'Swiss Franc'),
    ('CLP', 'Chilean Peso'),
    ('CNY', 'Yuan Renminbi'),
    ('COP', 'Colombian Peso'),
    ('CRC', 'Costa Rican Colon'),
    ('CUP', 'Cuban Peso'),
    ('CVE', 'Cabo Verde Escudo'),
    ('CZK', 'Czech Koruna'),
    ('DJF', 'Djibouti Franc'),
    ('DKK', 'Danish Krone'),
    ('DOP', 'Dominican Peso'),
    ('DZD', 'Algerian Dinar'),
    ('EGP', 'Egyptian Pound'),
    ('ERN', 'Nakfa'),
    ('ETB', 'Ethiopian Birr'),
    ('EUR', 'Euro'),
    ('FJD', 'Fiji Dollar'),
    ('FKP', 'Falkland Islands Pound'),
    ('GBP', 'Pound Sterling'),
    ('GEL', 'Lari'),
    ('GHS', 'Ghana Cedi'),
    ('GIP', 'Gibraltar Pound'),
    ('GMD', 'Dalasi'),
    ('GNF', 'Guinea Franc'),
    ('GTQ', 'Quetzal'),
    ('GYD', 'Guyana Dollar'),
    ('HKD', 'Hong Kong dollar'),
    ('HNL', 'Lempira'),
    ('HRK', 'Croatian Kuna'),
    ('HTG', 'Haitian gourde'),
    ('HUF', 'Forint'),
    ('IDR', 'Rupiah'),
    ('ILS', 'Israeli new shekel'),
    ('INR', 'Indian Rupee'),
    ('IQD', 'Iraqi Dinar'),
    ('IRR', 'Iranian rial'),
    ('ISK', 'Iceland Krona'),
    ('JMD', 'Jamaican Dollar'),
    ('JOD', 'Jordanian Dinar'),
    ('JPY', 'Yen'),
    ('KES', 'Kenyan Shilling'),
    ('KGS', 'Som'),
    ('KHR', 'Riel'),
    ('KMF', 'Comoro Franc'),
    ('KPW', 'North Korean won'),
    ('KRW', 'South Korean won'),
    ('KWD', 'Kuwaiti Dinar'),
    ('KYD', 'Cayman Islands Dollar'),
    ('KZT', 'Tenge'),
    ('LAK', 'Kip'),
    ('LBP', 'Lebanese Pound'),
    ('LKR', 'Sri Lanka Rupee'),
    ('LRD', 'Liberian Dollar'),
    ('LSL', 'Lesotho loti'),
    ('LYD', 'Libyan Dinar'),
    ('MAD', 'Moroccan Dirham'),
    ('MDL', 'Moldovan leu'),
    ('MGA', 'Malagasy Ariary'),
    ('MKD', 'Macedonian denar'),
    ('MMK', 'Kyat'),
    ('MNT', 'Tugrik'),
    ('MOP', 'Macanese pataca'),
    ('MRO', 'Ouguiya'),
    ('MUR', 'Mauritius Rupee'),
    ('MVR', 'Rufiyaa'),
    ('MWK', 'Kwacha'),
    ('MXN', 'Mexican Peso'),
    ('MYR', 'Malaysian Ringgit'),
    ('MZN', 'Mozambique Metical'),
    ('NAD', 'Namibian dollar'),
    ('NGN', 'Naira'),
    ('NIO', 'Cordoba Oro'),
    ('NOK', 'Norwegian krone'),
    ('NPR', 'Nepalese Rupee'),
    ('NZD', 'New Zealand Dollar'),
    ('OMR', 'Rial Omani'),
    ('PAB', 'Panamanian balboa'),
    ('PEN', 'Nuevo Sol'),
    ('PGK', 'Kina'),
    ('PHP', 'Philippine Peso'),
    ('PKR', 'Pakistan Rupee'),
    ('PLN', 'Zloty'),
    ('PYG', 'Guarani'),
    ('QAR', 'Qatari Rial'),
    ('RON', 'New Romanian Leu'),
    ('RSD', 'Serbian Dinar'),
    ('RUB', 'Russian Ruble'),
    ('RWF', 'Rwanda Franc'),
    ('SAR', 'Saudi Riyal'),
    ('SBD', 'Solomon Islands Dollar'),
    ('SCR', 'Seychelles Rupee'),
    ('SDG', 'Sudanese Pound'),
    ('SEK', 'Swedish Krona'),
    ('SGD', 'Singapore Dollar'),
    ('SHP', 'Saint Helena pound'),
    ('SLL', 'Leone'),
    ('SOS', 'Somali Shilling'),
    ('SRD', 'Surinam Dollar'),
    ('SSP', 'South Sudanese Pound'),
    ('STD', 'Dobra'),
    ('SVC', 'Salvadoran colón'),
    ('SYP', 'Syrian Pound'),
    ('SZL', 'Lilangeni'),
    ('THB', 'Baht'),
    ('TJS', 'Somoni'),
    ('TMT', 'Turkmenistan New Manat'),
    ('TND', 'Tunisian Dinar'),
    ('TOP', 'Pa’anga'),
    ('TRY', 'Turkish Lira'),
    ('TTD', 'Trinidad and Tobago Dollar'),
    ('TWD', 'New Taiwan dollar'),
    ('TZS', 'Tanzanian shilling'),
    ('UAH', 'Hryvnia'),
    ('UGX', 'Uganda Shilling'),
    ('USD', 'US Dollar'),
    ('UYU', 'Peso Uruguayo'),
    ('UZS', 'Uzbekistan Sum'),
    ('VES', 'Venezuelan bolívar soberano'),
    ('VND', 'Dong'),
    ('VUV', 'Vatu'),
    ('WST', 'Tala'),
    ('XAF', 'CFA Franc BEAC'),
    ('XCD', 'East Caribbean Dollar'),
    ('XOF', 'CFA Franc BCEAO'),
    ('XPF', 'CFP franc (franc Pacifique)'),
    ('YER', 'Yemeni Rial'),
    ('ZAR', 'Rand'),
    ('ZMW', 'Zambian Kwacha'),
    ('ZWL', 'Zimbabwe Dollar');

INSERT INTO
    iso.country_languages ("country_id", "language_id")
VALUES
    ('ad', 'cat'),
    ('ae', 'ara'),
    ('af', 'prs'),
    ('af', 'pus'),
    ('af', 'tuk'),
    ('ag', 'eng'),
    ('ai', 'eng'),
    ('al', 'sqi'),
    ('am', 'hye'),
    ('am', 'rus'),
    ('ao', 'por'),
    ('ar', 'grn'),
    ('ar', 'spa'),
    ('as', 'eng'),
    ('as', 'smo'),
    ('at', 'bar'),
    ('au', 'eng'),
    ('aw', 'nld'),
    ('aw', 'pap'),
    ('ax', 'swe'),
    ('az', 'aze'),
    ('az', 'rus'),
    ('ba', 'bos'),
    ('ba', 'hrv'),
    ('ba', 'srp'),
    ('bb', 'eng'),
    ('bd', 'ben'),
    ('be', 'deu'),
    ('be', 'fra'),
    ('be', 'nld'),
    ('bf', 'fra'),
    ('bg', 'bul'),
    ('bh', 'ara'),
    ('bi', 'fra'),
    ('bi', 'run'),
    ('bj', 'fra'),
    ('bl', 'fra'),
    ('bm', 'eng'),
    ('bn', 'msa'),
    ('bo', 'aym'),
    ('bo', 'grn'),
    ('bo', 'que'),
    ('bo', 'spa'),
    ('bq', 'eng'),
    ('br', 'por'),
    ('bs', 'eng'),
    ('bt', 'dzo'),
    ('bv', 'nor'),
    ('bw', 'eng'),
    ('bw', 'tsn'),
    ('by', 'bel'),
    ('by', 'rus'),
    ('bz', 'bjz'),
    ('bz', 'eng'),
    ('bz', 'spa'),
    ('ca', 'eng'),
    ('ca', 'fra'),
    ('cc', 'eng'),
    ('cd', 'fra'),
    ('cd', 'kon'),
    ('cd', 'lin'),
    ('cd', 'lua'),
    ('cd', 'swa'),
    ('cf', 'fra'),
    ('cf', 'sag'),
    ('cg', 'fra'),
    ('cg', 'kon'),
    ('cg', 'lin'),
    ('ch', 'fra'),
    ('ch', 'gsw'),
    ('ch', 'ita'),
    ('ch', 'roh'),
    ('ci', 'fra'),
    ('ck', 'eng'),
    ('ck', 'rar'),
    ('cl', 'spa'),
    ('cm', 'eng'),
    ('cm', 'fra'),
    ('cn', 'cmn'),
    ('co', 'spa'),
    ('cr', 'spa'),
    ('cu', 'spa'),
    ('cv', 'por'),
    ('cw', 'eng'),
    ('cw', 'nld'),
    ('cw', 'pap'),
    ('cx', 'eng'),
    ('cy', 'ell'),
    ('cy', 'tur'),
    ('cz', 'ces'),
    ('cz', 'slk'),
    ('de', 'deu'),
    ('dj', 'ara'),
    ('dj', 'fra'),
    ('dk', 'dan'),
    ('dm', 'eng'),
    ('do', 'spa'),
    ('dz', 'ara'),
    ('ec', 'spa'),
    ('ee', 'est'),
    ('eg', 'ara'),
    ('eh', 'ber'),
    ('eh', 'mey'),
    ('eh', 'spa'),
    ('er', 'ara'),
    ('er', 'eng'),
    ('er', 'tir'),
    ('es', 'cat'),
    ('es', 'eus'),
    ('es', 'glg'),
    ('es', 'oci'),
    ('es', 'spa'),
    ('et', 'amh'),
    ('fi', 'fin'),
    ('fi', 'swe'),
    ('fj', 'eng'),
    ('fj', 'fij'),
    ('fj', 'hif'),
    ('fk', 'eng'),
    ('fm', 'eng'),
    ('fo', 'dan'),
    ('fo', 'fao'),
    ('fr', 'fra'),
    ('ga', 'fra'),
    ('gb', 'eng'),
    ('gd', 'eng'),
    ('ge', 'kat'),
    ('gf', 'fra'),
    ('gg', 'eng'),
    ('gg', 'fra'),
    ('gg', 'nfr'),
    ('gh', 'eng'),
    ('gi', 'eng'),
    ('gl', 'kal'),
    ('gm', 'eng'),
    ('gn', 'fra'),
    ('gp', 'fra'),
    ('gq', 'fra'),
    ('gq', 'por'),
    ('gq', 'spa'),
    ('gr', 'ell'),
    ('gs', 'eng'),
    ('gt', 'spa'),
    ('gu', 'cha'),
    ('gu', 'eng'),
    ('gu', 'spa'),
    ('gw', 'por'),
    ('gy', 'eng'),
    ('hk', 'eng'),
    ('hk', 'zho'),
    ('hm', 'eng'),
    ('hn', 'spa'),
    ('hr', 'hrv'),
    ('ht', 'fra'),
    ('ht', 'hat'),
    ('hu', 'hun'),
    ('id', 'ind'),
    ('ie', 'eng'),
    ('ie', 'gle'),
    ('il', 'ara'),
    ('il', 'heb'),
    ('im', 'eng'),
    ('im', 'glv'),
    ('in', 'eng'),
    ('in', 'hin'),
    ('in', 'tam'),
    ('io', 'eng'),
    ('iq', 'ara'),
    ('iq', 'arc'),
    ('iq', 'ckb'),
    ('ir', 'fas'),
    ('is', 'isl'),
    ('it', 'bar'),
    ('it', 'ita'),
    ('it', 'srd'),
    ('je', 'eng'),
    ('je', 'fra'),
    ('je', 'nrf'),
    ('jm', 'eng'),
    ('jm', 'jam'),
    ('jo', 'ara'),
    ('jp', 'jpn'),
    ('ke', 'eng'),
    ('ke', 'swa'),
    ('kg', 'kir'),
    ('kg', 'rus'),
    ('kh', 'khm'),
    ('ki', 'eng'),
    ('ki', 'gil'),
    ('km', 'ara'),
    ('km', 'fra'),
    ('km', 'zdj'),
    ('kn', 'eng'),
    ('kp', 'kor'),
    ('kr', 'kor'),
    ('kw', 'ara'),
    ('ky', 'eng'),
    ('kz', 'kaz'),
    ('kz', 'rus'),
    ('la', 'lao'),
    ('lb', 'ara'),
    ('lb', 'fra'),
    ('lc', 'eng'),
    ('li', 'deu'),
    ('lk', 'sin'),
    ('lk', 'tam'),
    ('lr', 'eng'),
    ('ls', 'eng'),
    ('ls', 'sot'),
    ('lt', 'lit'),
    ('lu', 'deu'),
    ('lu', 'fra'),
    ('lu', 'ltz'),
    ('lv', 'lav'),
    ('ly', 'ara'),
    ('ma', 'ara'),
    ('ma', 'ber'),
    ('mc', 'fra'),
    ('md', 'ron'),
    ('me', 'srp'),
    ('mf', 'fra'),
    ('mg', 'fra'),
    ('mg', 'mlg'),
    ('mh', 'eng'),
    ('mh', 'mah'),
    ('mk', 'mkd'),
    ('ml', 'fra'),
    ('mm', 'mya'),
    ('mn', 'mon'),
    ('mo', 'por'),
    ('mo', 'zho'),
    ('mp', 'cal'),
    ('mp', 'cha'),
    ('mp', 'eng'),
    ('mq', 'fra'),
    ('mr', 'ara'),
    ('ms', 'eng'),
    ('mt', 'eng'),
    ('mt', 'mlt'),
    ('mu', 'eng'),
    ('mu', 'fra'),
    ('mu', 'mfe'),
    ('mv', 'div'),
    ('mw', 'eng'),
    ('mw', 'nya'),
    ('mx', 'spa'),
    ('my', 'eng'),
    ('my', 'msa'),
    ('mz', 'por'),
    ('na', 'afr'),
    ('na', 'deu'),
    ('na', 'eng'),
    ('na', 'her'),
    ('na', 'hgm'),
    ('na', 'kwn'),
    ('na', 'loz'),
    ('na', 'ndo'),
    ('na', 'tsn'),
    ('nc', 'fra'),
    ('ne', 'fra'),
    ('nf', 'eng'),
    ('nf', 'pih'),
    ('ng', 'eng'),
    ('ni', 'spa'),
    ('nl', 'nld'),
    ('no', 'nno'),
    ('no', 'nob'),
    ('no', 'smi'),
    ('np', 'nep'),
    ('nr', 'eng'),
    ('nr', 'nau'),
    ('nu', 'eng'),
    ('nu', 'niu'),
    ('nz', 'eng'),
    ('nz', 'mri'),
    ('nz', 'nzs'),
    ('om', 'ara'),
    ('pa', 'spa'),
    ('pe', 'aym'),
    ('pe', 'que'),
    ('pe', 'spa'),
    ('pf', 'fra'),
    ('pg', 'eng'),
    ('pg', 'hmo'),
    ('pg', 'tpi'),
    ('ph', 'eng'),
    ('ph', 'fil'),
    ('pk', 'eng'),
    ('pk', 'urd'),
    ('pl', 'pol'),
    ('pm', 'fra'),
    ('pn', 'eng'),
    ('pr', 'eng'),
    ('pr', 'spa'),
    ('ps', 'ara'),
    ('pt', 'por'),
    ('pw', 'eng'),
    ('pw', 'pau'),
    ('py', 'grn'),
    ('py', 'spa'),
    ('qa', 'ara'),
    ('re', 'fra'),
    ('ro', 'ron'),
    ('rs', 'srp'),
    ('ru', 'rus'),
    ('rw', 'eng'),
    ('rw', 'fra'),
    ('rw', 'kin'),
    ('sa', 'ara'),
    ('sb', 'eng'),
    ('sc', 'crs'),
    ('sc', 'eng'),
    ('sc', 'fra'),
    ('sd', 'ara'),
    ('sd', 'eng'),
    ('se', 'swe'),
    ('sg', 'cmn'),
    ('sg', 'eng'),
    ('sg', 'msa'),
    ('sg', 'tam'),
    ('sh', 'eng'),
    ('si', 'slv'),
    ('sj', 'nor'),
    ('sk', 'slk'),
    ('sl', 'eng'),
    ('sm', 'ita'),
    ('sn', 'fra'),
    ('so', 'ara'),
    ('so', 'som'),
    ('sr', 'nld'),
    ('ss', 'eng'),
    ('st', 'por'),
    ('sv', 'spa'),
    ('sx', 'eng'),
    ('sx', 'fra'),
    ('sx', 'nld'),
    ('sy', 'ara'),
    ('sz', 'eng'),
    ('sz', 'ssw'),
    ('tc', 'eng'),
    ('td', 'ara'),
    ('td', 'fra'),
    ('tf', 'fra'),
    ('tg', 'fra'),
    ('th', 'tha'),
    ('tj', 'rus'),
    ('tj', 'tgk'),
    ('tk', 'eng'),
    ('tk', 'smo'),
    ('tk', 'tkl'),
    ('tl', 'por'),
    ('tl', 'tet'),
    ('tm', 'rus'),
    ('tm', 'tuk'),
    ('tn', 'ara'),
    ('to', 'eng'),
    ('to', 'ton'),
    ('tr', 'tur'),
    ('tt', 'eng'),
    ('tv', 'eng'),
    ('tv', 'tvl'),
    ('tw', 'cmn'),
    ('tz', 'eng'),
    ('tz', 'swa'),
    ('ua', 'ukr'),
    ('ug', 'eng'),
    ('ug', 'swa'),
    ('um', 'eng'),
    ('us', 'eng'),
    ('uy', 'spa'),
    ('uz', 'rus'),
    ('uz', 'uzb'),
    ('va', 'ita'),
    ('va', 'lat'),
    ('vc', 'eng'),
    ('ve', 'spa'),
    ('vg', 'eng'),
    ('vi', 'eng'),
    ('vn', 'vie'),
    ('vu', 'bis'),
    ('vu', 'eng'),
    ('vu', 'fra'),
    ('wf', 'fra'),
    ('ws', 'eng'),
    ('ws', 'smo'),
    ('xk', 'sqi'),
    ('xk', 'srp'),
    ('ye', 'ara'),
    ('yt', 'fra'),
    ('za', 'afr'),
    ('za', 'eng'),
    ('za', 'nbl'),
    ('za', 'nso'),
    ('za', 'sot'),
    ('za', 'ssw'),
    ('za', 'tsn'),
    ('za', 'tso'),
    ('za', 'ven'),
    ('za', 'xho'),
    ('za', 'zul'),
    ('zm', 'eng'),
    ('zw', 'bwg'),
    ('zw', 'eng'),
    ('zw', 'kck'),
    ('zw', 'khi'),
    ('zw', 'ndc'),
    ('zw', 'nde'),
    ('zw', 'nya'),
    ('zw', 'sna'),
    ('zw', 'sot'),
    ('zw', 'toi'),
    ('zw', 'tsn'),
    ('zw', 'tso'),
    ('zw', 'ven'),
    ('zw', 'xho'),
    ('zw', 'zib');

INSERT INTO
    iso.country_currencies ("country_id", "currency_id")
VALUES
    ('ad', 'EUR'),
    ('ae', 'AED'),
    ('af', 'AFN'),
    ('ag', 'XCD'),
    ('ai', 'XCD'),
    ('al', 'ALL'),
    ('am', 'AMD'),
    ('ao', 'AOA'),
    ('ar', 'ARS'),
    ('as', 'USD'),
    ('at', 'EUR'),
    ('au', 'AUD'),
    ('aw', 'AWG'),
    ('ax', 'EUR'),
    ('az', 'AZN'),
    ('ba', 'BAM'),
    ('bb', 'BBD'),
    ('bd', 'BDT'),
    ('be', 'EUR'),
    ('bf', 'XOF'),
    ('bg', 'BGN'),
    ('bh', 'BHD'),
    ('bi', 'BIF'),
    ('bj', 'XOF'),
    ('bl', 'EUR'),
    ('bm', 'BMD'),
    ('bn', 'BND'),
    ('bo', 'BOB'),
    ('bq', 'USD'),
    ('br', 'BRL'),
    ('bs', 'BSD'),
    ('bt', 'BTN'),
    ('bv', 'NOK'),
    ('bw', 'BWP'),
    ('by', 'BYN'),
    ('bz', 'BZD'),
    ('ca', 'CAD'),
    ('cc', 'AUD'),
    ('cd', 'CDF'),
    ('cf', 'XAF'),
    ('cg', 'XAF'),
    ('ch', 'CHF'),
    ('ci', 'XOF'),
    ('ck', 'NZD'),
    ('cl', 'CLP'),
    ('cm', 'XAF'),
    ('cn', 'CNY'),
    ('co', 'COP'),
    ('cr', 'CRC'),
    ('cu', 'CUP'),
    ('cv', 'CVE'),
    ('cw', 'ANG'),
    ('cx', 'AUD'),
    ('cy', 'EUR'),
    ('cz', 'CZK'),
    ('de', 'EUR'),
    ('dj', 'DJF'),
    ('dk', 'DKK'),
    ('dm', 'XCD'),
    ('do', 'DOP'),
    ('dz', 'DZD'),
    ('ec', 'USD'),
    ('ee', 'EUR'),
    ('eg', 'EGP'),
    ('eh', 'MAD'),
    ('er', 'ERN'),
    ('es', 'EUR'),
    ('et', 'ETB'),
    ('fi', 'EUR'),
    ('fj', 'FJD'),
    ('fk', 'FKP'),
    ('fm', 'USD'),
    ('fo', 'DKK'),
    ('fr', 'EUR'),
    ('ga', 'XAF'),
    ('gb', 'GBP'),
    ('gd', 'XCD'),
    ('ge', 'GEL'),
    ('gf', 'EUR'),
    ('gg', 'GBP'),
    ('gh', 'GHS'),
    ('gi', 'GIP'),
    ('gl', 'DKK'),
    ('gm', 'GMD'),
    ('gn', 'GNF'),
    ('gp', 'EUR'),
    ('gq', 'XAF'),
    ('gr', 'EUR'),
    ('gs', 'GBP'),
    ('gt', 'GTQ'),
    ('gu', 'USD'),
    ('gw', 'XOF'),
    ('gy', 'GYD'),
    ('hk', 'HKD'),
    ('hm', 'AUD'),
    ('hn', 'HNL'),
    ('hr', 'HRK'),
    ('ht', 'HTG'),
    ('hu', 'HUF'),
    ('id', 'IDR'),
    ('ie', 'EUR'),
    ('il', 'ILS'),
    ('im', 'GBP'),
    ('in', 'INR'),
    ('io', 'USD'),
    ('iq', 'IQD'),
    ('ir', 'IRR'),
    ('is', 'ISK'),
    ('it', 'EUR'),
    ('je', 'GBP'),
    ('jm', 'JMD'),
    ('jo', 'JOD'),
    ('jp', 'JPY'),
    ('ke', 'KES'),
    ('kg', 'KGS'),
    ('kh', 'KHR'),
    ('ki', 'AUD'),
    ('km', 'KMF'),
    ('kn', 'XCD'),
    ('kp', 'KPW'),
    ('kr', 'KRW'),
    ('kw', 'KWD'),
    ('ky', 'KYD'),
    ('kz', 'KZT'),
    ('la', 'LAK'),
    ('lb', 'LBP'),
    ('lc', 'XCD'),
    ('li', 'CHF'),
    ('lk', 'LKR'),
    ('lr', 'LRD'),
    ('ls', 'LSL'),
    ('lt', 'EUR'),
    ('lu', 'EUR'),
    ('lv', 'EUR'),
    ('ly', 'LYD'),
    ('ma', 'MAD'),
    ('mc', 'EUR'),
    ('md', 'MDL'),
    ('me', 'EUR'),
    ('mf', 'EUR'),
    ('mg', 'MGA'),
    ('mh', 'USD'),
    ('mk', 'MKD'),
    ('ml', 'XOF'),
    ('mm', 'MMK'),
    ('mn', 'MNT'),
    ('mo', 'MOP'),
    ('mp', 'USD'),
    ('mq', 'EUR'),
    ('mr', 'MRO'),
    ('ms', 'XCD'),
    ('mt', 'EUR'),
    ('mu', 'MUR'),
    ('mv', 'MVR'),
    ('mw', 'MWK'),
    ('mx', 'MXN'),
    ('my', 'MYR'),
    ('mz', 'MZN'),
    ('na', 'NAD'),
    ('nc', 'XPF'),
    ('ne', 'XOF'),
    ('nf', 'AUD'),
    ('ng', 'NGN'),
    ('ni', 'NIO'),
    ('nl', 'EUR'),
    ('no', 'NOK'),
    ('np', 'NPR'),
    ('nr', 'AUD'),
    ('nu', 'NZD'),
    ('nz', 'NZD'),
    ('om', 'OMR'),
    ('pa', 'PAB'),
    ('pe', 'PEN'),
    ('pf', 'XPF'),
    ('pg', 'PGK'),
    ('ph', 'PHP'),
    ('pk', 'PKR'),
    ('pl', 'PLN'),
    ('pm', 'EUR'),
    ('pn', 'NZD'),
    ('pr', 'USD'),
    ('ps', 'ILS'),
    ('pt', 'EUR'),
    ('pw', 'USD'),
    ('py', 'PYG'),
    ('qa', 'QAR'),
    ('re', 'EUR'),
    ('ro', 'RON'),
    ('rs', 'RSD'),
    ('ru', 'RUB'),
    ('rw', 'RWF'),
    ('sa', 'SAR'),
    ('sb', 'SBD'),
    ('sc', 'SCR'),
    ('sd', 'SDG'),
    ('se', 'SEK'),
    ('sg', 'SGD'),
    ('sh', 'SHP'),
    ('si', 'EUR'),
    ('sj', 'NOK'),
    ('sk', 'EUR'),
    ('sl', 'SLL'),
    ('sm', 'EUR'),
    ('sn', 'XOF'),
    ('so', 'SOS'),
    ('sr', 'SRD'),
    ('ss', 'SSP'),
    ('st', 'STD'),
    ('sv', 'SVC'),
    ('sx', 'ANG'),
    ('sy', 'SYP'),
    ('sz', 'SZL'),
    ('tc', 'USD'),
    ('td', 'XAF'),
    ('tf', 'EUR'),
    ('tg', 'XOF'),
    ('th', 'THB'),
    ('tj', 'TJS'),
    ('tk', 'NZD'),
    ('tl', 'USD'),
    ('tm', 'TMT'),
    ('tn', 'TND'),
    ('to', 'TOP'),
    ('tr', 'TRY'),
    ('tt', 'TTD'),
    ('tv', 'AUD'),
    ('tw', 'TWD'),
    ('tz', 'TZS'),
    ('ua', 'UAH'),
    ('ug', 'UGX'),
    ('um', 'USD'),
    ('us', 'USD'),
    ('uy', 'UYU'),
    ('uz', 'UZS'),
    ('va', 'EUR'),
    ('vc', 'XCD'),
    ('ve', 'VES'),
    ('vg', 'USD'),
    ('vi', 'USD'),
    ('vn', 'VND'),
    ('vu', 'VUV'),
    ('wf', 'XPF'),
    ('ws', 'WST'),
    ('xk', 'EUR'),
    ('ye', 'YER'),
    ('yt', 'EUR'),
    ('za', 'ZAR'),
    ('zm', 'ZMW'),
    ('zw', 'ZWL');

    
