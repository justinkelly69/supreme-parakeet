#! /usr/bin/env perl
use 5.34.0;
use utf8;
use JSON::Parse 'parse_json', 'assert_valid_json', 'read_json';
use JSON qw(encode_json);
use Data::Dumper;
use Data::Dump qw(dump);
use Scalar::Util qw(looks_like_number);


my $jsonFile = './dublin-all.json';
my $city_id  = 'IE-dublin';
my $sqlFile  = './insert-attractions.sql';
my @values;
my @fields   = (
        'city_id',
        'visible',
        'title',
        'subtitle',
        'description',
        #'price',
        'category_name',
        'address',
        #'neighborhood',
        #'street',
        #'postal_code',
        #'state',
        #'city',
        #'country',
        'website',
        'phone',
        #'phone_unformatted',
        'latitude',
        'longitude',
        #'located_in',
        'total_score',
        #'permanently_closed',
        #'temporarily_closed',
        'place_id',
        'categories',
        'scraped_at',
        'reviews_count',
        'opening_hours',
        'additional_info',
        'image_url'
    );

my $fields = "\t" . join(",\n\t", str_array(\@fields));

open(my $fh, "<", "$jsonFile") or die "Can't open < $jsonFile: $!";
    my $json = read_json($jsonFile);

    for my $place (@$json) {
        push(@values, insertPlace($place, $city_id, \@fields));
    }
close($fh);

my $insert = <<EOF;
DELETE FROM "world"."attractions" WHERE "city_id" = '$city_id';
INSERT INTO "world"."attractions" (
EOF

my $values = "\n) VALUES " ;

open(my $out, ">", "$sqlFile") or die "Can't open > $sqlFile: $!";
    binmode($out, ":encoding(UTF-8)");
    print $out "${insert}${fields}${values}" . join(',', @values) . ';';
close($out);

#-- SUBROUTINES --
# Quote all 's as &apos;
sub escape_quot {
    my($str) = @_;

    my @str = split(m!'!, $str);
    my $out = join('&apos;', @str);
    return $out;
}

# Quote all 's as &apos; for each element of array
sub array_quot {
    my ($arr) = @_;
    my @out;
    foreach $a (@{$arr}) {
        push(@out, escape_quot($a))
    }
    return \@out;
}

# Process additional info to extract keys only
sub processAdditional {
    my ($arr1) = @_;
    my %out;

    foreach my $key1 (keys %$arr1) {
        my $k1 = escape_quot($key1);
        $out{$k1} = [];
        my $arr2 = $arr1->{$key1};

        for (my $i = 0; $i < @$arr2; $i++) {
            foreach my $key3 (keys %{$$arr2[$i]}) {
                my $k3 = escape_quot($key3);
                push(@{$out{$k1}}, $k3);
            }
        }
    }

    return \%out;
}

# Check if $number is numeric, else return 0
sub isNumeric {
    my($number) = @_;
    return looks_like_number($number) ? $number : 0;
}

# Convert truthy/falsy values to SQL TRUE/FALSE
sub isBoolean {
    my($bool) = @_;
    return $bool ? 'TRUE' : 'FALSE',
}

sub str {
    my($s) = @_;
    return "'$s'";
}

sub str_array{
    my($arr) = @_;
    my @out;
    foreach my $i (@$arr) {
        push(@out, "\"$i\"");
    }
    return @out;
}

sub insertPlace {
    my($place, $city_id, $fields) = @_;

    my %insertPlace = (
        'city_id'               =>  str($city_id),
        'visible'               =>  'TRUE',
        'title'                 =>  str(escape_quot($place->{'title'})),
        'subtitle'              =>  str(escape_quot($place->{'subTitle'})),
        'description'           =>  str(escape_quot($place->{'description'})),
        'price'                 =>  isNumeric($place->{'price'}),
        'category_name'         =>  str($place->{'categoryName'}),
        'address'               =>  str(escape_quot($place->{'address'})),
        'neighborhood'          =>  str(escape_quot($place->{'neighborhood'})),
        'street'                =>  str(escape_quot($place->{'street'})),
        'postal_code'           =>  str($place->{'postalCode'}),
        'state'                 =>  str(escape_quot($place->{'state'})),
        'city'                  =>  str(escape_quot($place->{'city'})),
        'country'               =>  str(escape_quot($place->{'country'})),
        'website'               =>  str($place->{'website'}),
        'phone'                 =>  str($place->{'phone'}),
        'phone_unformatted'     =>  str($place->{'phoneUnformatted'}),
        'latitude'              =>  $place->{'location'}->{'lat'} || 0,
        'longitude'             =>  $place->{'location'}->{'lng'} || 0,
        'located_in'            =>  str(escape_quot($place->{'locatedIn'})),
        'total_score'           =>  $place->{'totalScore'},
        'permanently_closed'    =>  isBoolean($place->{'permanentlyClosed'}),
        'temporarily_closed'    =>  isBoolean($place->{'temporarilyClosed'}),
        'place_id'              =>  str($place->{'placeId'}),
        'categories'            =>  str(encode_json(array_quot($place->{'categories'}))),
        'scraped_at'            =>  str($place->{'scrapedAt'}),
        "reviews_count"         =>  isNumeric($place->{'reviewsCount'}),
        'opening_hours'         =>  str(encode_json($place->{'openingHours'})),
        'additional_info'       =>  str(encode_json(processAdditional($place->{'additionalInfo'}))),
        'image_url'             =>  str($place->{'imageUrl'})
    );

    my @out;
    foreach my $field (@$fields) {
        push(@out, $insertPlace{$field});
    }

    my $insertLine = "(\n\t" . join(",\n\t", @out) . "\n)";

    return $insertLine;
}