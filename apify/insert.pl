#! /usr/bin/env perl
use 5.34.0;
use JSON::Parse 'parse_json', 'assert_valid_json', 'read_json';
use JSON qw(encode_json);
use Data::Dumper;
use Data::Dump qw(dump);
use Scalar::Util qw(looks_like_number);

my $jsonFile = './dublin-museums.json';
my $insert   = './insert.sql';
my @values;

open(my $fh, "<", "$jsonFile") or die "Can't open < $jsonFile: $!";
    my $json = read_json($jsonFile);

    #say Dumper($json);
    for my $place (@$json) {
        push(@values, insertPlace($place, 'IE-dublin'));
        #say Dumper($place);
    }
close($fh);

my $insert = 'INSERT INTO "world"."attractions" (
        "city_id",
        "title",
        "subtitle",
        "description",
        "price",
        "category_name",
        "address",
        "neighborhood",
        "street",
        "postal_code",
        "state",
        "city",
        "country",
        "website",
        "phone",
        "phone_unformatted",
        "latitude",
        "longitude",
        "located_in",
        "total_score",
        "permanently_closed",
        "temporarily_closed",
        "place_id",
        "categories",
        "scraped_at",
        "opening_hours",
        "additional_info",
        "image_url"
) VALUES ';

say $insert . join(',', @values) . ';';

sub escape_quot {
    my($str) = @_;

    my @str = split(m!'!, $str);
    my $out = join('&apos;', @str);
    return $out;
}

sub array_quot {
    my ($arr) = @_;
    my @out;
#say("IN:", encode_json($arr));
    foreach $a (@{$arr}) {
        #say("a=$a");
        push(@out, escape_quot($a))
    }
    #say("OUT:", encode_json(\@out));
    return \@out;
}

sub info {
    my ($arr1) = @_;
    my %out;

    foreach my $key1 (keys %$arr1) {
        my $k1 = escape_quot($key1);
        $out{$k1} = [];
        my $arr2 = $arr1->{$key1};
        #say "OUT 1: $k1";

        for (my $i = 0; $i < @$arr2; $i++) {
            #say "OUT 2: @$arr2";
            foreach my $key3 (keys %{$$arr2[$i]}) {
                my $k3 = escape_quot($key3);
                push(@{$out{$k1}}, $k3);
                #say "OUT 3: $k1 -> $k3";
            }
        }
    }
    #say 'out:' . Dumper(\%out);
    #$Data::Dumper::Purity = 1;

    return \%out;
}

sub isNumeric {
    my($number) = @_;
    return looks_like_number($number) ? $number : 0;
}

sub isBoolean {
    my($bool) = @_;
    return $bool ? 'TRUE' : 'FALSE',
}

sub insertPlace {
    my($place, $city_id) = @_;

    my $insertPlace = {
        'city_id'               =>  $city_id,
        'title'                 =>  escape_quot($place->{'title'}),
        'subtitle'              =>  escape_quot($place->{'subTitle'}),
        'description'           =>  escape_quot($place->{'description'}),
        'price'                 =>  isNumeric($place->{'price'}),
        'category_name'         =>  $place->{'categoryName'},
        'address'               =>  escape_quot($place->{'address'}),
        'neighborhood'          =>  escape_quot($place->{'neighborhood'}),
        'street'                =>  escape_quot($place->{'street'}),
        'postal_code'           =>  $place->{'postalCode'},
        'state'                 =>  escape_quot($place->{'state'}),
        'city'                  =>  escape_quot($place->{'city'}),
        'country'               =>  escape_quot($place->{'country'}),
        'website'               =>  $place->{'website'},
        'phone'                 =>  $place->{'phone'},
        'phone_unformatted'     =>  $place->{'phoneUnformatted'},
        'latitude'              =>  $place->{'location'}->{'lat'} || 0,
        'longitude'             =>  $place->{'location'}->{'lng'} || 0,
        'located_in'            =>  escape_quot($place->{'locatedIn'}),
        'total_score'           =>  $place->{'totalScore'},
        'permanently_closed'    =>  isBoolean($place->{'permanentlyClosed'}),
        'temporarily_closed'    =>  isBoolean($place->{'temporarilyClosed'}),
        'place_id'              =>  $place->{'placeId'},
        'categories'            =>  encode_json(array_quot($place->{'categories'})),
        'scraped_at'            =>  $place->{'scrapedAt'},
        'opening_hours'         =>  encode_json($place->{'openingHours'}),
        'additional_info'       =>  encode_json(info($place->{'additionalInfo'})),
        'image_url'             =>  $place->{'imageUrl'}
    };


    my $insertLine = <<EOF;
    (
        '$city_id',
        '$insertPlace->{'title'}',
        '$insertPlace->{'subtitle'}',
        '$insertPlace->{'description'}',
        $insertPlace->{'price'},
        '$insertPlace->{'categoryName'}',
        '$insertPlace->{'address'}',
        '$insertPlace->{'neighborhood'}',
        '$insertPlace->{'street'}',
        '$insertPlace->{'postalCode'}',
        '$insertPlace->{'state'}',
        '$insertPlace->{'city'}',
        '$insertPlace->{'country'}',
        '$insertPlace->{'website'}',
        '$insertPlace->{'phone'}',
        '$insertPlace->{'phone_unformatted'}',
        $insertPlace->{'latitude'},
        $insertPlace->{'longitude'},
        '$insertPlace->{'located_in'}',
        '$insertPlace->{'total_score'}',
        $insertPlace->{'permanently_closed'},
        $insertPlace->{'temporarily_closed'},
        '$insertPlace->{'place_id'}',
        '$insertPlace->{'categories'}',
        '$insertPlace->{'scraped_at'}',
        '$insertPlace->{'opening_hours'}',
        '$insertPlace->{'additional_info'}',
        '$insertPlace->{'image_url'}'
    )
EOF
    return $insertLine;
}