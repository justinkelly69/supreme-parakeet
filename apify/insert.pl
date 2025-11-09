#! /usr/bin/env perl
use 5.34.0;
use JSON::Parse 'parse_json', 'assert_valid_json', 'read_json';
use Data::Dumper;
use Data::Dump qw(dump);

my $jsonFile = './all-dublin.json';
my $insert   = './insert.sql';

open(my $fh, "<", "$jsonFile") or die "Can't open < $jsonFile: $!";
    my $json = read_json($jsonFile);

    #say Dumper($json);
    for my $place (@$json) {
        say insertPlace($place, 'IE-dublin');
        #say Dumper($place);
    }
close($fh);

sub escape_quot {
    my($str) = @_;

    my @str = split(m!'!, $str);
    my $out = join('@', @str);
    return $out;
}

sub info {
    my ($arr1) = @_;
    my %out;

    foreach my $key1 (keys %$arr1) {
        $out{$key1} = [];
        my $arr2 = $arr1->{$key1};

        for (my $i = 0; $i < @$arr2; $i++) {
            foreach my $key3 (keys %{$$arr2[$i]}) {
                push(@{$out{$key1}}, $key3);
            }
        }
    }
    #say 'out:' . Dumper(\%out);
    $Data::Dumper::Purity = 1;

    return Dumper(\%out);
}

sub insertPlace {
    my($place, $city_id) = @_;

    #say 'OUT:', Dumper(info($place->{'additionalInfo'}));

    my $insertPlace = {
        'city_id'               =>  $city_id,
        'title'                 =>  escape_quot($place->{'title'}),
        'subtitle'              =>  escape_quot($place->{'subTitle'}),
        'description'           =>  escape_quot($place->{'description'}),
        'price'                 =>  $place->{'price'},
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
        'latitude'              =>  $place->{'location'}->{'lat'},
        'longitude'             =>  $place->{'location'}->{'lng'},
        'located_in'            =>  escape_quot($place->{'locatedIn'}),
        'total_score'           =>  $place->{'totalScore'},
        'permanently_closed'    =>  $place->{'permanentlyClosed'},
        'temporarily_closed'    =>  $place->{'temporarilyClosed'},
        'place_id'              =>  $place->{'placeId'},
        'categories'            =>  dump($place->{'categories'}),
        'scraped_at'            =>  $place->{'scrapedAt'},
        'opening_hours'         =>  dump($place->{'openingHours'}),
        'additional_info'       =>  info($place->{'additionalInfo'}),
        'image_url'             =>  $place->{'imageUrl'}
    };


    my $insertLine = <<EOF;
    (
        '$city_id',
        '$insertPlace->{'title'}',
        '$insertPlace->{'subtitle'}',
        '$insertPlace->{'description'}',
        '$insertPlace->{'price'}',
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
        '$insertPlace->{'location'}->{'lat'}',
        '$insertPlace->{'location'}->{'lng'}',
        '$insertPlace->{'located_in'}',
        '$insertPlace->{'total_score'}',
        '$insertPlace->{'permanently_closed'}',
        '$insertPlace->{'temporarily_closed'}',
        '$insertPlace->{'place_id'}',
        '$insertPlace->{'categories'}',
        '$insertPlace->{'scraped_at'}',
        '$insertPlace->{'opening_hours'}',
        '$insertPlace->{'additional_info'}',
        '$insertPlace->{'image_url'}',
    )
EOF
    return $insertLine;
}